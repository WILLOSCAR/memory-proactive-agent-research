import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  applyResearchEvent,
  computeRevision,
  recoverResearchSettlement,
  settleResearchEvent,
} from "../scripts/settle-research-event.mjs";

const baseIndex = {
  schemaVersion: 1,
  program: { id: "PROGRAM" },
  tracks: [{ id: "U-PHY", mode: "validate" }],
  sourcePapers: [],
  clusters: [],
  gaps: [],
  candidates: [{ id: "C31", trackId: "U-PHY", workState: "blocked", nestedInto: [], sourceIds: [] }],
  experimentSpecs: [],
  runs: [],
  artifacts: [],
  evidenceLinks: [],
  decisions: [],
  paperThreads: [],
};

test("applies typed changes against the exact base revision without mutating the input", () => {
  const eventsRaw = "";
  const baseRevision = computeRevision(`${JSON.stringify(baseIndex)}\n`, eventsRaw);
  const event = {
    id: "EVT-001",
    timestamp: "2026-08-04T17:00:00+08:00",
    actor: "codex",
    baseRevision,
    type: "candidate.state-changed",
    affectedEntityIds: ["C31"],
    changes: [
      { op: "replace", path: ["candidates", "C31", "workState"], value: "parked" },
      { op: "replace", path: ["tracks", "U-PHY", "mode"], value: "parked" },
    ],
    nextEvidenceAcceptance: "Real longitudinal metadata is available.",
    blocker: "Missing real shift metadata",
    outcome: "material-change",
  };

  const updated = applyResearchEvent(baseIndex, event, baseRevision);

  assert.equal(updated.candidates[0].workState, "parked");
  assert.equal(updated.tracks[0].mode, "parked");
  assert.equal(baseIndex.candidates[0].workState, "blocked");
});

test("adds entities and idempotently links stable IDs without positional array edits", () => {
  const baseRevision = computeRevision(`${JSON.stringify(baseIndex)}\n`, "");
  const event = {
    id: "EVT-002",
    timestamp: "2026-08-04T17:05:00+08:00",
    actor: "codex",
    baseRevision,
    type: "decision.proposed",
    affectedEntityIds: ["C31", "D-003"],
    changes: [
      {
        op: "add",
        path: ["decisions"],
        value: { id: "D-003", state: "proposed", outcome: "park", candidateIds: ["C31"] },
      },
      { op: "link", path: ["candidates", "C31", "sourceIds"], value: "SRC-001" },
      { op: "link", path: ["candidates", "C31", "sourceIds"], value: "SRC-001" },
    ],
    nextEvidenceAcceptance: "User approves or rejects the Park decision.",
    blocker: null,
    outcome: "material-change",
  };

  const updated = applyResearchEvent(baseIndex, event, baseRevision);

  assert.deepEqual(updated.decisions.map((decision) => decision.id), ["D-003"]);
  assert.deepEqual(updated.candidates[0].sourceIds, ["SRC-001"]);
});

test("rejects stale writers before applying any change", () => {
  const event = {
    id: "EVT-003",
    timestamp: "2026-08-04T17:10:00+08:00",
    actor: "codex",
    baseRevision: "sha256:stale",
    type: "candidate.state-changed",
    affectedEntityIds: ["C31"],
    changes: [{ op: "replace", path: ["candidates", "C31", "workState"], value: "active" }],
    nextEvidenceAcceptance: "Candidate is eligible for validation.",
    blocker: null,
    outcome: "material-change",
  };

  assert.throws(
    () => applyResearchEvent(baseIndex, event, "sha256:current"),
    /Base revision mismatch/,
  );
  assert.equal(baseIndex.candidates[0].workState, "blocked");
});

test("requires a complete Settlement contract for every material event", () => {
  const baseRevision = computeRevision(`${JSON.stringify(baseIndex)}\n`, "");
  const event = {
    id: "EVT-INCOMPLETE",
    timestamp: "2026-08-04T17:12:00+08:00",
    actor: "codex",
    baseRevision,
    type: "candidate.state-changed",
    changes: [{ op: "replace", path: ["candidates", "C31", "workState"], value: "active" }],
    outcome: "material-change",
  };

  assert.throws(
    () => applyResearchEvent(baseIndex, event, baseRevision),
    /missing affectedEntityIds or nextEvidenceAcceptance/,
  );
});

test("enforces Run, Artifact, Local Result, External Review, and Decision evidence boundaries", () => {
  const baseRevision = computeRevision(`${JSON.stringify(baseIndex)}\n`, "");
  const makeEvent = (id, changes) => ({
    id,
    timestamp: "2026-08-04T17:15:00+08:00",
    actor: "codex",
    baseRevision,
    type: "evidence.recorded",
    affectedEntityIds: ["C31"],
    changes,
    nextEvidenceAcceptance: "A valid evidence path exists.",
    blocker: null,
    outcome: "material-change",
  });

  assert.throws(
    () => applyResearchEvent(baseIndex, makeEvent("EVT-004", [{
      op: "add",
      path: ["runs"],
      value: { id: "RUN-001", specId: "EXP-001", status: "running" },
    }]), baseRevision),
    /Run RUN-001 is missing a complete manifest/,
  );

  assert.throws(
    () => applyResearchEvent(baseIndex, makeEvent("EVT-005", [{
      op: "add",
      path: ["evidenceLinks"],
      value: {
        id: "EL-LOCAL-001",
        assertionId: "C31@v1.result",
        relation: "support",
        basisType: "local-result",
        scope: "probe outcome",
        refId: "ART-404",
      },
    }]), baseRevision),
    /Local Result EL-LOCAL-001 must reference a valid Artifact/,
  );

  assert.throws(
    () => applyResearchEvent(baseIndex, makeEvent("EVT-006", [{
      op: "add",
      path: ["evidenceLinks"],
      value: {
        id: "EL-REVIEW-001",
        assertionId: "C31@v1.claim",
        relation: "support",
        basisType: "external-review",
        scope: "review pressure",
        refId: "REV-001",
      },
    }]), baseRevision),
    /External Review evidence can only use the pressure relation/,
  );

  assert.throws(
    () => applyResearchEvent(baseIndex, makeEvent("EVT-007", [{
      op: "add",
      path: ["decisions"],
      value: { id: "D-004", state: "done", outcome: "park", candidateIds: ["C31"] },
    }]), baseRevision),
    /Decision D-004 has an invalid state/,
  );
});

test("settles index and append-only event log as one journaled transaction", async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), "research-settlement-"));
  t.after(async () => {
    const { rm } = await import("node:fs/promises");
    await rm(root, { recursive: true, force: true });
  });
  const indexRaw = `${JSON.stringify(baseIndex, null, 2)}\n`;
  const eventsRaw = "";
  const baseRevision = computeRevision(indexRaw, eventsRaw);
  const event = {
    id: "EVT-008",
    timestamp: "2026-08-04T17:20:00+08:00",
    actor: "codex",
    baseRevision,
    type: "candidate.state-changed",
    affectedEntityIds: ["C31"],
    changes: [{ op: "replace", path: ["candidates", "C31", "workState"], value: "active" }],
    nextEvidenceAcceptance: "Candidate reaches its first executable Spec.",
    blocker: null,
    outcome: "material-change",
  };
  const eventPath = path.join(root, "event.json");
  await writeFile(path.join(root, "research-index.yaml"), indexRaw);
  await writeFile(path.join(root, "research-events.jsonl"), eventsRaw);
  await writeFile(eventPath, `${JSON.stringify(event, null, 2)}\n`);

  const result = await settleResearchEvent({ root, eventPath });
  const settledIndexRaw = await readFile(path.join(root, "research-index.yaml"), "utf8");
  const settledEventsRaw = await readFile(path.join(root, "research-events.jsonl"), "utf8");
  const settledIndex = JSON.parse(settledIndexRaw);

  assert.equal(settledIndex.candidates[0].workState, "active");
  assert.equal(settledIndex.generatedAt, event.timestamp);
  assert.deepEqual(settledEventsRaw.trim().split("\n").map(JSON.parse), [event]);
  assert.equal(result.previousRevision, baseRevision);
  assert.equal(result.revision, computeRevision(settledIndexRaw, settledEventsRaw));
  await assert.rejects(readFile(path.join(root, ".research-settlement.pending.json"), "utf8"), /ENOENT/);
  await assert.rejects(readFile(path.join(root, ".research-settlement.lock"), "utf8"), /ENOENT/);
});

test("recovers a journaled transaction interrupted between the two renames", async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), "research-recovery-"));
  t.after(async () => {
    const { rm } = await import("node:fs/promises");
    await rm(root, { recursive: true, force: true });
  });
  const previousIndexRaw = `${JSON.stringify(baseIndex, null, 2)}\n`;
  const previousEventsRaw = "";
  const nextIndex = structuredClone(baseIndex);
  nextIndex.generatedAt = "2026-08-04T17:25:00+08:00";
  nextIndex.candidates[0].workState = "active";
  const nextIndexRaw = `${JSON.stringify(nextIndex, null, 2)}\n`;
  const event = {
    id: "EVT-009",
    timestamp: nextIndex.generatedAt,
    actor: "codex",
    baseRevision: computeRevision(previousIndexRaw, previousEventsRaw),
    type: "candidate.state-changed",
    affectedEntityIds: ["C31"],
    changes: [{ op: "replace", path: ["candidates", "C31", "workState"], value: "active" }],
    nextEvidenceAcceptance: "Candidate reaches its first executable Spec.",
    blocker: null,
    outcome: "material-change",
  };
  const nextEventsRaw = `${JSON.stringify(event)}\n`;
  const revision = computeRevision(nextIndexRaw, nextEventsRaw);
  await writeFile(path.join(root, "research-index.yaml"), nextIndexRaw);
  await writeFile(path.join(root, "research-events.jsonl"), previousEventsRaw);
  await writeFile(path.join(root, ".research-events.test.next"), nextEventsRaw);
  await writeFile(path.join(root, ".research-settlement.pending.json"), `${JSON.stringify({
    schemaVersion: 1,
    eventId: event.id,
    previousRevision: event.baseRevision,
    revision,
    files: [
      { target: "research-index.yaml", staged: ".research-index.test.next" },
      { target: "research-events.jsonl", staged: ".research-events.test.next" },
    ],
  })}\n`);

  const result = await recoverResearchSettlement({ root });

  assert.equal(result.revision, revision);
  assert.equal(await readFile(path.join(root, "research-events.jsonl"), "utf8"), nextEventsRaw);
  await assert.rejects(readFile(path.join(root, ".research-settlement.pending.json"), "utf8"), /ENOENT/);
});

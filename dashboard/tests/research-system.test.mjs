import assert from "node:assert/strict";
import test from "node:test";

import { buildResearchSnapshot } from "../lib/research-system.mjs";

const minimalIndex = {
  schemaVersion: 1,
  generatedAt: "2026-08-04T00:00:00+08:00",
  program: { id: "PROGRAM", title: "Test program" },
  tracks: [
    { id: "M-AI", title: "Memory · AI", mode: "validate" },
    { id: "P-AI", title: "Proactive · AI", mode: "validate" },
  ],
  sourcePapers: [],
  clusters: [],
  candidates: [
    {
      id: "C01",
      trackId: "M-AI",
      title: "Probe candidate",
      maturity: "probe",
      workState: "active",
      evidenceSummary: "inference",
      outputShape: ["benchmark"],
      nextAction: "Build evaluator",
      blocker: null,
      updatedAt: "2026-08-03",
      nestedInto: [],
    },
    {
      id: "C14",
      trackId: "P-AI",
      title: "Nested timing slice",
      maturity: "probe",
      workState: "closed",
      evidenceSummary: "inference",
      outputShape: ["evaluation"],
      nextAction: "Serve C13",
      blocker: null,
      updatedAt: "2026-07-31",
      nestedInto: ["C13"],
    },
  ],
  experimentSpecs: [{ id: "E-C01-01", candidateIds: ["C01"], status: "ready" }],
  runs: [],
  artifacts: [],
  evidenceLinks: [],
  decisions: [{ id: "D-001", candidateIds: ["C14"], outcome: "nest", state: "applied" }],
  paperThreads: [],
  researchEvents: [],
  reusableAssets: [],
  externalReviews: [],
};

test("keeps independent count self-consistent as lineage evolves (Split/Nest are not frozen)", () => {
  // A legal Split adds a node; the sync validator now checks self-consistency,
  // not a frozen 36/34. independentCandidateCount must equal the recomputed
  // count of candidates with an empty nestedInto — for any node total.
  const split = buildResearchSnapshot({
    ...minimalIndex,
    candidates: [
      ...minimalIndex.candidates,
      { id: "C01a", trackId: "M-AI", title: "Split child", maturity: "problem", workState: "active", evidenceSummary: "inference", outputShape: ["benchmark"], nextAction: "x", blocker: null, updatedAt: "2026-08-05", nestedInto: [] },
    ],
  });
  const recomputed = split.index.candidates.filter((candidate) => (candidate.nestedInto ?? []).length === 0).length;
  assert.equal(split.summary.candidateNodeCount, 3);
  assert.equal(split.summary.independentCandidateCount, recomputed);
  assert.equal(recomputed, 2);
});

test("derives honest portfolio counts instead of counting nested slices as independent candidates", () => {
  const snapshot = buildResearchSnapshot(minimalIndex);

  assert.deepEqual(snapshot.summary, {
    trackCount: 2,
    candidateNodeCount: 2,
    independentCandidateCount: 1,
    nestedSliceCount: 1,
    probeReadyCount: 1,
    actualRunCount: 0,
    localResultCount: 0,
    paperOpportunityCount: 0,
    paperProjectCount: 0,
    sourceStats: {
      total: 0,
      verified: 0,
      verifiedAbstract: 0,
      unclustered: 0,
      assertionUnlinked: 0,
      untracked: 0,
    },
  });
});

test("does not expose a running run or local result without an auditable manifest and artifact", () => {
  const snapshot = buildResearchSnapshot({
    ...minimalIndex,
    runs: [
      { id: "R-E-C01-01-001", specId: "E-C01-01", status: "running" },
      {
        id: "R-E-C01-01-002",
        specId: "E-C01-01",
        status: "completed",
        manifest: {
          commit: "abc123",
          dataSnapshot: "sha256:data",
          startedAt: "2026-08-04T01:00:00+08:00",
        },
      },
    ],
    artifacts: [
      { id: "A-INVALID", runId: "R-E-C01-01-001", valid: true },
      { id: "A-001", runId: "R-E-C01-01-002", valid: true, digest: "sha256:result" },
    ],
    evidenceLinks: [
      { id: "EV-INVALID", basisType: "local-result", refId: "A-INVALID" },
      { id: "EV-001", basisType: "local-result", refId: "A-001" },
    ],
  });

  assert.equal(snapshot.summary.actualRunCount, 1);
  assert.equal(snapshot.summary.localResultCount, 1);
  assert.deepEqual(snapshot.integrity.errors.map((error) => error.code), [
    "RUN_MANIFEST_MISSING",
    "ARTIFACT_DIGEST_MISSING",
  ]);
});

test("puts a proposed Decision first and never truncates it under the attention budget", () => {
  // Five non-decision triggers present (probe, blocked, at-risk, 0-run, 0-paper)
  // plus a proposed Decision. Under the old append-then-slice(0,5) the Decision
  // was dropped; Decision-first must keep it at rank 1.
  const snapshot = buildResearchSnapshot({
    ...minimalIndex,
    candidates: [
      ...minimalIndex.candidates,
      {
        id: "C31", trackId: "P-AI", title: "Blocked candidate", maturity: "audit",
        workState: "blocked", evidenceSummary: "inference", outputShape: ["method"],
        nextAction: "Acquire metadata", blocker: "Missing real shift metadata",
        unlockCondition: "Public longitudinal metadata", updatedAt: "2026-08-03", nestedInto: [],
      },
    ],
    decisions: [
      ...minimalIndex.decisions,
      { id: "D-009", candidateIds: ["C01"], outcome: "kill", state: "proposed" },
    ],
  });

  assert.equal(snapshot.leaderBrief.attention.length, 5);
  assert.equal(snapshot.leaderBrief.attention[0].id, "decision-needed");
  assert.ok(snapshot.leaderBrief.attention.some((item) => item.pointerIds.includes("D-009")));
  assert.ok(snapshot.leaderBrief.attention.every((item) => item.pointerIds.length > 0));
  assert.ok(snapshot.leaderBrief.attention.every((item) => item.pointerKind));
});

test("separates Basis from assertion-level Evidence level", () => {
  const snapshot = buildResearchSnapshot(minimalIndex);
  const byId = Object.fromEntries(snapshot.leaderBrief.attention.map((item) => [item.id, item]));

  // Canonical/derived/policy bases carry no assertion-level evidence level.
  assert.equal(byId["material-change"].basisKind, "source-pressure");
  assert.equal(byId["material-change"].evidenceLevel, null);
  assert.equal(byId["paper-outlook"].basisKind, "policy");
  assert.equal(byId["paper-outlook"].evidenceLevel, null);
  // No item claims "inference" as an evidence level just for being a derived notice.
  assert.ok(snapshot.leaderBrief.attention.every((item) => item.evidenceLevel === null || item.evidenceLevel === "local-result"));
});

test("builds a delta headline that is honest about the last-view checkpoint", () => {
  const events = [
    { id: "EVT-A", timestamp: "2026-08-04T18:30:00+08:00", outcome: "material-change", changes: [1, 2], affectedEntityIds: ["SRC-1"] },
    { id: "EVT-B", timestamp: "2026-08-05T00:00:00Z", outcome: "material-change", changes: [1], affectedEntityIds: ["SRC-2"] },
    { id: "EVT-REC", timestamp: "2026-07-31T12:00:00+08:00", outcome: "recorded", affectedEntityIds: ["C14"] },
  ];
  const index = { ...minimalIndex, researchEvents: events, sourceRevision: "sha256:current" };

  // No checkpoint → must say "Latest recorded ... since", never fake since-last-view.
  const cold = buildResearchSnapshot(index, null);
  assert.equal(cold.leaderBrief.checkpointKnown, false);
  assert.match(cold.leaderBrief.headline, /Latest recorded material changes since/);

  // Checkpoint before EVT-B → exactly one new material change since.
  const warm = buildResearchSnapshot(index, { revision: "sha256:old", since: "2026-08-04T20:00:00+08:00" });
  assert.equal(warm.leaderBrief.checkpointKnown, true);
  assert.equal(warm.leaderBrief.materialEventCount, 1);
  assert.match(warm.leaderBrief.headline, /新增 1 条 material change/);

  // Checkpoint at current revision → no new material change.
  const current = buildResearchSnapshot(index, { revision: "sha256:current", since: "2026-08-05T00:00:00Z" });
  assert.match(current.leaderBrief.headline, /无新的 material change/);
});

test("traces a Candidate through sources, gaps, specs, decisions, and paper threads", () => {
  const snapshot = buildResearchSnapshot({
    ...minimalIndex,
    sourcePapers: [{ id: "SRC-001", title: "Source" }],
    clusters: [{ id: "MA-01", trackId: "M-AI", sourceIds: ["SRC-001"], gapId: "GAP-001" }],
    gaps: [{ id: "GAP-001", clusterId: "MA-01", candidateIds: ["C01"] }],
    candidates: [{ ...minimalIndex.candidates[0], sourceIds: ["SRC-001"] }],
    decisions: [{ id: "D-001", candidateIds: ["C01"], outcome: "continue", state: "proposed" }],
    paperThreads: [{ id: "PT-001", stage: "opportunity", candidateIds: ["C01"] }],
  });

  assert.deepEqual(snapshot.trace("C01"), {
    entityId: "C01",
    sourceIds: ["SRC-001"],
    clusterIds: ["MA-01"],
    gapIds: ["GAP-001"],
    candidateIds: ["C01"],
    specIds: ["E-C01-01"],
    runIds: [],
    artifactIds: [],
    decisionIds: ["D-001"],
    paperThreadIds: ["PT-001"],
  });
});

test("derives Track health and maturity distribution from Candidate state", () => {
  const snapshot = buildResearchSnapshot({
    ...minimalIndex,
    candidates: [
      minimalIndex.candidates[0],
      {
        ...minimalIndex.candidates[0],
        id: "C02",
        maturity: "audit",
        workState: "blocked",
        blocker: "Overlap audit",
      },
      minimalIndex.candidates[1],
    ],
  });

  assert.deepEqual(snapshot.trackSummaries[0], {
    id: "M-AI",
    title: "Memory · AI",
    mode: "validate",
    independentCount: 2,
    nestedCount: 0,
    activeCount: 1,
    blockedCount: 1,
    probeReadyCount: 1,
    maturity: { radar: 0, audit: 1, problem: 0, probe: 1, pilot: 0, confirmation: 0, paper: 0 },
    leadCandidateIds: ["C01", "C02"],
    health: "moving",
  });
});

test("marks a Track at risk when only one non-radar Candidate carries its momentum", () => {
  const snapshot = buildResearchSnapshot({
    ...minimalIndex,
    tracks: [{ id: "M-PHY", title: "Physiological Memory", mode: "explore" }],
    candidates: [
      { ...minimalIndex.candidates[0], id: "C08", trackId: "M-PHY", maturity: "audit" },
      { ...minimalIndex.candidates[0], id: "C09", trackId: "M-PHY", maturity: "radar" },
    ],
  });

  assert.equal(snapshot.trackSummaries[0].health, "at-risk");
});

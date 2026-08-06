import { createHash } from "node:crypto";
import { access, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { buildResearchSnapshot } from "../lib/research-system.mjs";

const siteRoot = resolve(import.meta.dirname, "..");
const researchRoot = resolve(siteRoot, "..");
const canonicalPath = resolve(researchRoot, "research-index.yaml");
const eventsPath = resolve(researchRoot, "research-events.jsonl");
const settlementLockPath = resolve(researchRoot, ".research-settlement.lock");
const settlementJournalPath = resolve(researchRoot, ".research-settlement.pending.json");
const generatedPath = resolve(siteRoot, "data/research-index.json");
const checkOnly = process.argv.includes("--check");

async function assertSettlementIsIdle() {
  for (const protectedPath of [settlementLockPath, settlementJournalPath]) {
    try {
      await access(protectedPath);
      throw new Error(`Canonical research state is being settled or requires recovery: ${protectedPath}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
}

await assertSettlementIsIdle();
const [canonicalRaw, eventsRaw] = await Promise.all([
  readFile(canonicalPath, "utf8"),
  readFile(eventsPath, "utf8"),
]);
await assertSettlementIsIdle();

let index;
try {
  index = JSON.parse(canonicalRaw);
} catch (error) {
  throw new Error(`research-index.yaml must remain JSON-compatible YAML: ${error.message}`);
}

const researchEvents = eventsRaw
  .split("\n")
  .filter(Boolean)
  .map((line, lineIndex) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`Invalid research-events.jsonl line ${lineIndex + 1}: ${error.message}`);
    }
  });

const requiredArrays = [
  "tracks",
  "sourcePapers",
  "clusters",
  "gaps",
  "candidates",
  "experimentSpecs",
  "runs",
  "artifacts",
  "evidenceLinks",
  "decisions",
  "paperThreads",
];
for (const key of requiredArrays) {
  if (!Array.isArray(index[key])) throw new Error(`research-index.yaml: ${key} must be an array`);
}

const ids = new Set();
for (const collection of requiredArrays) {
  for (const entity of index[collection]) {
    if (!entity.id) continue;
    if (ids.has(entity.id)) throw new Error(`Duplicate entity id: ${entity.id}`);
    ids.add(entity.id);
  }
}

const sourceRevision = `sha256:${createHash("sha256").update(canonicalRaw).update("\0").update(eventsRaw).digest("hex")}`;
const generated = { ...index, sourceRevision, researchEvents };
const snapshot = buildResearchSnapshot(generated);
if (!snapshot.integrity.ok) {
  throw new Error(snapshot.integrity.errors.map((error) => `${error.code}:${error.entityId}`).join("\n"));
}
// Lineage-aware validation (audit §A12): validate invariants, not a frozen
// node count. A legal Split raises the node count; Nest/Merge lowers the
// independent count — those must sync, not fail. We still catch real corruption:
// dangling nestedInto pointers and a self-inconsistent independent count.
const candidateIds = new Set(index.candidates.map((candidate) => candidate.id));
const danglingNest = index.candidates.flatMap((candidate) =>
  (candidate.nestedInto ?? [])
    .filter((parentId) => !candidateIds.has(parentId))
    .map((parentId) => `${candidate.id} → ${parentId}`),
);
if (danglingNest.length > 0) {
  throw new Error(`nestedInto points at unknown Candidate(s): ${danglingNest.join(", ")}`);
}
const expectedIndependent = index.candidates.filter((candidate) => (candidate.nestedInto ?? []).length === 0).length;
if (snapshot.summary.independentCandidateCount !== expectedIndependent) {
  throw new Error(`Independent count is not self-consistent: snapshot ${snapshot.summary.independentCandidateCount} vs recomputed ${expectedIndependent}`);
}

const serialized = `${JSON.stringify(generated, null, 2)}\n`;
if (checkOnly) {
  const current = await readFile(generatedPath, "utf8");
  if (current !== serialized) throw new Error("Generated dashboard data is stale. Run npm run sync:data.");
  console.log(`Data is current: ${snapshot.summary.independentCandidateCount} independent Candidates, ${snapshot.summary.actualRunCount} Actual Runs.`);
} else {
  await writeFile(generatedPath, serialized, "utf8");
  console.log(`Synced ${generatedPath}`);
  console.log(`${index.sourcePapers.length} sources, ${snapshot.summary.independentCandidateCount} independent Candidates, ${snapshot.summary.actualRunCount} Actual Runs`);
}

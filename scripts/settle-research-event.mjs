#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  access,
  open,
  readFile,
  rename,
  rm,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function computeRevision(indexRaw, eventsRaw) {
  return `sha256:${createHash("sha256").update(indexRaw).update("\0").update(eventsRaw).digest("hex")}`;
}

function resolveSegment(container, segment) {
  if (Array.isArray(container)) {
    const entity = container.find((item) => item?.id === segment);
    if (!entity) throw new Error(`Unknown entity id in change path: ${segment}`);
    return entity;
  }
  if (container == null || typeof container !== "object" || !(segment in container)) {
    throw new Error(`Unknown field in change path: ${segment}`);
  }
  return container[segment];
}

function resolveParent(root, path) {
  if (!Array.isArray(path) || path.length < 1) throw new Error("Change path must be a non-empty array.");
  let parent = root;
  for (const segment of path.slice(0, -1)) parent = resolveSegment(parent, segment);
  return { parent, key: path.at(-1) };
}

function applyChange(index, change) {
  const { parent, key } = resolveParent(index, change.path);

  if (change.op === "replace") {
    if (Array.isArray(parent)) throw new Error("replace must target an entity field, not an array position.");
    if (!(key in parent)) throw new Error(`replace target does not exist: ${change.path.join(".")}`);
    parent[key] = structuredClone(change.value);
    return;
  }

  if (change.op === "add") {
    const collection = resolveSegment(parent, key);
    if (!Array.isArray(collection)) throw new Error("add must target a collection.");
    if (!change.value?.id) throw new Error("add requires a stable entity id.");
    if (collection.some((item) => item?.id === change.value.id)) {
      throw new Error(`Duplicate entity id: ${change.value.id}`);
    }
    collection.push(structuredClone(change.value));
    return;
  }

  if (change.op === "link" || change.op === "unlink") {
    if (Array.isArray(parent)) throw new Error(`${change.op} must target an entity field.`);
    if (!(key in parent) || !Array.isArray(parent[key])) {
      throw new Error(`${change.op} must target an existing relation array.`);
    }
    if (change.op === "link" && !parent[key].includes(change.value)) parent[key].push(structuredClone(change.value));
    if (change.op === "unlink") parent[key] = parent[key].filter((value) => value !== change.value);
    return;
  }

  throw new Error(`Unsupported change operation: ${change.op}`);
}

function validateIndex(index) {
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
    if (!Array.isArray(index[key])) throw new Error(`${key} must be an array.`);
  }

  const entityCollections = [
    ...requiredArrays,
    "externalReviews",
    "reusableAssets",
  ].filter((key) => Array.isArray(index[key]));
  const seenIds = new Set();
  for (const collectionName of entityCollections) {
    for (const entity of index[collectionName]) {
      if (!entity?.id) throw new Error(`${collectionName} contains an entity without a stable id.`);
      if (seenIds.has(entity.id)) throw new Error(`Duplicate entity id: ${entity.id}`);
      seenIds.add(entity.id);
    }
  }

  const completeRunIds = new Set();
  for (const run of index.runs) {
    if (!run.manifest?.commit || !run.manifest?.dataSnapshot || !run.manifest?.startedAt) {
      throw new Error(`Run ${run.id} is missing a complete manifest.`);
    }
    completeRunIds.add(run.id);
  }

  const validArtifactIds = new Set();
  for (const artifact of index.artifacts) {
    if (artifact.valid === true && (!artifact.digest || !completeRunIds.has(artifact.runId))) {
      throw new Error(`Artifact ${artifact.id} must have a digest and reference a manifested Run.`);
    }
    if (artifact.valid === true) validArtifactIds.add(artifact.id);
  }

  for (const link of index.evidenceLinks) {
    if (link.basisType === "external-review" && link.relation !== "pressure") {
      throw new Error("External Review evidence can only use the pressure relation.");
    }
    if (link.basisType === "local-result" && !validArtifactIds.has(link.refId)) {
      throw new Error(`Local Result ${link.id} must reference a valid Artifact.`);
    }
  }

  const decisionStates = new Set(["proposed", "approved", "applied"]);
  for (const decision of index.decisions) {
    if (!decisionStates.has(decision.state)) {
      throw new Error(`Decision ${decision.id} has an invalid state: ${decision.state ?? "none"}.`);
    }
  }
}

export function applyResearchEvent(index, event, currentRevision) {
  if (!event?.id || !event?.timestamp || !event?.actor || !event?.type) {
    throw new Error("Research Event is missing required identity fields.");
  }
  if (event.baseRevision !== currentRevision) {
    throw new Error(`Base revision mismatch: expected ${currentRevision}, received ${event.baseRevision ?? "none"}.`);
  }
  if (!Array.isArray(event.affectedEntityIds) || event.affectedEntityIds.length === 0 || !event.nextEvidenceAcceptance) {
    throw new Error("Research Event is missing affectedEntityIds or nextEvidenceAcceptance.");
  }
  if (event.outcome !== "material-change") {
    throw new Error("The Settlement writer only accepts material-change events.");
  }
  if (!Array.isArray(event.changes) || event.changes.length === 0) {
    throw new Error("A material Research Event must contain typed changes.");
  }
  const updated = structuredClone(index);
  for (const change of event.changes) applyChange(updated, change);
  validateIndex(updated);
  return updated;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function writeDurable(filePath, contents) {
  const handle = await open(filePath, "wx", 0o600);
  try {
    await handle.writeFile(contents, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function acquireLock(lockPath) {
  try {
    const handle = await open(lockPath, "wx", 0o600);
    await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() })}\n`, "utf8");
    await handle.sync();
    return handle;
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
    let owner = null;
    try {
      owner = JSON.parse(await readFile(lockPath, "utf8"));
    } catch {
      throw new Error(`Settlement lock already exists and cannot be inspected: ${lockPath}`);
    }
    if (Number.isInteger(owner.pid)) {
      try {
        process.kill(owner.pid, 0);
        throw new Error(`Another settlement writer is active (pid ${owner.pid}).`);
      } catch (probeError) {
        if (probeError?.code !== "ESRCH") throw probeError;
      }
    }
    await rm(lockPath, { force: true });
    return acquireLock(lockPath);
  }
}

function parseEventLog(eventsRaw) {
  return eventsRaw
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`research-events.jsonl line ${index + 1} is not valid JSON.`);
      }
    });
}

/**
 * Apply one typed Research Event to the canonical index and append-only log.
 * A lock prevents concurrent writers; a durable journal makes an interrupted
 * two-file commit explicit instead of allowing a silent partial overwrite.
 */
export async function settleResearchEvent({ root, eventPath, dryRun = false }) {
  const resolvedRoot = path.resolve(root);
  const indexPath = path.join(resolvedRoot, "research-index.yaml");
  const eventsPath = path.join(resolvedRoot, "research-events.jsonl");
  const lockPath = path.join(resolvedRoot, ".research-settlement.lock");
  const journalPath = path.join(resolvedRoot, ".research-settlement.pending.json");
  const lockHandle = await acquireLock(lockPath);
  const stagedPaths = [];
  let journalCreated = false;

  try {
    if (await pathExists(journalPath)) {
      throw new Error(`A pending settlement journal requires recovery before another write: ${journalPath}`);
    }

    const [indexRaw, eventsRaw, eventRaw] = await Promise.all([
      readFile(indexPath, "utf8"),
      readFile(eventsPath, "utf8"),
      readFile(path.resolve(eventPath), "utf8"),
    ]);
    const index = JSON.parse(indexRaw);
    const event = JSON.parse(eventRaw);
    const existingEvents = parseEventLog(eventsRaw);
    if (existingEvents.some((existing) => existing.id === event.id)) {
      throw new Error(`Research Event id already exists: ${event.id}`);
    }

    const previousRevision = computeRevision(indexRaw, eventsRaw);
    const updated = applyResearchEvent(index, event, previousRevision);
    updated.generatedAt = event.timestamp;
    const nextIndexRaw = `${JSON.stringify(updated, null, 2)}\n`;
    const separator = eventsRaw.length === 0 || eventsRaw.endsWith("\n") ? "" : "\n";
    const nextEventsRaw = `${eventsRaw}${separator}${JSON.stringify(event)}\n`;
    const revision = computeRevision(nextIndexRaw, nextEventsRaw);

    if (dryRun) {
      return { eventId: event.id, previousRevision, revision, dryRun: true };
    }

    const suffix = `${process.pid}-${Date.now()}`;
    const nextIndexPath = path.join(resolvedRoot, `.research-index.${suffix}.next`);
    const nextEventsPath = path.join(resolvedRoot, `.research-events.${suffix}.next`);
    const nextJournalPath = path.join(resolvedRoot, `.research-settlement.${suffix}.journal.next`);
    stagedPaths.push(nextIndexPath, nextEventsPath, nextJournalPath);
    await writeDurable(nextIndexPath, nextIndexRaw);
    await writeDurable(nextEventsPath, nextEventsRaw);
    await writeDurable(nextJournalPath, `${JSON.stringify({
      schemaVersion: 1,
      eventId: event.id,
      createdAt: new Date().toISOString(),
      previousRevision,
      revision,
      files: [
        { target: path.basename(indexPath), staged: path.basename(nextIndexPath) },
        { target: path.basename(eventsPath), staged: path.basename(nextEventsPath) },
      ],
    }, null, 2)}\n`);
    await rename(nextJournalPath, journalPath);
    journalCreated = true;

    await rename(nextIndexPath, indexPath);
    await rename(nextEventsPath, eventsPath);
    await rm(journalPath);
    return { eventId: event.id, previousRevision, revision, dryRun: false };
  } finally {
    try {
      if (!journalCreated) {
        await Promise.all(stagedPaths.map((stagedPath) => rm(stagedPath, { force: true })));
      }
    } finally {
      await lockHandle.close();
      await rm(lockPath, { force: true });
    }
  }
}

export async function recoverResearchSettlement({ root }) {
  const resolvedRoot = path.resolve(root);
  const indexPath = path.join(resolvedRoot, "research-index.yaml");
  const eventsPath = path.join(resolvedRoot, "research-events.jsonl");
  const lockPath = path.join(resolvedRoot, ".research-settlement.lock");
  const journalPath = path.join(resolvedRoot, ".research-settlement.pending.json");
  const lockHandle = await acquireLock(lockPath);

  try {
    if (!(await pathExists(journalPath))) throw new Error("No pending settlement journal exists.");
    const journal = JSON.parse(await readFile(journalPath, "utf8"));
    if (!Array.isArray(journal.files) || journal.files.length !== 2 || !journal.revision) {
      throw new Error("Pending settlement journal is malformed.");
    }
    for (const file of journal.files) {
      if (path.basename(file.target) !== file.target || path.basename(file.staged) !== file.staged) {
        throw new Error("Pending settlement journal contains an unsafe path.");
      }
      const stagedPath = path.join(resolvedRoot, file.staged);
      const targetPath = path.join(resolvedRoot, file.target);
      if (await pathExists(stagedPath)) await rename(stagedPath, targetPath);
      else if (!(await pathExists(targetPath))) throw new Error(`Recovery target is missing: ${file.target}`);
    }

    const [indexRaw, eventsRaw] = await Promise.all([
      readFile(indexPath, "utf8"),
      readFile(eventsPath, "utf8"),
    ]);
    const revision = computeRevision(indexRaw, eventsRaw);
    if (revision !== journal.revision) {
      throw new Error(`Recovered files do not match the journal revision: expected ${journal.revision}, received ${revision}.`);
    }
    await rm(journalPath);
    return { eventId: journal.eventId, previousRevision: journal.previousRevision, revision, recovered: true };
  } finally {
    await lockHandle.close();
    await rm(lockPath, { force: true });
  }
}

function parseCliArgs(argv) {
  const result = { dryRun: false, revision: false, recover: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--dry-run") result.dryRun = true;
    else if (argument === "--revision") result.revision = true;
    else if (argument === "--recover") result.recover = true;
    else if (argument === "--event" || argument === "--root") result[argument.slice(2)] = argv[++index];
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return result;
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const root = path.resolve(args.root ?? defaultRoot);
  if (args.revision) {
    const [indexRaw, eventsRaw] = await Promise.all([
      readFile(path.join(root, "research-index.yaml"), "utf8"),
      readFile(path.join(root, "research-events.jsonl"), "utf8"),
    ]);
    process.stdout.write(`${computeRevision(indexRaw, eventsRaw)}\n`);
    return;
  }
  if (args.recover) {
    const result = await recoverResearchSettlement({ root });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  if (!args.event) {
    throw new Error("Usage: settle-research-event.mjs --revision | --recover | --event EVENT.json [--dry-run] [--root PATH]");
  }
  const result = await settleResearchEvent({ root, eventPath: args.event, dryRun: args.dryRun });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}

const VALID_RUN_STATES = new Set(["queued", "running", "completed", "failed", "cancelled"]);

function hasRunManifest(run) {
  return Boolean(
    run.manifest?.commit &&
    run.manifest?.dataSnapshot &&
    run.manifest?.startedAt,
  );
}

const ATTENTION_BUDGET = 5;

/**
 * Summarise material-change events into one delta narrative + a headline that
 * is honest about whether we know the reader's last checkpoint.
 *
 * checkpoint: { revision, since } | null   (null = no browser checkpoint yet)
 */
function deriveDelta({ researchEvents, currentRevision, checkpoint }) {
  const materialEvents = (researchEvents ?? [])
    .filter((event) => event.outcome === "material-change")
    .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));
  const latestMaterialTs = materialEvents.length
    ? materialEvents[materialEvents.length - 1].timestamp
    : null;

  const hasCheckpoint = Boolean(checkpoint?.revision);
  const revisionUnchanged = hasCheckpoint && checkpoint.revision === currentRevision;
  const sinceEvents = hasCheckpoint && checkpoint.since
    ? materialEvents.filter((event) => String(event.timestamp) > String(checkpoint.since))
    : materialEvents;

  const totalChanges = sinceEvents.reduce((sum, event) => sum + (event.changes?.length ?? event.affectedEntityIds?.length ?? 0), 0);

  let headline;
  if (!hasCheckpoint) {
    headline = latestMaterialTs
      ? `Latest recorded material changes since ${latestMaterialTs}（本浏览器尚无 last-view checkpoint）`
      : "尚无 material-change 记录。";
  } else if (revisionUnchanged || sinceEvents.length === 0) {
    headline = "自上次查看以来无新的 material change（Agent 正在搭 evaluator / 准备证据）。";
  } else {
    headline = `自上次查看新增 ${sinceEvents.length} 条 material change（${totalChanges} 项记录变更）。`;
  }

  return { materialEvents, sinceEvents, latestMaterialTs, hasCheckpoint, revisionUnchanged, headline };
}

function deriveLeaderBrief({
  independentCandidates,
  runs,
  paperThreads,
  decisions,
  trackSummaries,
  localResultCount,
  paperOpportunityCount,
  paperProjectCount,
  researchEvents,
  currentRevision,
  checkpoint,
}) {
  const probeQueue = independentCandidates.filter(
    (candidate) => candidate.maturity === "probe" && candidate.workState === "active",
  );
  const blocked = independentCandidates.filter(
    (candidate) => candidate.workState === "blocked" || candidate.workState === "parked",
  );
  const proposedDecisions = decisions.filter((decision) => decision.state === "proposed");
  const atRiskTracks = trackSummaries.filter((track) => track.health === "at-risk");
  const delta = deriveDelta({ researchEvents, currentRevision, checkpoint });

  // Ranked slots (audit §E P0.3). Decision is rank 1 and thus never truncated
  // by the budget slice. Every item carries basisKind (what the claim rests on)
  // separately from evidenceLevel (assertion-level evidence, null until a Run
  // produces a Local Result).
  const ranked = [];

  // 1 — Decision attention (always present: the Leader's scarcest resource).
  if (proposedDecisions.length > 0) {
    ranked.push({
      id: "decision-needed",
      kind: "decision",
      title: `${proposedDecisions.length} 个高影响 Decision 等待你批准`,
      explanation: "Kill / Split / Merge / Paper 立项 / 真实 GPU Run 必须经 proposed → approved → applied。",
      basisKind: "canonical-state",
      evidenceLevel: null,
      nextAction: "审阅待决事项并给出 approve / reject。",
      pointerKind: "decision",
      pointerIds: proposedDecisions.map((decision) => decision.id),
    });
  } else {
    ranked.push({
      id: "decision-clear",
      kind: "decision",
      title: "没有等待你批准的高影响 Decision",
      explanation: "Agent 可继续自主推进 CPU/API evaluator、baseline 与证据回写，无需你介入。",
      basisKind: "canonical-state",
      evidenceLevel: null,
      nextAction: "无需操作；高影响判断出现时才会打扰你。",
      pointerKind: "decision",
      pointerIds: ["PROGRAM"],
    });
  }

  // 2 — New / invalidated Local Result or newly applied lineage Decision.
  if (localResultCount > 0) {
    ranked.push({
      id: "local-result",
      kind: "evidence",
      title: `${localResultCount} 条 Local Result 已产生`,
      explanation: "本项目首批可审计经验证据；应据此更新对应 Candidate 的 evidence 级别。",
      basisKind: "local-result",
      evidenceLevel: "local-result",
      nextAction: "核对 Run manifest 与 Artifact digest，再决定 continue / kill。",
      pointerKind: "candidate",
      pointerIds: probeQueue.length > 0 ? probeQueue.map((candidate) => candidate.id) : ["PROGRAM"],
    });
  }

  // 3 — Material change since checkpoint (always present: the "what changed" answer).
  ranked.push({
    id: "material-change",
    kind: "change",
    title: delta.sinceEvents.length > 0
      ? `${delta.sinceEvents.length} 次 material change：source pressure 扩张`
      : "最近变化：source pressure，而非本地证据",
    explanation: delta.sinceEvents.length > 0
      ? "最新变化仍来自 literature sweep 的 source pressure：收窄若干 Gap，但尚未应用任何 Candidate 状态变化，也没有 Local Result。"
      : "自上次查看无新增 material event；历史变化均为 source pressure，非 Local Result。",
    basisKind: "source-pressure",
    evidenceLevel: null,
    nextAction: "在 Decisions 页查看 material-change 事件明细。",
    pointerKind: "event",
    pointerIds: delta.sinceEvents.length > 0
      ? delta.sinceEvents.map((event) => event.id)
      : delta.materialEvents.map((event) => event.id).slice(-1).concat("PROGRAM").filter(Boolean),
  });

  // 4 — Blocking current next evidence.
  if (blocked.length > 0) {
    ranked.push({
      id: "blocked-work",
      kind: "blocker",
      title: `${blocked.length} 个独立 Candidate 被阻塞或停放`,
      explanation: blocked.slice(0, 3).map((candidate) => `${candidate.id}: ${candidate.blocker ?? "等待解锁条件"}`).join("；"),
      basisKind: "canonical-state",
      evidenceLevel: null,
      nextAction: blocked.slice(0, 3).map((candidate) => candidate.unlockCondition ?? candidate.nextAction).filter(Boolean).join("；"),
      pointerKind: "candidate",
      pointerIds: blocked.map((candidate) => candidate.id),
    });
  }

  // 5 — Paper gate (always present: the outcome outlook).
  ranked.push({
    id: "paper-outlook",
    kind: "outlook",
    title: `${paperOpportunityCount} Opportunity / ${paperProjectCount} Paper Project`,
    explanation: paperProjectCount + paperOpportunityCount > 0
      ? "已有正在形成的论文机会；缺口见 Paper Portfolio。"
      : "最接近 paper gate 的仍是 probe-ready Candidate；一次有效 Cheap Probe 只是晋级必要条件，不得提前命名为论文。",
    basisKind: "policy",
    evidenceLevel: null,
    nextAction: "先用 Local Result 更新 Candidate，再提出 Paper Opportunity promotion。",
    pointerKind: "paper",
    pointerIds: probeQueue.length > 0 ? probeQueue.map((candidate) => candidate.id) : ["PROGRAM"],
  });

  // 6 — Highest-value autonomous next action (folds in the honest 0-Run truth).
  if (probeQueue.length > 0) {
    ranked.push({
      id: "probe-queue",
      kind: "next",
      title: `${probeQueue.length} 个 Cheap Probe 已 Ready，${runs.length} 个已执行`,
      explanation: "最快的进度不是增加 Candidate，而是把现有 Spec 变成可审计 Run；没有 Run manifest + Artifact digest 就不能声称经验结果。",
      basisKind: "canonical-state",
      evidenceLevel: null,
      nextAction: probeQueue.slice(0, 3).map((candidate) => candidate.nextAction).filter(Boolean).join("；"),
      pointerKind: "candidate",
      pointerIds: probeQueue.map((candidate) => candidate.id),
    });
  }

  // 7 — Portfolio momentum risk (overflow; also visible in the Track matrix).
  if (atRiskTracks.length > 0) {
    ranked.push({
      id: "portfolio-risk",
      kind: "portfolio",
      title: `${atRiskTracks.length} 条 Track 动量偏弱`,
      explanation: atRiskTracks.map((track) => `${track.id}: 只有一张非 Radar Candidate 承担推进`).join("；"),
      basisKind: "derived-state",
      evidenceLevel: null,
      nextAction: "优先完成当前 overlap/evaluation audit，再决定 validate 或 parked。",
      pointerKind: "candidate",
      pointerIds: atRiskTracks.flatMap((track) => track.leadCandidateIds.slice(0, 1)),
    });
  }

  return {
    phase: runs.length > 0 ? "evidence-building" : "discover-validate",
    headline: delta.headline,
    checkpointKnown: delta.hasCheckpoint,
    materialEventCount: delta.sinceEvents.length,
    attention: ranked.slice(0, ATTENTION_BUDGET),
    notNow: [
      "不需要为了显示进度而创建空 Run 或空 Paper Project。",
      "在数据与 overlap gate 通过前，不扩大 GPU 消耗。",
    ],
  };
}

/**
 * Build the complete read model consumed by the dashboard.
 *
 * The input is the canonical, serialisable research index. Everything shown in
 * the UI is derived here so counts and evidence semantics cannot drift between
 * views.
 *
 * @param {Record<string, any>} index
 * @param {{ revision?: string, since?: string } | null} [checkpoint] browser last-view checkpoint
 */
export function buildResearchSnapshot(index, checkpoint = null) {
  const candidates = index.candidates ?? [];
  const declaredRuns = (index.runs ?? []).filter((run) => VALID_RUN_STATES.has(run.status));
  const runs = declaredRuns.filter(hasRunManifest);
  const artifacts = index.artifacts ?? [];
  const paperThreads = index.paperThreads ?? [];
  const decisions = index.decisions ?? [];
  const nestedSlices = candidates.filter((candidate) => (candidate.nestedInto ?? []).length > 0);
  const independentCandidates = candidates.filter((candidate) => (candidate.nestedInto ?? []).length === 0);
  const validRunIds = new Set(runs.map((run) => run.id));
  const validArtifactIds = new Set(
    artifacts
      .filter(
        (artifact) =>
          artifact.valid === true &&
          artifact.digest &&
          validRunIds.has(artifact.runId),
      )
      .map((artifact) => artifact.id),
  );
  const errors = [
    ...declaredRuns
      .filter((run) => !hasRunManifest(run))
      .map((run) => ({
        code: "RUN_MANIFEST_MISSING",
        entityId: run.id,
        message: "Run is hidden until commit, data snapshot, and start time are recorded.",
      })),
    ...artifacts
      .filter((artifact) => artifact.valid === true && !artifact.digest)
      .map((artifact) => ({
        code: "ARTIFACT_DIGEST_MISSING",
        entityId: artifact.id,
        message: "Artifact cannot support a Local Result without a digest.",
      })),
  ];
  const maturityOrder = ["paper", "confirmation", "pilot", "probe", "problem", "audit", "radar"];
  const trackSummaries = (index.tracks ?? []).map((track) => {
    const nodes = candidates.filter((candidate) => candidate.trackId === track.id);
    const independent = nodes.filter((candidate) => (candidate.nestedInto ?? []).length === 0);
    const nested = nodes.filter((candidate) => (candidate.nestedInto ?? []).length > 0);
    const maturity = Object.fromEntries(
      ["radar", "audit", "problem", "probe", "pilot", "confirmation", "paper"].map((stage) => [
        stage,
        independent.filter((candidate) => candidate.maturity === stage).length,
      ]),
    );
    const active = independent.filter((candidate) => candidate.workState === "active");
    const blocked = independent.filter((candidate) => candidate.workState === "blocked");
    const leadCandidateIds = [...independent]
      .sort((left, right) => maturityOrder.indexOf(left.maturity) - maturityOrder.indexOf(right.maturity) || left.id.localeCompare(right.id))
      .slice(0, 3)
      .map((candidate) => candidate.id);
    const activeDepth = active.filter((candidate) => candidate.maturity !== "radar");
    const moving = activeDepth.length > 0;
    const atRisk =
      activeDepth.length === 1 &&
      maturity.probe === 0 &&
      maturity.radar >= independent.length / 2;

    return {
      id: track.id,
      title: track.title,
      mode: track.mode,
      independentCount: independent.length,
      nestedCount: nested.length,
      activeCount: active.length,
      blockedCount: blocked.length,
      probeReadyCount: active.filter((candidate) => candidate.maturity === "probe").length,
      maturity,
      leadCandidateIds,
      health: track.mode === "parked"
        ? "parked"
        : !moving && blocked.length > 0
          ? "blocked"
          : atRisk
            ? "at-risk"
            : moving
              ? "moving"
              : "exploring",
    };
  });
  const sortedUnique = (values) => [...new Set(values)].sort();
  const trace = (entityId) => {
    const candidate = candidates.find((item) => item.id === entityId);
    const directSourceIds = candidate?.sourceIds ?? [];
    const directGapIds = (index.gaps ?? [])
      .filter((gap) => (gap.candidateIds ?? []).includes(entityId))
      .map((gap) => gap.id);
    const directClusterIds = (index.clusters ?? [])
      .filter(
        (cluster) =>
          directGapIds.includes(cluster.gapId) ||
          (cluster.sourceIds ?? []).some((sourceId) => directSourceIds.includes(sourceId)),
      )
      .map((cluster) => cluster.id);
    const candidateIds = candidate ? [candidate.id] : [];
    const specIds = (index.experimentSpecs ?? [])
      .filter((spec) => (spec.candidateIds ?? []).some((id) => candidateIds.includes(id)))
      .map((spec) => spec.id);
    const runIds = runs.filter((run) => specIds.includes(run.specId)).map((run) => run.id);
    const artifactIds = artifacts
      .filter((artifact) => runIds.includes(artifact.runId) && validArtifactIds.has(artifact.id))
      .map((artifact) => artifact.id);

    return {
      entityId,
      sourceIds: sortedUnique(directSourceIds),
      clusterIds: sortedUnique(directClusterIds),
      gapIds: sortedUnique(directGapIds),
      candidateIds: sortedUnique(candidateIds),
      specIds: sortedUnique(specIds),
      runIds: sortedUnique(runIds),
      artifactIds: sortedUnique(artifactIds),
      decisionIds: sortedUnique(
        decisions.filter((decision) => (decision.candidateIds ?? []).some((id) => candidateIds.includes(id))).map((decision) => decision.id),
      ),
      paperThreadIds: sortedUnique(
        paperThreads.filter((thread) => (thread.candidateIds ?? []).some((id) => candidateIds.includes(id))).map((thread) => thread.id),
      ),
    };
  };

  // Source linkage stats with correct semantics (audit §A10): "unclustered" and
  // "assertion-unlinked" count real Cluster / Evidence-Link membership, not the
  // orthogonal question of Track routing.
  const sourcePapers = index.sourcePapers ?? [];
  const clusteredSourceIds = new Set((index.clusters ?? []).flatMap((cluster) => cluster.sourceIds ?? []));
  const assertionLinkedSourceIds = new Set((index.evidenceLinks ?? []).map((link) => link.refId));
  const sourceStats = {
    total: sourcePapers.length,
    verified: sourcePapers.filter((source) => source.verification === "verified").length,
    verifiedAbstract: sourcePapers.filter((source) => source.verification === "verified-abstract").length,
    unclustered: sourcePapers.filter((source) => !clusteredSourceIds.has(source.id)).length,
    assertionUnlinked: sourcePapers.filter((source) => !assertionLinkedSourceIds.has(source.id)).length,
    untracked: sourcePapers.filter((source) => (source.trackIds ?? []).length === 0).length,
  };

  const localResultCount = (index.evidenceLinks ?? []).filter(
    (link) => link.basisType === "local-result" && validArtifactIds.has(link.refId),
  ).length;
  const paperOpportunityCount = paperThreads.filter((thread) => thread.stage === "opportunity").length;
  const paperProjectCount = paperThreads.filter((thread) => thread.stage === "project").length;

  return {
    index,
    summary: {
      trackCount: (index.tracks ?? []).length,
      candidateNodeCount: candidates.length,
      independentCandidateCount: independentCandidates.length,
      nestedSliceCount: nestedSlices.length,
      probeReadyCount: independentCandidates.filter(
        (candidate) => candidate.maturity === "probe" && candidate.workState === "active",
      ).length,
      actualRunCount: runs.length,
      localResultCount,
      paperOpportunityCount,
      paperProjectCount,
      sourceStats,
    },
    integrity: { ok: errors.length === 0, errors },
    leaderBrief: deriveLeaderBrief({
      independentCandidates,
      runs,
      paperThreads,
      decisions,
      trackSummaries,
      localResultCount,
      paperOpportunityCount,
      paperProjectCount,
      researchEvents: index.researchEvents ?? [],
      currentRevision: index.sourceRevision,
      checkpoint,
    }),
    trackSummaries,
    trace,
  };
}

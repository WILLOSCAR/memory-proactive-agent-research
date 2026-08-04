const VALID_RUN_STATES = new Set(["queued", "running", "completed", "failed", "cancelled"]);

function hasRunManifest(run) {
  return Boolean(
    run.manifest?.commit &&
    run.manifest?.dataSnapshot &&
    run.manifest?.startedAt,
  );
}

function deriveLeaderBrief({ independentCandidates, runs, paperThreads, decisions, trackSummaries }) {
  const probeQueue = independentCandidates.filter(
    (candidate) => candidate.maturity === "probe" && candidate.workState === "active",
  );
  const blocked = independentCandidates.filter(
    (candidate) => candidate.workState === "blocked" || candidate.workState === "parked",
  );
  const proposedDecisions = decisions.filter((decision) => decision.state === "proposed");
  const attention = [];

  if (probeQueue.length > 0) {
    attention.push({
      id: "probe-queue",
      kind: "next",
      title: `${probeQueue.length} 个 Cheap Probe 已可执行`,
      explanation: "最快的进度不是增加 Candidate，而是把现有 Spec 变成可审计 Run。",
      evidenceType: "inference",
      nextAction: probeQueue.slice(0, 3).map((candidate) => candidate.nextAction).filter(Boolean).join("；"),
      pointerIds: probeQueue.map((candidate) => candidate.id),
    });
  }

  if (blocked.length > 0) {
    attention.push({
      id: "blocked-work",
      kind: "blocker",
      title: `${blocked.length} 个独立 Candidate 被阻塞或停放`,
      explanation: blocked.slice(0, 3).map((candidate) => `${candidate.id}: ${candidate.blocker ?? "等待解锁条件"}`).join("；"),
      evidenceType: "inference",
      nextAction: blocked.slice(0, 3).map((candidate) => candidate.unlockCondition ?? candidate.nextAction).filter(Boolean).join("；"),
      pointerIds: blocked.map((candidate) => candidate.id),
    });
  }

  const atRiskTracks = trackSummaries.filter((track) => track.health === "at-risk");
  if (atRiskTracks.length > 0) {
    attention.push({
      id: "portfolio-risk",
      kind: "portfolio",
      title: `${atRiskTracks.length} 条 Track 动量偏弱`,
      explanation: atRiskTracks.map((track) => `${track.id}: 只有一张非 Radar Candidate 承担推进`).join("；"),
      evidenceType: "derived-state",
      nextAction: "优先完成当前 overlap/evaluation audit，再决定 validate 或 parked。",
      pointerIds: atRiskTracks.flatMap((track) => track.leadCandidateIds.slice(0, 1)),
    });
  }

  if (runs.length === 0) {
    attention.push({
      id: "evidence-gap",
      kind: "truth",
      title: "仍为 0 Actual Run / 0 Local Result",
      explanation: "当前页面展示的是研究准备度；没有 Run Manifest 与有效 Artifact，就不能声称经验结果。",
      evidenceType: "direct-state",
      nextAction: "完成一个最小 Spec → Run → Artifact → Decision 闭环。",
      pointerIds: probeQueue.length > 0 ? probeQueue.map((candidate) => candidate.id) : ["PROGRAM"],
    });
  }

  if (paperThreads.length === 0) {
    attention.push({
      id: "paper-outlook",
      kind: "outlook",
      title: "尚无达标 Paper Opportunity / Paper Project",
      explanation: "一次有效 Cheap Probe 只是晋级必要条件；还需要存活 Claim、novelty pressure 和可组合证据路径。",
      evidenceType: "policy",
      nextAction: "先用结果更新 Candidate，再提出 Paper Opportunity promotion。",
      pointerIds: probeQueue.length > 0 ? probeQueue.map((candidate) => candidate.id) : ["PROGRAM"],
    });
  }

  if (proposedDecisions.length > 0) {
    attention.push({
      id: "decision-needed",
      kind: "decision",
      title: `${proposedDecisions.length} 个决定等待批准`,
      explanation: "高影响 lineage 变化必须经过 proposed → approved → applied。",
      evidenceType: "decision",
      nextAction: "审阅待决事项。",
      pointerIds: proposedDecisions.map((decision) => decision.id),
    });
  }

  return {
    phase: runs.length > 0 ? "evidence-building" : "discover-validate",
    headline: runs.length > 0
      ? "研究已进入本地证据积累阶段。"
      : "当前瓶颈是把可证伪设计转成第一批可审计证据。",
    attention: attention.slice(0, 5),
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
 */
export function buildResearchSnapshot(index) {
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
      localResultCount: (index.evidenceLinks ?? []).filter(
        (link) => link.basisType === "local-result" && validArtifactIds.has(link.refId),
      ).length,
      paperOpportunityCount: paperThreads.filter((thread) => thread.stage === "opportunity").length,
      paperProjectCount: paperThreads.filter((thread) => thread.stage === "project").length,
    },
    integrity: { ok: errors.length === 0, errors },
    leaderBrief: deriveLeaderBrief({ independentCandidates, runs, paperThreads, decisions, trackSummaries }),
    trackSummaries,
    trace,
  };
}

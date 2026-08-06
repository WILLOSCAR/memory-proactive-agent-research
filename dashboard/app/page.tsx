"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { buildResearchSnapshot } from "../lib/research-system.mjs";
import {
  researchIndex,
  type Candidate,
  type Decision,
  type ExperimentSpec,
  type Maturity,
  type SourcePaper,
  type TrackId,
} from "./research-data";

type ViewId = "now" | "map" | "candidates" | "experiments" | "decisions" | "papers" | "library" | "help" | "system";
type CandidateScope = "focus" | "all" | "nested";
type OutcomeFilter = Decision["outcome"] | "all";

type Summary = {
  trackCount: number;
  candidateNodeCount: number;
  independentCandidateCount: number;
  nestedSliceCount: number;
  probeReadyCount: number;
  actualRunCount: number;
  localResultCount: number;
  paperOpportunityCount: number;
  paperProjectCount: number;
  sourceStats: {
    total: number;
    verified: number;
    verifiedAbstract: number;
    unclustered: number;
    assertionUnlinked: number;
    untracked: number;
  };
};

type LeaderAttention = {
  id: string;
  kind: string;
  title: string;
  explanation: string;
  basisKind: string;
  evidenceLevel: string | null;
  nextAction: string;
  pointerKind: "candidate" | "decision" | "event" | "paper";
  pointerIds: string[];
};

type TrackSummary = {
  id: TrackId;
  title: string;
  mode: string;
  independentCount: number;
  nestedCount: number;
  activeCount: number;
  blockedCount: number;
  probeReadyCount: number;
  maturity: Record<Maturity, number>;
  leadCandidateIds: string[];
  health: "moving" | "at-risk" | "blocked" | "exploring" | "parked";
};

type Trace = {
  entityId: string;
  sourceIds: string[];
  clusterIds: string[];
  gapIds: string[];
  candidateIds: string[];
  specIds: string[];
  runIds: string[];
  artifactIds: string[];
  decisionIds: string[];
  paperThreadIds: string[];
};

type DerivedSnapshot = {
  summary: Summary;
  leaderBrief: {
    phase: string;
    headline: string;
    checkpointKnown: boolean;
    materialEventCount: number;
    attention: LeaderAttention[];
    notNow: string[];
  };
  trackSummaries: TrackSummary[];
  integrity: { ok: boolean; errors: { code: string; entityId: string; message: string }[] };
  trace: (entityId: string) => Trace;
};

const os = buildResearchSnapshot(researchIndex) as DerivedSnapshot;

const views: { id: ViewId; label: string; eyebrow: string; group: "operator" | "system" }[] = [
  { id: "now", label: "Now", eyebrow: "30 秒总览", group: "operator" },
  { id: "map", label: "Research Map", eyebrow: "论文 → Gap", group: "operator" },
  { id: "candidates", label: "Candidates", eyebrow: "问题工作区", group: "operator" },
  { id: "experiments", label: "Experiments", eyebrow: "Spec → Run", group: "operator" },
  { id: "decisions", label: "Decisions", eyebrow: "Inbox 与演变", group: "operator" },
  { id: "papers", label: "Paper Portfolio", eyebrow: "Opportunity → Project", group: "operator" },
  { id: "library", label: "Library", eyebrow: "复用实例", group: "system" },
  { id: "help", label: "Help", eyebrow: "对象模型 · 术语", group: "system" },
  { id: "system", label: "System", eyebrow: "写入 · 治理 · 健康", group: "system" },
];
const operatorViews = views.filter((view) => view.group === "operator");
const systemViews = views.filter((view) => view.group === "system");

const maturityOrder: Maturity[] = ["radar", "audit", "problem", "probe", "pilot", "confirmation", "paper"];
const maturityLabel: Record<Maturity, string> = {
  radar: "Paper Radar",
  audit: "Overlap Audit",
  problem: "Problem Defined",
  probe: "Cheap Probe",
  pilot: "Pilot",
  confirmation: "Confirmation",
  paper: "Paper",
};
const workLabel = { active: "Active", blocked: "Blocked", parked: "Parked", closed: "Closed" } as const;
const decisionLabel: Record<Decision["outcome"], string> = {
  continue: "Continue",
  split: "Split",
  nest: "Nest",
  merge: "Merge",
  park: "Park",
  kill: "Kill",
};
const specLaneMeta: Record<ExperimentSpec["status"], { label: string; detail: string }> = {
  ready: { label: "Ready", detail: "Evaluator / baseline 可以开始实现" },
  definition: { label: "Definition", detail: "仍在冻结构念、数据或 estimand" },
  blocked: { label: "Blocked", detail: "有明确 blocker 与 unlock condition" },
  nested: { label: "Nested", detail: "作为上位 Candidate 的 evaluator slice" },
};

const trackById = new Map(researchIndex.tracks.map((track) => [track.id, track]));
const candidateById = new Map(researchIndex.candidates.map((candidate) => [candidate.id, candidate]));
const sourceById = new Map(researchIndex.sourcePapers.map((source) => [source.id, source]));
const specById = new Map(researchIndex.experimentSpecs.map((spec) => [spec.id, spec]));
const decisionById = new Map(researchIndex.decisions.map((decision) => [decision.id, decision]));

const trackStyle = (trackId: TrackId) =>
  ({ "--track": trackById.get(trackId)?.accent ?? "#12675d" }) as CSSProperties;

const includesQuery = (value: string, query: string) =>
  value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill tone-${tone}`}>{children}</span>;
}

function EmptyTruth({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="empty-truth">
      <span>0</span>
      <div><strong>{title}</strong><p>{detail}</p></div>
    </div>
  );
}

// One-line operational header for operator workspaces. The full object-model
// teaching now lives in Help (audit §A7): keep an operational one-liner + a
// hover tooltip + a "Learn more" link into Help, not a paragraph of ontology.
function WorkspaceHint({ text, tip, onHelp }: { text: string; tip?: string; onHelp: () => void }) {
  return (
    <p className="workspace-hint" title={tip ?? text}>
      <span>{text}</span>
      <button type="button" onClick={onHelp}>Learn more ↗</button>
    </p>
  );
}

function StageRail({ summary }: { summary: TrackSummary }) {
  const total = Math.max(1, summary.independentCount);
  return (
    <div className="stage-rail" aria-label={`${summary.id} maturity distribution`}>
      {maturityOrder.map((stage) => (
        <i
          className={`stage-${stage}`}
          key={stage}
          style={{ flexGrow: summary.maturity[stage], flexBasis: summary.maturity[stage] ? `${(summary.maturity[stage] / total) * 100}%` : "3px" }}
          title={`${maturityLabel[stage]}: ${summary.maturity[stage]}`}
        />
      ))}
    </div>
  );
}

function SpecProgress({ spec }: { spec: ExperimentSpec }) {
  return (
    <div className="spec-progress" aria-label={`${spec.id} preparation status`}>
      {spec.stages.map((stage) => (
        <span className={`is-${stage.state}`} key={stage.label} title={`${stage.label}: ${stage.state}`}>
          <i />
          <small>{stage.label}</small>
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewId>("now");
  const [trackId, setTrackId] = useState<TrackId>("M-AI");
  const [query, setQuery] = useState("");
  const [candidateScope, setCandidateScope] = useState<CandidateScope>("focus");
  const [candidateTrack, setCandidateTrack] = useState<TrackId | "all">("all");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [leaderBrief, setLeaderBrief] = useState(os.leaderBrief);

  // Delta-aware Leader Brief: the SSR render uses the checkpoint-null baseline
  // (os.leaderBrief). After mount we read this browser's last-view checkpoint
  // from localStorage, recompute the brief against it, then persist the current
  // revision so the *next* visit shows a real since-last-view delta.
  useEffect(() => {
    const KEY = "auto-research:last-view";
    let checkpoint: { revision?: string; since?: string } | null = null;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) checkpoint = JSON.parse(raw);
    } catch {
      checkpoint = null;
    }
    const derived = buildResearchSnapshot(researchIndex, checkpoint) as DerivedSnapshot;
    setLeaderBrief(derived.leaderBrief);
    try {
      const latestMaterialTs = [...researchIndex.researchEvents]
        .filter((event) => event.outcome === "material-change")
        .map((event) => event.timestamp)
        .sort()
        .at(-1);
      window.localStorage.setItem(
        KEY,
        JSON.stringify({ revision: researchIndex.sourceRevision, since: latestMaterialTs ?? null }),
      );
    } catch {
      /* localStorage unavailable — since-last-view stays best-effort */
    }
  }, []);

  const selectedCandidate = candidateId ? candidateById.get(candidateId) ?? null : null;
  const selectedSource = sourceId ? sourceById.get(sourceId) ?? null : null;
  const selectedTrack = trackById.get(trackId) ?? researchIndex.tracks[0];
  const selectedTrackSummary = os.trackSummaries.find((track) => track.id === trackId) ?? os.trackSummaries[0];

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCandidateId(null);
        setSourceId(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const filteredCandidates = useMemo(() => {
    return researchIndex.candidates.filter((candidate) => {
      const scopeMatch = candidateScope === "all"
        ? true
        : candidateScope === "nested"
          ? candidate.nestedInto.length > 0
          : candidate.nestedInto.length === 0 && (candidate.maturity !== "radar" || candidate.workState !== "active");
      const trackMatch = candidateTrack === "all" || candidate.trackId === candidateTrack;
      const text = `${candidate.id} ${candidate.title} ${candidate.nextAction} ${candidate.blocker ?? ""} ${candidate.outputShape.join(" ")}`;
      return scopeMatch && trackMatch && (!query.trim() || includesQuery(text, query));
    });
  }, [candidateScope, candidateTrack, query]);

  const promotionWatch = researchIndex.candidates.filter(
    (candidate) => candidate.maturity === "probe" && candidate.workState === "active" && candidate.nestedInto.length === 0,
  );

  const specStatusCounts = useMemo(() => {
    const counts = { ready: 0, definition: 0, blocked: 0, nested: 0 } as Record<ExperimentSpec["status"], number>;
    for (const spec of researchIndex.experimentSpecs) counts[spec.status] += 1;
    return counts;
  }, []);
  const totalSpecCount = researchIndex.experimentSpecs.length;

  const mapClusters = researchIndex.clusters.filter((cluster) => {
    if (cluster.trackId !== trackId) return false;
    if (!query.trim()) return true;
    const sourceText = cluster.sourceIds.map((id) => sourceById.get(id)?.title ?? "").join(" ");
    return includesQuery(`${cluster.id} ${cluster.title} ${cluster.focus} ${cluster.gap} ${sourceText}`, query);
  });

  const openCandidate = (id: string) => {
    if (!candidateById.has(id)) return;
    setCandidateId(id);
    setSourceId(null);
  };

  const navigate = (nextView: ViewId) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLeaderPointer = (item: LeaderAttention) => {
    // Route by the item's declared pointerKind so Decision/Event cards are not
    // dead clicks (audit §A4). Candidate/paper fall back to opening the entity.
    if (item.pointerKind === "decision" || item.pointerKind === "event") {
      navigate("decisions");
      return;
    }
    if (item.pointerKind === "paper") {
      navigate("papers");
      return;
    }
    const candidatePointer = item.pointerIds.find((id) => candidateById.has(id));
    if (candidatePointer) {
      navigate("candidates");
      setCandidateScope("focus");
      openCandidate(candidatePointer);
    } else {
      navigate("papers");
    }
  };

  const openTrack = (id: TrackId, destination: ViewId = "map") => {
    setTrackId(id);
    navigate(destination);
    setQuery("");
  };

  return (
    <main className="research-app">
      <header className="topbar">
        <button className="brand-lockup" type="button" onClick={() => navigate("now")}>
          <span className="brand-mark">AR</span>
          <span><strong>Auto Research OS</strong><small>Memory · Proactive · Personalization</small></span>
        </button>
        <div className="truth-stamp">
          <span className={os.integrity.ok ? "truth-dot" : "truth-dot is-error"} />
          <span><strong>{os.integrity.ok ? "Canonical snapshot valid" : "Integrity warning"}</strong><small>{researchIndex.generatedAt.slice(0, 10)} · schema v{researchIndex.schemaVersion}</small></span>
        </div>
      </header>

      <section className="command-header">
        <div className="truth-metrics" aria-label="Canonical research metrics">
          <div><strong>{os.summary.independentCandidateCount}</strong><span>independent Candidates</span><small>{os.summary.candidateNodeCount} nodes · {os.summary.nestedSliceCount} nested</small></div>
          <div><strong>{os.summary.probeReadyCount}</strong><span>Cheap Probe ready</span><small>Spec readiness, not results</small></div>
          <div className="critical"><strong>{os.summary.actualRunCount}</strong><span>Actual Runs</span><small>{os.summary.localResultCount} Local Results</small></div>
          <div><strong>{os.summary.paperProjectCount}</strong><span>Paper Projects</span><small>{os.summary.paperOpportunityCount} qualified opportunities</small></div>
        </div>
      </section>

      <nav className="workspace-nav" aria-label="Auto Research workspaces">
        <div className="workspace-tabs">
          {operatorViews.map((item) => (
            <button className={view === item.id ? "is-active" : ""} key={item.id} type="button" onClick={() => navigate(item.id)}>
              <small>{item.eyebrow}</small><span>{item.label}</span>
            </button>
          ))}
          <span className="tab-divider" aria-hidden="true" />
          {systemViews.map((item) => (
            <button className={`is-secondary ${view === item.id ? "is-active" : ""}`} key={item.id} type="button" onClick={() => navigate(item.id)}>
              <small>{item.eyebrow}</small><span>{item.label}</span>
            </button>
          ))}
        </div>
        <label className="global-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 Candidate / Source / Spec…" aria-label="Search research entities" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </label>
      </nav>

      {view === "now" && (
        <div className="workspace-stack">
          <section className="leader-brief">
            <div className="delta-headline">
              <p className="eyebrow">{leaderBrief.checkpointKnown ? "Since last view" : "Latest recorded changes"}</p>
              <h2>{leaderBrief.headline}</h2>
            </div>
            <div className="attention-grid">
              {leaderBrief.attention.map((item, index) => (
                <button className={`attention-card kind-${item.kind}`} type="button" key={item.id} onClick={() => openLeaderPointer(item)}>
                  <span className="attention-rank">0{index + 1}</span>
                  <div className="attention-title"><small>{item.kind} · basis: {item.basisKind}{item.evidenceLevel ? ` · evidence: ${item.evidenceLevel}` : ""}</small><h3>{item.title}</h3></div>
                  <p>{item.explanation}</p>
                  <div><small>NEXT</small><strong>{item.nextAction}</strong></div>
                  <span className="attention-link">{item.pointerIds.slice(0, 5).join(" · ")} →</span>
                </button>
              ))}
            </div>
          </section>

          <section className="section-shell">
            <div className="section-heading compact">
              <div><p className="eyebrow">Portfolio movement</p><h2>六条 Track：谁在推进，谁被卡住？</h2></div>
              <WorkspaceHint text="颜色只表示成熟度分布；推进只来自 Evidence 与 Decision。" tip="Track 是资产索引，不是科学 ontology。完整定义见 Help。" onHelp={() => navigate("help")} />
            </div>
            <div className="track-matrix" role="table" aria-label="Track movement matrix">
              <div className="track-matrix-head" role="row"><span>Track</span><span>Mode</span><span>Lead candidates</span><span>Maturity</span><span>Blocker / unlock</span></div>
              {os.trackSummaries.map((summary) => {
                const track = trackById.get(summary.id)!;
                const blockedCandidate = researchIndex.candidates.find((candidate) => candidate.trackId === summary.id && candidate.workState === "blocked");
                return (
                  <button className="track-row" style={trackStyle(summary.id)} key={summary.id} type="button" onClick={() => openTrack(summary.id)}>
                    <div className="track-row-id"><span>{summary.id}</span><strong>{track.title}</strong><StatusPill tone={summary.health}>{summary.health}</StatusPill></div>
                    <div className="track-row-mode"><b>{summary.mode}</b><small>{summary.independentCount} independent · {summary.probeReadyCount} probe</small></div>
                    <div className="track-row-lead"><strong>{summary.leadCandidateIds.join(" · ") || "—"}</strong></div>
                    <div className="track-row-spark"><StageRail summary={summary} /></div>
                    <div className="track-row-blocker">{blockedCandidate ? <><small>{blockedCandidate.id}</small><span>{blockedCandidate.unlockCondition ?? blockedCandidate.blocker}</span></> : <span className="track-row-clear">—</span>}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="section-shell not-now">
            <div className="section-heading compact"><div><p className="eyebrow">Attention guardrail</p><h2>现在不用管什么</h2></div></div>
            <ul>{leaderBrief.notNow.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="truth-callout"><strong>最重要的诚实信号</strong><p>{os.summary.actualRunCount === 0 ? "0 Run 不是空白要被 UI 填满，而是执行闭环尚未启动的精确状态。" : `已有 ${os.summary.actualRunCount} 个可审计 Run / ${os.summary.localResultCount} 条 Local Result；仍是机制级证据，尚未在真实系统上量化 prevalence。`} 对象模型、Evidence spine 与写入协议见 <button className="inline-link" type="button" onClick={() => navigate("help")}>Help</button> / <button className="inline-link" type="button" onClick={() => navigate("system")}>System</button>。</p></div>
          </section>
        </div>
      )}

      {view === "map" && (
        <div className="workspace-stack">
          <TrackSwitcher active={trackId} onSelect={setTrackId} />
          <section className="map-head" style={trackStyle(trackId)}>
            <div><p className="eyebrow">{selectedTrack.id} · {selectedTrack.family}</p><h2>{selectedTrack.title}</h2><p>{selectedTrack.thesis}</p></div>
            <div><small>TRACK MODE</small><strong>{selectedTrack.mode}</strong><p>{selectedTrack.modeReason}</p><span>{selectedTrackSummary.independentCount} independent · {mapClusters.length} clusters</span></div>
          </section>
          <div className="evidence-legend">
            <span><i className="legend-source" />Source Paper = 外部覆盖与压力</span>
            <span><i className="legend-gap" />Gap = 当前可观察空白</span>
            <span><i className="legend-candidate" />Candidate = 待证伪推论</span>
          </div>
          <section className="cluster-grid">
            {mapClusters.map((cluster) => {
              const gap = researchIndex.gaps.find((item) => item.id === cluster.gapId);
              const candidateIds = gap?.candidateIds ?? [];
              return (
                <article className="cluster-card" style={trackStyle(cluster.trackId)} key={cluster.id}>
                  <div className="cluster-top"><span>{cluster.id}</span><small>{cluster.sourceIds.length} linked Sources</small></div>
                  <h3>{cluster.title}</h3>
                  <dl><div><dt>研究对象</dt><dd>{cluster.focus}</dd></div><div><dt>常见评测</dt><dd>{cluster.commonEvaluation}</dd></div></dl>
                  <div className="gap-block"><small>{cluster.gapId} · REMAINING GAP</small><p>{cluster.gap}</p></div>
                  <div className="source-stack"><small>SOURCE PRESSURE</small>{cluster.sourceIds.slice(0, 5).map((id) => {
                    const source = sourceById.get(id);
                    return source ? <button type="button" key={id} onClick={() => setSourceId(id)}><span>{source.title}</span><small>{source.year} · {source.venue}</small></button> : null;
                  })}{cluster.sourceIds.length > 5 && <span className="more-count">+{cluster.sourceIds.length - 5} more Sources</span>}</div>
                  <div className="candidate-links"><small>FEEDS CANDIDATES</small>{candidateIds.length ? candidateIds.map((id) => <button type="button" key={id} onClick={() => openCandidate(id)}>{id} · {candidateById.get(id)?.title}</button>) : <span>尚未建立稳定 Candidate link</span>}</div>
                </article>
              );
            })}
          </section>
          {!mapClusters.length && <EmptyTruth title="没有匹配的 Cluster" detail="清空搜索，或切换 Track。" />}
          <section className="source-inventory">
            <div><p className="eyebrow">Source inventory</p><h2>{os.summary.sourceStats.total} 个核验入口，{researchIndex.clusters.length} 个结构化 Cluster</h2><p>{os.summary.sourceStats.verified} verified · {os.summary.sourceStats.verifiedAbstract} verified-abstract（仅摘要核对）。未进入 Cluster 的来源仍保留，但不假装已完成聚类或 assertion 级归因。</p></div>
            <div><strong>{os.summary.sourceStats.unclustered}</strong><span>Sources 尚未进入任何 Cluster</span><small>{os.summary.sourceStats.assertionUnlinked} 条尚无 assertion 级 Evidence Link</small></div>
          </section>
        </div>
      )}

      {view === "candidates" && (
        <div className="workspace-stack">
          <section className="candidate-head">
            <div><p className="eyebrow">Core work unit</p><h2>Candidate Workspace</h2><WorkspaceHint text="每张卡都能追到 Source · Spec · Run · Decision · Paper Thread。" tip="Proposal 是 Candidate 的厚卡视图，不是另一套对象。对象模型见 Help。" onHelp={() => navigate("help")} /></div>
            <div className="candidate-count"><strong>{filteredCandidates.length}</strong><span>showing</span><small>{os.summary.independentCandidateCount} independent · {os.summary.nestedSliceCount} nested</small></div>
          </section>
          <section className="candidate-controls">
            <div className="segmented-control">
              {(["focus", "all", "nested"] as CandidateScope[]).map((scope) => <button className={candidateScope === scope ? "is-active" : ""} type="button" key={scope} onClick={() => setCandidateScope(scope)}>{scope === "focus" ? "Active focus" : scope === "all" ? `All ${researchIndex.candidates.length} nodes` : "Nested slices"}</button>)}
            </div>
            <div className="track-filter"><button className={candidateTrack === "all" ? "is-active" : ""} type="button" onClick={() => setCandidateTrack("all")}>ALL</button>{researchIndex.tracks.map((track) => <button className={candidateTrack === track.id ? "is-active" : ""} style={trackStyle(track.id)} type="button" key={track.id} onClick={() => setCandidateTrack(track.id)}>{track.id}</button>)}</div>
          </section>
          <section className="candidate-table" aria-label="Candidate workspace">
            <div className="candidate-table-head"><span>Candidate</span><span>State</span><span>Evidence</span><span>Next evidence</span><span>Trace</span></div>
            {filteredCandidates.map((candidate) => {
              const trace = os.trace(candidate.id);
              return (
                <button className="candidate-row" style={trackStyle(candidate.trackId)} type="button" key={candidate.id} onClick={() => openCandidate(candidate.id)}>
                  <div className="candidate-identity"><span>{candidate.id} · {candidate.trackId}</span><strong>{candidate.title}</strong><small>{candidate.outputShape.join(" · ")}</small></div>
                  <div className="candidate-state"><StatusPill tone={candidate.maturity}>{maturityLabel[candidate.maturity]}</StatusPill><StatusPill tone={candidate.workState}>{workLabel[candidate.workState]}</StatusPill>{candidate.nestedInto.length > 0 && <small>→ {candidate.nestedInto.join(" / ")}</small>}</div>
                  <div className="candidate-evidence"><strong>{candidate.evidenceSummary}</strong><small>{candidate.sourceIds.length} direct Source links</small></div>
                  <div className="candidate-next"><strong>{candidate.proposal?.nextEvidence ?? candidate.nextAction}</strong>{candidate.blocker && <small>{candidate.blocker}</small>}</div>
                  <div className="candidate-trace"><span>{trace.specIds.length}<small>Specs</small></span><span>{trace.runIds.length}<small>Runs</small></span><span>{trace.decisionIds.length}<small>Decisions</small></span><i>↗</i></div>
                </button>
              );
            })}
          </section>
          {!filteredCandidates.length && <EmptyTruth title="没有匹配的 Candidate" detail="调整范围、Track 或搜索词。" />}
        </div>
      )}

      {view === "experiments" && (
        <div className="workspace-stack">
          <section className="experiment-head">
            <div><p className="eyebrow">Execution truth</p><h2>Experiment Center</h2><WorkspaceHint text={`Spec 是设计，Run 才是执行；${totalSpecCount} Specs · ${specStatusCounts.ready} Ready · ${os.summary.actualRunCount} Runs。`} tip="没有 manifest 不算 Run，没有 digest 不算 Artifact。定义见 Help。" onHelp={() => navigate("help")} /></div>
            <div className="run-zero"><span>ACTUAL RUNS</span><strong>{os.summary.actualRunCount}</strong><small>{os.summary.localResultCount} Local Results</small></div>
          </section>
          <section className="spec-board">
            {(["ready", "definition", "blocked", "nested"] as ExperimentSpec["status"][]).map((status) => {
              const specs = researchIndex.experimentSpecs.filter((spec) => spec.status === status && (!query.trim() || includesQuery(`${spec.id} ${spec.title} ${spec.decisionQuestion}`, query)));
              return (
                <div className={`spec-lane lane-${status}`} key={status}>
                  <div className="spec-lane-head"><div><span>{specLaneMeta[status].label}</span><small>{specLaneMeta[status].detail}</small></div><b>{specs.length}</b></div>
                  <div className="spec-cards">{specs.map((spec) => {
                    const candidate = candidateById.get(spec.candidateIds[0]);
                    return (
                      <article className="spec-card" style={candidate ? trackStyle(candidate.trackId) : undefined} key={spec.id}>
                        <div className="spec-card-top"><span>{spec.id}</span><small>{candidate?.trackId} · {spec.resource}</small></div>
                        <button type="button" onClick={() => candidate && openCandidate(candidate.id)}>{spec.title}</button><p>{spec.scale}</p>
                        <SpecProgress spec={spec} />
                        <dl><div><dt>Decision</dt><dd>{spec.decisionQuestion}</dd></div><div><dt>Metric</dt><dd>{spec.primaryMetric}</dd></div><div><dt>Killer baseline</dt><dd>{spec.killerBaseline}</dd></div></dl>
                        {spec.note && <div className="spec-note">{spec.note}</div>}
                      </article>
                    );
                  })}</div>
                </div>
              );
            })}
          </section>
          <section className="run-ledger">
            <div><p className="eyebrow">Run ledger</p><h2>只有真实执行才会出现在这里</h2></div>
            <EmptyTruth title="尚无 Run Manifest" detail="下一条有效记录应包含 commit、data snapshot、actual resource、startedAt、outputs 与 stop reason。" />
          </section>
        </div>
      )}

      {view === "decisions" && (() => {
        const proposedDecisions = researchIndex.decisions.filter((decision) => decision.state === "proposed");
        const appliedDecisions = researchIndex.decisions.filter((decision) => decision.state === "applied");
        const lineageDecisions = researchIndex.decisions.filter((decision) => ["split", "nest", "merge"].includes(decision.outcome));
        const filteredHistory = researchIndex.decisions.filter((decision) => outcomeFilter === "all" || decision.outcome === outcomeFilter);
        const materialEvents = researchIndex.researchEvents.filter((event) => event.outcome === "material-change");
        return (
        <div className="workspace-stack">
          <section className="decision-head"><div><p className="eyebrow">Decision inbox</p><h2>Decision & Lineage</h2><WorkspaceHint text="先看待决事项，再看已应用变化与 Candidate 谱系。" tip="科学判断与 Run 状态分离；高影响变化经 proposed → approved → applied。词典与写入协议见 Help / System。" onHelp={() => navigate("help")} /></div><div className="decision-state-metrics">{(["proposed", "approved", "applied"] as const).map((state) => <div key={state}><strong>{researchIndex.decisions.filter((decision) => decision.state === state).length}</strong><span>{state}</span></div>)}</div></section>

          <section className="section-shell decision-inbox">
            <div className="section-heading compact"><div><p className="eyebrow">1 · Decision inbox</p><h2>现在需要你决定什么</h2></div><StatusPill tone={proposedDecisions.length > 0 ? "proposed" : "moving"}>{proposedDecisions.length} proposed</StatusPill></div>
            {proposedDecisions.length > 0 ? proposedDecisions.map((decision) => (
              <article className={`decision-record outcome-${decision.outcome}`} key={decision.id}>
                <div><time>{decision.date}</time><StatusPill tone={decision.state}>{decision.state}</StatusPill></div>
                <span>{decision.id} · {decisionLabel[decision.outcome]}</span><h3>{decision.candidateIds.join(" → ")}</h3><p>{decision.rationale}</p>
                <small>BASIS · {decision.basis.map((basis) => `${basis.type}: ${basis.ref}`).join(" · ")}</small>
              </article>
            )) : <div className="truth-callout"><strong>没有等待批准的高影响 Decision</strong><p>Kill / Split / Merge / Paper 立项 / 真实 GPU Run 出现时才会进入这个收件箱；Agent 可继续自主推进 CPU/API evaluator。</p></div>}
          </section>

          <section className="section-shell">
            <div className="section-heading compact"><div><p className="eyebrow">2 · Recently applied</p><h2>已经改变了什么（{appliedDecisions.length}）</h2></div>
              <div className="outcome-filter">
                <button className={outcomeFilter === "all" ? "is-active" : ""} type="button" onClick={() => setOutcomeFilter("all")}>ALL</button>
                {(["continue", "split", "nest", "merge", "park", "kill"] as Decision["outcome"][]).map((outcome) => <button className={outcomeFilter === outcome ? "is-active" : ""} type="button" key={outcome} onClick={() => setOutcomeFilter(outcome)}>{decisionLabel[outcome]}</button>)}
              </div>
            </div>
            <div className="decision-history">
              {filteredHistory.map((decision) => (
                <article className={`decision-record outcome-${decision.outcome}`} key={decision.id}>
                  <div><time>{decision.date}</time><StatusPill tone={decision.state}>{decision.state}</StatusPill></div>
                  <span>{decision.id} · {decisionLabel[decision.outcome]}</span><h3>{decision.candidateIds.join(" → ")}</h3><p>{decision.rationale}</p>
                  <small>BASIS · {decision.basis.map((basis) => `${basis.type}: ${basis.ref}`).join(" · ")}</small>
                </article>
              ))}
              {!filteredHistory.length && <EmptyTruth title="该 outcome 尚无记录" detail="清除筛选查看全部已应用 Decision。" />}
            </div>
          </section>

          <section className="decision-layout">
            <div className="section-shell">
              <div className="section-heading compact"><div><p className="eyebrow">3 · Candidate lineage</p><h2>问题如何演化</h2></div></div>
              <div className="lineage-list">
                {lineageDecisions.length ? lineageDecisions.map((decision) => (
                  <div className={`lineage-row outcome-${decision.outcome}`} key={decision.id}>
                    <StatusPill tone={decision.outcome}>{decisionLabel[decision.outcome]}</StatusPill>
                    <strong>{decision.candidateIds.join(" → ")}</strong>
                    <small>{decision.rationale}</small>
                  </div>
                )) : <span className="lineage-empty">尚无 Split / Nest / Merge 谱系变化。</span>}
              </div>
            </div>
            <div className="section-shell">
              <div className="section-heading compact"><div><p className="eyebrow">4 · Material-change narrative</p><h2>变化的可读叙述</h2></div></div>
              <div className="material-narrative">
                {materialEvents.map((event) => (
                  <details key={event.id}>
                    <summary><strong>{event.type}</strong><time>{event.timestamp.slice(0, 10)}</time><span>{event.affectedEntityIds.length} entities</span></summary>
                    <p>{event.nextEvidenceAcceptance || "source pressure change — 尚未应用 Candidate 状态变化，也没有 Local Result。"}</p>
                    <small>{event.id} · {event.affectedEntityIds.slice(0, 8).join(" · ")}{event.affectedEntityIds.length > 8 ? " …" : ""}</small>
                  </details>
                ))}
                {!materialEvents.length && <span className="lineage-empty">尚无 material-change 事件。</span>}
              </div>
            </div>
          </section>
        </div>
        );
      })()}

      {view === "papers" && (
        <div className="workspace-stack">
          <section className="paper-head"><div><p className="eyebrow">Lagging outcome</p><h2>Paper Portfolio</h2><WorkspaceHint text="回答“正在形成什么论文”，不是“读过什么论文”；不提前创建 Draft。" tip="完整 4 步 Promotion Contract 见 Help / Paper lifecycle。" onHelp={() => navigate("help")} /></div><div className="paper-metrics"><div><strong>{os.summary.paperOpportunityCount}</strong><span>Qualified Opportunities</span></div><div><strong>{os.summary.paperProjectCount}</strong><span>Paper Projects</span></div></div></section>
          <section className="paper-empty"><EmptyTruth title="尚无达标 Paper Opportunity" detail="这是由 0 Actual Run 推导出的诚实状态；一次有效 Cheap Probe 只是晋级必要条件，不是充分条件。" /></section>
          <section className="promotion-watch full-width"><p className="eyebrow">Promotion watch · not Opportunity</p><h2>最接近产生新证据的 {promotionWatch.length} 张卡</h2>{promotionWatch.map((candidate) => <button type="button" style={trackStyle(candidate.trackId)} key={candidate.id} onClick={() => openCandidate(candidate.id)}><span>{candidate.id} · {candidate.trackId}</span><strong>{candidate.title}</strong><small>{candidate.proposal?.nextEvidence ?? candidate.nextAction}</small></button>)}</section>
        </div>
      )}

      {view === "library" && (
        <div className="workspace-stack">
          <section className="asset-head"><div><p className="eyebrow">Research memory</p><h2>Library</h2><WorkspaceHint text="具体可复用实例：evaluator · dataset · prompt · tool · failure archive。" tip="Source authority 与 one-write / sync 实现在 System；External Review 边界规则在 Help。" onHelp={() => navigate("help")} /></div><StatusPill tone={os.integrity.ok ? "moving" : "blocked"}>{os.integrity.ok ? "index valid" : "needs repair"}</StatusPill></section>
          <section className="asset-grid"><div className="section-heading"><div><p className="eyebrow">Asset TYPE definitions</p><h2>A-001…A-009 是资产类型，不是复用实例</h2></div><p>这些是 schema 里的资产类型定义（Source ledger、Run manifest…）。真正的可复用 evaluator / dataset / prompt 实例产生后才会作为实例列出；失败、Negative Result 和 Kill 同样进入可检索资产。</p></div><div className="asset-cards">{researchIndex.reusableAssets.map((asset) => <article key={asset.id}><div><span>{asset.id}</span><small>TYPE · {asset.owner}</small></div><h3>{asset.title}</h3><p>{asset.question}</p><strong>{asset.output}</strong></article>)}</div></section>
          <section className="section-shell library-instances">
            <div className="section-heading compact"><div><p className="eyebrow">Reusable instances</p><h2>具体复用实例</h2></div></div>
            <EmptyTruth title="尚无具体 reusable instance" detail="第一批可复用 evaluator / dataset / prompt / tool 需由 Local Result 或 Run 产出；当前只有类型定义。" />
          </section>
          <section className="review-boundary"><div><p className="eyebrow">External review records</p><h2>Reviews</h2><WorkspaceHint text="审稿原文与本地 verdict 的记录；边界规则见 Help / Governance。" tip="External Review 只能 pressure，不能 support Evidence。" onHelp={() => navigate("help")} /></div>{researchIndex.externalReviews.map((review) => <article key={review.id}><span>{review.id} · {review.date}</span><strong>{review.title}</strong><small>{review.role}</small><p>Raw: {review.rawRef}<br />Verdict: {review.verdictRef}</p></article>)}</section>
        </div>
      )}

      {view === "help" && (
        <div className="workspace-stack">
          <section className="asset-head"><div><p className="eyebrow">Help · Glossary · Governance</p><h2>系统如何运作，术语怎么定义</h2><p>这些规则支撑系统正确性，但不随一周研究进展变化，因此从 Leader / Operator 主路径退到这里。系统的写入 / 同步 / 健康见 <button className="inline-link" type="button" onClick={() => navigate("system")}>System</button>。</p></div></section>

          <section className="section-shell">
            <div className="section-heading compact"><div><p className="eyebrow">Object model</p><h2>对象模型词典</h2></div></div>
            <div className="glossary-grid">
              {[
                ["Candidate", "核心工作单元：一个可证伪的推论。五个正交状态：maturity / workState / evidence / nested / blocker。"],
                ["Proposal", "Candidate 的厚卡视图，不是另一套对象；承载 falsifiable claim、metric、killer baseline。"],
                ["Track", "资产索引，不是科学 ontology；颜色只表示成熟度分布，推进只来自 Evidence 与 Decision。"],
                ["Spec", "实验设计，不是执行。定义 decision question、metric、killer baseline 与 readiness。"],
                ["Run", "真实执行；没有 manifest（commit + data snapshot + start time）就不算 Run。"],
                ["Artifact", "Run 的产物；没有 digest 就不能支持 Local Result。"],
                ["Evidence level", "assertion 级：Unverified Lead · Source Supported · Inference · Local Result。"],
                ["Paper Opportunity / Project", "滞后产出；只有 surviving evidence 才能形成，不提前命名论文。"],
              ].map(([term, desc]) => <div key={String(term)}><strong>{term}</strong><p>{desc}</p></div>)}
            </div>
          </section>

          <section className="decision-vocabulary">{(["continue", "split", "nest", "merge", "park", "kill"] as Decision["outcome"][]).map((outcome) => <div key={outcome}><StatusPill tone={outcome}>{decisionLabel[outcome]}</StatusPill><p>{{ continue: "强 baseline 后仍有稳定 failure/headroom。", split: "问题成立，但变量或单位需要分叉。", nest: "独立 Claim 终止，保留为上位 evaluator slice。", merge: "两个 Candidate 合并为同一可证伪对象。", park: "暂缺数据、许可、ground truth 或资源，记录解锁条件。", kill: "被直接覆盖、无 headroom、proxy 失效或不可识别。" }[outcome]}</p></div>)}</section>

          <section className="now-split">
            <div className="section-shell evidence-path">
              <div className="section-heading compact"><div><p className="eyebrow">Evidence spine</p><h2>对象如何串成证据脊柱</h2></div></div>
              <div className="evidence-spine">
                {[
                  ["Source", researchIndex.sourcePapers.length, "verified ledger entries"],
                  ["Candidate", os.summary.independentCandidateCount, "falsifiable work units"],
                  ["Spec", researchIndex.experimentSpecs.length, "designs, not executions"],
                  ["Run", os.summary.actualRunCount, "requires manifest"],
                  ["Artifact", researchIndex.artifacts.length, "requires digest"],
                  ["Decision", researchIndex.decisions.length, "proposed / approved / applied"],
                  ["Paper", os.summary.paperProjectCount, "requires surviving evidence"],
                ].map(([label, count, detail], index) => (
                  <div className={Number(count) === 0 ? "is-empty" : ""} key={String(label)}>
                    <span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><b>{count}</b><small>{detail}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="promotion-gate section-shell"><p className="eyebrow">Promotion contract</p><h2>Candidate 何时能形成 Paper Thread？</h2><ol><li><span>01</span><div><strong>Valid Cheap Probe</strong><p>有可审计 Run + Artifact，positive / negative / mixed 均可。</p></div></li><li><span>02</span><div><strong>Surviving Claim</strong><p>强 baseline 后仍有明确 failure 或可复用 diagnosis。</p></div></li><li><span>03</span><div><strong>Novelty pressure survived</strong><p>最近相关工作没有直接吞掉核心变量。</p></div></li><li><span>04</span><div><strong>Composable evidence path</strong><p>Candidate、Artifact、贡献与目标 venue 能构成证据脊柱。</p></div></li></ol></div>
          </section>

          <section className="review-boundary"><div><p className="eyebrow">Governance · Evidence boundary</p><h2>GPT Pro 是审稿压力，不是论文证据</h2><p>Raw review → Local verdict → proposed Decision → approved/applied。任何模型分数、novelty 判断或建议都不能直接升级 Evidence。External Review 只能 pressure，不能 support。审稿记录见 <button className="inline-link" type="button" onClick={() => navigate("library")}>Library</button>。</p></div><article><span>Source authority</span><strong>冲突时谁说了算？</strong><p>Canonical → Current state → Verified evidence → Adopted decision → Legacy。完整排名与 sync 实现见 <button className="inline-link" type="button" onClick={() => navigate("system")}>System</button>。</p></article></section>
        </div>
      )}

      {view === "system" && (
        <div className="workspace-stack">
          <section className="asset-head"><div><p className="eyebrow">System · Implementation · Health</p><h2>如何写入，如何同步，是否健康</h2><p>正常时全局 topbar 只显示一个小型健康点。以下细节只在需要排查 canonical / stale / lock / recovery 时展开。术语与治理见 <button className="inline-link" type="button" onClick={() => navigate("help")}>Help</button>。</p></div><StatusPill tone={os.integrity.ok ? "moving" : "blocked"}>{os.integrity.ok ? "snapshot valid" : "integrity warning"}</StatusPill></section>
          <section className="authority-grid">
            <div className="authority-stack"><p className="eyebrow">Source authority</p><h2>冲突时谁说了算？</h2>{[
              ["01", "Canonical", "CONTEXT · REQUIREMENTS · OPERATIONS"],
              ["02", "Current state", "research-index.yaml · Research Events"],
              ["03", "Verified evidence", "Source ledger · primary pages"],
              ["04", "Adopted decision", "Local verdict · applied Decision"],
              ["05", "Supporting / legacy", "只保留审计，不覆盖上层"],
            ].map(([rank, label, files]) => <div key={String(rank)}><span>{rank}</span><strong>{label}</strong><small>{files}</small></div>)}</div>
            <div className="sync-contract"><p className="eyebrow">One-write contract</p><h2>更新一次，所有视图同步</h2><div className="sync-flow"><span>Canonical index</span><i>→</i><span>Atomic writer</span><i>→</i><span>Generated snapshot</span><i>→</i><span>Browser views</span></div><dl><div><dt>Structured state</dt><dd>research-index.yaml</dd></div><div><dt>Append-only changes</dt><dd>research-events.jsonl</dd></div><div><dt>Settlement writer</dt><dd>scripts/settle-research-event.mjs</dd></div><div><dt>Source revision</dt><dd title={researchIndex.sourceRevision}>{researchIndex.sourceRevision.slice(0, 21)}…</dd></div><div><dt>Dashboard adapter</dt><dd>dashboard/scripts/sync-research-index.mjs</dd></div><div><dt>Generated at</dt><dd>{researchIndex.generatedAt.slice(0, 10)} · schema v{researchIndex.schemaVersion}</dd></div><div><dt>Evidence boundary</dt><dd>External Review 只能 pressure，不能 support</dd></div></dl></div>
          </section>
          <section className="settlement-panel section-shell">
            <div className="section-heading compact"><div><p className="eyebrow">Atomic settlement</p><h2>每次研究交互必须落什么</h2></div></div>
            <ol><li><b>01</b><span>scope 与 base revision</span></li><li><b>02</b><span>affected entity IDs</span></li><li><b>03</b><span>typed evidence / changed assertions</span></li><li><b>04</b><span>decision state 与 rationale</span></li><li><b>05</b><span>next-evidence acceptance</span></li><li><b>06</b><span>blocker 与 unlock condition</span></li></ol>
            <div className="event-log"><small>APPEND-ONLY EVENTS</small>{researchIndex.researchEvents.map((event) => <div key={event.id}><span>{event.id}</span><strong>{event.type}</strong><small>{event.affectedEntityIds.join(" · ")}</small></div>)}</div>
          </section>
        </div>
      )}

      <footer>
        <span>Auto Research OS · canonical read model · as of {researchIndex.generatedAt.slice(0, 10)}</span>
        <p><button className="inline-link" type="button" onClick={() => navigate("help")}>Help</button> · <button className="inline-link" type="button" onClick={() => navigate("system")}>System</button> · {os.integrity.ok ? "health OK" : "integrity warning"}</p>
      </footer>

      {selectedCandidate && <CandidateModal candidate={selectedCandidate} onClose={() => setCandidateId(null)} onSource={setSourceId} />}
      {selectedSource && <SourceModal source={selectedSource} onClose={() => setSourceId(null)} onCandidate={openCandidate} />}
    </main>
  );
}

function TrackSwitcher({ active, onSelect }: { active: TrackId; onSelect: (id: TrackId) => void }) {
  return <section className="track-switcher" aria-label="Select Track">{researchIndex.tracks.map((track) => <button className={active === track.id ? "is-active" : ""} style={trackStyle(track.id)} type="button" key={track.id} onClick={() => onSelect(track.id)}><span>{track.id}</span><strong>{track.title}</strong><small>{track.mode}</small></button>)}</section>;
}

function CandidateModal({ candidate, onClose, onSource }: { candidate: Candidate; onClose: () => void; onSource: (id: string) => void }) {
  const trace = os.trace(candidate.id);
  const specs = trace.specIds.map((id) => specById.get(id)).filter(Boolean) as ExperimentSpec[];
  const decisions = trace.decisionIds.map((id) => decisionById.get(id)).filter(Boolean) as Decision[];
  const sources = trace.sourceIds.map((id) => sourceById.get(id)).filter(Boolean) as SourcePaper[];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="detail-modal candidate-modal" style={trackStyle(candidate.trackId)} role="dialog" aria-modal="true" aria-label={`${candidate.id} details`}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-kicker"><span>{candidate.id} · {candidate.trackId}</span><StatusPill tone={candidate.maturity}>{maturityLabel[candidate.maturity]}</StatusPill><StatusPill tone={candidate.workState}>{workLabel[candidate.workState]}</StatusPill></div>
        <h2>{candidate.title}</h2>
        <div className="modal-truth"><span><small>EVIDENCE</small><strong>{candidate.evidenceSummary}</strong></span><span><small>RESOURCE</small><strong>{candidate.resource}</strong></span><span><small>UPDATED</small><strong>{candidate.updatedAt}</strong></span><span><small>NESTED INTO</small><strong>{candidate.nestedInto.join(" · ") || "—"}</strong></span></div>
        {candidate.proposal ? <>
          <section className="modal-section"><small>FALSIFIABLE CLAIM</small><p className="claim-text">{candidate.proposal.falsifiableClaim}</p><p>{candidate.proposal.composition}</p></section>
          <section className="proposal-facts"><div><small>Evaluation unit</small><strong>{candidate.proposal.evaluationUnit}</strong></div><div><small>Action space</small><strong>{candidate.proposal.actionSpace}</strong></div><div><small>Counterfactual</small><strong>{candidate.proposal.counterfactual}</strong></div><div><small>Primary metric</small><strong>{candidate.proposal.primaryMetric}</strong></div><div><small>Killer baseline</small><strong>{candidate.proposal.killerBaseline}</strong></div><div><small>Kill rule</small><strong>{candidate.proposal.killRule}</strong></div></section>
          <section className="next-evidence-panel"><div><small>NEXT EVIDENCE</small><strong>{candidate.proposal.nextEvidence}</strong></div><div><small>LOCAL VERDICT</small><strong>{candidate.proposal.localVerdict}</strong></div></section>
        </> : <section className="modal-section radar-note"><small>RADAR-DEPTH CARD</small><p>这张 Candidate 仍在 Radar。系统只保留稳定标题、Track、shape 与下一次 overlap/evaluation audit，不提前伪造厚卡。</p></section>}
        {candidate.blocker && <div className="modal-blocker"><small>BLOCKER</small><strong>{candidate.blocker}</strong>{candidate.unlockCondition && <p>Unlock: {candidate.unlockCondition}</p>}</div>}
        <section className="modal-section"><small>TRACEABILITY GRAPH</small><div className="trace-grid"><div><b>{sources.length}</b><span>Sources</span></div><div><b>{trace.gapIds.length}</b><span>Gaps</span></div><div><b>{specs.length}</b><span>Specs</span></div><div><b>{trace.runIds.length}</b><span>Runs</span></div><div><b>{trace.artifactIds.length}</b><span>Artifacts</span></div><div><b>{decisions.length}</b><span>Decisions</span></div><div><b>{trace.paperThreadIds.length}</b><span>Paper Threads</span></div></div></section>
        <section className="modal-two-column"><div><small>LINKED SOURCES</small>{sources.length ? sources.map((source) => <button type="button" key={source.id} onClick={() => onSource(source.id)}>{source.id} · {source.title}</button>) : <span>尚无 assertion-level Source link</span>}</div><div><small>SPECS & DECISIONS</small>{specs.map((spec) => <span key={spec.id}>{spec.id} · {spec.title}</span>)}{decisions.map((decision) => <span key={decision.id}>{decision.id} · {decisionLabel[decision.outcome]} · {decision.state}</span>)}{!specs.length && !decisions.length && <span>尚无下游对象</span>}</div></section>
      </article>
    </div>
  );
}

function SourceModal({ source, onClose, onCandidate }: { source: SourcePaper; onClose: () => void; onCandidate: (id: string) => void }) {
  const clusters = researchIndex.clusters.filter((cluster) => cluster.sourceIds.includes(source.id));
  const candidateIds = [...new Set(researchIndex.evidenceLinks.filter((link) => link.refId === source.id).map((link) => link.assertionId.split("@")[0]))];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className="detail-modal source-modal" role="dialog" aria-modal="true" aria-label={`${source.title} source details`}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-kicker"><span>{source.id}</span><StatusPill tone={source.verification}>{source.verification}</StatusPill></div>
        <h2>{source.title}</h2>
        <div className="source-meta"><span>{source.year}</span><span>{source.venue}</span><span>{source.topic}</span><a href={source.url} target="_blank" rel="noreferrer">打开原始页面 ↗</a></div>
        <section className="modal-section"><small>VERIFIED EVIDENCE BOUNDARY</small><p className="claim-text">{source.evidenceBoundary}</p></section>
        <div className="source-warning"><strong>能支持什么？</strong><p>它只能为已记录 scope 提供直接覆盖或 novelty pressure；不能证明本项目已经复现，也不能自动支持 Candidate 的经验性 Claim。</p></div>
        <section className="modal-two-column"><div><small>LINKED CLUSTERS</small>{clusters.length ? clusters.map((cluster) => <span key={cluster.id}>{cluster.id} · {cluster.title}</span>) : <span>仍在 ledger，等待结构化 Cluster link</span>}</div><div><small>PRESSURES CANDIDATES</small>{candidateIds.length ? candidateIds.map((id) => <button type="button" key={id} onClick={() => onCandidate(id)}>{id} · {candidateById.get(id)?.title}</button>) : <span>尚未建立 assertion-level Candidate link</span>}</div></section>
      </article>
    </div>
  );
}

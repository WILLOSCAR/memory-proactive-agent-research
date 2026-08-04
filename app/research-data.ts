import index from "../data/research-index.json";

export type TrackId = "M-AI" | "M-PHY" | "P-AI" | "P-PHY" | "U-AI" | "U-PHY";
export type TrackMode = "explore" | "validate" | "maintain" | "parked";
export type Maturity = "radar" | "audit" | "problem" | "probe" | "pilot" | "confirmation" | "paper";
export type WorkState = "active" | "blocked" | "parked" | "closed";
export type EvidenceLevel = "unverified-lead" | "source-supported" | "inference" | "local-result";
export type DecisionState = "proposed" | "approved" | "applied";

export type Track = {
  id: TrackId;
  family: string;
  title: string;
  subtitle: string;
  thesis: string;
  accent: string;
  mode: TrackMode;
  modeReason: string;
  unlockCondition: string | null;
};

export type SourcePaper = {
  id: string;
  legacyId: string | null;
  title: string;
  topic: string;
  url: string;
  year: string;
  venue: string;
  verification: "verified" | "unverified-lead";
  evidenceBoundary: string;
  note: string;
  trackIds: TrackId[];
};

export type LiteratureCluster = {
  id: string;
  trackId: TrackId;
  title: string;
  focus: string;
  commonEvaluation: string;
  gapId: string;
  gap: string;
  sourceIds: string[];
};

export type Gap = {
  id: string;
  clusterId: string;
  trackId: TrackId;
  statement: string;
  candidateIds: string[];
};

export type CandidateProposal = {
  paperShape: string;
  origin: string[];
  falsifiableClaim: string;
  composition: string;
  evaluationUnit: string;
  actionSpace: string;
  counterfactual: string;
  primaryMetric: string;
  killerBaseline: string;
  maxDays: string;
  nextEvidence: string;
  killRule: string;
  externalReviewPressure: string;
  localVerdict: string;
};

export type Candidate = {
  id: string;
  trackId: TrackId;
  title: string;
  maturity: Maturity;
  workState: WorkState;
  evidenceSummary: EvidenceLevel;
  outputShape: string[];
  initialRoute: string;
  nextAction: string;
  blocker: string | null;
  unlockCondition: string | null;
  resource: string;
  updatedAt: string;
  nestedInto: string[];
  sourceIds: string[];
  proposal: CandidateProposal | null;
};

export type ExperimentStage = { label: string; state: "done" | "active" | "todo" | "blocked" };
export type ExperimentSpec = {
  id: string;
  candidateIds: string[];
  title: string;
  status: "definition" | "ready" | "blocked" | "nested";
  resource: string;
  scale: string;
  decisionQuestion: string;
  primaryMetric: string;
  killerBaseline: string;
  stages: ExperimentStage[];
  note: string | null;
  plannedRuns: string[];
};

export type Run = {
  id: string;
  specId: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  manifest?: { commit: string; dataSnapshot: string; startedAt: string };
};

export type Artifact = { id: string; runId: string; valid: boolean; digest?: string };
export type EvidenceLink = {
  id: string;
  assertionId: string;
  relation: string;
  basisType: "source-paper" | "local-result" | "inference" | "external-review";
  scope: string;
  refId: string;
};

export type Decision = {
  id: string;
  date: string;
  state: DecisionState;
  outcome: "continue" | "split" | "nest" | "merge" | "park" | "kill";
  candidateIds: string[];
  rationale: string;
  basis: { type: string; ref: string }[];
};

export type PaperThread = {
  id: string;
  stage: "opportunity" | "project";
  title: string;
  candidateIds: string[];
  survivingClaimIds?: string[];
};

export type ResearchEvent = {
  id: string;
  timestamp: string;
  actor: string;
  baseRevision: string;
  type: string;
  affectedEntityIds: string[];
  decisionId?: string;
  outcome: string;
  nextEvidenceAcceptance: string;
  blocker: string | null;
};

export type ReusableAsset = {
  id: string;
  title: string;
  question: string;
  output: string;
  owner: string;
  status: string;
};

export type ResearchIndex = {
  schemaVersion: number;
  generatedAt: string;
  sourceRevision: string;
  sourceSnapshot: Record<string, string>;
  program: {
    id: "PROGRAM";
    title: string;
    researchObject: string;
    cycle: { startsAt: string; endsAt: string };
  };
  tracks: Track[];
  sourcePapers: SourcePaper[];
  clusters: LiteratureCluster[];
  gaps: Gap[];
  candidates: Candidate[];
  experimentSpecs: ExperimentSpec[];
  runs: Run[];
  artifacts: Artifact[];
  evidenceLinks: EvidenceLink[];
  decisions: Decision[];
  paperThreads: PaperThread[];
  researchEvents: ResearchEvent[];
  reusableAssets: ReusableAsset[];
  externalReviews: { id: string; date: string; title: string; role: string; rawRef: string; verdictRef: string }[];
};

export const researchIndex = index as unknown as ResearchIndex;

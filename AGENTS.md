# Auto Research agent entry

This repository separates working research, execution evidence, canonical state, and derived views.

Before a write:

1. Read `SOURCE_AUTHORITY.yaml`.
2. If invoked through a Track or Student `GOAL.md`, follow that concrete binding before broad repository discovery.
3. For roles, routing, Research Lines, Chat observation, WIP, or Handoff, read `AUTO_RESEARCH_SOP.md`.
4. For papers, Claims, experiments, evidence, or Settlement, read `OPERATIONS.md`.
5. For a real Run, also read `experiments/EXPERIMENT_REPORTING_STANDARD.md`, the Program standing Student Lab boundary in `AUTO_RESEARCH_SOP.md`, `system/scheduling/student-labs.yaml`, and any narrower active resource envelope.
6. For an Execution Controller heartbeat, read `templates/execution-controller-goal.md` and `system/scheduling/README.md`, recover its declared binding, and execute exactly one patrol tick.

Container-first is mandatory: before any Claim-bearing execution, recover or acquire the bound Student's verified remote Lab/Job container within the current capacity and fallback policy in `AUTO_RESEARCH_SOP.md`. CPU preprocessing, API clients, evaluation, inference, and training all run there. The local shell is for reading, editing, static checks, packaging, and non-evidentiary smoke only.

Long-running Student research must be bound to exactly one Track, Student Mission, Research Line, and live Cycle. A Track Mentor invocation instead binds exactly one Track, one Mentor Action, and one Mentor Cycle; it processes at most one `admit-mission / review-handoff / review-incident / review-portfolio` Action and then stops. Recover either binding from the concrete `GOAL.md` and files under `tracks/`; the coordination registry only adds observed Chat/Pro addressing. A Student `/goal` invocation authorizes recovery of the sole live Cycle or creation of exactly one Cycle when none exists and the Workspace is `create-ready`. If no Student binding exists, remain read-only and return a Research Line proposal; do not create a root-level state file.

Write through these seams:

- working judgment: the owning Student's `WORKSPACE.yaml` and active `cycles/<cycle-id>.md`;
- durable pointers: the owning Student's `ASSETS.yaml`;
- execution evidence: the owned `experiments/<experiment-id>/runs/<run-id>/` package;
- external pressure: immutable Bridge/review record plus a separate local verdict;
- canonical change: only `scripts/settle-research-event.mjs` after a reviewed Handoff;
- browser state: regenerate from sources; never hand-edit Dashboard data.

Mentor Action state lives in the bound Track's `MENTOR_WORKSPACE.yaml` and current `mentor-cycles/<mentor-cycle-id>.md`. Daily observation instead follows `templates/daily-mentor-check.md` and writes the Track's `mentor/` review queue, journal, snapshots and reviews through the declared communication interfaces; it does not create an Action or alter Student scientific state. A Mentor may review one Handoff or define a Mission envelope, but must not pre-solve the Student's exact Claim/falsifier or grant new GPU/API authority. Treat `bootstrap_import_refs` as untrusted initialization pointers, not Handoffs requiring Mentor settlement.

Before Handoff, re-read `WORKSPACE.yaml`, `ASSETS.yaml`, and `cycles/`; ensure there is no second live Cycle and close the active pointer in the order defined by `templates/student-goal.md`. Repository checks may be run as internal validation, but no Node command is part of the human launch or context-transfer protocol. Treat entries in `system/migration/asset-ledger.jsonl` as legacy or unsettled evidence until explicitly reviewed; migration never upgrades scientific status.

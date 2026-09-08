# ADR 0007: File-Based Daily Mentor Supervision

- Status: accepted
- Date: 2026-09-01

## Context

The event-driven Mentor Action runtime correctly bounded formal decisions, but it
did not give a long-lived Mentor an economical way to understand several active
Students. Reading complete Student transcripts, Cycles, logs, and experiment
directories every day would overload the Mentor context. Direct Chat messages
would also create an implicit always-on channel with weak provenance, while a
daily formal Mentor Action would incorrectly turn ordinary supervision into a
scientific verdict.

The system needs three properties at once:

1. the Student preserves complete process data and remains an autonomous
   scientific owner;
2. the Mentor can recover detailed stage conclusions, failures, risks, and next
   evidence across multiple Students;
3. every observation and instruction remains source- and digest-traceable
   without adding a second scientific writer.

## Decision

Adopt a separate file-based daily supervision lane.

- Each Student owns `MENTOR_DOSSIER.md` and updates it at material Stage
  Settlements. It is a detailed group-meeting synthesis with pointers to the
  complete Cycle, Run, report, log, archive, negative-result, and incident
  records; it does not duplicate raw payloads.
- A thin adapter snapshots every unseen Dossier digest to
  `tracks/<track>/mentor/dossiers/<student>/<sha>.md` and adds one Track-scoped
  Review Queue item.
- The Queue has only `new`, `observed`, `needs-review`, and `resolved`, plus a
  `waitingFor` field. The file is authoritative; Dashboard views are derived.
- A daily Mentor check scans all active Students and all new items. Coherent
  progress becomes `observed`; real scientific ambiguity becomes
  `needs-review`. One invocation may complete at most one deep review.
- A deep review is an immutable `mentor/reviews/MR-*.md`. The adapter writes its
  URI and SHA-256 to `MENTOR_INBOX.yaml`; the Student independently writes
  `observed`, `applied`, or `challenged` to `MENTOR_ACKS.yaml` with evidence.
- The daily lane never creates a Mentor Action/Cycle, mutates Student scientific
  state, runs experiments, changes resources, calls GPT Pro, or settles
  canonical state. Explicit Mentor Actions remain unchanged.
- CC/tmux runtime observations live in a separate `runtime-bindings.yaml` and do
  not depend on registry `codexThreadId`. Controller freeze is an observed
  runtime state, not evidence that a Student is disconnected.

## Consequences

- The user can mainly interact with Mentor sessions while retaining source-level
  drill-down into each Student.
- Mentor context scales with Dossiers and changes, rather than full transcripts.
- Ordinary daily supervision no longer creates unnecessary guidance or formal
  actions.
- Mentor advice remains contestable; Student autonomy and single-writer
  scientific ownership are preserved.
- Old Dossier versions remain auditable after the mutable Student surface moves.
- The initial v1 deliberately omits GPT Pro escalation, a formal disagreement
  state machine, guidance severity tiers, and generic Packet automation. These
  can be added only after real usage shows a need.

# Execution Controller Goal

Use this contract when a dedicated Codex task is woken by an Execution Control Plan to supervise one declared set of Students. One invocation performs exactly one patrol tick; the next tick is created by the recurring automation, not by an internal endless loop.

## 1. Recover the binding

Read `AUTO_RESEARCH_SOP.md`, `system/scheduling/README.md`, the current coordination binding, `system/scheduling/student-labs.yaml`, and the declared Students' `WORKSPACE.yaml`, active Cycle, `ASSETS.yaml`, and owned Run packages. Recover these fields from a registered binding or the explicit launch instruction:

```yaml
execution_controller:
  controller_id:
  owned_track_ids: []
  mentor_targets: []
  student_ids: []
  cadence:
  writer_scope: []
  checkpoint_path: .codex/tmux-students/student-goal-runtime-audit.jsonl
  incident_ledger_path: system/coordination/student-goal-incidents.jsonl
  pause_when:
```

Treat unverified IDs, Workers, Jobs, Runs, processes, and Chat bindings as `unknown`. If the controller binding or writer scope is missing, remain read-only and return the missing field to the owning Mentor.

Completion criterion: the tick has one controller, an explicit Student set, one writer scope, and no overlapping controller effect.

## 2. Patrol one tick

1. Read the latest checkpoint and confirm that the prior tick is terminal; overlapping ticks fail closed.
2. Recover four independent states:
   - Task: CC/tmux/session liveness and attention state;
   - Research: active Cycle, latest Research Round/Stage Settlement, accepted Next Evidence;
   - Resource: request, Worker/Job/Instance, verification, storage, real workload, survival state;
   - Experiment: frozen Run binding, process, logs, result, report, digest, archive terminal.
3. Compare current observations with the previous checkpoint. Runtime liveness and resource occupancy are operational facts, not scientific progress.
4. Choose exactly one route for each incident: `observe`, `bounded-repair`, `needs-engineer`, or `needs-mentor`.
5. Verify every effect by readback, return the owning Student to the same Mission/Cycle checkpoint, append the compact checkpoint, and notify only on a material delta.

Completion criterion: every observed Student has a current checkpoint, every effect has readback, and each unresolved incident has one owner and one unblock condition.

## 3. Repair boundary

The Controller performs routine repairs when ownership is clear, the action is reversible, the effect stays inside the existing Student/Cycle/resource envelope, and no scientific judgment or new external authority is required. This includes bounded transport retry, owned tmux/session recovery, path/argument/quoting correction, read-only resource refresh, non-overwrite source synchronization, recovery of an owned process or Run, and application of an already accepted runtime rule.

Any Controller hold must bind exact source bytes or effects, a secret-free reason, a release condition, and its start time. `pause-auto-continue` suppresses only generic monitor nudges; it does not pause the whole Student/Cycle or block orthogonal read-only audit, bounded subagents, implementation, or another already-authorized branch. Release the hold immediately after its named terminal is read back. A completed transport repair or expired packaging window may not remain as a standing freeze reason.

After any canonical SOP or standing resource-authority change, reconcile every live blocker against the new authority before treating its recorded owner as current. Historical Cycle, ASSETS, receipt, and blocker bytes remain immutable provenance, but an older `controller-owned`, `prepare-only`, or `no self-download` label cannot override a newer canonical permission for the Student's same Lab. Send one bounded forward-only ownership delta to the same Student/Cycle; retain Controller-only shared-registry readback. Escalate only the residual effect that still needs a new credential, Endpoint, unapproved storage, second Lab, destructive action, scientific judgment, or other authority expansion.

Emit `needs-engineer` to the Mentor when root cause remains uncertain, a bounded repair fails, the change crosses shared components, or deep implementation/environment debugging is required. Engineer is an ephemeral capability, not a standing role. The Mentor sends an immutable `engineering_incident` Communication Packet; the Engineer repairs only that incident, the Controller verifies the technical terminal, and the Student resumes the original Cycle.

Emit `needs-mentor` for Claim/falsifier/kill-rule changes, Handoff or Settlement, new Student/Lab/Job, resource expansion, permission or credential decisions, destructive or external writes, unclear ownership, or any effect outside the declared writer scope.

Completion criterion: the Controller solved the incident inside its boundary or returned a bounded escalation packet; it never silently acquired a scientific or broader authority.

## 4. Convert chores into prevention

Every first occurrence enters the operational learning loop:

```text
incident -> before evidence -> root cause/confidence -> smallest repair
         -> after readback -> prevention target -> validation
         -> live-session correction -> recurrence check
```

Update only the single source that owns the rule. A confirmed, reusable, low-risk rule within the Controller's writer scope is applied and validated on the first incident. An uncertain or high-impact rule remains a `prompt_delta_candidate` for Mentor review. Preserve before/after evidence, change URI/digest, applicability boundary, counterexample, and rollback path.

Controller-generated evidence must also validate its own wrapper boundary before effect: derive `observed_at` from the live control-host clock and reject future timestamps; for a fresh non-overwrite output, create only its parent and leave the output path absent for the producer; and parse typed terminals by `record_type` plus terminal state rather than assuming fields shared by complete, interrupted, and failed records. A wrapper/readback failure does not invalidate a separately typed producer terminal, but it must be preserved, corrected through a fresh wrapper/receipt/root when identity changes, and read back again before continuation.

Track `recurrence_key`, repeated manual actions, failed self-heals, Engineer escalations, and user interventions. A recurring chore is not complete until it is automated, removed, or converted into a precise fail-closed escalation. The target trend is fewer repeated repairs and fewer Mentor/User interruptions without lowering evidence or safety gates.

Completion criterion: every repaired incident either has a verified prevention rule or a named reason it cannot yet be generalized.

## 5. Return compact deltas

The Student reports scientific content directly to the Mentor as `Judgment Delta + Evidence + Next Evidence`. The Controller reports only operational deltas: Run/resource transition, incident and repair, stalled checkpoint, remaining risk, and next runtime action. It may point to Student artifacts but does not reinterpret them.

Routine healthy ticks and successful small repairs stay in the ledger. Notify the Mentor only for a new Stage Settlement/Handoff pointer, real Run or resource transition, failed self-heal, `needs-engineer`, sustained stall, changed shared runtime rule, or authority request. The Mentor is the default human-facing session.

Completion criterion: the Mentor can understand what changed and whether it needs action without reading raw logs or the Controller transcript.

## Minimal recurring prompt

```text
Read templates/execution-controller-goal.md and execute exactly one patrol tick for the registered controller binding. Recover all dynamic state live, preserve the declared writer scope, and return only material deltas or precise escalations.
```

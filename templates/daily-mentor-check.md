# Daily Track Mentor Check

This is the bounded behavior used by a daily Mentor heartbeat. It is an
observation and queue-maintenance pass, not a Mentor `/goal` Action.

1. Recover the concrete Track binding, `MENTOR_WORKSPACE.yaml`, Student roster,
   `mentor/REVIEW_QUEUE.yaml`, `mentor/CURRENT.md`, and the current monthly daily
   journal. Do not infer active Students from Candidate IDs or old Chat receipts.
2. Run `node scripts/mentor-communication.mjs scan --track <track-id>` to add one
   `new` queue item for each unseen Student Dossier digest. Scan every `new` item
   and its referenced Dossier. Read underlying Cycle/Run/report evidence only as
   needed to check the synthesis; never copy full raw logs into Mentor files.
3. Triage ordinary, coherent progress to `observed`. Triage a real scientific
   ambiguity, evaluator defect, invalid Claim chain, scope decision, or explicit
   Student question to `needs-review`. Use `waiting_for` when evidence is not yet
   available. Do not escalate normal runtime work that the Controller can repair.
4. Complete at most one deep review in this invocation. Write it from
   `templates/mentor-review.md`, then deliver it with
   `node scripts/mentor-communication.mjs deliver-review ...`. Other
   `needs-review` items remain queued. A review is advice until the Student
   records `observed`, `applied`, or `challenged` in its acknowledgement file.
5. Append one detailed entry to `mentor/daily/<YYYY-MM>.md` and replace
   `mentor/CURRENT.md` with a compact current summary. The daily entry must cover
   every active Student even when the disposition is `observe-only`.
6. Do not create or mutate a Mentor Action/Cycle, Student Workspace/Cycle, Run,
   resource allocation, Controller state, canonical research state, or Pro
   conversation. If there is nothing requiring deep review, finish after the
   observation record without sending a message to the user.

Queue transitions are `new -> observed | needs-review`, `observed ->
needs-review | resolved`, and `needs-review -> resolved`. File state is the
source of truth; the Dashboard is a read-only projection.

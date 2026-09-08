# ADR 0006: Mentor Review of Engineering Incidents

- Status: accepted
- Date: 2026-08-31

## Context

ADR 0005 bounded Track Mentor work to one event-driven Action, but its original three Action types did not include the Controller-to-Mentor path introduced for ephemeral Engineer repair. The Controller could emit a digest-bound `engineering_incident`, while the Mentor runtime had no typed way to accept, modify, reject, or dispatch it. Existing packets with `to.thread_id=unknown` also showed why packet creation cannot be treated as delivery.

## Decision

Add one fourth Mentor Action: `review-incident`.

- It consumes exactly one explicitly named or ready, visibly delivered `engineering_incident` addressed to the bound Mentor.
- It validates target identity, immutable payload/digest, Controller attempts, allowed/excluded effects, acceptance test, rollback, and `return_to_controller`.
- Its verdict is `dispatch`, `changes-requested`, or `reject`.
- `dispatch` creates one bounded internal Engineer task; a user-visible Engineer Chat still requires explicit user instruction.
- The Mentor Action ends after dispatch. The Engineer returns to the Controller for technical readback, while scientific ownership remains with the original Student/Cycle.
- A packet with `to.thread_id=unknown` or no visible delivery receipt is not processed implicitly.

The other ADR 0005 boundaries remain unchanged: one invocation, one Action, one Mentor Cycle, no automatic chaining, and no direct canonical write.

## Consequences

- Controller escalation has a typed terminal instead of an unowned packet backlog.
- Mentor remains the default human-facing decision owner without becoming a runtime debugger.
- Engineer remains ephemeral and incident-scoped.
- Delivery, dispatch, technical verification, scientific interpretation, and Settlement remain distinct states.

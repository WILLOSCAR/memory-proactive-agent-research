# ADR 0005: Event-driven Track Mentor Actions

- Status: accepted
- Date: 2026-08-18

## Context

The original Track Mentor prompt described one continuous loop that recovered a portfolio, selected a judgment, issued a Student Brief, reviewed returned evidence, updated priorities, and prepared Settlement input. That combined mission admission, scientific review, portfolio management, resource discussion, and Student launch into one invocation. It also made migrated legacy assets look like pending Student Handoffs.

This made ownership ambiguous: a Mentor could pre-solve a Student's research question, review several unrelated items, or appear to grant resources merely by editing a Brief.

## Decision

A Track Mentor invocation processes exactly one `Mentor Action`:

- `admit-mission`: decide the Mission boundary and whether a Student should exist;
- `review-handoff`: review one Student Handoff and accept exactly one Next Evidence or a stop decision;
- `review-portfolio`: make one bounded roster, priority, fork, merge, or park decision.

Each Action has one `Mentor Cycle` audit record and one live-action pointer in `MENTOR_WORKSPACE.yaml`. An invocation stops after that Action is completed or blocked. It never chains into another Mentor Action or Student Cycle.

Mentor admission freezes a Mission envelope and Claim ceiling, not the Student's exact estimand, Claim, baseline, falsifier, or method. Resource need identification and resource authorization remain separate. Legacy migration records are `Bootstrap Import` records, not Student Handoffs or scientific Cycles.

## Consequences

- Mentor state becomes recoverable without turning the queue into a second scientific database.
- Student autonomy is preserved inside a stable Mission.
- Handoff review, portfolio review, and mission admission have distinct completion conditions.
- A short Track `/goal` remains the human interface; Node tooling is maintenance and validation only.
- Existing legacy-import paths remain stable for provenance, but their scientific status is explicitly non-canonical and non-settled.

# Research Cycle `<cycle-id>`

- Track ID:
- Student ID:
- Research Line ID:
- Mission ID:
- Research Line revision at start:
- Cycle ID:
- Created at:
- Candidate pointers:
- Cycle state: `initializing | active | handed-off | settled | paused | closed`

## Contract and recovery

- Brief / packet:
- Based-on revision:
- Current Next Evidence:
- Resource envelope / Program standing policy:
- Container-first Student Lab binding and lifecycle state (`system/scheduling/student-labs.yaml`):
- Verified remote identity / Instance / repo / storage:
- Active Job pointers:
- Falsifier:
- Loop policy:
- Completion:
- Stop / escalate:
- Created by `/goal` invocation:
- Writer / session observation:
- Last completed Round: `none`
- Next Round: `1`
- Current branch:
- Resume from:
- Pending blockers / decisions:
- Conflicting live Cycle IDs:

## Research rounds

Append one block per Round; never overwrite an earlier Round or Stage Settlement.

### Round 1 · `<short label>`

- State: `active | settled`
- Started at:

#### 1. Learn and audit

- Primary-source / code / Benchmark pointers:
- Mechanism, assumptions, and proof boundary:
- Concrete failure or evaluation gap:

#### 2. Frame

- Competing explanations / Idea Variants:
- Research Question:
- Falsifiable Claim:
- Estimand and observation unit:
- Strongest baseline / dangerous alternative / confounders:
- Falsifier and cheapest separating test:

#### 3. Test

- Remote container preflight / manifest pointer:
- Cheap Probe and outcome:
- Claim-bearing dependency and reproduction criterion:
- Reproduction Run / Artifact pointer:
- Reproduction outcome: `not-run | pipeline-smoke | reproduced | partial-reproduction | mismatch`
- Controlled improvement or new-problem validation:
- Run / Artifact pointers:

#### 4. Review

- Expected versus observed:
- Error slices and surviving alternatives:
- Self-check / independent review / external-pressure pointers:

#### 5. Stage Settlement

- Idea / Claim before:
- Evidence:
- Idea / Claim after:
- Judgment consequence: `continue | narrow | reframe | park | kill-variant | fork-proposal | no-material-change`
- Confidence and surviving alternatives:
- Branch state:
- Next Evidence:
- Next branch / Round:
- Resume from:

## Cycle-wide pointers and evolution

- Code/config changes:
- Experiment Spec / Run / Artifact pointers:
- Student Lab / GPU slice / Job pointers:
- Pro conversation / local verdict pointers:
- Reusable asset pointers:
- Research Line transition: `none | refine | narrow | generalize | reframe | sequential-pivot | fork-proposal`
- Before / trigger / after:
- Why this remains inside the Mission:

## Conditional Handoff

Fill this section only when a real Handoff boundary is met.

- Handoff reason:
- Expected versus observed:
- Strongest surviving alternative and falsifier outcome:
- Recommended decision:
- Next evidence or unlock condition:
- Container-first policy check:
- Execution: `requested | queued | running | completed | failed | cancelled | not-run`
- Scientific outcome: `positive | negative | mixed | inconclusive | not-interpretable | not-run`
- Reproduction outcome: `not-applicable | pipeline-smoke | reproduced | partial-reproduction | mismatch`
- Archive: `local-draft | local-verified | published | archive-verified | superseded | not-applicable`
- Mentor settlement: `unreviewed | mentor-accepted | mentor-rejected | settled`
- Judgment Delta: `<pointer | no-material-change>`
- Student Handoff packet / delivery receipt:
- Knowledge promotion: `not-proposed | proposed | accepted | rejected`
- Knowledge Entry / Settlement event pointers:

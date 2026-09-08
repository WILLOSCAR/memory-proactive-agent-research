# Student Charter

- Student ID: `<required>`
- Track: `<required>`
- Mentor role ID: `<required>`
- Mission ID: `MS-<required>`
- Student Mission: `<stable problem-space envelope>`
- Research Line ID: `<required>`
- Seed Question: `<initial coordinate, not a fixed conclusion>`
- Current Research Line: `<versioned current problem identity>`
- Writable scope: `<student workspace except adapter-owned MENTOR_INBOX.yaml; explicitly owned experiments>`

## Mission and current problem

- Core problem / consequence:
- Primary estimand:
- Candidate / Paper Opportunity pointers:
- Allowed claim ceiling:
- Excluded claims:
- Strongest falsifier:
- Split condition:
- Stop / Handoff condition: `<explicit stop, scope/authority boundary, Mission exhaustion, or every useful in-Mission branch blocked>`
- Allowed Research Line transitions: `refine | narrow | generalize | reframe | sequential-pivot | fork-proposal`
- Mentor review gates: cross-Mission scope, parallel fork, material resource/permission expansion, Paper Project promotion

## Interface

This Student exposes `CHARTER.md`, `GOAL.md`, `WORKSPACE.yaml`, `ASSETS.yaml`, `cycles/`, `MENTOR_DOSSIER.md`, `MENTOR_INBOX.yaml`, and `MENTOR_ACKS.yaml`. The Student writes Dossier/Acks but not the adapter-owned Inbox. `GOAL.md` is the human launch interface and binding; the shared behavior remains in `templates/student-goal.md`. The Mission is stable; Seed Questions, Idea Variants, and sequential Research Line revisions remain inside the workspace unless the fork condition is met.

已观察的 Codex/Pro Chat ID 与 Lead label 属于 coordination registry；live Cycle pointer 属于 `WORKSPACE.yaml`。这些动态状态不写入稳定 Charter，Chat ID 缺失也不阻止 file-first 恢复。

# E-C03-01 · Cross-layer Revocation Canary — Findings (R-E-C03-01-001)

**Candidate:** C03 Benign Revocation Residual · **Run:** R-E-C03-01-001 · **Date:** 2026-08-06
**Decision question:** 普通 source-tag purge 是否足够清除 benign 撤权后的跨层残留影响？

## What was run
A deterministic 4-layer memory simulation (`canary.py`, stdlib-only, seeded). Layers:
`base_store` → `summary` (roll-up) → `cache` (answer cache) → `adapter` (bias table).
An episode: user shares facts under several `source_id`s; one source is later
**benignly revoked**. We compare three repair strategies on 400 paired episodes and
measure **residual influence** (fraction of revoked-topic queries whose answer still
reflects the revoked value) and **benign retention** (unrelated answers unchanged).

## Result (seed 20260806, 400 episodes, 12 topics)

Combined system (all derived layers active):

| Strategy | Residual influence | Benign retention |
| --- | --- | --- |
| no_purge (floor) | 100% | 100% |
| **source_tag_purge (killer baseline)** | **100%** | 100% |
| cross_layer_repair | **0%** | 100% |

Per-layer residual-influence matrix under the killer baseline (source-tag purge):

| Layer isolated | Residual influence |
| --- | --- |
| summary | 100% |
| cache | 100% |
| adapter | 0% |
| base_only (no derived) | 0% |

## Reading
**CONTINUE-signal.** Source-tag purge (the killer baseline) leaves residual influence
at 100%, localized specifically to the **summary and cache** derived layers; a
base-only store purges cleanly (0%), and the **adapter** does not resurrect the revoked
value here (equal-weight tie breaks to the surviving base value). **Cross-layer repair**
drives residual to 0% while keeping benign retention at 100% (no over-purge).

The C03 kill rule ("if source-tag purge is sufficient, downgrade to engineering note")
is **not** triggered: purge is demonstrably insufficient, and the insufficiency is
**layer-attributable** — which is exactly the benchmark+systems contribution C03 proposed.

## Honest boundary (why this is not a paper by itself)
- Deterministic **mechanism simulation**, not an LLM run, not real user data.
- It proves the failure is **possible, measurable, and localizable**; it does **not**
  quantify how often real deployed memory stacks exhibit it.
- Next evidence to strengthen: instantiate the same 4-layer probe on a real
  retrieval-augmented memory (embeddings cache + LLM summary) to see whether the
  summary/cache leak reproduces outside the simulation.

## Artifact
`runs/result.json` — sha256:5baa9ada11a4a5bb4cc4078581ccc8f8ad3e90367968e8189ebeea43720ba86e
`canary.py` — sha256:e1fc4a4c0c0b16a93cb9ef88b414525cd2fe9aadb75ae35c0f4cc3b3a2a804d0

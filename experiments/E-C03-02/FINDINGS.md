# E-C03-02 · Cross-layer Revocation on a Real Dense-Vector RAG Memory — Findings (R-E-C03-02-001)

**Candidate:** C03 Benign Revocation Residual · **Run:** R-E-C03-02-001 · **Date:** 2026-08-06
**Successor to:** E-C03-01 (exact-string sim). **Decision question:** does the residue survive *semantic* retrieval?

## Why this run exists
E-C03-01 established the residue in a deterministic **exact-string** memory, but that made the cache leak almost tautological (an un-evicted cache trivially returns the old string). C03's real claim is about a **RAG memory**, where a purged fact can still be reached because its embedding neighbours remain and the answer is chosen by nearest-vector. E-C03-02 replaces the retrieval core with **real cosine k-NN over dense vectors** (genuine hashed-n-gram L2-normalized embeddings, numpy) and re-tests.

## Result (seed 20260806, 300 episodes, 12 topics, embed_dim 256)

| Strategy | Residual influence | Benign retention |
| --- | --- | --- |
| no_purge (floor) | 100% | 100% |
| **source_tag_purge (killer baseline)** | **100%** | 100% |
| cross_layer_repair | **0%** | 100% |

Per-channel attribution under the killer baseline (ablate one channel at a time):

| Channel isolated | Residual influence | Role |
| --- | --- | --- |
| summary only (cache denied) | **16%** | **origination** |
| cache only (summary denied) | **0%** | — |
| base only (both denied) | **0%** (verified) | clean purge |

## Reading — CONTINUE, with a sharper mechanism than E-C03-01
The residue **survives semantic retrieval**: source-tag purge leaves 100% residual, cross-layer repair clears it. But the channel attribution reveals a two-role structure that the exact-string sim couldn't see:

- **Summary = origination.** On its own it carries 16% — lower than E-C03-01's flat 100%, because under *semantic* retrieval the live base value sometimes out-scores the stale summary. So the summary leak is real but not absolute.
- **Cache = propagation amplifier.** 0% on its own (it originates nothing once denied), yet once a stale-summary-derived answer is cached it is served verbatim — amplifying the combined residual to 100%.
- **Base store purges cleanly** (0% with both derived layers denied).

This origination-vs-propagation split is a **stronger, more defensible benchmark contribution** than "everything leaks 100%": it says a correct revocation must re-consolidate the summary *and* evict the cache, and that measuring only base-store deletion (as source-tag purge does) misses both.

## Honest boundary (what is and isn't real here)
- **Real:** dense-vector cosine retrieval; deterministic, seeded, reproducible (identical output digests across runs); channel attribution by ablation.
- **Not real yet:** the LLM-summary layer is a vector-mean **stub**. The account currently forbids model-ID calls and has no deployed inference endpoint (deploying one is a high-impact action deferred to the user), so a genuine LLM-rewritten summary was not run. The harness exposes a swappable `summarize_fn` — pass a real summarizer and re-run unchanged when an endpoint exists.
- **Not real:** synthetic episodes, not real user data / real deployed memory stacks. This localizes the mechanism; it does not quantify prevalence in production.

## Next evidence to strengthen toward a paper
1. Wire `summarize_fn` to a real LLM (needs a deployed endpoint) and re-run — does an LLM-written roll-up leak *more* than the vector-mean stub?
2. Swap the hashed-n-gram embedding for a real ARK embedding model (same interface) to confirm the summary-origination rate under production embeddings.

## Artifacts
`runs/result.json` — sha256:2bc32e66bd4d85a597353e8c0ccd065d9643f37ec3447a6c6edb9adcb20b01cd
`rag_canary.py` — sha256:eb3e7dee2f85dd93cbe77019a772e4f8532712cc9d38170d8c77f636fe5a2f06

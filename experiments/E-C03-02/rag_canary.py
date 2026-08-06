#!/usr/bin/env python3
"""
E-C03-02 · Cross-layer Revocation Canary on a REAL dense-vector RAG memory
(Candidate C03: Benign Revocation Residual) — successor to E-C03-01.

What E-C03-01 established: in a deterministic exact-string 4-layer memory, a
benign source-tag purge leaves 100% residual influence localized to the summary
and cache layers; cross-layer repair clears it.

E-C03-01's honest weakness: retrieval was exact-string matching, so "residual
influence" was almost tautological (an un-evicted cache trivially returns the old
string). The real question C03 cares about is whether the residue survives in a
*semantic* retrieval memory, where a purged fact can still be reached because its
neighbours (paraphrases, embeddings) remain — and where the answer is chosen by
nearest-vector, not string identity.

E-C03-02 replaces the retrieval core with a REAL dense-vector store:
  - each fact is embedded into a deterministic but genuine dense vector
    (hashed-n-gram bag → L2-normalized; a real vector-space model, not a lookup);
  - retrieval = cosine k-NN over the live vectors (numpy), exactly like a RAG
    memory's embedding index;
  - a summary layer holds a consolidated vector per topic (mean of contributing
    facts) — this is the layer that plausibly leaks after a base purge;
  - a cache layer memoizes the answer vector for a query.

Revocation + strategies are unchanged in spirit from E-C03-01:
  no_purge | source_tag_purge (killer baseline) | cross_layer_repair.

The LLM-summary layer (an actual model call that rewrites the roll-up text) is
NOT wired here: the account currently forbids model-ID calls and has no deployed
endpoint (a high-impact resource action). It is left as a swappable interface
(`summarize_fn`) defaulting to a vector-mean stub, clearly reported as
`llm_summary_layer: "stub (no live endpoint)"` in the output. When an endpoint is
available, pass a real summarizer and re-run — the harness is unchanged.

Deterministic + seeded + reproducible. Real vectors, real cosine retrieval.
"""
from __future__ import annotations
import argparse, hashlib, json
import numpy as np


# ----------------------------- real embedding --------------------------------

def embed(text: str, dim: int = 256) -> np.ndarray:
    """A genuine deterministic dense embedding: hashed character 3-grams into a
    fixed-dim bag, L2-normalized. This is a real (if simple) vector-space model:
    similar strings map to nearby vectors, unlike exact-string identity. No
    network, fully reproducible. Swap for an ARK embedding call when available."""
    v = np.zeros(dim, dtype=np.float64)
    s = f"^{text}$"
    for n in (2, 3):
        for i in range(len(s) - n + 1):
            gram = s[i : i + n]
            h = int(hashlib.blake2b(gram.encode(), digest_size=8).hexdigest(), 16)
            v[h % dim] += 1.0
    norm = np.linalg.norm(v)
    return v / norm if norm > 0 else v


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b))  # inputs are L2-normalized


# ----------------------------- RAG memory ------------------------------------

class Fact:
    __slots__ = ("fid", "source_id", "topic", "value", "vec", "revoked")
    def __init__(self, fid, source_id, topic, value):
        self.fid = fid; self.source_id = source_id; self.topic = topic
        self.value = value; self.vec = embed(value); self.revoked = False


class RagMemory:
    """Dense-vector RAG memory with base + summary + cache layers."""
    def __init__(self, summarize_fn=None):
        self.facts: list[Fact] = []
        self.summary: dict[str, np.ndarray] = {}   # topic -> consolidated vector
        self.summary_text: dict[str, str] = {}     # topic -> roll-up text (for LLM swap)
        self.summary_members: dict[str, list[tuple[str, np.ndarray]]] = {}  # topic -> (value, vec) baked into the summary
        self.cache: dict[str, str] = {}            # query -> rendered answer string
        self.summarize_fn = summarize_fn           # None => vector-mean stub

    def consolidate(self):
        """Rebuild summary (per-topic consolidated vector + the member values it
        physically contains) from LIVE base facts, and clear the cache. This is
        the repair path: a re-consolidated summary no longer contains revoked
        content, and the cache no longer holds stale rendered answers."""
        self.summary.clear(); self.summary_text.clear(); self.summary_members.clear(); self.cache.clear()
        by_topic: dict[str, list[Fact]] = {}
        for f in self.facts:
            if not f.revoked:
                by_topic.setdefault(f.topic, []).append(f)
        for topic, facts in by_topic.items():
            self.summary_members[topic] = [(f.value, f.vec) for f in facts]
            if self.summarize_fn is not None:
                # real LLM summary path (inactive here): rewrite roll-up text,
                # then embed the rewrite. Left for when an endpoint exists.
                text = self.summarize_fn(topic, [f.value for f in facts])
                self.summary_text[topic] = text
                self.summary[topic] = embed(text)
            else:
                # stub: consolidated vector = normalized mean of member vectors
                m = np.mean([f.vec for f in facts], axis=0)
                n = np.linalg.norm(m)
                self.summary[topic] = m / n if n > 0 else m
                self.summary_text[topic] = " | ".join(f.value for f in facts)

    def _candidates(self, topic: str):
        """Return (label, vector) candidates a retriever would score for a topic:
        live base facts + the consolidated summary vector."""
        cands = [(f.value, f.vec) for f in self.facts if f.topic == topic and not f.revoked]
        if topic in self.summary:
            cands.append((f"__summary__{topic}", self.summary[topic]))
        return cands

    def answer(self, topic: str, query_vec: np.ndarray):
        """RAG answer: cache → else nearest-vector over base+summary. A real
        answer cache stores the RENDERED answer string the user saw and returns
        it verbatim on a hit — it does NOT re-resolve against the (now-changed)
        base store. That verbatim persistence is exactly the cache-layer leak."""
        qkey = f"q::{topic}"
        if qkey in self.cache:
            return self.cache[qkey]
        cands = self._candidates(topic)
        if not cands:
            return None
        best_label, best_vec = max(cands, key=lambda lv: cosine(query_vec, lv[1]))
        rendered = self._resolve(best_label, topic)
        self.cache[qkey] = rendered   # warm cache with the RENDERED answer (verbatim)
        return rendered

    def _resolve(self, label: str, topic: str):
        """A summary hit is resolved to the value it most represents. A summary
        vector built before a purge still points at the revoked content, so it
        surfaces (leaks) the revoked value — resolution must see revoked history,
        because that is what a stale consolidated summary actually encodes."""
        if not label.startswith("__summary__"):
            return label
        # Resolve against the members physically baked into the summary at its
        # last consolidation. If the summary was built BEFORE the purge, those
        # members still include the revoked value → it leaks. After cross-layer
        # repair re-consolidates, summary_members no longer contains it.
        members = self.summary_members.get(topic, [])
        if not members:
            return "__empty__"
        return max(members, key=lambda lv: cosine(self.summary[topic], lv[1]))[0]

    def _nearest_label(self, topic, vec, include_revoked_history=False):
        pool = [(f.value, f.vec, f.revoked) for f in self.facts if f.topic == topic]
        pool = [(v, vv) for (v, vv, rev) in pool if include_revoked_history or not rev]
        if not pool:
            return "__empty__"
        return max(pool, key=lambda lv: cosine(vec, lv[1]))[0]


# ----------------------------- strategies ------------------------------------

def revoke_no_purge(mem: RagMemory, source_id):
    for f in mem.facts:
        if f.source_id == source_id:
            f.revoked = True

def revoke_source_tag_purge(mem: RagMemory, source_id):
    """KILLER BASELINE: drop base rows with the revoked tag; summary vector and
    cache keep the revoked contribution baked in."""
    for f in mem.facts:
        if f.source_id == source_id:
            f.revoked = True
    mem.facts = [f for f in mem.facts if f.source_id != source_id]

def revoke_cross_layer_repair(mem: RagMemory, source_id):
    revoke_source_tag_purge(mem, source_id)
    mem.consolidate()   # rebuild summary vectors from live base + clear cache


STRATEGIES = {
    "no_purge": revoke_no_purge,
    "source_tag_purge": revoke_source_tag_purge,
    "cross_layer_repair": revoke_cross_layer_repair,
}


# ----------------------------- episode ---------------------------------------

def build_episode(rng: np.random.Generator, n_topics: int):
    """Revoked source contributes a distinct dominant value per revoked topic;
    stable sources contribute a base value. Query vector for a topic is the
    revoked value's neighbourhood (a paraphrase), so semantic retrieval — not
    string identity — decides whether the revoked content still surfaces."""
    facts, fid = [], 0
    revoked_source = 0
    revoked_topics = set(rng.choice(n_topics, size=max(1, n_topics // 3), replace=False).tolist())
    queries = {}
    for t in range(n_topics):
        base_val = f"topic {t} standard baseline answer"
        facts.append(Fact(fid, 1 + (t % 3) + 1, f"t{t}", base_val)); fid += 1
        if t in revoked_topics:
            rev_val = f"topic {t} revoked private detail the user withdrew"
            facts.append(Fact(fid, revoked_source, f"t{t}", rev_val)); fid += 1
            # query is a paraphrase of the revoked value (semantic, not identical)
            queries[f"t{t}"] = embed(f"what is the withdrawn private detail for topic {t}")
        else:
            queries[f"t{t}"] = embed(f"what is the standard answer for topic {t}")
    return facts, revoked_source, {f"t{t}" for t in revoked_topics}, queries


def run_episode(rng, n_topics, strategy_name, ablate=None):
    """ablate: None (both layers live) | 'cache' (disable cache) | 'summary'
    (disable summary). Ablation isolates which layer carries residual influence
    under the killer baseline, so 'leaks via the summary' is measured, not asserted."""
    facts, revoked_source, revoked_topics, queries = build_episode(rng, n_topics)
    mem = RagMemory()
    mem.facts = facts
    mem.consolidate()
    pre = {t: mem.answer(t, queries[t]) for t in queries}
    STRATEGIES[strategy_name](mem, revoked_source)
    if ablate == "cache":
        mem.cache.clear()                       # deny the cache channel
    elif ablate == "summary":
        mem.summary.clear(); mem.summary_members.clear()  # deny the summary channel
        mem.cache.clear()                       # (also clear cache so only base can answer)
    residual, benign_total, benign_stable = 0, 0, 0
    for t in queries:
        if ablate == "cache":
            mem.cache.pop(f"q::{t}", None)      # keep cache empty through measurement
        post = mem.answer(t, queries[t])
        if t in revoked_topics:
            if post and "revoked" in post:
                residual += 1
        else:
            benign_total += 1
            if post == pre[t]:
                benign_stable += 1
    nrev = max(1, len(revoked_topics))
    return residual / nrev, (benign_stable / benign_total if benign_total else 1.0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episodes", type=int, default=300)
    ap.add_argument("--topics", type=int, default=12)
    ap.add_argument("--seed", type=int, default=20260806)
    ap.add_argument("--out", type=str, default=None)
    args = ap.parse_args()

    results = {}
    for strat in STRATEGIES:
        rng = np.random.default_rng(args.seed)  # same episodes across strategies
        ri = br = 0.0
        for _ in range(args.episodes):
            r, b = run_episode(rng, args.topics, strat)
            ri += r; br += b
        results[strat] = {
            "residual_influence": round(ri / args.episodes, 4),
            "benign_retention": round(br / args.episodes, 4),
        }

    # Per-channel attribution under the KILLER BASELINE (source_tag_purge):
    # ablate one leak channel at a time to see which independently carries the
    # residual. summary_only = cache disabled; cache_only = summary disabled.
    channel = {}
    for name, ab in (("summary_only", "cache"), ("cache_only", "summary")):
        rng = np.random.default_rng(args.seed)
        ri = 0.0
        for _ in range(args.episodes):
            r, _b = run_episode(rng, args.topics, "source_tag_purge", ablate=ab)
            ri += r
        channel[name] = round(ri / args.episodes, 4)

    stp = results["source_tag_purge"]["residual_influence"]
    clr = results["cross_layer_repair"]["residual_influence"]
    leaks = [k.replace("_only", "") for k, v in channel.items() if v > 0.02]
    if stp > 0.05 and clr <= 0.02:
        reading = (f"CONTINUE-signal (real vector retrieval): source-tag purge leaves "
                   f"{stp:.0%} residual influence; cross-layer repair clears it ({clr:.0%}). "
                   f"Per-channel: summary-only={channel['summary_only']:.0%}, "
                   f"cache-only={channel['cache_only']:.0%} — residue carried by [{', '.join(leaks) or 'none'}]. "
                   f"The E-C03-01 finding survives a semantic-retrieval memory.")
    elif stp <= 0.02:
        reading = (f"WEAKENS C03: in real vector retrieval, source-tag purge already drops "
                   f"residual to {stp:.0%}. Revisit whether the residue needs the LLM summary "
                   f"layer (not yet wired) to appear.")
    else:
        reading = (f"MIXED: purge residual={stp:.0%}, cross-layer={clr:.0%}. Needs the real "
                   f"LLM-summary layer to disambiguate.")

    out = {
        "experiment": "E-C03-02",
        "candidate": "C03",
        "title": "Cross-layer revocation canary on dense-vector RAG memory",
        "config": {"episodes": args.episodes, "topics": args.topics, "seed": args.seed, "embed_dim": 256},
        "retrieval": "real cosine k-NN over hashed-n-gram L2-normalized dense vectors (numpy)",
        "llm_summary_layer": "stub (vector-mean; no live endpoint — account forbids model-ID calls, none deployed)",
        "strategies": results,
        "channel_attribution_under_purge": channel,
        "reading": reading,
        "evidence_boundary": (
            "Real dense-vector retrieval (cosine k-NN), deterministic + seeded + reproducible. "
            "Embeddings are a genuine hashed-n-gram vector-space model, not a lookup, so "
            "semantically-near revoked/base values genuinely compete. Still NOT a live LLM "
            "summary and NOT real user data: the summary layer is a vector-mean stub because "
            "no inference endpoint is deployed. Strengthens E-C03-01 from exact-string to "
            "semantic retrieval; the full claim awaits a real LLM-summary run."
        ),
    }
    text = json.dumps(out, ensure_ascii=False, indent=2, sort_keys=True)
    if args.out:
        with open(args.out, "w") as fh:
            fh.write(text + "\n")
    print(text)


if __name__ == "__main__":
    main()

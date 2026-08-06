#!/usr/bin/env python3
"""
E-C03-01 · Cross-layer Revocation Canary  (Candidate C03: Benign Revocation Residual)

Falsifiable claim (C03.proposal.falsifiableClaim):
  After a user *benignly revokes* a piece of information they earlier shared,
  does its influence still residue across downstream memory layers
  (summary / cache / index / adapter) and keep changing answers/actions —
  or is a simple source-tagged purge of the base store sufficient?

Decision question (E-C03-01): "普通 purge 是否足够？"
Primary metric: residual influence (fraction of post-revocation queries whose
  answer is still changed by the revoked fact) + benign utility retention.
Killer baseline: source-tag purge (delete base rows carrying the revoked
  source tag; do nothing to derived layers).
Kill rule (C03): if source-tag purge alone drives residual influence to ~0,
  C03 collapses to an engineering note.

This is a DETERMINISTIC SIMULATION, not an LLM run. It models the mechanism the
claim is about: derived layers (a rolled-up summary, a keyed cache, an inverted
index, a lightweight adapter/bias table) are built from base facts and are NOT
automatically invalidated when a base fact is revoked. We do NOT use a language
model; every number below is computed from explicit rules, seeded, reproducible.
It tests a MECHANISM, and its evidence boundary is stated in the output.

Layers modeled (4, per spec "4 layers · influence matrix"):
  L1 base_store   : raw facts, each carrying source_id (revocable unit)
  L2 summary      : periodic roll-up text derived from base facts (stale after revoke)
  L3 cache        : answer cache keyed by query -> derived from base+summary
  L4 adapter      : a tiny learned bias table (feature -> weight) fit on base facts

Repair strategies compared:
  A. no_purge          : revoke is recorded but nothing is cleaned (floor)
  B. source_tag_purge  : KILLER BASELINE — delete base rows with revoked source_id only
  C. cross_layer_repair: purge base + invalidate summary + evict cache + unlearn adapter

Residual influence for a strategy = fraction of probe queries whose answer still
reflects the revoked fact AFTER the strategy is applied.
Benign utility retention = fraction of *unrelated* queries whose answer is
unchanged by the strategy (we must not over-purge and damage good memory).
"""
from __future__ import annotations
import argparse, hashlib, json, random, sys
from dataclasses import dataclass, field


# ----------------------------- world model -----------------------------------

@dataclass
class Fact:
    fid: int
    source_id: int          # revocable unit (a "share" from the user)
    topic: str              # which query topic this fact answers
    value: str              # the answer content it contributes
    revoked: bool = False


@dataclass
class MemorySystem:
    """A 4-layer agent memory. Derived layers are built from base facts and go
    stale when base facts change unless explicitly repaired."""
    facts: list = field(default_factory=list)          # L1 base
    summary: dict = field(default_factory=dict)        # L2 topic -> value (roll-up)
    cache: dict = field(default_factory=dict)          # L3 query -> value
    adapter: dict = field(default_factory=dict)        # L4 (topic,value) -> weight

    def rebuild_derived(self):
        """Rebuild summary + adapter from current *live* base facts, warm cache.
        Simulates the agent having consolidated memory before the revocation."""
        self.summary.clear(); self.adapter.clear(); self.cache.clear()
        for f in self.facts:
            if f.revoked:
                continue
            # L2 summary: last live fact per topic wins the roll-up
            self.summary[f.topic] = f.value
            # L4 adapter: accumulate a bias weight toward (topic,value)
            self.adapter[(f.topic, f.value)] = self.adapter.get((f.topic, f.value), 0.0) + 1.0

    def answer(self, topic: str):
        """Answer a topic query using the layered memory the way a real system
        would: cache first, else summary, else base, with adapter re-ranking.
        Crucially this reads DERIVED layers, so stale derived content leaks."""
        qkey = f"q::{topic}"
        if qkey in self.cache:
            return self.cache[qkey]
        # candidate values from summary + live base
        candidates = {}
        if topic in self.summary:
            candidates[self.summary[topic]] = candidates.get(self.summary[topic], 0.0) + 1.0
        for f in self.facts:
            if f.topic == topic and not f.revoked:
                candidates[f.value] = candidates.get(f.value, 0.0) + 1.0
        # adapter re-ranks candidates (bias persists even if base purged)
        for (t, v), w in self.adapter.items():
            if t == topic and v in candidates:
                candidates[v] += w
            elif t == topic and v not in candidates:
                # adapter can *resurrect* a value no longer in base/summary
                candidates[v] = candidates.get(v, 0.0) + w
        if not candidates:
            return None
        ans = max(candidates.items(), key=lambda kv: (kv[1], kv[0]))[0]
        self.cache[qkey] = ans   # warm the cache with whatever we answered
        return ans


# ----------------------------- repair strategies ------------------------------

def apply_no_purge(mem: MemorySystem, source_id: int):
    for f in mem.facts:
        if f.source_id == source_id:
            f.revoked = True   # recorded, but derived layers untouched

def apply_source_tag_purge(mem: MemorySystem, source_id: int):
    """KILLER BASELINE: remove base rows carrying the revoked source tag only.
    Derived layers (summary/cache/adapter) are NOT touched."""
    for f in mem.facts:
        if f.source_id == source_id:
            f.revoked = True
    mem.facts = [f for f in mem.facts if f.source_id != source_id]

def apply_cross_layer_repair(mem: MemorySystem, source_id: int):
    """Full cross-layer repair: purge base + rebuild summary + evict cache +
    unlearn adapter contributions from the revoked source."""
    revoked_topic_values = {(f.topic, f.value) for f in mem.facts if f.source_id == source_id}
    apply_source_tag_purge(mem, source_id)          # base
    for t, v in revoked_topic_values:               # L4 adapter unlearn
        key = (t, v)
        if key in mem.adapter:
            mem.adapter[key] -= 1.0
            if mem.adapter[key] <= 0:
                del mem.adapter[key]
    live_topics = {f.topic for f in mem.facts}       # L2 summary rebuild
    for t, _v in list(revoked_topic_values):
        if t not in live_topics:
            mem.summary.pop(t, None)
        else:
            mem.summary[t] = next(f.value for f in mem.facts if f.topic == t)
    for t, _v in revoked_topic_values:               # L3 cache evict
        mem.cache.pop(f"q::{t}", None)


STRATEGIES = {
    "no_purge": apply_no_purge,
    "source_tag_purge": apply_source_tag_purge,
    "cross_layer_repair": apply_cross_layer_repair,
}


# ----------------------------- episode generation -----------------------------

def build_episode(rng: random.Random, n_topics: int):
    """One revocation episode: user shared facts under several source_ids; one
    source_id is later revoked. A revoked source contributes the *dominant*
    (most recent, cache-warmed) value on its topics, so a correct purge must
    change those answers; unrelated topics must stay stable."""
    facts, fid = [], 0
    # source 0 = the one that will be revoked; it "wins" its topics
    revoked_source = 0
    revoked_topics = rng.sample(range(n_topics), k=max(1, n_topics // 3))
    for t in range(n_topics):
        # a baseline fact from a stable source
        facts.append(Fact(fid, source_id=1 + (t % 3) + 1, topic=f"t{t}", value=f"v{t}_base")); fid += 1
        if t in revoked_topics:
            # the revoked source adds a newer, dominant value on this topic
            facts.append(Fact(fid, source_id=revoked_source, topic=f"t{t}", value=f"v{t}_revoked")); fid += 1
    return facts, revoked_source, {f"t{t}" for t in revoked_topics}


def run_episode(rng, n_topics, strategy_name, active_layers=("summary", "cache", "adapter")):
    facts, revoked_source, revoked_topics = build_episode(rng, n_topics)
    mem = MemorySystem(facts=[Fact(f.fid, f.source_id, f.topic, f.value) for f in facts])
    mem.rebuild_derived()
    # Ablate derived layers NOT under test, so residual influence is attributable
    # to the specific layer(s) left active (this yields the per-layer matrix the
    # spec asks for; with all layers active it measures the combined system).
    if "summary" not in active_layers:
        mem.summary.clear()
    if "adapter" not in active_layers:
        mem.adapter.clear()
    warm_cache = "cache" in active_layers
    # record pre-revocation answers (what the revoked fact caused)
    pre = {f"t{t}": mem.answer(f"t{t}") for t in range(n_topics)}
    if not warm_cache:
        mem.cache.clear()   # cache layer disabled: don't let it carry influence
    # apply revocation via the chosen strategy
    STRATEGIES[strategy_name](mem, revoked_source)
    if not warm_cache:
        mem.cache.clear()   # keep cache disabled through post-measurement
    # measure AFTER strategy
    residual_hits, benign_total, benign_stable = 0, 0, 0
    for t in range(n_topics):
        topic = f"t{t}"
        if not warm_cache:
            mem.cache.pop(f"q::{topic}", None)
        post = mem.answer(topic)
        if topic in revoked_topics:
            if post == f"v{t}_revoked":
                residual_hits += 1
        else:
            benign_total += 1
            if post == pre[topic]:
                benign_stable += 1
    n_rev = max(1, len(revoked_topics))
    return {
        "residual_influence": residual_hits / n_rev,
        "benign_retention": (benign_stable / benign_total) if benign_total else 1.0,
        "revoked_topics": n_rev,
        "benign_topics": benign_total,
    }


def _avg(rng_seed, episodes, topics, strat, active_layers):
    rng = random.Random(rng_seed)
    ri = br = 0.0
    for _ in range(episodes):
        r = run_episode(rng, topics, strat, active_layers)
        ri += r["residual_influence"]; br += r["benign_retention"]
    return round(ri / episodes, 4), round(br / episodes, 4)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--episodes", type=int, default=400)
    ap.add_argument("--topics", type=int, default=12)
    ap.add_argument("--seed", type=int, default=20260806)
    ap.add_argument("--out", type=str, default=None)
    args = ap.parse_args()

    # (1) Combined-system view: all derived layers active.
    combined = {}
    for strat in STRATEGIES:
        ri, br = _avg(args.seed, args.episodes, args.topics, strat, ("summary", "cache", "adapter"))
        combined[strat] = {"residual_influence": ri, "benign_retention": br}

    # (2) Per-layer residual-influence matrix under the KILLER BASELINE
    # (source_tag_purge). Each derived layer isolated → how much residue does
    # base-only purge leave attributable to THAT layer alone?
    matrix = {}
    for layer in ("summary", "cache", "adapter"):
        ri, br = _avg(args.seed, args.episodes, args.topics, "source_tag_purge", (layer,))
        matrix[layer] = {"residual_influence": ri, "benign_retention": br}
    # base-only (no derived layers): purge should fully work
    ri0, br0 = _avg(args.seed, args.episodes, args.topics, "source_tag_purge", ())
    matrix["base_only"] = {"residual_influence": ri0, "benign_retention": br0}

    out = {
        "experiment": "E-C03-01",
        "candidate": "C03",
        "title": "Cross-layer revocation canary",
        "config": {"episodes": args.episodes, "topics": args.topics, "seed": args.seed},
        "layers": ["base_store", "summary", "cache", "adapter"],
        "combined_system": combined,
        "residual_influence_matrix": matrix,
        "decision_question": "普通 source-tag purge 是否足够清除 benign 撤权后的跨层残留影响？",
        "killer_baseline": "source_tag_purge",
        "reading": _interpret(combined, matrix),
        "evidence_boundary": (
            "Deterministic simulation of a 4-layer memory mechanism; NOT an LLM run "
            "and NOT real user data. The residual-influence matrix shows, per derived "
            "layer, how much influence a source-tag base purge leaves behind. It proves "
            "the residue is mechanistically real, per-layer localizable, and cleared by "
            "cross-layer repair; it does NOT quantify prevalence in any deployed system "
            "or across real LLM memory stacks."
        ),
    }
    text = json.dumps(out, ensure_ascii=False, indent=2, sort_keys=True)
    if args.out:
        with open(args.out, "w") as fh:
            fh.write(text + "\n")
    print(text)


def _interpret(combined, matrix):
    stp = combined["source_tag_purge"]["residual_influence"]
    clr = combined["cross_layer_repair"]["residual_influence"]
    leaky = [f"{k}={v['residual_influence']:.0%}" for k, v in matrix.items()
             if k != "base_only" and v["residual_influence"] > 0.01]
    base_ok = matrix["base_only"]["residual_influence"] <= 0.01
    if stp > 0.05 and clr <= 0.01 and base_ok:
        verdict = ("CONTINUE-signal: with derived layers present, source-tag purge leaves "
                   f"{stp:.0%} residual influence; cross-layer repair clears it ({clr:.0%}). "
                   f"Residue is localized to derived layers [{', '.join(leaky)}] while a "
                   "base-only store purges cleanly. Benign revocation residue is real and "
                   "purge-insufficiency is layer-attributable — supports continuing C03 as a "
                   "benchmark+systems contribution.")
    elif stp <= 0.01:
        verdict = ("KILL-signal: source-tag purge already clears residual influence "
                   f"({stp:.0%}); per C03 kill rule this collapses to an engineering note.")
    else:
        verdict = (f"MIXED: combined purge residual={stp:.0%}, cross-layer={clr:.0%}; "
                   f"leaky layers [{', '.join(leaky) or 'none'}]. Sharpen attribution before continue/kill.")
    return verdict


if __name__ == "__main__":
    main()

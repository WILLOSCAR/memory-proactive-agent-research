# Auto Research experiment reporting standard

Status: v2 active for Run packages created after this revision

HDFS root: `hdfs://haruna/home/byte_suite_ai/dataset/memory-proactive-agent-research`

The purpose of this standard is to make a negative, failed, reproduction, or
proposal-driven run reviewable and reusable. A run is not complete merely
because a process exited successfully or produced a headline metric.

## 1. Required experiment directory

Each experiment owns one directory:

```text
experiments/<experiment-id>/
├── README.md                 # proposal, evidence boundary, experiment matrix
├── PROTOCOL.md               # exact reproduction and modification procedure
├── source-lock.json          # paper/repo/data/model revisions and licenses
├── <entrypoint>.py           # or an explicit pointer to pinned upstream code
├── runs/
│   └── <run-id>/
│       ├── manifest.yaml     # requested and actual environment
│       ├── command.txt       # exact executed command
│       ├── stdout.log
│       ├── stderr.log
│       ├── result.json       # case-level or aggregate machine-readable result
│       ├── artifacts.sha256
│       ├── RUN_REPORT.md      # this Run only: outcome/failure/verdict
│       └── archive-receipt.yaml # immutable publication + digest readback
├── REPORT.md                 # cross-Run experiment synthesis
└── CONSISTENCY.md            # experiment-level proposal/code/eval audit
```

An upstream repository may remain under the remote `third_party/` cache, but
the experiment must record its exact commit and every local patch. Uncommitted
repository state is recorded by a diff digest; it is never represented as a
clean commit.

`REPORT.md` may compare multiple Runs, but it never substitutes for a missing
`RUN_REPORT.md`. Existing 2026-08-09 batch reports and HDFS receipts are
`legacy-batch-documented`: they retain their scientific and publication
evidence, but no per-Run closure is inferred or fabricated for Runs that lack
the new files.

## 2. Two required scientific layers

### Paper reproduction

Record:

1. exact paper version, table/figure/claim being reproduced;
2. official code commit and dataset snapshot;
3. original preprocessing, split, seed, metric, and compute;
4. deviations forced by hardware, missing assets, or unavailable APIs;
5. reproduced number, reported number, and an uncertainty/tolerance rule;
6. whether the result is an exact reproduction, partial reproduction, pipeline
   smoke test, failed reproduction, or unresolved mismatch.

### Proposal or modification

Record:

1. failure state and proposal being tested;
2. the one intended change relative to the reproduced baseline;
3. held constants, strongest baseline, oracle, ablations, and leakage checks;
4. primary metric, guardrails, practical margin, and predeclared kill rule;
5. implementation delta, including files and configuration keys;
6. result and the precise judgment changed by it.

Do not mix a paper reproduction number and a modified-method number in one
unnamed run. They receive different run IDs even if they share a process.

## 3. Minimum experiment matrix

Every experiment contains, or explicitly marks as unavailable:

- current/published baseline;
- tiny pipeline sanity check;
- data-only or preprocessing-only control when data changes;
- method/objective-only change when code changes;
- full proposal;
- fastest kill experiment;
- one failure-bucket analysis after aggregate metrics.

Expensive training is blocked until the sanity run, split/leakage check,
metric recomputation, and killer baseline pass.

## 4. Manifest and integrity requirements

Start from `templates/run-manifest.yaml`, write the per-Run narrative from
`templates/run-report.md`, and record publication with
`templates/archive-receipt.yaml`. Additionally record:

- paper, upstream repo, dataset, and model revision;
- local source SHA-256 and dirty diff SHA-256;
- requested versus actual Worker/Job/GPU state;
- execution lane (`interactive-lab` or `batch-job`), owning Student, remote container kind/identity/path, Student Lab/Worker or Job/Trial/Instance identity, and exact GPU slice;
- SSH target, resolved host, remote identity, HDFS path, and storage probe;
- dependency lock or `pip freeze` digest;
- stdout/stderr, exit code, wall time, and terminal reason;
- configured queue size, lease/timeout and other execution bounds separately from observed `started_at`, `completed_at`, elapsed time and terminal reason. A configured lease is a maximum, not the observed duration; `queue_exhausted`, stop-file, failure and timeout terminals must never be summarized as if they all consumed the full lease;
- case-level output whenever privacy and size permit;
- cache provenance for every model/API arm: backend/provider, model or endpoint revision, prompt and decoding digest, input/scenario digest, cache namespace, hit/miss counts, and evidence that one model did not reuse another model's outputs;
- If a frozen scenario set intentionally contains byte-identical rendered prompts, derive the expected cache-key equivalence classes before launch and pre-register the resulting real-call and hit counts. A blanket `zero hits` gate is valid only when every expected key is unique. Repeated rows inside one namespace prove cache replay, not independent model generations; if the estimand requires independent repeats, use separately bound namespaces or an explicit cache-bypass route rather than silently relabeling duplicate rows. Any observed provenance mismatch fails closed without interpreting scores; preserve the Run and correct only the operational provenance contract under a fresh Run/analysis ID while leaving scientific texts and thresholds frozen.
- SHA-256 for every reportable artifact. For an executed Run, write and parse the atomic execution terminal before generating the pre-archive `artifacts.sha256`; the manifest must enumerate and verify that terminal along with every then-present reportable artifact. If digest-manifest generation fails after a truthful success terminal exists, preserve that terminal byte-for-byte, leave package/archive state pending, and repair the package without replaying the scientific effect or downgrading execution. Regenerate the canonical manifest only while the package is still mutable and before its first archive-verified publication; after archive verification, use a digest-bearing addendum rather than rewriting archived bytes.
- Discover the artifact set **recursively from the Run root** and compare exact relative-path sets before and after manifest generation. Nested reportable cache, checkpoint, input and provenance files are package members unless a typed manifest/archive rule explicitly excludes them; a top-level file count or the membership of an older `artifacts.sha256` is never the source of truth. Any exclusion records the exact relative path, semantic reason and consumer that can reproduce the decision. Before archive, require the recursive observed set to equal the declared set plus only the digest manifest and future archive receipt, and full-byte verify every declared path. When a mutable package preserves non-overwrite `SUPERSEDED_*` report layers, the root recursive archive includes those historical bytes, while each current subpackage manifest validates only its explicitly declared live layer; validators must not silently add superseded history to the current arm contract. Immutable execution terminals remain execution-era evidence: a later accepted manifest/erratum may narrow stale metadata or wording without rewriting the terminal, and archive validation must bind both layers instead of treating the old prose as the current verdict.
- Generate every machine-readable receipt, manifest fragment, terminal record, or cache stamp with a format-aware serializer rather than an interpolated shell heredoc. Write to a unique temporary path, parse the **final exact bytes** back with the intended consumer, validate the required schema/type bindings, and only then atomically rename it to the authoritative path and print a success marker. A `.json` suffix, a visually plausible object, or parsing an in-memory precursor does not prove the written file: literal trailing escape bytes such as `\\n` are extra JSON tokens. Backslashes, quotes, newlines, non-ASCII text, file paths, command lines, and model output are adversarial serialization inputs: a raw route request may pass while its hand-built receipt is invalid. An emitted candidate or a file named `passed` is not acceptance until the canonical consumer has parsed and verified it. If an expensive effect and raw cache already passed but only a provenance wrapper is malformed, preserve the malformed bytes, issue a digest-bearing non-overwrite parser-valid replacement plus erratum, and repair the mutable package without replaying the effect.
- Archive/source validators must gate scientific identity and inference ceilings on parsed structured fields, typed enums and bound digests. Narrative Markdown/YAML prose is supporting human context, not a byte-literal API: emphasis markers, capitalization, line wrapping or an equivalent phrase must not fail a package after the structured verdict/ceiling and file digest have passed. If a legacy package exposes a boundary only in prose, normalize presentation-only whitespace/emphasis/case and validate a minimal semantic predicate while preserving the exact frozen bytes; then add a structured field for future packages. Preserve every failed verifier attempt and its terminal, fix only the verifier under a fresh non-overwrite attempt, and never replay the scientific effect merely to satisfy a brittle prose literal.
- Define expected artifact predicates by semantics, not one blanket size check. A declared `stdout.log` or `stderr.log` may legitimately exist with zero bytes, while a manifest, result, receipt or terminal record normally must be nonempty and parseable. Use existence (`-e`) for valid-empty streams and nonempty-plus-consumer validation (`-s` and parse/schema checks) for structured evidence; otherwise a successful silent command is misclassified as missing evidence. Record the predicate in the manifest/test and cover both valid-empty and missing-file cases.
- When a failed, provisional or superseded artifact is moved non-overwrite into a provenance/quarantine path, treat its URI as part of the move transaction: record source/destination digest and reason, update every current machine-readable `evidence_ref`/asset pointer to the destination, then search for the old exact URI and fail readback if any live pointer still names it. Historical narrative may preserve the old location as past evidence, but a moved file and a stale current pointer must never be presented as a valid package.
- Every source, Lab, model, dataset, storage-readback or external-service receipt referenced by a Claim-bearing manifest must be bound by both a structured URI and its structured SHA-256 (plus the owning Worker/model/revision where applicable). A YAML comment, a path string, a historical receipt, or a hash supplied only to a launcher is not a machine-verifiable manifest binding. The materializer must validate digest shape and reject missing, placeholder, stale/reclaimed/unverified, or mismatched receipt inputs before writing Run evidence; the pre-Run readback must compare those exact digests to the current registry and target-container bytes.
- A model service binding must also freeze the exact transport route used by the Claim client and every model-specific interface artifact needed on that route (for example a chat template). Record the interface URI, raw-byte SHA-256, provenance/source digest and the launch argument that consumes it in structured fields; bind the same route and digest in the real-load receipt. If the artifact renders current date/time, randomness or another dynamic value, record the effective render context or full rendered-prompt digest and include it with the interface digest in the cache namespace/key; an older cache lacking that exact typed binding is stale. Do not silently normalize a dynamic template into a fixed prompt merely to pass reproducibility checks, because that changes the scientific Prompt/Spec and requires an explicit reviewed delta. `/models` health, a listening port, resident VRAM or a successful probe on a different route cannot authorize the Run. The pre-Run gate must reject an absent or mutated interface artifact, a cache-context mismatch, and must execute one bounded, parsed, nonempty request through the Claim client's exact route before launch.
- Backend-specific output metadata must describe the route that actually executed, not a dormant default belonging to another backend. A local `hf`/Transformers arm must bind its local model root and revision and emit `endpoint: null / not-applicable` (or an equally typed local-route record); it must never carry a default Endpoint ID merely because the shared harness also supports an API backend. Before source acceptance, regression-test the exact result writer once per backend and assert that `backend/provider/transport/model/revision/endpoint` agree with the manifest, command, load receipt and cache namespace. If a completed immutable result contains a stale route label, preserve it, fail closed on archive/scientific promotion, and prove the actual transport from the bound command, backend branch, offline/runtime flags, model/load receipt, cache namespace and logs before issuing a digest-bearing non-overwrite route-provenance erratum. If that proof is incomplete, or the executed route may have touched a retired resource, classify the Run `invalid / not-interpretable`; never retry or smoke the retired Endpoint. In either case repair and source-lock the metadata plumbing before any fresh Claim-bearing Run.
- Every digest derived from structured content rather than raw file bytes (for example a split, scenario set, normalized input, or cache namespace) must freeze the exact canonicalizer as source code or an executable command, its version/digest, the included fields and ordering, and a regression fixture whose expected digest is checked before launch. A hard-coded derived digest without its generator is `unverifiable`, must not be copied into a revised Spec, and cannot support source registration or a Claim-bearing Run. If the historical canonicalizer is unavailable, preserve and supersede the old value, then define a new explicit canonicalization contract and recompute both fixture and current-input digests; never guess a value merely to satisfy a manifest field.
- Before source acceptance and again before Run materialization, recursively resolve every exact source, fixture, canonicalizer, generator, interface or receipt digest named inside the active Run-Spec, review artifacts and manifest inputs against the final accepted closure. A stale internal digest reference blocks promotion even when all closure files and fixtures pass, because byte inventory proves what was packaged rather than that the package's own provenance graph is current. Preserve the superseded acceptance, repair the owning source without changing the scientific contract, freeze a fresh Run-Spec digest, and issue a new non-overwrite source acceptance before execution.
- Machine-readable output identity (`experiment_id`, `run_id`, Cycle/Round, model arm and question/spec revision) must be supplied at runtime and agree with the immutable Run directory plus `manifest.yaml`. If a completed raw artifact contains stale or hard-coded identity, preserve its bytes, add a digest-bearing `metadata-erratum.json`, treat the directory plus manifest as authoritative, and repair the metadata plumbing before any fresh Claim-bearing Run; never rewrite the completed result in place.
- Independent review may change the interpretation after a Run package is first drafted. Before declaring the package locally reviewable, using it in Stage Settlement, or entering Handoff, reconcile every still-mutable report-layer surface to the adopted verdict: `manifest.yaml` scientific outcome and summary, `RUN_REPORT.md`, `archive-receipt.yaml` claim ceiling, and any experiment synthesis that cites the Run. Preserve `result.json`, command, stdout/stderr, source lock, and the raw analysis token byte-for-byte; explicitly mark a confounded or overruled token as such rather than rewriting it. Regenerate `artifacts.sha256`, verify all affected digests, and rerun package-completeness plus container-first checks after the reconciliation. If the package is already `archive-verified`, do not mutate it; append a digest-bearing review addendum or superseding verdict record instead.

Before a Claim-bearing process starts, create its fresh immutable Run directory
and instantiate `manifest.yaml` from the canonical template with the exact
Student, Cycle/Round, Worker/Job/Instance, GPU slice, source/model/data receipts,
execution identity and predeclared output paths. Freeze `command.txt`, preserve
service/launcher PID and command ownership, and bind stdout, stderr, health,
terminal/exit and result records to that Run rather than a reusable `/tmp`
marker. Run the container-first policy check on the initialized manifest and
read the referenced paths back from the target container. A staged launch
recipe is executable configuration: `bash -n`, grep hits, prose such as
"turnkey", or a successful download do not validate it. It must contain no
placeholder interpreter or ambiguous flag, every bounded health loop must fail
closed, ownership must be proved from the persisted PID plus exact command and
port rather than a global process-name match, and every reusable first-copy
asset must use the canonical strong receipt plus immutable approved-storage
bytes/inventory/digest readback. Model real-load and durable archival may run as
separate asynchronous infrastructure steps, but the scientific process remains
blocked until both the asset gate and this Run preflight pass.

Fixtures and inline unit smokes must never write through production Run, result,
cache, checkpoint or receipt paths. Inject a temporary output/cache root, prove
the production namespace inventory is unchanged, and archive only intentionally
declared fixture evidence. If a smoke accidentally creates production-shaped
files, stop before any Run consumes them; record their exact paths/digests and
move them non-overwrite into a clearly typed test-artifact quarantine. Do not
delete, overwrite, source-lock or cite them as scientific cache/results, and
repair the fixture to use an isolated temporary namespace before rerunning it.

Every fixture counted by source acceptance must be hermetic inside the declared
source/dependency closure. A test may not require a historical quarantine,
production cache, old Run directory, sibling checkout, or other artifact that
the same closure explicitly excludes. If such evidence is useful, make it a
separately scoped optional historical audit; the correctness fixture must build
its minimal bytes in a temporary namespace and validate those bytes directly.
Controller validation records the exact selected test set and any exclusion;
“full suite passed” is forbidden when a discovered test was skipped or failed.
This packaging failure blocks source promotion but is not a scientific negative.

When a Run manifest must name the source lock that authorizes it, do not create
a circular lock by putting that already-materialized manifest back into the
same source closure whose revision it names. Freeze and source-lock the generic
manifest generator plus executable launchers first. After the controller
returns the immutable source receipt, materialize `manifest.yaml` and
`command.txt` as Run evidence from explicit current binding/receipt inputs,
verify those references against the registry and target container, then freeze
the Run directory before launch. A historical draft manifest may remain for
provenance, but it cannot pass the pre-Run gate or authorize execution; editing
Run evidence after source receipt issuance does not change executable source,
while editing the generator or launcher does and therefore reopens source
verification.

Container-first is mandatory for every Claim-bearing Run. CPU preprocessing,
NumPy evaluation, retrieval, API clients, inference and training all execute in
the verified remote Lab/Job container. `api` and `local-cpu` are not execution
lanes. Local commands may be recorded as non-evidentiary smoke diagnostics, but
they cannot create a Run, support a Stage Settlement, or become Local Result.

Metrics must be independently recomputable from `result.json`. Failed,
timeout, skipped, and invalid cases stay in the denominator unless the protocol
predeclares another rule.

For every discrete `k/n` threshold, delta gate, or kill rule, the Run package
must also preserve the raw numerator and denominator (or unrounded operands),
the comparator and threshold, the resulting pass/fail value, and a regression
check for the exact-equality boundary. These decision-integrity fields may live
in `result.json` or a separately hashed `decision-integrity.json`, but a rounded
display metric is never an admissible gate input. If this check discovers that
the executed evaluator produced the wrong scientific verdict, preserve that
original Run unchanged and create a fresh `run_id` for the corrected evaluator;
the new package must link to the superseded Run and include the container-side
regression output.

If a Run-Spec also describes a discrete threshold as statistically significant
or quotes an exact `p`-value, the executable evaluator must freeze the null
model and tail direction, emit the machine-computed exact probability, and test
the nearest passing and failing `k/n` boundaries. A count/controls heuristic
that does not compute that probability must stay labeled as a heuristic gate;
it cannot inherit a significance label from prose. If this mismatch is found
before execution, preserve the superseded Spec, correct and re-freeze the
Run-Spec, and repeat source acceptance before any model call.

Before source acceptance, every statistical evaluator must run its real
result-writing path on bounded degenerate fixtures relevant to its estimand:
empty bootstrap samples, constant or tied inputs, undefined statistics,
single-class buckets, and any array/scalar types emitted by the numerical
library. Undefined quantities must route to the predeclared invalid or
fail-closed world state rather than a fabricated zero or an exception; the
final result must also round-trip through the exact serializer and consumer
used by the Run, including conversion of library booleans/scalars to supported
machine types. A unit test of the helper alone is insufficient when a later
result write can still fail. If this defect is discovered after expensive
model calls, preserve the terminal, raw call cache and provenance without
interpreting partial scores, repair and source-lock the evaluator under a fresh
Run ID, and never overwrite or relabel the failed Run as success.

## 5. HDFS publication contract

Use immutable run destinations:

```text
hdfs://haruna/home/byte_suite_ai/dataset/memory-proactive-agent-research/
├── datasets/<dataset>/<revision>/
├── code/<experiment-id>/<source-lock-digest>/
├── runs/<experiment-id>/<run-id>/
└── reports/<experiment-id>/<run-id>/
```

- Never upload credentials, tokens, browser state, or private unrelated data.
- Never overwrite an existing completed run. Corrections use a new run ID and
  link back to the superseded run.
- Upload only after local consistency checks and artifact digests finish.
- Verify the HDFS inventory and digest-bearing manifest after upload.
- A failed or negative run is uploaded if its evidence is valid; this prevents
  selective retention of positive results.
- An HDFS command exit is control-plane evidence only. `archive-verified`
  requires a final inventory plus digest readback for the declared Run package.

## 6. Orthogonal closure states

Do not compress Run closure into one overloaded `status`:

- **execution**: `requested / queued / running / completed / failed / cancelled`;
- **scientific outcome**: `positive / negative / mixed / inconclusive /
  not-interpretable`;
- **reproduction outcome**: `not-applicable / pipeline-smoke / reproduced /
  partial-reproduction / mismatch`;
- **archive**: `local-draft / local-verified / published / archive-verified /
  superseded`;
- **Mentor settlement**: `unreviewed / mentor-accepted / mentor-rejected /
  settled`.

A failed process can be archive-complete, and a completed process can remain
scientifically uninterpretable. A negative result is not a failed Run.

## 7. Completion gates

- **Container policy**: `scripts/check-container-first-policy.sh <manifest...>` passes for every Claim-bearing Run; failure leaves the Run non-evidentiary and blocks Handoff.
- **Locally reviewable**: accepted manifest, command, logs, machine-readable
  terminal/result record, `RUN_REPORT.md`, digests, and consistency verdict.
- **Archive complete**: locally reviewable plus immutable destination,
  `archive-receipt.yaml`, inventory verification, and digest readback.
- **Scientifically settled**: archive complete plus Mentor verdict and applied
  Settlement pointer.

Only archive-complete digest-bearing Artifacts may be marked `valid=true` and
support Local Result. HDFS publication failure is an archive blocker; it does
not retroactively turn a valid local execution into a negative scientific
result. A batch-level receipt covers only the Run IDs and digests it explicitly
enumerates.

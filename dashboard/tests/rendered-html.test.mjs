import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the research operating system", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Auto Research OS \| Memory, Proactive &amp; Personalization<\/title>/i);
  assert.match(html, /Canonical snapshot valid/);
  assert.match(html, /attention-grid/);
  // P0: delta-aware Leader Brief renders an honest cold headline + basis (not evidenceType).
  assert.match(html, /Latest recorded material changes since|自上次查看/);
  assert.match(html, /basis:/);
  assert.doesNotMatch(html, /· inference<\/small>/);
  assert.match(html, /Research Map/);
  assert.match(html, /Paper Portfolio/);
  assert.match(html, />34<\/strong><span>independent Candidates<\/span>/);
  // Two real Runs landed (C03 E-C03-01 mechanism sim + E-C03-02 dense-vector RAG).
  assert.match(html, />2<\/strong><span>Actual Runs<\/span>/);
  assert.match(html, />0<\/strong><span>Paper Projects<\/span>/);
  // C03 first Run landed: honest callout reflects auditable Run + mechanism-level evidence.
  assert.match(html, /可审计 Run.*Local Result.*机制级证据/);
  // P1 IA reorg: the Now homepage compresses six Track cards into a compact matrix…
  assert.match(html, /track-matrix/);
  // …and the domain-teaching blocks are sunk below the operator path into
  // Help / System, so they must NOT render on the default (Now) homepage.
  assert.doesNotMatch(html, /designs, not executions/); // evidence-spine teaching → Help
  assert.doesNotMatch(html, /每次研究交互必须落什么/);      // atomic settlement → System
  assert.doesNotMatch(html, /Candidate 何时能形成 Paper Thread/); // promotion contract → Help
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("keeps the canonical data seam, interactions, and social preview wired", async () => {
  const [adapter, indexRaw, system, css, page, layout, syncScript] = await Promise.all([
    readFile(new URL("../app/research-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/research-index.json", import.meta.url), "utf8"),
    readFile(new URL("../lib/research-system.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../scripts/sync-research-index.mjs", import.meta.url), "utf8"),
  ]);

  const index = JSON.parse(indexRaw);
  assert.equal(index.sourcePapers.length, 298);
  assert.equal(index.candidates.length, 36);
  assert.equal(index.candidates.filter((candidate) => candidate.nestedInto.length === 0).length, 34);
  assert.equal(index.runs.length, 2);
  assert.match(index.sourceRevision, /^sha256:[a-f0-9]{64}$/);
  assert.match(adapter, /export const researchIndex = index as unknown as ResearchIndex/);
  assert.match(system, /export function buildResearchSnapshot/);
  assert.match(system, /RUN_MANIFEST_MISSING/);
  assert.match(page, /type ViewId = "now" \| "map" \| "candidates" \| "experiments" \| "decisions" \| "papers" \| "library" \| "help" \| "system"/);
  assert.match(page, /TRACEABILITY GRAPH/);
  assert.match(page, /Candidate Workspace/);
  assert.match(page, /Experiment Center/);
  assert.match(page, /Decision & Lineage/);
  // P1 IA reorg: secondary Help / System / Library surfaces exist as view branches
  // (single-page state switch, no router).
  assert.match(page, /view === "help"/);
  assert.match(page, /view === "system"/);
  assert.match(page, /view === "library"/);
  // Decisions is Inbox-first (audit §B2 / §A8): proposed decisions lead the view.
  assert.match(page, /Decision inbox/);
  assert.match(page, /现在需要你决定什么/);
  // Now compresses the six Track cards into a compact matrix (audit §D3).
  assert.match(page, /track-matrix/);
  // Domain teaching sank OUT of the operator path into Help / System (audit §A6–A9).
  // Assert each moved block by its NEW location: the object-model glossary + full
  // promotion contract live in the Help branch; the atomic-settlement tutorial +
  // one-write contract live in the System branch (which follows Help in source).
  const helpBranch = page.indexOf('view === "help"');
  const systemBranch = page.indexOf('view === "system"');
  assert.ok(helpBranch > 0 && systemBranch > helpBranch);
  const inHelp = (needle) => {
    const at = page.indexOf(needle);
    return at > helpBranch && at < systemBranch;
  };
  const inSystem = (needle) => page.indexOf(needle) > systemBranch;
  assert.ok(inHelp("对象模型词典"), "object-model glossary must live in Help");
  assert.ok(inHelp("Candidate 何时能形成 Paper Thread"), "promotion contract must live in Help");
  assert.ok(inSystem("每次研究交互必须落什么"), "atomic settlement must live in System");
  assert.ok(inSystem("Atomic writer"), "one-write contract must live in System");
  assert.match(css, /\.attention-grid/);
  assert.match(css, /\.candidate-table/);
  assert.match(css, /\.spec-board/);
  assert.match(css, /\.track-matrix/);
  assert.match(syncScript, /Generated dashboard data is stale/);
  assert.match(syncScript, /\.research-settlement\.pending\.json/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /socialImage/);
  await access(new URL("../public/og.png", import.meta.url));
});

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
  assert.match(html, /Research control plane · read-only/);
  assert.match(html, /Leader Brief/);
  assert.match(html, /Research Map/);
  assert.match(html, /Paper Portfolio/);
  assert.match(html, />34<\/strong><span>independent Candidates<\/span>/);
  assert.match(html, />0<\/strong><span>Actual Runs<\/span>/);
  assert.match(html, />0<\/strong><span>Paper Projects<\/span>/);
  assert.match(html, /0 Run 不是空白要被 UI 填满/);
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
  assert.equal(index.sourcePapers.length, 210);
  assert.equal(index.candidates.length, 36);
  assert.equal(index.candidates.filter((candidate) => candidate.nestedInto.length === 0).length, 34);
  assert.equal(index.runs.length, 0);
  assert.match(index.sourceRevision, /^sha256:[a-f0-9]{64}$/);
  assert.match(adapter, /export const researchIndex = index as unknown as ResearchIndex/);
  assert.match(system, /export function buildResearchSnapshot/);
  assert.match(system, /RUN_MANIFEST_MISSING/);
  assert.match(page, /type ViewId = "now" \| "map" \| "candidates" \| "experiments" \| "decisions" \| "papers" \| "assets"/);
  assert.match(page, /TRACEABILITY GRAPH/);
  assert.match(page, /Candidate Workspace/);
  assert.match(page, /Experiment Center/);
  assert.match(page, /Decision & Lineage/);
  assert.match(page, /Atomic writer/);
  assert.match(css, /\.attention-grid/);
  assert.match(css, /\.candidate-table/);
  assert.match(css, /\.spec-board/);
  assert.match(syncScript, /Generated dashboard data is stale/);
  assert.match(syncScript, /\.research-settlement\.pending\.json/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /socialImage/);
  await access(new URL("../public/og.png", import.meta.url));
});

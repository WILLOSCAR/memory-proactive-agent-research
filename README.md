# Auto Research OS Dashboard

面向研究负责人恢复全局认知的只读 Control Plane。它不再维护第二份手工研究事实，而是把
`memory-proactive-agent-research` 的结构化索引投影成七个可下钻工作区。

## 当前事实边界

- 106 个 Source ledger 入口、32 个 Literature Cluster。
- 36 个 Candidate 节点，其中 34 个独立 Candidate、2 个 Nested Slice。
- 11 个 Experiment Spec；0 Actual Run、0 Local Result。
- 0 达标 Paper Opportunity、0 Paper Project。

页面展示的是研究成熟度和执行准备度，不会把 Spec、GPT Pro 建议或文献结果显示成本地实验结果。

## 七个工作区

1. `Now`：3–5 条确定性 Leader Brief、六 Track 健康和 Evidence Spine。
2. `Research Map`：Track → Cluster → Source Paper → Gap → Candidate。
3. `Candidates`：Candidate 厚卡、状态、Evidence、Spec、Decision 与 lineage。
4. `Experiments`：严格区分 Experiment Spec、Run、Artifact 与 Local Result。
5. `Decisions`：`proposed → approved → applied` 与 append-only Research Event。
6. `Paper Portfolio`：区分 promotion watch、Paper Opportunity 和 Paper Project。
7. `Assets`：事实源优先级、同步合同、Reusable Asset 和 External Review 边界。

## 数据 seam

```text
memory-proactive-agent-research/research-index.yaml
memory-proactive-agent-research/research-events.jsonl
                    ↓ journaled Settlement writer
          exact SHA-256 source revision
                    ↓ npm run sync:data
data/research-index.json
                    ↓ buildResearchSnapshot(...)
Now / Map / Candidate / Experiment / Decision / Paper / Assets
```

- Canonical state：`../memory-proactive-agent-research/research-index.yaml`
- Append-only events：`../memory-proactive-agent-research/research-events.jsonl`
- Schema：`../memory-proactive-agent-research/schemas/research-index.schema.json`
- State writer：`../memory-proactive-agent-research/scripts/settle-research-event.mjs`
- Dashboard adapter：`scripts/sync-research-index.mjs`
- Derived research semantics：`lib/research-system.mjs`
- Generated read model：`data/research-index.json`
- Type adapter：`app/research-data.ts`
- Browser workspace：`app/page.tsx`
- Visual system：`app/globals.css`

`research-index.yaml` 使用 JSON-compatible YAML，以便在不增加解析器依赖的情况下由 Node 校验和同步。
同步器会在 Settlement lock 或 pending journal 存在时拒绝读取，并把 index + event log 的精确 SHA-256 revision 写入 read model；因此页面可以证明自己读取的是哪一次一致快照。

## 本地打开

要求 Node.js `>=22.13.0`：

```bash
npm install
npm run sync:data
npm run dev
```

也可以双击根目录的 `open-research-idea-forest.command`，固定在
`http://127.0.0.1:8766/` 打开。

## 验证

```bash
npm run check:data
npm run test:model
npm test
npm run lint
```

关键守卫：

- Nested Slice 不计入独立 Candidate。
- 缺 Run Manifest 的记录不计为 Actual Run。
- 缺有效 Artifact digest 的 Evidence Link 不计为 Local Result。
- Leader Brief 最多展示五条注意项，并保留稳定实体指针。
- External Review 只能形成 pressure，不能直接形成 support。

`public/research-idea-forest.html` 是旧版静态图谱，仅作为历史快照保留。

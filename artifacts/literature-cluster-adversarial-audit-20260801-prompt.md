# Role

你是一个极其挑剔的 research co-PI、related-work reviewer 和 benchmark designer。请对附件中的六方向文献图谱做一次反向审稿，而不是继续泛泛发散，也不要替我写 paper draft。

# 研究结构

六个方向是：

1. M-AI：AI Memory
2. M-PHY：Memory × physiological / wearable data
3. P-AI：Proactive Agent
4. P-PHY：Proactive Agent × physiological / wearable data
5. U-AI：Personalization / user modeling
6. U-PHY：Personalization × physiological / wearable data

目标是让六条线并行快速迭代；每条线都可以从问题节点继续分叉出 benchmark、method、system、analysis、application 等支线。当前阶段先发现问题和评测白空间，不强行设 paper draft。

# 你需要完成的任务

## A. 证据审计

- 逐方向检查现有 cluster 是否合理：这些论文实际上研究了什么问题、依赖什么假设、用了什么数据和指标。
- 指出把不同问题错误混在一个 cluster、把工程差异误当 novelty、或把已被覆盖的问题误判为空白的地方。
- 对每个重要判断区分：`附件直接支持`、`合理推断`、`需补文献验证`。
- 不要把“论文存在”当成“结论已被复现”。

## B. 缺失论文与相关工作压力

- 为每个方向补充最重要的 primary papers / benchmarks，优先原论文、官方 benchmark 或 peer-reviewed version。
- 对附件没有提供的论文，给出标题、作者/年份、稳定 URL，并标记 `外部候选，未在附件核验`；如果不确定标题或链接，不要编造。
- 特别检查 2025–2026 的新 benchmark 是否已经压缩了候选 C02、C08、C14、C15 的 novelty。

## C. 问题空间与评测空间

- 对每个 cluster 写出：核心研究问题、已有覆盖、仍未覆盖、关键变量、可观察 failure、killer baseline、最便宜的 falsification probe。
- 区分 component-level metric、task success、longitudinal utility、causal effect、safety/governance，避免用代理指标替代最终效用。
- 对 P-PHY 明确区分 need、availability、receptivity、effectiveness；对 Memory 明确区分 write / retrieve / use / update / forget / repair；对 personalization 明确区分 adaptation / attribution / conflict / rollback。

## D. 树状 Idea Forest

不要输出一张平铺清单。请构造四级树：

`六方向 → literature cluster → unresolved problem → idea leaf`

每个 idea leaf 至少包含：

- 一句话可证伪 claim；
- 对应的 benchmark slice 或需要新建的 eval；
- 最小 probe（1–2 天、CPU/单卡优先）；
- 继续 / 分叉 / 暂停 / kill 条件；
- 预期 novelty 类型；
- 与其他方向可以复用的方法、prompt、tool 或 protocol。

请至少给出 24 个非重复叶子，并指出其中 8 个最值得下一轮优先验证的叶子。不要为了凑数量重复改名。

# 输出结构

1. `Executive Verdict`：最多 12 条，先指出最重要的修正。
2. `Six-Branch Cluster Audit`：六个方向分别审计。
3. `Missing Primary Literature`：按方向列出，明确核验状态。
4. `Candidate Pressure Test`：单独审 C01、C02、C03、C08、C13、C14、C15、C23、C25、C28、C31。
5. `Idea Forest`：四级树，至少 24 个叶子。
6. `Top-8 Cheap Probes`：按信息增益 / 成本排序。
7. `What Not To Claim Yet`：明确哪些 novelty、因果或通用性结论现在不能写。
8. `Repository Update Suggestions`：只建议应如何修改图谱和看板，不要改代码。

请直接、尖锐、具体。保守对待 novelty，激进生成可证伪分支。

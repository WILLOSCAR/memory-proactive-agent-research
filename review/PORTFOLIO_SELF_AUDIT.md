# 3×2 Research Portfolio Self-Audit

日期：2026-07-30  
结论状态：**frozen historical audit / superseded**

> 本文件只记录 2026-07-30 的组合审计快照。当前术语、对象模型与产品合同以 [../CONTEXT.md](../CONTEXT.md)、[../REQUIREMENTS_AUTO_RESEARCH_OS.md](../REQUIREMENTS_AUTO_RESEARCH_OS.md) 及 [../SOURCE_AUTHORITY.yaml](../SOURCE_AUTHORITY.yaml) 为准。

## 1. 总结判断

当前 `AI Memory / Proactive Agent / Personalization × general / physiological` 结构作为 **研究运营矩阵** 是合理的，但不能被宣传成学术领域的唯一 ontology。

它的优点是：

- 三条一级线分别对应“保留什么”“何时行动”“为谁适应”三个根问题；
- 生理分支显式暴露 observation、时间尺度、个体差异、隐私和评测变化；
- 每个实验能得到唯一 primary branch，减少重复记账；
- 论文贡献路线与 UbiComp/HCI 产品路线可以分开。

它的主要缺陷是：

- 第一维是研究问题，第二维是输入/部署设置，两个维度语义不对称；
- Memory、Proactive、Personalization 在真实 Agent 中高度耦合；
- 六分支同时“全力训练”会造成资源和作者注意力碎片化；
- 生理数据很容易沦为换数据集，而非产生新方法或可泛化问题。

因此保留 3×2，但增加 `horizontal lens + contribution route + scenario`，而不是继续增加一级目录。

## 2. Primary branch 的可操作判定

| 论文主要操纵变量 | Primary branch |
| --- | --- |
| write / update / resolve / retrieve / forget / memory representation | M-AI 或 M-PHY |
| silence / ask / suggest / prepare / execute 的选择与时机 | P-AI 或 P-PHY |
| user model / adaptation / feedback learning / per-user policy | U-AI 或 U-PHY |

若一个系统同时包含三者，论文仍需回答“去掉哪一模块，主 claim 就不存在”。该模块决定 primary branch，其他部分记 secondary tags。

## 3. Physiological branch 的升级门槛

进入 `*-PHY` 至少满足两项：

1. 生理/行为流改变了任务的时间尺度或 ground truth；
2. 个体 baseline、漂移或缺失使群体模型不再足够；
3. 设备、能耗、隐私或主动感知是方法的一部分；
4. 评测需要 longitudinal、user-level 或 intervention outcome；
5. 方法可推广到多类传感器或多数据集。

只把现有 LLM/RAG/classifier 接到 wearable 数据上，不足以形成独立分支论文。

## 4. 新增方向的层级判断

| Adjacent direction | 当前归属 | 是否升为一级线 |
| --- | --- | --- |
| Memory poisoning / provenance authority | M-AI paper family + horizontal safety | 否 |
| Meta-memory / uncertainty / memory awareness | M-AI paper family，交叉 P/U | 否 |
| Multi-user / multi-agent shared memory | M-AI primary，social/team tag | 否 |
| Self-evolving skill / parametric memory | M-AI 或 U-AI，self-evolution tag | 否 |
| Continual co-adaptation / feedback loop | U-AI/U-PHY | 否 |
| Causal intervention response | P-PHY/U-PHY，causal tag | 否 |
| User autonomy / control / explanation | P/U 横切治理轴 | 否 |
| On-device efficient sensing | PHY 分支或产品层 | 否 |

这些方向足以各自形成论文，但它们改变的是安全、学习机制、主体数量、因果证据或部署约束，不是新的根任务。

## 5. 当前最危险的 novelty overlap

- “长期 memory + proactive agent”已有直接工作，不能再作为宽泛首创；
- “生理数据 + LLM + 主动提醒”已有多条可穿戴/JITAI/多模态工作；
- “记住用户偏好”不足以支撑 Personalization；需要 relevant-use、drift、feedback 或 policy adaptation；
- “self-evolving”已出现文本 memory、utility learning、skill evolution 和快速参数更新多种路线；
- “用历史预测干预响应”只建立相关性，不能自动得到干预因果效应；
- memory schema、supersession、verifier、trigger classifier 单独作为 novelty 的空间都在缩小。

## 6. 资产规范审计

v0.2 已补齐此前最缺的部分：

- Experiment 与 Run 分离；
- immutable raw/artifact 与 mutable index 分离；
- Claim–Evidence ledger；
- requested/queued/allocated/actual resource 分离；
- source-of-truth 与 cache 分离；
- negative/failed/invalid/inconclusive 分离；
- physiological data governance；
- Project Sources 与 Task Bundle 分离；
- pre-run、post-run、weekly、paper 四级质量门。

仍需通过真实首批实验验证：

- ID 是否过重；
- Run manifest 哪些字段可自动采集；
- HDFS/对象存储 digest 的实际成本；
- claim-evidence ledger 是否能在每周节奏中持续维护；
- Project Source 文件容量与版本回收策略。

## 7. Portfolio 风险与修正

“六线全部迭代”合理，但应解释为六条分支每周都有 **信息增量**，而不是同时维护六篇重训练论文。

建议：

- 同时 active paper tracks：2–3 条；
- 每周重 GPU experiments：1–2 个；
- 其余分支维持 cheap falsification；
- 任一方向连续两周没有可证伪进展就 park 或换 seed；
- 每周至少产生一个负结果或明确排除一个研究树节点，避免只累积模糊 idea。

## 8. 待 GPT Pro 重点反驳

1. Personalization 是否真能作为第三条一级线，还是应成为 Memory/Proactive 的属性；
2. general/physiological 是否应该改名为 text/tool versus embodied/longitudinal；
3. security、self-evolution 或 multi-agent 是否已经成熟到需要一级 program；
4. 六分支周更是否仍然过宽；
5. 哪些 paper seeds 能在 6–8 周内形成顶会级证据；
6. v0.2 资产协议是否过重，哪些字段应自动化或删除。

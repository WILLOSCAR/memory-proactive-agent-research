# Auto Research OS / Human–Agent SOP Review Brief

日期：2026-08-04  
用途：发送给绑定在 ChatGPT Project `Auto Research` 的独立 Codex Pro Bridge Task。本文是任务简报，不是已经采纳的系统规范；最终结论必须由本地 Codex verdict 复核。

You are GPT Pro acting as an external reasoning partner for Codex. Codex can read and modify the local repository; you should only treat the attached immutable Evidence Bundle and the Project Sources as available evidence. Your role is to reason, critique, and give actionable guidance. Separate observed facts, inference, external-review pressure, and missing evidence.

## 1. 背景

当前项目同时推进 Memory、Proactive Agent、Personalization 及其 physiological / behavioral variants。目标不是六条线合成一篇论文，而是让每条 Track 持续分叉出多个 Candidate、Experiment、Paper Opportunity 和论文，同时沉淀可复用的 Auto Research SOP、Prompt、Evaluator、数据与运行资产。

研究反馈周期希望达到 1–3 天一次 Cheap Probe 判断、1–2 周一次显著升级。用户与 Codex 会通过聊天高频协作，但用户不希望为了恢复全局认知而反复打开多个线程、逐个询问每篇论文或每个 Idea。

## 2. 新的产品目标

最终用户只需打开一个浏览器 HTML，就能：

1. 在 30 秒内理解整个 Auto Research Program 是否真正推进；
2. 理解自上次查看后什么发生了变化，以及为什么重要；
3. 看见六条 Track 的研究深度、活跃 Candidate、阻塞和论文机会；
4. 从宏观结论下钻到 Source Paper、Literature Cluster、Candidate Proposal、Experiment Spec、Run、Artifact 与 Decision；
5. 明确区分 Source Supported、Inference、External Review 与 Local Result；
6. 看见哪些问题需要用户决策、Agent 下一步会产生什么证据；
7. 在不过载的前提下逐层展开细节，而不是在首页看到所有论文、卡片和日志。

浏览器应成为异步 Research Control Plane 和共享认知界面。聊天线程只是执行空间，不是事实源；线程数量和关闭与否不应影响研究连续性。

## 3. 已识别的现状问题

- Source Paper 与本项目 Paper Project 都被简称为 Paper；
- Candidate 与 Proposal 混用，Proposal 有时被当成第二种工作项；
- Experiment Spec 被显示成 Experiment，尽管真实 Experiment/Run 仍为 0；
- Literature、Proposal、Experiment、Asset 被设计为平级孤岛，用户需要在脑内拼接关系；
- Dashboard 手工复制部分研究事实，无法由 canonical 资产自动更新；
- 当前页面强调数量和状态，缺少 Leader 视角的解释、重要性判断与注意力压缩；
- 36 个跟踪节点中 C14/C15 已 Nest，独立 Candidate 应为 34；
- 现有“最近活动”和日期部分是人工快照，不能稳定衡量研究速度；
- 尚无第一类 Paper Project 实体，无法回答“正在形成哪些我们自己的论文”。

## 4. 当前建议的核心模型

```text
Track + Source Paper
  → Literature Cluster
  → Gap / Failure
  → Candidate (Cnn; one falsifiable claim + evaluation)
  → Experiment Spec
  → Run
  → Artifact
  → Decision (continue/split/nest/merge/park/kill)
  → Paper Opportunity / Paper Project
```

Proposal 是 Candidate 的厚卡视图，不单独编号。只有真实执行才创建 Run；只有有效 Run 的 Artifact 才是 Local Result。GPT Pro 是 External Review pressure，不是 Evidence。

## 5. Human–Agent Settlement

一次有意义的聊天协作结束后，应沉淀：

- scope；
- changed；
- why it matters；
- evidence level 与 pointer；
- decision 或 decision needed；
- next evidence；
- blocker / unlock condition。

Dashboard 应消费这些结算结果和 canonical 资产，而不是读取聊天原文。

## 6. 认知负载要求

- L0 默认只显示 3–5 条真正需要注意的结论；
- 每条结论包含 What changed / Why it matters / Evidence / Decision needed / Next；
- 完整论文与 Candidate 信息按需下钻；
- 论文优先按 Cluster 压缩；
- 不用文档数量和无意义百分比表示进度；
- 展示“现在不需要关注什么”；
- 同类变化合并为 narrative，并可回溯到原始实体。

## 7. 请 Codex Pro 完成的任务

请从 Research Leader、科研 PI、Research Ops、Human–Agent Interaction 和信息架构五个视角，严厉审查这套目标与 SOP。

重点回答：

1. 这个系统真正的 North Star 和 Jobs-to-be-Done 应该如何表述？
2. 当前领域对象是否过多或仍有关键缺失？哪些应当是实体，哪些只是 View 或派生状态？
3. Candidate、Experiment、Run、Decision 与 Paper Project 的边界是否足够支持多论文并行？
4. Human–Agent Settlement 是否足以让用户脱离聊天线程仍恢复全局认知？还缺什么？
5. Leader Brief 应如何生成，才能解释研究而不是堆统计，同时控制认知负载？
6. L0–L3 信息架构应如何重构？哪些内容必须在首页，哪些必须隐藏到下钻？
7. 如何衡量研究在“变深”而非只“变宽”，又不制造虚假的完成百分比？
8. 哪些自动化可以安全交给 Agent，哪些研究决策必须保留给用户？
9. 最小可用版本应包含什么？哪些功能应明确推迟？
10. 请给出一个可实施的对象模型、核心用户旅程、页面结构、状态机、验收标准和分阶段路线图。

## 8. 输出要求

请明确区分：

- 必须保留的目标；
- 需要修正的假设；
- 建议删除的复杂度；
- 推荐新增的能力；
- MVP；
- 后续版本；
- 仍需用户决定的关键问题。

不要只给视觉设计建议，也不要把它变成通用项目管理 SaaS。核心是高频、多论文、证据驱动的 Auto Research，以及面向 Leader 的认知压缩和可解释研究进度。

请严格按以下一级标题返回；在这些标题内部完成上面要求的对象模型、用户旅程、页面结构、状态机、验收标准和路线图：

## Direct Answer
## Key Reasoning
## Assumptions / Unknowns
## Risks
## Next Actions for Codex

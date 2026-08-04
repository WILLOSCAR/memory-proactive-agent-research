# Literature Cluster Map and Idea Forest

更新日期：2026-07-31  
阶段：second-pass literature audit；问题发现优先；不构成 novelty 证明或实验结果

这个文件回答三个稳定问题：

1. 六个方向分别有哪些论文簇；
2. 每个论文簇实际关注、优化和评测什么；
3. 从论文共同假设与未覆盖变量中，可以继续长出哪些 idea 分支。

逐篇来源、链接与核验边界统一保存在 `sources/2026-07-30-adjacent-source-ledger.md`；candidate 的当前状态保存在 `CURRENT.md`。这里不保存周进度，也不把每个叶子直接升级为论文题目。

## 1. 二轮 review 的总判断

### 1.1 六个方向的拥挤度不同

| Branch | 已形成的主流问题 | 当前最拥挤区域 | 更值得继续找的问题 |
| --- | --- | --- | --- |
| M-AI | 存储、检索、总结、更新、长期 QA、经验复用 | 再做一个 memory bank；只在 LoCoMo/LongMemEval 提高 QA | lifecycle counterfactual、跨层撤权、身份与授权、行动后果、repair |
| M-PHY | wearable representation、health insight、纵向预测、多模态对齐 | 再预训练一个通用 sensor encoder | informative missingness、主动感知、设备/佩戴 provenance、急性–慢性冲突、derived deletion |
| P-AI | trigger、主动检索、澄清、隐藏意图、长程协助 | act/silent F1；只预测“是否帮助” | 多动作策略、机会窗口、反事实增量价值、撤回/修正、长期打扰与信任 |
| P-PHY | JITAI、receptivity、availability、MRT、wearable intervention | 用 observation/prediction 代替 causal effect | need–receptivity–feasibility–effect 拆分、闭环混杂、withdrawal、剂量与 habituation |
| U-AI | persona、历史检索、个性化生成、长期偏好、个性化 policy | 明示 persona 或单用户静态 profile | 多身份/多角色冲突、反馈原因、修正债务、共适应、memory-vs-policy 归因 |
| U-PHY | 跨用户泛化、few-shot/on-device adaptation、个体健康预测 | 只报告 adaptation 后平均 F1/AUROC | drift source attribution、负迁移、异质介入效应、依从性漂移、安全冷启动 |

### 1.2 论文正在从组件能力转向闭环 Agent，但仍缺生命周期评测

近年的 benchmark 已经明显推进：

- `LoCoMo`、`LongMemEval` 从短对话扩展到跨 session QA、时间推理、更新与 abstention；
- `MemoryArena` 把记忆和后续行动耦合；`LongMemEval-V2` 开始测环境经验；
- `ProactiveBench`、`ProCIS`、`ProEvent`、`π-Bench`、`ProAgentBench`、`PROBE` 从单轮 trigger 扩展到事件、工作流、隐藏意图和真实连续行为；
- `AgentAbstain` 用 act/abstain 配对任务证明 task completion 与“不该行动时不行动”并不等价；
- `LSM-2`、`GLOBEM`、wearable foundation models 开始处理真实缺失和跨年/跨用户泛化；
- `LaMP`、`LongLaMP`、`AI PERSONA`、`RealPref` 把 personalization 从显式 persona 推向历史与长期偏好。

但 `STALE`、`MemTX`、`MemTxn`、`GateMem` 与 commit-time authorization 已经开始直接占据 validity、transaction、governance 和 durable-effect authorization。由此，六条线可以共享的上位空白必须进一步收窄为：**state transition 的完整轨迹、责任边界，以及 benign revoke/repair 之后的 residual influence**，而不能再泛称“生命周期尚未研究”。

### 1.3 “论文依据”不等于“论文已经替我们证明了问题”

本图使用三类依据：

- `direct coverage`：论文直接定义了该任务或 benchmark；
- `pressure`：论文覆盖了邻近切口，使原 idea 必须收窄；
- `inference`：多个论文共同遗漏某个变量，由本项目推导出可测问题。

只有前两类能作为 related work 事实；第三类必须经过系统检索和 cheap probe，不能直接写成 novelty claim。

### 1.4 Cluster 审计字段

每个 cluster 后续不只按关键词归类，还必须写清：

| 字段 | 含义 |
| --- | --- |
| `estimand` | 真正想估计的量，例如 retrieval accuracy、policy value、causal excursion effect、residual influence |
| `evaluation_unit` | turn、event、trajectory、user-month、device episode 或 intervention decision point |
| `intervention/operator` | read/write/commit/revoke、ask/sense/wait/act、adapt/rollback 等可控动作 |
| `failure_type` | state、policy、authority、causal、identity、governance 或 residual failure |
| `nearest_pressure` | 最近且最可能覆盖该变量的论文/benchmark |
| `novelty_pressure_checked_at` | 最近一次检索日期；不是 novelty 证明 |

本轮所有 cluster 的 novelty pressure 检查时间为 `2026-07-31`。下一轮 overlap matrix 必须逐项比较 evaluation unit、intervention、counterfactual、metric 与 blind spot，不能只比较标题相似度。

## 2. M-AI：AI Memory

### MA-1 存储、组织与运行时管理

代表论文：`Generative Agents`、`MemoryBank`、`MemGPT`、`Mem0`、`A-MEM`、`Zep`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 记忆写入、压缩、层级、图结构、动态链接、检索成本 | QA、recall、LLM judge、latency、token cost | 长历史压缩与动态组织具有明确系统价值 | 同一事实的 authority、purpose、expiry、revocation、derived dependency 和 action risk |

Idea leaves：

- `[E]` 同预算下比较 raw history、summary、temporal graph、event hierarchy，而不是让结构方法使用更多 token；
- `[E]` 评测“回答充分”与“行动充分”是否一致；
- `[M]` 将 validity interval、来源、purpose 与 action risk 作为 memory admission 条件；
- `[S]` 比较显式 memory、cache、summary、skill 与 parametric memory 的可回滚性。

### MA-2 长期 recall、更新与 abstention benchmark

代表论文：`LoCoMo`、`LongMemEval`、`LongMemEval-V2`、`MemoryArena`、`PM-Bench`、`STALE`、`PersistBench`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨 session recall、时间推理、知识更新、环境经验、未来 cue | exact/LLM-judge QA、evidence retrieval、task success | 从静态聊天推进到经验与行动 | 等价历史下的 lifecycle 差异、撤销残留、修复成本、责任归因 |

Idea leaves：

- `[E]` history-equivalent / lifecycle-different paired trajectories；
- `[E]` cancel、expire、delete、restore、revive 的状态机 benchmark；
- `[E]` 同一 memory QA 正确但工具行动错误的 consequence slice；
- `[E]` 将“正确 abstain”拆成不知道、无权、过期、身份不明、行动不可逆五类。

### MA-3 记忆–环境–行动闭环

代表论文：`MemoryArena`、`LongMemEval-V2`、`ProactAgent`、`MUSE-Autoskill`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从历史轨迹学习 workflow、gotcha、skill，并用于后续任务 | task success、context quality、trajectory reuse | 记忆不再只是聊天 QA | 环境或工具发生变化后，旧经验何时应失效；错误行动后谁负责修复 |

Idea leaves：

- `[E]` environment drift 下旧 runbook 的失效检测；
- `[M]` memory sufficiency 与 tool verification 的联合策略；
- `[E]` writer → memory → retrieval → reasoning → policy → tool 的 blame matrix；
- `[S]` 失败 skill 的 quarantine、rollback 与再启用协议。

### MA-4 主动获取、meta-memory 与 parametric memory

代表论文：`MetaMem`、`ATRBench`、`TMEM`、`SAGER`、`Proactive Memory Agent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 何时问、何时存、如何学习使用记忆、如何把经验写入参数/skill | downstream success、preference recall、token cost | memory acquisition 与 use 开始被建模成策略 | 询问负担、未来价值不确定性、跨层撤销、错误写入的累积债务 |

Idea leaves：

- `[M]` ask-now/use-later 的 value-of-information，在未来任务不一定到来时计入提问成本；
- `[E]` explicit memory 与 LoRA/skill 同时写入后的 selective rollback；
- `[E]` acquisition debt：过早询问、重复询问与错误推断的长期代价；
- `[M]` 在 action risk 高时主动 verify，在低风险时允许 provisional memory。

### MA-5 安全、授权、共享与 repair

代表论文：`Hidden in Memory`、`MPBench`、`MemSecBench`、`MemTX`、`MemTxn`、`GateMem`、`Commit-Time Authorization`、`Origin-bound Authority`、`MemGate`、`AgentLeak`、`Collaborative Memory`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| poison persistence、transactional update、commit-time authority、共享治理、搜索 gate、泄漏与 selective repair | attack success、leakage、commit validity、repair、benign retention | malicious lifecycle、transaction 与 authority 已有快速增长的 benchmark | benign 用户撤权后的跨层 residue、责任归因、家庭/委托关系与 purpose change |

Idea leaves：

- `[G]` benign revocation propagation：source、index、summary、cache、prompt、parametric layer；
- `[G]` household/delegate memory 的 identity-bound authority；
- `[E]` repair quality = harmful influence removal + benign utility preservation + explanation correctness；
- `[E]` provenance laundering path 与最小责任切断点；
- `[S]` 删除原始记录后，派生 profile、embedding、summary 与行动日志的依赖级联。

## 3. M-PHY：Physiological / Behavioral Memory

### MP-1 Wearable representation 与 foundation model

代表论文：`NormWear`、`PaPaGei`、`MOMENT`、`OpenMHC`、`Wearable Behavior FM`、`Wearable Health General Intelligence`、`AURA-MFM`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨 modality、任务、设备与人群的通用表示 | AUROC/F1/RMSE、linear probe、zero/few-shot | population-scale representation 已非常强 | longitudinal decision sufficiency、个体有效期、来源与佩戴变化、行动后果 |

Idea leaves：

- `[E]` equal-compute/equal-token 的多时间尺度生理记忆；
- `[E]` representation quality 与 downstream decision regret 的解耦；
- `[M]` event、routine、baseline、exception 四层 memory 的动态预算；
- `[E]` acute evidence 与 chronic baseline 冲突时的 calibrated abstention。

### MP-2 Wearable-to-language 与 health insight agent

代表论文：`PH-LLM`、`PHIA`、`PhysioLLM`、`WAG`、`VitalAgent`、`AwareLLM`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 时间序列解释、健康问答、个性化 insight、工具推理、主动监测 | expert rubric、QA accuracy、user study、prediction | 语言接口与工具分析可行 | 解释是否来自有效时段、错误 insight 如何撤回、建议是否带来增量价值 |

Idea leaves：

- `[E]` explanation provenance：每个结论可追溯到设备、窗口、质量与版本；
- `[E]` stale insight challenge：设备/药物/作息改变后旧结论是否仍被复用；
- `[H]` insight correction UX：修正、撤回与原因解释是否恢复信任；
- `[E]` 同一统计事实在不同健康目标下是否应产生不同 memory/action。

### MP-3 缺失、噪声与主动感知

代表论文：`LSM-2`、`OpenMHC`、`ProAgent`、`HabitSense`，以及 informative-missingness 文献。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 不完整 wearable 流、mask-aware representation、低成本常开与高成本按需感知 | masking robustness、downstream accuracy、energy/privacy | “缺失不是简单插值问题”已有直接方法压力 | 缺失原因、策略诱导缺失、ask/sense/wait 的联合价值与隐私成本 |

Idea leaves：

- `[E]` 自然缺失、设备故障、佩戴中断、用户拒绝、policy-induced missingness 的可辨性；
- `[M]` ask / sense / wait / abstain 四动作 active acquisition；
- `[E]` MNAR 下 uncertainty calibration 与 action regret，而不只看 imputation error；
- `[H]` 感知预算同时计入电量、隐私、社交成本与用户负担。

### MP-4 纵向、多时间尺度与变化

代表论文：`VitalAgent`、`GLOBEM`、`PH-LLM`、`Post-intervention Response`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 多日/多年行为、近期状态与长期基线、介入后轨迹 | cross-year generalization、forecasting、PRO prediction | 长期数据和多尺度预测开始出现 | memory lifecycle、事件边界、干预造成的状态变化与反事实 |

Idea leaves：

- `[E]` event-boundary vs fixed-window vs learned hierarchy 的等预算比较；
- `[E]` 介入前后 memory 是否错误地把 treatment effect 当成自然 baseline；
- `[M]` 按 decision sufficiency 压缩，而不是按 reconstruction fidelity 压缩；
- `[E]` 长期 baseline 被急性异常污染后的恢复速度。

### MP-5 设备、佩戴位置与治理 provenance

代表论文：`PaPaGei`、consumer-wearable stress reproducibility、`On-device Few-shot HAR`、`Collaborative Memory`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨设备、跨人、跨数据集泛化与隐私 | cross-device AUROC、LOSO、adaptation gain | 硬件/人群差异会破坏泛化已有证据 | provenance 是否进入 memory validity；derived physiological memory 如何删除 |

Idea leaves：

- `[E]` device/firmware/placement swap 后的 selective invalidation；
- `[G]` raw signal、feature、event、profile、recommendation 五层删除语义；
- `[M]` provenance-conditioned retrieval 与 uncertainty；
- `[E]` 设备变化和真实生理变化的 paired attribution benchmark。

## 4. P-AI：Proactive Agent

### PA-1 Trigger、主动检索与内容生成

代表论文：`ProactiveBench`、`ProCIS`、`TGL Trigger`、`Proactive Memory Agent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 是否触发、检索什么、何时插入建议 | F1/AUC、npDCG、accept/reject、content quality | act/silent 与主动 retrieval 已有公开 benchmark | 多动作后果、不可逆风险、等待/准备/撤回、用户长期效用 |

Idea leaves：

- `[E]` 从 binary trigger 扩展到 action lattice；
- `[M]` risk-conditioned action granularity：建议与执行使用不同门槛；
- `[E]` 触发正确但内容/渠道/工具动作错误的责任拆分；
- `[S]` always-on 小模型、事件图与 LLM 的成本–隐私–召回 Pareto。

### PA-2 长程事件、隐藏意图与连续工作流

代表论文：`ProEvent`、`π-Bench`、`ProAgentBench`、`PM-Bench`、`PROBE`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 事件追踪、跨 session 隐藏意图、真实工作流、主动发现 bottleneck | timing/correctness、task success、pipeline success | proactivity 已从单轮扩到长期 | 事件取消后的 repair、多个潜在需求的优先级、长期信任与 habituation |

Idea leaves：

- `[E]` concurrent event conflict 与有限 intervention budget；
- `[E]` event cancellation 后 reminder/tool side effect 的传播与撤回；
- `[M]` hidden intent 的 verify-before-act 策略；
- `[E]` 未发现、发现未行动、错误行动、过度行动四类 end-to-end regret。

### PA-3 主动提问与信息获取

代表论文：`Ask-before-Plan`、`ATRBench`、`Uncertainty of Thoughts`、`PAHF`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 澄清需求、询问未来可复用偏好、降低不确定性 | task success、question efficiency、future utility | ask 已是一等 action | 询问负担、错误身份、何时延迟询问、sense 与 ask 的替代关系 |

Idea leaves：

- `[M]` clarification value under user burden and task arrival uncertainty；
- `[E]` ask-now、ask-later、infer、default、abstain 的 matched trajectories；
- `[E]` 对共享账户/家庭成员提问时的 identity attribution；
- `[M]` 低风险先准备、高风险再确认的 staged assistance。

### PA-4 结构化行动、并行执行与主动问题解决

代表论文：`ProAct-75`、`PROBE`、`ProAct`、`ContextAgent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| task graph、并行 action、问题发现、环境感知 | saved steps、parallelism、end-to-end success | “主动”不再只是说一句建议 | side effect、partial completion、escalation、rollback、tool failure |

Idea leaves：

- `[E]` tool-failure-aware escalation 与 fallback ordering；
- `[S]` proactive prepare 但不 commit 的 reversible staging；
- `[E]` partial-order plan 中的过早 action 与 timing regret；
- `[M]` 依据 reversibility 选择 suggest、prepare 或 execute。

### PA-5 Abstention、timing 与 post-action repair

代表论文：`AgentAbstain`、`ProactiveVideoQA`、`ProEvent`、`ProMemAssist`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 不该行动时 abstain、响应时间、打扰成本、取消事件 | paired accuracy、PAUC、timing correctness | abstention 与 timing 已有直接 benchmark | consequence-aware timing、行动后的 retract/correct、用户是否已据此行动 |

Idea leaves：

- `[E]` timing regret = early harm + late missed value + repeated burden；
- `[E]` post-hoc abstention、retraction、correction、compensation 的分层评测；
- `[S]` 对已发消息、已建日程、已调用工具使用不同 repair protocol；
- `[H]` habituation、dismissal、trust erosion 的多周 trajectory benchmark。

## 5. P-PHY：Physiological Proactivity

### PP-1 JITAI 的问题定义

代表论文：`JITAI pragmatic framework`、`JITAI design principles`、`HeartSteps`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| decision point、tailoring variable、intervention option、decision rule、proximal/distal outcome | availability、proximal outcome、burden | 何时/给谁/给什么已有成熟定义 | LLM/agent 论文常把多个构念压成 acceptance 或 response prediction |

Idea leaves：

- `[A]` need、receptivity、feasibility、effect 四构念 audit；
- `[E]` 同一时刻四构念互相冲突的 matched cases；
- `[E]` “不干预”不仅是 negative class，而是明确 intervention option；
- `[H]` 用户目标、临床目标与即时舒适目标冲突时的协商。

### PP-2 Micro-randomized trial 与 causal excursion effect

代表论文：`MRT Methods`、`HeartSteps`、`HeartSteps II`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 重复随机化、时变 treatment effect、moderator、近端结果 | causal excursion effect、WCLS、effect moderation | intervention effect 可被因果识别 | 多数公开 Agent 数据没有 assignment、propensity、availability 或 counterfactual outcome |

Idea leaves：

- `[C]` 现有 JITAI/Agent dataset 的 causal-identifiability audit；
- `[E]` prediction ranking 与 true policy-value ranking 的反转模拟；
- `[C]` proximal benefit、distal benefit、burden 与 habituation 的 estimand separation；
- `[E]` observational replay 与 MRT ground truth 的偏差地图。

### PP-3 Need、receptivity、availability 与 feasibility

代表论文：`Mental Health Receptivity`、`Opportune Smart Speaker`、`ContextAgent`、`Smartwatch JITAI`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 是否需要、是否可接收、上下文是否允许、是否会响应 | acceptance、self-report、context classifier | 构念开始被部分区分 | 它们与真实 treatment effect 仍经常混合；社会情境与安全约束不足 |

Idea leaves：

- `[E]` high-need/low-receptivity、low-need/high-receptivity 等四象限；
- `[M]` wait、switch modality、ask、escalate 而非直接 silence；
- `[H]` social presence、privacy 与 urgency 的 delivery policy；
- `[E]` acceptance 高但 effect 为零或负的 proxy failure。

### PP-4 主动感知、时延与机会窗口

代表论文：`ProAgent`、`PULSE`、`SigmaScheduling`、`HabitSense`、`ProMemAssist`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 何时追加感知、何时安排 decision point、帮助与打扰权衡 | sensing accuracy、latency、uncertainty、timing | 传感与时机都已成为 policy | sensing 本身改变观察、隐私、耗电与用户行为；状态可能在决策前已消失 |

Idea leaves：

- `[M]` ask/sense/wait/act 联合策略；
- `[E]` sensor-to-action delay 与状态半衰期 benchmark；
- `[E]` state-resolved withdrawal：触发后、送达前状态已恢复；
- `[C]` policy-induced observation/missingness 的闭环模拟。

### PP-5 介入响应、剂量、withdrawal 与 habituation

代表论文：`Post-intervention Response`、`HeartSteps`、`WatchGuardian`、`Last JITAI`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 介入后短期轨迹、行为改变、个体化消息 | forecast、step count、human rating、adherence | response prediction 与部署均有先例 | 预测不等于 effect；重复介入会改变效果、依从性和传感数据 |

Idea leaves：

- `[C]` response forecast 与 individualized treatment effect 的差异；
- `[M]` dose-aware policy：频率、强度、渠道、冷却时间；
- `[E]` intervention-induced adherence drift；
- `[H]` withdraw/correct 后的用户理解与恢复。

## 6. U-AI：AI Personalization

### UA-1 显式 persona 与个性化响应

代表论文：`PersonaFeedback`、`PersoBench`、`PersonaMem`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 给定 persona 时能否生成一致、个性化响应 | pairwise preference、LLM judge、fluency/coherence | persona-conditioned generation 已很拥挤 | persona 是否属于当前用户/角色/目标，冲突时如何处理 |

Idea leaves：

- `[E]` 正确 persona、错误身份 persona、过期 persona、冲突 persona 的 matched pairs；
- `[E]` personalized but task-wrong 与 task-correct but depersonalized 的二维评测；
- `[M]` role/context conditioned persona admission；
- `[H]` 向用户解释用了哪条偏好以及如何关闭。

### UA-2 历史检索与个性化生成

代表论文：`LaMP`、`LongLaMP`、`PerMemBench`、`RPEval`、`BenchPreS`、`Persona2Web`、`Mem0`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从用户历史检索相关信息，生成短/长文本，决定何时不用个性化 | ROUGE、generation quality、memory value、rationality | retrieval-based personalization 基线成熟 | 历史之间冲突、feedback cause、纠正后的残余影响 |

Idea leaves：

- `[E]` role × context × time preference conflict；
- `[E]` latest-valid、role-filter、ask-user 三类 killer baseline；
- `[E]` irrelevant memory 不只损害回答，还可能改变工具 action；
- `[M]` conflict-aware retrieval 返回 preference set 与不确定性，而非单条 profile。

### UA-3 Lifelong、动态偏好与多模态 persona

代表论文：`AI PERSONA`、`RealPref`、`HorizonBench`、`PERMA`、`PAHF`、`PersonaVLM`、`SAGER`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 偏好长期变化、跨 session 跟随、多模态 memory、持续 policy skill | long-context preference following、persona shift、benchmark score | 动态 personalization 已成为显式任务 | 变化原因、agent 诱导变化、错误适配的 rollback 与责任 |

Idea leaves：

- `[E]` preference drift vs context switch vs identity switch attribution；
- `[E]` agent 建议导致的 performative preference change；
- `[M]` cautious update：stable value、temporary goal、experiment 三层；
- `[S]` user-specific policy skill 的 versioning 与 rollback。

### UA-4 个性化 alignment、adapter 与 policy

代表论文：`Personalized Soups`、`SAGER`、`TMEM`、`PerCE`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 参数合并、token-level personalization、用户 policy/adapter | preference score、task metrics、transfer | personalization 不只发生在 prompt/memory | memory、prompt、adapter、policy 的独立贡献与撤销困难 |

Idea leaves：

- `[A]` memory personalization vs policy personalization 的责任分解；
- `[E]` 同一 correction 在四层分别更新的差异；
- `[S]` shared base + private reversible adapter + explicit memory 的最小架构；
- `[E]` 参数个性化的 overgeneralization 与 cross-task contamination。

### UA-5 主动获取、澄清与 feedback

代表论文：`ATRBench`、`Ask-before-Plan`、`PAHF`、`PPP`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 主动询问偏好、行动前澄清、行动后反馈 | future task success、clarification quality、online adaptation | personalization acquisition 已开始被单独测量 | 反馈究竟纠正 memory、推理、policy、style 还是 tool；重复修正债务 |

Idea leaves：

- `[E]` feedback-cause matched pairs；
- `[E]` correction debt：修一次后在不同上下文再次犯错；
- `[M]` value-of-clarification under question budget；
- `[H]` 用户可撤销自己的 correction，并查看影响范围。

### UA-6 多身份、多角色与协商

代表论文：`Collaborative Memory`、`Multi-Agent Memory`；现有个性化 benchmark 多以单一用户为默认。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 共享 memory、权限、单用户 profile | access control、personalized output | shared memory architecture 有早期工作 | household/team/delegate identity attribution 与 preference arbitration 缺统一评测 |

Idea leaves：

- `[E]` shared device 上 speaker/owner/beneficiary 的身份边界；
- `[G]` owner、delegate、subject、observer 的 authority matrix；
- `[M]` 冲突偏好下 ask、negotiate、role-default、abstain 策略；
- `[E]` identity 错误造成的 privacy、utility 与 action harm 三重指标。

## 7. U-PHY：Physiological Personalization

### UP-1 Population representation 与个体差异

代表论文：`NormWear`、`PaPaGei`、`Wearable Health General Intelligence`、large-scale wearable SSL。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从大规模人群学习可迁移表示 | LOSO、linear probe、few-shot、cross-dataset | population prior 很强 | 何时 population prior 对个体有害；什么变化值得更新 |

Idea leaves：

- `[E]` average gain 掩盖的 per-user harm / negative transfer；
- `[M]` uncertainty-aware support-user selection；
- `[E]` demographic similarity、behavior similarity、causal similarity 的比较；
- `[M]` 无法安全迁移时的 abstention 与人工校准。

### UP-2 Few-shot、无监督与 on-device adaptation

代表论文：`On-device Few-shot HAR`、`Uncertainty-aware Few-shot HAR`、personalized federated learning。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 少量标注/无标注校准、轻量设备端更新 | macro-F1、adaptation gain、compute/memory | 快速适配方法成熟度上升 | shift 来源、错误 pseudo-label、更新后退化、可撤销性 |

Idea leaves：

- `[E]` physiology、device、placement、context、label、policy 六类 shift attribution；
- `[M]` 只更新 classifier、prototype、normalization 或 memory 的 selective adaptation；
- `[E]` adaptation 后 calibration、worst-user 与 rollback 指标；
- `[S]` on-device update 的 energy、privacy 与 reproducibility contract。

### UP-3 多年 generalization 与真实部署漂移

代表论文：`GLOBEM`、consumer-wearable stress reproducibility、`Personalized Stress Monitoring`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨年、跨 cohort、跨设备、自由生活环境 | cross-year/cross-dataset AUROC、LOSO | 真实泛化下降已有直接证据 | 下降究竟来自生理、行为、设备、label 或干预；适配何时反而有害 |

Idea leaves：

- `[E]` drift-type injection harness + real metadata validation；
- `[E]` change detection、cause attribution、update choice、recovery 四阶段分开评测；
- `[M]` drift posterior 驱动不同 adaptation operator；
- `[E]` 无 ground-truth shift metadata 时只允许 diagnosis，不做真实 attribution claim。

### UP-4 个体 health insight 与行为预测

代表论文：`PH-LLM`、`PHIA`、`PhysioLLM`、`Personalized Digital Health Modeling`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 个体睡眠/运动/压力 insight、support-user transfer | expert rubric、RMSE/AUROC、user study | 个体化输出和少样本建模可行 | 个性化是否真正增益、错误原因、跨目标冲突、纠正后恢复 |

Idea leaves：

- `[E]` personalized gain decomposition：better sensing、better representation、better memory、better policy；
- `[E]` 同一生理状态下不同用户目标的 recommendation conflict；
- `[M]` personalized uncertainty 与 safe recommendation strength；
- `[H]` correction 对未来 insight 的持久影响与可见性。

### UP-5 异质介入效应与 agent-induced drift

代表论文：`MRT Methods`、`HeartSteps`、`Post-intervention Response`、heterogeneous treatment-effect literature。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 对谁、何时、哪种 intervention 有效；介入后轨迹 | CATE/causal excursion、response forecasting | heterogeneity 与 response prediction 都有工具 | 两者常被混淆；agent 会改变依从性、缺失和未来数据分布 |

Idea leaves：

- `[C]` response prediction vs treatment effect 的 benchmark split；
- `[C]` person × context × dose 的 heterogeneous causal effect；
- `[E]` agent-induced adherence drift 与 missingness；
- `[M]` uncertainty-aware personalized intervention with no-treatment fallback。

### UP-6 安全冷启动、隐私与删除

代表论文：on-device adaptation、federated HAR privacy、wearable provenance 文献。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 少数据启动、本地训练、跨用户共享 | few-shot gain、membership leakage、resource cost | 部分系统约束有研究 | 何时请求标签、如何撤销派生模型、个体失败是否被平均指标遮蔽 |

Idea leaves：

- `[M]` label/sense/abstain 的 calibration budget；
- `[G]` 删除某用户数据后 prototype、adapter、federated contribution 的撤销；
- `[E]` cold-start risk–coverage 与 worst-user guarantee；
- `[S]` 设备端 adaptation 的可验证版本、回滚与审计日志。

## 8. Idea Forest：从论文簇长成研究树

下面的树是生成器，不是 approved backlog。叶子只有在写清 failure、counterfactual、killer baseline、资源上限和 kill rule 后，才进入 `PROBLEM_BACKLOG.md`。

```text
Long-lived Agent under change
├── M-AI: memory lifecycle and authority
│   ├── representation → equal-budget structure → decision sufficiency
│   ├── lifecycle → update / supersede / expire / revoke / delete / restore / revive
│   ├── authority → source / purpose / identity / action risk
│   ├── action coupling → memory QA / tool action / consequence / blame
│   └── repair → purge / selective retention / rollback / explanation / residual influence
├── M-PHY: longitudinal physiological memory
│   ├── timescale → event / routine / baseline / exception
│   ├── observability → noisy / delayed / missing / MNAR / contradictory
│   ├── acquisition → ask / sense / wait / abstain
│   ├── provenance → device / placement / firmware / person / intervention
│   └── governance → raw / feature / summary / profile / derived decision deletion
├── P-AI: proactive decision policy
│   ├── action lattice → watch / wait / ask / retrieve / prepare / suggest / execute
│   ├── timing → early / on-time / late / repeated / missed window
│   ├── value → benefit / burden / side effect / no-action outcome
│   ├── repair → withdraw / retract / correct / compensate / escalate
│   └── longitudinal HAI → habituation / dismissal / trust / user adaptation
├── P-PHY: closed-loop intervention
│   ├── constructs → need / receptivity / feasibility / effect
│   ├── causal design → assignment / availability / propensity / proximal / distal
│   ├── sensing loop → measurement cost / policy-induced missingness / privacy
│   ├── dynamics → sensor delay / state half-life / withdrawal / dose
│   └── delivery → visual / audio / haptic / ambient / social context
├── U-AI: negotiated personalization
│   ├── identity → owner / speaker / subject / delegate / beneficiary
│   ├── preference → role / context / time / goal / stable value
│   ├── acquisition → infer / ask now / ask later / default / abstain
│   ├── correction → memory / reasoning / policy / style / tool / interface
│   └── co-adaptation → user change / performativity / exploration / rollback
└── U-PHY: safe individualized adaptation
    ├── drift source → physiology / device / context / label / policy / adherence
    ├── update operator → prototype / head / norm / adapter / memory / no update
    ├── heterogeneity → responder / context / dose / outcome / uncertainty
    ├── cold start → support users / labels / active calibration / abstention
    └── deployment → on-device / privacy / energy / deletion / rollback
```

### 8.1 本轮压缩后的 24 个一阶叶子

这些叶子不是 24 篇已立项论文，而是下一轮可以继续分叉的最小问题族：

| Branch | Leaves |
| --- | --- |
| M-AI | L1 lifecycle equivalence；L2 lifecycle state machine；L3 abstention-type decomposition；L4 residual influence after benign revocation |
| M-PHY | L5 missingness cause → action；L6 policy-induced missingness；L7 decision-aware imputation；L8 privacy-cost sensing |
| P-AI | L9 action-lattice policy；L10 consequence-aware timing；L11 irreversible-action repair；L12 repeated-assistance trust erosion |
| P-PHY | L13 proxy-vs-policy ranking；L14 construct conflict；L15 sensing-loop policy；L16 state-resolved withdrawal timing |
| U-AI | L17 role/context conflict；L18 feedback-cause routing；L19 update-layer attribution；L20 performative preference drift |
| U-PHY | L21 drift attribution → operator；L22 safe cold start；L23 negative-transfer prediction；L24 response prediction vs treatment effect |

每个一阶叶子还可按 dataset、identity、action reversibility、consequence horizon、responsibility target 和 resource budget 继续分叉，因此不会把六个方向压成六篇论文。

理论组合数很大，但每篇论文不需要覆盖整棵树。一个可执行 idea 通常只取：

```text
1 branch
+ 1 literature cluster
+ 1 omitted state variable
+ 1 non-default action
+ 1 counterfactual
+ 1 consequence horizon
+ 1 responsibility target
```

示例：

- `P-AI + event tracking + cancellation + retract + no-retract counterfactual + downstream tool side effect + policy/interface responsibility`；
- `M-PHY + missingness + user refusal + ask/wait/sense + fixed-imputation counterfactual + decision regret + sensing-policy responsibility`；
- `U-AI + lifelong preference + role switch + clarify/abstain + latest-preference counterfactual + correction debt + memory/policy responsibility`。

## 9. 高价值交叉，但不强制合并论文

| Intersection | 可形成的独立问题 |
| --- | --- |
| M-AI × P-AI | 被撤销或取消的记忆已经触发提醒/工具动作后，如何传播 repair |
| M-PHY × P-PHY | 主动感知是否值得，以及 sensing 如何改变未来 observation 与 intervention |
| U-AI × P-AI | 什么时候主动询问未来偏好，什么时候默认、等待或放弃 |
| U-PHY × P-PHY | 介入造成的状态/依从性变化，是否被误判成需要个体适配的自然 drift |
| M-AI × U-AI | 多用户 memory 的 identity、authority 与 preference conflict |
| M-PHY × U-PHY | 设备/佩戴变化与真实个体生理变化的因果归因 |

这些 intersection 可以共享 evaluator、prompt、schema 或工具；不要求共享模型实现，也不要求合成一篇“超级 Agent”论文。

## 10. 对当前核心候选的二轮修正

| Candidate | 新论文压力 | 二轮决定 |
| --- | --- | --- |
| C01 Lifecycle Counterfactual | LongMemEval 已含 update，MemoryArena 已耦合行动，MemSecBench 已有恶意 Write–Execute–Forget | 保留，但限定 benign lifecycle、history-equivalent pairing、action consequence 与 responsibility |
| C02 Action-Conditioned Authority | MemTX、Origin-bound Authority、MemGate、Commit-Time Authorization 已覆盖 update/authority/gate 的强邻域 | broad framing 终止；只对 action-risk-specific、benign delegation 或 responsibility 的残余变量分叉 |
| C03 Revocation Propagation | MemSecBench、MemTX/MemTxn、GateMem 已覆盖 repair、transaction 与 active forgetting | 保留收窄后的 cheap probe；只测 benign user revocation 的 cross-layer residual influence |
| C04 Household Identity Boundary | GateMem 与 Collaborative Memory 已进入 multi-principal/shared memory | 保留 overlap audit；必须证明 owner/delegate/subject/beneficiary 角色矩阵带来独立 failure |
| C08 Missingness + Active Sensing | LSM-2 与 OpenMHC 直接覆盖 incomplete representation/imputation | generic missingness 终止；只保留 cause attribution → ask/sense/wait → downstream consequence/regret |
| C13 Multi-Action Deferral | AgentAbstain、Ask-before-Plan、ATRBench 已覆盖 abstain/ask | 保留；贡献必须是完整 action lattice 与 consequence-sensitive policy，不是多加一个 abstain label |
| C14 Timing Regret | ProactiveVideoQA、ProEvent、ProAgentBench 已直接评 timing | broad standalone candidate 终止；作为 C13/C15 的 consequence-aware opportunity-window slice |
| C15 Retraction/Correction | ProEvent 有 cancellation，MemSecBench/MemTX 有 repair，AgentAbstain 有 post-hoc failure | broad standalone candidate 终止；只作为不可逆 tool action 的 repair/residual slice |
| C23 Closed-Loop Confounding | JITAI/MRT 已提供成熟 causal language | 保留 diagnosis；只用 synthetic SCM 证明 proxy/ranking reversal，不冒充真实 treatment effect |
| C25 Preference Conflict | RealPref、HorizonBench、PERMA、BenchPreS、Persona2Web 已覆盖长期演化、context selectivity 与 personalized action | 继续分叉；只保留 conflict-cause attribution、negotiation、update-layer choice 与 rollback |
| C28 Feedback Ambiguity | PAHF/ATRBench 已覆盖获取 feedback，但没有直接等同于 feedback-cause routing | 当前最清晰的 U-AI opportunity；先冻结 matched-pair schema，再检验 simple router |
| C31 Drift Attribution | GLOBEM、跨设备复现与 few-shot HAR 都证实 shift/adaptation 压力 | 保留 data gate；贡献点必须是 source attribution → operator choice，而非再报告 adaptation gain |

## 11. 下一步审计顺序

1. 对 C02/C03/C15、C08、C25 做 paper-by-paper overlap matrix；C14 不再作为独立候选；
2. 对每个 cluster 选一个 benchmark、一个 strongest simple baseline、一个真实或可控 counterfactual；
3. 只有 overlap 后仍有独立 evaluation variable 的叶子，才建 candidate；
4. 先做 evaluator/paired generator/causal simulator；只有方法存在 headroom 才训练；
5. 新论文继续写入 source ledger，不在本文件追加逐篇摘要。

## 12. 当前整体判断（迁自执行看板）

以下 12 条是二轮 paper/evaluation audit 得到的跨方向研究判断，原记于 `CURRENT.md`。为使执行看板专注于动态卡片状态，判断本身迁入本文件（论文簇判断的正主）。它们与 §1「二轮 review 的总判断」及 §10「对当前核心候选的二轮修正」同源、互相呼应，不构成 novelty 证明或实验结果。

1. **真正的研究对象不是三个孤立组件，而是变化环境中的长期 Agent。** Memory、Proactive、Personalization 更像三个操纵面；3×2 继续承担资产索引，不限制 discovery。
2. **现有组件指标与真实 Agent 价值之间存在系统性错位。** retrieval recall、memory QA、trigger F1、acceptance、personalized gain 和 outcome prediction 都看不到 no-action counterfactual、长期累积代价或责任归因。
3. **Memory 的白空间已被新论文进一步压缩。** STALE、MemTX、MemTxn、GateMem 与 commit-time authorization 已直接进入 validity、transaction、governance 和 authority；现在更强的残余问题是 benign revocation 后的跨层 residual influence、责任归因与多主体角色边界。
4. **Proactive 不应继续只是 act/silent 二分类。** wait、ask、prepare、withdraw、correct、timing regret 与行动后的 repair 构成一组独立 failure family。
5. **Personalization 的核心压力从“是否使用用户信息”转向冲突与修正。** role/context/time preference conflict、feedback ambiguity、correction debt 和 policy-induced user change 更有独立性。
6. **生理/行为方向的价值来自特殊评测压力，不是换数据集。** missingness/MNAR、active sensing、drift attribution、closed-loop confounding、干预后状态变化和 derived-data deletion 是当前最重要的切口。
7. **Evaluation 本身可以是论文主贡献。** 前提是它改变方法/policy 排名、暴露重要而不可观察的 failure，或修正 causal/decision estimand；仅增加题量不够。
8. **2026 年的 Memory/Proactive benchmark 已快速占据“从组件到行动”的中间层。** MemoryArena、LongMemEval-V2、ProEvent、π-Bench、ProAgentBench 和 AgentAbstain 使“长期”“主动”“不行动”本身不再足以构成 novelty。
9. **几个原 core idea 必须收窄或降级。** C08 的 generic missingness 版本被 LSM-2/OpenMHC 压缩，只保留 cause→action→regret；C14 的独立 timing benchmark 与 C15 的泛化 repair benchmark 不再单独推进，改为 C13/不可逆行动评测中的 nested slice。
10. **P-PHY 必须使用 JITAI/MRT 的成熟因果语言。** need、receptivity、feasibility、response prediction 与 treatment effect 不是同一变量；没有 assignment、availability、propensity 与 outcome 时不做 causal claim。
11. **U-AI/U-PHY 的更强切口是归因而非单纯适配。** HorizonBench、PERMA、BenchPreS 与 Persona2Web 已覆盖偏好演化、context selectivity 和 personalized action；下一步应问发生了哪种冲突/漂移、该更新哪一层、错误更新如何撤销。
12. **当前最值得先验证的共同变量是 state transition → responsibility → residual influence。** 它同时连接 memory revoke、proactive repair、personalization rollback 与 physiological drift attribution，但不会强制六线共享同一个模型或论文。

这些是当前 paper/evaluation audit 得到的研究判断；尚未产生本项目 empirical result。

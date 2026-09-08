# Auto Research OS — Context (Ubiquitous Language)

本文件是本项目的**唯一术语词典**。数据层、`CURRENT.md`、`dashboard/` 及任何看板都必须使用这里的词义；冲突以本文件为准。

> 一句话定位：这是一套**以 Research Judgment 为核心、以 Judgment Delta 为主要进度、以 Evidence 和 Decision 为约束、最终汇聚到多个 Paper Project 的研究操作系统**——不是"论文列表 + Idea 看板 + 实验看板"的拼盘。

冻结日期：2026-09-01

## Language

### 核心对象

**Research Program**：
整个项目研究的上位对象（变化环境中的长期 Agent）。全局唯一，ID `PROGRAM`。

**Track**：
六条研究索引线之一（M-AI / M-PHY / P-AI / P-PHY / U-AI / U-PHY）。是**资产归档索引**，不是学术 ontology。
每条 Track 可处于 `explore / validate / maintain / parked` 运营模式；模式是组合管理状态，不改变科学归属。`parked` 必须记录原因和 unlock condition。
_Avoid_: Branch（"branch" 一词保留给分叉动作，见 Split）、方向（口语可用，实体名用 Track）。

**Source Paper**：
外部的相关论文——引用、benchmark 来源、related work。ID `SRC-nnn`。它提供 `direct coverage` 或 `pressure`，**本身不是本项目的证据**。
_Avoid_: Paper（裸词禁用，必与 Paper Project 混淆）、文献。

**Source Verification / 来源核验**：
确认 Source Paper 的身份、版本与本轮实际可见范围。`full-source`、`official-assets` 与 `abstract-only` 是访问边界，不代表已经完成结构化论文审计。
_Avoid_: 用 `verification=verified` 直接表示 deeply reviewed。

**Paper Audit / 论文审计**：
在一个 Candidate 语境下对 Source Paper 做出的结构化 proof-boundary record，包含 Contribution、Insight、Goal、Data、Training、Evaluation、Assumption、直接结果、unsupported inference、Benchmark adequacy、failure condition 与 Judgment Delta。abstract-only 可以形成 scoped audit，但不计入 full-source deep-audit 目标。
_Avoid_: 论文摘要、Source Verification、related-work 链接清单。

**Literature Cluster**：
一组 Source Paper 共同解决的问题簇。ID 如 `MA-03`。
_Avoid_: 论文组。

**Gap / Failure**：
现有评测/方法看不到的失败或空白。ID `GAP-nnn`。是 Candidate 的来源。

**Research Question**：
要被研究和区分的问题，允许使用问句；必须明确 failure state、影响后果、竞争解释与区分实验。Research Question 与 Claim 不是同一句话的两个名字。

**Falsifiable Claim**：
对预期机制或现象的**陈述句**，说明在控制哪些变量后，哪些可观测量应如何变化。必须能写出反驳结果；问号结尾的文本仍是 Research Question，不能标成 Claim。

**Candidate**：
系统中的稳定研究资产 = Research Question、Candidate 类型、可证伪 Claim（若已形成）、评测与当前判断路由。ID 使用 `Cnn` 格式，实际集合从研究索引读取。Candidate 可只是 supporting/audit asset；只有通过 Problem Gates 且拥有完整判断链的 Candidate 才算正在推进的问题。
_Avoid_: Idea（口语可用，实体名禁用）、Proposal（那是 Candidate 的详情，见下）、题目。

**Proposal**：
Candidate 的**完整厚卡详情**（动机、独立 Research Question、declarative Claim、novelty、评测设计、probe、kill rule…）。它是 Candidate 的一个视图，**不单独编号、不是独立对象**。字段齐全不等于问题成立或研究成熟。
_Avoid_: 把 Proposal 当独立工作项。

**Candidate Reasoning**：
归属于 Candidate 的局部推理脊柱：`Source Paper → Assumption / proof boundary → Failure / Eval Gap → Core Problem → Competing Explanations → Cheap Probe → Idea Mechanism → Falsifiable Claim → Claim-first Evaluation → Judgment Delta`。它不是另一种工作项，也不是全局精选故事。未完成时必须为 `null / unsettled`，不得自动补写。

**Idea Type**：
Candidate 的主要研究增量类型：`problem / method / evaluation / analysis / system / application`。它回答“新贡献属于哪一类”，不代表 maturity；单纯换数据集、模态或增加模块不能自动变成新 Idea Type。

**Problem Gate**：
Research Question 进入推进面的四个硬门：`Consequence / Coverage / Claim / Execution`。分别检查真实后果、最近邻覆盖、独立可证伪性和 1–3 天区分实验。论文 limitation 原句未过四 Gate 时只算 pressure / lead。

**Review Route**：
论文与问题审计后对 Candidate 的组合建议，如 `active-question / conditional-question / supporting-slice / data-gated / park-recommended / retire-recommended`。Review Route 只表达 local verdict；`decisionState=proposed` 时不得冒充正式 Continue/Nest/Park/Kill Decision，也不得直接改 lineage。

**Research Review**：
一次有明确 scope、evidence boundary 与 Candidate 指针的本地或外部审计。Canonical 本地审计使用 `JRV-nnn`；GPT Pro 等外部评审仍使用 `REV-nnn`，且只能形成 pressure。

**Current Next Evidence**：
Candidate 当前唯一要制造的下一条可验收证据。只在 Candidate 上保存一个 canonical 字段；Proposal、Reasoning、Leader narrative 和页面只能引用，不得复制并形成不同版本。

**Experiment Spec**：
检验某 Candidate 的实验**设计**（独立变量、baseline、oracle、stop rule…）。ID `E-Cnn-mm`。一个 Candidate 可有多个 Experiment Spec。
_Avoid_: Experiment（裸词禁用，必分 Spec 与 Run）。

**Run**：
Experiment Spec 的一次**真实执行**。ID `R-E-Cnn-mm-nnn`。只有真正执行才创建。一个 Spec 可有多个 Run。
_Avoid_: 把"实验想法"或"实验设计"叫 Run。

**Run Report / 单次运行报告**：
随一个 Run 固定保存其目标、与 baseline 的变化、命令/环境、预期与实际、结果语义、失败分类、限制、可复用资产与本地 verdict。Experiment-level synthesis 不能替代 Run Report。

**Archive Receipt / 归档回执**：
证明一个 Run package 已发布到不可覆盖目标并完成 inventory 与 digest readback 的机器可读记录。批次级回执只覆盖显式列出的 Run；HDFS 命令 exit 0 不是回执本身。

**Run Closure / 运行闭环**：
Run 的五个正交维度：execution、scientific outcome、reproduction outcome、archive、Mentor settlement。`completed`、`positive`、`reproduced`、`archive-verified`、`mentor-accepted` 不能互相替代。

**Artifact**：
Run 产出的不可变证据。以 digest / URI 标识。

**Local Result**：
**只有有效 Run 产生的 Artifact** 才算 Local Result。文献结论、GPT Pro 判断都不是。
_Avoid_: Result（裸词禁用）、把外部结论当结果。

**Evidence Link**：
把一个精确 assertion（如 `C01@v3.failure_exists`）连接到 Source Paper、Local Artifact、Inference 或 External Review 的 typed record，至少记录 relation、basis type、scope 与 ref。证据等级属于 assertion / link，不属于整个 Candidate；Candidate 只能显示派生 evidence summary。External Review 只能 `pressure`，不得直接 `support`。

**Decision**：
对 Candidate 的研究决策。ID `D-nnn`。取值见"决策结果"枚举。

**Paper Project**：
本项目**准备产出的一篇论文**，组合多个 Candidate 的存活 Claim + 本地证据。ID `PP-nnn`。
_Avoid_: Paper、Draft。**在 Candidate 通过一次有效 Cheap Probe 前，只存在 Paper Opportunity，不创建 Paper Project。**

**Paper Opportunity**：
有潜在论文叙事、但证据不足的前置状态。不编号为 PP，成熟后才升级为 Paper Project。

**Reusable Asset**：
跨论文可复用的工具/数据/Prompt/evaluator/SOP。ID `A-nnn`。

**External Review**：
GPT Pro 或其他外部评审提出的**压力（pressure），不是证据（evidence）**。ID `REV-nnn`。

**Research Judgment**：
在明确证据边界下，对问题是否真实、机制为何、Claim 能声称多强、哪个解释仍存活以及下一步应做什么的当前判断。Judgment 不是 Evidence；它必须指向 Evidence Link、Decision 或明确的 `unknown`。

**Judgment Delta**：
一次可审计的 `before → trigger/evidence → after → falsifier → consequence` 更新。只有 Judgment Delta、有效新 Evidence 或据此产生的 Decision 才算研究进展；新增摘要、Source、Candidate、页面或文档本身不算。

### 协作运营对象

这些对象描述“谁在什么 Chat 中负责什么”，不改变 Candidate、Evidence、Decision 与 Paper Project 的科学语义。

**Orchestrator Authority Tree / 宏观调控权力树**：
以 Primary Portfolio Orchestrator 为唯一默认根节点的项目控制树。Scoped Portfolio 与 Research Orchestrator 都在其明确 authority boundary 下工作；Execution Controller Agent 在 Mentor 背后承担长期运行看护，但不进入 Orchestrator 权力树。每个动作只能有一个 primary owner、一个 decision owner 和一个 writer；多个泛化、同权的“总指挥”属于 split-brain。
_Avoid_: 把 Execution Controller 自动算成 Orchestrator 或第二人工入口；让两个 Orchestrator 同时改同一优先级、资源决定或 canonical 对象。

**Portfolio Orchestrator / 组合主控**：
管理一个显式 `portfolio_id` 与非重叠 owned scope 的可多实例角色。Primary Portfolio Orchestrator 是唯一用户默认入口并聚合全局；Scoped Portfolio Orchestrator 管理子组合并通过 Portfolio Handoff 回流 Primary。两者都不替 Track Mentor 做科学结论，不替 Student 实现。
_Avoid_: 把每个新宏观任务都升级为 Portfolio Orchestrator；让两个 Portfolio scope 同时拥有同一 Track / Candidate 的写权。

**Portfolio Handoff / 组合回流**：
Scoped Portfolio Orchestrator 向 parent portfolio 返回的有界组合摘要，包含 owned scope、Judgment Delta、Decision、WIP、阻塞、资源冲突和最多一个需上移的问题；它不复制 Student / Mentor 全量历史。

**Research Orchestrator / 研究协调主控**：
Primary Portfolio 权力树中的科研战略职能。组织跨 Track / Student 的 Peer Diagnostic Round，保存分歧与少数意见，编译交给 Pro Teacher 的单一决策问题。它可以有独立持续 Chat，但不拥有全局资源、Track verdict 或 canonical Evidence 写权，也不把会诊共识或 Pro pressure 写成 Evidence / Decision。

**Execution Controller Agent / 执行控制 Agent**：
一个可由定时任务长期唤醒的独立 Codex 运行角色，与 Student 同在 Mentor 之下但不拥有科研裁决权。它按 declared scope 巡检 Student、CC/tmux、Lab/Job、GPU/HDFS、Run 和报告完整性，直接处理有界低风险修复，把重复 incident 收敛为 prevention rule，并向 Mentor 返回紧凑运行 delta。它不选择 Claim、不解释科学结果、不接受 Handoff，也不以 throughput 或资源占用表示研究进展。
_Avoid_: 让 Mentor 阅读每轮原始日志；为每类杂活创建一个常驻 Agent；把同一类人工修复无限重复而不沉淀自动化或 fail-closed escalation。

**Execution Control Plan / 执行控制计划**：
绑定一个 Execution Controller Agent 的定时策略与 patrol 合同，包含 controller ID、scope、Mentor targets、Student set、cadence、writer scope、checkpoint、暂停条件与 escalation boundary。每次唤醒只执行一个终态化 tick，不把整篇 SOP 复制进每轮 Prompt。

**Execution Control Plane / 执行控制面**：
Execution Controller Agent 与获授权角色使用的工具与事实层，包括 Watch/Job、GPU/HDFS、registry、checkpoint、Run queue 和完整性验收。Plane 没有独立决策权；Agent 读取 Plane 事实并在自己的权限边界内行动。

**Engineer Task / 临时工程修复任务**：
Execution Controller 无法在有界自愈内解决时，由 Mentor 通过一份 `engineering_incident` Packet 临时派发的内部 Agent 能力。它不是常驻编制；只修复 Packet 声明的 incident，返回 patch、验证、剩余风险和 rollback，再由 Controller 读回、Student 恢复原 Cycle。

**Student GPU Lab / Student 远端容器实验台**：
一个 active Student 在 Program standing authorization 内独占、可跨 Idea Variant、Run、Stage Settlement、Cycle 与 coding-agent session 复用的**逻辑实验台 binding**；它在任一时刻至多绑定一台容量验收合格的远端交互容器，默认目标为 `4–8 GPU`，而在没有更快可行完整路线且首个冻结 workload 通过容量预检时，允许 `2×H20` compact fallback。它通常是 Worker / DevBox，Stable 不可得时也可由可进入 Shell 的 GPU Job 临时承载。逻辑 Lab 随 Student/Cycle 延续，物理 Worker/Instance 只是受平台 Watchdog、抢占和生命周期约束的 lease，可以经 replacement 更换。Lab 是 Student 的默认执行环境，不是后期 scale-up 奖励；CPU 预处理、API client、评测、推理和训练都从该容器运行。具体 Run 只占用其中声明的 GPU slice。一次实验结束、一个 Idea 被 Kill、一次 Handoff 或 coding-agent session 结束都不会自动释放逻辑 Lab。每个新物理 binding 仍必须重新通过 Instance 登录、`nvidia-smi`、远端代码、持久存储、真实 workload 加载与当前 Watchdog survival gate。
_Avoid_: 在本地 Mac 产生 Claim-bearing 结果；多个 Student 共享一台 Lab 作为默认拓扑；为同一 Student 的每个 Idea 重复申请 Worker；把历史 Worker 验收迁移到 replacement；把申请到 8 卡或 SM 达标当成单个 Run 使用 8 卡、实验有效或研究进展的科学理由。

**GPU Survival Gate / GPU 生存门**：
物理 Worker 验收后、被视为安全 active 前的运营 Gate。它要求按实时 Watchdog 规则记录监控 metric、聚合口径、阈值与时间窗口，并用真实、可复用的 GPU workload 达到 Program 的安全目标；当前目标是监控口径下 Worker SM `>30%`。它只回答“这个 lease 是否可能在低利用率策略下继续存在”，不回答 workload 是否科学有效、是否值得 scale-up 或 GPU 是否高效。模型驻留、VRAM 占用、进程/端口、CPU/API 活动以及 synthetic burn 都不能满足该语义。

**Track Mentor / 方向负责人 / 导师**：
恰好负责一条 Track 的长期科学 owner。维护该 Track 的论文与 benchmark 地图、Candidate portfolio、Student roster、当前判断和团队知识；通过有界 Mentor Action 决定是否接纳 Mission、复核一个 Student Handoff，或调整 Track 组合。Mentor 不代替 Student 冻结具体实验 Claim，不逐步遥控 Student，也不因一次 `/goal` 自动处理整条 Track。一个 Track Mentor 对应一条长期 Codex Chat；方向级 GPT Pro Chat 属于外部评审通道，不是 Student Chat。

**Mentor Action / 导师动作**：
一次有明确输入、owner、写入边界和终点的 Track 级决策事件，且只能是 `admit-mission / review-handoff / review-incident / review-portfolio` 之一。`review-incident` 只裁决一个已显式送达的 `engineering_incident` 是否 dispatch、changes-requested 或 reject；它不解释科学结果，也不扩大 Engineer 权限。一次 Mentor `/goal` 最多处理一个 Action，完成或阻塞后停止；不得自动串联下一 Action 或启动 Student Cycle。

**Mentor Cycle / 导师裁决周期**：
执行一个 Mentor Action 的可审计记录，保存输入指针、证据边界、裁决、写入、未解决问题和下一 owner。它不是 Student 的科学 Cycle，不制造 Local Result，也不等于 canonical Settlement。

**Mentor Dossier / 导师阶段综合**：
Student 在 material Stage Settlement 更新的详细组会报告。它把 Research Question、Proposal、实现、完整 Run/日志/报告指针、成功与失败、Claim 前后变化、竞争解释、置信度、Next Evidence 和 Mentor question 串成一条可读链；原始数据仍只存一次。每个新 digest 由 adapter 固化为不可变快照。Dossier 是 supporting context，不是 Evidence、Handoff 或 canonical Settlement。

**Daily Mentor Review Queue / 导师日观察队列**：
每条 Track 独立维护的文件队列，状态仅为 `new / observed / needs-review / resolved`，并用 `waitingFor` 表示缺失输入。每日 Mentor check 扫描所有 active Student，但一次最多深审一项；普通进展只记 `observed`。它与 `MENTOR_WORKSPACE.action_queue` 的正式 Mentor Action 完全不同，也不改变 Student 科学状态。

**Mentor Review Delivery / 导师审阅交付**：
一份不可变 Mentor Review 以 URI + SHA-256 写入 Student Inbox 的文件交付。Student 在安全 checkpoint 独立记录 `observed / applied / challenged` 与证据；`applied` 只表示 Student 采纳指导，不等于 Mentor settlement、Decision 或 canonical change。

**Student Runtime Binding / Student 运行绑定观察**：
把 Student/Mission/Research Line/live Cycle 的声明状态与 CC/tmux profile、Claude session、Controller coverage 和带时间戳 observed state 对齐的运营记录。它独立于 registry `codexThreadId`：`connected + controller-frozen` 表示同一 Student/Cycle 的 transport 可寻址但被 Controller 有界冻结，不证明 GPU workload、科学进展或 Codex task 在线。

**Bootstrap Import / 启动导入**：
把旧资产的 ownership、URI、digest 与历史判断边界接入一个 Student Workspace 的初始化记录。它不是 Student Handoff、Evidence、Judgment Delta 或 Mentor settlement；第一个真实 Student Cycle 必须在使用其中任何科学主张前重新审计其来源和适用范围。

**Student Mission / 学生任务域**：
Mentor 交给一个 Student 的稳定问题空间，规定为什么值得研究、允许探索到哪里、哪些证据与资源可用，以及何时必须回交。Mission 在 Seed Question 或当前方法被推翻后仍可继续；跨出 Mission、需要独立并行 owner 或改变权限边界时才提议新 Student。
_Avoid_: 把 Mission 写成预先指定的单一 Idea、一次实验或论文标题。

**Seed Question / 启动问题**：
Mentor 为 Student 提供的初始研究坐标，而不是必须守住的结论。Student 可以在证据驱动下 refine、narrow、generalize、reframe 或 sequential-pivot，但必须记录变化原因并保持在 Mission 内。
_Avoid_: 把 Seed Question 当固定 Claim 或完成条件。

**Research Line / 学生课题线**：
一个 Student Mission 内可追溯、可版本化的当前研究问题与 Claim 谱系。Research Line 可以随证据发生顺序演化；只要 Mission、owner 与写入边界仍成立，就保留同一 Student，并以 Revision 记录问题、estimand、Claim、falsifier 和下一证据的变化。只有需要同时保留两个可独立生存的并行谱系时才提出 fork。

**Research Line Revision / 课题线修订**：
Research Line 的一次 `before → trigger/evidence → after → falsifier → consequence` 变化记录。它说明 Student 为什么改变研究问题或机制，不自动成为 canonical Judgment Delta，也不能覆盖旧版本。

**Idea Variant / 方案变体**：
同一 Research Line 内的替代机制、baseline、评测、数据处理或实现路径。Idea Variant 默认留在 Student 的 `WORKSPACE.yaml`；是否继续使用同一 Chat 不改变它的研究身份。只有形成独立问题、独立 Claim、独立 kill rule，且一方失败不必杀死另一方时，才升级为新的 Student。

**Student / 学生**：
一个 Student Mission 的端到端研究 owner，并拥有一个独立的文件空间；连续 coding-agent session 从相同 `GOAL / CHARTER / WORKSPACE / ASSETS / cycles` 恢复，在一个 live Cycle 内持续完成 Research Round，直到条件 Handoff。启动 active Cycle 后，它先在 standing authorization 内恢复或申请自己的容量合格远端容器 Student Lab（4–8 GPU preferred；2×H20 compact fallback），再把 CPU/API/GPU 的 Idea A/B/C 验证留在同一环境；固定 commit 的长训练、全量评测和批量 seeds 另派生为 Job。若使用 GPT Pro，则可为该 Mission 的当前 Research Line 绑定一条持续的 Student-level 远端 Chat。Student 不等待导师逐步派发 Idea，但必须让每次 Research Line Revision、预算、falsifier、stop rule 与交付合同可追溯。
_Avoid_: 把 Student 等同于单个 Candidate、单次实验、论文成稿或固定 Idea；把 active Candidate 数量自动计成已创建 Student；把“自主”解释为跨 Mission 漂移。

**File-first Goal Invocation / 文件化 Goal 调用**：
人在仓库根目录粘贴一条指向具体 `GOAL.md` 的短 `/goal`。该文件提供稳定 binding，共享模板提供行为。Track Mentor 调用通过 `MENTOR_WORKSPACE.yaml + mentor-cycles/` 恢复并处理至多一个 Mentor Action；Student 调用通过 `WORKSPACE.yaml + cycles/` 恢复唯一 live Cycle，没有且 Workspace 为 `create-ready` 时创建且只创建一个。它不是 Prompt 渲染、剪贴板传输或 Node 命令。

**Live Cycle / 活跃研究周期**：
一个 Student 下状态为 `initializing / active / paused` 的唯一 Cycle。它跨 coding-agent session 保存多个 Research Round、Stage Settlement 与恢复点，是科学执行是否 active 的事实源；Chat 或 registry task ID 只是观测信息。多个 live Cycle 是 writer conflict，必须停止并交回处理。

**Research Round / 研究回合**：
live Cycle 内一次完整的 `学习/审计 → 问题与 Claim → Probe/复现/实验 → Review → 判断更新`。一个 Round 必须产生 Stage Settlement，但不会因为完成、失败或 Kill 一个 Idea Variant 自动 Handoff。

**Stage Settlement / 阶段结算**：
追加在 active Cycle 内的工作 checkpoint，记录 `Idea/Claim before → evidence → after → consequence → Next Evidence`，然后选择下一条未阻塞分支继续。它不是 Student Handoff、canonical Research Event 或 Mentor settlement。

**Lead label / 主推进标签**：
一个 Track 当前最值得制造下一条证据的 Student 所带的动态优先级标签，不是独立角色类型、管理层级或特殊目录。证据变化后标签可以转移。

**Research Line Seed / 课题线索**：
尚未达到独立 Student Mission 或并行 fork 建立条件的 Mentor backlog 条目。它可以有 Seed Question、来源和解锁条件，但不称 Student、不创建 Student 文件空间、不执行 Run。

**Peer Diagnostic Round / Student 会诊**：
由 Research Orchestrator 临时组织的 2–3 个相关 Student 的诊断回合。参与者先冻结独立判断，再交换 Claim、Evidence pointer、assumption、falsifier 与 consequence；输出必须保留共同事实、未解决分歧和少数意见。会诊不是新 owner，不通过投票产生 Evidence / Decision。

**Pro Teacher / 外部导师工具**：
远端 Web GPT Pro 的顾问能力，不是组织树中的 owner。它适合 Idea brainstorming、跨论文综合、novelty pressure、reviewer objection 与实验叙事；不拥有 live repo truth、代码实现、实验监控或本地证据裁决权。其输出始终是 External Review pressure，必须由本地 Codex 与 scientific owner 复核。

**Pro Consultation / Pro 对话**：
在 Program、Direction 或 Student 的持久 Pro Chat 中完成的外部咨询。远端原始回答必须可见且本地 verdict 已保存；它不自动等于关键结论已经过完整链审计。

**Key-conclusion audit / 关键结论审计**：
具有完整、可核验 `codex-snapshot → gpt-exchange → codex-verdict` 链的外部评审回合。Bridge 运维内部可以使用 `receipt-observed / strict-round-verified`，用户界面和日常 SOP 不暴露这些校验码。

**Instruction Delta / 指令增量**：
用户直接在 Mentor 或 Student Chat 改变局部目标、预算、Claim ceiling 或 stop rule 时向上层同步的最小变更记录。上层接收前只影响被点名 scope，不静默改写整条 Track 或组合策略。

**Research Line Brief**：
Track Mentor 给 Student 的粗粒度任务合同，至少包含 Student Mission、Seed Question、Candidate / Paper Opportunity 指针、问题空间边界、当前证据边界、Claim ceiling、资源边界、回交条件和交付格式。它提供边界和初值，不预先替 Student 冻结具体 estimand、Claim、baseline、falsifier 或论文标题；这些由 Student 在真实 Cycle 中形成并接受证伪。

**Student Handoff**：
Student 在显式停止、scope/authority 边界、跨 Mission fork、Mission 穷尽或所有安全分支阻塞时返回 Track Mentor 的 success / failure package。普通 Round 只写 Stage Settlement。Handoff 至少包含预期与实际、证据或失败边界、失败根因、适用条件、反例、代码与可复用资产、建议 Decision 和下一实验；它本身不是 Local Result。

**Team Knowledge Entry**：
Track Mentor 本地复核 Student Handoff 后**按需晋级**的可复用团队知识。每个 Handoff 留在 Cycle，但只有可跨 cycle / Student 复用且边界完整的经验才创建 Entry。Entry 必须记录来源、适用范围、不适用条件、反例、相关 Run / Artifact / Decision 与下一次使用方式；失败经验与成功经验同等可收录。GPT Pro pressure、聊天摘要或未经复核的 Student 判断不得直接写成 Evidence。

**Chat Binding**：
把一个运营角色或 Research Line 连接到已观察的 Codex thread ID 和（可选）远端 GPT Pro conversation ID 的登记记录。它用于寻址和审计，不承载研究状态，也不是 file-first Student 的启动前置条件。只有显式登记的 Chat 才计入“已观察 Chat”拓扑；目录、live Cycle、目标拓扑或 UI 可见会话都不能冒充已登记的完整 Bridge round。

**Student Roster / 学生组合**：
一个 Track 正式登记的 Student 集合，常态为 `1–3` 个；每个 Student 都有独立 Mission、Research Line lineage、文件空间和独立 Student GPU Lab 配额边界，可由连续 coding-agent session 恢复。`Lead` 只是其中一个动态标签。真正同时运行的 evidence-producing cycle 和实际 GPU Lab 数由 live Cycle、standing resource envelope、实时调度与 Mentor 复核容量共同决定，不从 Candidate、Chat、论文、目录或 quota 列表推断。

### 动作

**Split**：
一个 Candidate 分叉出新的 Candidate（母卡关闭、开子卡）。
_Avoid_: Branch（保留给 Track 无关；分叉动作只叫 Split）。

**Nest**：
一个 Candidate 降级为另一个 Candidate 的 evaluator slice，保留编号供追溯，但**不计入独立 Candidate 数**。例：C14→C13、C15→C13/C03。

**Merge**：两个 Candidate 合并为一。
**Park**：搁置，须写解锁条件。
**Kill**：终止，须写原因；Kill 后仍保留可检索。
**Continue**：有稳定 failure/headroom，继续。

### 六个正交维度（Candidate 不能只有一个 status）

**研究成熟度**：Radar → Audit → Problem → Probe → Pilot → Confirmation → Paper。
**证据等级**：`Unverified Lead` < `Source Supported` < `Inference` < `Local Result`。
**工作状态**：Active / Blocked / Parked / Closed。
**决策结果**：Continue / Split / Nest / Merge / Park / Kill。
**产出形态**：Method / Benchmark / Evaluation / Dataset / Diagnosis / Systems / HCI。
**Idea 类型**：Problem / Method / Evaluation / Analysis / System / Application。

Student GPU Lab 与 GPU Survival Gate 都是执行基础设施；某个 Run 使用的 GPU slice、数据许可和存储路径仍是 **Experiment 的资源约束**，都不是研究分类维度或科研进展。

### 计数口径（定义冻结，数值动态）

- **总节点** = canonical Candidate collection 中所有稳定 ID；具体数值动态派生。
- **独立 Candidate** = 未被 Nest 的 Candidate；看板与进度指标默认使用该口径，具体数值动态派生。
- 计数变化规则：Split +N、Nest 独立数 −1（保留编号）、Merge −1、narrow 不变号。

### 进度语义

**Progress**：
只按**Judgment Delta、新增有效证据与研究决策**计算。文档数量、Source/Candidate 数量、卡片移动、完成百分比都不算进度。
_Avoid_: "离论文 70%" 这类无可靠含义的百分比。

# Auto Research 工作流程

这份说明串联组织、研究、实验、通信和资产管理，帮助研究负责人及接手的 Agent 从仓库恢复上下文。具体行为合同仍由 [SOURCE_AUTHORITY.yaml](../SOURCE_AUTHORITY.yaml) 指定：角色与交接看 [AUTO_RESEARCH_SOP.md](../AUTO_RESEARCH_SOP.md)，科学有效性看 [OPERATIONS.md](../OPERATIONS.md)，Run 包与归档看[实验报告标准](../experiments/EXPERIMENT_REPORTING_STANDARD.md)。

[组织与课题粒度](#organization) · [研究循环](#research-loop) · [导师通信](#mentor) · [执行与存储](#execution) · [运行修复](#repair) · [外部评审](#pro) · [交接结算](#settlement) · [文件地图](#files) · [部署检查](#deployment)

<a id="organization"></a>
## 1. 从 PI 到 Student：谁负责什么

PI 提出研究目标、纠偏、资源边界和重要取舍。Portfolio Orchestrator 聚合全局，负责路由和跨方向协调；聚焦单条方向时，PI 直接与 Track Mentor 交互；深入某个实现或实验时，再进入对应 Student。

| 角色 | 输入 | 主要工作与输出 | 工作终点 |
| --- | --- | --- | --- |
| Primary Portfolio | PI 意图、各方向判断与阻塞 | 全局优先级、组合视图、跨方向冲突和下一议程 | 下一 owner 与需要 PI 决定的事项清楚 |
| Scoped Portfolio，可选 | 明确且非重叠的子组合 | 管理该 scope，向 Primary 回流 | 有界组合总结 |
| Research Orchestrator，可兼任 | 跨课题问题和独立研究判断 | Student 会诊、保留分歧、编译 Teacher 问题 | 可检验分歧或一个外部评审问题 |
| Track Mentor | 方向论文地图、Student 报告、Handoff | 课题边界、科学复核、Student 组合与知识晋级 | 一次观察完成，或一个正式 Action 完成/阻塞 |
| Student | Mission、Seed Question、文件状态和证据 | 调研、问题深化、代码、实验、Evaluator、判断更新 | 阶段记录后继续；真实边界处 Handoff |
| Execution Controller | 覆盖范围、运行状态与 checkpoint | 定时巡检、恢复、验收、有界自愈与运行经验 | 每次唤醒完成一个终态 tick |
| Engineer，临时 | Mentor 派发的有界工程 incident | 根因、修复、测试和回滚说明 | Controller 验收后返回原 Student |

同一对象始终只有一个负责执行的人、一个决策 owner 和一个 writer。一个 Controller 可以覆盖多个 Mentor 的 Student，但必须逐项登记范围，保持写权互斥；科学判断仍由对应 Student/Mentor 负责。

### 课题、Cycle、Round 与 Run

```text
Track
└── Student Mission                         稳定问题空间
    ├── Research Line revisions             问题与 Claim 的演化历史
    ├── Idea Variants                       同一课题中的机制或实现变体
    └── 唯一 live Cycle                     跨会话恢复
        ├── Research Round 1
        ├── Research Round 2 …
        │   └── Experiment Spec → Run(s) → Artifact(s)
        └── 条件 Handoff
```

Mission 是长期边界，Seed Question 是起始坐标。证据可以推翻某个初始 Idea，Student 仍可在同一 Mission 内重新界定问题。每条 Track 通常维护 1–3 个 Student，Lead 是可转移的优先级标签。

普通消融、另一种实现、改良版本或顺序转向保留在同一工作区。只有两个问题需要并行存在、各自拥有独立 Claim、证伪条件与证据路径时，才提议独立 Student。创建新的用户可见 task 仍需明确授权。

### 启动与恢复

在已配置的工作区，从 [START_HERE.md](../START_HERE.md) 选择具体 `GOAL.md`。恢复顺序是：

`GOAL → CHARTER → WORKSPACE → ASSETS → 当前 Cycle → Mentor Dossier/Inbox/Acks`

存在唯一未结束 Cycle 就恢复；没有 Cycle 且状态为 `create-ready`，才创建一个；多个 live Cycle 属于写权冲突。会话中断保留 checkpoint，下一会话恢复同一文件空间。Chat ID 用于寻址，不能代替科学状态。

完成标准：身份、Mission、写入范围、唯一 Cycle、当前判断、下一证据和恢复点均明确。缺少运行状态时保持未启动或报告缺项，不从历史聊天猜测。

<a id="research-loop"></a>
## 2. Student 的每个 Research Round

一个 Cycle 可以包含多轮研究。每轮沿下表推进，证据可以让工作返回更早的步骤；不适用的环节记录理由与解锁条件。

| 步骤 | Student 做什么 | 产物与完成条件 |
| --- | --- | --- |
| 1. 学习与证据审计 | 阅读机制来源、最强相关工作、代码、Benchmark 协议及反例 | 能区分作者证明、作者推断与尚未验证内容；说明它改变了什么判断 |
| 2. 定义问题 | 明确 failure、受影响结果、竞争解释和区分实验 | 问题具有真实后果、未被覆盖、可独立证伪且存在可执行 Probe |
| 3. 形成 Claim | 冻结陈述式 Claim、estimand、观测单位、baseline、混杂因素和 falsifier | 正结果与反驳结果均可解释；最危险替代解释明确 |
| 4. 冻结 Spec | 固定代码/数据/模型版本、指标、阈值、预算、GPU slice 和输出路径 | 运行前即可判断哪些结果会支持、收窄或否定 Claim |
| 5. 验证 | 远端 Cheap Probe；审计或复现依赖的 baseline；再做受控改进或新问题验证 | 每次真实执行有独立 Run 身份、原始输出、终态和来源 |
| 6. Review | 核对实现、数据、Evaluator、误差切片、竞争解释和独立质疑 | 分清假设失败、实现错误、数据问题、评测问题与资源故障 |
| 7. Stage Settlement | 记录判断变化、置信度、适用边界、分支状态与下一证据 | Workspace、Cycle、Assets 相符；完整执行包通过相应检查 |
| 8. 继续 | 选择最有信息增益的未阻塞分支 | 在原 Cycle 开始下一轮，或证明真实 Handoff 条件成立 |

### 论文审计

来源核验与深度审计分别记录。确认了论文身份、下载了 PDF 或读了摘要，只说明访问范围。

重点论文的记录需要包含：Contribution、Insight、目标、机制、数据处理、训练、评测、关键假设、直接支持的结论、未支持的推断、Benchmark 是否足够、失败条件，以及对本项目判断的影响。字段见 [paper-audit.yaml](../templates/paper-audit.yaml)。

程序级 200–300 篇目标只计去重后的 full-source deep-audit。数量是覆盖指标，具体优先阅读什么由当前问题和缺失证据决定。论文 limitation 要通过后果、覆盖、Claim、执行四道 Gate，才成为研究问题。

### 复现、改进与 Evaluator

先明确复现的是哪篇论文、哪个版本、哪张表或哪条 Claim，记录官方代码、数据 split、环境差异和容差。若存在与当前范围匹配的可信复现，可以审计后使用。

复现 mismatch 优先检查实现、预处理、数据、配置和 Evaluator，不能直接解释成新方法失效。受控改进要说明改变了哪个主要因素，并保留强简单 baseline、oracle、预算匹配、消融和最快证伪实验。

Evaluator 需要匹配 Claim 的观测单位，检查信息泄漏、缓存跨模型污染、样本依赖、阈值边界和 producer/consumer 组合语义。平均分之外保留失败切片。完整科学要求由 [OPERATIONS.md](../OPERATIONS.md) 管理。

### 阶段记录

每次记录回答：

```text
原来相信什么 → 哪条证据改变了它 → 现在相信什么
→ 置信度与剩余解释 → 对下一步有什么影响 → 下一条证据
```

允许 `no-material-change`。只有新增摘要、检查器、文档或 Round 编号时，不能声称研究推进。来源支持的判断与推断可以在其边界内更新；本项目实验结论必须引用有效 Run/Artifact。

一个 Run 完成、一个 Idea 被 Kill、一次平台中断或上下文切换，通常只产生阶段记录或 checkpoint。

<a id="mentor"></a>
## 3. Mentor 如何持续理解并指导 Student

### 详细阶段报告

Student 在 material Stage Settlement 更新 `MENTOR_DOSSIER.md`。它是面向 Mentor 的组会综合，串联问题、Proposal、实现、各阶段结论、所有成功与失败、Claim 前后变化、置信度、竞争解释、Next Evidence 和具体疑问。

原始日志、参数、数据和结果保存在原始 Run/证据位置。Dossier 引用 URI 与 SHA-256，避免 Mentor 同时加载多个 Student 的全部聊天与原始日志。

### 每日观察与 Review Queue

每日 Mentor check，也可以由 PI 显式触发同一观察流程：

1. 读取该 Track 的 active Student roster 和报告。
2. 将每个未见过的 Dossier digest 固化成不可变快照，进入 Review Queue。
3. 对所有新项分流：普通连贯进展为 `observed`，需要科学判断的为 `needs-review`；缺输入时记录 `waitingFor`。
4. 每次最多深审一项，其他项排队。
5. 保存详细 daily journal 和当前摘要；无需指导时，观察本身即完成。

每日观察不创建正式 Mentor Action，不启动 Student、实验或资源，不默认调用 Pro。行为入口是 [daily-mentor-check.md](../templates/daily-mentor-check.md)。

### 指导交付与 Student 回执

```text
Student Dossier
  → immutable snapshot + Review Queue
  → Mentor Review
  → Student Inbox：Review URI + SHA-256
  → Student Acknowledgement：observed / applied / challenged
```

Student 在恢复和安全阶段节点校验 Inbox，先确认阅读，再独立判断采纳或质疑，并附证据。Mentor Review 是可反驳的建议；采纳回执不是正式研究结算。

Queue 的 `resolved` 可以只表示该审阅已交付。确认完整链路时，还要读取 Student 回执及后续证据，不能用队列状态代替它们。

### 正式 Mentor Action

正式 `/goal` 每次只处理一项：

| Action | 处理什么 |
| --- | --- |
| `admit-mission` | 接纳一个课题、给出粗粒度边界与初始问题 |
| `review-handoff` | 审阅一个正式回交的 Student Cycle |
| `review-incident` | 对已送达的工程 incident 决定派发、修改或拒绝 |
| `review-portfolio` | 调整方向内 roster、Lead、重叠、fork/merge/park 或优先级 |

状态保存在 `MENTOR_WORKSPACE.yaml + mentor-cycles/`。每日观察另写 `mentor/`，两套队列各司其职。详见 [Mentor GOAL](../templates/track-mentor-goal.md) 与[通信协议](../system/coordination/README.md)。

<a id="execution"></a>
## 4. GPU、API、交互 Lab 与 Batch Job

### 执行位置与资源生命周期

所有会生成新科研数值、评分或判断的执行都在已验收远端容器中进行，包括对已有结果的重新统计、重评分和切片比较。本地 Mac 用于阅读、编辑、静态检查、打包和终端控制。

Student 自主准备和维护当前授权范围内的一台逻辑 Lab；Controller 负责共享资源登记的验收与写入。容量、fallback 与资源扩张边界以 [AUTO_RESEARCH_SOP.md](../AUTO_RESEARCH_SOP.md) 为准。

```text
准备首个有用 workload 与可复用资产
  → 查询真实候选路线和容量
  → 保留唯一请求
  → 实例可登录
  → 硬件 / framework / 源码 / 存储 / 实际加载验收
  → Controller 登记可运行 binding
  → 有用 workload 与平台回收风险检查
  → 交互研究 + 独立异步 Job
```

交互 Lab 用于复现、调试和短实验，按 Run 分配 GPU slice；长训练、固定版本全量评测、多 seed 确认走 Job。Monitor/Watch 用来观察既有异步工作，Job 用来承载执行，两者可以配合使用。

资源排队只阻塞依赖它的 Test。Student 可以继续论文审计、问题与 falsifier 设计、实现、静态检查和资产准备。未验收容器不能用本地科研计算代替。

### 存储职责

| 存储层 | 适合保存 | 使用前检查 |
| --- | --- | --- |
| HDFS / 对象存储 | 不可变数据版本、源码包、模型/环境分发、checkpoint 与实验归档 | URI、权限、inventory、digest、不可覆盖目标 |
| 挂载云盘 | 经批准且可跨容器复用的模型、环境、数据工作集 | 实际 mount source、读写权限、容量和资产版本 |
| 实例临时盘 | 当前运行的缓存、临时解包与可恢复工作集 | 空间预算、恢复来源和 checkpoint 去向 |
| 本地仓库 | 代码、设计、报告、状态和证据指针 | owner、版本、引用与写入边界 |

本部署的数据来源为 `hdfs://haruna/home/byte_suite_ai/dataset`，实验归档使用其下 `memory-proactive-agent-research/` 的唯一版本化子路径。其他部署需显式配置自己的授权路径。看到目录不等于验收挂载，旧机器的 receipt 不能证明 replacement 可用。

申请前准备可复用资产；更换机器时先恢复并核验新副本，再切换指针。具体 site/host/云盘映射与平台命令位于部署工作区的 `infra/GPU_RUNBOOK.md` 和 `system/scheduling/storage-profiles.json`。

### GPU 利用率与释放

每次物理 binding 都重新读取平台回收规则，记录实际有用 workload、监控口径、告警窗口和恢复点。显存驻留、进程存活和 API 活动不能代替 GPU 利用率；人工空转不能作为保活手段。

一次 Run 完成或 Idea 切换不自动释放仍需使用的 Lab。没有合法有用工作、Mission 关闭/暂停且无需保留、PI 明确要求释放或平台回收时，保存资产并按资源合同处理。详见[执行与调度合同](../system/scheduling/README.md)。

### 每个 Run 的报告与归档

真实执行前固定身份、Spec、命令、输入与预期产物；执行期间保留日志、cache/checkpoint 和终态；执行后完成独立报告和 digest；上传后再次核对 inventory 和文件内容。

```text
Run identity + frozen inputs
  → execution / raw outputs / terminal
  → RUN_REPORT + artifact digests
  → immutable publication
  → inventory + digest readback
  → archive receipt
```

报告记录 Proposal 或复现目标、主要改动、精确命令、预期与实际、结果语义、根因、限制、资产和下一证据。执行状态、科学结果、复现结果、归档状态、Mentor 结算状态分别保存。

成功、negative、failed、invalid、inconclusive 都留存。完整字段、目录和更正规则只有一个来源：[实验报告标准](../experiments/EXPERIMENT_REPORTING_STANDARD.md)。

<a id="repair"></a>
## 5. Controller 与运行改进闭环

Controller 的独立 task 由已配置定时计划唤醒。每次只完成一个 patrol tick，下一次由调度器触发：

`恢复绑定 → 检查 Task/Research/Resource/Experiment → 比较变化 → 观察或修复 → 验证 → 记录 → 恢复原 Student → 终态`

运行 incident 首次出现就记录原始证据、根因置信度、最小修复、验证、适用边界和复发判据。Student 处理自己范围内的问题并提交经验候选；Controller 在明确写权内维护共享运行记录和已接受规则。

| 问题来源 | 规则落点 |
| --- | --- |
| 跨 Student 的研究执行行为 | [student-goal.md](../templates/student-goal.md) |
| 科学有效性与结果解释 | [OPERATIONS.md](../OPERATIONS.md) |
| Run 包、报告和归档 | [实验报告标准](../experiments/EXPERIMENT_REPORTING_STANDARD.md) |
| SSH、GPU、存储操作 | 部署工作区 `infra/GPU_RUNBOOK.md` |
| CC/tmux 传输与恢复 | 部署工作区 `scripts/claude-student-tmux.sh` |

文件更新后，向原 Student 会话交付有界指令变更，并验收当前会话重新读取的版本；保留原 Mission/Cycle。历史失败和修复证据保留，修复经验只有经过验证才成为通用规则。

复杂代码/环境问题进入 `needs-engineer`，由 Mentor 派发临时 Engineer；科学取舍或越界权限进入对应决策 owner。Controller 暂停或缺少验收 owner 时，明确保留阻塞；不能自行把共享状态标记为通过。

例行健康检查和成功小修复记账。只有实质变化、持续停滞、修复失败或需要决策时才通知。完整行为见 [Controller GOAL](../templates/execution-controller-goal.md)。

<a id="pro"></a>
## 6. Student 会诊与 GPT Pro Teacher

需要跨课题比较时，Research Orchestrator 可组织 2–3 个相关 Student 的临时会诊。各自先冻结独立判断，再交换 Claim、证据、假设、反例和后果，保留分歧与少数意见。

Pro 适合问题重构、跨论文综合、novelty、反例、审稿意见和实验叙事。实现调试、GPU 排队、日志观察由本地 Agent 处理。

同一个 Auto Research Project 可包含 Program、Direction 和 Student 三种 owner scope 的持久对话。每次只提交一个决策问题；同一 Web 对话一次只有一个 active submission。

稳定共享背景进入 Project Sources，当轮源码、实验结果和争议进入带版本的 task bundle。共享 Source 同步是单独维护动作，普通咨询不以每次覆盖全部 Sources 为前置。

保留远端原始回答，再由本地 owner 判断 accept / modify / reject。关键结论审计另外要求完整的 `codex-snapshot → gpt-exchange → codex-verdict`。Pro 输出始终是外部审阅意见，不能直接充当论文事实或本项目实验结果。

本地 Bridge skills、浏览器账号、conversation binding 与原始审计目录是部署依赖；文档不能证明它们可用。没有改变决策的新证据时，无需机械重复咨询。

<a id="settlement"></a>
## 7. 从阶段记录到正式研究结算

| 环节 | 什么时候发生 | 写入位置 | 产生什么 |
| --- | --- | --- | --- |
| Stage Settlement | 每个 Research Round | Student Cycle / Workspace / Assets | 当前工作判断、下一证据与恢复点 |
| Mentor Daily Review | 每日或显式观察 | Mentor journal / queue / reviews，Student Inbox/Acks | 观察或可质疑的指导 |
| Student Handoff | 明确停止、范围/权限边界、Mission 穷尽或全部有效分支阻塞 | 原 Cycle 与 Workspace 指针 | 有界交接包，等待 Mentor 裁决 |
| Mentor Action | 审阅一个正式交接或其他决策事件 | Mentor Workspace / Mentor Cycle | accept / modify / reject 和下一 owner |
| Canonical Settlement | 已审阅且需要改变正式研究状态 | 研究索引与 append-only 事件 | 可追溯的正式状态变更 |

Handoff 前核对全部执行、Run 包、资产引用、分支状态和恢复点，确保没有第二个 live Cycle。交接包包含预期与实际、失败分类、证据边界、反例、可复用资产、建议决定和下一证据或解锁条件。

正式状态通过 [settle-research-event.mjs](../scripts/settle-research-event.mjs) 更新。它使用精确 `baseRevision`、独占锁与恢复日志；先 dry-run，再写入，遇到未完成事务先恢复。普通无变化记录留在 Cycle/Handoff。

成功和失败经验经 Mentor 审阅，只有具备跨 Cycle/Student 复用价值且适用边界完整时，才进入 `knowledge/entries/`，并通过正式索引登记。详见[知识晋级合同](../knowledge/README.md)。

看板把正式研究状态与运行观察分别展示。一个 delivered Review、已完成进程或成功上传，都不能单独替代科学结算。

<a id="files"></a>
## 8. 文件与实现地图

### 稳定规则与动态状态

| 位置 | 保存什么 | 逻辑 owner |
| --- | --- | --- |
| [README](../README.md)、[START_HERE](../START_HERE.md) | 阅读导航、启动和恢复入口 | 仓库维护者 |
| [CONTEXT](../CONTEXT.md)、[SOURCE_AUTHORITY](../SOURCE_AUTHORITY.yaml) | 术语、来源优先级 | 治理维护者 |
| [AUTO_RESEARCH_SOP](../AUTO_RESEARCH_SOP.md)、[OPERATIONS](../OPERATIONS.md) | 协作行为、科学规则 | 对应协议 owner |
| [system/](../system/README.md) | 架构、通信、调度合同；部署时的运行登记 | 对应模块 owner |
| [tracks/](../tracks/README.md) | Mentor/Student 工作界面与课题恢复 | 各自 Mentor/Student |
| [templates/](../templates/) | 角色行为、Cycle、报告、回执等格式 | 对应合同 owner |
| [research-index.yaml](../research-index.yaml)、[research-events.jsonl](../research-events.jsonl) | 正式研究对象、关系和变更历史 | 唯一 Settlement writer |
| [sources/](../sources/)、[review/](../review/) | 来源范围、审计和本地 verdict | 原记录 owner |
| [experiments/](../experiments/) | Spec、实现、Run 包和实验报告 | 所属 Student |
| [knowledge/](../knowledge/README.md) | 经复核的成功和失败经验 | Mentor |
| [dashboard/](../dashboard/) | 可重建的桌面展示和检索视图 | 派生器 |

### 一个部署后的 Track 工作区

```text
tracks/<track-id>/
├── CHARTER.md / GOAL.md
├── MENTOR_WORKSPACE.yaml
├── mentor-cycles/<action-cycle-id>.md
├── mentor/
│   ├── CURRENT.md
│   ├── REVIEW_QUEUE.yaml
│   ├── daily/<YYYY-MM>.md
│   ├── dossiers/<student-id>/<sha256>.md
│   └── reviews/<review-id>.md
└── students/<student-id>/
    ├── GOAL.md / CHARTER.md
    ├── WORKSPACE.yaml
    ├── ASSETS.yaml
    ├── cycles/<cycle-id>.md
    ├── MENTOR_DOSSIER.md
    ├── MENTOR_INBOX.yaml
    └── MENTOR_ACKS.yaml
```

GOAL 保存身份和入口，CHARTER 保存长期边界，Workspace 保存当前判断与指针，Cycle 保存过程，Assets 保存 ID/URI/digest。Inbox 由交付适配器写，Student 写 Dossier/Acks，Mentor 写自己的观察和裁决文件。

原始证据各存一次。历史版本通过不可变快照、追加记录和 superseding reference 追溯；迁移或整理目录不会提升证据等级。

### 关键实现入口

这些名称描述维护工作区使用的实现。是否随当前 checkout 提供，以实际文件为准；缺少脚本时先完成部署，不能把下面的路径当成已运行的服务。

| 路径 | 职责 |
| --- | --- |
| `scripts/research-workspace.mjs` | 工作区 scaffold、角色绑定、Cycle 与结构检查 |
| `scripts/mentor-communication.mjs` | Dossier 快照、队列、Review 交付、回执与观察校验 |
| `scripts/claude-student-tmux.sh` | 固定 CC 会话的传输、快照和有界恢复 |
| `scripts/verify_student_lab.py` | 当前物理 Lab 的机器可读验收 |
| `scripts/storage_receipt.py` | 资产 inventory、metadata 与强 digest 验收 |
| `scripts/check-container-first-policy.sh` | Run 的远端执行身份检查 |
| `scripts/check-run-package-completeness.sh` | Run 包与报告完整性检查 |
| `scripts/settle-research-event.mjs` | 正式研究状态的串行写入与事务恢复 |
| `dashboard/scripts/` | 研究、运行和待审信息的派生投影 |

<a id="deployment"></a>
## 9. 部署与运行前检查

文档和模板可以在 GitHub 阅读。长期 Agent 执行还依赖具体部署；克隆仓库不会自动恢复已有会话、权限或资源。

| 检查项 | 通过条件 | 缺失时 |
| --- | --- | --- |
| 角色与工作区 | 具体 GOAL、Charter、Workspace、Assets 与唯一 Cycle 相符 | 初始化或恢复准确绑定，保持未启动 |
| 执行适配器 | 当前流程需要的脚本、schema、依赖存在，并通过实际入口验收 | 补齐并验证该组件；模板不当作实现 |
| 科学写权 | Student writer 唯一，共享验收 writer 可寻址 | 先解决 ownership，不创建第二个 writer |
| 通信 | Dossier/Queue/Inbox/Acks 与 digest 交付链可验证 | 如实记录未送达、未读或未采纳 |
| 定时计划 | 正确 task、覆盖范围、cadence、启停状态和最近 tick | 单独配置并验收，不能由 registry 推断已启用 |
| 远端环境 | 当前主机、容器、源码、framework、数据/模型/存储 receipt 通过 | 保留准备工作，不运行 Claim-bearing 实验 |
| 外部服务 | 已授权 provider/model 与退役检查通过，凭据通过安全配置提供 | 记录精确缺项，不自行创建新服务 |
| 可恢复性 | checkpoint、唯一输出位置、归档路径与恢复方法明确 | 补齐后再开始长任务 |

当前流程采用 Agent 执行 SOP 配合薄脚本校验。自动实验队列、GPU slice 租约、资源仲裁、receipt 对账守护进程、完整 task-health 投影等需分别验收；不能因架构中存在这些概念就宣称已部署。

部署信息位于本地 `system/architecture/IMPLEMENTATION_STATUS.yaml`、`system/coordination/registry.yaml`、`runtime-bindings.yaml`、`system/scheduling/student-labs.yaml` 和调度器配置。读取时检查 observation 时间；`create-ready`、`active Cycle`、已登记 task、进程在线、真实 workload 与科学进展分别报告。

机器相关 Runbook、Bridge/browser 状态、真实会话信息和原始运行日志不随一次文档发布自动同步。需要它们时由部署 owner 提供经检查的配置与资产，避免复制历史机器路径、凭据或旧资源事实。

## 10. 日常使用方式

- **看全局：** 请 Portfolio 汇总各方向的判断变化、有效证据、阻塞和下一步。
- **讨论课题：** 与 Mentor 讨论当前问题、Student 报告、竞争解释和最值得验证的内容。
- **深入实现：** 找 owning Student，给出具体问题或有边界的纠偏；Student 把影响写回当前状态。
- **运行异常：** Controller 先做有界修复，复杂故障进入临时 Engineer 路径。
- **修改 SOP：** 更新拥有规则的文件，验证后向受影响运行会话交付同版本纠偏。
- **结束或调整方向：** 明确触发 Handoff/正式裁决，保留失败经验、证据和后续解锁条件。

状态汇报以变化和决策为中心。需要细节时，从摘要进入 Dossier、Cycle、Run 报告或原始证据，再进入对应会话追问。

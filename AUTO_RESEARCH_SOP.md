# Auto Research Collaboration SOP

更新日期：2026-09-08

本文件是 Auto Research 的**组织、Chat、WIP 与用户交互协议**。它保证用户可以继续用自然语言派活、纠偏和追问，同时让 Orchestrator Authority Tree、Track Mentor 与 Student 对当前授权、下一证据和完成条件形成同一理解。大框架与文件模块见 [`system/architecture/FRAMEWORK.md`](system/architecture/FRAMEWORK.md)。

按一次课题的实际执行顺序阅读，见[完整工作流程](docs/WORKFLOW.md)。GitHub 文档提供行为合同；文中的 registry、运行适配器、具体 Student 文件和平台配置需要在部署工作区核验，不能由文档推断已部署。

## 0. 权威边界与按需入口

- 遇到角色、Candidate、Evidence、Paper Project 等术语边界，读取 [`CONTEXT.md`](CONTEXT.md)。
- 人类启动 Track Mentor 或 Student，先从 [`START_HERE.md`](START_HERE.md) 复制一条短 `/goal`；不运行 Prompt renderer。
- Execution Controller 的 recurring Plan 只引用 [`templates/execution-controller-goal.md`](templates/execution-controller-goal.md) 并执行一轮 patrol；不在定时 Prompt 里内嵌整篇 SOP。
- 涉及论文审计、Problem Gate、Claim、Experiment、Run、Artifact、Decision 或 Settlement，读取 [`OPERATIONS.md`](OPERATIONS.md)。
- 涉及实验报告字段与归档，读取 [`experiments/EXPERIMENT_REPORTING_STANDARD.md`](experiments/EXPERIMENT_REPORTING_STANDARD.md)。
- 涉及 GPU、SSH、Watch/Job、HDFS 或挂载，读取部署工作区的 `infra/GPU_RUNBOOK.md`，并重新做 live probe；该机器相关文件不随 GitHub 文档发布，旧卡量不是当前事实。
- 涉及 GPT Pro、Project Sources 或 Bridge round，使用相应本地 Bridge skill；面向用户只区分“Pro 对话”和“关键结论审计”，底层校验码只留在 Bridge 运维记录。
- 当前 Chat binding、任务和严格 Bridge 状态从带时间戳的 registry、运行观察和 Bridge 回执恢复；Dashboard operations projection 是它们的派生入口，过期时回查事实源，不从本文冻结计数。

本文件不保存 Candidate 当前状态、动态 GPU 数量、HDFS 权限或某一轮实验结果。

## 1. 目标组织

```text
User / PI
  ↓ default entry: program intent, correction and authority
Primary Portfolio Orchestrator：唯一默认入口与全局组合视图
  ├─ Scoped Portfolio Orchestrator（0–N）：非重叠子组合的进度、议程、WIP
  ├─ Research Orchestrator：科研战略、跨线会诊、分歧包、Pro Teacher 接口
  └─ 6 × Track Mentor
      ├─ 1–3 × Student
      │   └─ one stable Mission, evolving Research Line, CC/Codex execution sessions
      ├─ 0–1 × Execution Controller coverage while Students are active
      │   └─ one Controller Task may cover multiple declared Mentors only with disjoint Student scope and one writer
      └─ Engineer Task（0–1, incident only）
          └─ created by Mentor only after `needs-engineer`; closes after verified return

Student → scientific Handoff / Judgment Delta → Track Mentor
Execution Controller → operational delta / escalation → Track Mentor
Track Mentor → local verdict / Team Knowledge Entry → Portfolio Orchestrator

Horizontal capabilities: External Pro Teacher · Execution Control Plane · Canonical Research State
```

### Orchestrator Authority Tree

Orchestrator 是一棵以 Primary Portfolio 为唯一默认根节点的**宏观控制权力树**，不是多个同级、同权、都能给全体下命令的“总指挥”。Scoped Portfolio 与 Research Orchestrator 都有明确 parent、scope 与回流合同；角色存在不等于必须创建 Chat。

| 角色 / 能力 | 主要输出 | 可以决定 | 不可以决定 |
| --- | --- | --- | --- |
| Primary Portfolio Orchestrator | Leader brief、跨 scope 决策议程、全局 WIP 与优先级 | 用户消息如何路由、跨组合冲突何时上移 | Track 的科学结论、Student 的代码实现、Run 结果语义 |
| Scoped Portfolio Orchestrator | 非重叠子组合的 bounded view 与 Handoff | owned scope 内的呈现和已授权调度 | 越过 owned scope、成为第二默认入口 |
| Research Orchestrator | Peer Diagnostic Round、分歧图、Teacher Packet | 谁参加会诊、问 Pro 的单一决策问题 | 全局资源分配、Track verdict、Evidence / Decision 写入 |
| Execution Controller Agent | 定时 patrol、运行 checkpoint、有界修复、incident learning 与 Mentor delta | 已授权 envelope 内的执行顺序、例行自愈和技术升级 | 选择 Claim、解释科学结果、接受 Handoff、冒充 Orchestrator |
| Engineer Task（按需） | 一个 `engineering_incident` 的根因、修复、测试与回滚凭证 | 在 Packet 写入边界内修复该 incident | 常驻巡检、接管 Student、做 Mentor 科研裁决 |

Primary 可以在小规模时兼任 Research 协调；只有出现持续的跨 Track 科研议程、独立输出合同和明显上下文污染后，才拆出 Research Orchestrator Chat。Scoped Portfolio 仅在存在长期、非重叠子组合时创建。Execution Controller 可以有自己的长期 Codex Task 和定时计划，但它是 Mentor 背后的运行代理，不是 Execution Orchestrator 或第二人工入口。Controller Agent 使用 Execution Control Plane 的 Watch、Job、GPU/HDFS、registry 和 Run 工具；Agent 是执行身份，Plan 是定时策略，Plane 是工具与事实层。

Portfolio Orchestrator 是**可多实例化的角色族**。系统始终只有一个用户默认入口 `Primary Portfolio Orchestrator`；新增实例必须登记 `portfolio_id + owned_scope + excluded_scope + parent_portfolio + decision_boundary + writer_scope + handoff_target`。Scoped Portfolio 只管理互不重叠的 Track / Candidate / program slice，并通过 `portfolio_handoff` 回流 Primary；它不是新的最高权力中心。

新增长期 Orchestrator 必须同时满足四个 admission gate：有持续队列而不是一次性任务；有与现有角色不同的输出合同；有互斥、可审计的 authority boundary；有自己的完成/降级条件。若一个问题能在一次 Handoff 内结束，就创建 bounded coordination task，不升级成 Orchestrator。持续队列消失后允许合并回 Primary，避免控制层只增不减。

每个动作必须登记恰好一个 `primary_owner`、一个 `decision_owner` 与一个 `writer`；三者可以是同一 Chat，但不得有两个 writer。不同 Orchestrator 通过同一 registry、Handoff 和 `instruction_delta` 协作，不通过互相覆盖的临时 Prompt 争夺控制权。

完成标准：任何时刻都能回答“谁在做什么、基于哪个 revision、下一证据是什么、什么会停止、谁能决定、谁能写、哪些动作尚未授权”。

### Track Mentor

长期负责恰好一条 Track。维护方向论文与 benchmark 地图、Candidate portfolio、Student roster、Lead 标签和团队知识，但只通过有界事件工作。一次 Mentor `/goal` 至多处理一个 `admit-mission / review-handoff / review-incident / review-portfolio` Action；完成或阻塞后停止，不自动串联另一个 Action 或启动 Student。

- `admit-mission` 决定 Seed/fork 是进入现有 Mission、形成新 Mission、保留还是拒绝；只冻结 Mission envelope、Seed Question、Claim ceiling、资源边界和 Handoff contract，不替 Student 预先冻结 exact estimand、Claim、baseline、falsifier 或方法。
- `review-handoff` 只复核一个 Student Cycle，给出 accept/modify/reject 与 Continue/Narrow/Park/Kill，并在继续时接受一个 Next Evidence。
- `review-incident` 只复核一个已显式送达的 `engineering_incident` Packet，给出 dispatch/changes-requested/reject；派发一个有界内部 Engineer 后即结束，技术终态回到 Controller，科学所有权留在原 Student/Cycle。`to.thread_id=unknown` 不是送达凭证。
- `review-portfolio` 只处理一次 roster、Lead、重叠、fork/merge/park、复核容量或优先级裁决。

每个 Action 写入 `MENTOR_WORKSPACE.yaml + mentor-cycles/<id>.md`。这套状态只记录运营裁决，不复制 Student 科学状态，也不替 canonical Settlement。

Mentor 另有一条**每日观察泳道**，但它不是第五种 Mentor Action。每日 heartbeat 读取该 Track 所有 active Student 的 `MENTOR_DOSSIER.md`，把每个新 digest 固化为不可变快照并写入 `mentor/REVIEW_QUEUE.yaml`。Mentor 扫完所有 `new` 项：普通、连贯进展记为 `observed`；真实科学歧义、Evaluator 缺陷、Claim 链不完备、scope 决策或 Student 明确提问记为 `needs-review`；一次最多深审一项，其余留在队列。每日结果追加到 `mentor/daily/<YYYY-MM>.md` 并更新 `mentor/CURRENT.md`。只观察、不指导是正常终态；该泳道不得创建 Mentor Cycle、改变 Student/Cycle、调用 Pro 或写 canonical state。

深审通过 `mentor/reviews/MR-*.md` 交付，并由 adapter 把 review URI + SHA-256 写入 Student `MENTOR_INBOX.yaml`。Student 在安全 checkpoint 独立判断后把 `observed / applied / challenged` 及证据写入 `MENTOR_ACKS.yaml`，继续自己的 self-loop。Mentor 可能判断错，因此 Review 是有来源、有边界、可反驳的指导，不是对 Student 科学状态的远程覆盖。

完成标准：当前 Mentor Action 有明确 verdict 或 blocker、下一 owner 和写入边界；同一 Mentor 没有第二个 live Action，同一研究对象没有两个 writer。

### Execution Controller Agent、Control Plan 与按需 Engineer

Execution Controller Agent 是 Mentor 背后的长期运行角色。只要 declared scope 内有 active Student、Lab、Job 或未结束 Run，Controller 就可以保持一个独立 Codex Task，由 recurring Execution Control Plan 每次唤醒一个 patrol tick。它的长期身份由绑定、checkpoint 和 ledger 保存，不依赖同一条无限增长的 Chat transcript；没有可看护对象时暂停计划，不删除历史。

每条 Track 同时最多接受一个 active Controller coverage。一个 Controller Task 可以覆盖多个 Track / Mentor，但 registry 必须逐项声明 `ownedTrackIds + mentorRoleIds + studentIds + writerScope`，每个 Student 只能归入一个 active Controller，所有 writer scope 必须互斥，运行 delta 也必须按 Track 分开返回。若这些条件任一不成立，就拆成独立 Controller，而不是靠同一 Chat 隐式共享上下文。

一轮 patrol 固定执行 `恢复绑定与上次 checkpoint → 分开核对 Task / Research / Resource / Experiment → 比较 delta → 观察或有界修复 → readback → incident learning → 恢复原 Student/Cycle → 紧凑返回` 。同一 Controller 一次只有一个 active tick；定时任务只引用 [`templates/execution-controller-goal.md`](templates/execution-controller-goal.md)，不每轮复制整篇 SOP。

Controller 默认直接处理 ownership 明确、低风险、可逆、不离开现有 Student/Cycle/resource envelope 的运行问题，并且对每个 effect 做 readback。它可以恢复自有 CC/tmux/session、重试有界 transport/read-only probe、修正路径/参数/引用、恢复已绑定的进程或 Run、验收资源与存储凭证，以及应用已接受的 runtime prevention rule。它只在实际发生 delta、自愈失败、持续停滞、需要 Engineer 或新权限时通知 Mentor；普通健康 tick 和成功小修复只进账本。

Engineer 不是常驻角色。只有 Controller 输出 `needs-engineer` 后，Mentor 才用一份不可变 `engineering_incident` Packet 临时派发内部 Agent；只在用户明确要求一个可见新 Chat 时才创建用户可见 Engineer Task。Engineer 修复一个 incident 并返回 patch、验证、剩余风险和 rollback；Controller 读回技术终态，Student 回到原 Cycle，Engineer 随即结束。

Mentor 消费两条不混合的信息流：Student 通过详细 Dossier 返回 `Research Question + Proposal/实现 + 全部阶段结论与失败 + Evidence/Run/日志指针 + Judgment Delta + Next Evidence + Mentor question`；Controller 只返回 Run/资源转移、incident/修复、停滞、剩余风险和下一运行动作。Controller 可以引用 Student artifact，不替它重新解释科学结果。Mentor 是默认人工入口；只有缺少用户权限或必须由用户选择的科研分歧才上移。

Controller 对每个首次 incident 执行 `before evidence → root cause/confidence → 最小修复 → after readback → prevention target → validation → live-session correction → recurrence check`。重复人工动作、相同 `recurrence_key`、自愈失败、Engineer 与 User 上移都是控制系统的改进信号。一类杂活只有在“已自动化、已消除，或已收敛为精确 fail-closed escalation”后才算关闭；目标是介入率持续下降，不是降低证据、安全或验收门槛。

完成标准：每个 tick 都终态化；每个未解 incident 有唯一 owner 与 unlock condition；相同故障不需要 Mentor/User 重复手工指挥。

### Student

一个 Student 绑定一个稳定 Mission，并维护一条可版本化的 Research Line lineage，负责从调研、问题重构、Proposal、实现、实验到条件 Handoff 的端到端轨迹。Mentor 只给 Seed Question 和边界；证据驱动的 refine、narrow、generalize、reframe 或 sequential pivot 留在同一 Student。只有两个问题必须并行、能独立生存且具有不同 Claim / kill rule / evidence regime 时才 fork。

Repository-bound 长任务通过 Track / Student `GOAL.md` 启动。一次 Mentor `/goal` 只处理一个 Mentor Action；一次 Student `/goal` 绑定一个 Mission、当前 Research Line revision 与唯一 live Cycle：恢复唯一 live Cycle，或仅在 `create-ready` 时创建一个。Cycle 跨 session 持续追加 Research Round；每轮 Stage Settlement 后选择下一证据。平台中断只留 checkpoint；多个 live Cycle 才是 writer conflict。

Student 的完整实验日志、参数、代码改动、Run 报告、成功/negative/failed/invalid 结果和过程数据仍分别留在 Cycle、Run package 与 Evidence Store。`MENTOR_DOSSIER.md` 不是第二份日志，而是每个 material Stage Settlement 更新的详细组会报告：把 Research Question、Proposal、实现、结果、Claim 前后变化、竞争解释、失败经验、当前 Next Evidence 串起来，并只引用原始资产的 URI + digest。这样 Mentor 可同时理解多个 Student，而不必加载每个 Student 的完整 transcript。

Student 实际运行两条嵌套闭环。**科研闭环**是 `恢复绑定 → 学习/证据审计 → 定义问题与 Claim → 冻结 Run Spec → 远端验证 → 独立 Review → Stage Settlement → 下一 Round`；它持续更新研究判断。**运行改进闭环**是 `事故 → 原始证据 → 分层根因 → 最小修复 → readback 验证 → 回写权威规则 → 同步当前 Session → 恢复科研 checkpoint`；它持续更新 Student 的执行系统。任何运行或协议问题第一次出现就进入第二条闭环，不要求重复发生后才处理。

运行改进只修改拥有该规则的单一来源：跨 Student 的研究行为写入 `templates/student-goal.md`，GPU/SSH/MLX 操作写入 `infra/GPU_RUNBOOK.md`，tmux/Claude 传输恢复写入 `scripts/claude-student-tmux.sh`，科学有效性写入 `OPERATIONS.md` 或实验报告规范。Student 只在自己的 write scope 内完成即时修复并提交 prevention candidate；Execution Controller Agent 是声明范围内 runtime checkpoint、共享运行 ledger 与已授权 prevention source 的唯一 writer。文件变更不会自动改变已经加载旧 Prompt 的会话，因此每次已应用修复还必须向同一 Student Session/Cycle 发送有界纠偏，不能重建 Cycle 来“吃到新 Prompt”。

当前 Program standing authorization 采用 **Container-first**：每个 active Student 在产生 Claim-bearing Run 前，先自主恢复或申请并维护**至多一台独占的、容量验收合格的远端交互式 Student Lab**。默认目标是 `4–8 GPU`；当 fresh 全量 quota/queue 快照没有可行的 4–8 卡 Stable 路线，或其预计 `time-to-verified-useful-workload` 明显更差时，允许把**恰好 `2×H20`**作为 compact fallback。该 fallback 必须在申请前证明首个冻结 workload 的显存、并行度、CPU/内存、存储恢复和 survival 计划在两卡内成立，并在分配后重新通过双卡拓扑/NCCL、framework、真实模型加载与 useful-SM Gate；它是一台完整的单一 Lab，不是“先占两卡再另开第二台”的许可。优先使用 Stable Worker / DevBox；Stable 不可得时可使用能进入 Shell 的 GPU Job container。A100/A800 80G、H20 与 L20 都可在实际模型和显存适配后使用。Lab 是 Cycle 启动后的执行基线，不等待某个 Idea 被预先标成 GPU-bearing；CPU Probe、API client、检索/评测、模型推理与训练都从该容器运行。本地 Mac 只承担论文、源码阅读、代码编辑、静态检查、打包和终端控制，本地 smoke 不形成 Evidence。

Lab lifecycle 是资源维度，不是 Student 的整体工作状态。申请、排队、验收、资产恢复或 Job 运行时，Execution Controller Agent 通过 Control Plane 异步维护资源泳道，Student 继续科研泳道；一个分支的 Test 被资源阻塞时，转向同一 Mission 内能更新判断或减少后续实验延迟的其他工作。只有明确盘点后所有有用分支都必须等待未可用容器，才能把整个 Cycle 标为 resource-blocked。具体并行行为以 `templates/student-goal.md` 为唯一行为来源。

Lab 随 Student 而不是随单个 Idea 或 Run 生命周期：Idea Variant 切换、Run 结束、Stage Settlement、Cycle/Handoff 或 coding-agent session 结束都不自动释放。固定 commit 的长训练、全量 Benchmark、多 seed 或不需要交互调试的工作另提交 Job；当前 standing boundary 覆盖单个 Job 最多 8 GPU，且同一 Run 只保留一个有效提交。Student 在 Job 排队/运行时继续使用自己的 Lab 推进其他分支。

Lab 内从 compact `2×H20` replacement 切换到 4–8 卡、在 4 与 8 卡间调整、或把已分配 GPU 分成多个有用实验 slice，不需要再次询问用户，但必须保持同一时刻只有一个有效 Lab/request，并让 replacement 重新完成全套验收；每个 Run 仍需独立 Spec、resource ceiling 和科学 Gate。第二台交互 Lab、单台超过 8 卡、未授权存储根或其他明显扩大资源边界的动作才需要新授权。

开发资源 Worker 的运营顺序固定为 **`verified → survival gate → scientific scheduling → efficiency`**。每次申请与验收都必须从实时 Watchdog 页面记录 rule ID/version、metric、比较符、告警窗口、查杀窗口和核验时间；旧通知、旧版本和聊天中的阈值不能覆盖 live rule。2026-08-24 核验到的规则 `wdr-20260813143812-pnhp9` V3 是 Worker 级 `SM 利用率 <= 25%` 持续 4 小时告警、持续 8 小时强制回收、全天生效。Program 因此把监控口径下 **`>30%` 的真实有用 SM** 设为当前 survival target 和安全缓冲，而不是把 `30%` 误写成平台查杀阈值或永久保证。模型驻留显存、占满 VRAM、PID/端口存活、CPU/API 活动都不能替代 SM；告警中的“确认并屏蔽”也不等于获得规则豁免。4 小时告警后优先恢复真实可复用 workload、checkpoint 或主动 drain；若没有合法工作能达到目标，就保存资产并释放/接受回收，禁止 synthetic burn、空转 kernel 或无意义负载保活。达到 survival target 只证明 Lab 暂时能活，不构成科研进展、Run 有效性或扩容理由；详细操作与动态事件证据只写入 `infra/GPU_RUNBOOK.md`。

完成标准：每个 Round 有可核对 Stage Settlement；只有真实 Handoff 边界才结束 Cycle。Chat 变长、代码写完、Job 结束或一个 Idea 被 Kill 都不是终点。

### Pro Teacher

远端 Web GPT Pro 是外部指导工具，不是组织层、本地执行 Agent 或科学证据 owner。它适合 Idea brainstorming、跨论文综合、novelty pressure、reviewer objection、Claim ceiling 和实验叙事；不负责读取 live repo truth、写具体代码、排查 shell、监控 GPU/HDFS 或判定 Run 是否有效。

完成标准：每次调用只回答一个决策问题，原始回答留存，随后由本地 Codex 和科学 owner 给出 accept / modify / reject verdict。

### Team Knowledge Entry

由 Mentor 在本地复核后写入。成功和失败都必须记录来源、适用范围、不适用条件、反例、Run/Artifact/Decision 指针和下一次使用方式。

不是每个 Handoff 都要创建 Entry。只有经验可跨 cycle 或跨 Student 复用、来源和适用边界完整时才晋级。完成标准：另一个 Student 能判断该经验是否适用于自己的设置，而不是只看到一句“这个方案有效/无效”。

## 2. WIP：每线 1–3 个 Student，Lead 只是标签

每条 Track 常态保留 `1–3` 个可执行 Student Mission。`create-ready` Student 只有目录、Mission、Research Line lineage、writer boundary 与 Handoff contract，不等于 Chat 已被观察或 Cycle 正在执行。`codexThreadId` 只证明某个 Chat binding 被观察；科学执行是否 active 由 Student workspace 中唯一 live Cycle 决定。尚未达到独立 Mission 门槛的对象叫 `Research Line Seed`，只留在 Mentor backlog。

| 概念 | 数量 | 是否创建 Student Chat | 作用 |
| --- | ---: | --- | --- |
| Create-ready Student Mission | 1–3 | 否 | 已有稳定 Mission、workspace 与文件入口，当前没有 live Cycle |
| Active Student Cycle | 受 Mentor/WIP 约束 | 可有可无 | 一个 session 正在写该 Mission 的唯一 live Cycle |
| Lead label | 每 Track 最多 1 个 | 不额外创建 | 标出当前最值得制造下一证据的 Student；可转移 |
| Research Line Seed | 0–N | 否 | 只保留来源、Brief 草案与解锁条件；尚不是 Student |

第二或第三个 Student Mission 只有同时满足以下条件才创建或激活：

1. 已有 Student 的 Mission、writer boundary、Handoff contract 和 Mentor 复核容量清晰；
2. 新 Mission 或并行 Research Line 有独立的问题后果、ownership boundary 与 Claim ceiling，并且不能作为现有 Mission 内的顺序修订；具体 Claim、falsifier 和 kill rule 由 Student 在首个真实 Cycle 冻结；
3. 它能推翻、收窄、替代或补足现有线，而不是并行实现同一 Idea Variant；
4. Mentor 没有超出其可及时复核的 Handoff 容量；
5. 不争用同一 canonical writer、浏览器会话或不可并发资源；
6. 其 evidence-producing cycle 落在当前 standing resource envelope 内，或已获得扩容授权。

### 组合级上限

- Track roster 的推荐范围是 `1–3`，不是自动配额，也不要求六条线平均；
- 同时运行多少远端、成本型或外部写入的 evidence-producing cycle 由 [`templates/resource-envelope.yaml`](templates/resource-envelope.yaml) 的已授权实例决定；null / unset 不构成额外许可。Program standing Container-first authorization 是默认实例：本地 bounded diagnostics 只能检查语法、依赖和 wiring，不能形成 Claim-bearing Run；
- Program standing authorization 已覆盖“每个 active Student 至多一台容量验收合格的远端容器 Student Lab”：4–8 GPU 为默认目标，满足上述前置条件的 2×H20 为 compact fallback。具体 Worker/Instance、GPU slice、Job 与存储事实仍分别记录在 `system/scheduling/student-labs.yaml` 与 Run manifest；申请到资源不等于某个 Run 获得使用全部卡的科学许可；
- `fit-now / scale-up` 是派生执行队列，不增加 Student 或 Candidate 状态；
- 调高并行度前，必须证明 Handoff → Mentor settlement 没有持续积压。

WIP 衡量的是实际 active evidence cycle 和 Mentor review load，不是 Candidate、Chat、论文、目录或 Experiment 数量。

## 3. 用户交互路径与六类控制动作

用户的默认交互应从高到低下钻，而不是每天同时维护所有 Chat：

1. **看全局、改优先级、问下一步**：找 Primary Portfolio Orchestrator；它是默认入口。
2. **聚焦一条方向的论文、Claim、Student 组合和导师判断**：进入对应 Track Mentor。
3. **聚焦一个具体研究对象、代码改动或实验**：进入拥有该对象的 Student。

用户不需要手工重写 Student 全量状态。Agent 在同一仓库内通过 `WORKSPACE.yaml + cycles/ + ASSETS.yaml` 完成恢复；Student 用 Dossier 回收阶段性认知，Mentor 用 Review Queue、Daily Journal 与 digest-bound Review 观察和指导。`MENTOR_WORKSPACE.yaml + mentor-cycles/` 仍只恢复一个有界 Action，不能与每日观察队列混为一谈。只有其他真实跨 Chat/仓库 payload 才生成 Communication Packet。Mentor settlement 进入 canonical state 后，Portfolio view 才能派生更新。若用户直接在 Mentor 或 Student Chat 中改变目标、预算或 stop rule，该 Chat 必须生成一条 `instruction_delta` 向上同步；在上层接收前，它只改变被点名的局部 scope，不得静默改写整条 Track 或组合策略。

### 六类控制动作

用户不需要填写模板。收到消息的 owner 必须把自然语言归入以下一种主动作；跨 Track 或宏观消息默认由 Portfolio Orchestrator 编译。一句话包含多个动作时，说明执行顺序。

| 动作 | 常见表达 | 默认权限 |
| --- | --- | --- |
| Inspect / 巡检 | “看看目前发生了什么”“这个是不是挂了” | 只读恢复状态，不发送、不创建、不运行 |
| Steer / 调向 | “这条线优先做这个”“先研究 retrieval” | 改优先级和建议，不自动产生高影响写入 |
| Continue / 推进 | “确认没问题就继续”“你看着做” | 只推进当前已登记 Next Evidence，不扩 scope |
| Correct / 纠偏 | “不是这样”“以后不要每次覆盖 Sources” | 对指定维度产生 protocol delta；其他规则继续有效 |
| Authorize / 授权 | “开始跑实验”“把六个 Student Chat 开出来” | 只授权消息明确覆盖的 effect 与目标 |
| Settle / 结算 | “把成功失败沉淀下来”“结束这轮” | 触发 Handoff、Mentor verdict、Knowledge promotion check 和必要 Settlement |

问题句默认是 Inspect，不是操作授权。“可以吗”“是不是”不等于“现在执行”。

## 4. Control Receipt：把自然语言变成可执行合同

Control Receipt 只在**写入、授权、跨 Chat 路由或真实权限歧义**时展示。普通只读巡检和单一 scope 内的低风险推进用自然语言说明即可，不强迫每条消息填写表格。需要 Receipt 时使用最小字段；无需等待确认，除非歧义会改变结果或权限。

```yaml
control_receipt:
  intent: inspect | steer | continue | correct | authorize | settle
  scope: PROGRAM | <portfolio> | <track> | <research-line> | <experiment>
  primary_owner: <role/thread-id-or-unregistered>
  decision_owner: <role and thread-id>
  writer: <role and writable scope>
  allowed_effect: "本轮被授权产生的 effect"
  next_action: "现在真正要做的一件事"
  stop_condition: "完成、停止或请求用户的可见条件"
```

### 指令优先级

1. 同一 scope 和维度内，最新明确指令覆盖旧指令；
2. 局部纠偏只覆盖被点名的维度，不自动取消证据、安全和权限规则；
3. “暂时忽视 blocker”只改变调度，不得把 blocker、source drift 或缺失 ledger 写成已解决；
4. “继续”只指向当前已接受的 `Current Next Evidence`；新增模型、数据、GPU 规模或外部写入属于 scope expansion；
5. “确认没问题后执行”要求先展示条件核验结果，再执行；
6. read-only、create-ready、planned、queued、allocated、running、completed、settled 必须使用原本状态名，不互相代替。

### 何时提问

只在以下情况向用户提一个精确问题：

- 两种解释会产生不同的外部写入、费用、数据风险或研究结论；
- 缺少 Paper Project、Kill/Split/Merge 或真实 GPU Run 所需授权；
- 无法确定哪个 Chat 拥有写权；
- 用户最新纠偏与仍有效的硬边界直接冲突。

其他低风险歧义采用最窄可行解释，记录假设后继续。

## 5. 标准运行循环

### Step 1 — Recover

接收请求的 Portfolio Orchestrator 优先读取其 owned scope 的 Chat registry、canonical revision、未结算 Handoff 和相关 live resource state；registry 尚未创建时，只能使用带时间戳的审计 receipt，并把缺失 binding 标为 unknown。PROGRAM 请求由 Primary 负责聚合。只读状态恢复不得使用旧快照计数冒充当前事实。

完成标准：分别给出 Task、Research、External Review 和 Resource 状态；无法验证的字段标记 unknown。

### Step 2 — Route

Primary 或 owning Scoped Portfolio Orchestrator 把用户意图路由到一个 Track Mentor、已有 Student 或 Research Orchestrator；已经接受的实验执行由 owning Student 保持科学责任，Execution Controller Agent 使用 Control Plane 派生队列、监控和修复运行泳道。跨 scope 问题回到最近共同 parent portfolio，并指定一个 primary owner；其他参与者只提供 read-only interface 或 pressure。

完成标准：`primary_owner / decision_owner / writer` 明确；恰好一个 writer；没有两个 Chat 接到相互覆盖的 canonical 写任务。

### Step 3 — Brief

只有 `admit-mission` Mentor Action 接受了一个 Mission，或 `review-handoff` 接受了下一轮时，Mentor 才下发/更新粗粒度 Research Line Brief：

```yaml
research_line_brief:
  track:
  mission_id:
  student_mission:
  seed_questions: []
  research_line:
  starting_revision:
  candidate_or_opportunity_refs: []
  problem_and_consequence:
  evidence_boundary:
  claim_ceiling:
  excluded_claims: []
  starting_evidence_or_question:
  resource_boundary_or_request:
  return_when:
  required_handoff:
```

Brief 提供 Mission 边界、科学上限和回交合同，不提供完整解法，不复制整个 Mentor transcript，也不替 Student 冻结 exact estimand、Claim、strongest baseline、falsifier 或方法。Student 在真实 Cycle 内通过证据审计形成这些对象。

完成标准：一个陌生 Student 仅依靠 Brief、canonical pointers 和 primary sources 就能开始界定问题；关键未知项明确为 unknown，且没有把假设冒充已接受的 Claim。

### Step 4 — Bind and launch

只有用户明确授权一个稳定 Mission 且 `admit-mission` 已完成边界裁决后，才从模板建立新的 Student 文件夹并登记 `track + Mission + Research Line lineage + Candidate/Opportunity pointers + writable scope`。`GOAL.md`、`CHARTER.md`、`WORKSPACE.yaml`、`ASSETS.yaml`、`cycles/`、`MENTOR_DOSSIER.md`、`MENTOR_INBOX.yaml` 和 `MENTOR_ACKS.yaml` 完整时进入 `create-ready`；这不等于 Chat 或 Cycle 已运行。迁移进来的 Bootstrap Import 只作为 provenance 指针，不制造待审 Handoff，也不阻塞首个真实 Cycle。

启动时，用户在仓库根目录粘贴该 Student `GOAL.md` 的短 `/goal`。本次调用直接从文件恢复唯一 live Cycle，或在没有 live Cycle 且 Workspace 为 `create-ready` 时创建一个。若平台暴露稳定 task ID，可把它作为 observation 写入 registry；缺少 ID 保持 unknown，不阻塞文件恢复，也不伪造 active Chat。Student 的 primary Pro conversation 和独立 probes 同样只在真实 ID 可见时登记。

完成标准：owner 与 writer scope 唯一；GOAL 指向正确文件；恰有一个 live Cycle 或尚未启动；canonical revision、Next Evidence 与必要的 `instruction_delta` 可追溯。Chat ID 不是执行前置条件。

### Step 5 — Independent Deepen

Student 在同一 live Cycle 内反复执行：`学习与证据审计 → failure/problem → competing explanations → Question/Claim → Cheap Probe → reproduction → controlled improvement/new-problem validation → Review → Stage Settlement → 下一分支`。每一步必须完成，或记录 `not-applicable` 的原因和解锁证据。

每轮把 `before → evidence → after → consequence → Next Evidence` 追加到 Cycle，并更新 Workspace/Assets。一个 Idea 被 Kill 或一条分支等待数据/GPU 时，转向另一个高信息增益的 in-Mission 分支。只有 Brief/绑定冲突、跨 Mission fork、高影响授权、Mission 穷尽或所有安全分支阻塞才返回 Mentor。

每个 material Stage Settlement 同步更新 Dossier；每次恢复与 Settlement 后只读取 Inbox 中当前且 digest 匹配的 Mentor Review。Student 对新 Review 先留 `observed`，随后基于自己的证据选择 `applied` 或 `challenged`，不因 Mentor 建议自动改 Claim、Run Spec 或路线。Dossier 新 digest 由 adapter 固化后进入 Track Review Queue；Student 不直接写 Mentor 队列，Mentor 也不直接写 Student Dossier。

在任何 peer discussion 或 Pro consultation 前，Student 先冻结一份独立 memo：当前 Claim、依据、关键假设、最强反例、falsifier、最担心自己错在哪里。这样可以区分真正独立判断与被他人首轮答案锚定后的附和。

完成标准：每轮形成可证伪 Claim、明确 no-material-change/kill pressure 或可核验 blocker，并留下独立 pre-analysis 与下一证据；随后继续下一轮。

### Step 6 — Peer Diagnostic Round（按需）

Research Orchestrator 仅在跨 Student 比较能改变决策时组织一次临时会诊，通常选择 2–3 个相关 Student，不把六条线全部拉入常驻群聊。会诊不是新的 canonical owner，也不要求参与者共同编辑同一研究对象。

会诊固定使用以下顺序：

1. 参与 Student 各自提交已经冻结的独立 memo；
2. 只交换 Claim、Evidence pointer、assumption、falsifier 和 decision consequence，不倾倒完整 Chat；
3. 每个 Student 可以更新观点，但必须写出 `before → peer input → after`；
4. Research Orchestrator 输出 Teacher Packet：共同事实、暂时共识、未解决分歧、少数意见、缺失证据和一个单一决策问题；
5. 不以投票、聊天热度或“大家都同意”形成 Evidence / Decision。

完成标准：分歧被保留为可检验命题；每个主张能追溯到原 owner 与证据边界；一个 owner 能把 Teacher Packet 交给 Pro 或直接设计 Cheap Probe。

### Step 7 — Pro Teacher Consultation（按需）

在以下情况之一成立时才调用远端 GPT Pro：需要高层 Idea brainstorming；多个竞争解释无法仅靠现有证据裁决；需要 novelty / reviewer / experiment-story 压力；或新实验结果改变了原 Claim、关键假设、证据上限或下一实验选择。

一个科学对象复用一条 persistent Pro Chat，一轮只提交一套 Proposal 和一个决策问题。Program-level Chat 归 Research Orchestrator，Direction-level Chat 归 Mentor，Student-level Chat 归 Student。Project Sources 只提供稳定共享背景，volatile evidence 使用 immutable task bundle。

不要为编译错误、依赖安装、命令修复、Job 排队、GPU 使用率、日志 tail 或例行实验监控调用 Pro。具体实现与 live state 留在本地 Codex。

完成标准：原始回答保存，本地 Codex 与 decision owner 给出 accept / modify / reject verdict；Pro pressure 未直接写成 Evidence。面向用户称为“Pro 对话”；若要声称关键结论经过完整审计，还必须保存 `codex-snapshot → gpt-exchange → codex-verdict` 链。底层 `receipt-observed / strict-round-verified` 只在 Bridge 运维与调试记录中使用。Project Source drift 影响后续路由准备度，但只要旧回合使用的 bundle/source observation 与 verdict 已保存，就不追溯抹掉它。实验后只有出现 decision-relevant evidence delta 才复问，不按固定轮次反复咨询。

### Step 8 — Implement and Experiment

Student 按顺序执行：

1. reproduction；
2. controlled improvement；
3. new-problem / new-proposal validation。

新机制的收益只有在其依赖的 claim-bearing baseline 已复现或存在 scope-matched 可信复现时才可解释。每个被解释的 Run 都必须留下 `Idea/Claim before → observed result → Idea/Claim after`；复现 mismatch 先进入实现、数据、evaluator 与配置归因，不得记成新方法的正负证据。

Student 拥有代码与科学解释；Execution Controller Agent 使用 Control Plane 恢复、验收和长期看护 Container-first Student Lab，再对已接受的 Spec 派生 `fit-now / scale-up` 队列，并在 standing resource boundary 内处理 Job、GPU/HDFS、checkpoint、日志与报告完整性。Student 仍可自主申请和配置自己的 Lab；Controller 负责唯一共享 registry 写入、读回验收、异常恢复与持续性。

一个 active Student 的默认执行拓扑是：`一台先建立的独占、容量验收合格的远端容器 Student Lab（4–8 GPU preferred；2×H20 compact fallback）+ 零到多个由已冻结 Run Spec 派生的异步 Job`。Student 在申请前先把 source lock、首个真实 GPU workload、模型/环境包、数据 snapshot、checkpoint 与 evaluator 准备到可复用存储；再从 fresh 全候选快照按预计到达可运行状态的时间选择路线，而不是固定先试某卡型。Worker 一旦 `verified`，先启动已冻结的真实 GPU workload 并通过当前 survival gate，再安排 CPU/API Cheap Probe、论文复现、交互调试、Idea A/B/C、对照、消融和训练，避免把低利用率时钟消耗在重复下载与环境重建上。每个 Run 用 `CUDA_VISIBLE_DEVICES` 或等价机制声明自己的 slice。Cheap Probe 决定成本和 slice，不决定执行位置。需要固定 commit、长时间、全量 Benchmark、多 seed、可抢占恢复或更大规模的 Run 才进入 Job lane。Job 完成只产生待回收 Evidence，不结束 Student inner loop。

进入单个 Run 的 `scale-up` 前仍须通过 scientific、validity 和 decision 三道 Gate。Survival gate 是基础设施 Gate，不能替代这三道科学 Gate。Lab 已经分配 8 卡或 SM 达标不构成“该 Run 应使用 8 卡”或“研究在推进”的理由；反过来，一个 Idea 被 Kill 或一个 Run 完成也不构成释放逻辑 Lab 的理由。每次真实执行仍需 fresh Run package、实际 GPU/存储验收和不可覆盖归档；物理 Worker 被 Watchdog 回收后，逻辑 Lab binding、HDFS/ByteNAS 资产与 Cycle checkpoint 保留，replacement 必须重新完成硬件、source、storage、真实加载和 survival 全验收。

完成标准：每个 Run 有 manifest、日志、Artifact digest、报告、结果语义和 stop reason；HDFS 输出写入已授权的唯一 Run 路径，不覆盖 dataset 输入目录。

### Step 9 — Stage Settlement and conditional Handoff

每个 Research Round 先在 active Cycle 内追加 working checkpoint；它不是 Handoff 或 canonical Research Event：

```yaml
stage_settlement:
  round_id:
  idea_claim_before:
  evidence: []
  idea_claim_after:
  consequence:
  branch_state:
  next_evidence:
  resume_from:
```

写完后选择下一条未阻塞分支继续。只有显式 stop/settle、writer 或 binding 冲突、跨 Mission fork、高影响权限、Mission 穷尽或所有安全分支阻塞时才形成 Student Handoff。`local CPU evidence ceiling` 不构成边界；必须先检查 Container-first Lab、远端 CPU/API、GPU slice 与 Job 路径：

Student 返回：

```yaml
student_handoff:
  research_line_id:
  cycle_id:
  candidate_ids: []
  brief_packet_and_revision:
  expected_vs_observed:
  idea_claim_before_after:
  evidence_and_artifacts: []
  run_closure:
    execution:
    scientific:
    reproduction:
    archive:
    mentor_settlement: unreviewed
  failure_class: hypothesis | implementation | data | evaluator | resource | none
  root_cause:
  applicable_when: []
  not_applicable_when: []
  counterexamples: []
  reusable_assets: []
  recommended_decision:
  next_evidence:
  knowledge_promotion: not-proposed | proposed
```

同仓库 Handoff 的完整 payload 保存在 Cycle；此时才清空 active pointer 并记录 `last_handoff_cycle_id`。平台或上下文结束但仍有可执行工作时，只更新 `resume_from` 并保持 Cycle active/paused。完成标准：普通 Round 可直接续跑；条件 Handoff 时 Mentor 无需重读 Chat 即可复核，且 Cycle、Workspace 与 Assets 一致。

### Step 10 — `review-handoff` Mentor Action

只有收到条件 Handoff 时，Mentor 才启动一个 `review-handoff` Action，核对 sources、代码、Run/Artifact、Peer Diagnostic、Pro verdict 和 Claim ceiling。只有可跨 Cycle/Student 复用且边界完整的经验才晋级 Team Knowledge Entry；canonical 变化仍由唯一 Settlement writer 完成。

完成标准：Mentor 对这一个 `handed-off` Cycle 给出 verdict，使其进入 `settled / paused / closed` 之一；若继续，同一 Student 的 `WORKSPACE.yaml` 只保存一个已接受 Next Evidence，下一次 Student `/goal` 才创建下一 Cycle。Mentor Cycle 完成并清空 `active_action` 后立即停止；下一 owner、下一证据或解锁条件明确，成功、失败与 inconclusive 都有适用边界。

### Step 11 — Portfolio Rebalance

每个 Scoped Portfolio Orchestrator 只依据 Judgment Delta、有效 Evidence、已采纳 Decision、Mentor review capacity 和真实资源约束调整 owned scope 的 WIP，再提交 `portfolio_handoff`；Primary 只聚合跨 scope 冲突和用户决策议程。Research Orchestrator 可以提供分歧结构，Execution Controller Agent 可以提供成本、队列、介入率与运行风险，但二者都不能替 Track Mentor 做科学排序。

完成标准：组合级 priority / continue / pause 建议有明确依据；用户只收到最多一个真正需要决定的高影响问题；未改变的状态不重复播报。

## 6. Chat reuse、fork 与关闭

### 复用同一 Student 文件空间

同时满足以下条件时复用：

- 科学对象和 primary estimand 不变；
- Claim 只是被收窄或补证据；
- Experiment 是同一机制的 reproduction、ablation 或 confirmation；
- immutable parent packet、`based_on_revision` 与 `instruction_delta` 足以说明变化。

同一 Student 可由连续多个 coding-agent session 恢复；Chat 是否相同不影响研究身份。禁止两个 session 同时写同一 Student。若发现多个 live Cycle，先报告冲突，不自行挑一个覆盖。

### 新建 Student Mission / Chat

出现以下任一情况时提议 fork：

- benchmark、theory、method 或 deployment object 发生变化；
- 新 Claim 在 parent 被 Kill 后仍能独立存活，反之亦然；
- venue/evidence regime、promotion gate 和 kill rule 已独立；
- 继续旧 Chat 会持续造成 scope confusion。

Nested control、普通 ablation、同一 Claim 的第二个实现不自动创建 Student。

### 关闭条件

Chat final 不是关闭，Cycle Handoff 也不自动等于科学 Settlement。只有 Handoff 被 Mentor 接收并完成 settlement，Student 才进入 closed。Paused Student 必须有 unlock condition；Kill 后保留可检索历史和可复用资产。

## 7. GPT Pro Teacher 的三种持久 Chat

- **Program-level Pro Chat**：可选，归 Research Orchestrator；用于跨 Track 战略、组合盲区和会诊综合。
- **Direction-level Pro Chat**：归 Track Mentor，保存长期方向 review、组合边界和 fork pressure；不执行 Student 工作，也不替 Student-level Chat。
- **Student-level Pro Chat**：归一个 Student / Research Line，持续细化同一 Proposal；一次只审一个决策问题。Student 做完本地独立判断后再调用。

三者共享同一种 External Pro Teacher 能力，但 Chat、owner 与 scope 不可互相冒充。Pro 的适合任务是问题重构、相关工作综合、novelty、反例、reviewer objection 与实验叙事；本地 Codex 的适合任务是 repo truth、实现、调试、运行、监控、Artifact 与证据核验。对外只报告“Pro 对话是否完成、本地 verdict 是否完成、关键结论是否经过完整链审计”；底层状态码与 Project Source 边界按 Step 7 处理。

同一个 Student 可以在实现前问一次方案级问题，并在新证据改变决策后再问一次；“已经过了几天”或“又跑完一个 Job”本身不是复问理由。Pro 返回的论文名、数值、代码建议与 novelty 判断都必须在本地重新核对。

## 8. 状态汇报

任何“目前发生了什么”都按四层报告：

| 层 | 必须回答 |
| --- | --- |
| Task | Chat 是否 created/running/waiting/completed/notLoaded，最后可见输出是什么 |
| Research | 当前 Judgment、Evidence、Decision、Next Evidence 与 falsifier |
| External review | Pro conversation 是否存在、回答与本地 verdict 是否完成、关键结论审计链是否完整 |
| Resource | Spec/Run/Artifact、Watch/Job、actual GPU、HDFS read/write 边界 |

只在状态改变、出现 blocker、需要授权或产生 Judgment Delta 时主动汇报；不重复发送 unchanged snapshot。

## 9. 高影响授权

以下动作必须由用户明确授权：

- 创建用户可见的新 Student / fork Chat；
- 创建新的长期 Orchestrator/Execution Controller Chat、新 recurring Control Plan，或改变既有长期角色的权限域；已授权 Controller 为单一 incident 请求内部 Engineer 不在此列，用户可见新 Engineer Chat 仍需明确要求；
- Kill、Split、Merge Candidate；
- 激活 Paper Project；
- 使用超出 standing Student Lab / Job boundary 的真实 GPU：第二台交互 Lab、单台或单 Job 超过 8 卡、同一 Run 重复提交，或其他未获授权的资源扩张；
- 写入新的外部系统位置、覆盖/删除 HDFS 或 Project 内容；
- 同时改变多条 Track 的 canonical ownership。

在已授权 scope 内，primary-source 阅读、只读审计、CPU Cheap Probe、实现调试、报告生成和不改变 lineage 的证据准备默认自主推进。

## 10. 反偏移检查

每次 Handoff 前逐项检查：

- 是否把 Candidate 数、Chat 数、论文数或 GPU 占用当成进展；
- 是否把多个 Student 默认塞进同一交互 Lab，或在一个 Idea/Run 结束后误释放仍活跃 Student 的 Lab；
- 是否有两个 Orchestrator 同时拥有同一优先级、资源或写入决定；
- 是否把 observed control task 冒充已登记 Orchestrator；
- 是否把 Execution Controller 变成第二人工入口，或让它解释科学结果；
- 是否把 Engineer 保留为无 incident 的常驻 Chat；
- 是否同一类手工修复反复出现，却没有 prevention rule、自动化或精确 fail-closed escalation；
- 是否让 Mentor 阅读原始巡检日志，而不是消费 Student 科研 delta 与 Controller 运行 delta；
- 是否把 Mentor 方向 Chat 当作 Student Chat；
- 是否把 Student 当成已承诺论文；
- 是否在 peer discussion 前缺少独立 memo，或用多数意见掩盖少数反例；
- 是否把临时 Peer Diagnostic Round 变成新的 owner 或常驻群聊；
- 是否为代码报错、Job 状态或日志监控调用 Pro；
- 是否在没有 decision-relevant evidence delta 时反复问 Pro；
- 是否把用户对 Student 的局部纠偏静默升级成整条 Track 策略；
- 是否有两个 writer 修改同一对象；
- 是否沿用了被用户纠偏覆盖的旧规则；
- 是否把 `notLoaded`、queued、allocated 或 create-ready 写成 failed/running/created；
- 是否存在无 manifest 的 Run、无 digest 的 Artifact 或无本地 verdict 的 Pro claim；
- 是否把 indexed Source、`verification=verified` 或 abstract-only structured audit 当成 full-source deep-audit；
- 是否遗漏 negative/failed/inconclusive 的适用边界和可复用资产；
- 是否超过 Track 或 portfolio WIP cap。

任何一项为是，本轮不得宣告 complete；先修正状态或明确 blocker。

## 11. 用户可直接使用的自然语言提示

### 从最高层巡检

> 作为 Primary Portfolio Orchestrator 巡检当前所有 portfolio scope，只读恢复真实状态。分别告诉我 Mentor、Student、Pro、实验和资源在哪里；只列 Judgment Delta、blocker、下一证据和最多一个需要我决定的问题，不要用旧快照，也不要执行写操作。

### 聚焦一条 Track

> 进入 M-PHY Mentor 视角。给我当前论文/benchmark 判断、Student roster、当前 Lead 标签、各 Research Line 的最强 falsifier、未结算 Handoff 和这条线唯一最值得推进的 next evidence；不要代替 Student 实现。

### 激活一个 Student

> 让 M-PHY Mentor 把当前 Research Line Seed 整理成粗粒度 Brief，为它创建一个独立 Student 文件空间并把短 `/goal` 加入 `START_HERE.md`。Mentor 不替它实现；我启动后，Student 在一个 live Cycle 内持续推进，直到真实 Handoff 边界。

### 创建第二个 Student

> 检查 M-AI 当前 Lead 是否已经冻结 next evidence 和 stop rule。只有新问题拥有独立 Claim、独立 kill rule，并且能推翻、替代或补足当前 Research Line 时才开第二个 Student；普通 Idea Variant 继续留在同一 Chat。

### 发起 OBD 式 Student 会诊

> 选择 2–3 个真正相关的 Student 做一次 Peer Diagnostic Round。先让每个 Student 独立冻结 Claim、假设、证据、反例和 falsifier，再交换；输出共同事实、分歧、少数意见、缺失证据和一个给 Pro Teacher 的单一问题。不要投票，不要共同改写任何 Student 的 canonical artifact。

### 向 Pro Teacher 请教

> 基于已经冻结的 Teacher Packet，在该 Research Line 的 persistent Pro Chat 里只问一个科学决策问题。保留原始回答，然后由本地 Codex 对论文、代码、数据和 Claim ceiling 做 accept / modify / reject verdict；不要让 Pro 处理编译、Job 或监控问题。

### 条件实验

> 先按 Container-first 在 standing authorization 内为该 Student 恢复或申请并验收一台独占、容量合格的远端容器 Lab：默认 4–8 卡；fresh 全候选快照下没有更快可行的完整路线且 workload 预检通过时，2×H20 可作为 compact fallback。再在其中核对数据、代码、strongest baseline，并执行 CPU/API/GPU Cheap Probe。Lab 跨 Idea/Cycle 复用；固定 commit 的长实验另投 Job。每个 Run 声明自己的 GPU slice、容器身份、报告和 Artifact，不因一次 Run 结束释放 Lab。

### 纠偏

> 纠偏：Project Sources 不再作为 direct research Chat 的全局阻塞，但 strict Bridge 仍要如实显示 source drift 和完整 ledger。把这条 delta 传播给所有受影响 owner。

### 结算

> 结束本轮 Student 工作。整理 success/failure Handoff，由 Mentor 本地复核；只有可跨 cycle 或 Student 复用、边界完整的经验才晋级 Team Knowledge Entry。只把真正需要我决定的一项高影响问题交给我。

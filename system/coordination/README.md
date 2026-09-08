# Coordination Module Contract

本模块负责 file-first Mentor Action 与 Student Cycle 恢复，以及多 Chat 通信的可寻址性、版本和交付确认。它不保存 canonical Research Judgment，不替代 `research-index.yaml`，也不从聊天摘要推断 Evidence。

协议和字段 schema 随文档提供；本文提及的实际 registry、runtime binding、交付账本、会话和脚本需在部署工作区存在并经过验收。其状态按实际 observation 时间读取，不能从 GitHub 文档判断在线情况。

## 日常入口：文件，不是 CLI

人类从 [`../../START_HERE.md`](../../START_HERE.md) 复制一条短 `/goal`，直接指向具体 Track 或 Student `GOAL.md`。Mentor 从 `MENTOR_WORKSPACE.yaml + mentor-cycles/` 恢复至多一个 Action；Student 从 `WORKSPACE.yaml + cycles/ + ASSETS.yaml` 恢复至多一个科学 Cycle。没有 live Student Cycle 且 Workspace 为 `create-ready` 时，本次 Student 调用创建且只创建一个。Node 维护工具不渲染 Prompt，也不承担上下文传输。

## Mentor ↔ Student 文件通信 seam

```text
system/coordination/
├── README.md                         # 本合同
├── registry.yaml                     # create-ready / active Chat 与 Pro binding
├── runtime-bindings.yaml             # CC/tmux 的带时间戳观察，不依赖 codexThreadId
├── mentor-automations.yaml            # Daily Mentor heartbeat 的 readback binding
├── delivery-ledger.jsonl             # 首次 Review 交付时创建；append-only
├── packets/COM-<date>-<seq>.md       # 每次跨 Chat 交付的不可变 packet
└── student-goal-incidents.jsonl      # Controller 的运行 incident / prevention 历史

tracks/<track-id>/mentor/
├── CURRENT.md                        # 最近一次 Mentor 日观察摘要
├── REVIEW_QUEUE.yaml                 # new / observed / needs-review / resolved
├── daily/<YYYY-MM>.md                # 详细日巡检日志
├── dossiers/<student-id>/<sha>.md    # adapter 固化的 Student Dossier 版本
└── reviews/MR-*.md                   # Mentor 深审；一次日巡检最多一份

tracks/<track-id>/students/<student-id>/
├── MENTOR_DOSSIER.md                 # Student writer；详细阶段综合
├── MENTOR_INBOX.yaml                 # adapter writer；Review URI + digest
└── MENTOR_ACKS.yaml                  # Student writer；observed/applied/challenged
```

`scripts/mentor-communication.mjs` 是薄 adapter：它只做 Dossier digest
snapshot、队列状态转换、Review 指针交付、Student acknowledgement、runtime
observation 与校验，不解释科学结果。Student、Mentor 与 Controller 仍是独立
writer；Dashboard 只消费这些文件的派生投影。

| 文件 / 字段 | 唯一逻辑 owner | 实际写入方式 |
| --- | --- | --- |
| Student `MENTOR_DOSSIER.md` | Student | Student 在 safe Stage Settlement 写 |
| Track `REVIEW_QUEUE.yaml` | Mentor supervision lane | Mentor 只通过 thin adapter scan/triage 写 |
| `mentor/dossiers/<sha>.md` | Coordination adapter | adapter 从 Dossier bytes 原子固化 |
| `mentor/CURRENT.md`、`daily/`、`reviews/` | Track Mentor | 对应 Mentor heartbeat / session 写 |
| Student `MENTOR_INBOX.yaml` | Coordination adapter | `deliver-review` 写；registry 将它列为 Student writer exception |
| Student `MENTOR_ACKS.yaml` | Student | Student 通过 `ack` 写自己的判断 |
| `runtime-bindings.yaml` | Coordination adapter | `refresh-runtime` 只写 observation/effective state |
| Controller ledgers / Lab registry | Execution Controller | 原 Controller 合同不变 |

任何角色都不得直接修改另一个 owner 的字段；脚本是原子 transport，不获得
科学裁决权。这样 Student 目录的便利性不会变成 Inbox 的隐式双 writer。

### `registry.yaml`

只登记寻址、权限和最近核验状态。当前文件使用 JSON serialization（也是有效 YAML）并由 [`../../schemas/coordination-registry.schema.json`](../../schemas/coordination-registry.schema.json) 约束。Mentor/Student binding 登记 `trackId`；Student 另登记稳定 `missionId`、`researchLineId` lineage、唯一 workspace、已观察 Codex task 和 scoped Pro lineage。Execution Controller binding 登记它的 Track/Student set、Mentor targets、writer scope、GOAL、Codex task 和 automation ID；它只是运行寻址，不代替 Student Cycle 或 Mentor Action。未观察的 task/conversation ID 为 `null`，不能从目录、live Cycle 或目标拓扑自动补全。

`GOAL.md` 是日常 interface；Track 的 `MENTOR_WORKSPACE.yaml.active_action` 是 Mentor 裁决执行状态，Student 的 `WORKSPACE.yaml.active_cycle_id` 是科学执行状态。`scripts/research-workspace.mjs` 仅保留为内部 scaffold、schema 检查和显式 task/Pro observation 登记工具；Mentor task 通过 `bind-mentor --track <track> --thread <task-id>` 原子登记。目录存在不等于 Action/Cycle 已启动；`active + codexThreadId` 只表示观察到一个本地 Chat binding，不等于研究完成或当前仍在执行。

## 可选 Claude Code Tmux transport

部署工作区的 `scripts/claude-student-tmux.sh` 是本地 transport/supervision adapter，不是新的研究入口、Orchestrator 或实验容器。它为一个 Student 维护一个独占 Tmux session 和固定 Claude session UUID，发送该 Student `GOAL.md` 中原本的一行 `/goal`，并把终端快照写到被 Git 忽略的 `.codex/tmux-students/`。Claude 控制会话留在本地，但 GOAL 要求所有 Claim-bearing CPU/API/GPU 执行转入 `system/scheduling/student-labs.yaml` 记录的远端容器。关闭本地终端后 Tmux 可继续运行；机器重启、睡眠、网络或认证失效仍会中断执行。

Student transport 默认使用独立 tmux server socket `auto-research-students`，避免仓库访问状态、server 生命周期和 session ownership 与其他长期 tmux 任务互相污染。`status` 与 `runtime-bindings.yaml` 必须读回该 socket；迁移或恢复只操作精确的 `ar-mai` / `ar-pai` session，不杀共享 default server 上的其他任务。

- `ar-mai` 只绑定 `STU-MAI-SEMANTIC`，`ar-pai` 只绑定 `STU-PAI-VALUE`；一个 Tmux session 不承载两个 Student writer。
- Tmux/Claude PID、pane、UUID 和终端文本是 Task/runtime observation，不是 Research Evidence；Workspace/Cycle/Run package 仍是事实源。
- monitor 抓取状态和快照；若固定 Claude 进程意外退出且 Workspace 仍为 `create-ready / active / paused`，最多连续三次按原 UUID `resume` 并发送有边界的 continue；若 `active` Cycle 的 Claude 状态稳定为 idle，也会按冷却窗口发送同一 continue。它不处理 API backoff（Claude 原生重试）、不自动批准权限、不接受 Handoff、不写 canonical state，也不持续重写 GOAL。
- 默认权限是 Claude Code `auto`，不是 `bypassPermissions`；后者只适合与本机、网络和真实凭证隔离的容器/VM。默认运行模式为 session-only `ultracode`（`xhigh + Dynamic Workflow orchestration`），而非普通 `max` effort。Workflow Agent 只能承担有边界的分析、核验或隔离实现，主 Student 保持唯一共享状态 writer。模型身份仍由本机 Super Relay registry 决定，不能从 `opus` 别名或显示名推断未暴露的底层模型版本。
- Claude 退出后使用保存的 UUID `resume`；重新创建 Tmux session 不创建新 Student、Research Line 或 Cycle。
- `stop` 需要显式 `--confirm`；控制器只操作 `ar-mai` 与 `ar-pai`，不会触碰仓库外的 Tmux session。

Student 协作主键是 `mission_id + research_line_id + cycle_id`；Mentor 裁决主键是 `track_id + action_id + mentor_cycle_id`。Candidate、Spec、Run、Artifact 与 Decision ID 是科学对象指针；一条 Research Line lineage 可以引用多个 Candidate，因此 Candidate ID 不能单独承担 Handoff 或 delivery 的身份。

### Communication Packet（仅真实跨 Chat）

同仓库 Mentor/Student 默认直接读写各自有权的文件，不为每个 Cycle 制造 Packet。只有 payload 真正跨 Chat、跨仓库或需要可证明送达时，才使用 [`../../templates/communication-packet.md`](../../templates/communication-packet.md)。支持 `direction_charter / research_line_brief / instruction_delta / student_handoff / portfolio_handoff / link_proposal / teacher_packet / engineering_incident`。`engineering_incident` 仅由 Controller 输出 `needs-engineer` 后进入一个 `review-incident` Mentor Action；Mentor 只对一个已显式送达的 Packet 决定 dispatch/changes-requested/reject，Engineer 完成后回到 Controller 技术验收和原 Student/Cycle。每个 Packet 明确 `primary_owner / decision_owner / writer`，并引用 immutable payload 的 URI 与 digest；不复制论文、日志、Pro 原文或完整 Chat。

### Daily Review Queue 与 Delivery Ledger

每日 Mentor heartbeat 先执行 `scan --track`。每个 unseen Dossier digest 只入队一次，并在 `mentor/dossiers/` 保存不可变版本；因此 Dossier 的后续改写不会破坏旧 Queue item 的来源。Mentor 扫描所有 `new`，普通进展转 `observed`，真正需要科学判断的项转 `needs-review`，一次最多深审一项；缺证据时只写 `waitingFor`。正式 Mentor Action queue 与 Daily Review Queue 严格分离。

Mentor Review delivery 每行记录 Track/Student/Queue/Review ID、payload URI + SHA-256、sent time 与 `ack_status=sent`；Student ack 另追加 `observed / applied / challenged` 事件与 evidence refs。不可变 Review 不回写，Inbox 只保存指针，ACK 文件只保存 Student 判断。Communication Packet 的旧 `accepted / changes-requested / rejected` 语义继续适用于其他跨 Chat payload；不要把 Student 对 Mentor Review 的 `applied` 误写成 canonical Settlement。

Review delivery adapter 已实现并通过本地测试；其他 Communication Packet 的通用 delivery adapter 仍未实现。Registry binding 不能据此推断任意 Packet、Handoff 或 Review 已送达；必须读取 Inbox/ledger/ack 的对应 URI + digest。

## 写权与跨线规则

1. 每个 packet 指定一个 primary owner、一个 decision owner、一个 writer 和一个 target owner。
2. Instruction Delta 先影响被点名 scope；parent 接受后才改变上层计划。
3. Cross-track link 由来源 owner 提议、目标 owner 接受并写入。
4. 一个 Paper Project 只有一个 accountable Mentor；contributors 不获得同对象 writer 权。
5. 一个原子科学决定可以在同一 Settlement event 中影响多个实体；互不相关的决定分别结算，避免把并发工作压成不可审计的大事件。

## 如何核对当前状态

先读取部署工作区的 registry、Student Workspace/Cycle、Mentor Queue/Inbox/Acks 与带时间戳 runtime observation，再核对调度器和实际 transport。分别报告文件已准备、角色已登记、会话可寻址、进程在线、Review 已交付与 Student 已回应。`controller-frozen` 只表示命名 scope 的 hold；它不自动说明整条 Cycle 已暂停。

维护工作区已具备 Mentor Review 的薄交付适配器；通用 Communication Packet delivery 和完整 live Codex task-health adapter 仍需单独实现与验收。Dashboard 只投影已观察事实。新增 Track 按激活时初始化通信界面，不从旧队列记录推断新部署已经运行。

# Start Auto Research

这是本仓库唯一的人类启动入口。日常运行不需要 Node、Prompt renderer、剪贴板脚本或手工维护 registry。

首次阅读先看[完整工作流程](docs/WORKFLOW.md)。以下启动方式用于已经配置好的研究工作区；GitHub 中的协议与模板不自动包含运行会话、完整部署脚本、具体 Workspace 或远端权限。

## 启动前

确认目标角色的 GOAL、Charter、Workspace 与相关 Cycle/资产文件存在，且没有另一个会话正在写同一 Student。新克隆缺少这些文件时，先按[部署检查](docs/WORKFLOW.md#deployment)和[工作区合同](tracks/README.md)完成初始化；共享模板不能代替一个真实绑定。检查当前 Controller 与必要的验收能力是否可用，再开始依赖它们的工作。

## 启动一个 Student

1. 在本仓库根目录打开 Claude Code 或 Codex。
2. 选择一个 Student `GOAL.md`。
3. 粘贴一条短命令：

```text
/goal 读取并执行 tracks/M-AI/students/STU-MAI-SEMANTIC/GOAL.md。
```

这次 `/goal` 调用授权该 Student **恢复一个未完成 Cycle；若没有且 Workspace 为 `create-ready`，则创建且只创建一个新 Cycle**。Student 在这个 Cycle 内持续追加 Research Round：每轮 Stage Settlement 后自动选择下一证据；只有真实 Handoff 边界才清空 active pointer 并停止。平台中断只写 checkpoint，下次调用恢复同一 Cycle。

启动 active Cycle 后，同一条 `/goal` 会按 Program standing authorization 为该 Student 恢复或申请一台独占、容量合格的远端容器 Student Lab，再在其中运行 CPU/API/GPU Cheap Probe、复现与训练，并跨 Idea/Cycle 复用。容量、compact fallback 与验收条件以 [AUTO_RESEARCH_SOP.md](AUTO_RESEARCH_SOP.md) 为准；不需要为 Idea A/B/C 逐次粘贴新的资源 Prompt。固定 commit 的长实验另投 Job，Student 在等待期间继续论文、代码和评测准备，但不在本地生成替代性的 Claim-bearing 结果。

启动资格始终以目标 `WORKSPACE.yaml.status` 为准。`create-ready` 可以新建后继 Cycle；`active/paused` 只能恢复现有 Cycle；`awaiting-mentor-review` 必须经过 Mentor verdict 或新的 PI instruction 显式切回 `create-ready`。显式 reopen 只说明 Mission 仍未完成：旧 Handoff 保持不可变且 mentor-unreviewed，新 Student Cycle 将其作为 prior pressure，再自主冻结 Claim、baseline、falsifier 和最小实验。

## 部署工作区的 Student Mission 入口

以下为维护工作区的课题路径索引。使用前核对该 checkout 中的实际文件及状态；目录和历史入口不证明会话已启动。

| Track | Student Mission | GOAL |
| --- | --- | --- |
| M-AI | Memory lifecycle 与弱组合语义撤回 | `tracks/M-AI/students/STU-MAI-SEMANTIC/GOAL.md` |
| M-PHY | 生理记忆的决策充分性 | `tracks/M-PHY/students/STU-MPHY-SUFFICIENCY/GOAL.md` |
| P-AI | 主动行为的 counterfactual value | `tracks/P-AI/students/STU-PAI-VALUE/GOAL.md` |
| P-PHY | 因果可采性阶梯 | `tracks/P-PHY/students/STU-PPHY-ADMISSIBILITY/GOAL.md` |
| P-PHY | 接收性干扰与前瞻规划 | `tracks/P-PHY/students/STU-PPHY-INTERFERENCE/GOAL.md` |
| U-AI | 前瞻覆盖、纠正与偏好漂移 | `tracks/U-AI/students/STU-UAI-COVERAGE/GOAL.md` |
| U-PHY | 闭环生理适应与漂移 | `tracks/U-PHY/students/STU-UPHY-ADAPTATION/GOAL.md` |

当前问题、下一证据和最近 Handoff 不复制到这里；它们只存在于各 Student 的 `WORKSPACE.yaml` 与 `cycles/`。

## 文件如何协作

```text
GOAL.md       身份、路径与启动合同
CHARTER.md    稳定 Mission、scope 与 Claim ceiling
WORKSPACE.yaml 当前问题、Research Line revision、Cycle 指针、下一证据
ASSETS.yaml   Source / Experiment / Run / Artifact 的 URI + digest
cycles/       一个长期 Cycle 内的多轮研究、checkpoint 与条件 Handoff
MENTOR_DOSSIER.md  Student 写的详细阶段综合；Mentor 按 digest 读取
MENTOR_INBOX.yaml  adapter 交付的 Mentor Review URI + digest
MENTOR_ACKS.yaml   Student 的 observed / applied / challenged 回执
bootstrap import 旧资产 ownership/provenance 起点；不算科学 Cycle 或 Handoff
```

Student 启动时先恢复这些文件。`WORKSPACE.yaml` 已指向 active/paused Cycle 时继续它；没有 live Cycle 且状态为 `create-ready` 时，才从 `templates/research-cycle.md` 创建唯一新 Cycle。中断后仍从同一文件状态恢复，不另开副本。

同一个 Student 不要同时启动两次：并行度来自不同 Student，不来自同一文件空间的两个 writer。

## 何时启动 Mentor

Mentor 不是 Student 启动前的必经审批。只有发生一个明确的 Track 级决策事件时才启动，而且一次只处理一个 Action：

- `admit-mission`：判断一个 Seed/fork 是否值得成为独立 Student Mission；
- `review-handoff`：复核一个已完成 Student Cycle；
- `review-incident`：复核一个已明确送达的 Controller engineering Packet，并决定派发、要求修改或拒绝；
- `review-portfolio`：调整该 Track 的 roster、Lead、fork/merge/park 或优先级。

例如 M-AI Student 完成 Handoff 后，在仓库根目录粘贴：

```text
/goal 读取并执行 tracks/M-AI/GOAL.md，处理 STU-MAI-SEMANTIC 最新 Handoff 的 review-handoff。
```

Mentor 会读取 `MENTOR_WORKSPACE.yaml`，创建或恢复一个 Mentor Cycle，完成这一个裁决后停止；不会自动启动 Student，也不会顺便把整条 Track 全审一遍。若没有显式 Action、队列为空且没有唯一待审 Handoff，Mentor 只返回 `idle`，不写文件。

这与每日 Mentor heartbeat 不冲突：heartbeat 只读 active Student 的 Dossier，维护 `mentor/REVIEW_QUEUE.yaml`、`mentor/CURRENT.md` 与详细 daily journal；普通进展只记 `observed`，一次最多写一份深审。它不会创建 Mentor Action/Cycle，也不会改 Student 或实验。Mentor Review 通过 Student Inbox 交付，Student 留 `observed / applied / challenged` 回执后继续自主循环。

普通 Research Round 以 Stage Settlement 结束并继续，不需要 Mentor。只有显式停止、跨 Mission/fork、高影响授权、Mission 穷尽或所有安全分支都被阻塞时，Student 才形成 `handed-off` Cycle；Mentor 随后检查 Claim、证据、失败边界、资产和下一证据。每个 active Student 的首台容量合格远端容器 Lab 使用 Program standing authorization，动态 binding 记录在 `system/scheduling/student-labs.yaml`；第二台 Lab、单台超过 8 卡、未授权 storage root 或其他资源扩张仍需用户/Portfolio 明确授权。

Node 脚本只用于仓库维护、批量 scaffold、schema 检查、迁移和 Dashboard projection；它们不是研究启动或跨 Agent 传输协议。

## 可选：由本地 Tmux Controller 代为启动

人工复制的一行 `/goal` 仍是唯一语义入口；需要长期运行时，可以由部署工作区已验收的 `scripts/claude-student-tmux.sh` 把同一行发送给固定 Claude Code Session。Controller 只负责终端持久化、消息传输、状态抓取和 `resume`，不改变 Student、Cycle、Handoff 或 Evidence 规则。用户不需要同时手工启动同一个 Student；同一 Student 只能保留一个 writer。

```bash
./scripts/claude-student-tmux.sh list
./scripts/claude-student-tmux.sh capture mai 120
./scripts/claude-student-tmux.sh capture pai 120
```

只有对应 Tmux session 已退出时才执行 `resume mai|pai`；不要对仍在运行的 Student 再发一次 `/goal`。终止必须显式执行 `stop mai|pai --confirm`。

Controller 默认以 Claude Code `auto` 权限模式和 `ultracode` 启动；当前 CLI 中 Ultracode 是 session-only 的 `xhigh + Dynamic Workflow orchestration`，不是普通 `max` effort 的别名。Workflow Agent 只承担有边界的分析、核验或隔离实现，主 Student 仍是 Workspace/Cycle/ASSETS 和共享 checkout 的唯一 writer。Monitor 在 Workspace 仍为 `active` 且 Claude 真正 idle 时发送有边界的 continue；Claude 进程意外退出时，最多连续恢复三次并复用原 UUID。API backoff 交给 Claude 原生重试；权限阻塞、`awaiting-mentor-review`、handed-off Cycle、Tmux session 被整体删除、Mac 睡眠或重启都不会被冒充成可自动继续。不要在含 SSH、凭证和真实仓库的本机启用 `bypassPermissions`。

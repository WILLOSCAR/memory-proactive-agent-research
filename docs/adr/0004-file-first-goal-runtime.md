# ADR-0004: Make Student GOAL Runtime File-First

- Status: accepted
- Date: 2026-08-17
- Amended: 2026-08-19 for continuous Research Rounds inside one live Cycle
- Extended by: ADR 0005 for event-driven Track Mentor Actions and Bootstrap Import semantics

## Context

此前的用户路径暴露了 `research-workspace.mjs cycle`、Prompt renderer、`pbcopy` 和 task binding。它们把内部 scaffold、校验与 registry 维护变成了人类启动研究所需理解的 interface。对已经在仓库根目录运行的 coding agent，这些步骤没有增加研究能力，反而复制文件上下文、制造陈旧快照，并遮蔽了 `GOAL.md` 原本的索引作用。

## Decision

人类 interface 收敛为一条短 `/goal`，只指向一个 Track 或 Student `GOAL.md`。Student 通过 `GOAL.md → CHARTER.md / WORKSPACE.yaml / ASSETS.yaml / cycles/ / shared goal` 恢复全部上下文。

一次 `/goal` 调用授权一个 Student 恢复现有 active/paused Cycle；若不存在且 Workspace 为 `create-ready`，则从文件模板创建且只创建一个新 Cycle。该 Cycle 持续追加 Research Round 与 Stage Settlement；普通判断变化不 Handoff。只有真实边界才 Handoff 并等待 Mentor，平台或上下文中断则保留 active/paused 状态供下一次调用恢复。重复启动和 writer 冲突仍由 Workspace 与 Cycle 状态协议处理。

迁移产生的 Bootstrap Import 不是已完成 Cycle/Handoff，因此不触发这一“等待 Mentor”规则。Track Mentor 的 file-first Action resolution、单 Action 终止条件和独立 Mentor Cycle 由 ADR 0005 定义。

Node 脚本保留为内部维护实现：批量 scaffold、schema/ownership 验证、迁移、canonical settlement 与 Dashboard projection。Prompt rendering、剪贴板传输和 CLI Cycle creation 不再是用户 SOP。

## Consequences

- 用户只需知道 `START_HERE.md` 和目标 `GOAL.md`。
- `GOAL.md` 成为深 module 的单一人类 interface；文件布局承担实现和恢复状态。
- 同一 Student 同时只允许一个 writer/Cycle。多 active Cycle 是冲突，不是并行能力。
- 外部 Agent 无共享文件系统时，另行制作 immutable task bundle；不重新引入日常 renderer。
- Registry 仍记录观测到的 Chat/Pro lineage，但没有 binding 不阻止文件内的 bounded Student run，也不能被反推成 live Chat。

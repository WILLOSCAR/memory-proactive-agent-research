# Auto Research 系统模块

`system/` 定义组织、通信、运行调度与资产迁移合同；具体部署还在这里维护可寻址绑定和带时间戳的运行观察。科学结论及其证据仍由 Student 工作区、Run 包和正式研究索引分别承载。

首次理解流程，阅读 [docs/WORKFLOW.md](../docs/WORKFLOW.md)。根目录的术语、协作 SOP、科学规则、研究索引与事件账本保持稳定路径，模块文档通过引用使用它们。

## 模块与事实源

| 模块 | 合同入口 | 部署时查询的状态 |
| --- | --- | --- |
| 架构 | [architecture/FRAMEWORK.md](architecture/FRAMEWORK.md) | `architecture/IMPLEMENTATION_STATUS.yaml`；核对记录时间 |
| 通信 | [coordination/README.md](coordination/README.md) | 角色 registry、runtime bindings、Review delivery ledger；各 Track 的 Review Queue |
| 运行与调度 | [scheduling/README.md](scheduling/README.md) | Student Lab、storage profile、Run/Job receipt 和调度器状态 |
| 资产迁移 | [migration/README.md](migration/README.md) | migration ledger 与 final receipt；只证明归属和迁移 |

这些状态文件、实际会话和机器配置需要在部署工作区存在。GitHub 中的目录与合同不证明已经创建角色、分配 GPU 或开启定时计划。

## 与其他目录的关系

- [tracks/](../tracks/README.md)：Mentor Action、每日观察及 Student 科学工作区。
- [templates/](../templates/)：共享行为与结构模板；具体角色 GOAL 引用它们。
- [experiments/](../experiments/EXPERIMENT_REPORTING_STANDARD.md)：真实 Run、报告和归档证据。
- [knowledge/](../knowledge/README.md)：Mentor 复核后的可复用经验。
- [research-index.yaml](../research-index.yaml) / [research-events.jsonl](../research-events.jsonl)：由唯一 Settlement writer 更新的正式状态和历史。
- [dashboard/](../dashboard/)：研究与运行信息的只读派生视图。

## 运行边界

Execution Controller 是按计划唤醒的 Agent，Execution Control Plane 是其使用的工具和事实层。每次 Controller 唤醒只完成一个 patrol tick；同一 Student 的科研写权保持唯一。

Mentor 正式裁决与每日观察使用不同文件：Action 写 Mentor Workspace/Cycle，观察写 `mentor/`；Student 写自身 Workspace/Cycle、Dossier 和回执；通信 adapter 写 Inbox 等明确授权字段。完整 writer 合同见[通信模块](coordination/README.md)。

自动实验队列、资源仲裁、GPU slice 租约和后台 receipt 对账按各组件的实际入口分别验收。计划中的文件名、旧 snapshot 或通过的文档检查都不能代替运行证明。

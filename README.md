# Auto Research · Memory / Proactive / Personalization

围绕长期 Agent 的记忆、主动行为与个性化开展研究：从论文和真实失败中提出问题，通过复现、证伪与受控实验形成可追溯的结论，再汇聚为论文与可复用资产。

研究由 Mentor、Student 和 Execution Controller 协作完成。课题身份、当前判断和恢复点保存在文件中；Agent 会话负责执行；实验包保存证据；看板帮助研究负责人查看全局并下钻。

**阅读顺序：** [完整工作流程](docs/WORKFLOW.md) → [启动与恢复](START_HERE.md) → [协作 SOP](AUTO_RESEARCH_SOP.md) / [科研与实验规则](OPERATIONS.md)。

> GitHub 保存版本化文档与研究资产，不代表当前会话、GPU 或定时任务在线。部署工作区还需要角色状态、运行适配器、远端环境和访问权限；具体边界见[部署与运行前检查](docs/WORKFLOW.md#deployment)。文档中的本地运行路径使用代码格式标注。

## 研究范围

| Track | 研究方向 | 关注的问题空间 |
| --- | --- | --- |
| M-AI | AI Memory | 长期记忆的存储、组织、使用、更新与撤回 |
| M-PHY | Physiological Memory | 生理与行为历史中，哪些信息对后续决策充分且可靠 |
| P-AI | Proactive Agent | 何时询问、等待、建议或行动，以及行动的反事实价值 |
| P-PHY | Physiological Proactivity | 生理场景中的干预时机、接收性与因果可采性 |
| U-AI | AI Personalization | 偏好学习、纠正、反馈解释与长期适应 |
| U-PHY | Physiological Personalization | 个体差异、设备与分布漂移、闭环生理适应 |

六条 Track 是研究组合与资产索引。具体课题可以跨领域借鉴方法；当前问题、优先级和证据以[研究索引](research-index.yaml)、[问题地图](PROBLEM_BACKLOG.md)与各 Student 工作区为准。

## 组织与分工

```text
User / PI
└── Primary Portfolio Orchestrator        全局入口、优先级与跨方向协调
    ├── Scoped Portfolio Orchestrator     按需管理非重叠子组合
    ├── Research Orchestrator             跨方向研究讨论与 Student 会诊
    └── Track Mentor                     每条 Track 的科学负责人
        ├── Student 1–3                   每个 Student 负责一个长期课题
        ├── Execution Controller coverage 运行巡检、恢复与有界修复
        └── 临时 Engineer                复杂工程故障的专项修复

外部指导工具：GPT Pro Teacher
执行设施：交互 Lab / Batch Job / GPU / HDFS / 挂载云盘
```

- **Portfolio** 帮助 PI 理解全局、调整优先级和处理跨方向冲突；Research 职能在规模较小时可以兼任。
- **Mentor** 给出课题边界，定期阅读阶段报告，审阅证据与 Handoff，沉淀团队知识。
- **Student** 自主完成调研、问题深化、实现、实验、评测和判断更新。一个 Student 负责一个稳定 Mission，Idea 变体和顺序迭代留在同一工作区。
- **Controller** 按定时计划检查会话、实验与资源，修复已授权的运行问题；一个 Controller 可看护多个 Student，但覆盖范围和写权必须明确。
- **Engineer** 在复杂 incident 出现时临时介入，完成修复和验收后退出。
- **Pro Teacher** 提供高层分析与审稿压力，由本地 owner 核验后决定是否采纳。

Lead 是 Student 的优先级标签。每个 Student 同时只有一个科学状态 writer 和一个未结束 Cycle。架构中的角色不要求全部创建独立会话。

## 一个课题怎样推进

```text
Mentor 给出 Mission、Seed Question、证据和资源边界
    ↓
Student 恢复唯一 Cycle
    ↓
论文 / 代码 / Benchmark 审计
    ↓
问题、竞争解释、Claim 与证伪条件
    ↓
冻结实验设计 → 远端 Cheap Probe / 复现 / 受控改进
    ↓
Evaluator 与独立审阅 → 阶段记录 → 下一条证据
    └───────────────────────────────────────↺
    ↓ 达到 Handoff 条件
Mentor 审阅 → 正式研究结算 → 团队知识与看板更新
```

研究会根据证据返回前面的步骤。问题可以来自 Benchmark 缺口、方法失效、评测偏差、负结果、应用约束或跨领域矛盾，不要求所有课题长成同一种方法论文。

**进展看判断发生了什么变化：** 原来相信什么，哪条证据改变了它，现在能声称什么，还缺什么验证。论文数量、Round 数、GPU 占用和文档数量只表示活动。

详细步骤、每步产物和验收条件见[完整工作流程](docs/WORKFLOW.md#research-loop)。

## 三条持续闭环

| 闭环 | 运行方式 | 留下什么 |
| --- | --- | --- |
| Student 科研 | 学习 → 提问 → 设计 → 实验 → 审阅 → 下一轮 | Cycle、Workspace、Run 包、阶段报告 |
| Mentor 指导 | 每日阅读阶段报告 → 队列分流 → 按需深审 → Student 独立回应 | Dossier 快照、Review、Inbox、Acknowledgement |
| 运行改进 | 发现故障 → 归因 → 修复 → 验证 → 更新规则 → 同会话恢复 | 运行 checkpoint、incident 与 prevention 记录 |

Mentor 每日可以只观察进展，无需每次指导。普通 Research Round、一次 Run 完成、一个 Idea 失败或上下文切换都可以留在原 Cycle；正式回交条件见[Handoff 与结算](docs/WORKFLOW.md#settlement)。

## 实验、存储与证据

Student 在验收后的远端容器中运行会影响科研判断的 CPU、API 和 GPU 工作。本地负责阅读、代码编辑、静态检查、打包与控制。交互 Lab 用于复现和调试，固定版本的长实验走异步 Job；申请、排队、分配、验收、实际运行分别记录。

HDFS 保存版本化数据、代码和不可覆盖实验归档；挂载云盘保存经核验的可复用工作集；机器临时盘用于可恢复缓存。运行前核对真实主机、挂载、源码与资产版本，运行后核对日志、结果、digest 和归档回执。

每次真实 Run 都保留完整报告，包括复现目标或 Proposal、代码变化、准确命令、预期与实际、结果边界、失败归因和下一证据。负结果、执行失败、无效和证据不足分别记录。

- [逐 Run 报告与归档标准](experiments/EXPERIMENT_REPORTING_STANDARD.md)
- [资源和执行流程](system/scheduling/README.md)
- [完整实验与存储说明](docs/WORKFLOW.md#execution)

## 从哪里进入

| 目的 | 入口 |
| --- | --- |
| 理解整个流程、文件如何协作 | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| 启动或恢复 Mentor / Student | [START_HERE.md](START_HERE.md) |
| 看整体研究对象和问题分布 | [PROGRAM_MAP.md](PROGRAM_MAP.md)、[LITERATURE_MAP.md](LITERATURE_MAP.md)、[PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) |
| 查正式研究状态与变化历史 | [research-index.yaml](research-index.yaml)、[research-events.jsonl](research-events.jsonl) |
| 看方便阅读的摘要 | [CURRENT.md](CURRENT.md)，同时检查摘要时间和底层来源 |
| 查术语和文档优先级 | [CONTEXT.md](CONTEXT.md)、[SOURCE_AUTHORITY.yaml](SOURCE_AUTHORITY.yaml) |
| 查角色、权限、并发与交接 | [AUTO_RESEARCH_SOP.md](AUTO_RESEARCH_SOP.md)、[组织架构](system/architecture/FRAMEWORK.md) |
| 查论文审计、Claim、Evaluator 和科学门槛 | [OPERATIONS.md](OPERATIONS.md) |
| 查 Mentor / Student 通信和文件结构 | [通信协议](system/coordination/README.md)、[工作区目录](tracks/README.md) |
| 查成功和失败经验的晋级方式 | [knowledge/README.md](knowledge/README.md) |
| 查模板、底层脚本及部署依赖 | [文件与实现地图](docs/WORKFLOW.md#files) |

## 文件布局

```text
README.md / START_HERE.md                 阅读与启动入口
CONTEXT.md / SOURCE_AUTHORITY.yaml        术语与权威边界
AUTO_RESEARCH_SOP.md / OPERATIONS.md       协作和科研规则
research-index.yaml / research-events.jsonl
                                         正式研究状态与变更历史
docs/WORKFLOW.md / docs/adr/               流程说明与架构决定
system/                                  通信、调度和治理合同
tracks/                                  Mentor / Student 工作界面
templates/                               角色、Cycle、报告和回执模板
sources/ / review/                       来源审计与评审记录
experiments/                             实验设计、Run 和报告
knowledge/                               已复核的可复用经验
dashboard/                               桌面研究看板
```

具体 task ID、定时计划、GPU、挂载、Cycle 和运行状态在部署工作区中查询，不把 README 中的目录或角色当作已运行证明。旧协议保留作历史审计，优先级由 `SOURCE_AUTHORITY.yaml` 指定。

## 看板

看板采用“高密度研究总览 + 可下钻详情”：先看方向、问题、关键变化、证据、风险和下一步，再进入 Candidate、Source Paper、实验或对应会话。展示目标是桌面研究控制台。

前端采用 React、TypeScript、Tailwind CSS、shadcn/ui、Zod 和 Lucide；构建、同步与启动命令以 `dashboard/package.json` 中实际存在的 scripts 为准。研究视图来自正式索引和事件；运行观察、待审工作与模块状态单独显示。

## 使用边界

本仓库使用文件和脚本约束 Agent 行为，自动化能力需按部署环境验收。文档与模板存在，不代表 GPU 分配、消息传递、会话恢复或后台调度已经开启。开始长期运行前，完成[部署检查](docs/WORKFLOW.md#deployment)，并以带时间戳的真实状态为准。

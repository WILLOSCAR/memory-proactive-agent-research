# Auto Research OS Macro Framework

更新日期：2026-08-31

本文件冻结 Auto Research OS 的**大框架**：谁拥有最终权力、一个 Student 的合理粒度、外部 Pro 如何进入、本地执行如何被调度，以及各类资产应该放在哪里。详细科学门槛仍由根目录规范负责。

## 1. 权力树，而不是同级 Agent 网

```text
User / PI
└── Primary Portfolio Orchestrator              唯一默认总入口
    ├── Scoped Portfolio Orchestrator 0–N       可选；非重叠子组合
    ├── Research Orchestrator                    科研战略与会诊职能
    └── 6 × Track Mentor                        每条 Track 一个长期科学 owner
        ├── Daily Review Queue                   每日观察所有 active Student；一次至多一份深审
        ├── 1–3 × Student Mission               一人一文件空间；一条可演化的 Research Line lineage
        │   ├── Revisions / Idea Variants / Cycles  多个 session 顺序恢复，默认不新建 Student
        │   ├── Dossier / Inbox / Acks           详细阶段综合、digest-bound 指导与独立回执
        │   └── one capacity-qualified GPU container Lab    一人一台；4–8 preferred，2×H20 compact fallback
        ├── Execution Controller coverage 0–1    active Student 期间定时 patrol、自愈与运行学习
        └── Engineer Task 0–1                    只在 `needs-engineer` incident 期间短暂存在

Horizontal capabilities
├── External Pro Teacher Tool                   Program / Direction / Student scope
├── Execution Control Plane                     Controller 使用的 Watch / Job / GPU / HDFS / Run queue
└── Canonical Research State                    Index / Events / Reports / Knowledge
```

### 不可破坏的权力约束

1. `Primary Portfolio Orchestrator` 是唯一用户默认入口和跨组合最终路由者。
2. `Scoped Portfolio Orchestrator` 只能拥有互不重叠的 scope，并向 Primary 回流；它不是第二个总入口。
3. `Research Orchestrator` 可以拥有独立 Chat，但属于 Primary 的权力树：负责跨线科学战略、会诊与 Teacher Packet，不分配全局资源、不覆盖 Track verdict、不直接写 Research Evidence。
4. 不设置 `Execution Orchestrator` 角色。`Execution Controller Agent` 是 Mentor 背后的长期运行代理，使用 `Execution Control Plane` 的工具与事实；它不拥有科研裁决或独立人工入口。Engineer 只是 Mentor 按 incident 临时派发的能力。
5. 每个动作必须有一个 `primary_owner`、一个 `decision_owner` 和一个 `writer`；三者可相同，但 writer 只能有一个。
6. 每条 Track 同时最多有一份 active Controller coverage；一个 Controller Task 只有在显式登记多个 Mentor、Student scope 不重叠、writer scope 唯一且按 Track 分开发送 delta 时，才可服务多个 Track。

## 2. Track、Student 与 Idea 的粒度

- `Track Mentor` 负责一条 Track 的长期问题地图、Student 组合、判断复核和知识晋级；一次显式 `/goal` 只处理一个 `admit-mission / review-handoff / review-incident / review-portfolio` Mentor Action，并以独立 Mentor Cycle 留下裁决记录。独立的每日观察只维护 Dossier Review Queue、Daily Journal 和至多一份 digest-bound Review，不创建 Action 或改 Student。
- `Student` 负责一个稳定 `Student Mission`，并在其中维护一条可版本化的 `Research Line` lineage；在唯一 live Cycle 内持续追加 Research Round 与 Stage Settlement，直到条件 Handoff。它绑定一个持续文件空间，而非强制绑定同一 Codex Chat。每个 material Settlement 更新详细 Dossier；Mentor Review 由 Student 独立 `observed / applied / challenged`。
- `Execution Controller Agent` 在有 active Student 时按 Control Plan 持续巡检 Task/Research/Resource/Experiment 四类状态，处理有界运行修复，把重复杂活转化为 prevention rule，只向 Mentor 返回运行 delta。它不是 Student 或 Mentor 的替代者。
- `Lead` 是当前优先级标签，不是比其他 Student 更高的角色类型；标签可以随证据变化而转移。
- `Seed Question` 是 Mentor 给的初始坐标，不是必须守住的 Claim。refine、narrow、generalize、reframe、sequential pivot 通过 Research Line Revision 留在同一 Mission；只有并行独立谱系才 fork。
- `Idea Variant` 是同一当前 Research Line revision 内的机制、baseline、评测或实现变体，默认留在同一个 Student 文件空间。
- 只有当新方向拥有独立问题、独立 Claim、独立 kill rule，且一方失败不必杀死另一方时，才升级为新的 Student。
- 尚未升级的线索称 `Research Line Seed`，只进入 Mentor backlog，不称 Student，也不创建 Chat。

推荐常态是一条 Track 登记 `1–3` 个 Student。Program standing authorization 要求每个 active Student 在 Claim-bearing 执行前先恢复或申请至多一台独占、容量验收合格的远端容器 Student Lab；默认目标为 `4–8 GPU`，没有更快可行完整路线且冻结 workload 通过两卡容量预检时允许 `2×H20` compact fallback。它随 Student Mission 持久复用，不随单个 Idea/Run 创建或销毁。Cheap Probe 只缩小实验规模，不改变远端执行位置。真正拿到多少 Lab 仍由实时配额、物理调度、存储可达性与 Mentor 复核能力约束。固定 commit 的长训练和批量验证走独立 Job lane，不占用 Student 继续交互研究的控制流。

## 3. External Pro Teacher 是工具，不是组织层

同一个外部能力可有三种持久对话作用域：

| 作用域 | 本地 owner | 适合的问题 |
| --- | --- | --- |
| Program | Research Orchestrator | 跨 Track 战略、组合盲区、会诊综合 |
| Direction | Track Mentor | 方向级问题重构、相关工作、fork pressure |
| Student | Student | 单一 Proposal、反例、novelty、实验故事 |

所有 Pro 输出都是 `External Review pressure`，不是本地 Evidence。日常界面只报告两层：

- **Pro 对话**：已看见远端原始回答，并保存本地 accept / modify / reject verdict。
- **关键结论审计**：另有可核验的 `codex-snapshot → gpt-exchange → codex-verdict` 完整链。

`receipt-observed / strict-round-verified` 仅作为 Bridge 运维内部状态码，不进入日常用户术语。

Project Sources 只承载稳定共享背景；当轮代码、日志、实验结果和争议证据通过 immutable task bundle 传递。Source drift 影响后续路由准备度，不应把普通 deep-research Chat 全局阻塞成不可用；若旧回合使用的 bundle/source observation 与本地 verdict 已保存，也不追溯抹掉旧回合。

## 4. 文件模块与单一事实源

```text
Stable root interface
├── CONTEXT.md / AUTO_RESEARCH_SOP.md / OPERATIONS.md
├── SOURCE_AUTHORITY.yaml
├── research-index.yaml / research-events.jsonl
└── CURRENT.md / README.md
            │
            ├── system/               组织、通信、调度与实现状态
            ├── tracks/               Mentor GOAL/Workspace/Action cycles；Student 按 binding 懒创建
            ├── sources/              论文与来源核验
            ├── experiments/          Spec、Run、报告与 Artifact 指针
            ├── knowledge/            Mentor 接受后的团队知识
            ├── review/               外部原文、审计与本地 verdict
            ├── dashboard/            只读派生视图
            └── docs/adr/             少量不可逆架构决定
```

### 六个模块合同

1. **Governance**：根目录 canonical 文档定义术语、角色、证据与结算规则，不保存动态实例。
2. **Coordination**：file-first workspace 回答“当前写什么、恢复哪个 Cycle”；registry 只补充“观察到哪个 task/Pro lineage、谁可写哪里”；communication packet 与 delivery ledger 只处理真实跨 Chat 送达/接受，均不保存科学结论。
3. **Track / Student Home**：Track 与 Student 的 `GOAL.md` 是人类短启动入口和共享行为 binding。Track 暴露 `CHARTER.md`、`GOAL.md`、`MENTOR_WORKSPACE.yaml`、`mentor-cycles/`，以及独立的 `mentor/CURRENT + REVIEW_QUEUE + daily + dossiers + reviews`；Student 暴露 `CHARTER.md`、`GOAL.md`、`WORKSPACE.yaml`、`ASSETS.yaml`、`cycles/`、`MENTOR_DOSSIER/INBOX/ACKS`。Mentor Action state、每日观察和 Student 科学状态互不复制；正式 Evidence 只留 ID、URI 与 digest 指针。
4. **Evidence Stores**：论文、Run、Artifact 与 Pro 原文各存一次；negative、failed、invalid 与成功结果同样留存。
5. **Settlement + Knowledge**：每个 Handoff 留在 Cycle，只有可复用且边界完整的经验才由 Mentor 晋级团队知识；科学状态只通过唯一 Settlement writer 改变。
6. **Derived Views**：Dashboard、搜索索引与实验队列都从事实源派生，不手工维护第二套状态。

## 5. 跨线与并发写规则

- 跨 Track 关系由**目标对象 owner**接受后写入；来源 owner 只能提出 link packet。
- 一个 Paper Project 必须有一个 home Track 和一个 accountable Mentor；其他 Track 以 contributor link 接入。
- 当前 Settlement 继续使用全局串行锁和短事务；一次逻辑变更尽量通过一个 multi-change event 结算。
- 只有出现可测量的持续锁等待，并且对象 ownership、跨分片 revision 与恢复协议已定义后，才讨论 sharding。
- 浏览器 profile、Project Source 同步和同一 Pro conversation 的写操作串行；不同 Student 的本地只读研究与独立实验可并行。
- 不同 Student 默认各自拥有独立 Student Lab；同一 Student 的 Idea Variants 在自己的 Lab 内按 GPU slice 并行，正式 Job 作为异步子运行回收，不把一个共享 Worker 变成新的跨线 writer。
- 一次 repository-bound `/goal` 绑定一个 Student Mission、一个当前 Research Line revision 和唯一 live Cycle；科学 inner loop 可重复，问题可以有证据地顺序演化，但必须保存 revision，且不得跨 Mission 漂移或并行占有第二条独立谱系。连续 session 通过文件恢复，不靠 Prompt 渲染或 Chat 记忆接力。
- 一次 Track Mentor `/goal` 绑定一个 Track、一个 Mentor Action 和一个 Mentor Cycle；无 Action 时只读返回 idle，多个竞争 Action 时报告歧义，完成一个 Action 后停止，不自动启动 Student。

## 6. 当前与目标状态

架构图中的角色或文件名不表示已经创建。统一使用：

- `built`：存在可用实现和权威入口；
- `partial`：已有一部分事实或工具，但合同尚未闭环；
- `planned`：只有已采纳设计，不得报告为可运行。

精确盘点读取部署工作区的 `system/architecture/IMPLEMENTATION_STATUS.yaml` 并核对其 observation 时间。该运行盘点不随 GitHub 文档自动刷新；启动条件见[部署检查](../../docs/WORKFLOW.md#deployment)。

## 7. 仍需运行时决定的执行细节

- 是否给 Candidate 增加 `probe-ready` 新状态；
- 每个 Student 实际获批的卡型、4 或 8 卡、CPU/内存配比、Worker/Instance ID、存储绑定和平台回收规则；
- no-change event、judgment freshness 与 assertion-level evidence 强制进入 writer 的具体 schema；
- 何时从全局串行 Settlement 升级为分片并发。

这些内容已获得明确落点和默认安全行为，但进入 schema、writer 或真实资源调度前，仍需下一轮 SOP / execution review。

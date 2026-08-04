# Auto Research OS / Human–Agent SOP — Codex Verdict

日期：2026-08-04  
状态：本地架构判断；不是论文证据，不改变任何 Candidate 的研究结论  
外部评审：[原始 Pro 回答](../artifacts/auto-research-os-sop-review-20260804-pro-response.md)  
任务对话：<https://chatgpt.com/g/g-p-6a6b0516fbb8819185e47160a2b7552b-auto-research/c/6a719564-56c8-83ec-8419-a8db4c3b2684?tab=sources>

## 1. 总判定

采用 **targeted consolidation**：保留 Candidate / Evidence / Decision 主轴和浏览器认知恢复目标，不推倒重来；先统一权威来源和状态语义，再实现最小闭环。当前优先级不是再增加页面，而是让 canonical state、Settlement、Leader Brief 和一次真实 Cheap Probe 能贯通。

North Star 定为：

> 在 Leader 默认只处理 3–5 个注意项、且证据边界不被弱化的前提下，缩短从不确定研究问题到可审计的新证据、明确研究决策和可组合论文证据脊柱的时间。

“持续产出多篇论文”仍是最终目标，但属于 lagging outcome；系统的直接优化对象是 evidence-backed decision 的速度与质量，不能用 Candidate、文档或页面数量替代。

## 2. 逐项 verdict

| Pro 建议 | 本地决定 | 约束 / 修改 |
| --- | --- | --- |
| Candidate 是核心；Progress 来自 Evidence 与 Decision | **accepted** | 与现有需求一致 |
| 建立 Source Authority manifest | **accepted** | `SOURCE_AUTHORITY.yaml` 成为权威层级入口；旧文件可审计但不得覆盖新规范 |
| “唯一主链”只作 lineage/navigation，拆分对象状态机 | **accepted** | Candidate、Spec、Run、Decision、Paper 各自维护状态；不得把 Run 成败和研究结论混成一列 |
| Decision 可由 Source audit、valid Run、resolved review 或用户约束支持 | **accepted with guardrail** | Raw External Review 不能直接成为依据；必须先有 Codex verdict 或原始来源复核 |
| Evidence 改为 assertion-level typed link | **accepted** | Candidate 可以显示摘要，但不得用最高证据等级代表整条 Claim |
| Decision 区分 proposed / approved / applied | **accepted** | lineage-changing 决策必须可见、可追溯；未批准不得写成已生效 |
| Settlement 升级为 append-only Research Event | **accepted, minimal first** | 必含 event id、time、actor、base revision、affected entities、typed changes/evidence、decision state、next-evidence acceptance、blocker、outcome；由工具原子写入，不能只靠 Agent 自觉 |
| Leader Brief 采用确定性选取，LLM 只负责表达 | **accepted** | 选取、排序、上限和 pointer validation 必须是规则；LLM 失败时回退模板 |
| Track 使用 explore / validate / maintain / parked 模式 | **accepted with modification** | 六条 Track 都要保持可解释的信息流，但不要求同深度、同 GPU 或固定每周新增数量；`parked` 必须有原因和 unlock condition |
| 取消“每 Track 每周固定新增 3 个 Candidate” | **accepted** | 仅可作为 explore-mode brainstorm heuristic，不再是组合健康硬指标 |
| 只读 HTML 不是完整 control plane | **accepted as terminology correction** | MVP 是 Research Control Plane 的只读 sensemaking surface；审批、派发和写入接入后才是完整 control plane |
| 0 Run 时不建设完整 Experiment Center | **accepted with modification** | 仍保留 Specs / Runs 过滤入口和诚实空状态；真实 Run 增长后再升为独立模块 |
| Opportunity / Project 统一为稳定 Paper Thread | **pending naming, accepted need** | 必须有 promotion 前后的稳定 internal ID；显示名与实体名待用户确认。一次 valid Cheap Probe 只是 promotion 必要条件，不是充分条件 |
| Candidate 可服务多个 Paper Thread | **accepted** | 显式记录 role；Candidate 仍只有一个 primary Track 用于归档 |
| Continue / Park 可由 Agent 默认应用 | **pending delegation** | Agent 可提出；是否按 Candidate 委托自动应用由用户决定。Split / Nest / Merge / Kill / promotion 默认保留给用户 |
| local-storage 保存 last-view checkpoint | **accepted for local MVP** | 不进入 canonical repo；跨设备同步以后再做 |
| 立即用 C01 做第一个 dogfood Run | **unverified target** | “需要尽快跑一条端到端 Cheap Probe”采纳；具体用 C01 还是别的 Candidate，要先核对 evaluator、数据和真实可执行性 |

## 3. 本地已核验与未核验边界

本轮可由仓库直接支持的事实：

- 新旧 ontology 确实冲突：旧 `operations/ASSET_PROTOCOL.md` 使用 Idea / Claim / 命题型 Track，新 `CONTEXT.md` 使用固定 Track + Candidate；
- canonical 口径为 36 total nodes、34 independent Candidates，C14/C15 已 Nest；
- 当前没有真实 Run Manifest，因此 Actual Run = 0、Local Result = 0；
- 看板需求已明确浏览器是跨线程认知恢复入口，聊天不是 source of truth；
- Dashboard 当前实现问题来自此前 Codex 对 site 仓的核验，本轮 Pro 没有重新读取该仓代码。

尚未完成：真实 Leader 30 秒测试、并发写入冲突测试、schema validator、atomic writer、第一条端到端 Cheap Probe。任何关于它们“已经有效”的表述都不成立。

## 4. 冻结的 MVP 边界

### 持久化核心

- Program / Track；
- Source Paper / Literature Cluster / Gap；
- Candidate；
- Experiment Spec / Run / Artifact；
- Decision；
- 一个跨 opportunity→project 保持稳定 ID 的 paper-lineage 实体；
- Research Event。

Proposal、Leader Brief、Experiment Center、Progress、Health、Decision Inbox、Blocker Inbox 都是 View 或派生状态，不另建第二套对象。

### Leader Brief 合同

候选池只包含 material change：新/失效 Local Result、Claim 实质收窄、lineage Decision、paper gate 变化、critical novelty threat、阻断当前 probe 的 blocker、需要批准的 Decision。按固定优先级合并成最多 5 条 narrative；每条固定显示：

1. What changed；
2. Why it matters；
3. Basis / scope；
4. Decision needed；
5. Next evidence。

每条必须含稳定 entity/event/evidence pointer 与 as-of revision，并解释当前哪些 Track / Candidate 无需关注。

### 写入与并发合同

`research-index.yaml` 是 current-state truth；`research-events.jsonl` 是 delta/audit truth。后续只允许一个写入工具原子更新两者，并用 `base_revision` 做 optimistic locking。MVP 不做完整 event sourcing，也不手工双写。

## 5. 实施顺序

1. Source 权威层级与术语收敛；
2. schema v1、迁移口径与禁止项；
3. `research-index.yaml` + `research-events.jsonl` + validator / atomic close-out；
4. 由 canonical state 生成 Now / Portfolio / Research Map / Candidate Workspace / paper-lineage view；
5. 用一条真实 Cheap Probe dogfood `Spec → Run → Artifact → Decision → Settlement → Leader Brief`；
6. 只在真实摩擦出现后增加完整 Experiment Center、审批 UI、自动派发、通知和写作工作台。

## 6. 需要用户后续确认的三项

1. 稳定 paper-lineage 实体是否正式命名为 `Paper Thread`，还是继续对外使用 `Paper Opportunity / Paper Project`、仅共享 internal ID；
2. `Continue / Park` 是否允许按 Candidate 委托 Agent 自动应用；
3. 是否近期需要跨设备查看“自上次查看”，否则 MVP 先用浏览器本地 checkpoint。

这三项不阻塞 Source 清理、schema 设计、只读 Leader Brief 和第一条真实 Run dogfood。

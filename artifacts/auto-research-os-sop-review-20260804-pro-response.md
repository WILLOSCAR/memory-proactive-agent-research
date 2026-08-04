Direct Answer
Verdict

建议做 targeted consolidation，而不是 preserve as-is，也不是推倒重来。

当前方向已经抓住了三个最重要的系统边界：

Candidate 是核心研究单位；

Progress 来自 Evidence 与 Decision，而不是卡片数量和文档活动；

浏览器负责跨线程恢复研究认知，聊天线程只负责执行。

但目前的规范仍然比 MVP 多出一层半复杂度，而且存在几处会直接污染实现的语义冲突：旧 ASSET_PROTOCOL.md 仍将 Track 定义为“可投稿命题”、将 Idea 和 Claim 设为独立对象；新 CONTEXT.md 则把 Track 固定为六条资产索引线、Candidate 作为 Claim + Evaluation 的核心工作单位。两套模型不能同时留在 Agent 可见的权威上下文里。

bridge--reference-asset-protoco…

 

bridge--glossary-context--b83e1…

更关键的是，仓库目前仍为 0 Actual Run、0 Local Result，而现有页面已经手工维护了 11 个“Experiment”对象和大量状态统计。这说明当前首要任务不是继续扩展页面，而是让一个真实 Cheap Probe 从 Spec 一直通过 Run、Artifact、Decision 和 Settlement 走完一遍。

bridge--reference-requirements-…

North Star

在 Leader 注意力被限制为 3–5 个事项、且证据边界不被弱化的前提下，缩短从“不确定的研究问题”到“可审计的新证据、明确的研究决策和可组合的论文证据脊柱”的时间。

“持续产出多篇论文”应当是 lagging outcome，不应成为系统直接优化的操作指标。否则系统很容易优化出更多 Candidate、更多 Paper Opportunity 和更多页面，而不产生更多可辩护的研究判断。

建议用两项主运营指标代替单一完成度：

Time to first evidence-backed decision：Candidate 达到 Problem Defined 后，到第一次基于新证据作出 Continue / Split / Nest / Park / Kill 的时间；

Decision-bearing evidence yield：本周期新增的 source audit、valid Run 或其他 admissible evidence 中，有多少真正改变了 Claim、Candidate lineage、Paper Thread 或下一实验。

Jobs-to-be-Done
Job	Leader 真正要完成的任务
Reorient	30 秒内知道什么变了、为什么重要、哪些没有变
Decide	只处理需要人类判断的高影响 Decision
Direct	确认下一条最值钱、可验收的 Evidence 是什么
Audit	从结论追到 Source Paper、Run、Artifact、Decision 和版本
Compose	看见哪些 Candidate 正在形成同一条 Paper evidence spine
Recover	不打开原聊天，也能恢复研究状态、未决问题和下一步
必须保留、修正、删除和新增
类别	结论
必须保留	3×2 仅作为 Track 索引；Candidate 核心；Experiment Spec / Run 分离；Local Result 只来自 valid Run；External Review 只是 pressure；negative / failed / invalid / inconclusive 分离；浏览器只读 canonical 状态；Settlement 作为线程结束合同
需要修正	“六条 Track 持续 Split”改为“六条 Track 有显式运营模式和信息流”；Evidence Level 从 Candidate 单一标签改为 assertion-level support；一条 Cheap Probe 只是 Paper Project 的必要条件而非充分条件；只读 HTML 在 MVP 中是 sensemaking plane，尚不是完整 control plane
建议删除	旧 Idea/Track/Claim ontology；一个贯穿 Source→Publish 的统一状态机；手工汇总数、最近活动和完成度；0 Run 时的完整 Experiment Center；Proposal 作为对象；独立 Claim ledger 在当前阶段的全面铺开；每 Track 每周强制新增三个 Candidate
推荐新增	append-only Research Event / Settlement log；typed Evidence Link；Decision 的 proposed/approved/applied 状态；Project Source authority manifest；since-last-view checkpoint；原子更新与并发保护；确定性的 Leader Brief 选取规则
MVP	schema、migration、Settlement close-out、事件日志、生成式 index、Now、Portfolio、Research Map、Candidate page、轻量 Paper Threads、一次真实 Cheap Probe 端到端演练
后续版本	Run 自动采集、Paper contribution ledger、决策审批 UI、source intake、搜索、托管访问、通知和跨线程派发
明确推迟	通用项目管理功能、甘特图、资源仪表盘、多人权限、复杂图谱动画、自动投稿流程、自动 Kill/Split、完整 Paper 写作工作台

上述判断基于本轮 Evidence Bundle 和绑定的 Project Sources；它仍应作为 External Review 保存，只有本地 Codex verdict 可以改变 canonical 状态。

auto-research-os-sop-review-202…

 

bridge--reference-operations--3…

Key Reasoning
1. 当前最需要修复的不是页面，而是四个系统边界
1.1 旧 ontology 必须真正退出权威上下文

新模型中：

Track = 六条归档索引线；

Candidate = 一个可证伪 Claim + Evaluation；

Proposal = Candidate 厚卡 View；

Experiment Spec 与 Run 分离；

Paper Project 聚合多个 Candidate。

旧 ASSET_PROTOCOL.md 中则是：

Track = 可投稿命题；

Idea = 独立实体；

Claim = 独立实体；

Paper = 发布视图。

README 虽称旧协议已冻结，但它仍出现在 Project Sources 和本轮 Evidence Bundle 中。对人类来说可以通过时间戳判断新旧；对 Agent 来说，这会造成名称、ID 和关系的随机漂移。

bridge--reference-asset-protoco…

 

bridge--glossary-context--b83e1…

建议：

新增一个很小的 SOURCE_AUTHORITY.yaml：

YAML
sources:
  CONTEXT.md:
    authority: canonical
  REQUIREMENTS_AUTO_RESEARCH_OS.md:
    authority: canonical
  OPERATIONS.md:
    authority: canonical
  operations/ASSET_PROTOCOL.md:
    authority: frozen
    superseded_by:
      - CONTEXT.md
      - REQUIREMENTS_AUTO_RESEARCH_OS.md
      - OPERATIONS.md

Bridge Bundle 和 Project Sources 都应优先包含这个 authority manifest。旧文件可以保留用于审计，但不得继续提供未加标记的“Canonical entities”。

1.2 “唯一主链”只能是导航叙事，不能是一个状态机

当前链条：

Source → Audit → Candidate → Spec → Run → Decision
→ Pilot → Confirmation → Paper → Review → Publish

在概念上便于解释，但它把多个不同对象的生命周期压成了一条 Kanban：

Source Paper 不会“进入 Run”；

Candidate 不会变成 Paper Project；

Decision 可能发生在任何成熟度；

Paper Project 有自己的写作、评审和发布状态；

Run 的执行成功与研究结论是两个不同维度。

因此它应保留为 lineage/navigation model，但必须拆成独立状态机。

1.3 Decision 不能只挂在 Artifact 后面

当前需求 DAG 画成 Artifact → Decision，但同时又确认：

现阶段 0 Actual Run；

C14 和 C15 已经因为 literature overlap 被 Nest；

Source audit 可以导致 Kill、Nest 或 Split。

这说明 Decision 的依据不一定是 Local Result。

bridge--reference-requirements-…

 

bridge--decisions-problem-backl…

正确关系应是：

Candidate ← Decision
               ↑
     evidence_snapshot_refs
       ├── Source / Cluster Audit
       ├── valid Run / Artifact
       ├── resolved External Review
       └── explicit user constraint

Raw External Review 不能单独成为 Decision basis；它必须先经过 Codex verdict。但经本地核验的 Source Paper direct coverage 完全可以支持 Nest 或 Kill，而不需要先跑实验。

1.4 Candidate 不能只有一个 Evidence Level

一个 Candidate 可能同时处于：

failure existence：Local Result；

novelty：Inference；

mechanism：Unverified Lead；

benchmark protocol：Source Supported；

causal generalization：尚无证据。

如果 Candidate 整体显示 Local Result，Leader 会误以为整条主张已经得到本地支持。

因此应把证据级别应用到 Assertion / Evidence Link，而不是 Candidate 整体。Candidate 页面可以显示一个 evidence summary，但不能把“最高等级”当作整体等级。

建议的最小 link：

YAML
evidence_link:
  target_assertion: C01@v3.failure_exists
  relation: supports | contradicts | pressures | leaves_unresolved
  basis_type: source-paper | local-artifact | inference | external-review
  ref: R-E-C01-01-001/artifact:metrics
  scope: "history-equivalent benign revocation cases"
  validated_by: codex

约束：

basis_type: local-artifact 只有 valid Run 才允许；

external-review 只能使用 pressures，不能使用 supports；

Source Paper 可以支持“某工作覆盖了什么”，但不能支持“本项目方法有效”。

这也修复了 “Source Paper 不是本项目 Evidence” 与 Evidence Level 中存在 Source Supported 的表面冲突：前者应改写为“不是本项目的 local empirical evidence”。

2. 推荐的可实施对象模型

不建议把每个名词都变成文件或独立 Workspace。应区分“持久实体”“轻量记录”和“派生 View”。

2.1 持久实体
Entity	最小边界
Research Program	全局 thesis、Track IDs、运营原则
Track	六个固定索引；增加 mode: explore / validate / maintain / parked
Source Paper	citation、URI、verified scope、不可声称范围、Cluster links
Literature Cluster	estimand、evaluation unit、coverage、blind spot、Source links
Gap	轻量 index node；statement、Cluster refs、Candidate refs；不单独建文件
Candidate	versioned claim、failure、evaluation、kill rule、stage、work state、lineage、next evidence
Experiment Spec	primary Candidate、related Candidates、操纵变量、baseline、oracle、metric、stop rule、resource ceiling
Run	Spec 的一次真实 launch/execution；manifest、execution state、validity、outcome
Artifact	immutable URI、digest、kind、Run
Decision	target、type、status、evidence snapshot、rationale、批准者、产生的 lineage edges
Paper Thread	一个稳定论文叙事记录；通过 stage 区分 Opportunity 和 Project
Research Event	Settlement 的 append-only 结构化事件，用于恢复 delta 和生成 Leader Brief
2.2 不应成为独立实体
名词	应如何处理
Proposal	Candidate 的厚卡 View
Leader Brief	Research Events + canonical state 的派生 View
Experiment Center	Specs / Runs 的过滤 View
Progress / Health / Starvation	派生状态
Decision Needed	Decision.status=proposed 的 View
Blocker	Candidate / Spec 上的结构化字段与事件
Next Evidence	Candidate / Paper Thread 的结构化字段
Reusable Asset	MVP 中作为 Artifact 或 repository resource 的 role；真正被跨对象复用后再注册
Claim	MVP 中嵌入 Candidate claim version 和 Paper contribution；Evidence Freeze 后再考虑独立 ledger
2.3 Paper Opportunity 与 Paper Project 不应是两种类

当前设计中 Paper Opportunity 没有稳定 ID，Paper Project 才是实体。这会破坏“自上次查看后哪条论文机会发生了变化”：

Opportunity 无法稳定引用；

Candidate 组合变化无法追踪；

Promotion 前后的叙事会断裂。

建议使用一个 Paper Thread：

YAML
paper_thread:
  id: PT-001
  display_stage: opportunity | project
  central_question:
  primary_track:
  candidate_roles:
    - candidate_id: C01
      role: core-claim
    - candidate_id: C03
      role: supporting-evaluation
  contributions:
    - text:
      candidate_claim_refs: []
      evidence_refs: []
  critical_missing_evidence: []
  novelty_threats: []
  next_gate:

UI 在 display_stage=opportunity 时显示 “Paper Opportunity”，升级后显示 “Paper Project”。不需要为 Opportunity 建 draft 文件。

升级为 Project 的 gate：

有 coherent central question；

至少一个 Candidate 已有 valid Local Result；

该结果实际改变过 Continue / Split 等 Decision；

已明确至少一个 contribution 与对应 evidence path；

已列出关键 novelty threats 和 missing evidence；

用户显式批准。

因此，“某 Candidate 通过一次有效 Cheap Probe”应当是必要条件，但不是充分条件。

2.4 多论文并行需要的关系

必须支持：

Candidate ↔ Paper Thread   many-to-many
Experiment Spec → primary Candidate + related Candidates
Artifact → multiple Evidence Links
Decision → one or multiple target Candidates

一个 Candidate 可以：

成为某篇论文的 core claim；

成为另一篇论文的 evaluator；

为第三篇论文提供 negative result 或 boundary condition。

但每个 Candidate 仍只有一个 primary Track，用于归档而不是科学归因。3×2 继续作为稳定资产索引是合理的。

bridge--glossary-program-map--f…

3. 推荐的状态机
3.1 Candidate
Radar
  → Audited
  → Defined
  → Probe Ready
  → Probed
  → Piloted
  → Confirmed

这些阶段只表达研究成熟度。另设：

work_state:
  active | blocked | parked | closed

Decision 是 append-only event：

Continue → 保持 active，可推进 maturity
Split    → parent closed，创建 children
Nest     → candidate closed，增加 nested_in edges
Merge    → source nodes closed，创建或指定 survivor
Park     → parked + unlock condition
Kill     → closed + kill reason

建议从 Candidate maturity 中删除 Paper。
Candidate 可以被 Paper Thread 使用，但 Candidate 不会“变成论文”。Paper integration 是关系，不是 Candidate 阶段。

3.2 Experiment Spec
draft → ready → superseded | retired

ready 的 gate：

Claim/falsification 已冻结；

independent variable、held constants 明确；

baseline、oracle、metric、stop rule 明确；

data snapshot/license 可用；

resource ceiling 明确。

Spec 不应出现 Running 状态。

3.3 Run

Run 只在实际提交或启动时创建，不为未来计划建空记录：

submitted → running → completed
                    ↘ execution_failed

不要继续用一个枚举混合执行、有效性和结论。建议拆成：

YAML
execution_status: submitted | running | completed | failed
validity: unknown | valid | invalid
outcome: positive | negative | mixed | inconclusive | not-applicable

这样：

基础设施失败：failed / unknown / not-applicable

数据泄漏：completed / invalid / not-applicable

有效负结果：completed / valid / negative

功效不足：completed / valid / inconclusive

3.4 Decision
proposed → approved → applied
         ↘ rejected
         ↘ superseded

必须区分：

Agent recommendation；

用户批准；

canonical 状态是否已经实际改变。

否则 Leader Brief 中的 “Decision” 很容易同时表示建议、口头同意和已应用状态。

3.5 Paper Thread
opportunity
  → project
  → evidence-frozen
  → drafting
  → internal-review
  → submitted
  → revision
  → published | closed

MVP 只实现：

opportunity → project

以及 contribution / missing evidence spine。完整投稿状态后续再做。

4. Human–Agent Settlement：方向正确，但当前 schema 不足以恢复状态

现有 Settlement 已包含 scope、changed、why it matters、evidence pointer、decision、next evidence 和 blocker，这些是正确的叙事字段。

bridge--reference-operations--3…

但它目前更像一张总结卡，不是可靠的状态变更协议。至少缺少：

Settlement/Event ID；

timestamp 和 actor；

base revision；

affected entities 列表；

结构化 change operations；

多个、不同类型的 evidence refs；

proposed / approved / applied Decision 区分；

同一轮多 Candidate 的 batch grouping；

idempotency 和 supersedes；

no_material_change 结果；

并发写入冲突检查；

next evidence 的验收条件。

推荐 schema：

YAML
research_event:
  event_id: EVT-000123
  batch_id: BATCH-20260804-07
  recorded_at: 2026-08-04T15:40:00+08:00
  actor: codex
  base_revision: 184

  affected_entities:
    - C01
    - E-C01-01

  changes:
    - entity_id: C01
      op: replace
      field: next_evidence
      before: "draft paired generator"
      after: "execute 180 paired cases against five baselines"

    - entity_id: E-C01-01
      op: create
      value_ref: research-index.yaml#/experiment_specs/E-C01-01

  narrative:
    changed: "..."
    why_it_matters: "..."

  evidence_refs:
    - type: source-paper
      ref: SRC-...
      relation: pressures
    - type: experiment-spec
      ref: E-C01-01
      relation: defines-test

  decision_refs: []

  next_evidence:
    deliverable: "baseline comparison artifact"
    acceptance_test: "all five baselines complete; paired failure slices emitted"
    dependency_refs: []

  blockers: []
  outcome: material-change
Settlement close-out 必须由工具保障

不要只依赖 Agent“记得写”。

建议实现一个 research close-out 命令：

读取 session base revision；

比较 repository diff 和 canonical entity changes；

找出受影响的 Candidate / Spec / Run / Paper Thread；

验证每个 material change 都有 Research Event；

验证 high-impact Decision 是否有批准；

无变更时写 outcome: no-material-change；

原子更新 index revision 并 append event。

多线程写入必须使用 optimistic locking：

event.base_revision == current_revision

不相等时拒绝静默覆盖，要求 rebase 后重新 Settlement。

5. Leader Brief 应采用“确定性选取，模型只负责表达”

Leader Brief 不能直接把所有 Settlement 丢给 LLM 总结。那会把不可解释的 attention ranking 引入系统。

推荐流程：

Research Events since checkpoint
  → materiality filter
  → typed grouping
  → deterministic priority policy
  → cap at 3–5 narratives
  → template rendering
  → optional LLM rewriting
  → pointer validation
5.1 只允许这些变化进入候选池

新 valid Local Result；

现有 Local Result 被 invalidated；

Candidate Claim 被实质收窄；

Continue / Split / Nest / Merge / Park / Kill；

Paper Thread gate 发生变化；

critical novelty threat 新增或被解除；

blocker 阻止当前 Probe；

Track 在其声明的运营模式下失去信息流；

需要用户批准的 Decision。

普通文档修改、运行日志、Source Paper 数量增长、页面更新不进入。

5.2 排序规则

按以下优先级，而不是研究质量“分数”：

等待用户批准的高影响 Decision；

新增或失效的 Local Result；

Candidate lineage 或 Claim scope 改变；

Paper Thread promotion/readiness 改变；

critical blocker；

active Track 无 evidence movement；

Source-only update，只有在威胁 active Candidate 时才进入。

同一原因引起的多个变化要合并。例如三篇新 Source Paper 同时压缩 C02，应生成一条 “C02 broad authority framing no longer survives”，而不是三条文献活动。

5.3 每条 Brief item 固定五段
What changed
Why it matters
Basis / Scope
Decision needed
Next evidence

额外显示：

stable entity links；

event IDs；

canonical as-of revision；

“为什么其他对象目前不需要关注”。

LLM 可以润色 why it matters，但：

不能决定哪些 item 入选；

不能改变 evidence type；

不能生成不存在的 pointer；

pointer validation 失败时回退到模板文本。

5.4 “自上次查看”需要独立 checkpoint

Research Event 记录程序发生了什么；用户是否看过属于 UI state。

MVP 可在浏览器 local storage 保存：

last_acknowledged_event_id

这不应写入 canonical research repository。跨设备同步、多人 checkpoint 后续再做。

6. L0–L3 信息架构

现有六个工作界面方向基本合理，但 MVP 不应把它们全部做成平级大模块，尤其在 0 Run 时不值得建设完整 Experiment Center。

Level	页面	默认显示	必须隐藏
L0	Now	as-of 信息；3–5 个 attention narratives；Decision inbox；Next Evidence；最近 Paper Threads；“目前无需关注”	全部 34 张独立 Candidate、完整 Source 列表、原始日志、资源明细
L1	Portfolio	六 Track 的 mode、最深 active Candidate、最近 depth event、blocker、Paper Thread 关联	每张 Candidate 全部字段、所有历史 Decision
L2	Research Map / Flow	Cluster→Gap→Candidate；Candidate maturity filters；Specs/Runs filtered view；Decision timeline	默认展开的巨型 DAG、所有 edge label
L3	Entity Workspace	Candidate 为主；Source、Cluster、Spec、Run、Decision、Paper Thread 的稳定详情页与双向链接	与该实体无关的全局指标

建议顶部导航：

Now | Portfolio | Research Map | Papers | Archive

Experiment Center 在 MVP 中作为 Research Map 下的 Specs / Runs 过滤视图。只有出现足够多真实 Run 后，才提升为独立入口。

核心用户旅程
1. 用户打开 Now
2. 阅读 3–5 个 material changes
3. 选择一个 Decision needed
4. 下钻到 Candidate
5. 查看 Claim version、Evidence Links、Spec/Run 和 Decision rationale
6. 批准、拒绝或要求新的 Evidence
7. 返回 Paper Thread，确认该变化如何影响论文证据脊柱
8. Agent 在下一轮完成工作并 Settlement
9. 下一次打开时从新 Event checkpoint 继续
7. 如何衡量“变深”而不是“变宽”

当前指标中“新增 Candidate 数”和“每分支每周新增三个候选”会奖励 width。后者应从全局纪律降级为 discovery-mode 的临时 heuristic。所有 Track 并不需要持续 Split；有时最科学的状态是主动 Park，并说明重新开启条件。

建议给 Track 增加显式模式：

explore   → 主要产出 source audit / new candidates
validate  → 主要产出 specs / runs / decisions
maintain  → 等待相关来源或复用已有资产
parked    → 有明确原因和 unlock condition

因此“无 Active Candidate”只有在 Track 处于 explore 或 validate 且长期无 material event 时才是 starvation。一个被明确 Park 的 Track 不是饿死。

Depth 不用单一总分，而用可审计的 depth events
Depth event	实际含义
Claim sharpened	broad idea 变成 scoped falsifiable claim
Threat retired	nearest-work pressure 或 killer baseline 被处理
Evaluator executable	counterfactual、metric、oracle 可真正运行
First Local Result	第一个 valid Run / Artifact
Decision closed	evidence 导致 Continue/Split/Nest/Park/Kill
Robustness expanded	增加第二数据集、模型族、seed 或关键消融
Paper integrated	Candidate claim 被某 Paper contribution 引用
Evidence frozen	contribution 的 scope 和支持边界冻结

Portfolio 层应表达为：

本周期：
- 2 个 Candidate 通过了 novelty/overlap gate
- 1 个 Candidate 获得首次 Local Result
- 1 个 Claim 被 killer baseline 推翻并 Split
- 2 个 Paper contributions 仍只有 Inference

而不是：

研究完成 42%

保留的量化指标可以包括：

Defined → first Decision 的时间；

valid Run → Decision 的时间；

decision-bearing Runs / valid Runs；

unresolved critical novelty threats；

active Candidate 无新增 admissible evidence 的时间；

Paper Thread 中各 contribution 的 evidence state；

Blocker 是否有可执行 unlock condition。

8. Agent 自动化与用户决策边界
Agent 可安全自动执行

schema validation；

entity/link normalization；

36 / 34、Run 数、Local Result 数等派生计算；

CURRENT.md 和 Dashboard 构建；

Source Paper metadata 和 scope 草稿；

duplicate / broken link / stale pointer 检查；

Run manifest 的机器字段采集；

Artifact digest 与链接；

material event grouping；

Leader Brief 候选选取；

在已批准 Spec 和 resource ceiling 内启动 Run；

提出 Continue / Split / Park 等建议。

Agent 可自动提出，但不应默认应用

Candidate Claim 的重大改写；

将 Source pressure 判断为 direct coverage；

变更 primary Track；

Continue / Park 高价值 Candidate；

把多个 Candidate 组合成 Paper Thread；

将某个结果解释为支持 mechanism 或 causal claim。

默认必须由用户批准

Split；

Nest；

Merge；

Kill；

Paper Opportunity → Paper Project；

Evidence Freeze；

Paper Project retirement；

重大 causal、health、clinical 或 safety claim；

超出既定 resource ceiling 的实验；

submission / public release。

Continue 和低影响 Park 是否可委托给 Agent，可以按 Candidate 设置 delegation policy；lineage-changing 决策不应委托。

9. MVP 验收标准
验收项	可测试条件
术语一致	canonical state 中不存在旧 Idea、论文命题型 Track、裸 Experiment、裸 Paper；archive 除外
计数正确	36 total nodes、34 independent Candidates 自动计算
诚实空状态	0 Run 时显示 0 Running、0 Local Result、0 empirical Decision
单点更新	修改一个 Candidate 一次，所有页面和汇总同步更新
Settlement 完整	每个 material canonical change 都能追到一个 Research Event
并发安全	stale base revision 的 Settlement 被拒绝，而不是覆盖
Evidence integrity	无 valid Run/Artifact 时无法写入 local-artifact support
Review integrity	External Review 无法直接改变 Candidate 或成为 Local Result
Decision control	Split/Nest/Merge/Kill/Project promotion 无批准时不能 applied
Brief 上限	L0 默认最多 5 条 material narratives
Brief 可追溯	每条 narrative 至少有一个有效 entity/event/evidence pointer
Cold-start 恢复	不打开聊天，用户能找到 top changes、待决策、next evidence、nearest Paper Thread
End-to-end lineage	Source→Cluster→Gap→Candidate，以及 Candidate→Spec→Run→Artifact→Decision→Paper Thread 均可导航
Dogfood	至少一个真实 Cheap Probe 完整通过 Spec、Run、Artifact、Decision、Settlement 和 Dashboard

30 秒验收可用一个实际任务测试，而不是主观评价：

从冷启动首页识别：最重要的三个变化、当前唯一需要用户批准的 Decision、下一条 Local Evidence、最接近 Project gate 的 Paper Thread、一个目前无需关注的 Track。

用户在 30 秒内答对至少四项，才算满足 L0 合同。

10. 分阶段路线图
Phase 0：语义收敛

Codex 对本回答形成 accepted / modified / rejected verdict；

建立 Source Authority manifest；

将旧 Asset Protocol 标记为 superseded；

完成 Branch → Track / Split、Proposal → Candidate view、Experiment → Spec/Run 迁移；

冻结 schema v1。

Phase 1：Canonical state 与 Settlement

建 research-index.yaml；

建 append-only research-events.jsonl；

实现 schema validator；

实现 atomic update + optimistic locking；

导入 36 / 34 口径；

生成而不是手写 CURRENT.md。

不建议采用完整 event sourcing。更务实的方式是：

research-index.yaml 是 current-state truth；

research-events.jsonl 是 delta/audit truth；

所有写入必须通过一个工具原子更新两者；

revision 不一致时 fail closed。

Phase 2：Leader-facing MVP

实现：

Now；

Portfolio；

Research Map；

Candidate Workspace；

Paper Threads；

Archive；

deterministic Leader Brief；

local last-view checkpoint。

此阶段不做编辑 UI，不做自动派发线程。

Phase 3：真实 Run dogfood

使用当前已经 Probe Ready、CPU/API 可执行的 Candidate 完成第一条端到端链。现有 backlog 将 C01、C03、C13、C23、C25 列为 Cheap Probe Ready，其中 C01 是当前优先 probe 之一。

bridge--decisions-problem-backl…

该 Run 必须实际验证：

Spec readiness
→ Run launch
→ manifest
→ Artifact digest
→ validity/outcome
→ Evidence Link
→ Decision proposal
→ approval/application
→ Settlement
→ Leader Brief

在这条链成功前，不再增加新的 dashboard 模块。

Phase 4：Evidence composition

Paper contribution/evidence spine；

Claim version comparison；

External Review resolution；

Run manifest 自动采集；

Artifact 图表挂接；

experiment/run filtered views。

Phase 5：效率能力

source intake；

Cluster/Candidate draft suggestions；

semantic search；

hosted read access；

notifications；

decision approval UI；
-跨线程工作派发。

Assumptions / Unknowns
Evidence-bounded assumptions

本轮提供的是部分 Evidence Bundle。没有直接提供或无法独立检查：

research-idea-forest-site 的实际源代码；

app/research-data.ts 的真实 725 行实现；

templates/run-manifest.yaml；

Bridge close-out hook；

当前 schema validator；

文件锁、并发或原子更新机制；

一个真实 Experiment / Run；

实际 Leader 用户测试；

管理一张 Candidate 的真实耗时。

因此，关于“8 个 Proposal、11 个手工 Experiment、0 canonical Experiment、无 Paper Project”的判断来自 bundle 中 Codex 已记录的核实结果，而不是本轮再次读取 site repository 得出的独立结论。

bridge--reference-requirements-…

仍需用户决定的关键问题

Paper Thread 命名
是否接受一个稳定实体通过 stage 同时承载 Paper Opportunity 和 Paper Project；还是坚持两种命名，但共享同一稳定 internal ID。

Project promotion gate
是否接受“一个 valid Cheap Probe 只是必要条件，不是充分条件”。

Decision delegation
Continue / Park 是否可按 Candidate 委托给 Agent；Split / Nest / Merge / Kill 是否全部保留给用户。

Track 运营模式
是否废除“每 Track 每周固定新增 Candidate”的硬性额度，改为 explore / validate / maintain / parked。

Candidate 与 Paper Thread 的多对多关系
是否允许一个 Candidate 同时服务多篇 Paper Thread。我的建议是允许，并显式记录 role。

Current state 与 event history 的权威关系
建议 index 是 current state truth，events 是 audit/delta truth，由单一写入工具保持一致；不建议手工同时编辑。

跨设备的 last-view checkpoint
MVP 使用浏览器本地状态是否足够；如果用户经常跨设备，需要后续引入轻量服务端状态。

Risks
风险	为什么危险	控制方式
Meta-research 吞噬实际研究	当前已有大量规范但 0 Run	MVP 结束门必须是一条真实 Cheap Probe，而不是页面完成
旧 ontology 污染 Agent	Project Sources 同时包含新旧 canonical 定义	authority manifest + superseded metadata
Evidence 过度汇总	Candidate 显示 Local Result 可能掩盖 novelty/causality 仍是 inference	assertion-level Evidence Links
Paper Project 过早泛滥	一次小 probe 就创建 PP，会形成很多无证据叙事	coherent spine + user promotion gate
Width gaming	每 Track 固定生成 Candidate 奖励数量	Track mode + depth events
Settlement 漏写	线程关闭后状态仍丢失	close-out validator，不依赖 Agent 自觉
并发丢更新	多 Codex 线程写同一 index	revision locking + atomic writer
Event/index 分叉	Brief 与当前状态不一致	单一写入工具和 consistency test
LLM Brief 重新发明事实	narrative 看起来可信但无法追溯	deterministic selection、pointer validation、template fallback
读写能力混淆	只读 HTML 被称为 control plane，用户误以为能执行决策	MVP 明确为 read-only sensemaking plane；审批/派发后才升级
空执行层被过度设计	0 Run 时建设完整实验 UI	先用过滤视图，真实 Run 增长后再升级
Source count 被当成 coverage	文献多不等于 novelty audit 完成	Cluster-level overlap、scope 和 nearest-pressure 字段
Next Actions for Codex

先写本地 verdict。
将本回答逐项标记为 accepted / modified / rejected / unverified，不要直接修改 canonical 研究状态。

建立 authority manifest，并清理 Project Sources 的权威层级。
新 CONTEXT.md、REQUIREMENTS_AUTO_RESEARCH_OS.md、OPERATIONS.md 为 canonical；旧 ASSET_PROTOCOL.md、WEEKLY_ITERATION.md、PORTFOLIO_SELF_AUDIT.md 标记 frozen/superseded。

写一份单页 Architecture Decision Record。
只冻结：

North Star；

persisted entities；

Views；

Evidence Link semantics；

Decision authority；

Paper Thread promotion gate；

index/event 权威关系。

定义 schema v1 和禁止项。
Validator 应拒绝：

裸 Paper；

Proposal entity；

裸 Experiment entity；

论文命题型 Track；

valid Run 缺失却声明 Local Result；

External Review 使用 supports；

未批准的 high-impact applied Decision。

实现唯一写入入口。
提供 research update 和 research close-out，原子更新 research-index.yaml 与 research-events.jsonl，并检查 base revision。

迁移当前状态。
明确导入：

36 total nodes；

34 independent Candidates；

C14/C15 nested；

0 actual Runs；

0 Local Results；

当前已存在的 literature-based Decisions；

所有 bootstrap date 不再冒充真实 Decision date。

先构建最薄的 Leader MVP。
实现 Now、Portfolio、Research Map、Candidate Workspace、Paper Threads。所有数字派生，所有 brief item 可回溯。

加入固定 fixture tests。
至少覆盖：

source pressure 导致 Nest，但不产生 Local Result；

valid negative Run 导致 Kill；

External Review 未经 verdict 不改变 Candidate；

两线程 stale revision 冲突；

6 个 material events 被压缩成 3 条 narrative；

0 material change 时首页明确显示“没有新的研究判断变化”。

立即用一个 Probe Ready Candidate dogfood。
不再等完整 UI。让 C01 或另一个无需 GPU 的 Candidate 产生第一条真实 Spec→Run→Artifact→Decision→Settlement 链。

只有在 dogfood 暴露真实摩擦后，再决定后续对象。
Claim ledger、Reusable Asset registry、完整 Experiment Center、审批 UI 和自动派发都应由首批真实 Run 的摩擦驱动，而不是提前按想象铺开。


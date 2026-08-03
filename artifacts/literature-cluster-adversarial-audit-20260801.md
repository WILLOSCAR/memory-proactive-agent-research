# GPT Pro Evidence Bundle

## Metadata
- Generated: 2026-08-01T00:11:42+08:00
- Repository label: `memory-proactive-agent-research`
- Mode: `paper_brainstorm`
- Repository context: `explicit`
- Auto dependency closure: `not-applicable`
- Bridge thread id: `auto-research-20260801-adversarially-audit-the-six-branch-literat`
- Bridge project id: `auto-research`
- Codex session id: `auto-research-20260801-adversarially-audit-the-six-branch-literat-codex`
- Git branch: `main`
- Git commit: `<uncommitted>`

## User Goal
Review the six-branch literature map, identify what problems the cited papers actually study, cluster overlapping work, and derive a branching idea forest without overstating novelty.

## Question for GPT Pro
Which clusters and candidate ideas are genuinely supported, which are crowded or incorrectly framed, what primary papers are missing, and how should the six-branch idea tree be revised for fast falsifiable iteration?

## Evidence Contract
Treat this package as partial evidence. Do not assume access to unlisted files. Separate observed facts from inference and state missing evidence explicitly.

### Codex notes
- Missing by explicit override.

### Thread context
- `context/bridge-thread-context.md`

### Project context
- `context/bridge-project-context.md`

### Repository files
- `source/PROJECT_BRIEF.md` — explicit include
- `source/PROGRAM_MAP.md` — explicit include
- `source/CURRENT.md` — explicit include
- `source/PROBLEM_BACKLOG.md` — explicit include
- `source/LITERATURE_MAP.md` — explicit include
- `source/sources/2026-07-30-adjacent-source-ledger.md` — explicit include

Files not listed above were not supplied. Secret/env files, credentials, cookies, private keys, databases, raw data, vendor trees, and large artifacts are excluded by policy.

## Git Status
```txt
?? CURRENT.md
?? GPT_PRO_REVIEW.md
?? LITERATURE_MAP.md
?? OPERATIONS.md
?? PROBLEM_BACKLOG.md
?? PROGRAM_MAP.md
?? PROJECT_BRIEF.md
?? README.md
?? archive/
?? artifacts/
?? infra/
?? operations/
?? review/
?? scripts/
?? sources/
?? templates/
```

## Git Diff Stat
```txt
<no diff stat or unavailable>
```

## Supplied Source Files

### `PROJECT_BRIEF.md`
```markdown
# Auto Research: Memory, Proactive Agent and Personalization

状态：长期项目简报 v2  
更新日期：2026-07-30

## Goal

围绕 AI Memory、Proactive Agent、Personalization 持续、高频地产出可投稿的问题、评测、方法和实验资产。主场景是论文；Auto Research 是用户与 Agent 共同完成论文调研、问题发现、廉价证伪、实验执行和资产沉淀的 SOP。

当前阶段只做 paper-driven problem/evaluation discovery，不设置 Draft gate。反馈周期是 1–2 周；6–8 周只表示滚动 portfolio 观察窗口，不是等到周期末才产出。

## Research object

上位对象不是六个互相独立的模块，而是：

> 一个在用户、历史、环境、权限、传感器、工具和自身记忆持续变化时，必须在信息不完全下选择获取信息、等待、行动、不行动、撤回与修复的长期 Agent。

核心问题是如何保持长期决策质量可校正、可撤销、可归责，并避免用组件 proxy 代替真实增量价值。

## Asset index

`Memory / Proactive Agent / Personalization × general / physiological` 的 3×2 矩阵是运营与资产索引，不是学术 ontology 或发现边界：

| ID | Branch | 主要操纵面 |
| --- | --- | --- |
| M-AI | AI Memory | write/update/retrieve/forget/authority/rollback |
| M-PHY | Physiological Memory | continuous/missing/multi-timescale state and memory |
| P-AI | Proactive Agent | silence/wait/ask/suggest/prepare/execute/retract |
| P-PHY | Physiological Proactive Agent | need/receptivity/feasibility/effect/active sensing |
| U-AI | AI Personalization | role/context/time preference and feedback |
| U-PHY | Physiological Personalization | baseline/drift/response/cold-start adaptation |

六个分支都持续产生多个 idea、cheap probes、paper candidates 和论文。一个具体 claim 被 kill，不关闭分支。

## Discovery contract

每个候选从论文限制、benchmark 盲区、指标代理错位或真实 failure 出发，并至少定义：

- falsifiable problem；
- failure event、受害者和代价；
- evaluation unit 与 horizon；
- 一个非默认动作；
- no-action/alternative-action counterfactual；
- strongest simple baseline 与 oracle；
- 1–3 天 cheap probe；
- continue/branch/park/kill 条件；
- nearest work 与 novelty threat；
- resource ceiling。

当前 3×2 中每个分支至少维护 6 个不同 failure family；每周继续高速补充并至少证伪一个节点。数量可以激进，novelty 和 causal claim 必须保守。

## First-class outputs

以下均可成为主要论文贡献：

- method / learning problem；
- benchmark / dataset；
- evaluation protocol；
- failure taxonomy / diagnosis；
- proxy or causal audit；
- systems mechanism；
- longitudinal analysis；
- UbiComp/HCI system、interaction 或 field study。

评测本身不是附属工作。它需要改变方法/policy 排名、暴露现有指标看不到的重要 failure，或建立更正确的 estimand。

## Physiological / multimodal boundary

生理/行为数据只有在改变 observation、ground truth、个人 baseline、missingness、drift、intervention outcome、privacy、sensing budget 或评测方式时，才构成 `*-PHY` 研究贡献。只把现成方法换到 wearable dataset 上，不足以构成 novelty。

## Operating constraints

- Paper Radar、evaluation audit、data work、CPU/API replay 可以六线并行；
- 同一时间只运行一个单卡 smoke；
- 重训练最多 1–2 个 experiment 并发，只给已通过 cheap probe 的候选；
- 7B/8B LoRA 通常不超过 `2×A100/A800 80G`；
- confirmation 才考虑 `2–4×80G`；
- 8 卡、大规模 wearable pretraining、长序列 RL 和完整产品不是当前关键路径；
- GPU 供应不稳定，交互调试、稳定 Job 与跨 SSH 数据路径分开验收；
- 数据 source of truth 使用 HDFS、对象存储或可复用云盘 URI，并记录 digest；
- prediction、acceptance、receptivity 与 causal treatment effect 严格分开。

## Asset contract

``​`text
Source / Failure
  → Paper Radar → Eval Landscape → White-space Inbox
  → Problem Definition → Cheap Probe
  → Continue / Branch / Park / Kill
  → Experiment → Run → Artifact → Decision
``​`

- 3×2 `primary_branch` 只做资产归档；科学评测另行做 writer/memory/retrieval/reasoning/policy/tool/interface 责任归因；
- Experiment design 与 Run execution 分离；
- raw artifact、Run manifest、Prompt 版本与外部评审不可覆盖；
- negative、failed、invalid、inconclusive 严格区分；
- 当前不为 Draft、候选论文或每个 brainstorm 建文件；
- Project Sources 是长期背景；Task Bundle 是单轮不可变快照；
- 原始个人数据、凭据和未脱敏日志不得上传外部模型。

## Current discovery set

P1–P6 已降级为 paper seeds。当前 36 个候选中优先用 cheap probe 检验：

- C01 lifecycle counterfactuals；
- C03 revocation propagation；
- C13 multi-action deferral；
- C15 post-action correction；
- C23 closed-loop confounding；
- C25 preference conflict；
- C31 drift attribution；
- C08 missingness-aware active sensing。

它们不是已批准论文题目；只有最先改变 continue/kill 判断的实验才升级。

```

### `PROGRAM_MAP.md`
```markdown
# Research Program and Asset Index

状态：v3，当前主结构  
更新日期：2026-07-30

## 1. 上位研究对象

本项目研究的不是六个互相独立的模块，而是：

> 一个在用户、环境、权限、传感器、工具和自身记忆持续变化时，必须在信息不完全下选择获取信息、等待、行动、不行动、撤回与修复的长期 Agent。

核心科学问题是：在状态变化、观测不完整、动作代价不对称、未来又受当前动作影响的条件下，Agent 如何维持可校正、可撤销、可归责的长期决策质量。

Memory、Proactive Agent、Personalization 是三个主要操纵面；physiological / multimodal data 是一组特别重要的长期、缺失、个体差异、隐私与干预压力。

## 2. 3×2 资产索引

``​`text
Research Program
├── 01. AI Memory
│   ├── M-AI: 通用 AI Memory
│   └── M-PHY: 生理/行为数据下的 Memory
├── 02. Proactive Agent
│   ├── P-AI: 通用 Proactive Agent
│   └── P-PHY: 生理/行为数据下的 Proactive Agent
└── 03. Personalization
    ├── U-AI: 通用 AI Personalization
    └── U-PHY: 生理/行为数据下的 Personalization
``​`

这张矩阵负责：

- 给 source、idea、experiment 和 artifact 一个稳定索引；
- 让六个分支都持续产生问题、评测和实验；
- 避免同一资产在多个目录重复记账；
- 统计 portfolio 覆盖与资源消耗。

它不负责：

- 宣称六个格子是学术 ontology；
- 限制白空间发现只能从六格内部开始；
- 把跨分支 failure 强行压成一个组件问题；
- 规定每格只能产出一篇论文。

## 3. 六个索引分支

| ID | 主要操纵面 | 典型问题 | 可独立产出的论文形态 |
| --- | --- | --- | --- |
| M-AI | write/update/retrieve/forget/authority/rollback | lifecycle、revocation、shared memory、parametric memory | method、benchmark、diagnosis、systems |
| M-PHY | 连续信号如何形成决策可用的长期状态 | missingness、multi-timescale、derived-data deletion | method、benchmark、dataset、analysis |
| P-AI | 是否、何时、以何种动作介入 | silence/wait/ask/prepare/execute/retract | policy、benchmark、evaluation、RL |
| P-PHY | 生理/行为状态何时足以支持介入 | need、receptivity、effect、active sensing | causal audit、policy、benchmark、HCI |
| U-AI | 动态用户模型如何被正确使用和纠正 | role conflict、feedback ambiguity、correction debt | method、benchmark、analysis |
| U-PHY | 个体基线与长期变化如何被识别和适应 | drift attribution、cold start、response heterogeneity | method、benchmark、longitudinal analysis |

每个分支可以同时拥有多个 idea、cheap probes 和 paper candidates。一个具体 claim 被 kill，不关闭分支。

## 4. 开放式问题发现框架

问题发现不从“我要做哪一格”开始，而从真实 failure event 开始，并至少展开以下维度：

| Axis | 需要问什么 |
| --- | --- |
| state subject | world、user、physiology、permission、tool、memory、social context 中谁变了 |
| lifecycle | create、update、conflict、revoke、expire、delete、restore、revive 是否被观察 |
| horizon | decision、episode、trajectory、lifecycle、deployment period 哪个单位才看得到失败 |
| observability | missing、noisy、delayed、MNAR、contradictory 是否影响决策 |
| information action | retrieve、ask、verify、sense、wait、monitor 的成本是什么 |
| identity | 信息属于谁，谁有权更新、撤销和使用 |
| intervention action | silence、suggest、prepare、execute、withdraw、correct 是否可选 |
| timing | early/on-time/late、interruptibility 和 delivery modality 如何计价 |
| uncertainty | confidence 是否按动作风险和可逆性校准 |
| consequence | 是否有 no-action/alternative-action counterfactual 与长期累计后果 |
| governance | provenance、purpose、consent、authority、privacy、deletion 是否可审计 |
| responsibility | writer、memory、retrieval、reasoning、policy、tool、interface 中谁导致失败 |

这是一套生成白空间的 grammar，不是需要新建目录的 taxonomy。

## 5. Physiological / multimodal 的角色

生理与行为数据只有在至少改变下列一项时，才构成真正的 `*-PHY` 研究设置：

- observation 连续、异步、缺失或 MNAR；
- 时间尺度从秒到周跨层耦合；
- 个人 baseline 和用户间差异改变 ground truth；
- device/placement/lifestyle/physiology drift 需要区分；
- intervention 改变后续状态、依从性或缺失模式；
- privacy、consent、derived-data deletion 进入方法或评测；
- sensing budget、端侧算力、能耗或主动采集成为决策变量。

若只是把现成算法换到 wearable dataset 上，优先视为应用或产品载体，不自动成为 `*-PHY` novelty。

这些压力也可能出现在 smart home、共享设备、AR、industrial monitoring 或 coding telemetry 中，因此 discovery 阶段允许把它们作为跨场景 stressor 迁移。

## 6. 横切标签

| Tag | 典型分支 |
| --- | --- |
| lifecycle / forgetting / prospective-memory | M-AI、M-PHY、P-AI |
| provenance / authority / revocation | M-AI 为主，六分支均可 |
| uncertainty / meta-memory / selectivity | M-AI、P-AI、U-AI |
| shared-memory / identity / access-control | M-AI、P-AI、U-AI |
| self-evolution / parametric-memory / rollback | M-AI、U-AI |
| active-retrieval / active-sensing | M-*、P-* |
| causal-intervention / closed-loop | P-*、U-PHY |
| drift / continual-learning / co-adaptation | U-*、M-PHY |
| repair / withdrawal / reversibility | M-*、P-*、U-* |
| autonomy / explanation / privacy / consent | 六个分支 |
| on-device / delivery-modality / social-context | PHY、P-*、产品层 |

横切标签可以形成独立 paper family，但不因一次 brainstorm 就升级为一级目录。

## 7. 资产归档与科学归因分离

一个 idea、experiment 或 run 仍只选一个 `primary_branch`：

- 主要操纵 memory 表示、写入、更新、检索、遗忘或撤权：`M-*`；
- 主要操纵是否、何时、如何介入：`P-*`；
- 主要操纵用户模型、适配或反馈学习：`U-*`。

这个规则只解决资产归档，不替代科学责任归因。评测必须允许同时标注：

``​`text
writer → memory → retrieval → reasoning → policy → tool → interface
``​`

最终失败由哪一层触发、哪一层本可阻止、哪一层负责修复，应分别报告。

## 8. 一等论文形态

以下均可成为主要产出，不要求先发明新模型：

- method / learning problem；
- benchmark / dataset；
- evaluation protocol；
- failure taxonomy / diagnosis；
- causal audit / proxy audit；
- systems mechanism；
- longitudinal analysis；
- UbiComp/HCI system、interaction 或 field study。

评测论文必须能改变模型或 policy 排名、暴露现有指标不可见的重要 failure，或建立更正确的 estimand；只增加样例而不改变结论不够。

## 9. 产品层

``​`text
products/
├── smartwatch / wearable notification
├── IMU-triggered micro interaction
├── AR / smart-glasses assistance
├── audio / haptic / ambient interaction
├── personal health reflection
└── other point products
``​`

Point product 主要服务 UbiComp/IMWUT/CHI 的 system、sensing、interaction、deployment 或 user-study 贡献。若产品产生可泛化的新方法、benchmark、dataset 或 evaluation failure，再链接回一个 primary branch。

## 10. 迭代与资源

- 研究反馈周期是 1–2 周；6–8 周只表示滚动 portfolio 观察窗口，不是等到周期末才产出；
- 当前阶段不设 Draft gate，优先从论文和 benchmark 中发现、定义、证伪问题；
- 六个分支都可高频生成 idea、evaluator、slice、oracle、negative result 和 branch；
- CPU/API/replay 可以全线并行；
- 同时只运行一个单卡 smoke，重训练最多 1–2 个 experiment 并发；
- 7B/8B LoRA 通常不超过 `2×A100/A800 80G`，confirmation 才考虑 `2–4×80G`；
- 8 卡、大规模 wearable pretraining 和长序列 RL 不进入当前关键路径；
- GPU 与跨 SSH 数据路径统一按 `infra/GPU_RUNBOOK.md` 刷新和验收。

GPU 调度只决定实验何时运行，不能反向决定哪些研究问题存在。

## 11. Auto Research 资产流

``​`text
Source / Failure
      ↓
Paper Radar → Eval Landscape → White-space Inbox
      ↓
Problem Definition → Cheap Probe
      ↓
Continue / Branch / Park / Kill
      ↓
Experiment → Run → Artifact → Decision
``​`

可复用的是方法、Prompt、evaluator、数据 schema 和工具；不强制不同论文共享实现，也不为尚未开始的 paper 建空目录。

```

### `CURRENT.md`
```markdown
# Current Research Kanban

周期：2026-07-30 至 2026-08-12  
更新日期：2026-07-31  
阶段：论文驱动的问题发现与评测空间广扫；暂不设置 Draft gate

## 本周期唯一目标

把论文、benchmark、真实失败与产品情境转成大量可证伪的研究问题，并用 1–3 天的 cheap probe 快速分叉。当前不以“实现了几个模型”或“写了几篇 draft”衡量进度。

六个分支持续并行，但 `3×2` 只负责资产索引。真正的共同研究对象是：

> 一个在用户、历史、环境、权限、传感器、工具和自身记忆持续变化时，必须选择获取信息、等待、行动、不行动与修复的长期 Agent。

## 狂暴 brainstorm 合同

每个分支在本周期都执行以下循环：

1. 维护至少 6 个不同 failure family 的候选，不允许只是同一 gate 的换名；
2. 每周至少补充 3 个从论文限制、benchmark 盲区或真实失败推出的新候选；
3. 每周至少完成 1 个 evaluation contradiction、data audit 或 1–3 天 cheap probe；
4. 每个 probe 必须有 killer baseline、counterfactual、受害者/代价和 kill/branch 条件；
5. 每周至少明确 kill 或 branch 一个节点，避免 backlog 只增不减；
6. `Continue` 只表示问题值得继续，不等于立刻训练或开始写 Draft。

数量可以激进，主张必须克制。`current ledger 未观察到直接覆盖` 可以写；系统检索前不能写 `此前没有工作研究过`。

## 当前阶段发现

1. **真正的研究对象不是三个孤立组件，而是变化环境中的长期 Agent。** Memory、Proactive、Personalization 更像三个操纵面；3×2 继续承担资产索引，不限制 discovery。
2. **现有组件指标与真实 Agent 价值之间存在系统性错位。** retrieval recall、memory QA、trigger F1、acceptance、personalized gain 和 outcome prediction 都看不到 no-action counterfactual、长期累积代价或责任归因。
3. **Memory 最强的白空间集中在 lifecycle 与 governance。** update/cancel/expiry/delete/revival、跨层 revocation residue、action-specific authority 和 identity boundary 比“再做一个 memory bank”更可测。
4. **Proactive 不应继续只是 act/silent 二分类。** wait、ask、prepare、withdraw、correct、timing regret 与行动后的 repair 构成一组独立 failure family。
5. **Personalization 的核心压力从“是否使用用户信息”转向冲突与修正。** role/context/time preference conflict、feedback ambiguity、correction debt 和 policy-induced user change 更有独立性。
6. **生理/行为方向的价值来自特殊评测压力，不是换数据集。** missingness/MNAR、active sensing、drift attribution、closed-loop confounding、干预后状态变化和 derived-data deletion 是当前最重要的切口。
7. **Evaluation 本身可以是论文主贡献。** 前提是它改变方法/policy 排名、暴露重要而不可观察的 failure，或修正 causal/decision estimand；仅增加题量不够。
8. **2026 年的 Memory/Proactive benchmark 已快速占据“从组件到行动”的中间层。** MemoryArena、LongMemEval-V2、ProEvent、π-Bench、ProAgentBench 和 AgentAbstain 使“长期”“主动”“不行动”本身不再足以构成 novelty。
9. **几个原 core idea 必须收窄。** C08 受到 LSM-2 的直接方法压力；C14 受到 ProactiveVideoQA/ProEvent 的 timing 压力；C15 受到 cancellation、repair 与 post-hoc abstention 工作的邻近覆盖；它们先回到 overlap audit。
10. **P-PHY 必须使用 JITAI/MRT 的成熟因果语言。** need、receptivity、feasibility、response prediction 与 treatment effect 不是同一变量；没有 assignment、availability、propensity 与 outcome 时不做 causal claim。
11. **U-AI/U-PHY 的更强切口是归因而非单纯适配。** 长期偏好与 few-shot adaptation 已有明确 benchmark；下一步应问发生了哪种冲突/漂移、该更新哪一层、错误更新如何撤销。

这些是当前 paper/evaluation audit 得到的研究判断；尚未产生本项目 empirical result。

## 动态 Kanban

``​`text
Paper Radar
  → Eval Landscape
  → White-space Inbox
  → Problem Definition
  → Cheap Probe
  → Continue / Branch / Park / Kill
``​`

`CURRENT.md` 是 card 当前列、next action 与 blocker 的唯一动态视图；`PROBLEM_BACKLOG.md` 保存稳定的问题定义、证据边界和初始路由。

### 当前快照

| Column | 数量 | Cards | 当前含义 |
| --- | ---: | --- | --- |
| Paper Radar | 22 | M-AI: C05–C06；M-PHY: C07/C09–C12；P-AI: C16–C18；P-PHY: C20–C22/C24；U-AI: C27/C29–C30；U-PHY: C32–C36 | 已形成候选，尚未完成覆盖与可测量性审计 |
| Eval / overlap audit | 7 | C02、C04、C08、C14、C15、C19、C26 | 先确认 direct coverage、数据构念、causal identifiability 或独立评测变量 |
| Problem Definition | 1 | C28 | 问题有价值，正在冻结 feedback-cause schema 与 matched-pair 设计 |
| Cheap Probe Ready | 5 | C01、C03、C13、C23、C25 | evaluator、oracle 与 killer baseline 可以立即实现 |
| Data / GPU Gate | 1 | C31 | 先完成公开数据与真实 shift metadata 对齐，再使用单卡 |
| Continue / Branch / Park / Kill | 0 | — | 尚无本项目 Run，因此当前不能产生经验性终局判断 |

合计：36 个 candidates。当前所谓“发现”是问题空间、评测盲区和可证伪设计，不是已经跑出的 benchmark 结果。

### 看板移动规则

| From → To | 必须新增的证据 |
| --- | --- |
| Radar → Eval audit | nearest work、benchmark protocol 或真实 failure 原始来源 |
| Eval audit → Problem Definition | 明确已覆盖/部分覆盖/不可观察，并能写出 falsifiable statement |
| Problem Definition → Cheap Probe | evaluation unit、counterfactual、killer baseline、1–3 天 probe 与 kill rule 齐全 |
| Cheap Probe → Continue | 同预算强 baseline 后仍有稳定 failure/headroom |
| Cheap Probe → Branch | failure 成立，但方法变量、评测单位或数据选择错误 |
| Any → Park | 缺数据、许可、ground truth 或当前资源，并写明解锁条件 |
| Any → Kill | 已被直接覆盖、无 headroom、proxy 无判别力或问题不可识别 |

`Problem Definition` 或 `Cheap Probe` 连续 5 个工作日没有决策信息，必须 branch、park 或 kill。卡片只按证据移动，不按“写了多少文档”移动。

## 当前核心候选

| Branch | Candidate | 当前问题 | 本周期动作 | 资源上限 | 状态 |
| --- | --- | --- | --- | --- | --- |
| M-AI | C01 Lifecycle Counterfactuals | update/cancel/expiry/delete/revival 是否暴露稳定 lifecycle failure | 180 组 paired trajectories + 5 baselines | CPU/API | `probe-ready` |
| M-AI | C03 Revocation Propagation | 删除后影响是否残留在 summary/cache/index/adapter | 四层 canary + residual-influence matrix | CPU/API | `probe-ready` |
| M-PHY | C08 Missingness + Active Sensing | LSM-2 之后，MNAR cause + ask/wait/sense + action regret 是否仍有独立价值 | paper overlap + data/metadata audit；暂不启动 GPU | CPU | `overlap-audit` |
| P-AI | C13 Multi-Action Deferral | binary trigger 是否掩盖 wait/ask/prepare 的价值 | 250 decision points × 6 actions × 3 costs | CPU/API | `probe-ready` |
| P-AI | C15 Retraction / Correction | cancellation/repair 工作之后，跨消息、事件、工具的 repair 是否仍未覆盖 | ProEvent/MemSecBench/AgentAbstain overlap matrix | CPU | `overlap-audit` |
| P-PHY | C23 Closed-Loop Confounding | prediction proxy 是否导致真实 policy ranking reversal | known-ground-truth SCM + ranking map | CPU | `probe-ready-diagnosis` |
| U-AI | C25 Preference Conflict | role/context/time conflict 是否超出 latest/role filter | 200 counterfactual swaps + correction debt | CPU/API | `probe-ready` |
| U-PHY | C31 Drift Attribution | detection 之后，错误归因是否导致错误适配 | 2 datasets × 4 shift families × baselines | 1 GPU | `data-gate` |

并行数据审计：C19 只先检查 treatment assignment、availability、propensity、proximal outcome 和 license。缺任何关键识别条件，就保留为 evaluation/diagnosis，不包装成 causal paper。

## 执行车道

### CPU/API 主链

``​`text
C01 + C03 + C13 + C25 + C23
                     ↓
        C02 / C08 / C14 / C15 overlap audit
``​`

这些任务可以并行搭 evaluator，但每个 evaluator 必须先跑最强简单 baseline。C23 的模拟结果只能证明“某些条件下代理指标会错误排序”，不能直接证明真实干预有效。

### 单卡主链

``​`text
C31 data alignment → smoke → release
``​`

同一时间只运行一个 GPU smoke。C08 在文献与数据 overlap audit 通过前不进入 GPU 队列。synthetic shift 只能验证 harness 与 failure possibility；若要声称真实 drift attribution，需要公开数据中的时间、设备或佩戴变化证据。

## 统一最小样例

``​`yaml
latent_state: {}
observations:
  available: []
  missing: []
  provenance: []
history:
  events: []
  updates: []
  revocations: []
available_information_actions: [retrieve, ask, verify, sense, wait]
available_intervention_actions: [silence, suggest, prepare, execute, withdraw, correct]
counterfactuals:
  no_action_outcome:
  alternative_action_outcomes:
cost_vector:
  miss:
  false_alarm:
  delay:
  interruption:
  privacy:
  authority:
  compute:
  repair:
attribution_labels:
  writer:
  memory:
  retrieval:
  reasoning:
  policy:
  tool:
  interface:
``​`

## 本周期结束时只做四类决定

- `continue`：已有稳定 failure/headroom，下一步仍以信息增益排序；
- `branch`：问题成立，但当前方法变量、评测单位或数据不对；
- `park`：问题重要，当前缺数据、许可、ground truth 或资源；
- `kill`：无 headroom、已被覆盖、代理指标错误或不可识别。

P1–P6 现已降级为历史 seeds，不再硬编码成六条唯一论文线。它们与 36 个候选的映射、Top 12 和证据边界统一维护在 `PROBLEM_BACKLOG.md`。

```

### `PROBLEM_BACKLOG.md`
```markdown
# Research Problem and Evaluation Backlog

更新日期：2026-07-30  
状态：aggressive discovery v2；当前不设 Draft gate

这里是研究问题定义与证据边界的唯一 source of truth，不是论文摘要库；card 的实时 column、next action 与 blocker 维护在 `CURRENT.md`。候选可以大量生成，但进入 cheap probe 前必须说明真实 failure、评测单位、counterfactual、killer baseline、代价和证伪条件。

证据状态：

- `source-supported`：当前 ledger 中有已打开的原始页面或正文支持该事实；
- `inference`：由多个来源或设计空间推导，尚不是实验结论；
- `unverified-lead`：只是一条精确检索线索；
- `local-result`：必须指向本项目 Run/Artifact；当前尚无此类结果。

`verified` 只表示核对了来源，不表示复现或接受作者结论。

## 1. 根问题重写

当前上位研究对象是：

> 一个在用户、历史、环境、权限、传感器、工具和自身记忆持续变化时，必须在信息不完全下选择获取信息、等待、行动、不行动、撤回与修复的长期 Agent。

真正需要评测的是长期决策质量是否可校正、可撤销、可归责，而不只是：

- retrieval recall；
- memory QA；
- trigger F1/AUROC；
- acceptance/receptivity；
- personalized average gain；
- sensor classification；
- post-intervention outcome prediction；
- 单轮 LLM-judge preference。

这些组件指标可以诊断，但不能自动代表 Agent 带来了增量价值。

## 2. P1–P6 已降级为 seeds

旧问题仍可作为入口，但不再是六个固定 root problems：

| Seed | 原始偏置 | 现在展开为 |
| --- | --- | --- |
| P1 calibrated proactive silence | 过早锁定 calibration/gating | C13 multi-action、C14 timing、C15 repair、C16 counterfactual value、C17 escalation、C18 habituation |
| P2 memory authority | 把 reliability/validity/identity/consent/authority 压成一个 gate | C02 authority、C03 revocation、C04 identity、C05 laundering、C06 rollback、C11 derived deletion |
| P3 selective personalization | 与 P1/P2 的 use/abstain/ask 形式重叠 | C25 conflict、C26 identity、C27 clarification、C28 feedback cause、C29 co-adaptation、C30 memory-vs-policy |
| P4 drift-aware adaptation | 同时承担 detection/attribution/update/recovery | C31 attribution、C32 selective update、C35 adherence drift、C36 cold start |
| P5 causal intervention | 过早假设 decomposition 就是方法 | C19 construct audit、C20 delay、C21 active sensing、C22 withdrawal、C23 confounding、C24 modality |
| P6 multi-timescale memory | 预设 event hierarchy 优于长窗口 | C07 equal-budget、C08 missingness、C09 device provenance、C10 contradiction、C11 deletion、C12 decision sufficiency |

任何 seed 都可以继续演化出新的候选；它被 kill 也不关闭对应分支。

## 3. 评测白空间生成器

每个新 idea 至少组合四个轴，并加入一个非默认动作与一个 counterfactual：

| Axis | 候选值 |
| --- | --- |
| state subject | world、user、physiology、permission、tool、memory、social context |
| lifecycle | create、update、conflict、supersede、revoke、expire、delete、restore、revive |
| horizon | decision、episode、trajectory、lifecycle、deployment period |
| observability | complete、missing、noisy、delayed、MNAR、contradictory |
| information action | retrieve、ask、verify、sense、wait、monitor、do nothing |
| actor/identity | single user、household、team、delegate、multi-agent |
| intervention action | silence、answer、suggest、prepare、execute、escalate、withdraw、correct |
| timing/delivery | early、on-time、late、interruptible、receptive、channel/modality |
| uncertainty | calibration、abstention、risk coverage、value of information |
| consequence | incremental benefit、proximal effect、long-term effect、no-action outcome |
| governance | provenance、purpose、consent、authority、privacy、deletion |
| responsibility | writer、memory、retrieval、reasoning、policy、tool、interface |

优先寻找当前短 episode 或组件指标看不到的 failure：

- counterfactual over-helping；
- revocation residue；
- identity ambiguity；
- correction debt；
- policy-induced observation/missingness；
- action reversibility；
- environment/tool drift；
- timing regret；
- habituation/trust erosion；
- derived-data deletion；
- multi-component blame；
- repair and withdrawal。

## 4. 36 个候选 atlas

标记：

- `benchmark/eval`：评测、benchmark 或 failure taxonomy 可作为主贡献；
- `diagnosis/audit`：先证明 proxy、construct、causal 或系统边界有问题；
- `method`：只有 cheap probe 显示独立 headroom 后才实现；
- `systems/HCI`：可能转为 systems、UbiComp 或 HCI 贡献。

### M-AI

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C01 | Lifecycle Counterfactual Benchmark | benchmark/eval | `probe-ready` |
| C02 | Action-Conditioned Memory Authority | method + eval | `opportunity` |
| C03 | Revocation Propagation Lag | benchmark + systems | `probe-ready` |
| C04 | Household Identity Boundary | benchmark/eval | `novelty-hold` |
| C05 | Provenance Laundering Stress Test | benchmark/eval | `radar` |
| C06 | Explicit vs Parametric Memory Rollback | systems + eval | `radar` |

### M-PHY

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C07 | Equal-Budget Multi-Timescale Memory | benchmark/eval | `radar` |
| C08 | Missingness-Aware Memory and Active Sensing | method + eval | `data-gate` |
| C09 | Device and Placement Provenance Invalidation | benchmark/eval | `radar` |
| C10 | Acute–Chronic Evidence Contradiction | benchmark/eval | `radar` |
| C11 | Deletion of Derived Physiological Memory | governance + systems | `radar` |
| C12 | Decision-Sufficient Physiological Summarization | benchmark/eval | `radar` |

### P-AI

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C13 | Multi-Action Deferral Policy | method + eval | `probe-ready` |
| C14 | Timing-Regret Benchmark | benchmark/eval | `queued` |
| C15 | Proactive Retraction and Correction | benchmark + systems | `queued-after-C13` |
| C16 | Counterfactual Assistance Value | diagnosis/eval | `radar` |
| C17 | Tool-Failure-Aware Escalation | method + systems | `radar` |
| C18 | Longitudinal Habituation and Trust Erosion | benchmark + HCI | `radar` |

### P-PHY

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C19 | Need–Receptivity–Feasibility–Effect Audit | diagnosis/audit | `data-audit` |
| C20 | Delay-Aware Physiological Intervention Windows | method + eval | `radar` |
| C21 | Active Sensing with Ask/Wait Alternatives | method + eval | `radar` |
| C22 | Withdrawal after State Resolution | benchmark + HCI | `radar` |
| C23 | Closed-Loop Confounding Benchmark | diagnosis/benchmark | `probe-ready` |
| C24 | Delivery Modality under Sensor/Social Uncertainty | eval + HCI | `radar` |

### U-AI

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C25 | Preference Conflict across Roles, Goals and Time | benchmark/eval | `probe-ready` |
| C26 | Identity Attribution before Personalization | benchmark/eval | `overlap-audit` |
| C27 | Value of Clarification for Personalization | method + eval | `radar` |
| C28 | Feedback Ambiguity and Correction Debt | benchmark/eval | `opportunity` |
| C29 | Performative Personalization and Co-Adaptation | diagnosis/method | `radar` |
| C30 | Memory Personalization vs Policy Personalization | diagnosis/eval | `radar` |

### U-PHY

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C31 | Drift Attribution before Adaptation | benchmark + method | `data-gate` |
| C32 | Selective Update under Scarce Labels | method | `radar` |
| C33 | Heterogeneous Causal Intervention Response | causal method | `radar` |
| C34 | Habituation-Aware Personalized Intervention | method + HCI | `radar` |
| C35 | Agent-Induced Adherence Drift | diagnosis/eval | `radar` |
| C36 | Safe Cold-Start Transfer with Abstention | method + eval | `radar` |

长版定义、nearest pressure、killer experiment 和后续分叉保存在本轮不可变 GPT Pro 原文；这里不复制 36 份长卡，避免文件膨胀。表中的 `初始路由` 是建卡时的研究判断；card 的实时 column、next action 和 blocker 以 `CURRENT.md` 为准。

## 5. Top 12 与本地严审

下表中的总分来自 GPT Pro 的研究判断，不是实验结果或 novelty 证明。Codex 只采纳可测量性与排序线索：

| Rank | ID | Score/35 | 本地决定 | 关键边界 |
| ---: | --- | ---: | --- | --- |
| 1 | C01 Lifecycle Counterfactuals | 34.5 | `GO probe` | full-history + tuned recency 接近 oracle 则 kill 新 benchmark |
| 2 | C03 Revocation Propagation | 34.0 | `GO probe` | source-tag purge/index rebuild 足够则降为 engineering note |
| 3 | C15 Retraction/Correction | 34.0 | `OVERLAP AUDIT` | ProEvent cancellation、MemSecBench repair、AgentAbstain post-hoc failure 后，只保留跨消息/事件/工具的独立 repair 变量 |
| 4 | C23 Closed-Loop Confounding | 34.0 | `GO diagnosis` | SCM 只能证明 proxy/ranking reversal，不外推真实 causal effect |
| 5 | C25 Preference Conflict | 34.0 | `GO probe` | latest-valid/role filter 足够则只保留 benchmark slice |
| 6 | C02 Action-Conditioned Authority | 34.0 | `OVERLAP AUDIT` | origin-bound authority 与 MemGate 后，必须证明 action-risk conditioning 不是普通 admission gate |
| 7 | C04 Household Identity Boundary | 33.5 | `HOLD novelty` | 先查 shared/household memory 与 C26 重叠 |
| 8 | C13 Multi-Action Deferral | 33.5 | `GO probe` | binary trigger + two-stage prompt 追平则 method kill |
| 9 | C14 Timing Regret | 33.5 | `OVERLAP AUDIT` | ProactiveVideoQA/ProEvent/ProAgentBench 后，必须收窄到 consequence-aware opportunity-window regret |
| 10 | C19 Construct/Causal Audit | 33.0 | `GO audit / HOLD causal` | 缺 assignment、availability、propensity 或 outcome 不做 causal claim |
| 11 | C31 Drift Attribution | 33.0 | `GO conditional` | synthetic shifts 只验 harness；真实主张需真实 shift metadata |
| 12 | C08 Missingness + Active Sensing | 32.0 | `OVERLAP AUDIT / HOLD GPU` | LSM-2 已直接覆盖 incomplete representation；只有 missingness cause + ask/sense/wait + action regret 才继续 |

每条索引分支至少保留一个高优先候选：

| Branch | Candidate |
| --- | --- |
| M-AI | C03 Revocation Propagation |
| M-PHY | C08 Missingness + Active Sensing |
| P-AI | C15 Retraction / Correction |
| P-PHY | C23 Closed-Loop Confounding |
| U-AI | C25 Preference Conflict |
| U-PHY | C31 Drift Attribution |

## 6. 初始 cheap-probe 设计

下表保留建卡时的 probe 设计，便于审计；实时执行状态和是否仍可进入 probe 以 `CURRENT.md` 为准。二轮文献审计后，C02、C08、C14、C15 必须先通过 overlap audit。

| Priority | Probe | Candidate | 最小产物 | Resource | 决策问题 |
| ---: | --- | --- | --- | --- | --- |
| 1 | lifecycle paired generator | C01 | 180 对 lifecycle trajectories + 5 baselines | CPU/API | 是否存在稳定 history-equivalence failure |
| 2 | cross-layer revocation canary | C03 | 四层 stack + residual-influence matrix | CPU/API | 普通 purge 是否已足够 |
| 3 | multi-action consequence replay | C13 | 250 points × 6 actions × 3 costs | CPU/API | 多动作是否比 binary trigger 可辨 |
| 4 | preference role/context swaps | C25 | 200 matched pairs + correction-debt slice | CPU/API | 简单 role/latest filter 是否已解决 |
| 5 | closed-loop causal SCM | C23 | known-ground-truth simulator + ranking map | CPU | 是否存在稳健 policy ranking reversal |
| 6 | drift-type injection harness | C31 | 2 datasets × 4 shifts × baseline matrix | 1 GPU | attribution 是否有独立 headroom |
| 7 | missingness/active-sensing smoke | C08 | block/MNAR masks + simple baselines/oracle | 1 GPU | threshold 是否支配复杂策略 |
| 8 | authority × action-risk matrix | C02 | 200–300 cases | CPU/API | action-specific authority 是否必要 |
| 9 | timing + repair trajectories | C14/C15 | 150 timing + 100 repair | CPU/API | 时机/修复是否改变模型排序 |
| 10 | MRT/JITAI estimand audit | C19 | assignment/outcome/availability/license checklist | CPU | causal question 是否可识别 |
| 11 | feedback-cause matched pairs | C28 | 150 matched cases | CPU/API | 同一 feedback 是否对应不同修正对象 |

CPU/API 任务可并行；C31 与 C08 串行使用同一 GPU smoke 车道。当前不启动 7B/8B 六线 LoRA、多模态预训练、长序列 RL 或完整产品原型。

## 7. Idea card 最小字段

``​`yaml
identity:
  idea_id:
  primary_branch:
  paper_shape:
evidence:
  nearest_work:
  verification_status:
  novelty_threat:
problem:
  falsifiable_statement:
  real_failure_event:
  affected_actor:
  failure_cost:
evaluation:
  unit:
  horizon:
  non_default_actions:
  counterfactual:
  responsibility_targets:
comparison:
  primary_metrics:
  proxy_misalignment:
  killer_baselines:
cheap_probe:
  cases:
  max_days:
  resource_ceiling:
  falsification_condition:
  decision_if_positive:
  decision_if_negative:
  decision_if_inconclusive:
operations:
  status:
  evidence_pointer:
  last_updated:
``​`

Idea 可以先以 backlog 行存在；只有进入真实 experiment/run 时才新建目录。

## 8. 暂不追的诱人方向

- 六分支统一的“超级长期 Agent 架构”；
- 新 wearable foundation model 或大规模 multimodal pretraining；
- 没有具体 failure 的通用 memory schema / knowledge graph；
- “长上下文 + RAG 优于无 memory”；
- 只提高 trigger F1/AUROC；
- 把 acceptance、click、reply 当作主动帮助成功；
- 纯 LLM-judge synthetic benchmark；
- 先做完整 smartwatch/AR/haptic 产品再找 claim；
- 没有 authority/rollback 的 self-evolving LoRA；
- 六条线各训一个 7B LoRA。

这些不是永久禁止；只有当新证据能给出独立 failure、counterfactual 和 killer baseline 时才重新打开。

## 9. 来源与 novelty 边界

- 当前 source ledger 未观察到直接覆盖，只能产生 `inference`，不能证明学术空白；
- Top 12 排名、36 个候选和所谓 AFEL 轴都是 GPT Pro 的研究建议，不是外部事实；
- C04/C26、C02/C05、C08/C21、C23/C29 等存在重叠，立项前必须做责任变量拆分；
- C19 缺可识别的随机化/assignment/outcome 时，只能是 construct/data audit；
- C23 的 synthetic SCM 不构成真实健康干预证据；
- C31 的 synthetic drift 不构成真实 longitudinal drift 证据；
- `Towards a General Intelligence and Interface for Wearable Health Data`（arXiv:2605.22759）及其大规模预训练、35 个任务主张已从官方 arXiv 页面核对，并已补入 source ledger；仍不表示本项目复现。

## 10. 审计位置

- 本轮 GPT Pro 原文：`.codex/codex-pro-bridge/gpt-pro-sessions/auto-research-20260730-aggressive-paper-driven-problem-and-evalua-gpt-pro/001-aggressive-problem-and-evaluation-space-brainstorm.md`
- 本轮 Codex verdict：记录在同一 session 的 `verdicts/`，由 Bridge 工具生成；
- 长期来源账本：`sources/2026-07-30-adjacent-source-ledger.md`
- 当前执行面：`CURRENT.md`

```

### `LITERATURE_MAP.md`
```markdown
# Literature Cluster Map and Idea Forest

更新日期：2026-07-31  
阶段：second-pass literature audit；问题发现优先；不构成 novelty 证明或实验结果

这个文件回答三个稳定问题：

1. 六个方向分别有哪些论文簇；
2. 每个论文簇实际关注、优化和评测什么；
3. 从论文共同假设与未覆盖变量中，可以继续长出哪些 idea 分支。

逐篇来源、链接与核验边界统一保存在 `sources/2026-07-30-adjacent-source-ledger.md`；candidate 的当前状态保存在 `CURRENT.md`。这里不保存周进度，也不把每个叶子直接升级为论文题目。

## 1. 二轮 review 的总判断

### 1.1 六个方向的拥挤度不同

| Branch | 已形成的主流问题 | 当前最拥挤区域 | 更值得继续找的问题 |
| --- | --- | --- | --- |
| M-AI | 存储、检索、总结、更新、长期 QA、经验复用 | 再做一个 memory bank；只在 LoCoMo/LongMemEval 提高 QA | lifecycle counterfactual、跨层撤权、身份与授权、行动后果、repair |
| M-PHY | wearable representation、health insight、纵向预测、多模态对齐 | 再预训练一个通用 sensor encoder | informative missingness、主动感知、设备/佩戴 provenance、急性–慢性冲突、derived deletion |
| P-AI | trigger、主动检索、澄清、隐藏意图、长程协助 | act/silent F1；只预测“是否帮助” | 多动作策略、机会窗口、反事实增量价值、撤回/修正、长期打扰与信任 |
| P-PHY | JITAI、receptivity、availability、MRT、wearable intervention | 用 observation/prediction 代替 causal effect | need–receptivity–feasibility–effect 拆分、闭环混杂、withdrawal、剂量与 habituation |
| U-AI | persona、历史检索、个性化生成、长期偏好、个性化 policy | 明示 persona 或单用户静态 profile | 多身份/多角色冲突、反馈原因、修正债务、共适应、memory-vs-policy 归因 |
| U-PHY | 跨用户泛化、few-shot/on-device adaptation、个体健康预测 | 只报告 adaptation 后平均 F1/AUROC | drift source attribution、负迁移、异质介入效应、依从性漂移、安全冷启动 |

### 1.2 论文正在从组件能力转向闭环 Agent，但仍缺生命周期评测

近年的 benchmark 已经明显推进：

- `LoCoMo`、`LongMemEval` 从短对话扩展到跨 session QA、时间推理、更新与 abstention；
- `MemoryArena` 把记忆和后续行动耦合；`LongMemEval-V2` 开始测环境经验；
- `ProactiveBench`、`ProCIS`、`ProEvent`、`π-Bench`、`ProAgentBench`、`PROBE` 从单轮 trigger 扩展到事件、工作流、隐藏意图和真实连续行为；
- `AgentAbstain` 用 act/abstain 配对任务证明 task completion 与“不该行动时不行动”并不等价；
- `LSM-2`、`GLOBEM`、wearable foundation models 开始处理真实缺失和跨年/跨用户泛化；
- `LaMP`、`LongLaMP`、`AI PERSONA`、`RealPref` 把 personalization 从显式 persona 推向历史与长期偏好。

但现有评测仍很少同时追踪：状态如何写入、何时失效、是否影响行动、如何撤回、谁应负责、修复后是否仍有残余影响。这仍是六条线可以共享的上位空白。

### 1.3 “论文依据”不等于“论文已经替我们证明了问题”

本图使用三类依据：

- `direct coverage`：论文直接定义了该任务或 benchmark；
- `pressure`：论文覆盖了邻近切口，使原 idea 必须收窄；
- `inference`：多个论文共同遗漏某个变量，由本项目推导出可测问题。

只有前两类能作为 related work 事实；第三类必须经过系统检索和 cheap probe，不能直接写成 novelty claim。

## 2. M-AI：AI Memory

### MA-1 存储、组织与运行时管理

代表论文：`Generative Agents`、`MemoryBank`、`MemGPT`、`Mem0`、`A-MEM`、`Zep`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 记忆写入、压缩、层级、图结构、动态链接、检索成本 | QA、recall、LLM judge、latency、token cost | 长历史压缩与动态组织具有明确系统价值 | 同一事实的 authority、purpose、expiry、revocation、derived dependency 和 action risk |

Idea leaves：

- `[E]` 同预算下比较 raw history、summary、temporal graph、event hierarchy，而不是让结构方法使用更多 token；
- `[E]` 评测“回答充分”与“行动充分”是否一致；
- `[M]` 将 validity interval、来源、purpose 与 action risk 作为 memory admission 条件；
- `[S]` 比较显式 memory、cache、summary、skill 与 parametric memory 的可回滚性。

### MA-2 长期 recall、更新与 abstention benchmark

代表论文：`LoCoMo`、`LongMemEval`、`LongMemEval-V2`、`MemoryArena`、`PM-Bench`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨 session recall、时间推理、知识更新、环境经验、未来 cue | exact/LLM-judge QA、evidence retrieval、task success | 从静态聊天推进到经验与行动 | 等价历史下的 lifecycle 差异、撤销残留、修复成本、责任归因 |

Idea leaves：

- `[E]` history-equivalent / lifecycle-different paired trajectories；
- `[E]` cancel、expire、delete、restore、revive 的状态机 benchmark；
- `[E]` 同一 memory QA 正确但工具行动错误的 consequence slice；
- `[E]` 将“正确 abstain”拆成不知道、无权、过期、身份不明、行动不可逆五类。

### MA-3 记忆–环境–行动闭环

代表论文：`MemoryArena`、`LongMemEval-V2`、`ProactAgent`、`MUSE-Autoskill`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从历史轨迹学习 workflow、gotcha、skill，并用于后续任务 | task success、context quality、trajectory reuse | 记忆不再只是聊天 QA | 环境或工具发生变化后，旧经验何时应失效；错误行动后谁负责修复 |

Idea leaves：

- `[E]` environment drift 下旧 runbook 的失效检测；
- `[M]` memory sufficiency 与 tool verification 的联合策略；
- `[E]` writer → memory → retrieval → reasoning → policy → tool 的 blame matrix；
- `[S]` 失败 skill 的 quarantine、rollback 与再启用协议。

### MA-4 主动获取、meta-memory 与 parametric memory

代表论文：`MetaMem`、`ATRBench`、`TMEM`、`SAGER`、`Proactive Memory Agent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 何时问、何时存、如何学习使用记忆、如何把经验写入参数/skill | downstream success、preference recall、token cost | memory acquisition 与 use 开始被建模成策略 | 询问负担、未来价值不确定性、跨层撤销、错误写入的累积债务 |

Idea leaves：

- `[M]` ask-now/use-later 的 value-of-information，在未来任务不一定到来时计入提问成本；
- `[E]` explicit memory 与 LoRA/skill 同时写入后的 selective rollback；
- `[E]` acquisition debt：过早询问、重复询问与错误推断的长期代价；
- `[M]` 在 action risk 高时主动 verify，在低风险时允许 provisional memory。

### MA-5 安全、授权、共享与 repair

代表论文：`Hidden in Memory`、`MPBench`、`MemSecBench`、`Origin-bound Authority`、`MemGate`、`AgentLeak`、`Collaborative Memory`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| poison persistence、来源约束、搜索 gate、共享/内部通道泄漏、selective repair | attack success、leakage、repair、benign retention | malicious lifecycle 已有快速增长的 benchmark | benign 用户撤权、家庭身份、委托关系、purpose change、跨层 residue |

Idea leaves：

- `[G]` benign revocation propagation：source、index、summary、cache、prompt、parametric layer；
- `[G]` household/delegate memory 的 identity-bound authority；
- `[E]` repair quality = harmful influence removal + benign utility preservation + explanation correctness；
- `[E]` provenance laundering path 与最小责任切断点；
- `[S]` 删除原始记录后，派生 profile、embedding、summary 与行动日志的依赖级联。

## 3. M-PHY：Physiological / Behavioral Memory

### MP-1 Wearable representation 与 foundation model

代表论文：`NormWear`、`PaPaGei`、`MOMENT`、`Wearable Behavior FM`、`Wearable Health General Intelligence`、`AURA-MFM`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨 modality、任务、设备与人群的通用表示 | AUROC/F1/RMSE、linear probe、zero/few-shot | population-scale representation 已非常强 | longitudinal decision sufficiency、个体有效期、来源与佩戴变化、行动后果 |

Idea leaves：

- `[E]` equal-compute/equal-token 的多时间尺度生理记忆；
- `[E]` representation quality 与 downstream decision regret 的解耦；
- `[M]` event、routine、baseline、exception 四层 memory 的动态预算；
- `[E]` acute evidence 与 chronic baseline 冲突时的 calibrated abstention。

### MP-2 Wearable-to-language 与 health insight agent

代表论文：`PH-LLM`、`PHIA`、`PhysioLLM`、`VitalAgent`、`AwareLLM`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 时间序列解释、健康问答、个性化 insight、工具推理、主动监测 | expert rubric、QA accuracy、user study、prediction | 语言接口与工具分析可行 | 解释是否来自有效时段、错误 insight 如何撤回、建议是否带来增量价值 |

Idea leaves：

- `[E]` explanation provenance：每个结论可追溯到设备、窗口、质量与版本；
- `[E]` stale insight challenge：设备/药物/作息改变后旧结论是否仍被复用；
- `[H]` insight correction UX：修正、撤回与原因解释是否恢复信任；
- `[E]` 同一统计事实在不同健康目标下是否应产生不同 memory/action。

### MP-3 缺失、噪声与主动感知

代表论文：`LSM-2`、`ProAgent`、`HabitSense`，以及 informative-missingness 文献。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 不完整 wearable 流、mask-aware representation、低成本常开与高成本按需感知 | masking robustness、downstream accuracy、energy/privacy | “缺失不是简单插值问题”已有直接方法压力 | 缺失原因、策略诱导缺失、ask/sense/wait 的联合价值与隐私成本 |

Idea leaves：

- `[E]` 自然缺失、设备故障、佩戴中断、用户拒绝、policy-induced missingness 的可辨性；
- `[M]` ask / sense / wait / abstain 四动作 active acquisition；
- `[E]` MNAR 下 uncertainty calibration 与 action regret，而不只看 imputation error；
- `[H]` 感知预算同时计入电量、隐私、社交成本与用户负担。

### MP-4 纵向、多时间尺度与变化

代表论文：`VitalAgent`、`GLOBEM`、`PH-LLM`、`Post-intervention Response`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 多日/多年行为、近期状态与长期基线、介入后轨迹 | cross-year generalization、forecasting、PRO prediction | 长期数据和多尺度预测开始出现 | memory lifecycle、事件边界、干预造成的状态变化与反事实 |

Idea leaves：

- `[E]` event-boundary vs fixed-window vs learned hierarchy 的等预算比较；
- `[E]` 介入前后 memory 是否错误地把 treatment effect 当成自然 baseline；
- `[M]` 按 decision sufficiency 压缩，而不是按 reconstruction fidelity 压缩；
- `[E]` 长期 baseline 被急性异常污染后的恢复速度。

### MP-5 设备、佩戴位置与治理 provenance

代表论文：`PaPaGei`、consumer-wearable stress reproducibility、`On-device Few-shot HAR`、`Collaborative Memory`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨设备、跨人、跨数据集泛化与隐私 | cross-device AUROC、LOSO、adaptation gain | 硬件/人群差异会破坏泛化已有证据 | provenance 是否进入 memory validity；derived physiological memory 如何删除 |

Idea leaves：

- `[E]` device/firmware/placement swap 后的 selective invalidation；
- `[G]` raw signal、feature、event、profile、recommendation 五层删除语义；
- `[M]` provenance-conditioned retrieval 与 uncertainty；
- `[E]` 设备变化和真实生理变化的 paired attribution benchmark。

## 4. P-AI：Proactive Agent

### PA-1 Trigger、主动检索与内容生成

代表论文：`ProactiveBench`、`ProCIS`、`TGL Trigger`、`Proactive Memory Agent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 是否触发、检索什么、何时插入建议 | F1/AUC、npDCG、accept/reject、content quality | act/silent 与主动 retrieval 已有公开 benchmark | 多动作后果、不可逆风险、等待/准备/撤回、用户长期效用 |

Idea leaves：

- `[E]` 从 binary trigger 扩展到 action lattice；
- `[M]` risk-conditioned action granularity：建议与执行使用不同门槛；
- `[E]` 触发正确但内容/渠道/工具动作错误的责任拆分；
- `[S]` always-on 小模型、事件图与 LLM 的成本–隐私–召回 Pareto。

### PA-2 长程事件、隐藏意图与连续工作流

代表论文：`ProEvent`、`π-Bench`、`ProAgentBench`、`PM-Bench`、`PROBE`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 事件追踪、跨 session 隐藏意图、真实工作流、主动发现 bottleneck | timing/correctness、task success、pipeline success | proactivity 已从单轮扩到长期 | 事件取消后的 repair、多个潜在需求的优先级、长期信任与 habituation |

Idea leaves：

- `[E]` concurrent event conflict 与有限 intervention budget；
- `[E]` event cancellation 后 reminder/tool side effect 的传播与撤回；
- `[M]` hidden intent 的 verify-before-act 策略；
- `[E]` 未发现、发现未行动、错误行动、过度行动四类 end-to-end regret。

### PA-3 主动提问与信息获取

代表论文：`Ask-before-Plan`、`ATRBench`、`Uncertainty of Thoughts`、`PAHF`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 澄清需求、询问未来可复用偏好、降低不确定性 | task success、question efficiency、future utility | ask 已是一等 action | 询问负担、错误身份、何时延迟询问、sense 与 ask 的替代关系 |

Idea leaves：

- `[M]` clarification value under user burden and task arrival uncertainty；
- `[E]` ask-now、ask-later、infer、default、abstain 的 matched trajectories；
- `[E]` 对共享账户/家庭成员提问时的 identity attribution；
- `[M]` 低风险先准备、高风险再确认的 staged assistance。

### PA-4 结构化行动、并行执行与主动问题解决

代表论文：`ProAct-75`、`PROBE`、`ProAct`、`ContextAgent`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| task graph、并行 action、问题发现、环境感知 | saved steps、parallelism、end-to-end success | “主动”不再只是说一句建议 | side effect、partial completion、escalation、rollback、tool failure |

Idea leaves：

- `[E]` tool-failure-aware escalation 与 fallback ordering；
- `[S]` proactive prepare 但不 commit 的 reversible staging；
- `[E]` partial-order plan 中的过早 action 与 timing regret；
- `[M]` 依据 reversibility 选择 suggest、prepare 或 execute。

### PA-5 Abstention、timing 与 post-action repair

代表论文：`AgentAbstain`、`ProactiveVideoQA`、`ProEvent`、`ProMemAssist`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 不该行动时 abstain、响应时间、打扰成本、取消事件 | paired accuracy、PAUC、timing correctness | abstention 与 timing 已有直接 benchmark | consequence-aware timing、行动后的 retract/correct、用户是否已据此行动 |

Idea leaves：

- `[E]` timing regret = early harm + late missed value + repeated burden；
- `[E]` post-hoc abstention、retraction、correction、compensation 的分层评测；
- `[S]` 对已发消息、已建日程、已调用工具使用不同 repair protocol；
- `[H]` habituation、dismissal、trust erosion 的多周 trajectory benchmark。

## 5. P-PHY：Physiological Proactivity

### PP-1 JITAI 的问题定义

代表论文：`JITAI pragmatic framework`、`JITAI design principles`、`HeartSteps`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| decision point、tailoring variable、intervention option、decision rule、proximal/distal outcome | availability、proximal outcome、burden | 何时/给谁/给什么已有成熟定义 | LLM/agent 论文常把多个构念压成 acceptance 或 response prediction |

Idea leaves：

- `[A]` need、receptivity、feasibility、effect 四构念 audit；
- `[E]` 同一时刻四构念互相冲突的 matched cases；
- `[E]` “不干预”不仅是 negative class，而是明确 intervention option；
- `[H]` 用户目标、临床目标与即时舒适目标冲突时的协商。

### PP-2 Micro-randomized trial 与 causal excursion effect

代表论文：`MRT Methods`、`HeartSteps`、`HeartSteps II`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 重复随机化、时变 treatment effect、moderator、近端结果 | causal excursion effect、WCLS、effect moderation | intervention effect 可被因果识别 | 多数公开 Agent 数据没有 assignment、propensity、availability 或 counterfactual outcome |

Idea leaves：

- `[C]` 现有 JITAI/Agent dataset 的 causal-identifiability audit；
- `[E]` prediction ranking 与 true policy-value ranking 的反转模拟；
- `[C]` proximal benefit、distal benefit、burden 与 habituation 的 estimand separation；
- `[E]` observational replay 与 MRT ground truth 的偏差地图。

### PP-3 Need、receptivity、availability 与 feasibility

代表论文：`Mental Health Receptivity`、`Opportune Smart Speaker`、`ContextAgent`、`Smartwatch JITAI`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 是否需要、是否可接收、上下文是否允许、是否会响应 | acceptance、self-report、context classifier | 构念开始被部分区分 | 它们与真实 treatment effect 仍经常混合；社会情境与安全约束不足 |

Idea leaves：

- `[E]` high-need/low-receptivity、low-need/high-receptivity 等四象限；
- `[M]` wait、switch modality、ask、escalate 而非直接 silence；
- `[H]` social presence、privacy 与 urgency 的 delivery policy；
- `[E]` acceptance 高但 effect 为零或负的 proxy failure。

### PP-4 主动感知、时延与机会窗口

代表论文：`ProAgent`、`SigmaScheduling`、`HabitSense`、`ProMemAssist`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 何时追加感知、何时安排 decision point、帮助与打扰权衡 | sensing accuracy、latency、uncertainty、timing | 传感与时机都已成为 policy | sensing 本身改变观察、隐私、耗电与用户行为；状态可能在决策前已消失 |

Idea leaves：

- `[M]` ask/sense/wait/act 联合策略；
- `[E]` sensor-to-action delay 与状态半衰期 benchmark；
- `[E]` state-resolved withdrawal：触发后、送达前状态已恢复；
- `[C]` policy-induced observation/missingness 的闭环模拟。

### PP-5 介入响应、剂量、withdrawal 与 habituation

代表论文：`Post-intervention Response`、`HeartSteps`、`WatchGuardian`、`Last JITAI`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 介入后短期轨迹、行为改变、个体化消息 | forecast、step count、human rating、adherence | response prediction 与部署均有先例 | 预测不等于 effect；重复介入会改变效果、依从性和传感数据 |

Idea leaves：

- `[C]` response forecast 与 individualized treatment effect 的差异；
- `[M]` dose-aware policy：频率、强度、渠道、冷却时间；
- `[E]` intervention-induced adherence drift；
- `[H]` withdraw/correct 后的用户理解与恢复。

## 6. U-AI：AI Personalization

### UA-1 显式 persona 与个性化响应

代表论文：`PersonaFeedback`、`PersoBench`、`PersonaMem`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 给定 persona 时能否生成一致、个性化响应 | pairwise preference、LLM judge、fluency/coherence | persona-conditioned generation 已很拥挤 | persona 是否属于当前用户/角色/目标，冲突时如何处理 |

Idea leaves：

- `[E]` 正确 persona、错误身份 persona、过期 persona、冲突 persona 的 matched pairs；
- `[E]` personalized but task-wrong 与 task-correct but depersonalized 的二维评测；
- `[M]` role/context conditioned persona admission；
- `[H]` 向用户解释用了哪条偏好以及如何关闭。

### UA-2 历史检索与个性化生成

代表论文：`LaMP`、`LongLaMP`、`PerMemBench`、`RPEval`、`Mem0`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从用户历史检索相关信息，生成短/长文本，决定何时不用个性化 | ROUGE、generation quality、memory value、rationality | retrieval-based personalization 基线成熟 | 历史之间冲突、feedback cause、纠正后的残余影响 |

Idea leaves：

- `[E]` role × context × time preference conflict；
- `[E]` latest-valid、role-filter、ask-user 三类 killer baseline；
- `[E]` irrelevant memory 不只损害回答，还可能改变工具 action；
- `[M]` conflict-aware retrieval 返回 preference set 与不确定性，而非单条 profile。

### UA-3 Lifelong、动态偏好与多模态 persona

代表论文：`AI PERSONA`、`RealPref`、`PAHF`、`PersonaVLM`、`SAGER`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 偏好长期变化、跨 session 跟随、多模态 memory、持续 policy skill | long-context preference following、persona shift、benchmark score | 动态 personalization 已成为显式任务 | 变化原因、agent 诱导变化、错误适配的 rollback 与责任 |

Idea leaves：

- `[E]` preference drift vs context switch vs identity switch attribution；
- `[E]` agent 建议导致的 performative preference change；
- `[M]` cautious update：stable value、temporary goal、experiment 三层；
- `[S]` user-specific policy skill 的 versioning 与 rollback。

### UA-4 个性化 alignment、adapter 与 policy

代表论文：`Personalized Soups`、`SAGER`、`TMEM`、`PerCE`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 参数合并、token-level personalization、用户 policy/adapter | preference score、task metrics、transfer | personalization 不只发生在 prompt/memory | memory、prompt、adapter、policy 的独立贡献与撤销困难 |

Idea leaves：

- `[A]` memory personalization vs policy personalization 的责任分解；
- `[E]` 同一 correction 在四层分别更新的差异；
- `[S]` shared base + private reversible adapter + explicit memory 的最小架构；
- `[E]` 参数个性化的 overgeneralization 与 cross-task contamination。

### UA-5 主动获取、澄清与 feedback

代表论文：`ATRBench`、`Ask-before-Plan`、`PAHF`、`PPP`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 主动询问偏好、行动前澄清、行动后反馈 | future task success、clarification quality、online adaptation | personalization acquisition 已开始被单独测量 | 反馈究竟纠正 memory、推理、policy、style 还是 tool；重复修正债务 |

Idea leaves：

- `[E]` feedback-cause matched pairs；
- `[E]` correction debt：修一次后在不同上下文再次犯错；
- `[M]` value-of-clarification under question budget；
- `[H]` 用户可撤销自己的 correction，并查看影响范围。

### UA-6 多身份、多角色与协商

代表论文：`Collaborative Memory`、`Multi-Agent Memory`；现有个性化 benchmark 多以单一用户为默认。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 共享 memory、权限、单用户 profile | access control、personalized output | shared memory architecture 有早期工作 | household/team/delegate identity attribution 与 preference arbitration 缺统一评测 |

Idea leaves：

- `[E]` shared device 上 speaker/owner/beneficiary 的身份边界；
- `[G]` owner、delegate、subject、observer 的 authority matrix；
- `[M]` 冲突偏好下 ask、negotiate、role-default、abstain 策略；
- `[E]` identity 错误造成的 privacy、utility 与 action harm 三重指标。

## 7. U-PHY：Physiological Personalization

### UP-1 Population representation 与个体差异

代表论文：`NormWear`、`PaPaGei`、`Wearable Health General Intelligence`、large-scale wearable SSL。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 从大规模人群学习可迁移表示 | LOSO、linear probe、few-shot、cross-dataset | population prior 很强 | 何时 population prior 对个体有害；什么变化值得更新 |

Idea leaves：

- `[E]` average gain 掩盖的 per-user harm / negative transfer；
- `[M]` uncertainty-aware support-user selection；
- `[E]` demographic similarity、behavior similarity、causal similarity 的比较；
- `[M]` 无法安全迁移时的 abstention 与人工校准。

### UP-2 Few-shot、无监督与 on-device adaptation

代表论文：`On-device Few-shot HAR`、`Uncertainty-aware Few-shot HAR`、personalized federated learning。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 少量标注/无标注校准、轻量设备端更新 | macro-F1、adaptation gain、compute/memory | 快速适配方法成熟度上升 | shift 来源、错误 pseudo-label、更新后退化、可撤销性 |

Idea leaves：

- `[E]` physiology、device、placement、context、label、policy 六类 shift attribution；
- `[M]` 只更新 classifier、prototype、normalization 或 memory 的 selective adaptation；
- `[E]` adaptation 后 calibration、worst-user 与 rollback 指标；
- `[S]` on-device update 的 energy、privacy 与 reproducibility contract。

### UP-3 多年 generalization 与真实部署漂移

代表论文：`GLOBEM`、consumer-wearable stress reproducibility、`Personalized Stress Monitoring`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 跨年、跨 cohort、跨设备、自由生活环境 | cross-year/cross-dataset AUROC、LOSO | 真实泛化下降已有直接证据 | 下降究竟来自生理、行为、设备、label 或干预；适配何时反而有害 |

Idea leaves：

- `[E]` drift-type injection harness + real metadata validation；
- `[E]` change detection、cause attribution、update choice、recovery 四阶段分开评测；
- `[M]` drift posterior 驱动不同 adaptation operator；
- `[E]` 无 ground-truth shift metadata 时只允许 diagnosis，不做真实 attribution claim。

### UP-4 个体 health insight 与行为预测

代表论文：`PH-LLM`、`PHIA`、`PhysioLLM`、`Personalized Digital Health Modeling`。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 个体睡眠/运动/压力 insight、support-user transfer | expert rubric、RMSE/AUROC、user study | 个体化输出和少样本建模可行 | 个性化是否真正增益、错误原因、跨目标冲突、纠正后恢复 |

Idea leaves：

- `[E]` personalized gain decomposition：better sensing、better representation、better memory、better policy；
- `[E]` 同一生理状态下不同用户目标的 recommendation conflict；
- `[M]` personalized uncertainty 与 safe recommendation strength；
- `[H]` correction 对未来 insight 的持久影响与可见性。

### UP-5 异质介入效应与 agent-induced drift

代表论文：`MRT Methods`、`HeartSteps`、`Post-intervention Response`、heterogeneous treatment-effect literature。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 对谁、何时、哪种 intervention 有效；介入后轨迹 | CATE/causal excursion、response forecasting | heterogeneity 与 response prediction 都有工具 | 两者常被混淆；agent 会改变依从性、缺失和未来数据分布 |

Idea leaves：

- `[C]` response prediction vs treatment effect 的 benchmark split；
- `[C]` person × context × dose 的 heterogeneous causal effect；
- `[E]` agent-induced adherence drift 与 missingness；
- `[M]` uncertainty-aware personalized intervention with no-treatment fallback。

### UP-6 安全冷启动、隐私与删除

代表论文：on-device adaptation、federated HAR privacy、wearable provenance 文献。

| 关注点 | 常见评测 | 已覆盖 | 仍未覆盖 |
| --- | --- | --- | --- |
| 少数据启动、本地训练、跨用户共享 | few-shot gain、membership leakage、resource cost | 部分系统约束有研究 | 何时请求标签、如何撤销派生模型、个体失败是否被平均指标遮蔽 |

Idea leaves：

- `[M]` label/sense/abstain 的 calibration budget；
- `[G]` 删除某用户数据后 prototype、adapter、federated contribution 的撤销；
- `[E]` cold-start risk–coverage 与 worst-user guarantee；
- `[S]` 设备端 adaptation 的可验证版本、回滚与审计日志。

## 8. Idea Forest：从论文簇长成研究树

下面的树是生成器，不是 approved backlog。叶子只有在写清 failure、counterfactual、killer baseline、资源上限和 kill rule 后，才进入 `PROBLEM_BACKLOG.md`。

``​`text
Long-lived Agent under change
├── M-AI: memory lifecycle and authority
│   ├── representation → equal-budget structure → decision sufficiency
│   ├── lifecycle → update / supersede / expire / revoke / delete / restore / revive
│   ├── authority → source / purpose / identity / action risk
│   ├── action coupling → memory QA / tool action / consequence / blame
│   └── repair → purge / selective retention / rollback / explanation / residual influence
├── M-PHY: longitudinal physiological memory
│   ├── timescale → event / routine / baseline / exception
│   ├── observability → noisy / delayed / missing / MNAR / contradictory
│   ├── acquisition → ask / sense / wait / abstain
│   ├── provenance → device / placement / firmware / person / intervention
│   └── governance → raw / feature / summary / profile / derived decision deletion
├── P-AI: proactive decision policy
│   ├── action lattice → watch / wait / ask / retrieve / prepare / suggest / execute
│   ├── timing → early / on-time / late / repeated / missed window
│   ├── value → benefit / burden / side effect / no-action outcome
│   ├── repair → withdraw / retract / correct / compensate / escalate
│   └── longitudinal HAI → habituation / dismissal / trust / user adaptation
├── P-PHY: closed-loop intervention
│   ├── constructs → need / receptivity / feasibility / effect
│   ├── causal design → assignment / availability / propensity / proximal / distal
│   ├── sensing loop → measurement cost / policy-induced missingness / privacy
│   ├── dynamics → sensor delay / state half-life / withdrawal / dose
│   └── delivery → visual / audio / haptic / ambient / social context
├── U-AI: negotiated personalization
│   ├── identity → owner / speaker / subject / delegate / beneficiary
│   ├── preference → role / context / time / goal / stable value
│   ├── acquisition → infer / ask now / ask later / default / abstain
│   ├── correction → memory / reasoning / policy / style / tool / interface
│   └── co-adaptation → user change / performativity / exploration / rollback
└── U-PHY: safe individualized adaptation
    ├── drift source → physiology / device / context / label / policy / adherence
    ├── update operator → prototype / head / norm / adapter / memory / no update
    ├── heterogeneity → responder / context / dose / outcome / uncertainty
    ├── cold start → support users / labels / active calibration / abstention
    └── deployment → on-device / privacy / energy / deletion / rollback
``​`

理论组合数很大，但每篇论文不需要覆盖整棵树。一个可执行 idea 通常只取：

``​`text
1 branch
+ 1 literature cluster
+ 1 omitted state variable
+ 1 non-default action
+ 1 counterfactual
+ 1 consequence horizon
+ 1 responsibility target
``​`

示例：

- `P-AI + event tracking + cancellation + retract + no-retract counterfactual + downstream tool side effect + policy/interface responsibility`；
- `M-PHY + missingness + user refusal + ask/wait/sense + fixed-imputation counterfactual + decision regret + sensing-policy responsibility`；
- `U-AI + lifelong preference + role switch + clarify/abstain + latest-preference counterfactual + correction debt + memory/policy responsibility`。

## 9. 高价值交叉，但不强制合并论文

| Intersection | 可形成的独立问题 |
| --- | --- |
| M-AI × P-AI | 被撤销或取消的记忆已经触发提醒/工具动作后，如何传播 repair |
| M-PHY × P-PHY | 主动感知是否值得，以及 sensing 如何改变未来 observation 与 intervention |
| U-AI × P-AI | 什么时候主动询问未来偏好，什么时候默认、等待或放弃 |
| U-PHY × P-PHY | 介入造成的状态/依从性变化，是否被误判成需要个体适配的自然 drift |
| M-AI × U-AI | 多用户 memory 的 identity、authority 与 preference conflict |
| M-PHY × U-PHY | 设备/佩戴变化与真实个体生理变化的因果归因 |

这些 intersection 可以共享 evaluator、prompt、schema 或工具；不要求共享模型实现，也不要求合成一篇“超级 Agent”论文。

## 10. 对当前核心候选的二轮修正

| Candidate | 新论文压力 | 二轮决定 |
| --- | --- | --- |
| C01 Lifecycle Counterfactual | LongMemEval 已含 update，MemoryArena 已耦合行动，MemSecBench 已有恶意 Write–Execute–Forget | 保留，但限定 benign lifecycle、history-equivalent pairing、action consequence 与 responsibility |
| C03 Revocation Propagation | MemSecBench 已测 poison repair，origin-bound authority/MemGate 已测来源与 gate | 保留 cheap probe；必须聚焦用户撤权在多层 memory stack 的 residual influence，而非泛化“memory deletion” |
| C08 Missingness + Active Sensing | LSM-2 直接覆盖 incomplete wearable representation | 降回 overlap audit；只有 endogenous/MNAR cause + ask/sense/wait + action regret 才有独立空间 |
| C13 Multi-Action Deferral | AgentAbstain、Ask-before-Plan、ATRBench 已覆盖 abstain/ask | 保留；贡献必须是完整 action lattice 与 consequence-sensitive policy，不是多加一个 abstain label |
| C14 Timing Regret | ProactiveVideoQA、ProEvent、ProAgentBench 已直接评 timing | 降回 overlap audit；收窄为 opportunity-window consequence regret 与 repeated burden |
| C15 Retraction/Correction | ProEvent 有 cancellation，MemSecBench 有 repair，AgentAbstain 有 post-hoc failure | 降回 overlap audit；必须证明已发消息/已建事件/已调用工具的 cross-layer repair 未被覆盖 |
| C23 Closed-Loop Confounding | JITAI/MRT 已提供成熟 causal language | 保留 diagnosis；只用 synthetic SCM 证明 proxy/ranking reversal，不冒充真实 treatment effect |
| C25 Preference Conflict | RealPref、AI PERSONA 已测长期偏好，Collaborative Memory 涉及多用户 | 保留；明确 role/context/time conflict、identity 与 negotiation，而非一般 preference following |
| C31 Drift Attribution | GLOBEM、跨设备复现与 few-shot HAR 都证实 shift/adaptation 压力 | 保留 data gate；贡献点必须是 source attribution → operator choice，而非再报告 adaptation gain |

## 11. 下一步审计顺序

1. 对 C03、C08、C14、C15、C25 做 paper-by-paper overlap matrix；
2. 对每个 cluster 选一个 benchmark、一个 strongest simple baseline、一个真实或可控 counterfactual；
3. 只有 overlap 后仍有独立 evaluation variable 的叶子，才建 candidate；
4. 先做 evaluator/paired generator/causal simulator；只有方法存在 headroom 才训练；
5. 新论文继续写入 source ledger，不在本文件追加逐篇摘要。


```

### `sources/2026-07-30-adjacent-source-ledger.md`
```markdown
# Literature Source Ledger

更新日期：2026-07-31

用途：记录六个方向的原始论文、benchmark 与方法来源。`verified` 表示已打开论文/官方页面核对标题与摘要中的核心主张，不表示复现实验、认可论文结论或完成 novelty search。论文簇与 idea tree 见 `LITERATURE_MAP.md`。

## Canonical Track Mapping

同一来源可以形成多个 related-work tag，但以下表格指定本项目的主要归档位置：

| Canonical branch | 主要来源 |
| --- | --- |
| M-AI | LoCoMo、LongMemEval、MemoryArena、MemGPT、Mem0、A-MEM、PM-Bench、MemSecBench、Origin-bound Authority |
| M-PHY | NormWear、PaPaGei、LSM-2、GLOBEM、PH-LLM、PHIA、VitalAgent |
| P-AI | ProactiveBench、ProCIS、ProEvent、π-Bench、ProAgentBench、AgentAbstain、ATRBench、PROBE |
| P-PHY | JITAI framework、HeartSteps、MRT methods、ContextAgent、ProAgent、SigmaScheduling、Post-intervention Response |
| U-AI | LaMP、LongLaMP、AI PERSONA、RealPref、PersonaFeedback、PerMemBench、RPEval、PAHF、SAGER |
| U-PHY | GLOBEM、On-device Few-shot HAR、Uncertainty-aware HAR、Personalized Digital Health、PH-LLM、MRT methods |
| Product / UbiComp evidence | Opportune Smart Speaker、Sensible Agent、SocialMind、HabitSense、Personal Health Informatics、UbiComp Program |

Active Sensing、JITAI、Prospective Memory、Delivery Modality 等是 tag，不是一级主线。

| ID | 方向 | 来源与状态 | 本轮采用的证据边界 |
| --- | --- | --- | --- |
| PM-Bench | Prospective Memory | [arXiv:2607.12385](https://arxiv.org/abs/2607.12385), 2026 preprint, verified | 延迟意图需要在未来时间/事件/环境 cue 出现时执行；提供七天模拟任务。 |
| ProactAgent | Proactive Retrieval | [arXiv:2604.20572](https://arxiv.org/abs/2604.20572), 2026 preprint, verified | 把 retrieval 作为 policy action，用 paired branches 学习何时、检索什么。 |
| Proactive Memory Agent | Memory Intervention | [arXiv:2607.08716](https://arxiv.org/abs/2607.08716), 2026 preprint, verified | 独立 memory agent 更新 bank，并选择注入 reminder 或保持静默。 |
| ProAct | Background Anticipation | [arXiv:2605.25971](https://arxiv.org/abs/2605.25971), 2026 preprint, verified | 使用 idle-time compute、对话历史和持久 memory 预判后续需求。 |
| TGL Trigger | Wake-up Trigger | [arXiv:2605.30152](https://arxiv.org/abs/2605.30152), 2026 preprint, verified | 用小型 temporal graph model 处理事件流，只在 trigger 后调用 LLM。 |
| ContextAgent | Sensory Proactivity | [arXiv:2505.14668](https://arxiv.org/abs/2505.14668), 2025 preprint, verified | 用 wearable video/audio context 与 persona 预测是否主动服务，并调用工具。 |
| ProAgent | Active Sensing | [arXiv:2512.06721](https://arxiv.org/abs/2512.06721), 2025 preprint, verified | always-on 低成本信号与 on-demand 高成本视觉构成 tiered perception。 |
| ProMemAssist | Working Memory / Timing | [arXiv:2507.21378](https://arxiv.org/abs/2507.21378), 2025 preprint, verified | 根据多模态信号维护工作记忆，并在帮助价值与打扰成本间选择时机。 |
| VitalAgent | Physiological Memory | [arXiv:2605.29483](https://arxiv.org/abs/2605.29483), 2026 preprint, verified | longitudinal physiological memory、ECG/PPG 工具推理和 proactive monitoring。 |
| AwareLLM | Psychophysiological Agent | [arXiv:2605.09625](https://arxiv.org/abs/2605.09625), 2026 preprint, abstract checked | 融合 egocentric vision、gaze、pupillometry、posture 和 heart activity 做主动协作。 |
| PH-LLM | Personal Health LLM | [arXiv:2406.06474](https://arxiv.org/abs/2406.06474), 2024 preprint, verified | Fitbit/Pixel Watch 时间序列上的睡眠、运动洞察与建议；强调安全与专家评测。 |
| NormWear | Wearable Foundation Model | [arXiv:2412.09758](https://arxiv.org/abs/2412.09758), 2024 preprint, verified | 在 PPG/ECG/EEG/GSR/IMU 上预训练并与文本表示对齐。 |
| Wearable Health General Intelligence | Wearable Foundation Model / Personal Health Agent | [arXiv:2605.22759](https://arxiv.org/abs/2605.22759), `Towards a General Intelligence and Interface for Wearable Health Data`, 2026 preprint, official abstract verified | 摘要报告超过一万亿分钟、五百万参与者的未标注传感器预训练，并在 35 个 health prediction tasks 上评测；只用于说明 population-scale representation 的强规模压力，不代表本项目复现或认可其全部结果。 |
| Wearable Behavior FM | Wearable Representation | [arXiv:2507.00191](https://arxiv.org/abs/2507.00191), 2025 preprint, abstract checked | 大规模 wearable behavioral signals 的 foundation model 与多类健康预测。 |
| AURA-MFM | IMU–Language Alignment | [arXiv:2506.03174](https://arxiv.org/abs/2506.03174), 2025 preprint, abstract checked | 对齐 third-person video、motion capture、IMU 与 text。 |
| PerMemBench | Personalized Memory | [arXiv:2605.25535](https://arxiv.org/abs/2605.25535), 2026 preprint, verified | 不同用户具有不同的 memory value；研究 personalized storage gating。 |
| RPEval | Rational Personalization | [arXiv:2601.16621](https://arxiv.org/abs/2601.16621), 2026 preprint, verified | irrelevant memory 会干扰 intent understanding，评测何时不应使用个性化记忆。 |
| PersonaMem | Dynamic User Profile | [arXiv:2504.14225](https://arxiv.org/abs/2504.14225), 2025 preprint, abstract checked | 跨 session 追踪动态用户画像与偏好演化。 |
| On-device Few-shot HAR | Concept Drift | [arXiv:2508.15413](https://arxiv.org/abs/2508.15413), 2025 preprint, verified | 针对新用户的 concept drift，用设备端少样本适配分类头。 |
| SigmaScheduling | JITAI Timing | [arXiv:2507.10798](https://arxiv.org/abs/2507.10798), 2025 preprint, verified | 根据行为时间预测的不确定性动态安排 intervention decision point。 |
| Mental Health Receptivity | JITAI Receptivity | [arXiv:2508.02817](https://arxiv.org/abs/2508.02817), 2025 preprint, verified | 区分 intervention acceptance 与 feasibility，并使用被动感知上下文。 |
| Smartwatch JITAI | Contextual Intervention | [arXiv:2501.09530](https://arxiv.org/abs/2501.09530), 2025 preprint, verified | 基于环境、个体历史和微调查在手表上提供热/噪声干预。 |
| Opportune Smart Speaker | Interruptibility | [DOI:10.1145/3411810](https://doi.org/10.1145/3411810), IMWUT 2020, verified | 家庭活动、忙碌、情绪、移动与 social presence 影响主动语音介入时机。 |
| Sensible Agent | Delivery Modality | [arXiv:2509.09255](https://arxiv.org/abs/2509.09255), 2025 preprint, verified | 同时调整提供什么帮助和用什么低打扰方式表达。 |
| SocialMind | Proactive AR | [arXiv:2412.04036](https://arxiv.org/abs/2412.04036), 2024 preprint, verified | 多模态社会线索、AR 眼镜与对话中的及时建议。 |
| HabitSense | Selective Sensing / Privacy | [DOI:10.1145/3678591](https://doi.org/10.1145/3678591), IMWUT 2024, verified from author manuscript | 用 IMU/热成像等先判断事件，只在必要时记录并做端侧隐私处理。 |
| Personal Health Informatics | Personal Informatics | [DOI:10.1145/3749503](https://doi.org/10.1145/3749503), IMWUT 2025, verified | GAI 支持 personal tracking 的 planning、tracking、reflecting 与 acting。 |
| UbiComp/ISWC 2025 Program | Venue evidence | [official program](https://www.ubicomp.org/ubicomp-iswc-2025/program/), verified | 官方议程覆盖 proactive AR、wearable multimodality、personal health、activity recognition 和 edge agents。 |
| Hidden in Memory | Memory Poisoning | [arXiv:2605.15338](https://arxiv.org/abs/2605.15338), 2026 preprint, verified | 外部上下文可植入延迟触发的持久 memory poison；自然任务表现正常不代表未来安全。 |
| Securing LLM-Agent Long-Term Memory | Origin-bound Authority | [arXiv:2606.24322](https://arxiv.org/abs/2606.24322), 2026 preprint, verified | 将 memory authority 绑定到来源，并讨论 laundering attack 与机器可检验保证。 |
| MetaMem | Meta-memory | [arXiv:2602.11182](https://arxiv.org/abs/2602.11182), 2026 preprint, verified | 用可演化 meta-memory 教 Agent 如何利用碎片化历史，而不只增加存储。 |
| Multi-Agent Memory | Shared Memory Architecture | [arXiv:2603.10062](https://arxiv.org/abs/2603.10062), 2026 position paper, verified | 从共享/分布式记忆、一致性和访问控制讨论多 Agent memory 设计空间。 |
| Collaborative Memory | Multi-user Memory | [arXiv:2505.18279](https://arxiv.org/abs/2505.18279), 2025 preprint, verified | 研究多用户、多 Agent 的动态、非对称 memory sharing 与访问权限。 |
| TMEM | Parametric Self-evolution | [arXiv:2606.04536](https://arxiv.org/abs/2606.04536), 2026 preprint, abstract checked | 将显式 memory 与 episode 内快速 LoRA 更新结合，形成 parametric memory novelty pressure。 |
| MUSE-Autoskill | Skill Memory | [arXiv:2605.27366](https://arxiv.org/abs/2605.27366), 2026 preprint, abstract checked | 把 skill creation、memory、管理、测试和运行反馈组织为持续演化 lifecycle。 |
| PAHF | Continual Personalization | [arXiv:2602.16173](https://arxiv.org/abs/2602.16173), 2026 preprint, verified | 通过行动前澄清、memory 与行动后反馈做在线个性化，并考虑 persona shift。 |
| PPP | Proactivity × Personalization | [arXiv:2511.02208](https://arxiv.org/abs/2511.02208), 2025 preprint, verified | 在 UserVille 中联合训练 Productivity、Proactivity、Personalization，直接形成 P-AI×U-AI 压力。 |
| SAGER | Personalized Policy Skill | [arXiv:2604.14972](https://arxiv.org/abs/2604.14972), 2026 preprint, abstract checked | 为每个用户持续演化独立的决策 policy skill，区分“记住偏好”和“个性化推理方式”。 |
| Post-intervention Response | Physiological Response Personalization | [arXiv:2604.14738](https://arxiv.org/abs/2604.14738), 2026 preprint, abstract checked | 预测 wearable intervention 后 15–120 分钟生理轨迹；支持 U-PHY pilot，但预测不等于因果效应。 |
| MRT Methods | Causal JITAI Evaluation | [PMC9276848](https://pmc.ncbi.nlm.nih.gov/articles/PMC9276848/), methods paper, verified | Micro-randomized trial 与 causal excursion effect 用于回答何时、对谁、哪种介入有效。 |
| Generative Agents | Memory Stream / Reflection | [arXiv:2304.03442](https://arxiv.org/abs/2304.03442), 2023 paper, verified | 保存完整经验、生成高层 reflection 并动态检索用于规划；主要评测 believable behavior。 |
| MemoryBank | Long-term Companion Memory | [arXiv:2305.10250](https://arxiv.org/abs/2305.10250), 2023 preprint, verified | 存储对话、事件摘要与用户画像，并以遗忘曲线式机制更新；实验偏 recall 与陪伴质量。 |
| MemGPT | Hierarchical Memory Runtime | [arXiv:2310.08560](https://arxiv.org/abs/2310.08560), 2023 preprint, verified | 用类似操作系统的多层 memory 和 interrupt 管理有限上下文。 |
| LoCoMo | Long Conversational Memory | [arXiv:2402.17753](https://arxiv.org/abs/2402.17753), ACL 2024, verified | 最长 35 个 session、约 300 turns；评测 QA、event summarization 与多模态对话生成。 |
| LongMemEval | Long-term Interactive Memory | [arXiv:2410.10813](https://arxiv.org/abs/2410.10813), ICLR 2025, verified | 500 个问题覆盖 extraction、跨 session reasoning、temporal reasoning、knowledge update 与 abstention。 |
| LongMemEval-V2 | Environment Experience Memory | [arXiv:2605.12493](https://arxiv.org/abs/2605.12493), 2026 preprint, verified | 451 个问题评测 web agent 的 state、workflow、gotcha 与 premise awareness；历史可达 500 trajectories。 |
| MemoryArena | Memory–Action Loop | [arXiv:2602.16313](https://arxiv.org/abs/2602.16313), ICML 2026, verified | 用相互依赖的多 session agent tasks，把记忆获取、压缩与未来行动放在同一闭环评测。 |
| Mem0 | Scalable Long-term Memory | [arXiv:2504.19413](https://arxiv.org/abs/2504.19413), 2025 preprint, abstract verified | 动态抽取、整合、检索 conversational memory，并在 LoCoMo 上比较 accuracy、latency 与 token cost。 |
| A-MEM | Dynamic Agentic Memory | [arXiv:2502.12110](https://arxiv.org/abs/2502.12110), NeurIPS 2025, abstract verified | 以 Zettelkasten 式 note、link 与 evolution 动态组织 agent memory。 |
| Zep | Temporal Knowledge Graph Memory | [arXiv:2501.13956](https://arxiv.org/abs/2501.13956), 2025 preprint, abstract verified | 用 temporal knowledge graph 维护事实的历史关系，并在 DMR/LongMemEval 报告 accuracy 与 latency。 |
| MPBench | Memory Poisoning | [arXiv:2606.04329](https://arxiv.org/abs/2606.04329), 2026 preprint, verified | 枚举 memory write channel、结构漏洞与 poisoning attack；表明激进写入/检索会增加攻击面。 |
| MemSecBench | Lifecycle Memory Security | [arXiv:2607.27080](https://arxiv.org/abs/2607.27080), 2026 preprint, verified | 用 Write–Execute–Forget 七个 checkpoint 追踪 persistence、下游后果与 selective repair。 |
| MemGate | Trustworthy Memory Search | [arXiv:2606.06054](https://arxiv.org/abs/2606.06054), 2026 preprint, verified | 把 memory search 视为 trust boundary，在 A-MEM、Mem0、MemOS 与个人 Agent 设置评估 admission gate。 |
| AgentLeak | Multi-Agent Privacy Leakage | [arXiv:2602.11510](https://arxiv.org/abs/2602.11510), 2026 preprint, abstract verified | 评测 output、inter-agent message、shared memory 与 tool argument 等内部泄漏通道。 |
| MOMENT | General Time-series Foundation Model | [arXiv:2402.03885](https://arxiv.org/abs/2402.03885), ICML 2024, abstract verified | 建立 Time-series Pile 与 limited-supervision benchmark；是 wearable 专用模型的通用强基线。 |
| PaPaGei | Open PPG Foundation Model | [arXiv:2410.20542](https://arxiv.org/abs/2410.20542), 2024 preprint, abstract verified | 在公开 PPG 数据上预训练并跨 20 个任务评测，同时报告跨肤色 bias 与跨设备泛化压力。 |
| LSM-2 | Incomplete Wearable Data | [arXiv:2506.05321](https://arxiv.org/abs/2506.05321), 2025 preprint, verified | 用 Adaptive and Inherited Masking 直接从真实不完整 wearable 数据学习，而不是先插值。 |
| Large-scale Wearable SSL | Physiological Representation | [arXiv:2011.04601](https://arxiv.org/abs/2011.04601), 2020 preprint, abstract verified | 用大规模 wrist accelerometer 与 ECG 自监督学习可迁移、包含个体生理信息的表示。 |
| GLOBEM | Longitudinal Generalization | [arXiv:2211.02733](https://arxiv.org/abs/2211.02733), NeurIPS 2022 dataset, abstract verified | 700+ user-years、497 users，支持跨用户、跨年份和跨数据集行为建模评测。 |
| PHIA | Wearable Health Insight Agent | [arXiv:2406.06464](https://arxiv.org/abs/2406.06464), 2024 preprint, abstract verified | 用 code generation 与 retrieval 工具分析 wearable 数据；发布 4000+ health insight QA。 |
| PhysioLLM | Interactive Personal Health Insight | [arXiv:2406.19283](https://arxiv.org/abs/2406.19283), 2024 preprint, verified | 融合 wearable 与上下文进行健康探索，并以 24 名 Fitbit 用户的 user study 评测。 |
| Stress Reproducibility | Cross-device Physiological Generalization | [arXiv:2505.05694](https://arxiv.org/abs/2505.05694), 2025 preprint, abstract verified | 同一 stress pipeline 在研究级和消费级设备间表现变化，直接支持 device provenance 问题。 |
| ProactiveBench | Proactive Assistance Trigger | [arXiv:2410.12361](https://arxiv.org/abs/2410.12361), 2024 preprint, abstract verified | 6790 个 real-activity-derived events，用 human accept/reject 训练与评测主动帮助。 |
| ProCIS | Proactive Conversational Retrieval | [arXiv:2405.06460](https://arxiv.org/abs/2405.06460), SIGIR 2024, abstract verified | 2.8M conversations，评测何时主动检索何种资源，并提出 npDCG。 |
| Ask-before-Plan | Clarification before Planning | [arXiv:2406.12639](https://arxiv.org/abs/2406.12639), 2024 preprint, abstract verified | 评测是否需要澄清、调用工具补信息并形成计划。 |
| ProEvent | Event-centric Proactivity | [arXiv:2607.17701](https://arxiv.org/abs/2607.17701), 2026 preprint, verified | 从即时消息维护事件；评测 response timing、单步/多步 correctness，并包含 event cancellation 压力。 |
| ProAct-75 | Structure-aware Proactive Response | [arXiv:2602.03430](https://arxiv.org/abs/2602.03430), 2026 preprint, verified | 75 tasks、step-level task graph，评测 trigger、saved steps 与 parallel action。 |
| π-Bench | Long-horizon Personal Assistant | [arXiv:2605.14678](https://arxiv.org/abs/2605.14678), 2026 preprint, verified | 100 个多轮任务、5 类 persona、隐藏意图、跨任务依赖与跨 session continuity。 |
| ProAgentBench | Real Continuous Workflow | [arXiv:2602.04482](https://arxiv.org/abs/2602.04482), 2026 preprint, verified | 500+ 小时真实用户 session、28K+ events；拆分 timing prediction 与 assist content generation。 |
| AgentAbstain | Agentic Abstention | [arXiv:2607.10059](https://arxiv.org/abs/2607.10059), 2026 preprint, verified | 263 对 should-act/should-abstain executable tasks；揭示 task success 与 abstention 相互独立及 post-hoc abstention。 |
| ATRBench | Ask-to-Remember | [arXiv:2605.28108](https://arxiv.org/abs/2605.28108), 2026 preprint, verified | 隐藏偏好作为 ground truth，评测 Agent 是否现在询问、以后使用，而不只是回忆已知偏好。 |
| PROBE | Proactive Problem Solving | [arXiv:2510.19771](https://arxiv.org/abs/2510.19771), 2025 preprint, verified | 把 proactivity 拆为发现未明示问题、定位 bottleneck、执行 resolution。 |
| ProactiveVideoQA | Temporal Proactive Interaction | [arXiv:2507.09313](https://arxiv.org/abs/2507.09313), 2025 preprint, abstract verified | 评测视频播放中的主动响应时机，并提出考虑时间动态的 PAUC。 |
| Uncertainty of Thoughts | Active Information Seeking | [arXiv:2402.03271](https://arxiv.org/abs/2402.03271), 2024 preprint, abstract checked | 用 uncertainty-aware rollout 与 information gain 选择问题，覆盖 diagnosis/troubleshooting 等主动询问任务。 |
| JITAI Pragmatic Framework | Intervention Problem Definition | [PMC4732268](https://pmc.ncbi.nlm.nih.gov/articles/PMC4732268/), methods paper, verified | 把动态需求、receptivity 与 provide-nothing option 纳入 JITAI 构造。 |
| JITAI Design Principles | JITAI Components | [PMC5364076](https://pmc.ncbi.nlm.nih.gov/articles/PMC5364076/), methods paper, verified | 定义 decision point、tailoring variable、intervention option、decision rule、proximal/distal outcome。 |
| HeartSteps | Micro-randomized JITAI | [PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/), 2019 paper, verified | 6 周、44 人、每日最多五次随机化建议；直接测 suggestion 对随后步数的近端效应与随时间衰减。 |
| HeartSteps II | Longitudinal JITAI Testbed | [PMC8872509](https://pmc.ncbi.nlm.nih.gov/articles/PMC8872509/), protocol paper, verified | 一年部署，用多时间尺度随机化研究行为理论与实时个性化。 |
| WatchGuardian | User-defined Smartwatch Intervention | [arXiv:2502.05783](https://arxiv.org/abs/2502.05783), 2025 preprint, abstract verified | 让用户定义希望干预的行为并在手表上执行个性化 JITI。 |
| Last JITAI | LLM-issued JITAI | [arXiv:2402.08658](https://arxiv.org/abs/2402.08658), 2024 preprint, abstract verified | 比较 GPT-4、普通人和医护专家产生的 JITAI 决策/内容；human rating 不等于因果效果。 |
| LaMP | Language Model Personalization | [ACL Anthology](https://aclanthology.org/2024.acl-long.399/), ACL 2024, verified | 七个 classification/generation tasks，同时提供新用户与时间切分，建立 history-retrieval personalization 基线。 |
| LongLaMP | Personalized Long-form Generation | [arXiv:2407.11016](https://arxiv.org/abs/2407.11016), 2024 preprint, abstract verified | 覆盖 email、abstract、review、topic 等长文本个性化生成。 |
| AI PERSONA | Lifelong Personalization | [arXiv:2412.13103](https://arxiv.org/abs/2412.13103), 2024 preprint, verified | 明确定义持续适配不断变化用户 profile 的 lifelong personalization 任务。 |
| PersonaFeedback | Explicit-persona Personalization | [arXiv:2506.12915](https://arxiv.org/abs/2506.12915), 2025 preprint, verified | 用 8298 个 human-annotated cases 解耦 persona inference 与 persona-conditioned generation。 |
| RealPref | Long-horizon Preference Following | [arXiv:2603.04191](https://arxiv.org/abs/2603.04191), 2026 preprint, verified | 100 profiles、1300 preferences、显式到隐式四类表达及长上下文评测。 |
| PersoBench | Persona-aware Dialogue | [arXiv:2410.03198](https://arxiv.org/abs/2410.03198), 2024 preprint, verified | 同时评测 fluency、diversity、coherence 与 personalization，说明通用生成质量不等于个性化正确。 |
| Personalized Soups | Personalized Alignment | [arXiv:2310.11564](https://arxiv.org/abs/2310.11564), 2023 preprint, abstract verified | 把相互冲突的偏好视为多目标 alignment，并在推理时合并参数。 |
| PersonaVLM | Long-term Multimodal Personalization | [arXiv:2604.13074](https://arxiv.org/abs/2604.13074), 2026 preprint, abstract verified | 用 chronological multimodal memories 与 evolving personality 做长期 MLLM 个性化。 |
| PerCE | Token-level Personalization | [arXiv:2603.06595](https://arxiv.org/abs/2603.06595), 2026 preprint, abstract verified | 以 causal intervention 估计 token 的 personalization degree，形成 token-aware training 压力。 |
| Personalized Digital Health | Adaptive Support Users | [arXiv:2605.02004](https://arxiv.org/abs/2605.02004), 2026 preprint, verified | 用相似与不相似 support users 训练个体模型，直接暴露 sparse/noisy personal data 与负迁移压力。 |
| Uncertainty-aware HAR | On-device User Adaptation | [arXiv:2606.04798](https://arxiv.org/abs/2606.04798), 2026 preprint, verified | 支持有标注、无标注或无校准的轻量 prototype adaptation，并显式考虑不确定性。 |
| Personalized Stress Monitoring | Longitudinal Free-living Personalization | [arXiv:2108.00144](https://arxiv.org/abs/2108.00144), 2021 paper, abstract verified | 1–3 个月 free-living wearable 数据与主动请求标签，显示个体化和 label budget 压力。 |
| Federated HAR Privacy | Wearable Personalization Privacy | [arXiv:2405.10979](https://arxiv.org/abs/2405.10979), 2024 preprint, abstract verified | 在五个 HAR 数据集展示 federated wearable modeling 的 membership-inference 风险。 |

## 使用规则

1. 写论文 related work 前重新打开最新版本，不从本表复制结论充当全文核验。
2. 表中的作者报告结果不能当作本项目已经复现的结果。
3. 2026 preprint 的存在足以形成 novelty pressure，但不能被描述为稳定共识。
4. 新实验引用某个 benchmark 时，应单独记录数据许可、代码版本、commit 和本地快照。
5. 本账本的 source 数量不是 coverage 质量；立项前仍需按 cluster 做系统检索、citation chase 与代码/数据许可核对。

```

## Requested Output
Please return:
1. One-Sentence Claim
2. Novelty Diagnosis
3. Related-Work Pressure, with unverified items marked
4. Strongest Framing Options
5. Required Experiments and Killer Baselines
6. Reviewer Objections
7. Publishability Judgment
8. Next Actions

## Codex Session Notes

_Unavailable._
## Compact Bridge Thread Context

_No prior bridge thread events were available._
## Compact Bridge Project Context

- Bridge project id: `auto-research`
- Title: Auto Research
- Local root label: `memory-proactive-agent-research`
- Project brief: `PROJECT_BRIEF.md`
- Project brief SHA-256: `9d4ea660cfef458e14bbad566f5e2135f80c407a38b3f37e916b2c3498375325`
- Remote binding status: `active`
- Remote project id: `g-p-6a6b0516fbb8819185e47160a2b7552b`
- Binding last verified: `2026-07-30T16:03:34+08:00`
- Shared source records: 9
- Bridge tasks: 3

## Project Sources

- `PROJECT_BRIEF.md` -> `bridge--brief-project-brief--9d4ea660cfef.md` · synced · `9d4ea660cfef458e14bbad566f5e2135f80c407a38b3f37e916b2c3498375325`
- `PROGRAM_MAP.md` -> `bridge--glossary-program-map--e64e71d97134.md` · synced · `e64e71d971342cd13cf4445a4c865ab8a700bed9604ce2687dfc8290402010ba`
- `operations/ASSET_PROTOCOL.md` -> `bridge--reference-asset-protocol--770d5e648cec.md` · synced · `770d5e648cec40d652f5f526d44c04dc9a3e11c31e47f3e8e0b29ea80e59f0c5`
- `operations/WEEKLY_ITERATION.md` -> `bridge--reference-weekly-iteration--83dfaa647655.md` · synced · `83dfaa64765576c06e3982f63b991c9c0cc1aee027d84628b5d0df2c7a1a7d14`
- `sources/2026-07-30-adjacent-source-ledger.md` -> `bridge--literature-2026-07-30-adjacent-source-ledger--8b610aad3216.md` · synced · `8b610aad321608dfa8acf48891956c4893e627385996ce37fda2d703811e5b14`
- `review/PORTFOLIO_SELF_AUDIT.md` -> `bridge--decisions-portfolio-self-audit--92db829a127c.md` · synced · `92db829a127c925b4dde3d1cb673b3fc28821e89b76cdf995259a446e5d35fa6`
- `PROBLEM_BACKLOG.md` -> `bridge--decisions-problem-backlog--b74cbbbc88a6.md` · synced · `b74cbbbc88a676b0772ea28a84b78fadafa7ec2b2737a5f3aaf76cf82cccbae5`
- `OPERATIONS.md` -> `bridge--reference-operations--3d9fcde4ba6c.md` · synced · `3d9fcde4ba6c35187669f4d65060d77862a3fe48793ee8c697ce18f3d3eece6c`
- `LITERATURE_MAP.md` -> `bridge--literature-literature-map--7412857555ad.md` · synced · `7412857555adbb8e5d15be645c1e226093f653431befee8fffb7a7d848388c2f`

## Bridge Tasks

- `auto-research-20260801-adversarially-audit-the-six-branch-literat` · active · Adversarially audit the six-branch literature clusters, coverage claims, candidate narrowing decisions, and idea forest for Memory, Proactive Agents, and Per...
- `auto-research-20260730-aggressive-paper-driven-problem-and-evalua` · active · Aggressive paper-driven problem and evaluation-space brainstorm across memory, proactive agents, personalization, and physiological variants
- `auto-research-20260730-memory-proactive-agent-personalization-3-2` · active · 全局审查 Memory、Proactive Agent、Personalization 3×2 研究计划、遗漏方向、6–8 周论文组合与资产规范

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
3. **Memory 的白空间已被新论文进一步压缩。** STALE、MemTX、MemTxn、GateMem 与 commit-time authorization 已直接进入 validity、transaction、governance 和 authority；现在更强的残余问题是 benign revocation 后的跨层 residual influence、责任归因与多主体角色边界。
4. **Proactive 不应继续只是 act/silent 二分类。** wait、ask、prepare、withdraw、correct、timing regret 与行动后的 repair 构成一组独立 failure family。
5. **Personalization 的核心压力从“是否使用用户信息”转向冲突与修正。** role/context/time preference conflict、feedback ambiguity、correction debt 和 policy-induced user change 更有独立性。
6. **生理/行为方向的价值来自特殊评测压力，不是换数据集。** missingness/MNAR、active sensing、drift attribution、closed-loop confounding、干预后状态变化和 derived-data deletion 是当前最重要的切口。
7. **Evaluation 本身可以是论文主贡献。** 前提是它改变方法/policy 排名、暴露重要而不可观察的 failure，或修正 causal/decision estimand；仅增加题量不够。
8. **2026 年的 Memory/Proactive benchmark 已快速占据“从组件到行动”的中间层。** MemoryArena、LongMemEval-V2、ProEvent、π-Bench、ProAgentBench 和 AgentAbstain 使“长期”“主动”“不行动”本身不再足以构成 novelty。
9. **几个原 core idea 必须收窄或降级。** C08 的 generic missingness 版本被 LSM-2/OpenMHC 压缩，只保留 cause→action→regret；C14 的独立 timing benchmark 与 C15 的泛化 repair benchmark 不再单独推进，改为 C13/不可逆行动评测中的 nested slice。
10. **P-PHY 必须使用 JITAI/MRT 的成熟因果语言。** need、receptivity、feasibility、response prediction 与 treatment effect 不是同一变量；没有 assignment、availability、propensity 与 outcome 时不做 causal claim。
11. **U-AI/U-PHY 的更强切口是归因而非单纯适配。** HorizonBench、PERMA、BenchPreS 与 Persona2Web 已覆盖偏好演化、context selectivity 和 personalized action；下一步应问发生了哪种冲突/漂移、该更新哪一层、错误更新如何撤销。
12. **当前最值得先验证的共同变量是 state transition → responsibility → residual influence。** 它同时连接 memory revoke、proactive repair、personalization rollback 与 physiological drift attribution，但不会强制六线共享同一个模型或论文。

这些是当前 paper/evaluation audit 得到的研究判断；尚未产生本项目 empirical result。

## 动态 Kanban

```text
Paper Radar
  → Eval / overlap audit
  → Problem Definition
  → Cheap Probe Ready
  → Continue / Branch / Park / Kill

旁路（不按主链顺序推进；列名与下方快照、移动规则保持一致）：
  · 任意列 → Data / GPU Gate      park 子类：问题成立但缺真实数据/许可/shift metadata，需写明解锁条件
  · broad candidate → Nested slice   独立 framing 被覆盖，但作为某上位 card 的 evaluator slice 存活

注：原 Eval Landscape 与 White-space Inbox 两步已并入 Eval / overlap audit
    （覆盖/构念/可识别性审计与“是否白空间”判定在同一列完成）。
```

`CURRENT.md` 是 card 当前列、next action 与 blocker 的唯一动态视图；`PROBLEM_BACKLOG.md` 保存稳定的问题定义、证据边界和初始路由。

### 当前快照

| Column | 数量 | Cards | 当前含义 |
| --- | ---: | --- | --- |
| Paper Radar | 22 | M-AI: C05–C06；M-PHY: C07/C09–C12；P-AI: C16–C18；P-PHY: C20–C22/C24；U-AI: C27/C29–C30；U-PHY: C32–C36 | 已形成候选，尚未完成覆盖与可测量性审计 |
| Eval / overlap audit | 5 | C02、C04、C08、C19、C26 | 先确认 direct coverage、数据构念、causal identifiability 或独立评测变量 |
| Problem Definition | 1 | C28 | 问题有价值，正在冻结 feedback-cause schema 与 matched-pair 设计 |
| Cheap Probe Ready | 5 | C01、C03、C13、C23、C25 | evaluator、oracle 与 killer baseline 可以立即实现 |
| Data / GPU Gate | 1 | C31 | 先完成公开数据与真实 shift metadata 对齐，再使用单卡 |
| Nested slice（broad framing 已 kill，slice 存活） | 2 | C14、C15 | 独立 paper candidate 已终止；作为 C13/C03 的 evaluator slice 存活，分别嵌入 consequence-aware timing 与 irreversible-action repair |
| Continue / Branch / Park / Kill | 0 | — | 尚无本项目 Run，因此当前不能产生经验性终局判断 |

合计：36 个 candidates。当前所谓“发现”是问题空间、评测盲区和可证伪设计，不是已经跑出的 benchmark 结果。

### 看板移动规则

| From → To | 必须新增的证据 |
| --- | --- |
| Paper Radar → Eval / overlap audit | nearest work、benchmark protocol 或真实 failure 原始来源 |
| Eval / overlap audit → Problem Definition | 明确已覆盖/部分覆盖/不可观察，并能写出 falsifiable statement |
| Problem Definition → Cheap Probe Ready | evaluation unit、counterfactual、killer baseline、1–3 天 probe 与 kill rule 齐全 |
| Cheap Probe Ready → Continue | 同预算强 baseline 后仍有稳定 failure/headroom |
| Cheap Probe Ready → Branch | failure 成立，但方法变量、评测单位或数据选择错误 |
| Any → Data / GPU Gate | 问题成立但缺真实数据、许可或 shift metadata；须写明解锁条件（park 子类，非 kill） |
| Any → Park | 缺数据、许可、ground truth 或当前资源，并写明解锁条件 |
| Any → Kill | 已被直接覆盖、无 headroom、proxy 无判别力或问题不可识别 |
| Broad candidate → Nested slice | 独立主张被覆盖，但其中一个 evaluation variable 能改变上位 candidate 的排序或责任边界 |

`Problem Definition` 或 `Cheap Probe Ready` 连续 5 个工作日没有决策信息，必须 branch、park 或 kill。卡片只按证据移动，不按“写了多少文档”移动。

## 当前核心候选

| Branch | Candidate | 当前问题 | 本周期动作 | 资源上限 | 状态 |
| --- | --- | --- | --- | --- | --- |
| M-AI | C01 Lifecycle Counterfactuals | update/cancel/expiry/delete/revival 是否暴露稳定 lifecycle failure | 180 组 paired trajectories + 5 baselines | CPU/API | `probe-ready` |
| M-AI | C03 Benign Revocation Residual | 用户撤权后影响是否残留在 summary/cache/index/adapter | 四层 canary + residual-influence matrix；不泛称 deletion | CPU/API | `probe-ready-narrowed` |
| M-PHY | C08 Missingness Cause → Action | LSM-2/OpenMHC 之后，cause + ask/wait/sense + action regret 是否仍有独立价值 | paper overlap + metadata audit；generic imputation 版本已终止 | CPU | `overlap-audit` |
| P-AI | C13 Multi-Action Deferral | binary trigger 是否掩盖 wait/ask/prepare 的价值 | 250 decision points × 6 actions × 3 costs | CPU/API | `probe-ready` |
| P-AI | C14/C15 Timing + Repair Slices | timing/repair 是否在 consequence 与不可逆 action 上改变 C13 的 policy 排名 | 作为 C13 evaluator 的 nested slices；不单独立项 | CPU/API | `nested` |
| P-PHY | C23 Closed-Loop Confounding | prediction proxy 是否导致真实 policy ranking reversal | known-ground-truth SCM + ranking map | CPU | `probe-ready-diagnosis` |
| U-AI | C25 Conflict Attribution / Negotiation | role/context/time conflict 在 latest/role filter 后，是否仍需要 cause attribution、协商、update-layer choice 或 rollback | 200 matched swaps + simple filters + negotiation/rollback slices | CPU/API | `probe-ready-narrowed` |
| U-PHY | C31 Drift Attribution | detection 之后，错误归因是否导致错误适配 | 2 datasets × 4 shift families × baselines | 1 GPU | `data-gate` |

并行数据审计：C19 只先检查 treatment assignment、availability、propensity、proximal outcome 和 license。缺任何关键识别条件，就保留为 evaluation/diagnosis，不包装成 causal paper。

## 执行车道

### CPU/API 主链

```text
C01 + C03 + C13 + C25 + C23
                     ↓
     C02 / C04 / C08 overlap audit
                     ↓
     C14/C15 nested evaluator slices
```

这些任务可以并行搭 evaluator，但每个 evaluator 必须先跑最强简单 baseline。C23 的模拟结果只能证明“某些条件下代理指标会错误排序”，不能直接证明真实干预有效。

### 单卡主链

```text
C31 data alignment → smoke → release
```

同一时间只运行一个 GPU smoke。C08 在文献与数据 overlap audit 通过前不进入 GPU 队列。synthetic shift 只能验证 harness 与 failure possibility；若要声称真实 drift attribution，需要公开数据中的时间、设备或佩戴变化证据。

## 统一最小样例

```yaml
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
```

## 本周期结束时只做四类决定

- `continue`：已有稳定 failure/headroom，下一步仍以信息增益排序；
- `branch`：问题成立，但当前方法变量、评测单位或数据不对；
- `park`：问题重要，当前缺数据、许可、ground truth 或资源；
- `kill`：无 headroom、已被覆盖、代理指标错误或不可识别。

P1–P6 现已降级为历史 seeds，不再硬编码成六条唯一论文线。它们与 36 个候选的映射、Top 12 和证据边界统一维护在 `PROBLEM_BACKLOG.md`。

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
| C02 | Action-Conditioned Memory Authority | method + eval | `branch-after-overlap` |
| C03 | Benign Revocation Residual Influence | benchmark + systems | `probe-ready-narrowed` |
| C04 | Household Identity Boundary | benchmark/eval | `novelty-hold` |
| C05 | Provenance Laundering Stress Test | benchmark/eval | `radar` |
| C06 | Explicit vs Parametric Memory Rollback | systems + eval | `radar` |

### M-PHY

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C07 | Equal-Budget Multi-Timescale Memory | benchmark/eval | `radar` |
| C08 | Missingness Cause → Acquisition/Action → Regret | method + eval | `branch-after-overlap` |
| C09 | Device and Placement Provenance Invalidation | benchmark/eval | `radar` |
| C10 | Acute–Chronic Evidence Contradiction | benchmark/eval | `radar` |
| C11 | Deletion of Derived Physiological Memory | governance + systems | `radar` |
| C12 | Decision-Sufficient Physiological Summarization | benchmark/eval | `radar` |

### P-AI

| ID | Candidate | Paper shape | 初始路由 |
| --- | --- | --- | --- |
| C13 | Multi-Action Deferral Policy | method + eval | `probe-ready` |
| C14 | Consequence-aware Timing Slice | nested evaluation | `nested-under-C13` |
| C15 | Irreversible-action Repair Slice | nested evaluation + systems | `nested-under-C13/C03` |
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
| 2 | C03 Benign Revocation Residual | 34.0 | `GO narrowed probe` | MemTX/MemTxn/GateMem 后只测 benign cross-layer residue；source-tag purge 足够则降为 engineering note |
| 3 | C15 Irreversible-action Repair | 34.0 | `NEST / broad claim killed` | 不再作为独立 repair paper；只在 tool action 后果与 residual influence 上服务 C13/C03 |
| 4 | C23 Closed-Loop Confounding | 34.0 | `GO diagnosis` | SCM 只能证明 proxy/ranking reversal，不外推真实 causal effect |
| 5 | C25 Preference Conflict | 34.0 | `GO narrowed probe` | HorizonBench/PERMA/BenchPreS/Persona2Web 后只保留 cause attribution、negotiation、update-layer choice 与 rollback |
| 6 | C02 Action-Conditioned Authority | 34.0 | `BRANCH / OVERLAP AUDIT` | MemTX、commit-time authorization、origin-bound authority 与 MemGate 后，broad framing 终止；只保留 action-risk/benign delegation residue |
| 7 | C04 Household Identity Boundary | 33.5 | `HOLD novelty` | GateMem/Collaborative Memory 后，必须证明 owner/delegate/subject/beneficiary 角色矩阵带来独立 failure |
| 8 | C13 Multi-Action Deferral | 33.5 | `GO probe` | binary trigger + two-stage prompt 追平则 method kill |
| 9 | C14 Timing Regret | 33.5 | `NEST / standalone killed` | ProactiveVideoQA/ProEvent/ProAgentBench 已直接评 timing；仅作为 C13 的 consequence-aware opportunity-window slice |
| 10 | C19 Construct/Causal Audit | 33.0 | `GO audit / HOLD causal` | 缺 assignment、availability、propensity 或 outcome 不做 causal claim |
| 11 | C31 Drift Attribution | 33.0 | `GO conditional` | synthetic shifts 只验 harness；真实主张需真实 shift metadata |
| 12 | C08 Missingness Cause → Action | 32.0 | `BRANCH / HOLD GPU` | LSM-2/OpenMHC 已覆盖 incomplete representation/imputation；generic 版本终止，只保留 cause + ask/sense/wait + consequence/regret |

每条索引分支至少保留一个高优先候选：

| Branch | Candidate |
| --- | --- |
| M-AI | C03 Benign Revocation Residual |
| M-PHY | C08 Missingness + Active Sensing |
| P-AI | C13 Multi-Action Deferral；C14/C15 仅为 nested slices |
| P-PHY | C23 Closed-Loop Confounding |
| U-AI | C25 Preference Conflict |
| U-PHY | C31 Drift Attribution |

## 6. 初始 cheap-probe 设计

下表保留建卡时的 probe 设计，便于审计；实时执行状态和是否仍可进入 probe 以 `CURRENT.md` 为准。三轮文献审计后，C02/C08 必须先分叉；C14/C15 不再独立进入 probe，只能作为 C13/C03 evaluator slice。

| Priority | Probe | Candidate | 最小产物 | Resource | 决策问题 |
| ---: | --- | --- | --- | --- | --- |
| 1 | lifecycle paired generator | C01 | 180 对 lifecycle trajectories + 5 baselines | CPU/API | 是否存在稳定 history-equivalence failure |
| 2 | benign cross-layer revocation canary | C03 | 四层 stack + residual-influence matrix | CPU/API | 普通 purge 是否已足够消除 residual influence |
| 3 | multi-action consequence replay | C13 | 250 points × 6 actions × 3 costs | CPU/API | 多动作是否比 binary trigger 可辨 |
| 4 | preference cause/role/context swaps | C25 | 200 matched pairs + negotiation/rollback slice | CPU/API | 简单 role/latest filter 是否已解决；若已解决则 branch 到 update attribution |
| 5 | closed-loop causal SCM | C23 | known-ground-truth simulator + ranking map | CPU | 是否存在稳健 policy ranking reversal |
| 6 | drift-type injection harness | C31 | 2 datasets × 4 shifts × baseline matrix | 1 GPU | attribution 是否有独立 headroom |
| 7 | missingness-cause/action smoke | C08 | cause-labeled masks + ask/sense/wait oracle | CPU first；GPU only after audit | cause/action 是否改变 downstream policy ranking |
| 8 | authority × action-risk overlap matrix | C02 | 200–300 cases only after variable survives | CPU/API | commit-time gate 后 action-specific authority 是否仍必要 |
| 9 | timing + repair nested slices | C14/C15 under C13/C03 | 150 timing + 100 irreversible repair | CPU/API | slice 是否改变上位 candidate 的 policy/repair 排名 |
| 10 | MRT/JITAI estimand audit | C19 | assignment/outcome/availability/license checklist | CPU | causal question 是否可识别 |
| 11 | feedback-cause matched pairs | C28 | 150 matched cases | CPU/API | 同一 feedback 是否对应不同修正对象 |

CPU/API 任务可并行；当前唯一 GPU smoke 车道保留给完成真实 shift metadata 对齐后的 C31。C08 在 cause metadata 与 overlap audit 通过前保持 CPU-only。当前不启动 7B/8B 六线 LoRA、多模态预训练、长序列 RL 或完整产品原型。

## 7. Idea card 最小字段

```yaml
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
```

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

# Current Research Projection

周期：2026-07-30 至 2026-08-12
更新日期：2026-08-03
阶段：论文驱动的问题发现与评测空间广扫；暂不设置 Draft gate

本文件是方便人阅读的动态摘要：当前列、下一步、blocker、证据级、停滞判定与溯源入口。结构化计数、关系和五维状态以 `research-index.yaml` 为准，变化历史以 `research-events.jsonl` 为准；本文件不得覆盖它们。稳定规范（brainstorm 合同、评测样例、决定定义）与论文簇判断不在此，见文末「指针区」。

## 本周期唯一目标

把论文、benchmark、真实失败与产品情境转成大量可证伪的研究问题，并用 1–3 天的 cheap probe 快速分叉。进度以证据/决策衡量，不以“实现了几个模型”“写了几篇 draft”或活动量衡量。

共同研究对象：

> 一个在用户、历史、环境、权限、传感器、工具和自身记忆持续变化时，必须选择获取信息、等待、行动、不行动与修复的长期 Agent。

## 当前整体判断

二轮 audit 的跨方向判断可压成三句：(1) 研究对象是变化环境中的长期 Agent，Memory/Proactive/Personalization 是三个操纵面而非孤立组件；(2) 现有组件指标（recall、trigger F1、acceptance、personalized gain）系统性看不到 no-action counterfactual、长期代价与责任归因；(3) 最值得先验证的共同变量是 `state transition → responsibility → residual influence`。

完整 12 条判断已迁入 [LITERATURE_MAP.md](LITERATURE_MAP.md) §12，与其 §1 总判断、§10 候选修正同源维护；本看板不再重复。

## 宏观组合视图

六 Track × 各成熟度阶段的节点分布（格内为节点数；当前结构化索引冻结为 36 节点 / 34 独立 Candidate）：

| Track | Radar | Eval audit | Prob Def | Probe Ready | Data/GPU Gate | Nested | 终局 | 合计 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| M-AI | 2 | 2 | 0 | 2 | 0 | 0 | 0 | 6 |
| M-PHY | 5 | 1 | 0 | 0 | 0 | 0 | 0 | 6 |
| P-AI | 3 | 0 | 0 | 1 | 0 | 2 | 0 | 6 |
| P-PHY | 4 | 1 | 0 | 1 | 0 | 0 | 0 | 6 |
| U-AI | 3 | 1 | 1 | 1 | 0 | 0 | 0 | 6 |
| U-PHY | 5 | 0 | 0 | 0 | 1 | 0 | 0 | 6 |
| **合计** | **22** | **5** | **1** | **5** | **1** | **2** | **0** | **36** |

**动量信号**：M-PHY 与 U-PHY 各有 5/6 节点仍滞留 Radar，过 Radar 的 Candidate 各只 1 张（C08、C31），动量最弱；U-PHY 的 C31 还被 Data Gate 卡住。组合健康不按固定 Candidate 数判断，应优先完成 C08 overlap audit 和 C31 metadata gate。终局列为 0：尚无本项目 Run，不能产生经验性终局判断——这是诚实进度信号，非停滞。

## 动态 Kanban

```text
Paper Radar
  → Eval / overlap audit
  → Problem Definition
  → Cheap Probe Ready
  → Continue / Branch / Park / Kill

旁路（不按主链顺序推进；列名与主表、移动规则一致）：
  · 任意列 → Data / GPU Gate      park 子类：问题成立但缺真实数据/许可/shift metadata，需写明解锁条件
  · broad candidate → Nested slice   独立 framing 被覆盖，但作为某上位 card 的 evaluator slice 存活

注：原 Eval Landscape 与 White-space Inbox 两步已并入 Eval / overlap audit。
```

### 主快照表（按卡一行）

过 Radar 的 14 张活跃卡逐卡列全字段；22 张仍在 Radar 的候选按分支聚合于表下，不逐卡展开（N6：详细度随成熟度增长）。列名为唯一状态词，不再另设第二套标签。

| Candidate | Track | 当前列 | 下一步动作 | blocker | 证据级 | 最后决策日 | 资源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C01 Lifecycle Counterfactuals | M-AI | Cheap Probe Ready | 180 组 paired trajectories + 5 baselines | 无 | inference | 2026-08-03※ | CPU/API |
| C03 Benign Revocation Residual | M-AI | Cheap Probe Ready | 四层 canary + residual-influence matrix | 无 | inference | 2026-08-03※ | CPU/API |
| C13 Multi-Action Deferral | P-AI | Cheap Probe Ready | 250 decision points × 6 actions × 3 costs | 无 | inference | 2026-08-03※ | CPU/API |
| C23 Closed-Loop Confounding | P-PHY | Cheap Probe Ready | known-ground-truth SCM + ranking map | 无 | inference | 2026-08-03※ | CPU |
| C25 Conflict Attribution / Negotiation | U-AI | Cheap Probe Ready | 200 matched swaps + negotiation/rollback slice | 无 | inference | 2026-08-03※ | CPU/API |
| C02 Action-Conditioned Authority | M-AI | Eval / overlap audit | authority × action-risk overlap matrix | broad framing 已终止，待确认残余变量是否独立成立 | inference | 2026-08-03※ | CPU/API |
| C04 Household Identity Boundary | M-AI | Eval / overlap audit | owner/delegate/subject/beneficiary 角色矩阵 overlap | 须证明角色矩阵带来独立 failure（novelty-hold） | inference | 2026-08-03※ | CPU/API |
| C08 Missingness Cause → Action | M-PHY | Eval / overlap audit | paper overlap + metadata audit | overlap audit 未过前不进 GPU 队列 | inference | 2026-08-03※ | CPU |
| C19 Need–Receptivity–Effect Audit | P-PHY | Eval / overlap audit | assignment/availability/propensity/outcome/license 清单 | 缺可识别条件则只能留作 diagnosis | inference | 2026-08-03※ | CPU |
| C26 Identity Attribution | U-AI | Eval / overlap audit | identity-before-personalization overlap audit | 无 | inference | 2026-08-03※ | CPU/API |
| C28 Feedback Ambiguity / Correction Debt | U-AI | Problem Definition | 冻结 feedback-cause schema + matched-pair 设计 | 无 | inference | 2026-08-03※ | CPU/API |
| C31 Drift Attribution | U-PHY | Data / GPU Gate | 对齐真实 shift metadata 后再单卡 | 缺公开数据的时间/设备/佩戴变化证据 | inference | 2026-08-03※ | 1 GPU |
| C14 Consequence-aware Timing | P-AI | Nested slice | 作为 C13 evaluator 的 timing slice 实现 | 依附 C13 probe，无独立启动 | inference | 2026-07-31 | CPU/API |
| C15 Irreversible-action Repair | P-AI | Nested slice | 作为 C13/C03 evaluator 的 repair slice 实现 | 依附 C13/C03 probe，无独立启动 | inference | 2026-07-31 | CPU/API |

Radar 候选（22，按 Track 聚合，未逐卡展开；进入 Eval audit 时才升为独立行）：
- M-AI：C05–C06
- M-PHY：C07、C09–C12
- P-AI：C16–C18
- P-PHY：C20–C22、C24
- U-AI：C27、C29–C30
- U-PHY：C32–C36

合计 36 个节点，其中 C14/C15 已 Nest，因此独立 Candidate 为 34。※ 标记的最后决策日为**看板重建基准日 2026-08-03**，非真实决策日——不得作为真实 Research Event；C14/C15 的 2026-07-31 是 nest 决策实际发生日。证据级当前全部为 `inference`，无一 `local-result`（尚无 Run）：这是当前最重要的诚实进度信号。各卡 nearest-work pressure 记于 [sources/2026-07-30-adjacent-source-ledger.md](sources/2026-07-30-adjacent-source-ledger.md) 与 [LITERATURE_MAP.md](LITERATURE_MAP.md) §10。

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

`Problem Definition` 或 `Cheap Probe Ready` 的卡，若「最后决策日」距今连续 5 个工作日无新决策信息，必须 branch、park 或 kill。卡片只按证据移动，不按“写了多少文档”移动。

## 溯源与索引

看板是三层资产的索引/仪表盘：只链接与投影状态，不复制被链接实体的内容。

**三层槽位**（执行层/产出层今为空，仅预留结构，不建空文件）：

| 层 | 实体 | 现状 | 位置 |
| --- | --- | --- | --- |
| 发现层 | candidate C01–C36 | 有内容（上方主表） | 本看板 + [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) |
| 执行层 | experiment → run → artifact | 空（尚无 Run） | 将建于 `experiments/<id>/`，manifest 见 [templates/run-manifest.yaml](templates/run-manifest.yaml) |
| 产出层 | research paper | 空（Draft gate 未开） | 待成稿期创建 |

**ID 与双向链接约定**：
- 候选 `Cnn`（已有）；将来 experiment `E-<Cnn>-<slug>`、run `R-<Enn>-<n>`、artifact 用 manifest digest、paper `PP-<slug>`。
- 卡 → 下游：过 probe 后在主表卡名后追加相对链接指向 `experiments/<id>/`；下游 README 反填来源卡号，形成双向可导航。
- 支持多对多（DAG）：一张卡可服务多个上位（C14 同时挂 C13 与 C03）；一篇 paper 可源自多个候选。

## 周期决策记录（本周期 2026-07-30 至 08-12）

只记决策类型 + 卡号 + 日期 + 一句理由，不记逐日过程。支撑「每周至少 kill/branch 一个」的可验证性。

| 日期 | 类型 | 卡 | 理由 |
| --- | --- | --- | --- |
| 2026-07-31 | nest | C14 → C13 | 独立 timing benchmark 被 ProactiveVideoQA/ProEvent/ProAgentBench 覆盖，降为 C13 的 consequence-aware opportunity-window slice |
| 2026-07-31 | nest | C15 → C13/C03 | 泛化 repair benchmark 被 ProEvent/MemSecBench/MemTX 覆盖，降为不可逆 tool action 的 repair/residual slice |
| 2026-08-04 | sweep | +68 源 | 六 Track 并行文献 sweep，sourcePapers 106→174；novelty 线索见 [sources/2026-08-04-literature-sweep.md](sources/2026-08-04-literature-sweep.md)；未动任何 Candidate 状态 |
| 2026-08-04 | sweep2 | +36 源 | 4 个定向深挖(C03-B半/C15社交repair/C30归因层/C04三层贯通)，sourcePapers 174→210；3 条收窄后 gap 线索；未动任何 Candidate 状态 |

本周期尚未产生 kill/branch/新增候选的其他决策。下周期若无 kill/branch，须在此显式说明原因。

## 执行车道

### CPU/API 主链

```text
C01 + C03 + C13 + C25 + C23
                     ↓
     C02 / C04 / C08 / C19 / C26 overlap audit
                     ↓
     C14/C15 nested evaluator slices
```

每个 evaluator 必须先跑最强简单 baseline。C23 的模拟结果只能证明“某些条件下代理指标会错误排序”，不能直接证明真实干预有效。

### 单卡主链

```text
C31 data alignment → smoke → release
```

同一时间只运行一个 GPU smoke。C08 在文献与数据 overlap audit 通过前不进入 GPU 队列。synthetic shift 只验证 harness 与 failure possibility；真实 drift attribution 主张需公开数据中的时间、设备或佩戴变化证据。

## 指针区（搬出看板的稳定内容去向）

| 内容 | 现在的家 |
| --- | --- |
| 狂暴 brainstorm 合同（每周纪律 6 条） | [OPERATIONS.md](OPERATIONS.md) §3 |
| 统一最小评测样例（YAML schema） | [OPERATIONS.md](OPERATIONS.md) §1 |
| 四类决定定义（continue/branch/park/kill） | [OPERATIONS.md](OPERATIONS.md) §1 Decision |
| 12 条当前整体判断（完整版） | [LITERATURE_MAP.md](LITERATURE_MAP.md) §12 |
| 稳定问题定义、证据边界、Top 12、初始路由 | [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) |
| 看板设计需求基线（N0–N14） | [operations/KANBAN_REQUIREMENTS.md](operations/KANBAN_REQUIREMENTS.md) |

P1–P6 已降级为历史 seeds；它们与 36 个候选的映射、Top 12 和证据边界统一维护在 [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md)。

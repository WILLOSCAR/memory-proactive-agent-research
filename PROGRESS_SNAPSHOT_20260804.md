# Project 进展快照 · 2026-08-04

只读分析产物，不改任何研究事实、不做新研究判断。每条都可回溯到 [CURRENT.md](CURRENT.md) 主表或 [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) Top12/atlas。术语见 [CONTEXT.md](CONTEXT.md)。

---

## 1. 一句话现状

项目处在完整科研管道（发现→验证→实验→固化→成稿→评审→发布）的**第 1–2 段（发现 + 验证）**：34 个独立 Candidate 已定义，其中 5 个已到 `probe-ready`，但 **0 Actual Run、尚无任何 Local Result**（当前证据组合最高只到 inference / source-supported 级；证据等级属于具体 assertion，不是给整张卡贴标签）。

> 这是早期发现阶段的**正常状态，不是落后**。发现阶段的产物本来就是"可证伪的问题 + 廉价验证设计"，而非实验结果。真正的下一步只有一件事：**把这 5 个 probe-ready 的 inference 跑成 local-result**——那是第一篇论文的起点。

---

## 2. 六条 Track 逐线进展

| Track | 旗舰 Candidate | 最深到哪 | 在动 / 饿死 | 下一步 |
| --- | --- | --- | --- | --- |
| **M-AI** | C03 Benign Revocation Residual | probe-ready | 🟢 **最活跃**（C01+C03 两张待跑） | 跑 C03 四层 canary、C01 lifecycle paired |
| **P-AI** | C13 Multi-Action Deferral | probe-ready | 🟢 在动（C14/C15 已 nest 入 C13/C03） | 跑 C13 多动作 replay |
| **U-AI** | C25 Preference Conflict | probe-ready | 🟢 在动（C28 在 problem-definition） | 跑 C25 matched swaps；冻结 C28 schema |
| **P-PHY** | C23 Closed-Loop Confounding | probe-ready | 🟡 单点活跃 | 跑 C23 SCM ranking-reversal |
| **M-PHY** | C08 Missingness→Action | overlap-audit | 🟠 **动量弱**（5/6 滞留 radar） | 先过 overlap audit 才进 GPU |
| **U-PHY** | C31 Drift Attribution | data-gate | 🔴 **最弱**（唯一活跃卡被数据卡住） | 解锁真实 shift metadata |

**饿死预警**：M-PHY、U-PHY 是当前最需要照顾的两条线。M-PHY 除 C08 外 5 张全滞留 radar；U-PHY 唯一活跃的 C31 被 data-gate 挡住，等于整条线暂时停摆。

> 注（对齐 OPERATIONS §3 新语义）：这里的"饿死"指**动量**信号，不是"候选数量不够"——组合健康不按候选数量判定。U-PHY 更准确的描述是事实上进入 `parked` 模式（unlock condition = 拿到真实 shift metadata）；M-PHY 处于 `explore`，需要把 C08 推过 overlap audit 而非硬凑新卡。

---

## 3. 五张可立即跑的 Probe（指向性核心）

这五张都是 `probe-ready` + CPU/API 资源 + **无 blocker**，是把 inference 变 local-result **成本最低的五个入口**。continue/kill 条件取自 BACKLOG Top12 的"关键边界"，非杜撰：

| Candidate | 跑什么 | Continue 条件 | Kill 条件 |
| --- | --- | --- | --- |
| **C01** Lifecycle Counterfactuals | 180 组 paired trajectories + 5 baselines | 强 baseline 后仍有稳定 history-equivalence failure | full-history + tuned recency 接近 oracle |
| **C03** Benign Revocation Residual | 四层 canary + residual-influence matrix | 普通 purge 后仍有跨层 residual influence | source-tag purge 已足够 → 降为 engineering note |
| **C13** Multi-Action Deferral | 250 points × 6 actions × 3 costs | 多动作比 binary trigger 可辨 | binary trigger + two-stage prompt 追平 |
| **C23** Closed-Loop Confounding | known-ground-truth SCM + ranking map | 存在稳健 policy ranking reversal | 无稳定 reversal |
| **C25** Preference Conflict | 200 matched swaps + negotiation/rollback slice | 简单 role/latest filter 未解决冲突 | 简单 filter 已解决 → branch 到 update attribution |

**建议起手**：C03 与 C13——两者分属最活跃的 M-AI / P-AI，Top12 排名靠前（#2 / #8），且 kill 条件清晰（能快速证伪、不浪费）。

---

## 4. 卡住 / 需解锁

| Candidate | 卡在哪 | 解锁条件 |
| --- | --- | --- |
| **C31** Drift Attribution | data-gate | 拿到公开数据里真实的时间/设备/佩戴变化元数据（synthetic shift 只能验 harness，不能声称真实 drift） |
| **C08** Missingness→Action | overlap-audit 未过 | 先完成 LSM-2/OpenMHC paper overlap + metadata audit，通过后才进 GPU 队列 |
| **C02** Action-Conditioned Authority | novelty 未证 | 证明 commit-time gate 后仍有 action-risk/benign delegation 的残余变量独立成立 |
| **C04** Household Identity Boundary | novelty-hold | 证明 owner/delegate/subject/beneficiary 角色矩阵带来独立 failure |

---

## 5. 需要你决定 vs 我可自主（低依赖）

**我可以自主推进（不必等你逐条确认）**：
- 为 5 张 probe-ready 卡搭 evaluator / killer baseline / oracle；
- 跑 C08 的 paper overlap audit、C02/C04 的 overlap matrix；
- 把跑出的证据、状态变化回写事实源。

**只在这几点需要你拍板（高影响）**：
- 某个 probe 出结果后的 **kill / continue** 决定；
- C02 / C04 是否 **branch**（分叉）；
- 任何 **Paper Project 立项**；
- 任何**花真实 GPU** 的 Run（目前仅 C31 会触及，且它还卡在 data-gate）。

一句话：**发现和验证的搭建我来做，研究命运的拐点你来拍。**

---

## 6. 离下一篇论文多远

诚实坐标：**0 Paper Project、0 达标 Paper Opportunity**——因为还没有任何 Candidate 通过一次有效 cheap probe（0 Actual Run）。

但距离不用百分比，用"缺什么"表达：

```text
离第一个 Paper Opportunity：只差 1 步
└── 5 张 probe 里任意一张跑出 positive + 同预算强 baseline 后仍有 headroom
    → 即可升为第一个 Paper Opportunity（然后才谈 Paper Project 立项）
```

换句话说：**你离"开始形成一篇论文"不是很远——只隔着一次成功的 cheap probe。** 现在尚无 Local Result 不是问题，是还没开跑；一旦 C03 或 C13 跑出稳定 failure，就产生第一条 Local-Result 级证据，坐标立刻从"发现"推进到"有真实证据支撑的论文机会"。

---

_数据源：Track 状态与 probe-ready 集合来自 [CURRENT.md](CURRENT.md) 主快照表；continue/kill 条件、旗舰候选、novelty 边界来自 [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) §5 Top12 与 §4 atlas；nest 事实（C14→C13、C15→C13/C03）来自 CURRENT.md 周期决策记录。_

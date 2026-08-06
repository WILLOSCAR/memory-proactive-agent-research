# Literature Sweep · 2026-08-05 (Round 3 — 横向扩底座)

第三轮文献捕获的正式产出。检索日 2026-08-05；仅据 arXiv 摘要/官方页判定，**未读 PDF 全文**（verification 一律 `verified-abstract`）。已对现有 210 源全量去重；新增 **88 源**（SRC-211..SRC-298），已经 Settlement writer 回写 `research-index.yaml`（event `EVT-2026-08-05-round3-sweep`）。

本轮定位：**横向扩底座**，偏薄 Track（P-PHY / U-PHY）倾斜 + 2026 前沿。承接前两轮（round1 平扫 68 源、round2 定向深挖 36 源），源库 106 → 210 → **298**。

## 检索策略

5 路后台 agent 并行，每路 1 条 Track（M-AI / P-AI / P-PHY / U-PHY / U-AI），硬约束写进 prompt：
- 高信任源：arXiv abs 页、官方 venue 页；每篇记 url + venue + year + verification 边界。
- 去重优先：先对照导出的 200 arXiv id + 210 title，命中即跳过，只报新的。
- 证据纪律：仅读摘要，只标 `direct coverage` / `pressure`；不读 PDF 不假装读正文；不写"空白/novel/无人研究"。
- 偏薄 Track 倾斜：P-PHY / U-PHY 各要 8–15 篇；最厚的 M-AI 从严，只报清晰新且清晰相关的。

一路（P-PHY）环境 WebSearch 报错，改用 arXiv 官方 API 做高信任源——诚实标注，仍是 abs 级核验。

## 每 Track 新增（去重后 88 源）

| Track | 新增源数 | 最厚子主题 |
| --- | --- | --- |
| M-AI | 15 | 状态感知时序冲突/staleness（A-TMA/TRACE/RaMem）、预算内 compaction（LazyMem/MemRefine/率失真）、记忆审计 benchmark（MEMPROBE/Setoka/Auditing Forgetting） |
| P-AI | 21 | C13 弃权/ask-vs-act（序列停止、动作空间内 ask、具身拒做、abstention-RL）、C14 timing、C16 VOI 首次操作化、C17 escalation |
| P-PHY | 20 | RL/bandit when-to-intervene（StepCountJITAI/RoME/BFTS/PFN-TS/Active Measuring）、MRT 因果估计（DR-WCLS/functional HeartSteps/zero-inflated TS） |
| U-PHY | 15 | 跨用户/跨被试 IMU HAR 泛化（5）、测试时/端上自适应（4）、联邦个性化（3）、生理信号 concept drift |
| U-AI | 19 | 偏好不稳定实证（Choice Blindness/Utility-Behavior Gap/State-Blind）、记忆谄媚（MIST 25×/MemSyco-Bench）、per-user reward（Personalized RewardBench/Meta RM/CDRA） |

> 计数说明：上表按 trackId 归属计数（跨 Track 源在每条 Track 各计一次），故合计 90 > 唯一 88。

跨 Track 重叠（去重合并为一条挂多 trackIds）：
- **Setoka**（2607.27056）→ M-AI + U-AI（分层用户理解 benchmark，既是记忆评测也是个性化评测）
- **MemSyco-Bench**（2607.01071）→ M-AI + U-AI（记忆诱发谄媚，横跨记忆治理与个性化安全）

relation 分布：direct-coverage 75 · pressure 13。**0 条撞库**（writer 本身也拒重复 id，双保险）。

## Novelty 线索地图（idea bank 沉淀核心）

以下全部是**给用户拍板的线索**，不是 kill/split 决定，也未改任何 Candidate 的 maturity/措辞。pressure 级源**不 link 进 candidate.sourceIds**，只在此记录。

### 被 direct coverage 挤压最重（措辞须从"novel"收紧到"已有基线，差异在 X"）

- **C13（弃权/该停不停）——本轮受冲击最重**。新增 6 个不同角度直击：序列停止（Agentic Abstention 2606.28733）、动作空间内 ask（ACTION-RATING 2606.11349）、DevOps 越界判定（UnderSpecBench 2607.02294）、具身拒做（RoboAbstention 2605.20544）、abstention-RL（AWA-RL 2607.10738）、隐藏态统一控制（Multi-Head Latent Control 2607.14277）。"agent 不知何时不作为"这一表述必须收紧到具体场景/评测单元。
- **C14（介入时机）**——出现分信息类型的价值衰减曲线（Ask Early/Late/Right 2605.07937）+ 联合 timing×action 评测（NIABench 2605.01368）+ over-execution/over-soliciting 置信框架（Mobile-Aptus 2605.28629, TASLP）。"timing 无可复用量化手段"受直接挤压。
- **C27（偏好稳定性）**——偏好不稳定/被构造得到硬实证：Choice Blindness（2603.08412，91% 调包未察觉）、Utility-Behavior Gap（2606.22974，偏好未转激励）、State-Blind（2601.15395，ACL26）、GOOD（2508.15119，偏好无界演化）。表述应从"多为 elicitation"升级为"偏好稳定性假设已被多篇经验挑战"。
- **C30（per-user reward）**——评测收窄：Personalized RewardBench（2604.07343，COLM26，峰值 75.94%）、Meta RM（2601.18731，SIGIR26）、CDRA/DeepPref（2510.11194，ICLR26）。需在"基准 vs 部署表现 vs 深层隐式偏好"三点间精确定位。

### 三个新的密集带（多篇 2026 并发，涉及处必须显式区分）

- **记忆谄媚（memory-sycophancy）已成显学**：MIST（2606.10949，25× 放大）+ MemSyco-Bench（2607.01071）+ 已收录 PASB。涉"记忆放大迎合"处必须区分读/写/检索三侧。
- **household/多用户三面包抄**：GroupMemBench（2605.14498，评测侧，46%）+ HARMONI（2601.19839，机制侧）+ Group Preference Collapse（2607.22603，坍缩）。C25/C26 不再干净，但 speaker-attribution × 记忆授权 × 群体公平的贯通线仍开放。
- **状态感知时序冲突**：A-TMA（2607.01935）/ TRACE（2607.00339）/ RaMem（2606.22844）三篇都在做"事实随时间变化时如何不被 stale 记忆误导"，与 C30 归因层、C28 state 都相关。

### 相对有余地 / 本轮无新增直接命中（最接近可辩护 gap）

- **C15（行动后 repair/retract）**——P-AI 检索线**本轮仍无新增直接命中**（延续 round2"最强真空信号"观察）。这是当前 idea bank 里相对最空的角。
- **C16（counterfactual value / VOI）**——首见直接落地（Ask When It Pays 2606.03175 把"何时问=期望不确定性下降 vs 成本"做成 cost-weighted 评测），缓解上轮"仅当门控/仅主观"的稀薄观察；但仍限导航域，健康/agent 场景化仍有余地。
- **C18（习惯化/信任衰减）**——仍多为侧翼 pressure（over-soliciting、不打断、engagement timing），未见以"长期习惯化"为主评测单元的直接命中。

## 纪律说明

- 全部 88 源经 arXiv abs 页/官方 API 逐一核验 id/title/year/venue；仅读摘要，未读全文。
- 无一标注为"空白/首个/无人研究"。
- 未改任何 Candidate 的 maturity / evidenceSummary / nextAction / nestedInto。
- 未新建 gap、未 link 任何 candidate.sourceIds——本轮纯扩源 + 记线索，研究判断留用户。
- 多篇为离线/仿真/OPE 或小样本 pilot（尤其 P-PHY），已逐条在 evidenceBoundary 标注不得当作前瞻部署或个体化时机的因果证据。

## 方法学收获

- 最厚的 M-AI 从严筛后仍捞到 15 篇真增量，说明底座在继续长而非见顶。
- 偏薄 Track 倾斜生效：P-PHY 30→50、U-PHY 27→42，两条最弱线补厚最多。
- 跨 Track 重叠只有 2 对，说明六 Track 的检索主题边界清晰、重叠可控。

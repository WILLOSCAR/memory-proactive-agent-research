# Literature Sweep · 2026-08-04

本轮六 Track 并行文献捕获的正式产出。检索日 2026-08-04；仅据 arXiv 摘要/官方页判定，**未读 PDF 全文**（verification 一律 `verified-abstract`）。已对现有 106 源去重；新增 **68 源**（SRC-107..SRC-174）+ 2 条 novelty 线索，已经 Settlement writer 回写 `research-index.yaml`（event `EVT-SWEEP-20260804`）。

术语见 [CONTEXT.md](CONTEXT.md)；证据纪律：只标 `direct coverage`（论文直接定义该任务/benchmark）或 `pressure`（覆盖邻近切口），**无一处写"空白/无人研究/novel"**。

## 检索策略

六个 `general-purpose` agent 各负责一条 Track，带该 Track 现有源的去重清单 + 硬约束（高信任源、命中即跳、不读 PDF 不假装、只标 direct/pressure）。主题落点对齐薄弱 Track（P-AI/P-PHY/U-PHY 原各 ≤19 源）与 2026 前沿。

## 每 Track 新增（68 源）

| Track | 新增 | 主要簇 | direct-coverage 命中的候选 |
| --- | ---: | --- | --- |
| M-AI | 12 | rollback/authority/laundering/forgetting | C01 C02 C03 C05 C06 |
| M-PHY | 12 | wearable FM / informative missingness / provenance | C07 C08(×4) C09 C10 C12 |
| P-AI | 12 | 介入决策门控 / timing 指标化 / 打扰信任 | C13 C14 C18 |
| P-PHY | 12 | MRT/JITAI 因果方法 / withdrawal / modality | C19 C22 C23 C24 |
| U-AI | 12 | preference conflict / correction debt / update-layer | C25 C26 C27 C29 C30 C28 |
| U-PHY | 10 | drift attribution / habituation / cold-start | C31 C33 C35 |

跨 Track 重叠（合并为一条挂多 trackIds）：
- **SRC-118** StateAuditor `2608.01619` → M-AI + U-AI（IPA gap 同时命中 C01 语境与 C28 correction debt）
- **SRC-143** ROGUE-TS `2511.02944` → P-PHY + U-PHY（habituation 同时命中 C22 withdrawal 与 C34）
- **SRC-**（JITAI-Twins `2607.21403`）→ P-PHY + U-PHY（部署前模拟）

逐源明细见 `.sweep-drafts/{track}.md` 与 `research-index.yaml` 的 SRC-107..SRC-174。

## Novelty 线索地图（idea bank 沉淀核心）

这是本轮最重要的产出——**哪些候选被 2026 新工作直接挤压、哪些相对有余地**。均为线索，不构成 kill 决定（研究判断留用户）。

### 被 direct coverage 挤压（措辞须从"novel"改为"已有基线，差异在 X"）

| 候选 | 挤压来源 | 仍可辩护的差异空间 |
| --- | --- | --- |
| C01 lifecycle counterfactual | ChronoMem（rollback+反事实后验证协议） | 跨层 residual / tool side-effect（ChronoMem 只做整库快照） |
| C02 action-conditioned authority | AuthMem-Bench（authority collapse + action-grounded 评测） | commit-time gating 语义 / revoke（本篇是 consolidation 时保留） |
| C05 provenance laundering | PPMF（**直接撞名**+防御） | provenance 本身被篡改后的 laundering |
| C08 missingness→action | 2604.21235（缺失→潜状态→策略，已在 ICU 成型） | wearable 连续信号 + 设备语境（现有在 ICU EHR） |
| C13 multi-action deferral | PRISM（成本门控）+ ProACT（turn 级 benchmark） | 完整 6 动作格 + consequence（现有多为 silence/speak 二分） |
| C14 timing | intervention latency / Intervention Timing 已成指标 | consequence-aware opportunity window（现有是纯时机打分） |
| C18 habituation | 1000-Personas / ProVoice over-triggering / push 关停率 | 长期真实部署曲线（现有多为模拟+短期） |
| C22 withdrawal | ROGUE-TS（habituation/recovery 写进 bandit） | withdrawal 的因果撤回而非 reward 动力学 |
| C24 delivery modality | hybrid SMART-MRT / 语音日记 / RL nudge RCT | sensor/social 不确定性下的模态选择 |
| C34/C35 habituation·adherence | ROGUE-TS + Murphy 组 Habitual-Behaviors（时机漂移） | 漂移来源区分 / 生理侧检测 / worst-user 保证 |

### 相对有余地（pressure 最弱，最接近可辩护 gap）

- **C04 household identity**：所有多 principal 工作 principal 均 agent/tenant/role，无一以**家庭自然人身份 + 亲密关系授权 + 身份混淆**为对象。
- **C11 派生生理记忆删除**：machine-unlearning/RTBF 在生理信号语境本轮无直接命中（仅通用域），建议定向复检（"physiological embedding unlearning"）。
- **C15 repair/retract、C16 counterfactual value**：P-AI 本轮无直接命中；counterfactual value 仍稀薄（PRISM 只当门控内机制、Omakase 只测主观 actionability）。

### 两条新 gap 线索（已入 index gaps，candidateIds 空）

- **GAP-UAI-CONSTRUCT**：preference **construction** vs elicitation——澄清价值可能不在消歧而在帮用户建偏好（CoShop 2606.30863）。
- **GAP-UAI-K2A**：knowledge-to-action / IPA 归因层——"有记忆却不照做"被 StateAuditor + IBA-Bench 两篇 2026-08 独立命名；仍缺 memory vs policy vs weight 的归因拆分（FABLE 2608.00215 / Reward Crisis 2512.23067）。

## 纪律说明

- 多篇高热度 prediction/forecasting 工作（Regretful Sessions 2606.08965、Mental Health Forecasting 2601.03603、WatchAnxiety 2509.13725）已明确标注**不得当作因果/receptivity 证据**。
- 所有 68 源仅摘要核对，`verified-abstract`，未读全文，不代表本项目复现或认可结论。
- pressure 级源只入 sourcePapers、不 link 进 candidate.sourceIds，避免污染候选证据；仅 45 条 direct-coverage 边 link。

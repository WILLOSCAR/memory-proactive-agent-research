# Archived v1: Memory × Proactive Agent 调研入口

> 归档说明：该入口把一个候选交叉命题写成了整个研究项目的主结构，已于 2026-07-30 被新的 `README.md` 与 `PROGRAM_MAP.md` 替代。内容保留用于追溯，不再作为导航入口。

更新日期：2026-07-30

## Program 边界

本目录同时服务两个不同层次：

- **Paper Program**：Memory、Proactive Agent、生理多模态、触发机制等并行论文线；
- **Auto Research Ops**：用户与 Agent 用于调研、排实验、运行、复盘和资产沉淀的 SOP。

所有已确认论文线都可以每周迭代；不强制共用代码架构。方法、Prompt、评测器和工具能自然复用时再复用。

## 结论

最值得继续验证的不是“给主动 Agent 加长期记忆”，而是：

> **State Before Action：先把跨会话历史解析成当前有效、可追溯的 lifecycle state，再由用户权限、系统策略和环境能力派生可执行动作集合，最后决定 silence / ask / suggest / prepare / execute。**

宽泛的 `structured memory + proactive gate` 已经受到 Tenure、TrustMem、Supersede、DCPM、PASK、π-Bench 和 PRISM 等工作的直接新颖性压力。当前可辩护的研究问题是：

> 生命周期解析后的状态，是否会与主动介入 gate 产生可测的交互效应，并在匹配模型、token、调用次数和延迟预算时，改善 benefit–burden Pareto frontier？

当前判断：**Needs Substantial Evidence**。方向值得做，但还不是已经成立的论文命题。

## 任务地图

### Memory

1. 事实、时间和知识更新；
2. 隐式目标、偏好、价值和因果约束；
3. ledger / tracker / tree 等结构发现与维护；
4. 从旧轨迹和失败经验到后续行动；
5. supersession、取消、过期、删除和作用域隔离；
6. 多模态、流式环境记忆；
7. 固定预算下的选择性保留和遗忘。

### Proactive Agent

1. `Whether`：是否介入；
2. `When`：何时介入；
3. `What`：识别什么潜在需求；
4. `How`：提问、建议、准备还是执行；
5. 事件更新、取消和连续提醒；
6. 多人协作中的适时介入；
7. 利用空闲算力提前研究或准备；
8. 主动维护长期状态，例如确认冲突、补 scope、标记不确定或遗忘。

## 推荐实验

先做 150–300 个 ProEvent 样例的一周证伪实验，不训练，并严格匹配 backbone、解码、token 和调用预算：

| 条件 | Memory | Gate |
| --- | --- | --- |
| 1 | full history / current timetable | 显式更新推理 |
| 2 | flat extracted memory | 相同 gate |
| 3 | lifecycle-resolved state | 相同 gate |
| 4 | lifecycle-resolved state | state-conditioned multi-action gate |
| 5 | oracle active state（小样本） | oracle ceiling |

核心判断：

- oracle state 能否明显减少取消、过期和错误介入；
- lifecycle state 是否比强 full-history 基线至少产生约 5 个绝对点的多步成功率增益；
- false detection / incorrect deletion 是否相对下降约 20%；
- online writer 能否保留至少一半 oracle-state 增益；
- 完整方法能否击败 `Tenure-like state + PRISM-like gate` 组合基线。

这些数字是研究顾问给出的停止/推进启发式，不是会议接受标准。

若小实验通过，再扩展到：

1. π-Bench：hidden intent、PROC、COMP、跨 session；
2. ProactiveBench：false alarm、calibration、cost curve；
3. LoCoMo-Plus：只用于 writer 的 latent-constraint diagnostic；
4. MemoryArena / LongMemEval-V2：后续验证经验记忆到行动；
5. 真实 coding / research trajectories：外部有效性。

## 算力判断

- 第一周无需训练：API 或本地推理即可，可能不需要 GPU；
- 7B/8B LoRA：`2 × A100/A800 80G` 是实用起点；
- 14B LoRA / 更长序列：`2–4 × 80G`；
- 32B、长序列 RL、大量并行 rollout：`4–8 × 80G`；
- 多模态成本明显更高，建议最后再做。

这意味着用户计划的 `2–4 × A100/A800 80G` 足以覆盖本文最重要的文本/工具轨迹实验。

## 文档

- `PROGRAM_MAP.md`：Paper Program 与 Auto Research Ops 的边界、研究树和资源原则；
- `directions/2026-07-30-adjacent-direction-map.md`：Prospective Memory、Active Sensing、JITAI、Personalization 等相邻方向；
- `sources/2026-07-30-adjacent-source-ledger.md`：本轮新增方向的原始来源账本；
- `operations/ASSET_PROTOCOL.md`：实验、Prompt、数据、资源和负结果的沉淀规范；
- `operations/WEEKLY_ITERATION.md`：面向 2–4×80G 和不稳定资源的每周验证阶梯、默认训练参数；
- `templates/`：paper track、experiment 和 weekly review 模板；
- `EVIDENCE_NOTES.md`：完整任务、benchmark、相关工作、实验和算力证据；
- `GPT_PRO_QUESTION.md`：发送给 GPT Pro 的审稿问题；
- `.codex/codex-pro-bridge/gpt-pro-sessions/memory-proactive-agent-2026-07-30-gpt-pro/001-memory-as-constraint-state.md`：不可变的 GPT Pro 原始问答；
- `review/`：Codex 对 GPT Pro 建议的核验、取舍和下一步。

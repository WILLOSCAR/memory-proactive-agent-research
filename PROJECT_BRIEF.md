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

```text
Source / Failure
  → Paper Radar → Eval Landscape → White-space Inbox
  → Problem Definition → Cheap Probe
  → Continue / Branch / Park / Kill
  → Experiment → Run → Artifact → Decision
```

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

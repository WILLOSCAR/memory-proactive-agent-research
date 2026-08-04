# Resource-Aware Weekly Iteration

状态：**frozen legacy heuristic / superseded**
目标：M-AI、M-PHY、P-AI、P-PHY、U-AI、U-PHY 中所有活跃论文线每周都有可复核版本，同时避免把不稳定的 2–4×80G GPU 变成唯一进度来源。UbiComp/HCI 小产品使用独立版本账本。

> 本文件保留其资源阶梯与历史默认值，不再规定所有 Track 的统一周配额。当前运营规则以 [../OPERATIONS.md](../OPERATIONS.md)、[../REQUIREMENTS_AUTO_RESEARCH_OS.md](../REQUIREMENTS_AUTO_RESEARCH_OS.md) 和 [../SOURCE_AUTHORITY.yaml](../SOURCE_AUTHORITY.yaml) 为准。

## 1. 版本阶梯

### Rung 0：Paper Test

- 明确一句可证伪 claim；
- 找出最强现有工作和 killer baseline；
- 设计一张核心表；
- 判断现有数据是否足以回答问题。

资源：CPU + 文献检索。

### Rung 1：Prompt / Oracle / Replay

- 50–300 样例；
- 1 个主模型；
- 1 个 seed 或确定性解码；
- oracle 输入与强 baseline；
- executable metrics 优先。

资源：API、CPU 或单卡；目标是 0.5–1 天出结果。

### Rung 2：Small Pilot

- 200–1,000 样例；
- 2 个模型族；
- 2–3 个 seed；
- 核心消融；
- 同 token/call/latency 预算。

资源：1–2×80G 或等价推理资源；目标是 1–2 天。

### Rung 3：Light Training

默认从 7B/8B LoRA 开始：

```yaml
precision: bf16
max_sequence_length: 4096
lora_rank: [16, 32]
lora_alpha: [32, 64]
lora_dropout: 0.05
learning_rate: [1.0e-4, 2.0e-4]
epochs: [1, 2, 3]
warmup_ratio: 0.03
gradient_checkpointing: true
flash_attention: true
effective_batch_size: 32-64
eval_every_steps: 100
early_stopping: primary_metric
```

说明：

- 第一轮只跑一个中心配置和一个 rank/learning-rate 对照；
- 不在第一周做大网格搜索；
- sequence length 只有在长历史确实产生增益时才升到 8K/16K；
- SFT 有信号后再做 DPO/GRPO/RL；
- trigger/classifier 优先训练小模型，不默认使用 7B LLM。

资源：`2×A100/A800 80G` 为实用默认；目标是 1–2 天训练与评测。

### Rung 4：Confirmation

- 全 benchmark；
- 至少 3 个 seed；
- 两个以上模型族；
- 完整 baselines、消融、统计检验；
- 训练/推理成本和错误分析。

资源：`2–4×80G`，只给已通过 Rung 2/3 的分支。

### Rung 5：Expensive Extension

- 32B；
- 长序列 RL；
- 大规模并行 rollout；
- 多模态端到端训练；
- 真实用户 longitudinal deployment。

这一级不作为每周常规动作，需要明确的论文收益证明。

## 2. 一周节奏

```text
周一：冻结本周各 track 的 claim、核心表和停止条件
周二：oracle / prompt / smoke
周三：pilot 与第一轮错误分析
周四：最小方法修改、训练或关键消融
周五：确认结果、更新研究树、归档资产、决定下周分支
```

“狂暴迭代”依赖缩短反馈周期，而不是同时提交大量不可解释训练。

六个分支每周都要有版本，但版本不等于“六条线都训模型”。每周只允许 1–2 个已经通过 Rung 1/2 的高信息增益实验进入重 GPU 队列；其余分支通过来源核验、数据切片、oracle、评测器、Prompt、错误分析或小模型继续演化。

## 3. 多线共享 GPU

假设 2–4 张 80G 卡不稳定可用：

- 同一时间至多一个重训练分支占满 2–4 卡；
- 其他 track 同步做数据、Prompt、oracle、评测器和小模型；
- 优先运行最可能改变 kill/continue 决策的实验；
- 交互式 GPU 用于调试；稳定长任务转 Job；
- 每个训练都必须可从 checkpoint 恢复，避免 Spot/超时导致整轮报废。
- 资源账本必须分开记录 requested、queued、allocated 与 actual GPU；只有实例和 `nvidia-smi` 验收才算实际拿到卡。

建议分配单位不是“每条 track 固定几张卡”，而是“本周最高信息增益实验占用 GPU”。

## 4. 快速训练的参数纪律

每次只改变一个主要因素：

1. 数据；
2. Prompt / policy；
3. model size；
4. optimization；
5. memory representation；
6. trigger/gate。

禁止在同一版本同时更换数据、模型、Prompt 和评测器，然后把提升归因于某个方法。

每个参数 sweep 先做 successive halving：

```text
20% 数据筛掉明显失败配置
→ 50% 数据保留前 2 个
→ 100% 数据确认前 1–2 个
```

任何 sweep 开始前先冻结 Experiment design；每次执行生成独立 Run manifest，不允许把多次运行结果写回同一个目录。

## 5. 六个研究分支的默认最小版本

| Branch | 一周版本 | 可选 tag | 默认资源 |
| --- | --- | --- | --- |
| M-AI | 200–500 样例 + oracle + full-history/RAG 强基线 | lifecycle、prospective、active-retrieval | API / 1 GPU |
| M-PHY | public sensor data + current-window/history/memory 对比 | multi-timescale、forgetting | 1–2 GPU |
| P-AI | replay + calibrated threshold + false-alarm/cost curve | trigger、background、multi-action | CPU / 1 GPU |
| P-PHY | rule/current-window/history-aware/oracle trigger | JITAI、active-sensing、receptivity | CPU / 1 GPU |
| U-AI | global/persona/memory/few-shot/oracle user model | drift、rational-personalization | API / 1 GPU |
| U-PHY | global/per-user normalization/calibration/few-shot head | baseline、concept-drift | 1–2 GPU |

## 6. 产品层的独立版本

产品版本不算作上述六个分支的方法提升。它可以是：

- scenario / design probe；
- Wizard-of-Oz；
- 手机、手表、AR、haptic 或 ambient prototype；
- sensing latency / energy / privacy test；
- user-study pilot；
- field deployment。

只有产品产生可泛化 method、benchmark 或 dataset 时，才把对应资产链接回一个 primary research branch。

## 7. 升级和停止规则

升级到下一 rung 前至少满足一项：

- 明确优于 killer baseline；
- oracle 显示方法上限值得追；
- 错误分析显示单一可修复瓶颈；
- 新数据揭示稳定、可重复的 failure mode；
- 产品 pilot 显示介入确实有用且不只是新鲜感。

停止或 park：

- oracle 都不能改善目标指标；
- 提升只来自更多 token/调用；
- 不可获得 ground truth；
- 需要当前资源之外的大规模预训练才可能验证；
- 最近工作已直接覆盖 claim，且没有新的变量或评测。

## 8. 每周资产门

周五结算前检查：

1. 六个分支各有版本号、证据指针和下周证伪点；
2. 每个完成 Run 均有实际资源、退出状态、artifact digest 和结果语义；
3. `negative / failed / invalid / inconclusive` 已严格区分；
4. 每条发生变化的 paper claim 已更新 claim–evidence ledger；
5. 新来源已记录核验边界，不把外部模型建议当事实；
6. 生理/用户数据已记录 license、consent、user split 与隐私限制；
7. 下周重训练队列按“最可能改变 continue/kill 决策”排序；
8. 生成可从零恢复的 handoff。

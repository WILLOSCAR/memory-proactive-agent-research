# Archived v1: Memory / Proactive Agent Paper Program

> 归档说明：该版本将 Wearable、Trigger 等方法/载体误设为一级方向，已由 3×2 研究矩阵替代。

状态：讨论稿  
更新日期：2026-07-30

## 1. 两个不同层次

### Paper Program

这里包含所有以论文产出为目标的研究线。每条线必须有自己的：

- 应用场景；
- 可证伪研究问题；
- 数据或环境；
- 强基线；
- 指标；
- 每周实验版本；
- 投稿故事。

Paper Program 不是“帮助用户做实验的研究助理”这一单一应用。Memory、Proactive Agent、生理多模态、触发机制等都可以分别形成论文线。

### Auto Research Ops

这是用户与 Agent 协同生产论文的 SOP：

- 调研并维护来源；
- 把想法展开成研究树；
- 生成和排定实验；
- 记录 Prompt、代码、参数、数据和资源；
- 申请并使用 GPU；
- 读取结果、淘汰分支和生成下一版本；
- 沉淀可复用方法、Prompt 和工具。

Auto Research 首先是 Paper Program 的生产系统。只有在它形成独立方法、benchmark 或可验证系统贡献时，才另行作为论文方向。

## 2. 并行原则

未来 6–8 周，所有已确认主线都持续迭代，但不要求：

- 每条线每周都训练大模型；
- 每条线使用同一个代码库；
- 每个方法强制抽象成公共模块。

“本周有版本”定义为完成至少一个可复核增量：

1. 新数据或任务切片；
2. 新 Prompt / inference policy；
3. 新方法模块；
4. 一个受控消融；
5. 一个训练 checkpoint；
6. 一个负结果及对应决策；
7. 一个产品原型或用户研究 pilot。

共享遵循机会主义原则：方法、Prompt、评测器、脚本或资产规范能直接复用就引用；为了“统一”而增加维护成本时不共享。

## 3. 当前研究树

```text
Paper Program
├── M. Memory
│   ├── memory bank / writer / retrieval / update / forgetting
│   ├── personalized memory policy
│   ├── prospective memory
│   └── proactive memory injection / retrieval
├── P. Proactive Agent
│   ├── whether / when / what / how
│   ├── false alarm / receptivity / interruption
│   ├── background anticipation / prefetch
│   └── safe autonomy / permission
├── W. Wearable and Physiological
│   ├── IMU / PPG / ECG / HRV / EDA / sleep
│   ├── longitudinal physiological memory
│   ├── JITAI and behavior change
│   └── personalized concept drift
├── T. Trigger and Interaction
│   ├── small event-stream trigger
│   ├── on-demand active sensing
│   ├── uncertainty / conflict / future-cue trigger
│   └── notification / haptic / audio / AR / ambient actuation
└── X. Cross-cutting
    ├── privacy and selective sensing
    ├── calibration and action admissibility
    ├── social / team / ambient agents
    └── on-device and resource-efficient intelligence

Auto Research Ops
├── evidence and source ledger
├── idea / branch registry
├── experiment manifests and results
├── weekly decision log
├── resource and storage ledger
└── reusable methods / prompts / tools
```

这棵树只是方向目录，不代表每个节点都应独立投稿。后续 grilling 要逐步确定哪些节点合并成一篇论文、哪些只是实验分支。

## 4. 资源约束

当前研究计划按以下现实约束设计：

- 可交互的 A100/A800 80G 不保证持续可得；
- 实用并行规模以 `2–4 × 80G` 为主要上限，不把 8 卡作为早期依赖；
- 不同 SSH、资源池和云盘之间的数据可见性不同；
- 跨机器实验资产需要使用可移植的数据快照或 HDFS/对象存储 URI；
- 每次运行都必须记录实际 GPU、资源池、Job/Worker、挂载与代码版本，不能只记录期望配置。

因此，快速迭代默认先走：

```text
Prompt / API / CPU
→ 小样本 inference
→ 小模型 trigger / classifier
→ 7B/8B LoRA
→ 14B 或更大训练
→ RL / 多模态大规模训练
```

只有前一级出现稳定信号，才升级资源。

# Research Program and Asset Index

状态：v3，当前主结构  
更新日期：2026-07-30

## 1. 上位研究对象

本项目研究的不是六个互相独立的模块，而是：

> 一个在用户、环境、权限、传感器、工具和自身记忆持续变化时，必须在信息不完全下选择获取信息、等待、行动、不行动、撤回与修复的长期 Agent。

核心科学问题是：在状态变化、观测不完整、动作代价不对称、未来又受当前动作影响的条件下，Agent 如何维持可校正、可撤销、可归责的长期决策质量。

Memory、Proactive Agent、Personalization 是三个主要操纵面；physiological / multimodal data 是一组特别重要的长期、缺失、个体差异、隐私与干预压力。

## 2. 3×2 资产索引

```text
Research Program
├── 01. AI Memory
│   ├── M-AI: 通用 AI Memory
│   └── M-PHY: 生理/行为数据下的 Memory
├── 02. Proactive Agent
│   ├── P-AI: 通用 Proactive Agent
│   └── P-PHY: 生理/行为数据下的 Proactive Agent
└── 03. Personalization
    ├── U-AI: 通用 AI Personalization
    └── U-PHY: 生理/行为数据下的 Personalization
```

这张矩阵负责：

- 给 source、idea、experiment 和 artifact 一个稳定索引；
- 让六个分支都持续产生问题、评测和实验；
- 避免同一资产在多个目录重复记账；
- 统计 portfolio 覆盖与资源消耗。

它不负责：

- 宣称六个格子是学术 ontology；
- 限制白空间发现只能从六格内部开始；
- 把跨分支 failure 强行压成一个组件问题；
- 规定每格只能产出一篇论文。

## 3. 六个索引分支

| ID | 主要操纵面 | 典型问题 | 可独立产出的论文形态 |
| --- | --- | --- | --- |
| M-AI | write/update/retrieve/forget/authority/rollback | lifecycle、revocation、shared memory、parametric memory | method、benchmark、diagnosis、systems |
| M-PHY | 连续信号如何形成决策可用的长期状态 | missingness、multi-timescale、derived-data deletion | method、benchmark、dataset、analysis |
| P-AI | 是否、何时、以何种动作介入 | silence/wait/ask/prepare/execute/retract | policy、benchmark、evaluation、RL |
| P-PHY | 生理/行为状态何时足以支持介入 | need、receptivity、effect、active sensing | causal audit、policy、benchmark、HCI |
| U-AI | 动态用户模型如何被正确使用和纠正 | role conflict、feedback ambiguity、correction debt | method、benchmark、analysis |
| U-PHY | 个体基线与长期变化如何被识别和适应 | drift attribution、cold start、response heterogeneity | method、benchmark、longitudinal analysis |

每个分支可以同时拥有多个 idea、cheap probes 和 paper candidates。一个具体 claim 被 kill，不关闭分支。

## 4. 开放式问题发现框架

问题发现不从“我要做哪一格”开始，而从真实 failure event 开始，并至少展开以下维度：

| Axis | 需要问什么 |
| --- | --- |
| state subject | world、user、physiology、permission、tool、memory、social context 中谁变了 |
| lifecycle | create、update、conflict、revoke、expire、delete、restore、revive 是否被观察 |
| horizon | decision、episode、trajectory、lifecycle、deployment period 哪个单位才看得到失败 |
| observability | missing、noisy、delayed、MNAR、contradictory 是否影响决策 |
| information action | retrieve、ask、verify、sense、wait、monitor 的成本是什么 |
| identity | 信息属于谁，谁有权更新、撤销和使用 |
| intervention action | silence、suggest、prepare、execute、withdraw、correct 是否可选 |
| timing | early/on-time/late、interruptibility 和 delivery modality 如何计价 |
| uncertainty | confidence 是否按动作风险和可逆性校准 |
| consequence | 是否有 no-action/alternative-action counterfactual 与长期累计后果 |
| governance | provenance、purpose、consent、authority、privacy、deletion 是否可审计 |
| responsibility | writer、memory、retrieval、reasoning、policy、tool、interface 中谁导致失败 |

这是一套生成白空间的 grammar，不是需要新建目录的 taxonomy。

## 5. Physiological / multimodal 的角色

生理与行为数据只有在至少改变下列一项时，才构成真正的 `*-PHY` 研究设置：

- observation 连续、异步、缺失或 MNAR；
- 时间尺度从秒到周跨层耦合；
- 个人 baseline 和用户间差异改变 ground truth；
- device/placement/lifestyle/physiology drift 需要区分；
- intervention 改变后续状态、依从性或缺失模式；
- privacy、consent、derived-data deletion 进入方法或评测；
- sensing budget、端侧算力、能耗或主动采集成为决策变量。

若只是把现成算法换到 wearable dataset 上，优先视为应用或产品载体，不自动成为 `*-PHY` novelty。

这些压力也可能出现在 smart home、共享设备、AR、industrial monitoring 或 coding telemetry 中，因此 discovery 阶段允许把它们作为跨场景 stressor 迁移。

## 6. 横切标签

| Tag | 典型分支 |
| --- | --- |
| lifecycle / forgetting / prospective-memory | M-AI、M-PHY、P-AI |
| provenance / authority / revocation | M-AI 为主，六分支均可 |
| uncertainty / meta-memory / selectivity | M-AI、P-AI、U-AI |
| shared-memory / identity / access-control | M-AI、P-AI、U-AI |
| self-evolution / parametric-memory / rollback | M-AI、U-AI |
| active-retrieval / active-sensing | M-*、P-* |
| causal-intervention / closed-loop | P-*、U-PHY |
| drift / continual-learning / co-adaptation | U-*、M-PHY |
| repair / withdrawal / reversibility | M-*、P-*、U-* |
| autonomy / explanation / privacy / consent | 六个分支 |
| on-device / delivery-modality / social-context | PHY、P-*、产品层 |

横切标签可以形成独立 paper family，但不因一次 brainstorm 就升级为一级目录。

## 7. 资产归档与科学归因分离

一个 idea、experiment 或 run 仍只选一个 `primary_branch`：

- 主要操纵 memory 表示、写入、更新、检索、遗忘或撤权：`M-*`；
- 主要操纵是否、何时、如何介入：`P-*`；
- 主要操纵用户模型、适配或反馈学习：`U-*`。

这个规则只解决资产归档，不替代科学责任归因。评测必须允许同时标注：

```text
writer → memory → retrieval → reasoning → policy → tool → interface
```

最终失败由哪一层触发、哪一层本可阻止、哪一层负责修复，应分别报告。

## 8. 一等论文形态

以下均可成为主要产出，不要求先发明新模型：

- method / learning problem；
- benchmark / dataset；
- evaluation protocol；
- failure taxonomy / diagnosis；
- causal audit / proxy audit；
- systems mechanism；
- longitudinal analysis；
- UbiComp/HCI system、interaction 或 field study。

评测论文必须能改变模型或 policy 排名、暴露现有指标不可见的重要 failure，或建立更正确的 estimand；只增加样例而不改变结论不够。

## 9. 产品层

```text
products/
├── smartwatch / wearable notification
├── IMU-triggered micro interaction
├── AR / smart-glasses assistance
├── audio / haptic / ambient interaction
├── personal health reflection
└── other point products
```

Point product 主要服务 UbiComp/IMWUT/CHI 的 system、sensing、interaction、deployment 或 user-study 贡献。若产品产生可泛化的新方法、benchmark、dataset 或 evaluation failure，再链接回一个 primary branch。

## 10. 迭代与资源

- 研究反馈周期是 1–2 周；6–8 周只表示滚动 portfolio 观察窗口，不是等到周期末才产出；
- 当前阶段不设 Draft gate，优先从论文和 benchmark 中发现、定义、证伪问题；
- 六个分支都可高频生成 idea、evaluator、slice、oracle、negative result 和 branch；
- CPU/API/replay 可以全线并行；
- 同时只运行一个单卡 smoke，重训练最多 1–2 个 experiment 并发；
- 7B/8B LoRA 通常不超过 `2×A100/A800 80G`，confirmation 才考虑 `2–4×80G`；
- 8 卡、大规模 wearable pretraining 和长序列 RL 不进入当前关键路径；
- GPU 与跨 SSH 数据路径统一按本地 GPU runbook 刷新和验收。

GPU 调度只决定实验何时运行，不能反向决定哪些研究问题存在。

## 11. Auto Research 资产流

```text
Source / Failure
      ↓
Paper Radar → Eval Landscape → White-space Inbox
      ↓
Problem Definition → Cheap Probe
      ↓
Continue / Branch / Park / Kill
      ↓
Experiment → Run → Artifact → Decision
```

可复用的是方法、Prompt、evaluator、数据 schema 和工具；不强制不同论文共享实现，也不为尚未开始的 paper 建空目录。

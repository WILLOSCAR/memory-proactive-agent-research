# Memory / Proactive / Personalization Research

更新日期：2026-07-31

这是一个以论文产出为主、以 Auto Research 为执行方式的研究仓库。当前阶段从论文、benchmark 与真实 failure 中高速发现和证伪问题；暂不设置 Draft gate。

长期关注三条线：

1. AI Memory；
2. Proactive Agent；
3. Personalization。

每条线都包含通用 AI 与生理/行为数据设置。`3×2` 是资产索引，不是学术 ontology 或 idea 边界；六个分支都可独立、持续地产生多个 idea、评测、实验和论文。

## 日常只看这七个入口

| 文件 | 唯一职责 | 不应该放什么 |
| --- | --- | --- |
| [PROGRAM_MAP.md](PROGRAM_MAP.md) | 长期研究对象、3×2 索引、开放式评测轴 | 当前任务、运行日志 |
| [LITERATURE_MAP.md](LITERATURE_MAP.md) | 六个方向的论文簇、共同盲区、Idea Forest 与 cross-branch 组合 | 逐篇来源流水、card 实时状态 |
| [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) | 36 个候选、Top 12、问题定义、证据边界和初始路由 | card 实时列、周进度、长篇原始外部回答 |
| [CURRENT.md](CURRENT.md) | card 实时状态的唯一动态 Kanban、执行车道和停止条件 | 永久规范、历史流水账 |
| [OPERATIONS.md](OPERATIONS.md) | idea、实验、运行、评测与数据规则 | 研究方向判断、某周具体结果 |
| [GPT_PRO_REVIEW.md](GPT_PRO_REVIEW.md) | GPT Pro 建议与 Codex 的采纳/修改/拒绝 | 未经复核的新事实 |
| [sources/2026-07-30-adjacent-source-ledger.md](sources/2026-07-30-adjacent-source-ledger.md) | 已打开核验的原始论文、benchmark 与证据范围 | 本项目已复现论文或完成 novelty search 的暗示 |

新发现先写入 backlog；只有进入真实 Experiment/Run 才增加目录。

## 当前研究口径

共同研究对象是：

> 一个在用户、历史、环境、权限、传感器、工具和自身记忆持续变化时，必须选择获取信息、等待、行动、不行动、撤回与修复的长期 Agent。

P1–P6 已从“六个 root problems”降级为 paper seeds，并扩散为 36 个候选。当前优先候选是：

- C01 lifecycle counterfactuals；
- C03 benign revocation residual；
- C13 multi-action deferral；
- C23 closed-loop confounding；
- C25 conflict attribution / negotiation / rollback；
- C28 feedback-cause routing；
- C31 drift attribution；
- C08 missingness cause → acquisition/action → regret。

其中 C14 timing 与 C15 repair 的 broad standalone framing 已终止，改为 C13/C03 的 nested evaluator slices。这些仍只是最先验证的节点，不是已经批准的论文题目。benchmark、evaluation、diagnosis、causal/proxy audit 与 method 同样是一等产出。

## 狂暴迭代，不狂暴下结论

- 每个分支持续维护至少 6 个不同 failure family；
- 每周每分支继续补充至少 3 个论文/评测驱动候选；
- 每个候选必须有真实 failure、counterfactual、killer baseline、1–3 天 probe 和 kill/branch 条件；
- CPU/API 工作可以全线并行，单卡 smoke 串行；
- 每周至少 kill 或 branch 一个节点；
- `current ledger 未观察到直接覆盖` 不等于 `此前没有工作研究过`；
- prediction、acceptance、receptivity 和 causal treatment effect 不互相替代。

## 实验基础设施

| 文件 | 用途 |
| --- | --- |
| [infra/GPU_RUNBOOK.md](infra/GPU_RUNBOOK.md) | Stable Worker、Spot Job、Scheduled 整机、SSH、ByteNAS/HDFS 与实例验收 |
| [scripts/gpu-plan.sh](scripts/gpu-plan.sh) | 默认不提交任务的命令生成器，以及 GPU/HDFS 验收脚本 |
| [templates/run-manifest.yaml](templates/run-manifest.yaml) | requested/allocated/actual resource、数据 digest 与 Artifact 指针 |

卡量和队列会变化，不在研究文档里保存静态“空闲卡数”。每次实验都刷新资源，并以 Instance 内登录、`nvidia-smi` 和存储 probe 为准。

## 当前树

```text
memory-proactive-agent-research/
├── README.md
├── PROGRAM_MAP.md
├── LITERATURE_MAP.md
├── PROBLEM_BACKLOG.md
├── CURRENT.md
├── OPERATIONS.md
├── GPT_PRO_REVIEW.md
├── PROJECT_BRIEF.md                  # ChatGPT Project 简报
├── infra/
│   └── GPU_RUNBOOK.md
├── scripts/
│   └── gpu-plan.sh
├── templates/
│   └── run-manifest.yaml
├── sources/
│   └── 2026-07-30-adjacent-source-ledger.md
├── review/                           # 外部评审转录与独立 Codex verdict
├── operations/                       # 已冻结旧协议，不是日常入口
├── experiments/                      # 真正开始后才创建子目录
├── archive/                          # 已替代历史
├── artifacts/                        # 不可变导出包
└── .codex/                           # Bridge bundle、session、verdict 审计
```

## 文件增长规则

- 不为“以后可能会用”创建空文件；
- 不按每个 candidate 或 brainstorm 建文件；
- 一个真实 Experiment 初始最多创建：

```text
experiments/<experiment-id>/
├── README.md
└── runs/<run-id>/
    └── manifest.yaml
```

- 原始数据、checkpoint、日志和大输出不复制进文档树，只记录 URI、digest 和访问边界；
- GPT Pro 每轮只保留不可变原文与独立 Codex verdict。

## ChatGPT Project

仓库绑定到 ChatGPT Project `Auto Research`。Project Sources 提供稳定背景，单轮 Task Bundle 提供精确快照；两者不能互相替代。

当前需要长期同步的核心来源是：

- `PROJECT_BRIEF.md`；
- `PROGRAM_MAP.md`；
- `LITERATURE_MAP.md`；
- `PROBLEM_BACKLOG.md`；
- `OPERATIONS.md`；
- `sources/2026-07-30-adjacent-source-ledger.md`。

`operations/ASSET_PROTOCOL.md`、`operations/WEEKLY_ITERATION.md` 和 `review/PORTFOLIO_SELF_AUDIT.md` 是此前评审看到的冻结快照，保留用于审计，但不再作为当前规范。

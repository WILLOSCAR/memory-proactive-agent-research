# Memory / Proactive / Personalization Research

更新日期：2026-08-04

这是一个以论文产出为主、以 Auto Research 为执行方式的研究仓库。当前阶段从论文、benchmark 与真实 failure 中高速发现和证伪问题；暂不设置 Draft gate。

长期关注三条线：

1. AI Memory；
2. Proactive Agent；
3. Personalization。

每条线都包含通用 AI 与生理/行为数据设置。`3×2` 是资产索引，不是学术 ontology 或 idea 边界；六个分支都可独立、持续地产生多个 idea、评测、实验和论文。

## 日常入口

文件出现术语或结论冲突时，先看 [SOURCE_AUTHORITY.yaml](SOURCE_AUTHORITY.yaml) 的权威层级；低权威文件只用于审计，不得覆盖 canonical 定义。

| 文件 | 唯一职责 | 不应该放什么 |
| --- | --- | --- |
| [CONTEXT.md](CONTEXT.md) | Auto Research OS 的唯一术语词典与计数口径 | 页面实现、任务状态、研究结论 |
| [PROGRAM_MAP.md](PROGRAM_MAP.md) | 长期研究对象、3×2 索引、开放式评测轴 | 当前任务、运行日志 |
| [LITERATURE_MAP.md](LITERATURE_MAP.md) | 六个方向的论文簇、共同盲区、Idea Forest 与 cross-branch 组合 | 逐篇来源流水、card 实时状态 |
| [PROBLEM_BACKLOG.md](PROBLEM_BACKLOG.md) | 36 个候选、Top 12、问题定义、证据边界和初始路由 | card 实时列、周进度、长篇原始外部回答 |
| [research-index.yaml](research-index.yaml) | 稳定 ID、关系、五维状态、时间戳和指针的唯一结构化事实源 | 长篇叙事、聊天记录 |
| [research-events.jsonl](research-events.jsonl) | append-only Settlement 与 applied transition 历史 | 手工摘要、未生效建议 |
| [CURRENT.md](CURRENT.md) | 方便人阅读的当前摘要与执行车道 | 覆盖结构化索引、另建一套计数 |
| [OPERATIONS.md](OPERATIONS.md) | idea、实验、运行、评测与数据规则 | 研究方向判断、某周具体结果 |
| [GPT_PRO_REVIEW.md](GPT_PRO_REVIEW.md) | GPT Pro 建议与 Codex 的采纳/修改/拒绝 | 未经复核的新事实 |
| [sources/2026-07-30-adjacent-source-ledger.md](sources/2026-07-30-adjacent-source-ledger.md) | 已打开核验的原始论文、benchmark 与证据范围 | 本项目已复现论文或完成 novelty search 的暗示 |

系统自身的产品目标、Leader 体验、对象模型与验收基线见 [REQUIREMENTS_AUTO_RESEARCH_OS.md](REQUIREMENTS_AUTO_RESEARCH_OS.md)；它是设计约束，不是日常研究状态入口。

新发现先写入 backlog；状态和关系的实质变化通过 Settlement writer 同时更新 `research-index.yaml` 与 `research-events.jsonl`，不要手工分两次改。只有进入真实 Experiment/Run 才增加目录。

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
- 六条 Track 都保持可解释的信息流，但不要求同一深度或平均分配资源；
- 每条 Track 显式处于 `explore / validate / maintain / parked` 之一；只有 `explore` 可把“每周补充候选”当作 brainstorm heuristic，不作为组合健康硬指标；
- 每个候选必须有真实 failure、counterfactual、killer baseline、1–3 天 probe 和 kill/branch 条件；
- CPU/API 工作可以全线并行，单卡 smoke 串行；
- 每周至少 kill 或 branch 一个节点；
- `current ledger 未观察到直接覆盖` 不等于 `此前没有工作研究过`；
- prediction、acceptance、receptivity 和 causal treatment effect 不互相替代。

## 实验基础设施

| 文件 | 用途 |
| --- | --- |
| [templates/run-manifest.yaml](templates/run-manifest.yaml) | requested/allocated/actual resource、数据 digest 与 Artifact 指针 |

GPU 集群、SSH、存储与实例验收的具体 runbook 与命令生成脚本在本地维护，含环境相关信息，不纳入公开版本库。

卡量和队列会变化，不在研究文档里保存静态“空闲卡数”。每次实验都刷新资源，并以 Instance 内登录、`nvidia-smi` 和存储 probe 为准。

## 当前树

```text
memory-proactive-agent-research/
├── README.md
├── PROGRAM_MAP.md
├── LITERATURE_MAP.md
├── PROBLEM_BACKLOG.md
├── research-index.yaml              # 唯一结构化状态
├── research-events.jsonl            # append-only Settlement
├── dashboard/                       # 唯一浏览器 Control Plane
├── schemas/
│   └── research-index.schema.json
├── scripts/
│   └── settle-research-event.mjs    # 唯一状态写入口
├── tests/
│   └── settle-research-event.test.mjs
├── CURRENT.md
├── OPERATIONS.md
├── GPT_PRO_REVIEW.md
├── PROJECT_BRIEF.md                  # ChatGPT Project 简报
├── templates/
│   └── run-manifest.yaml
├── sources/
│   └── 2026-07-30-adjacent-source-ledger.md
├── review/                           # 外部评审转录与独立 verdict
├── operations/                       # 已冻结旧协议，不是日常入口
├── experiments/                      # 真正开始后才创建子目录
├── archive/                          # 已替代历史
└── artifacts/                        # 不可变导出包
```

（GPU runbook、命令生成脚本与 Bridge 审计目录含环境相关信息，在本地维护，不纳入公开版本库。）

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

## 浏览器 Control Plane

只读看板已合并到本仓库的 `dashboard/`。更新结构化状态后执行：

```bash
cd dashboard
npm run sync:data
npm test
```

浏览器数据由 `research-index.yaml + research-events.jsonl` 生成，不解析聊天记录，也不把 External Review、Experiment Spec 或 Source Paper 结果显示成本地实验结果。

## Settlement writer

先取得当前精确 revision，把它写入 typed event 的 `baseRevision`；再 dry-run，最后提交：

```bash
node scripts/settle-research-event.mjs --revision
node scripts/settle-research-event.mjs --event /absolute/path/to/event.json --dry-run
node scripts/settle-research-event.mjs --event /absolute/path/to/event.json
```

writer 只接受 stable-ID 路径上的 `add / replace / link / unlink`，拒绝过期 revision、重复 ID、不完整 Run Manifest、无 digest/Run 的 Artifact、本地结果伪链接、把 External Review 当 support，以及非法 Decision state。写入期间使用独占锁和 durable journal；若进程在两个文件替换之间中断，先执行：

```bash
node scripts/settle-research-event.mjs --recover
```

Dashboard sync 在 lock 或 pending journal 存在时会停止，避免读取半次 Settlement。成功提交后再到 `dashboard/` 执行 `npm run sync:data`。

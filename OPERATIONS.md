# Minimal Auto Research Operating System

更新日期：2026-07-30  
当前模式：高吞吐问题发现；暂不设置 Draft gate

目标是让 idea 生成足够激进，同时让每个研究判断都能被追溯、快速证伪和安全复用。管理系统不能比研究本身更重。

## 1. 两层资产流

### 发现层

```text
Source / Real Failure
  → Paper Radar
  → Eval Landscape
  → White-space Inbox
  → Problem Definition
  → Cheap Probe
  → Continue / Branch / Park / Kill
```

### 执行层

```text
Problem → Experiment → Run → Artifact → Decision
```

| 资产 | 负责回答 | 最小内容 |
| --- | --- | --- |
| Source | 原始证据是什么 | URL/version、核验范围、不可扩大解释的边界 |
| Idea/Problem | 为什么值得测 | failure、claim、counterfactual、killer baseline、kill rule |
| Experiment | 要操纵什么 | independent variable、held constants、metric、resource ceiling |
| Run | 实际执行了什么 | commit、data digest、model/prompt、actual resource、time、output |
| Artifact | 证据在哪里 | immutable URI、digest、format |
| Decision | 下一步是什么 | evidence pointer、continue/branch/park/kill |

当前不维护 Draft、论文结构或 claim-evidence 写作表。等问题通过 cheap probe、真正进入成稿期后再创建，不能用“开始写了”替代问题成立。

## 2. 文件边界

- `PROGRAM_MAP.md`：长期范围、3×2 资产索引和开放式评测轴；
- `LITERATURE_MAP.md`：论文簇、共同评测假设、coverage pressure 与 Idea Forest；
- `PROBLEM_BACKLOG.md`：问题定义、候选 atlas、证据边界和初始路由的 source of truth；
- `CURRENT.md`：card 实时 column、next action、blocker、当前 probe 队列和停止条件的唯一动态看板；
- `OPERATIONS.md`：资产、实验、运行与数据规则；
- `GPT_PRO_REVIEW.md`：外部模型原始建议的本地采纳/修改/拒绝；
- `sources/*ledger.md`：已经打开核验的原始论文、benchmark 与精确证据范围；
- `experiments/<id>/README.md`：真实开始后才创建的冻结实验设计；
- `experiments/<id>/runs/<run-id>/manifest.yaml`：一次执行的事实与结果指针。

不为每个 brainstorm、候选、论文或标签单独建文件。长版外部回答保存在 Bridge 审计目录，主文档只保留可执行索引。

## 3. 狂暴 idea 生成纪律

允许高数量，不允许低区分度：

1. 每个分支维护至少 6 个不同 failure family；
2. 每周每分支至少补充 3 个新候选；
3. 候选优先来自论文 limitation、benchmark 不可观察空间、指标代理错位和真实 failure；
4. 每个候选必须指出受害者/代价、评测单位、一个非默认动作和 no-action/alternative-action counterfactual；
5. 相同 `use/abstain/ask gate` 换领域名，不算新 idea；
6. 一周内无法形成 1–3 天 probe 的候选，必须写明数据/许可/ground-truth 解锁条件；
7. 每周至少 kill 或 branch 一个节点，防止只积累漂亮叙事。

候选数量没有硬上限；进入 `Problem Definition` 与 `Cheap Probe` 的 WIP 各不超过 6，以保证快速产生决策。

## 4. 快速验证阶梯

| Rung | 目标 | 默认规模 | 默认资源 | 升级门 |
| --- | --- | --- | --- | --- |
| -1 Paper/Eval audit | 找到真实 coverage 与不可观察空间 | 论文、代码、数据卡、benchmark protocol | CPU | 能写出 falsifiable failure，不夸大 novelty |
| 0 Problem definition | 冻结评测对象 | claim、unit、counterfactual、core table、kill rule | CPU | 有 1–3 天 probe 与 killer baseline |
| 1 Cheap probe | 判断 failure/headroom 是否存在 | 50–300 cases、oracle、强简单 baseline | CPU/API/最多 1 GPU | 证据能改变 continue/branch/park/kill |
| 2 Pilot | 验证泛化与关键消融 | 200–1,000 examples、2–3 seeds | 1–2×80G 或等价 API | 差异不是 token/call/model-size 造成 |
| 3 Light training | 只训练必要模块 | small gate/head 或 7B/8B LoRA | 2×A100/A800 80G | 方法变量独立成立 |
| 4 Confirmation | 主表与审稿压力测试 | full benchmark、≥3 seeds、≥2 model families | 2–4×80G | claim 与 evidence scope 已冻结 |

当前主要工作停留在 Rung -1 到 Rung 1。8 卡、32B、长序列 RL、大规模 wearable pretraining 和完整产品部署不是当前关键路径。

## 5. 1–2 周爆发循环

不强制按星期排程，每个候选独立跑：

```text
0–0.5 天  source/benchmark 核验 + killer baseline
0.5–1 天  evaluator / generator / oracle
1–3 天    cheap probe + error slices
立即       continue / branch / park / kill
```

一条线在等数据或 GPU 时，立刻回到 Paper Radar 扩散，不空等。六个分支都持续有信息增量，但不要求同一深度，也不按分支平均分 GPU。

## 6. 实验与运行规则

- Experiment design 与 Run execution 分离；
- 每次运行使用新的 `run_id`，原始输出不可覆盖；
- 一次实验只改变一个主要因素：data、prompt/policy、model size、optimization、memory representation 或 trigger/gate；
- 最强简单 baseline、oracle、预算匹配和错误分层先于复杂方法；
- `requested / queued / allocated / actual` 资源分开记录；只有实例内 `nvidia-smi` 才算 actual GPU；
- 跨 SSH 前记录 resolved host、remote identity、pool 和 mount probe；
- Spot/preemptible run 必须 checkpoint-resumable；抢占是 `failed/inconclusive`，不是 negative result；
- GPU 路径、启动命令与验收统一见 `infra/GPU_RUNBOOK.md`，动态卡量不得从旧文档复制。

结果语义只允许：

- `positive`：有效实验支持预注册 claim；
- `negative`：有效实验不支持 claim；
- `mixed`：不同切片方向不一致；
- `failed`：执行未完成；
- `invalid`：设计、泄漏或指标使结果不可用；
- `inconclusive`：证据不足。

## 7. 评测纪律

组件分数只用于 diagnosis。主评测至少回答：

- 评测单位是 item、decision、episode、trajectory、lifecycle 还是 user/deployment period；
- no-action 与 alternative-action 的结果是什么；
- 动作是否可逆，错误如何发现、撤回和补偿；
- 受害者是谁，miss/false/delay/interruption/privacy/authority/compute/repair 如何分开报告；
- 平均收益是否掩盖 worst-user、worst-slice 或高风险动作；
- 失败由 writer、memory、retrieval、reasoning、policy、tool 或 interface 哪一层造成；
- 当前动作是否改变未来反馈、依从性、缺失模式或用户行为。

早期可以 scalarize cost，但必须保留分量指标、cost sweep、risk–coverage/Pareto 和 longitudinal cumulative utility。

## 8. 数据与存储

- 数据 source of truth 使用 HDFS、对象存储或可复用云盘 URI；开发机目录只视为 cache；
- manifest 记录 `source_uri + snapshot_digest + split_digest`；
- 跨机房/SSH 使用前验证目标数据存在、digest 一致和路径可读；需要写入时做唯一临时探针；
- 不把“路径能看到”写成挂载验收，必须记录实际 mount/source；
- user-level、chronological 与 environment/device split 优先；
- 生理/用户数据记录 license/consent、允许用途、隐私边界和禁止声称的结论；
- intervention 数据没有 treatment assignment、availability、propensity 和 outcome 时，不得声称 causal effect。

## 9. 最小 Run manifest

唯一模板是 `templates/run-manifest.yaml`，至少包含：

- commit、dirty diff、环境、时间；
- data/split digest；
- model、prompt 和关键参数；
- requested 与 actual GPU/CPU/memory；
- SSH identity、pool、job/worker/instance、mount probe；
- exit code、wall time、output URI、artifact digest；
- hypothesis、metric、baseline、stop rule、结果语义和 decision。

自动采集失败写 `unknown: <reason>`，不得静默留空。

## 10. GPT Pro 与外部评审

- 先准备最小不可变 evidence bundle；
- 原始回答不可变保存，Codex verdict 单独记录；
- GPT Pro 的论文名、数字、Top score 和 novelty 判断都不是论文证据；
- 重要主张回到原始论文、代码、dataset card 或本项目 Run 核验；
- 同一问题没有新证据时不重复发问；
- Project Sources 是长期背景，Task Bundle 是单轮精确快照；
- 原始个人数据、凭据和未脱敏日志不得上传。

## 11. 文件创建门

只有发生以下事件才增加文件：

- 新 Experiment 真正开始；
- 新 Run 真正执行；
- 需要保存不可覆盖 Artifact；
- 一轮外部评审已经完成；
- 一个重要 decision 无法从 backlog 恢复。

其他变化更新现有入口，不扩张目录。

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

### 统一最小评测样例

所有 idea 的评测切片共享同一最小 schema（迁自执行看板，作为稳定规范固定在此）。每个候选按自身 failure family 只填相关字段，不要求填满：

```yaml
latent_state: {}
observations:
  available: []
  missing: []
  provenance: []
history:
  events: []
  updates: []
  revocations: []
available_information_actions: [retrieve, ask, verify, sense, wait]
available_intervention_actions: [silence, suggest, prepare, execute, withdraw, correct]
counterfactuals:
  no_action_outcome:
  alternative_action_outcomes:
cost_vector:
  miss:
  false_alarm:
  delay:
  interruption:
  privacy:
  authority:
  compute:
  repair:
attribution_labels:
  writer:
  memory:
  retrieval:
  reasoning:
  policy:
  tool:
  interface:
```

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

1. 每条 Track 持续维护足以避免过早收敛的不同 failure family；`6` 是 discovery 期启发式，不是永恒硬配额；
2. 每条 Track 显式标记 `explore / validate / maintain / parked`；只有 `explore` 模式把每周补充候选当作 brainstorm heuristic，组合健康不按候选数量判定；
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
- GPU 路径、启动命令与验收统一见本地 GPU runbook，动态卡量不得从旧文档复制。

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

## 12. 用户–Agent 研究交互 SOP

本项目默认使用聊天线程完成探索和执行，但线程不是长期记忆。每次产生会改变研究判断的增量后，Agent 在结束前完成一次 **Settlement**：

```yaml
research_event:
  event_id: EVT-<stable-id>
  batch_id: BATCH-<optional-shared-id>
  recorded_at: <iso-8601>
  actor: user | codex | tool
  base_revision: <canonical-revision>
  scope: PROGRAM | <track-id> | <candidate-id> | <experiment-spec-id> | <run-id>
  affected_entities: []
  changes: []  # typed create / replace / link / unlink operations
  narrative:
    changed: "本轮新增或修正了什么"
    why_it_matters: "它为什么改变研究组合、评测或论文机会"
  evidence_refs: []  # typed ref + relation + scope；External Review 只能 pressure
  decision_refs: []  # proposed / approved / applied 必须分开
  decision_needed_from_user: "没有则写 none"
  next_evidence:
    deliverable: "下一轮要产生什么"
    acceptance_test: "什么条件下算完成"
  blockers: []  # 每个 blocker 必须有 unlock condition
  outcome: material-change | no-material-change
```

执行原则：

- 用户可以只给 Program、Track 或 Candidate 级目标，不必为每个子问题手工创建独立线程；
- Agent 可在多个执行线程中研究，但必须回写到同一组 canonical 实体和稳定 ID；
- 只有影响 Claim、Evidence、Decision、Blocker 或 Next Action 的内容需要 Settlement；普通命令输出和逐日活动不入账；
- 一轮同时改变多个 Candidate 时分别结算，Leader Brief 再将同类变化压缩成 3–5 条解释性结论；
- Settlement 必须由唯一 close-out 工具保障；未来 `research-index.yaml` 与 append-only `research-events.jsonl` 由同一次原子写入更新，并以 `base_revision` 拒绝静默覆盖；
- Leader Brief 的候选选取、优先级、3–5 条上限和 pointer validation 使用确定性规则；LLM 只可润色表达，不得改变 evidence type 或创造 pointer；
- External Review 只记录 pressure；必须经过 Codex verdict 才能改变 Candidate；
- 看板从 Settlement 与 canonical 资产生成，不解析聊天记录、不依赖用户记住原线程；
- 用户保留 Kill / Split / Merge / 激活 Paper Project 等高影响研究决策权；Agent 可以提出建议并继续不依赖该决定的安全工作。

### 低依赖执行契约（默认自主，高影响才打扰）

SOP 的默认姿态是**低依赖**：不要求用户逐步确认，Agent 默认自主推进，只在真正改变研究命运的拐点才请用户拍板。

**Agent 默认自主（无需事先确认，事后在快照汇报）**：
- 为 probe-ready 候选搭 evaluator / killer baseline / oracle；
- 跑 overlap audit、paper 核验、数据构念检查；
- 设计并执行不花真实 GPU 的 cheap probe（CPU/API）；
- 把新增证据、状态变化、Settlement 回写 canonical 事实源（`research-index.yaml` 与相应 MD）。

**只有三类事必须先问用户（高影响闸门）**：
1. **kill / split / merge** 一个 Candidate；
2. 激活 **Paper Project**（从 Paper Opportunity 立项）；
3. 任何**花真实 GPU** 的 Run。

**打扰预算**：一轮交互最多向用户提 **1 个**高影响决策；其余高影响项打包进下一次进展快照，不逐条弹问。低影响事实、运行状态、blocker 由 Agent 自主维护。

**异步汇报面**：用户不在线时，Agent 继续做上面"默认自主"范围内的安全工作，产出累积到进展快照（如 `PROGRESS_SNAPSHOT_<date>.md`）。用户回来只需读快照 + 拍 1–2 个高影响决策，不必重开线程或逐个追问候选。

**证据纪律不因自主而放松**：自主推进产生的判断仍按证据级如实标注（unverified-lead / source-supported / inference / local-result）；GPT Pro 等 External Review 只作 pressure，必须经本地 verdict 才能改变 Candidate。自主 ≠ 降低证据门槛。

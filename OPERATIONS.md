# Minimal Auto Research Operating System

更新日期：2026-09-08
当前模式：判断驱动的问题发现与快速证伪；暂不设置 Draft gate

目标不是持续增加论文、摘要或 Idea，而是持续产生可追溯的**研究判断变化**：更快确认一个问题真实存在、更早推翻站不住的解释，并让存活 Candidate 拥有明确证据、研究增量和评测路径。Idea 生成可以激进，但管理系统不能比研究本身更重。

组织层级、Chat binding、Student WIP、用户自然语言编译、Handoff 与 Mentor 结算统一遵守 [`AUTO_RESEARCH_SOP.md`](AUTO_RESEARCH_SOP.md)。本文件只负责研究判断、证据、实验、运行与数据纪律；二者冲突时先按 [`CONTEXT.md`](CONTEXT.md) 对齐术语，再按各自职责处理。

## 1. 两层资产流

### 发现层

```text
Source / Real Failure
  → Paper Radar
  → Eval Landscape
  → White-space Inbox
  → Problem Definition
  → Cheap Probe
  → Continue / Split / Nest / Merge / Park / Kill
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
| Decision | 下一步是什么 | evidence pointer、continue/split/nest/merge/park/kill |

每个 Candidate 只有一条 canonical `Current Next Evidence`。Proposal、Candidate Reasoning、Leader Brief 和页面只能引用它；若需要改变，必须通过 Settlement 更新 Candidate，而不是在另一份叙事中覆盖。

当前不维护 Draft、论文结构或 claim-evidence 写作表。等问题通过 cheap probe、真正进入成稿期后再创建，不能用“开始写了”替代问题成立。

### 1.1 唯一研究进展单位：Judgment Delta

论文数量、Source 数量、Candidate 数量、文档完整度和页面完成度都不是研究进展。只有以下内容至少改变一项时，才算 material progress：

- 对问题是否真实、适用边界在哪里的判断；
- 对机制、因果解释或最危险替代解释的判断；
- 对 Claim 强度、证据范围或 novelty 边界的判断；
- 对 Candidate 的 Continue / Split / Nest / Merge / Park / Kill；
- 对下一条最有信息增益证据的选择。

每次 material change 必须能压缩为一个 `Judgment Delta`：

```yaml
judgment_delta:
  target: <paper | benchmark | gap | candidate | claim | experiment>
  before: "本轮开始前相信什么；不知道则明确写 unknown"
  trigger: "哪条新证据、反例、对照或失败触发更新"
  evidence_refs: []
  after: "现在相信什么；必须比 before 更窄、更清楚或被否定"
  confidence: <low | medium | high>
  alternatives_remaining: []
  falsifier: "下一条最可能推翻 after 的结果"
  consequence: "continue / narrow / split / nest / park / kill / no-change"
  next_evidence: "下一轮能改变 consequence 的最小证据"
```

如果一轮工作只有新增摘要、标签、候选组合或 Benchmark 名称，但 `before → after` 没有变化，则结算为 `no-material-change`。允许 no-change；禁止把它包装成研究进展。

### 1.2 重点 Source Paper 的证据审计合同

先区分两层事实：`Source Verification` 只说明论文身份、版本和本轮可见范围；`Paper Audit` 才说明内容已按 proof boundary 结构化审计。`verification=verified`、下载了 PDF 或打开了 full text 都不能自动计作 deeply reviewed。

每篇重点 Source Paper 必须回答下表，不能用摘要改写代替：

| 审计项 | 必须回答 | 不合格信号 |
| --- | --- | --- |
| 核心问题 | 它真正区分了哪两个状态、机制或决策 | 只复述标题任务 |
| 关键假设 | 方法与结论成立依赖哪些数据、模型、环境和用户假设 | 把设置当成自然事实 |
| 核心机制 | 哪个变量导致预期效果，哪些只是工程封装 | 把模块列表当贡献 |
| 证明边界 | 实验直接支持什么；哪些只是作者推断 | 用 conclusion 扩大结果范围 |
| Benchmark adequacy | 任务、split、指标能否观察 Claim | 只因榜单常用就采用 |
| 失败条件 | 在什么状态、任务、模型或成本约束下可能失效 | 只摘 limitation 原句 |
| 未解问题 | 是否影响主结果、是否未被其他工作解决、能否独立证伪 | limitation 自动升级 Candidate |
| 判断变化 | 它具体加强、削弱、收窄或推翻了本项目什么判断 | 只写“有启发” |

唯一模板是 [`templates/paper-audit.yaml`](templates/paper-audit.yaml)。记录写入 `Candidate Reasoning.paperBriefs` 或有稳定 ID 的 Research Review；不为每篇论文另建 Markdown 文件。论文审计状态分为：

- `inventory`：只有引用身份；
- `source-verified`：版本与访问范围已核验，尚无完整内容审计；
- `structured-audit`：核心字段与 proof boundary 已填，但可能仍是 abstract-only 或缺少 official assets；
- `deep-audit`：full-source / official assets 已核验，Contribution、Insight、Goal、Data、Training、Evaluation、Assumption、直接结果、unsupported inference、Benchmark adequacy、failure condition 与 Judgment Delta 均完整。

程序级 `200–300 篇`目标的唯一 numerator 是**去重后的 full-source deep-audit Source Paper**。以下都不得进入 numerator：indexed Source、`verification=verified`、abstract-only structured audit、重复服务多个 Candidate 的同一 Source、只有论文摘要或 GPT Pro 总结的记录。

旧 `paperBriefs` 若字段完整，只能派生为 `legacy structured audit`；在补齐明确的访问范围、版本和 deep-audit 字段并由本地 owner 复核前，不自动晋级。完成标准：另一名 Student 能从记录中区分“作者直接证明了什么、没有证明什么、为何改变本项目判断”，并能指出下一条 falsifier。

论文中的 limitation 只有同时通过四个 Gate 才能升级为研究问题：

1. **Consequence Gate**：它会改变任务结果、决策后果、风险或理论解释；
2. **Coverage Gate**：最近相关工作与强简单 baseline 尚未解决；
3. **Claim Gate**：能写成独立、可证伪、非纯工程的 Claim；
4. **Execution Gate**：存在可在 1–3 天内区分至少两个解释的 Probe。

未过 Gate 的 limitation 只能记为 pressure、工程待办或 future-work lead。

### 1.3 Problem Definition 必须先于 Method Idea

问题不能停留在“Memory 会错”“长期规划不好”“Teacher guidance 有害”。进入 `Problem Definition` 时必须冻结：

```yaml
problem_definition:
  failure_state: "在哪种可复现状态下失败"
  affected_outcome: "谁受影响，代价是什么"
  suspected_mechanism: "哪个机制变量可能导致失败"
  missing_observation: "现有指标为何看不到"
  factors_to_decouple: [A, B]
  competing_explanations: []
  separating_test: "哪种对照能区分解释"
  disconfirming_result: "什么结果否定问题或当前机制判断"
```

在 `failure_state`、`separating_test` 与 `disconfirming_result` 未明确前，不得进入方法设计。问题真实但机制未知时，优先形成 evaluation/analysis Candidate，而不是用复杂方法遮住未知机制。

### 1.4 Candidate 类型与组合 Gate

Candidate 必须标记主要研究增量类型：

- `problem`：发现现有任务没有正确建模的失败或状态；
- `method`：改变已确认 failure 的关键机制；
- `evaluation`：证明现有 Benchmark/指标无法区分关键能力；
- `analysis`：解释方法为何有效、失败或在何处反转；
- `system`：解决训练、推理、数据或部署中的真实约束；
- `application`：新场景产生了新的研究问题，而非只迁移已有能力。

多篇论文或多个机制的组合必须逐项回答：

1. 两者解决的是同一层问题、上下游问题，还是彼此冲突的问题；
2. 一个机制是否补另一个已证实的缺陷；
3. 组合后产生了哪个单独模块无法声称的新 Claim；
4. 增益能否通过消融归因，而不是更多参数、调用、token 或计算；
5. 若去掉任一模块结果不变，是否应判定为工程堆叠并 Kill 方法 Claim。

### 1.5 Claim-first 评测合同

禁止先列已有 Benchmark 再把 Candidate 填进去。每个 Probe 前先冻结：

```yaml
claim_test:
  falsifiable_claim: "若 X，在控制 Z 后，Y 应发生可测变化"
  observation_unit: <item | decision | episode | trajectory | lifecycle | user-period>
  observed_variables: []
  held_constant: []
  confounders: []
  strongest_baseline: "最可能使新方法没有必要的 baseline"
  dangerous_alternative: "即使结果为正也可能成立的解释"
  minimum_experiment: "1–3 天可完成的区分性实验"
  complete_experiment: "进入 Pilot/Confirmation 后的完整证据"
  failure_standard: "何种结果 narrow / split / park / kill"
```

Benchmark 审计必须判断：覆盖什么、遗漏什么、与 Claim 是否匹配、是否有 leakage/shortcut、指标是否奖励错误行为、需要何种 counterfactual case/split/过程指标/失败标签。至少区分最终任务成功、中间决策质量、长程状态演化、恢复、鲁棒性、泛化、成本、安全/权限、历史/用户状态使用，以及收益是否仅来自更强模型、更长推理或更多计算。

### 1.6 统一判断链

```text
论文理解
→ 方法与假设拆解
→ 证据与 Benchmark 审计
→ 失败模式发现
→ Problem Definition
→ competing explanations
→ Cheap Probe
→ Candidate 形成或淘汰
→ Claim 明确化
→ 完整评测设计
→ Result
→ Judgment Delta
```

每个阶段的完成条件是**产生下一阶段所需的新判断**，不是增加文本。Cheap Probe 可以首先形成 Benchmark、failure analysis 或反例；不要求过早包装成完整方法论文。

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
- `research-index.yaml`：稳定 ID、关系、六维状态、时间戳与指针的唯一结构化事实源；
- `research-events.jsonl`：Settlement 与 applied transition 的 append-only 历史；
- `CURRENT.md`：由结构化状态派生或人工维护的轻量可读摘要，不得覆盖结构化索引；
- `OPERATIONS.md`：资产、实验、运行与数据规则；
- `GPT_PRO_REVIEW.md`：外部模型原始建议的本地采纳/修改/拒绝；
- `sources/*ledger.md`：已经打开核验的原始论文、benchmark 与精确证据范围；
- `templates/paper-audit.yaml`：Source Verification 与 Paper Audit 的唯一字段模板；记录仍写入 structured index / Review，不逐篇创建文件；
- `experiments/<id>/README.md`：真实开始后才创建的冻结实验设计；
- `experiments/<id>/runs/<run-id>/manifest.yaml`：一次执行的事实与结果指针。
- `experiments/<id>/runs/<run-id>/RUN_REPORT.md`：一次 Run 的完整 scientific / failure report；
- `experiments/<id>/runs/<run-id>/archive-receipt.yaml`：逐 Run 不可覆盖发布、inventory 与 digest readback 回执；
- `experiments/<id>/REPORT.md`：多个 Run 的实验级综合，不替代逐 Run 报告。

不为每个 brainstorm、候选、论文或标签单独建文件。长版外部回答保存在 Bridge 审计目录，主文档只保留可执行索引。

## 3. 狂暴问题发现与候选解释纪律

允许广泛发散，但先扩散 failure、解释与评测空间，不以 Candidate 数量作为成果：

1. 每条 Track 持续维护足以避免过早收敛的不同 failure family；`6` 是 discovery 期启发式，不是永恒硬配额；
2. 每条 Track 显式标记 `explore / validate / maintain / parked`；只有 `explore` 模式把每周补充候选当作 brainstorm heuristic，组合健康不按候选数量判定；
3. 候选优先来自经过 Consequence/Coverage/Claim/Execution 四 Gate 的 failure、benchmark 不可观察空间、指标代理错位和真实 failure；论文 limitation 原句不能直接建卡；
4. 每个候选必须指出受害者/代价、评测单位、一个非默认动作和 no-action/alternative-action counterfactual；
5. 相同 `use/abstain/ask gate` 换领域名，不算新 idea；
6. 一周内无法形成 1–3 天 probe 的候选，必须写明数据/许可/ground-truth 解锁条件；
7. 每周必须至少产生一个可审计 Judgment Delta；若所有判断均未改变，应记录 no-change 和缺失证据，而不是强制制造新 Candidate；
8. 每周主动寻找至少一个能推翻当前优先 Candidate 的反例或 killer baseline，防止只积累漂亮叙事。

候选数量没有硬上限；进入 `Problem Definition` 与 `Cheap Probe` 的 WIP 各不超过 6，以保证快速产生决策。

## 4. 快速验证阶梯

资源要区分两个层级：**Student Lab allocation** 是一个 active Student 可跨 Idea/Cycle 复用的容量合格交互环境，默认 `4–8 GPU`，在严格容量预检与动态路由条件下允许 `2×H20` compact fallback；下表是**单个 Run 实际占用的 slice**。Lab 已分配多少卡不替代 scientific / validity / decision Gate，也不要求一个 Run 吃满整台机器。空余卡优先并行运行同一 Student 的 baseline、Idea Variant、evaluator 或下一条 Cheap Probe。

| Rung | 目标 | 默认规模 | 默认资源 | 升级门 |
| --- | --- | --- | --- | --- |
| -1 Paper/Eval audit | 找到真实 coverage 与不可观察空间 | 论文、代码、数据卡、benchmark protocol | 本地控制面可读 | 能写出 falsifiable failure，不夸大 novelty |
| 0 Problem definition | 冻结评测对象 | claim、unit、counterfactual、core table、kill rule | 本地控制面可写设计；不执行 Run | 有 1–3 天 probe 与 killer baseline |
| 1 Cheap probe | 判断 failure/headroom 是否存在 | 50–300 cases、oracle、强简单 baseline | 远端 Lab 容器 CPU/API 或 1 GPU slice | 证据能改变 continue/split/nest/merge/park/kill |
| 2 Pilot | 验证泛化与关键消融 | 200–1,000 examples、2–3 seeds | Lab 内 1–4 GPU，或等价 API | 差异不是 token/call/model-size 造成 |
| 3 Light training | 只训练必要模块 | small gate/head 或 7B/8B LoRA | Lab 内 2–8 GPU | 方法变量独立成立 |
| 4 Confirmation | 主表与审稿压力测试 | full benchmark、≥3 seeds、≥2 model families | Lab 内 4–8 GPU，或异步 Job | claim 与 evidence scope 已冻结 |

4–8 卡仍是 Student 的首选持续实验能力，不是强迫所有问题立刻 scale-up；2×H20 compact fallback 只在冻结 workload 的显存、吞吐/并行度、CPU/内存、存储与 survival 计划均满足时，替代“无合法 4 卡路线时空等”，不能自动支撑需要 4 路独立并发或更大训练规模的 Run。32B、长序列 RL、大规模 wearable pretraining 或单 Run 超过 8 卡仍必须由 Claim 和区分价值驱动，并优先进入可恢复 Job lane。

## 5. 1–2 周爆发循环

不强制按星期排程，每个候选独立跑：

```text
0–0.5 天  source/benchmark 核验 + killer baseline
0.5–1 天  evaluator / generator / oracle
1–3 天    cheap probe + error slices
立即       continue / split / nest / merge / park / kill
```

一个 Job 在排队或运行时，Student 继续在自己的交互 Lab 上推进另一条 in-Mission 分支；暂时尚未拿到 Lab 时，继续 Paper Radar、Benchmark/Claim 审计、竞争解释与 falsifier 设计、实现/静态检查、数据/evaluator/Run-Spec 准备，不空等；Claim-bearing CPU/API/GPU Probe 仍等待 verified 远端容器。各分支都持续有信息增量，但不要求同一深度，也不按分支平均分 GPU。

## 6. 实验与运行规则

- Experiment design 与 Run execution 分离；
- 每次运行使用新的 `run_id`，原始输出不可覆盖；
- 一次实验只改变一个主要因素：data、prompt/policy、model size、optimization、memory representation 或 trigger/gate；
- 最强简单 baseline、oracle、预算匹配和错误分层先于复杂方法；
- 每个 estimator / policy arm 必须冻结它实际消费的观测字段、禁止看到的字段、代码入口和 feature-use sanity check；名称叫 `engagement`、`memory`、`retrieval` 或 `oracle` 不代表实现真的使用了对应信息。正控必须检验该 arm 的目标机制，而不是由错误字段制造的退化或近似同义反复。若独立审计发现命名语义与代码数据流不一致，本 Run 为 `invalid / not-interpretable`，修正后使用新的 `run_id`，不得覆盖或直接 Settlement；
- 预注册的 eligibility、instrument-validity 与其他前置条件必须在执行代码中按 Spec 的**同一观测粒度**逐 item / topic / arm 强制执行，并保存逐单位原始判定量。逐 topic 的合取条件不能用 aggregate mean、总通过率或只用于报告的全局 Gate 替代；否则一个边界失败单位可能被平均值掩盖后污染 estimand 或触发错误 falsifier。每个此类 Gate 至少冻结一个“单单位失败但 aggregate 仍通过”的 regression fixture，并验证该单位确实被排除。若在执行前发现 Spec/code 不一致，先冻结修复后的新 source digest 并重新完成 controller source-lock；若在执行后才发现，保留原 Run 并标为 `invalid / not-interpretable`，用 fresh `run_id` 重跑，不得回写或重解释原结果；
- 多阶段 evaluator / qualifier / aggregator 流水线必须冻结每一阶段的 typed input/output 与一个**端到端组合 fixture**；各组件单独 PASS 不证明组合语义正确。组合 fixture 必须由真实 producer 代码或 producer-shaped schema capture 生成，再交给 consumer；手写 consumer fixture 不得凭空补出 producer 从未落盘的必需字段。每个 consumer-required 字段都要有 producer-emission assertion、缺失字段 fail-closed case 和一次实际入口 readback。跨 artifact 的 qualifier 或 promotion 证据还必须用 typed receipt 绑定它实际判断的上游 result digest、model/revision、split/topic-set digest、cluster-definition digest 与原始计数；调用方传入的裸 `p`、布尔标志、路径或文字声明不能替代该绑定。任一 digest、模型、split、cluster 或计数不匹配即 fail closed；“异质 topic 已确认”也必须来自预注册、匹配当前 topic-set 的 verification receipt，不能由 consumer 自报。统计 estimand（例如原始计数、exact-p、方向）必须与 instrument/mechanism/robustness/refusal 等资格 Gate 和最终 promotion Gate 分开计算：缺少或失败的 qualifier 要 fail closed 为 `significant-but-unqualified` 或等价显式状态，不能伪装成 non-significant，也不能绕过 Gate 进入跨模型/跨臂 promotion。组合 fixture 至少覆盖“统计显著但攻击者不稳健”“统计显著且机制由另一合法子型主导”“qualifier 缺失”“refusal contamination”，以及逐项篡改 model/result/split/cluster/count binding 的拒绝用例，并证明修复前后原始 estimand、falsifier 与 kill rule 不漂移。执行前发现组合缺口时保留旧 evaluator 作为 provenance、冻结新版本和 fixture 并重新做 controller source-lock；执行后发现则所有受影响的 promotion verdict 进入 `invalid / not-interpretable`，不能靠后处理改写；
- 名义上的 item/topic 数量只有在独立性假设可辩护时才能直接作为显著性检验的有效样本量。共享生成模板、同一结构骨架、同一机制标签或成组派生的样本必须冻结 cluster/provenance 标识，并把名义 `n`、cluster 数和每簇贡献分开报告；预注册的 item-level 主检验可以保留为 primary，但必须同时给出 cluster-aware permutation/sign/wild-bootstrap 或最坏情形有效样本量 breakdown sensitivity。若 cluster-aware 结论不稳健，Claim ceiling 必须显式限定，不能把名义 p-value 写成对伪重复稳健。对同一组 clustered topics 换多个模型只能回答模型特异性，不能自动修复共享设计单元的依赖；promotion 要么通过预注册的 cluster-aware Gate，要么由真正异质、独立构造的新 topic 复核。若这一发现改变尚未执行的 promotion rule、falsifier 或 expected outcome，先记录 Research Line Revision 并 supersede 旧 Run Spec；
- Agent / OPE / counterfactual 实验必须把四个 information set 分开冻结：行为策略或 logger 做决定时看到什么、deployable estimator 看到什么、oracle/recover arm 额外看到什么、evaluator 用什么 ground truth。检验 estimator 偏差时不得同时改变 policy 的 perception fidelity；检验 policy 是否拥有正确状态时不得把 estimator 的可观测性变化混入同一结论。若两者都可能驱动结果，先做正交 sweep 或一个只改变单一 information set 的 separating test，再解释 inversion、ranking 或 recovery；
- 跨 backend、provider、endpoint 或 model family 的比较不得共享一个不含模型身份的生成/评分缓存。Cache key 至少绑定 backend/provider、model 或 endpoint revision、prompt version、decoding parameters 与输入/场景 digest；每个比较臂在解释前必须保存 cache hit/miss 与真实模型调用 provenance。若某一臂命中了另一模型的缓存，该臂为 `invalid / not-interpretable`，保留原始 Run，并用 fresh `run_id`、隔离 cache 和 source-locked 修复重新执行；
- External provider binding 与 Endpoint 都是动态路由，不是模型身份。默认复用已配置的 ModelHub binding；Agent 没有创建或部署 Ark Endpoint 的权限，只有 User/PI 提供的 Endpoint ID 才能进入候选资源。每个 API Run 在调用前用 `templates/external-service-receipt.json` 冻结 resource kind、实际 provider/model/revision/region（适用时）、non-secret Base URL origin、client transport、resolve time、raw receipt digest 与退役表检查；provider 名称、Endpoint `Running`、历史解析或代码里的字符串都不能替代该回执，用户退役资源即使仍在线也不得进入新 Run。Claim-bearing API 调用仍必须从 verified remote Lab/Job container 发起；ModelHub 不是本地执行豁免；
- Claim-bearing API/model Run 必须把可重试网络故障与科学结果分开：只对连接关闭、超时、限流和明确的临时服务错误做有上限的重试、抖动退避与缓存/checkpoint 续跑；认证、输入、schema 和确定性模型错误立即失败。每次 terminal attempt 都保留 stdout/stderr、退出状态、已落盘 cache/checkpoint 和独立 `run_id`；重试不得覆盖失败尝试，也不得把 `RemoteDisconnected`、transport timeout 或 API 暂时不可用解释成 negative result。Run package 还要记录 retry policy、attempt 数与恢复点，且不得输出凭据；
- 预注册的 `k/n` 阈值、差值 Gate 和 kill rule 必须从逐样本原始计数或未舍入统计量计算；四舍五入只用于展示，不能回流到判定。每个判定器至少保存分子/分母，并为“恰好等于阈值”的边界样例做 regression check，避免 `0.833` 与 `5/6` 这类表示误差改变 scientific outcome；
- 若实验通过人工标签、分层采样、平衡设计或生成 Prompt 引入控制变量，并用 raw correlation、均值差或聚合指标判断“机制消失 / 偏差被移除”，必须同时保存该控制变量、它与目标变量的关联、控制后的 conditional/partial estimand，以及新旧效应差异的不确定性。`CI includes 0` 只能说明当前设计不能排除 0，不能单独证明 null；被平衡控制变量稀释的 raw effect 不能直接解释成原效应完全由数据构造造成。若某一统计量只被预注册为 validity/rejection Gate 的组成部分，Gate 失败后不得把该统计量反向升级成 confirmatory Claim；只能标为 exploratory diagnostic，或用 fresh `run_id` 预注册为独立 estimand 后再验证；
- **Container-first**：每个 Claim-bearing Run 必须声明 `interactive-lab` 或 `batch-job` lane；CPU/API 只是容器内的执行方式，不是独立 lane。前者记录 Student Lab/Worker、container 与 GPU slice，后者记录 Job/Trial/Instance，并都指向同一 owning Student；
- 本地 Mac 只执行阅读、编辑、静态检查、打包和非 Claim-bearing smoke；本地产物不得写成 Evidence、不得支持 Stage Settlement，也不得升级为 `local-verified`；
- 对已归档 Run/result/cache 做 join、计数、相关性、重评分、切片比较或任何会产出**新数值/新 verdict/新排除结论**的操作，仍是 Claim-bearing evaluator Run，必须在当前 verified 远端容器内以 fresh `run_id` 执行并形成 manifest、命令、原始输出、terminal、digest 与 archive receipt。`source-supported`、`container-free`、`over archived bytes`、`not a Local Result` 等文字不能把本地重算降级成阅读；本地只能提出分析候选、冻结 evaluator/Run-Spec 和做不会生成研究结论的静态 fixture。若本地重算已被写入 Cycle/WORKSPACE/ledger，保留其字节为 provenance，立即将当前引用降级为 `unverified-local-analysis-candidate`，撤销其对 Stage Settlement/Claim 的支撑，再由 fresh container Run 验证；不得删除历史或用措辞把它追认成 Evidence；
- Student Lab 跨 Idea Variant、Run、Stage Settlement、Cycle 与 coding-agent session 复用；一个 Run 的终态不触发 Lab 释放；
- `requested / queued / allocated / verified / actual` 资源分开记录；只有实例内 `hostname + whoami + nvidia-smi + remote repo + storage` 验收通过才允许 Run，只有实例内 `nvidia-smi` 才算 actual GPU；
- `verified` 与 `survival-gated` 分开：开发资源 Worker 验收后先按 live Watchdog 规则启动真实有用 GPU workload，当前 Program survival target 是监控口径下 Worker SM `>30%`；达到它只证明 lease 暂时能活，不形成 Evidence。模型驻留、VRAM、PID/端口、CPU/API 与 synthetic burn 均不能替代 SM；若没有合法 workload 能达标，先 checkpoint/归档复用资产，再 drain、释放或把平台回收记为基础设施终态；
- Watchdog 规则是动态外部约束。每个受其约束的 Run/Lab 必须记录 live rule URL、rule ID/version、metric/聚合口径、比较符、告警/查杀窗口、核验时间、观察到的 SM 和 warning/reclaim event；旧规则、旧通知和“确认并屏蔽”不得推导为当前豁免；
- 跨 SSH 前记录 resolved host、remote identity、pool、remote repository path 和 mount probe；API client 也从该远端容器发起；
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
- dataset、model、environment archive 与 checkpoint 都按稳定 asset ID/version 管理，并保存 URI、inventory、总字节、digest 和 CUDA/Python 等 compatibility metadata；HDFS 是跨 Worker/机房的 immutable 分发/归档层，HL ByteNAS `003` 是经显式挂载验收后的高吞吐复用工作集，LQ 系统盘只是当前 Worker 的 bounded working set；
- replacement 迁移必须 copy-first：在新 Worker 重新验收 mount source/权限、逐项 digest、环境兼容、真实 data/model/CUDA load 和 survival gate 后才切换指针；失败时保留源，不先删旧 cache，不重复下载已有可验证资产；
- 跨机房/SSH 使用前验证目标数据存在、digest 一致和路径可读；需要写入时做唯一临时探针；
- 不把“路径能看到”写成挂载验收，必须记录实际 mount/source；
- user-level、chronological 与 environment/device split 优先；
- 生理/用户数据记录 license/consent、允许用途、隐私边界和禁止声称的结论；
- intervention 数据没有 treatment assignment、availability、propensity 和 outcome 时，不得声称 causal effect。

## 9. Run manifest、逐 Run 报告与归档回执

唯一模板是 `templates/run-manifest.yaml`，至少包含：

- commit、dirty diff、环境、时间；
- data/split digest；
- model、prompt 和关键参数；
- requested 与 actual GPU/CPU/memory；
- SSH identity、pool、job/worker/instance、mount probe；
- Watchdog applicability、live rule/version、survival target、observed SM/window、useful workload pointer 与 warning/reclaim event；
- reusable dataset/model/environment/checkpoint 的 asset ID、URI、inventory/digest、compatibility 与真实 load gate；
- exit code、wall time、output URI、artifact digest；
- hypothesis、metric、baseline、stop rule、结果语义和 decision。

自动采集失败写 `unknown: <reason>`，不得静默留空。

每个真正执行的 Run 还必须使用 [`templates/run-report.md`](templates/run-report.md) 形成 `RUN_REPORT.md`；成功、negative、failed、invalid 与 inconclusive 一律保留。报告至少包含 Proposal/reproduction target、相对 baseline 的唯一变化、exact command、expected vs observed、结果语义、failure class、根因、限制、适用/不适用条件、Artifact、建议 Decision 与下一证据。

归档使用 [`templates/archive-receipt.yaml`](templates/archive-receipt.yaml)。五种状态必须正交记录：

| 维度 | 允许状态 | 证明什么 |
| --- | --- | --- |
| execution | requested / queued / running / completed / failed / cancelled | 进程与基础设施发生了什么 |
| scientific outcome | positive / negative / mixed / inconclusive / not-interpretable | 有效设计支持什么 |
| reproduction outcome | not-applicable / pipeline-smoke / reproduced / partial-reproduction / mismatch | 与目标论文及复现范围是否一致 |
| archive | local-draft / local-verified / published / archive-verified / superseded | package 是否耐久、不可覆盖且 readback 一致 |
| Mentor settlement | unreviewed / mentor-accepted / mentor-rejected / settled | scientific owner 是否复核并进入 canonical Decision |

一个 Run 可以 `execution=failed` 且 `archive=archive-verified`，也可以 `execution=completed` 但 `scientific outcome=not-interpretable`。只有 `archive=archive-verified` 的 digest-bearing Artifact 才可设置 `valid=true` 并支持 Local Result；只有 Mentor settlement 后才改变 Candidate。批次级 report/receipt 只覆盖其中显式枚举的 Run，不能替未列出的 Run 自动补齐逐 Run closure。

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

## 12. Stage Settlement 与 canonical Research Settlement

用户自然语言、角色、Chat、WIP、授权与 Handoff 由 [`AUTO_RESEARCH_SOP.md`](AUTO_RESEARCH_SOP.md) 管理。active Cycle 的每个 Research Round 先把 `before → evidence → after → consequence → Next Evidence` 追加为 **Stage Settlement**，随后继续下一分支；它只更新 Student working state，不写 canonical event。

只有条件 Handoff 经 Mentor review 接受后，唯一 close-out writer 才完成 **canonical Research Settlement**：

事件必须从 [`templates/research-event.json`](templates/research-event.json) 创建，并使用 writer 实际接受的 camelCase 字段：`id`、`timestamp`、`actor`、`type`、`baseRevision`、`affectedEntityIds`、`changes`、`nextEvidenceAcceptance` 与 `outcome: material-change`。这是可执行合同，不另维护一份不同命名的示意 schema。

`no-material-change` 保留在 Round/Cycle/Handoff；当前 writer 不接受空变更事件，不把它伪造成 canonical Settlement。

执行原则：

- 用户可以只给 Program、Track 或 Candidate 级目标，不必为每个子问题手工创建独立线程；
- Agent 可在多个执行线程中研究，但必须回写到同一组 canonical 实体和稳定 ID；
- 只有影响 Claim、Evidence、Decision、Blocker 或 Next Action 的内容需要 Settlement；普通命令输出和逐日活动不入账；
- 一个原子判断可以用一个 multi-change event 同时更新多个相关实体；互不相关的判断分别结算，Leader Brief 再将同类变化压缩成 3–5 条解释性结论；
- Candidate Reasoning 只能归属于该 Candidate；未完成的 assumption / failure / mechanism / evaluation 保持 unsettled，不用精选 narrative 或自动补写隐藏缺口；
- Settlement 必须由唯一 close-out 工具保障；`scripts/settle-research-event.mjs` 使用 exact `baseRevision`、独占锁与 durable journal 同步更新 `research-index.yaml` 和 append-only `research-events.jsonl`，拒绝静默覆盖；中断后必须 `--recover`，Dashboard sync 在 lock/journal 存在时拒绝读取；
- Leader Brief 的候选选取、优先级、3–5 条上限和 pointer validation 使用确定性规则；LLM 只可润色表达，不得改变 evidence type 或创造 pointer；
- External Review 只记录 pressure；必须经过 Codex verdict 才能改变 Candidate；
- 看板从 Settlement 与 canonical 资产生成，不解析聊天记录、不依赖用户记住原线程；
- 高影响动作和用户授权边界以 `AUTO_RESEARCH_SOP.md` 的“高影响授权”为唯一来源；Agent 可以提出建议并继续不依赖该决定的安全工作。

### Evidence-preserving autonomy

在 `AUTO_RESEARCH_SOP.md` 已授权的 scope 内，Agent 可自主完成 primary-source 核验、overlap audit 和本地控制面上的阅读、编辑、静态检查与非证据 smoke。Program standing Container-first authorization 要求每个 active Student 在 Claim-bearing 执行前自主恢复或申请并维护至多一台容量合格的远端容器 Student Lab：4–8 GPU 为默认目标，满足动态路由和容量预检的 2×H20 为 compact fallback；evaluator / killer baseline / oracle、CPU/API Probe、推理和训练都在实时 SSH/GPU/存储验收与唯一输出路径成立后从该容器运行。Lab 内切换 Idea 或 GPU slice 不需要逐次询问。第二台 Lab、单台超过 8 卡、未授权存储或其他资源扩张仍需新授权。自主推进不降低证据门槛：结果仍按 unverified-lead / source-supported / inference / local-result 标注，External Review 只作 pressure，canonical 变化仍必须经过本地 verdict 与唯一 Settlement writer。

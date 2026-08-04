# Auto Research Asset Protocol

状态：**frozen legacy / superseded**
更新日期：2026-07-30

> 本文件保留用于历史审计，不再定义 canonical ontology。`Idea / Claim / 可投稿命题型 Track` 等旧术语已由 [../CONTEXT.md](../CONTEXT.md)、[../REQUIREMENTS_AUTO_RESEARCH_OS.md](../REQUIREMENTS_AUTO_RESEARCH_OS.md) 与 [../OPERATIONS.md](../OPERATIONS.md) 上位替代；权威层级见 [../SOURCE_AUTHORITY.yaml](../SOURCE_AUTHORITY.yaml)。

## 1. 目标

这套规范不是“把文件放整齐”，而是让每个论文主张、实验、运行和决策形成可审计谱系。数周后必须能回答：

1. 当时研究的可证伪主张是什么；
2. 为什么做这个实验，什么结果会改变决策；
3. 实际运行了哪份代码、数据、Prompt、模型和资源；
4. 原始产物在哪里，是否完整且未被覆盖；
5. 结果是 positive、negative、failed 还是 invalid；
6. 哪条证据支持或反驳论文中的哪句话；
7. 为什么 continue、branch、park 或 kill；
8. 哪些资产可以被其他论文线安全复用。

## 2. Canonical entities

| Entity | 含义 | 可变性 |
| --- | --- | --- |
| Source | 论文、数据集、官方文档、原始访谈或外部证据 | 原始快照不可变；ledger 可追加 |
| Idea | 尚未承诺资源的研究假设 | 可演化，必须保留历史 |
| Track | 一个可投稿、可证伪的论文命题 | claim 可版本化，不覆盖旧版 |
| Experiment | 为改变一个研究决策而设计的比较 | 设计冻结后只追加 amendment |
| Run | Experiment 的一次实际执行 | manifest 与原始输出不可变 |
| Artifact | 数据快照、Prompt、checkpoint、日志、指标、图表 | 内容寻址或带 digest，不覆盖 |
| Claim | 论文中可被证据支持/反驳的陈述 | 每版映射到 evidence |
| Decision | continue / branch / park / kill 及其理由 | append-only |
| Product | UbiComp/HCI 的产品、系统或研究载体 | 与 paper track 分账 |

`Paper` 是 Claim、Track、Evidence 与写作资产的一个发布视图，不是绕过上述谱系的新源头。

## 3. ID 与谱系

建议 ID：

```text
source_id:      S-20260730-metamem
idea_id:        I-MAI-meta-memory-001
track_id:       M-AI-meta-memory
experiment_id:  M-AI-meta-memory-E001
run_id:         M-AI-meta-memory-E001-r001
artifact_id:    A-<sha12>
claim_id:       C-M-AI-meta-memory-001-v001
decision_id:    D-2026W31-M-AI-meta-memory-001
product_id:     PRD-smartwatch-opportunity
```

Canonical lineage：

```text
Source
  ↓
Idea
  ↓
Track ───────────────→ Claim
  ↓                     ↑
Experiment → Run → Artifact / Metric
  ↓                     │
Decision ───────────────┘

Product ──links-to── Track / Experiment
```

强制不变量：

- 一个 Track / Experiment 只能有一个 `primary_branch`；
- `general` 与 `physiological` 由 branch ID 决定，不能只写在标题里；
- 一个 Experiment 可有多个 Run；不得用新 Run 覆盖旧结果；
- 一个 Claim 必须指向具体 Run/Artifact，或标记 `unsupported`；
- 一个 Decision 必须指向它看到的 evidence snapshot；
- “最新版”不是合法依赖，必须写版本、commit 或 digest。

## 4. 目录结构

```text
memory-proactive-agent-research/
├── PROJECT_BRIEF.md
├── PROGRAM_MAP.md
├── tracks/
├── products/
│   └── <product-id>/
├── ideas/
│   └── <idea-id>.md
├── sources/
│   ├── <date>-source-ledger.md
│   ├── papers/<source-id>.md
│   └── snapshots/<source-id>/<digest>/
├── experiments/
│   └── <track-id>/<experiment-id>/
│       ├── README.md
│       ├── experiment.yaml
│       ├── amendments/
│       └── runs/
│           └── <run-id>/
│               ├── run.yaml
│               ├── config/
│               ├── prompts/
│               ├── logs/
│               ├── raw/
│               ├── metrics/
│               └── analysis.md
├── claims/
│   └── <track-id>/claim-evidence.md
├── decisions/
│   └── <year>-W<week>.md
├── weekly/
├── shared/
├── templates/
├── operations/
└── archive/
```

`shared/` 不是隐式运行时依赖。实验可以：

- 引用带 commit/digest 的共享资产；
- 或复制一份到 Run 目录冻结。

不得依赖持续变化的 `shared/latest`。

## 5. 状态机

### Idea

```text
inbox → scoped → queued → running → evidence → paper-track
                           ↘ parked
                           ↘ killed
```

### Experiment

```text
planned → smoke → pilot → confirm → complete
                    ↘ failed
                    ↘ invalid
```

### Result semantics

- `positive`：有效实验支持预注册方向；
- `negative`：有效完成，但假设未被支持；
- `mixed`：不同条件或指标结论不一致；
- `failed`：基础设施/代码未完成研究检验；
- `invalid`：泄漏、数据错误、评测错误或设计缺陷使结果不可用；
- `inconclusive`：设计有效，但统计功效或覆盖不足。

这些状态不能互相替代。`negative` 不是 `failed`，`failed` 也不能被写成“方法无效”。

## 6. Experiment 与 Run 分离

### Experiment design 必填

```yaml
identity:
  experiment_id:
  track_id:
  primary_branch: M-AI | M-PHY | P-AI | P-PHY | U-AI | U-PHY
  secondary_tags: []
  contribution_route: ai-method | ai-benchmark | ai-analysis | ubicomp-system | hci-interaction | product-only
  parent_experiment: not_applicable
  owner:
  created_at:

hypothesis:
  claim_id:
  claim:
  falsification_condition:
  decision_if_positive:
  decision_if_negative:
  decision_if_inconclusive:

comparison:
  independent_variable:
  held_constant:
  baseline_ids:
  oracle:
  primary_metric:
  stopping_rule:

data_plan:
  source_uri:
  license_or_consent:
  split_policy:
  leakage_checks:

resource_ceiling:
  max_gpu_type:
  max_gpu_count:
  max_gpu_hours:
  max_wall_time:
```

### 每个 Run 必填

使用 `templates/run-manifest.yaml`。Run 必须记录“实际值”，不能只复制申请值：

- code commit 与 dirty diff；
- data URI、snapshot digest、split digest；
- Prompt、模型、checkpoint、tokenizer；
- 完整参数、seed、解码与评测器版本；
- requested 与 actual GPU/CPU/memory；
- resolved SSH host、remote identity、pool、Job/Worker/Instance；
- storage source URI、cache path、mount probe；
- 开始/结束时间、退出码、wall time、GPU-hours；
- raw/log/metrics/checkpoint 的路径与 digest。

`not_applicable` 必须显式填写，不得通过删除字段隐藏缺失。

## 7. Claim–Evidence ledger

每个 Track 维护 `claims/<track-id>/claim-evidence.md`，从 `templates/claim-evidence.md` 创建。

每个 Claim 至少记录：

- 精确文本与版本；
- 贡献类型和适用范围；
- supporting / contradicting / unresolved evidence；
- 对应 Experiment、Run、Artifact；
- 最强 baseline 和是否预算匹配；
- 已知限制、统计边界、外部有效性；
- 当前状态：`unsupported | preliminary | supported | contradicted | retired`。

论文中的主表、摘要数字和关键定性结论必须能反查到 Run。只有截图、聊天结论或手工复制数字，不算完成证据链。

## 8. Source of truth 与可移植性

不同 SSH、机房、资源池和云盘不能假设互通：

- 数据 source of truth 使用 HDFS、对象存储或带 digest 的可访问 URI；
- 本地与网络存储/云盘目录默认是 cache，除非另有声明；
- manifest 同时记录 source URI、cache path 与 snapshot digest；
- 运行前验证 resolved host、remote identity、GPU、mount 与读写；
- 运行后将 config、日志、指标和 checkpoint 同步回 source-of-truth；
- 临时机器上的唯一 checkpoint 必须在释放资源前上传；
- 跨环境复现首先验证数据可达性，不把“同一路径字符串”当作同一份数据。

区分两种复现：

1. **Exact run reproduction**：相同代码、数据、参数、环境和 seed；
2. **Decision reproduction**：证据足以独立重做 continue/kill 判断。

短周期 Auto Research 至少必须满足第二种。

## 9. Prompt、代码与工具

Prompt 使用不可变版本：

```text
<task>-v001.md
<task>-v002.md
```

每次修改记录：

- 修改目的；
- 与上版的语义差异；
- 预期影响；
- 使用它的 Experiment / Run；
- 若由外部模型生成，记录来源会话与人工核验。

代码和工具记录 commit SHA。聊天中的临时命令必须沉淀为脚本、Run manifest 或操作记录，不能把聊天当唯一资产。

## 10. 生理数据、隐私与研究治理

涉及 IMU、PPG、ECG、HRV、EDA、睡眠、位置、音视频、健康标签或用户轨迹时，额外记录：

- 数据许可、consent、用途和保留期限；
- participant / user-level split；
- 去标识化、访问控制与删除流程；
- label 的医学/行为含义与不确定性；
- 设备、佩戴、缺失和 calibration；
- 是否涉及临床主张、干预或安全升级；
- 伦理/审批边界与不得声称的结论。

原始个人数据、凭据、cookie、内部 token 和未脱敏日志不得进入 Git、ChatGPT Project Sources 或 Task Bundle。

## 11. ChatGPT Project / GPT Pro Bridge 资产

- Project Sources：只放稳定、跨会话复用的 brief、地图、规范和来源账本；
- Task Bundle：保存本轮评审看到的不可变证据快照；
- GPT 原始回答与 Codex verdict 分开保存；
- 所有采纳建议必须在本地 verdict 中标记 `accepted / modified / rejected / unverified`；
- 外部模型给出的论文、数字和 novelty 结论在原始来源核验前均为 `unverified`；
- Project Source 使用 digest-bearing 文件名，默认 append-only，不删除用户管理的文件。

## 12. Quality gates

### Pre-run gate

- claim、falsification、baseline、metric、stop rule 已冻结；
- 数据许可、split 与 leakage check 可执行；
- 资源 ceiling 已写；
- resolved SSH / storage / GPU 探针通过；
- Run manifest 已生成。

### Post-run gate

- exit status 与完整性明确；
- raw、log、metrics、checkpoint 已同步并有 digest；
- requested/actual 资源已区分；
- 结果状态语义正确；
- analysis 同时写支持、反例、混杂与下一决策。

### Weekly gate

- 六个分支各有一个可复核版本，不要求都训练；
- 新来源、claim 变化和负结果已入账；
- heavy GPU queue 只保留通过 pilot 的实验；
- continue / branch / park / kill 有 evidence pointer；
- 生成可从零恢复的 handoff。

### Paper gate

- 每条核心 Claim 都有 claim-evidence 条目；
- 最强 baseline、关键消融和预算匹配已完成；
- 所有数字可反查 Run；
- 相关工作、限制、伦理与数据许可已核验；
- 任何无法复现或未核验内容均未写成事实。

## 13. Archive 与保留

- 不删除负结果或失败 Run 来保持目录“整洁”；
- mutable index 可以重建，immutable artifact 不覆盖；
- superseded Track/Claim 移入 archive 前保留替代关系；
- 临时缓存可删除，但先验证 source of truth 和 digest；
- 每次清理记录范围、理由和仍可恢复的位置。

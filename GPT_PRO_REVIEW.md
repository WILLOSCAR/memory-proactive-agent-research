# GPT Pro Reviews and Local Decisions

更新日期：2026-07-31  
用途：只记录外部评审对本地研究树的影响；GPT Pro 不是论文证据

## 1. 三轮评审

| Round | 任务 | 主要产物 |
| --- | --- | --- |
| Portfolio review | 压力测试 3×2、资源和资产规范 | 3×2 适合运营，不是 ontology；Physiological 不是免费 novelty |
| Aggressive problem/evaluation brainstorm | 推翻过早收敛，扩散问题与评测空间 | P1–P6 降级为 seeds；12 轴评测 grammar；36 个候选；Top 12；cheap-probe queue |
| Six-branch literature adversarial audit | 用新增 2025–2026 论文反压 cluster 与 Top candidates | C02/C08 broad framing 终止并分叉；C14/C15 降为 nested slices；C25 收窄；C28 保持强 opportunity |

后两轮都使用 ChatGPT Project `Auto Research`、Pro 模型和不可变 evidence bundle。外部原文/结构化转录与独立本地 verdict 分开保存，不把 GPT Pro 当作论文证据。

## 2. 第二轮最重要的反驳

1. **3×2 只能做 routing/index。**  
   它不能决定学术白空间；科学对象应提升为“变化环境中的长期 Agent 决策”。

2. **P1–P6 是带方法偏置的 paper seeds。**  
   calibration gate、authority gate、selective adapter、multi-timescale memory 等都把答案提前写进问题。

3. **单个 decision point 不足以评长期 Agent。**  
   需要 decision、episode、trajectory、lifecycle/deployment 三层以上单位，才能观察 correction debt、revocation residue、habituation 和 policy-induced feedback。

4. **非默认动作与 repair 被低估。**  
   wait、monitor、withdraw、correct、undo、compensate 与首次 act/silent 同等重要。

5. **组件 proxy 经常错位。**  
   retrieval recall、trigger F1、acceptance、receptivity、personalized gain、outcome prediction 都不自动等于增量帮助或 causal effect。

6. **Physiological 更像一组 evaluation stressors。**  
   missingness、个人 baseline、device drift、intervention outcome、privacy 与 sensing budget 可以跨场景迁移。

## 3. 本地采纳、修改与拒绝

| GPT Pro 建议 | 本地决定 | 原因 |
| --- | --- | --- |
| P1–P6 降级为 seeds | 采纳 | 避免六条线被一个过早方法假设锁死 |
| 3×2 仅作资产索引 | 采纳 | 保留稳定归档，同时开放跨轴 discovery |
| 使用 12 轴 Agent-in-Flux grammar | 修改后采纳 | 采用轴和问题生成方式，不把 AFEL 缩写包装成项目 novelty |
| 36 个候选全部进入 atlas | 采纳为 radar | 是搜索空间，不是 36 个已立项论文 |
| Top 12 scorecard | 只作排序线索 | 分数是外部模型主观判断，不是 novelty/feasibility 证据 |
| C01/C03/C13/C25/C23 立即 cheap probe | 采纳 | CPU/API 即可快速改变决策 |
| C15 作为核心方向 | 采纳但排在 C13 action ontology 后 | 先统一 action/repair 表达，避免重复造数据 |
| C31/C08 单卡 smoke | 条件采纳 | 先完成 public data/metadata 对齐；synthetic 只证明 possibility |
| C19 causal line | 只采纳 audit | 缺 assignment、availability、propensity、outcome 时不得做 causal claim |
| C23 closed-loop SCM | 采纳 diagnosis | 模拟只证明 proxy/ranking reversal，不能证明真实干预有效 |
| C04 household identity | 暂缓 | 先查 C26、shared memory、household assistant 的 novelty overlap |
| 六线各做 7B LoRA | 拒绝 | 当前信息增益远低于 evaluator、oracle 和 cheap probe |

## 4. 当前本地 shortlist

| Branch | 主候选 | 立即回答的问题 |
| --- | --- | --- |
| M-AI | C01 / C03 | lifecycle failure 是否稳定；revocation residue 是否超出简单 purge |
| M-PHY | C08 | missingness 下 ask/wait/sense 是否超出 uncertainty threshold |
| P-AI | C13 / C15 | 多动作是否可辨；行动后 repair 是否构成独立 failure |
| P-PHY | C23 | predictive proxy 是否在闭环条件下反转 policy 排名 |
| U-AI | C25 | role/context/time conflict 是否超出 latest/role filter |
| U-PHY | C31 | attribution 是否比 change detection 多出可测 headroom |

这不是最终论文组合。先通过 cheap probe 的节点继续；失败节点 branch 或 kill，同一分支立刻回到 atlas 扩散。

## 5. GPT Pro 回答的局限

- 没有运行 benchmark、代码或本项目实验；
- 36 个候选的“当前工作未覆盖”大多仍是待检索假设；
- Top 12 数值没有统计或 empirical 意义；
- C04/C26、C02/C05、C08/C21、C23/C29 等可能高度重叠；
- synthetic SCM、synthetic drift 与 synthetic lifecycle 只能建立受控 failure，不自动建立真实外部有效性；
- 部分候选需要数据许可、用户级划分或 longitudinal metadata，不能因概念清晰就写成可执行；
- 外部回答提出的相关工作簇只可作为检索式，不能直接放入 related work。

## 6. 来源复核

GPT Pro 指出 backlog 中 `Wearable Health Foundation Model`、arXiv:2605.22759 未进入 source ledger。Codex 已从官方 arXiv 页面核对：

- 精确题名：`Towards a General Intelligence and Interface for Wearable Health Data`；
- 页面确实报告 population-scale wearable pretraining；
- 摘要确实写明 35 个 health prediction tasks。

该来源已补入 ledger。这个核验只支持“存在强规模压力”，不支持本项目对其方法、结果或外部有效性的任何额外结论。

## 7. 审计位置

### Six-branch literature adversarial audit

- 外部回答结构化转录：`review/GPT_PRO_LITERATURE_AUDIT_20260801.md`
- Codex 独立 verdict：`review/LITERATURE_AUDIT_VERDICT_20260801.md`
- Evidence bundle：`artifacts/literature-cluster-adversarial-audit-20260801.md`
- Bundle SHA-256：`2e2a343544f9153755f560bc009ad340b06dfefa5afe61c9dbd99c8de3783e60`
- ChatGPT conversation：<https://chatgpt.com/g/g-p-6a6b0516fbb8819185e47160a2b7552b-auto-research/c/6a6cc99c-7690-83ec-a406-fd4a92e461eb?tab=chats>

### Aggressive brainstorm

- 原始回答：`.codex/codex-pro-bridge/gpt-pro-sessions/auto-research-20260730-aggressive-paper-driven-problem-and-evalua-gpt-pro/001-aggressive-problem-and-evaluation-space-brainstorm.md`
- Codex verdict：同一目录下 `verdicts/`
- Task bundle：`.codex/codex-pro-bridge/bundles/20260730-221159-887226-paper_brainstorm-f1debd4e-context.zip`
- Bundle SHA-256：`a78271106943d17ec816c982c79445257febe2322da836feac3829136a1f19a8`
- ChatGPT conversation：<https://chatgpt.com/g/g-p-6a6b0516fbb8819185e47160a2b7552b-auto-research/c/6a6b5c82-d3ec-83ec-8b68-970eee8b03b4>

### Portfolio review

- 人类可读原文：`review/GPT_PRO_PORTFOLIO_REVIEW_RAW.md`
- 精确 Bridge turn：`.codex/codex-pro-bridge/gpt-pro-sessions/auto-research-20260730-memory-proactive-agent-personalization-3-2-gpt-pro/001-research-program-review.md`
- Codex verdict：对应 session 的 `verdicts/`

ChatGPT Project：<https://chatgpt.com/g/g-p-6a6b0516fbb8819185e47160a2b7552b/project>

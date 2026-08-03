# Codex Verdict on the Six-Branch Literature Audit

日期：2026-07-31  
结论类型：paper/evaluation overlap audit；不是 novelty 证明或实验结果

## 1. 总结决定

GPT Pro 的核心批评成立：当前资产已经能做 discovery，但还不能把 cluster 名称直接当作 novelty。第三轮 review 后，研究树的共同上位问题从泛化的“长期 Agent lifecycle”收窄为：

> state transition 是否正确、谁有权使其生效、变化如何传播到行动，以及 revoke/repair 后是否仍有 residual influence。

这个收窄来自新论文的直接压力，而不是审稿人的主观偏好：`MemTX`/`MemTxn` 已进入 transactional update，`STALE` 直接测 implicit invalidation，`GateMem` 进入 multi-principal governance，commit-time authorization 约束 durable effects。因而“生命周期、授权或遗忘无人研究”已经是不可接受的主张。

## 2. 已采纳

| 决定 | 采纳原因 | 写回位置 |
| --- | --- | --- |
| Cluster 增加 estimand/evaluation unit/operator/failure type | 防止只按关键词聚类 | `LITERATURE_MAP.md` §1.4 |
| C02 broad framing 终止并分叉 | `MemTX`、origin-bound authority、commit-time authorization 形成强覆盖 | `CURRENT.md`、`PROBLEM_BACKLOG.md` |
| C03 只保留 benign cross-layer residual | malicious repair、transaction、active forgetting 已有覆盖 | core candidate + cheap probe |
| C08 generic missingness 终止 | `LSM-2` 与 `OpenMHC` 已覆盖 incomplete representation/imputation | 仅保留 cause→action→regret |
| C14/C15 降为 nested slices | timing、cancellation、repair、abstention 均有直接 benchmark | 嵌入 C13/C03 evaluator |
| C25 收窄到 attribution/negotiation/rollback | `HorizonBench`、`PERMA`、`BenchPreS`、`Persona2Web` 已覆盖演化、选择性与 personalized action | narrowed probe |
| C23 只作 diagnosis | MRT/JITAI 已有成熟 causal estimand；synthetic SCM 不等于真实 effect | 保留 ranking-reversal probe |
| C28 提升为最清晰 U-AI opportunity | 反馈属于 memory/reasoning/policy/style/tool 哪一层仍是清晰可配对问题 | Problem Definition |

## 3. 修改后采纳

- 不接受“kill C03/C25”这种一次性终结；新论文证明的是 broad claim 被压缩，不代表残余 evaluation variable 已被直接覆盖。
- 不把 C14/C15 从资产中删除。它们失去独立 paper status，但作为 timing/irreversible repair slice，可能改变 C13/C03 的方法排序。
- `PULSE` 证明 Agent 可以主动选择被动感知的 modality/lookback 并支持介入调查，但这不证明其 intervention 有因果效果；它只构成 active sensing/proactive health 的 direct pressure。
- `OpenMHC` 的规模与统一任务设置强化 representation/imputation 基线压力，但不替代 missingness-cause、acquisition cost 或 action regret 的评测。

## 4. 暂不采纳

- 未经原始论文核验的候选不进入 source ledger。
- 不把 GPT Pro 的白空间判断写成 “first” 或 “no prior work”。
- 不因论文摘要报告数值而声称本项目已复现结果。
- 不把 synthetic shift、synthetic SCM 或 human preference rating 外推为真实 longitudinal drift、causal treatment effect 或 user utility。

## 5. 本轮独立核验的新增 primary sources

### Memory / governance

- [MemTX](https://arxiv.org/abs/2607.23929)
- [MemTxn](https://arxiv.org/abs/2607.27834)
- [GateMem](https://arxiv.org/abs/2606.18829)
- [STALE](https://arxiv.org/abs/2605.06527)
- [PersistBench](https://arxiv.org/abs/2602.01146)
- [Commit-Time Authorization](https://arxiv.org/abs/2607.10487)

### Wearable / proactive health

- [OpenMHC](https://arxiv.org/abs/2607.16235)
- [WAG](https://arxiv.org/abs/2605.18763)
- [PULSE](https://arxiv.org/abs/2605.17679)

### Personalization

- [HorizonBench](https://arxiv.org/abs/2604.17283)
- [PERMA](https://arxiv.org/abs/2603.23231)
- [BenchPreS](https://arxiv.org/abs/2603.16557)
- [Persona2Web](https://arxiv.org/abs/2602.17003)

## 6. 下一步决策顺序

1. C02/C03/C15：按 evaluation unit、commit point、authority witness、repair target 和 residual metric 做 overlap matrix；
2. C08：先找带真实 missingness-cause 或 policy-induced missingness 的 metadata；没有就只做合成诊断，不占 GPU；
3. C25/C28：先跑 simple role/latest filter 与 feedback router，确认是否存在 ranking difference；
4. C13：把 C14/C15 作为 timing/irreversibility slices 加入 evaluator；
5. C31：只有真实 device/time/placement shift metadata 对齐后才进单卡 smoke。

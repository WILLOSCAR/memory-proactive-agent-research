# GPT Pro Six-Branch Literature Audit

- ChatGPT Project: `Auto Research`
- Remote project: `g-p-6a6b0516fbb8819185e47160a2b7552b`
- Model selected in UI: `Pro`
- Submitted: `2026-07-31T16:13:15.937Z`
- Completed: `2026-07-31T16:30:13.424Z`
- Conversation: <https://chatgpt.com/g/g-p-6a6b0516fbb8819185e47160a2b7552b-auto-research/c/6a6cc99c-7690-83ec-a406-fd4a92e461eb?tab=chats>
- Evidence bundle SHA256: `2e2a343544f9153755f560bc009ad340b06dfefa5afe61c9dbd99c8de3783e60`

> 说明：这是 GPT Pro 输出的结构化转录，保留其论证、候选判断与建议叶子；它是外部审稿意见，不是项目事实、novelty 证明或本地实验结果。Codex 的核验与采纳边界见 `LITERATURE_AUDIT_VERDICT_20260801.md`。

## 1. 总评

现有 `LITERATURE_MAP.md` 更像一套 **discovery grammar**，还不是 novelty map。它能稳定地把论文拆成 state、observation、action、counterfactual、cost、responsibility，但 cluster 仍偏关键词驱动。下一版应按三件事重新切：

1. evaluation unit 是 single turn、event、trajectory、user-month、device episode，还是 intervention decision point；
2. intervention 是 read/write/commit/revoke、ask/sense/wait/act、adapt/rollback，还是 delivery/withdraw；
3. failure 是 state error、policy error、authority error、causal error，还是 residual influence。

六条线真正可共享的空白，不是“更长、更主动、更个性化”，而是：

> 状态何时发生变化，谁有权让变化生效，变化如何传播到行动，以及撤销或修复后是否仍有 residual influence。

## 2. 六方向压力测试

### M-AI

Memory 研究已从存储/检索进入 lifecycle、transaction、governance 与 commit-time authorization。C02/C03 不能再笼统声称“动作相关授权”或“删除传播”；它们必须分别收窄到：

- commit 前 authority witness 是否仍有效；
- benign user revocation 如何跨 source/index/summary/cache/adapter 传播；
- repair 后 residual influence 如何测；
- responsibility 如何在 writer、memory、retriever、policy 与 tool 之间定位。

建议叶子：

- L1 lifecycle-equivalent history pairing；
- L2 explicit lifecycle state machine；
- L3 abstention type decomposition；
- L4 residual influence after benign revocation。

### M-PHY

通用 wearable representation 已高度拥挤。representation accuracy 本身不等于 longitudinal memory，也不等于 decision utility。LSM-2/OpenMHC 进一步压缩泛化“缺失建模”的空间。

剩余空间应从“能否插补”改写为：缺失原因能否归因、是否需要追加感知、采取哪个动作、错误判断造成多大 regret。

建议叶子：

- L5 missingness cause to action；
- L6 policy-induced missingness；
- L7 decision-aware imputation；
- L8 privacy-cost sensing。

### P-AI

binary trigger、timing prediction、event cancellation 与 act/abstain 已有直接 benchmark。C14 作为独立 timing benchmark 的空间太薄；C15 的泛化 repair 表述也被相邻工作压缩。

更强问题是 action lattice、irreversibility、consequence-aware opportunity window、repair protocol 和长期 trust cost。

建议叶子：

- L9 action-lattice policy；
- L10 consequence-aware timing；
- L11 irreversible-action repair；
- L12 trust erosion under repeated assistance。

### P-PHY

该方向必须沿用 JITAI/MRT 的构念和因果语言。need、availability、receptivity、feasibility、response prediction 与 treatment effect 不能互换。观察性预测不能推出介入有效。

建议叶子：

- L13 proxy-versus-policy ranking；
- L14 construct-conflict cases；
- L15 sensing-loop policy；
- L16 withdrawal timing after state resolution。

### U-AI

长期偏好、动态 persona、context-aware preference selectivity 和 personalized web action 都已形成新 benchmark。C25 如果只做 role/context/time conflict，容易落入直接覆盖；剩余价值在于冲突来源归因、协商、更新哪一层以及 rollback。

建议叶子：

- L17 role/context conflict；
- L18 feedback-cause routing；
- L19 update-layer attribution；
- L20 performative preference drift。

### U-PHY

个体适配和不确定性建模已有大量方法。最强的剩余问题不是“适配能否提升平均 F1”，而是发现 shift 后判断其来源，并选择正确 operator：不更新、校准、重训头部、更新个体基线、换设备映射或撤回 intervention policy。

建议叶子：

- L21 drift attribution to operator choice；
- L22 safe cold start with abstention；
- L23 negative-transfer prediction；
- L24 response prediction versus treatment effect。

## 3. Candidate Pressure Test

| Candidate | GPT Pro 建议 | 理由 |
| --- | --- | --- |
| C01 | retain benchmark | lifecycle pairing 仍可能改变方法排序，但必须显式写 evaluation unit 和 failure type |
| C02 | kill broad framing; branch | MemTX 与 commit-time authorization 已覆盖强邻域；只保留 action-risk/benign authority 的独立变量 |
| C03 | branch | transaction、repair、governance 已压缩“revocation propagation”；保留 benign cross-layer residue |
| C08 | kill generic version | incomplete representation 与 missingness 已拥挤；只保留 cause → acquisition/action → consequence/regret |
| C13 | retain evaluation | action lattice 与 consequence-sensitive policy 仍值得测试 |
| C14 | kill as standalone | timing 已直接覆盖；作为 C13/C15 的 consequence-aware slice |
| C15 | kill broad framing | cancellation/repair/abstention 已有邻近覆盖；作为 irreversible repair/residual slice |
| C23 | diagnosis only | synthetic SCM 只能证明某类 proxy 会反转 policy ranking |
| C25 | branch | preference selectivity/evolution 压力很强；保留 attribution/negotiation/rollback |
| C28 | strong opportunity | 同一 feedback 对应 memory/reasoning/policy/style/tool 的不同修正对象，尚有清晰 evaluation unit |
| C31 | conditional | 需要真实 shift metadata；synthetic injection 只能验证 harness |

## 4. 优先 cheap probes

1. C02/C03/C15 paper-by-paper overlap matrix；
2. C23 known-ground-truth SCM ranking reversal；
3. C25 role/context filter replay；
4. C13 multi-action consequence replay；
5. C01 lifecycle paired generator；
6. C28 feedback-cause matched pairs；
7. C08 missingness-cause smoke；
8. C31 drift-type injection harness。

## 5. 不应直接写入论文的主张

- “first long-term memory lifecycle benchmark”；
- “first proactive timing benchmark”；
- “first lifelong personalization benchmark”；
- synthetic SCM 证明真实 causal effect；
- synthetic shift 证明真实 drift attribution；
- 删除原始记录等于 derived memory 已删除；
- health insight accuracy 等于 user utility；
- 一个数据集上的失败可跨域泛化。

## 6. 对仓库结构的建议

每个 cluster 与 candidate 至少增加：

- `estimand`；
- `evaluation_unit`；
- `intervention_or_operator`；
- `failure_type`；
- `nearest_pressure`；
- `novelty_pressure_checked_at`；
- `killer_baseline`；
- `branch_or_kill_rule`。

此外应建立 overlap matrix，把“论文名字相邻”转换成“evaluation unit、intervention、counterfactual、metric 和 blind spot 是否重合”。

# Team Knowledge Promotion Contract

`knowledge/` 只保存经 Track Mentor 本地复核后、可跨 cycle 或跨 Student 复用的经验。每个 Handoff 都留在 Student cycle，但只有具备复用价值和清楚适用边界的成功、negative、failed 或 invalid 经验才晋级；聊天摘要、未经复核的 Student 判断和 Pro pressure 不能直接晋级。

第一条知识正式接受时再创建：

```text
knowledge/
├── README.md
└── entries/K-<track>-<seq>.md
```

每条 Entry 使用 [`../templates/knowledge-entry.md`](../templates/knowledge-entry.md)，至少记录：

- 来源 Student、cycle、Candidate、Spec、Run、Artifact 或 Decision；
- 原假设、观察、失败分类与 Mentor verdict；
- 适用范围、不适用范围、反例和风险；
- 下一次如何复用或如何避免重复失败；
- 接受人、接受日期和基于哪个 canonical revision。

Entry 正文只在 `knowledge/entries/` 保存一次。被正式接受后，其稳定 ID、scope 与文件指针通过 Settlement 登记到 `research-index.yaml` 的 `reusableAssets`（或未来经 schema review 新增的 knowledge collection）；不维护第二份手工 `knowledge/index.yaml`。

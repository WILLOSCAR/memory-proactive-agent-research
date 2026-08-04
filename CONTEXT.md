# Auto Research OS — Context (Ubiquitous Language)

本文件是本项目的**唯一术语词典**。数据层、`CURRENT.md`、`research-idea-forest-site` 及任何看板都必须使用这里的词义；冲突以本文件为准。

> 一句话定位：这是一套**以 Candidate 为核心、以 Evidence 为进度、以 Decision 为驱动、最终汇聚到多个 Paper Project 的研究操作系统**——不是"论文列表 + Idea 看板 + 实验看板"的拼盘。

冻结日期：2026-08-04

## Language

### 核心对象

**Research Program**：
整个项目研究的上位对象（变化环境中的长期 Agent）。全局唯一，ID `PROGRAM`。

**Track**：
六条研究索引线之一（M-AI / M-PHY / P-AI / P-PHY / U-AI / U-PHY）。是**资产归档索引**，不是学术 ontology。
每条 Track 可处于 `explore / validate / maintain / parked` 运营模式；模式是组合管理状态，不改变科学归属。`parked` 必须记录原因和 unlock condition。
_Avoid_: Branch（"branch" 一词保留给分叉动作，见 Split）、方向（口语可用，实体名用 Track）。

**Source Paper**：
外部的相关论文——引用、benchmark 来源、related work。ID `SRC-nnn`。它提供 `direct coverage` 或 `pressure`，**本身不是本项目的证据**。
_Avoid_: Paper（裸词禁用，必与 Paper Project 混淆）、文献。

**Literature Cluster**：
一组 Source Paper 共同解决的问题簇。ID 如 `MA-03`。
_Avoid_: 论文组。

**Gap / Failure**：
现有评测/方法看不到的失败或空白。ID `GAP-nnn`。是 Candidate 的来源。

**Candidate**：
**系统的核心研究工作单位** = 一个可证伪 Claim + 它的评测。ID `Cnn`（C01–C36）。"Idea" 只是口语，系统实体一律叫 Candidate。
_Avoid_: Idea（口语可用，实体名禁用）、Proposal（那是 Candidate 的详情，见下）、题目。

**Proposal**：
Candidate 的**完整厚卡详情**（动机、Claim、novelty、评测设计、probe、kill rule…）。它是 Candidate 的一个视图，**不单独编号、不是独立对象**。
_Avoid_: 把 Proposal 当独立工作项。

**Experiment Spec**：
检验某 Candidate 的实验**设计**（独立变量、baseline、oracle、stop rule…）。ID `E-Cnn-mm`。一个 Candidate 可有多个 Experiment Spec。
_Avoid_: Experiment（裸词禁用，必分 Spec 与 Run）。

**Run**：
Experiment Spec 的一次**真实执行**。ID `R-E-Cnn-mm-nnn`。只有真正执行才创建。一个 Spec 可有多个 Run。
_Avoid_: 把"实验想法"或"实验设计"叫 Run。

**Artifact**：
Run 产出的不可变证据。以 digest / URI 标识。

**Local Result**：
**只有有效 Run 产生的 Artifact** 才算 Local Result。文献结论、GPT Pro 判断都不是。
_Avoid_: Result（裸词禁用）、把外部结论当结果。

**Evidence Link**：
把一个精确 assertion（如 `C01@v3.failure_exists`）连接到 Source Paper、Local Artifact、Inference 或 External Review 的 typed record，至少记录 relation、basis type、scope 与 ref。证据等级属于 assertion / link，不属于整个 Candidate；Candidate 只能显示派生 evidence summary。External Review 只能 `pressure`，不得直接 `support`。

**Decision**：
对 Candidate 的研究决策。ID `D-nnn`。取值见"决策结果"枚举。

**Paper Project**：
本项目**准备产出的一篇论文**，组合多个 Candidate 的存活 Claim + 本地证据。ID `PP-nnn`。
_Avoid_: Paper、Draft。**在 Candidate 通过一次有效 Cheap Probe 前，只存在 Paper Opportunity，不创建 Paper Project。**

**Paper Opportunity**：
有潜在论文叙事、但证据不足的前置状态。不编号为 PP，成熟后才升级为 Paper Project。

**Reusable Asset**：
跨论文可复用的工具/数据/Prompt/evaluator/SOP。ID `A-nnn`。

**External Review**：
GPT Pro 或其他外部评审提出的**压力（pressure），不是证据（evidence）**。ID `REV-nnn`。

### 动作

**Split**：
一个 Candidate 分叉出新的 Candidate（母卡关闭、开子卡）。
_Avoid_: Branch（保留给 Track 无关；分叉动作只叫 Split）。

**Nest**：
一个 Candidate 降级为另一个 Candidate 的 evaluator slice，保留编号供追溯，但**不计入独立 Candidate 数**。例：C14→C13、C15→C13/C03。

**Merge**：两个 Candidate 合并为一。
**Park**：搁置，须写解锁条件。
**Kill**：终止，须写原因；Kill 后仍保留可检索。
**Continue**：有稳定 failure/headroom，继续。

### 五个正交维度（Candidate 不能只有一个 status）

**研究成熟度**：Radar → Audit → Problem → Probe → Pilot → Confirmation → Paper。
**证据等级**：`Unverified Lead` < `Source Supported` < `Inference` < `Local Result`。
**工作状态**：Active / Blocked / Parked / Closed。
**决策结果**：Continue / Split / Nest / Merge / Park / Kill。
**产出形态**：Method / Benchmark / Evaluation / Dataset / Diagnosis / Systems / HCI。

GPU、数据许可、云盘等是 **Experiment 的资源约束**，不是研究分类维度。

### 计数口径（冻结）

- **总节点 = 36**（C01–C36 全部）。
- **独立 Candidate = 34**（扣除已 Nest 的 C14、C15）。看板与进度指标默认用 34；"独立 Candidate" 一词专指未 Nest 的。
- 计数变化规则：Split +N、Nest 独立数 −1（保留编号）、Merge −1、narrow 不变号。

### 进度语义

**Progress**：
只按**新增证据**与**研究决策**计算。文档数量、卡片移动、完成百分比都不算进度。
_Avoid_: "离论文 70%" 这类无可靠含义的百分比。

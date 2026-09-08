# ADR-0003: Bind Students to a Mission and Preserve an Evolving Research Line

- Status: accepted
- Date: 2026-08-17

## Context

旧模型把一个 Student 绑定到预先固定、paper-shaped 的 Research Line。长周期研究中，Seed Question 经论文审计、反例和实验后经常被收窄、重构或顺序转向；若每次变化都新建 Student，会切断证据谱系。若允许 Student 无边界漂移，又会失去 owner、预算和可审计性。

## Decision

一个 Student 绑定一个稳定的 `Student Mission`。Mentor 提供 `Seed Question` 作为启动坐标；Student 在 Mission 内维护一个可版本化的 `Research Line`，每次问题变化写 `Research Line Revision`。Refine、narrow、generalize、reframe 和 sequential pivot 默认留在同一 Student；只有两个方向需要并行、能独立生存并拥有不同证据或权限边界时，才返回 fork proposal 并创建新 Student。

现有 `research_line_id` 保留为 lineage ID，避免破坏已存在的目录、指针和 Chat 映射；新增 `mission_id` 与 revision history 表达稳定边界和演化过程。

## Consequences

- Mentor 做方向 Survey、定义 Mission 与初始问题空间，不逐个 Idea 派工。
- Student 可以持续查论文、复现、证伪和改变问题，但必须留下 revision 与 Handoff。
- 旧资产可以按 Mission 导入，同时保留其原始证据边界；导入不升级 scientific status。
- 并行 fork 仍需独立 Student，避免一个 Chat 同时拥有两个 writer 或两条互不相干的论文线。

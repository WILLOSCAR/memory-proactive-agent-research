# ADR-0001: Preserve the Stable Root Interface

- Status: accepted
- Date: 2026-08-10

## Context

根目录 canonical 文档已经被脚本、Dashboard、历史审计和 ChatGPT Project Sources 引用。一次性把它们全部移入新的“整洁目录”会造成路径断裂、Source digest churn 和并行任务冲突。

## Decision

保留 `CONTEXT.md`、`AUTO_RESEARCH_SOP.md`、`OPERATIONS.md`、`SOURCE_AUTHORITY.yaml`、`research-index.yaml`、`research-events.jsonl` 等根文件作为稳定公共接口。新增控制面设计放入 `system/`，角色工作区放入 `tracks/`，Mentor-accepted 经验放入 `knowledge/`。不复制根文件，也不维护新旧两套 canonical。

## Consequences

- 新读者通过 `README.md` 和 `system/README.md` 导航，而不是从物理层级猜权威。
- Project Source 同步不因目录美化产生全量替换。
- 未来若要移动根接口，必须提供引用迁移、redirect/compatibility 和 Source sync cutover 计划。

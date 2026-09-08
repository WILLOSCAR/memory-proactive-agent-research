# Track and Student Workspace Layout

`tracks/` 是 Mentor 与 Student 的**文件化工作界面**，不是第二套 Research Database。六个 Track 的 Mentor 入口常驻；Student 只有在创建稳定 Mission 与初始 Research Line lineage 后才生成。人类启动入口见 [`../START_HERE.md`](../START_HERE.md)。

## 懒创建结构

```text
tracks/<track-id>/
├── CHARTER.md
├── GOAL.md
├── MENTOR_WORKSPACE.yaml
├── mentor/
│   ├── CURRENT.md
│   ├── REVIEW_QUEUE.yaml
│   ├── daily/<YYYY-MM>.md
│   ├── dossiers/<student-id>/<sha256>.md
│   └── reviews/<review-id>.md
├── mentor-cycles/<mentor-cycle-id>.md   # 按需创建
└── students/<student-id>/
    ├── CHARTER.md
    ├── GOAL.md
    ├── WORKSPACE.yaml
    ├── ASSETS.yaml
    ├── MENTOR_DOSSIER.md
    ├── MENTOR_INBOX.yaml
    ├── MENTOR_ACKS.yaml
    └── cycles/<cycle-id>.md
```

- `CHARTER.md`：稳定使命、scope、owner、writer boundary 和 stop / split contract；从 [`../templates/student-charter.md`](../templates/student-charter.md) 或 [`../templates/track-charter.md`](../templates/track-charter.md) 创建。
- `GOAL.md`：保存短 `/goal` 启动语句和角色 binding；共享行为分别来自 [`../templates/track-mentor-goal.md`](../templates/track-mentor-goal.md) 和 [`../templates/student-goal.md`](../templates/student-goal.md)，不复制动态研究状态。
- `MENTOR_WORKSPACE.yaml`：该 Track 的 Mentor Action 指针、队列和 Student roster；一次 `/goal` 最多处理一个 `admit-mission / review-handoff / review-incident / review-portfolio` Action。
- `mentor-cycles/`：一个 Mentor Action 的审计记录；不是 Student 科学 Cycle，也不是 canonical Settlement。没有 Action 时不为空目录制造占位文件。
- `mentor/REVIEW_QUEUE.yaml`：每日 Mentor 观察队列，状态仅为 `new / observed / needs-review / resolved`；它与 `MENTOR_WORKSPACE.yaml.action_queue` 的正式 Mentor Action 不是同一队列。
- `mentor/dossiers/`：adapter 对每个新 Student Dossier digest 保存的不可变快照；`daily/` 与 `CURRENT.md` 是 Mentor 观察记录，`reviews/` 是可交付的深审。
- `WORKSPACE.yaml`：稳定 Mission、Seed Questions、当前 Research Line revision、Idea Variants、竞争解释、Current Next Evidence 与 cycle 状态；从 [`../templates/student-workspace.yaml`](../templates/student-workspace.yaml) 创建，不复制 canonical Candidate 字段。
- `ASSETS.yaml`：Source、Spec、Run、Artifact、代码、HDFS 与 Pro record 的 ID / URI / digest 指针；从 [`../templates/student-assets.yaml`](../templates/student-assets.yaml) 创建。
- `cycles/`：一个 live Cycle 内持续追加 Research Round 与 Stage Settlement，直到真实 Handoff 边界；success、negative、failed、invalid 都保存。`*-LEGACY-IMPORT.md` 只是 Bootstrap Import。
- `MENTOR_DOSSIER.md`：Student 在 material Stage Settlement 更新的详细组会综合，只保存结论链与原始日志/Run/报告的 URI + digest；`MENTOR_INBOX.yaml` 由通信 adapter 写 review 指针，`MENTOR_ACKS.yaml` 由 Student 写 `observed / applied / challenged`。

Codex/Pro Chat 的已观察 ID、Track roster、parent portfolio 与最近核验时间只进入 部署工作区的 `system/coordination/registry.yaml`。`create-ready` 表示文件入口可以启动，不证明某个 Chat 已被观察或仍在运行。Chat ID 缺失不妨碍 Agent 从同一 Student 文件恢复；Charter 不复制这些动态字段。

## 启动与恢复

在仓库根目录打开 coding agent，粘贴目标 Student `GOAL.md` 中的短命令：

```text
/goal 读取并执行 tracks/M-AI/students/STU-MAI-SEMANTIC/GOAL.md。
```

Student 先读 `GOAL → CHARTER → WORKSPACE → ASSETS → cycles → Mentor Inbox/Acks/Dossier`。若恰有一个 `initializing / active / paused` Cycle，就恢复它；若没有且 Workspace 为 `create-ready`，本次调用从模板创建且只创建一个；若发现多个，则返回 writer conflict。普通 Round 追加 Stage Settlement、更新 Dossier、处理 digest 匹配的 Mentor Review 后继续；只有真实 Handoff 边界才清空 active pointer、记录 `last_handoff_cycle_id` 并停止。平台中断保留 active/paused Cycle 供下次恢复。

Mentor 入口同样是短 `/goal`，但必须解析出恰好一个 Mentor Action。显式 Action 优先，其次恢复 `active_action`、唯一 ready queue item、或唯一 `awaiting-mentor-review` Student；没有 Action 就 `idle`，多个竞争 Action 就报告歧义。Mentor 完成一个 Action 后停止，不自动进入下一个 Action 或 Student Cycle。

新 Student 文件夹由 Mentor 或仓库维护者从 `templates/student-*` 创建并登记稳定 Mission；这是低频治理操作，不是每次启动的前置命令。内部 Node 工具可用于批量 scaffold、schema 检查或登记已观察的 Chat/Pro ID，但不渲染 Prompt，也不传输研究上下文。

## 粒度规则

1. 一个 Student 绑定一个稳定 Mission 和一条可版本化的 Research Line lineage；多个 coding-agent session 可以先后从同一文件状态恢复，但同一时刻只有一个 writer 和一个 live Cycle。
2. 同一 Mission 内的 refine、narrow、generalize、reframe、sequential pivot 与 Idea Variant 留在 `WORKSPACE.yaml`，每次问题变化写 revision，不新建目录或 Chat。
3. 两个问题必须并行存在、能独立生存并拥有独立 Claim、kill rule 与 evidence regime 时，才由 Mentor 提议新的 Student。
4. Lead 只是 roster 上的动态优先级标签，不产生 `lead/` 特殊目录。
5. Research Line Seed 仍在 Mentor backlog；只有用户授权创建 Mission 后才建立 `create-ready` Student 目录。真实 Chat ID 写入 registry 后只是“已观察到的 Chat binding”；科学执行是否 active 以 live Cycle 文件为准。
6. Candidate 是科学对象，不是协作或目录主键。跨 Chat 通信用 `research_line_id + cycle_id`；一条 Research Line 可以引用多个 Candidate，但同一 canonical 对象的 writer 仍唯一。

Student workspace 只保存工作上下文和指针。一次 `/goal` 调用绑定一个 Student Mission、当前 Research Line revision 和一个 live Cycle；它可以在该 Cycle 内反复跑科学 inner loop和顺序演化，但不能切换 Track/Mission 或创建第二条并行谱系。论文正文在 `sources/`，真实 Run 在 `experiments/`，Pro 原文在 Bridge/review store，团队经验在 `knowledge/`，科学状态在 root index/event。

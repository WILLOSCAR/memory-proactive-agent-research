# Execution Controller, Control Plan and Scheduling

Execution Controller Agent 是由 recurring Control Plan 唤醒的长期 Codex 运行角色；Execution Control Plane 是它使用的 Watch、Job、GPU/HDFS、registry、checkpoint 和 Run queue 工具/事实层。Controller 只调度已接受的 Experiment Spec / Run，不替科学 owner 选择 Claim，也不把 GPU 利用率当研究进展。具体每轮行为以 [`../../templates/execution-controller-goal.md`](../../templates/execution-controller-goal.md) 为唯一执行入口。

## 长期 patrol 与运行收敛

一个 Controller 绑定一个显式 Track/Student set、Mentor targets、cadence、writer scope、checkpoint 和暂停条件。它可以服务一个 Mentor 下的多个 Student；若一个 Controller 暂时服务多条 Track，必须向各 Mentor 返回独立 Track-scoped delta，并保持一个共享 runtime writer。多个 Controller 可以读取同一 registry 与 Runbook，但不能把同一个共享文件都声明成直接写入目标；拆分前必须按 Track/Student 分片 ledger/registry patch，或引入一个唯一串行 writer adapter。当前 `CTRL-RESEARCH-EXP` 是所列 M-AI/P-AI shared runtime 文件的唯一 writer。

每个定时唤醒只运行一个 single-flight tick：

```text
recover binding/checkpoint
  -> observe Task / Research / Resource / Experiment
  -> compare delta
  -> observe | bounded-repair | needs-engineer | needs-mentor
  -> readback
  -> operational learning
  -> resume same Student/Cycle
  -> compact Mentor delta
  -> terminal
```

Controller 直接修复所有已授权的例行运行问题，而不为每种杂活新建 Agent。根因不确定、有界修复失败、需要深度代码/环境改动或涉及共享组件时，Controller 向 Mentor 返回 `needs-engineer`；Mentor 再派发一个有界临时 Engineer，修复后由 Controller 验收。Engineer 不参与定时巡检，不保留空闲常驻 Session。

每个 incident 在首次出现时就进入 prevention loop。对每个 `recurrence_key` 统计重复人工动作、自愈失败、Engineer 上移与 User 上移。修复后必须选择一个终态：`automated`、`eliminated`、`fail-closed-escalation` 或 `candidate-with-unlock`。未选择终态的重复杂活不算解决。目标是在保留证据和安全门槛的前提下，让 Mentor/User 介入率随 SOP 成熟持续下降。

Student 向 Mentor 直接返回科研 delta；Controller 只返回运行 delta。例行健康 tick 和成功小修复仅写 checkpoint/ledger，不打扰 Mentor。新 Stage Settlement/Handoff 指针、真实 Run/资源转移、自愈失败、持续停滞、共享运行规则改变或权限需求才触发通知。

## Container-first 基线与两条执行 lane

一个 active Student 的第一项运行时动作是恢复或申请远端 GPU 容器，而不是先在本地选择一个便宜实验。`Cheap Probe` 只控制样本、调用、模型和 GPU slice；CPU preprocessing、API client、evaluator、推理与训练都从同一个已验收容器运行。本地 Mac 是控制面，不是科研执行面。

```text
active Student
├── one persistent capacity-qualified remote container Lab
│   ├── preferred: 4–8 GPU
│   ├── compact fallback: exactly 2×H20 after workload/route preflight
│   └── interactive reproduction / debugging / Idea A-B-C / short Runs
└── zero to many batch Jobs from frozen Run Specs
    └── long training / full benchmark / multi-seed / recoverable scale-up
```

Program standing authorization 要求每个 active Student 在 Claim-bearing 执行前自主恢复或申请至多一台独占 Student Lab。Lab 以 Student 为生命周期 owner，跨 Idea Variant、Run、Stage Settlement、Cycle、Handoff 与 coding-agent session 复用；它不是共享给多个 Student 的默认实验农场。一次 Run 只领取明确的 GPU slice，其他卡用于该 Student 的并行 baseline、evaluator、模型复现或另一条 in-Mission 分支。当前 standing Job boundary 是单个 Job 最多 8 GPU；更大规模另行扩容。

所有 Student 的动态容器绑定只记录在 部署工作区的 `system/scheduling/student-labs.yaml`。`unrequested / requested / allocated / verified / active` 必须分开；只有 `verified` 后才允许启动第一个真实 workload。`verified` 只证明这个物理 Worker 可用；Watchdog `survival-gated` 是后续运营 substate，达到后才把 lease 当成暂时安全的 `active`。逻辑 Student Lab 可跨 replacement 持续，物理 Worker/Instance 的历史验收不能迁移。Stable Worker/DevBox 是首选，能进入 Shell 的 GPU Job container 是 Stable 不可得时的远端 fallback。

共享 registry 的每次写入必须以唯一 `student_id` 作为补丁上下文，不能只匹配重复出现的 `lifecycle_state`、`worker_id` 等字段。写后先解析 YAML，再同时读回所有 live Student 的 lifecycle、Worker、Instance、source lock 与 verified time；任何意外触碰都在允许下游动作前立即恢复并记录。Controller 验收 source 时还要先冻结 sole-writer 的 in-flight edit，再同步和提升 lifecycle，避免硬件验收成功却绑定了旧代码。

物理 Worker 的验收使用一个机器可读接口：从 部署工作区的 `system/scheduling/storage-profiles.json` 选择 site contract，在容器内运行 `scripts/verify_student_lab.py`，并把原子 JSON receipt 交给唯一 controller 读回。只有 receipt 为 `passed`、身份/GPU/framework/mount/HDFS/source/required-assets 与当前 Worker 一致时，controller 才能写 `verified`。该 binding 同时记录 Lab receipt、strong source-verification receipt 和 source-lock bundle 的 durable URI 与 digest；源码成员关系以 receipt inventory 和 `remote_repo_path` 为准，不从旧工作目录或缩短后的总 digest 猜测。可复用资产使用 `scripts/storage_receipt.py`：初次冻结和 drift 时做 `strong` 全 digest，普通 replacement 先做秒级 `fast` metadata/inventory 验收；需要真实加载的资产还必须绑定当前容器生成的 `templates/asset-load-receipt.json`，`load_gate=pending` 不能升级 lifecycle。Receipt 是结构化证据，不改变 `verified → survival-gated` 的后续顺序。

Job 是 Lab 之外的异步 lane。每个 Job 必须来自已冻结的 Run Spec、固定 code/data/config 和唯一输出路径；提交后 Student 不等待它结束，而是继续交互研究。Job 完成、失败或抢占后，Execution Control 回收日志、checkpoint、Artifact 与终态，Student 再解释其科学意义。一个目标只保留一个有效提交，避免重复排队。

## 两个派生队列

| 队列 | 进入条件 | 退出条件 |
| --- | --- | --- |
| `fit-now` | 数据、代码、evaluator、baseline、stop rule 均可用，并且预计资源落在当前 standing envelope 内 | 进入 Run、被 falsifier 杀死、依赖失效或需要扩容 |
| `scale-up` | Cheap Probe 已存活，最小实现与 evaluator 已验证，并且扩容可改变 Decision | 获得显式资源授权后回到 `fit-now`，或因价值不足而 Park |

它们都是从 canonical Spec、依赖与 live resource probe **派生的视图**，不是新的科学状态，也不手工维护第二份清单。

## 排序原则

优先级以“预计能改变多少 Research Judgment”为核心，而不是先到先得或谁申请更多 GPU：

1. 能否区分当前最重要的竞争解释；
2. 成功或失败是否会改变 Continue / Narrow / Split / Park / Kill；
3. strongest baseline 和 falsifier 是否先于规模实验；
4. 预计成本、等待时间与可恢复性；
5. Mentor 是否有能力在 Run 后及时结算。

可把 `expected decision value × uncertainty reduction ÷ expected cost` 作为排序解释，但不伪造精确数值。

## 扩容三道 Gate

以下 Gate 决定某个 Run 如何使用已经建立的 Lab、是否扩为 Job；它们不决定 Student 是否先拥有容器：

1. **Scientific gate**：Cheap Probe 没有被 strongest falsifier 杀死；
2. **Validity gate**：实现、数据、evaluator 和 baseline 已在小规模 Run 中验证；
3. **Decision gate**：扩大资源可能改变明确的研究决策，而不是只让曲线更平滑。

## Standing Resource Envelope

字段合同见 [`../../templates/resource-envelope.yaml`](../../templates/resource-envelope.yaml)。当前 Program standing authorization 已冻结以下默认边界：每个 active Student 在 Claim-bearing 执行前先请求至多一台交互 Lab；默认目标为 `4–8 GPU`；当 fresh 完整候选矩阵没有更快可行的完整路线，且冻结 workload 的显存、并行度、CPU/内存、存储恢复和 survival 计划都通过时，允许 `2×H20` compact fallback。优先 A100/A800 80G，也允许经 smoke 验证的 H20/L20；Lab 内 GPU slice 可自主调整；第二台 Lab 或单台超过 8 卡属于扩容。具体 Worker/Instance、CPU/内存、卡型、有效期和存储探针仍是动态事实，不得从这个设计反推为已分配。

申请排序使用词典序 Gate，不伪造一个不可校准的总分：先过滤 GPU/CPU/Memory、单节点形状、模型容量、存储 profile 和平台规则不成立的路线；再在满足最小 workload capacity 的候选中最小化 `time-to-verified-useful-workload`（排队/分配、登录验收、资产 hydration、环境恢复、真实 load、survival activation）；最后比较可恢复性、稳定性和已验证吞吐。每次只允许一个 request，并写出 `next_redecision_at`；到点重新读取 Worker list 与全量 quota 后再决定继续或精确切换，不能无限普通等待或同时 hedge 两条路线。

当前开发资源 live Watchdog（2026-08-24 核验的 `wdr-20260813143812-pnhp9` V3）在 Worker SM `<=25%` 连续 4 小时后告警、连续 8 小时后强制回收，全天生效。Program 将监控口径下 Worker SM **`>30%` 的真实有用计算**作为 survival target 和缓冲；`30%` 不是平台阈值，也不是永久保活保证。每次申请必须把 rule URL/ID/version、metric/aggregation、比较符、窗口与核验时间写回具体 envelope/Run。模型驻留、显存占用、PID/端口、CPU/API 活动和“确认并屏蔽”都不等于 SM 达标；禁止 synthetic burn。

初始真实 workload 可用 部署工作区的 `scripts/gpu_quick_deploy.py` 和 canonical [`../../templates/gpu-quick-deploy-spec.json`](../../templates/gpu-quick-deploy-spec.json) 启动或 adopt，并用全卡 Worker mean 的连续本地窗口生成 infrastructure-only receipt。该入口不下载未验收资产、不创造 synthetic load，也不写 `student-labs.yaml`；它的短窗 `nvidia-smi` Gate 只证明启动态，不能替代平台 Watchdog 的历史窗口或 Execution Controller Agent 的持续读回。

Student Lab 和 formal Job 都落入同一 Run 报告与归档合同。Lab 的申请与保留是基础设施状态；只有真实执行才创建 Run。申请前先把首个真实 GPU workload、source lock、模型/环境、数据、checkpoint 与 evaluator 准备成带 URI/inventory/digest 的可复用资产。Lab 未拿到时保留唯一申请，并继续论文、代码、数据与评测准备，但不在本地替代执行 Claim-bearing Probe；Worker 一旦 verified，先启动已冻结的真实 GPU workload 并通过 survival gate，再做 CPU/API 排程与效率优化。若没有合法 workload 能达标，就 checkpoint/drain/release 或接受回收，不制造空转。Lab 已拿到后优先复用，不为 Idea A/B/C 重复创建 Worker。

## 生命周期与释放

```text
unrequested → requested → allocated → verified → active
                                  ↘ reclaimed / failed
active → replacing → replacement-verified → released
active → Mission-closed-or-user-release → released

verified Worker watchdog substate:
unknown → below-target → survival-gated
                   ↘ warned (4h) → recovered-and-gated
                                  ↘ reclaimed (8h)
```

- `requested`、`allocated` 与 `verified` 分开；只有登录、`nvidia-smi` 和存储探针通过才可运行实验。
- `survival-gated` 是基础设施 substate，不是新的科学 maturity。当前共享 registry 尚未单列该字段时，在 owning Cycle/Run 记录 policy、observed SM/window、useful workload 与 warning/reclaim event，由唯一 controller 读回后再维护 `active/reclaimed`。
- 4 小时告警是立即处置点：记录最早 8 小时查杀时刻，恢复真实 workload 并读回 SM，或 checkpoint/drain；确认/屏蔽通知不是豁免。
- Run completed、Idea killed、Stage Settlement、Cycle Handoff 或 coding-agent session final 都保持 Lab active。
- 更换机房、卡型或 Worker 时，先验收 replacement，再释放旧 Lab；抢占场景依靠 HDFS checkpoint 恢复。
- 仅在用户明确释放、Mission closed/parked 且没有保留理由、平台回收，或 replacement 已验收后释放。

## 尚未实现

- 自动生成 `fit-now / scale-up` 队列；
- GPU slice lease、Job DAG 回收、并发资源仲裁和自动重试；
- 事件驱动的 Lab/asset receipt daemon、与 live Worker binding 自动对账并提升或撤销 registry lifecycle；当前由每小时 Execution Controller Agent 读回后写入；
- Dashboard 尚未展示 Controller tick health、recurrence、自愈成功率、Engineer/User 上移率与重复手工动作趋势；
- 由 telemetry 自动调整 standing envelope；
- 把 `probe-ready` 增加为 Candidate maturity state。

当前 Student 可依据 GOAL 与 GPU Runbook 自主完成申请、登录和验收，但尚无守护进程替它自动分配容器；因此 `student-labs.yaml` 中没有 `verified` binding 时必须把它报告为运行时缺口，不能静默回落到本地执行。

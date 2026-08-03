# Archived v1: Memory / Proactive Agent 相邻方向地图

> 归档说明：本文仍可作为相关工作与候选方法清单，但其中 Prospective Memory、Active Sensing、JITAI、Delivery Modality 等不再被视为与 Memory、Proactive Agent、Personalization 平级的主线。

更新日期：2026-07-30  
证据范围：截至更新日公开的论文、预印本与 UbiComp/IMWUT 原始页面。2026 预印本不视为已完成同行评审。

## 1. 调研结论

Memory 和 Proactive Agent 不是两个孤立主题，而是一个更大的闭环：

```text
sense
→ infer current state
→ remember / update
→ anticipate future need
→ decide whether and when to intervene
→ choose action and delivery channel
→ observe response
→ personalize future behavior
```

原先的三个方向仍成立，但需要展开为更多可投稿切口。最值得新增的相邻方向是：

1. Prospective Memory；
2. Proactive Memory / Active Retrieval；
3. Active Sensing 与轻量 Wake-up Trigger；
4. Interruptibility、Receptivity 与 JITAI；
5. Continual Personalization 与 Concept Drift；
6. Delivery Modality / Unobtrusive Interaction；
7. Personal Informatics；
8. Proactive Memory Maintenance；
9. Background Anticipation；
10. Privacy-Preserving Always-on Intelligence。

## 2. 方向一：Memory Core

### 任务

- 决定写入什么；
- 如何维护事实、偏好、目标、经验和约束；
- 如何处理更新、冲突、取消、删除和遗忘；
- 何时读取，以及读取什么；
- 如何证明 memory 真正改善后续行动，而不只是 QA。

### 可以继续切入的问题

- 个体化写入策略，而不是所有用户共用一个 memory policy；
- irrelevant personalization：记住了，但不该在当前任务使用；
- memory budget 下的长期价值估计；
- writer / resolver / retrieval / policy 的因果故障分解；
- 经验记忆何时应转化成 skill，而不是保留文本。

### 一周可验证版本

- 选 200–500 个现有 benchmark 样例；
- 比较 full history、flat memory、personalized gating 和 oracle memory；
- 不训练或只训练小型 gate；
- 输出准确率、stale activation、memory size、token、延迟。

### 资源

低到中。多数早期实验用 API、CPU 或单卡完成；7B/8B writer LoRA 再使用 2×80G。

## 3. 方向二：Prospective Memory

Prospective Memory 不是回忆“过去发生了什么”，而是记住“未来在某个时间、事件或环境状态出现时要做什么”。

### 产品场景

- 到达某处时提醒；
- 训练结束后自动跑评测；
- 某同事回复后继续未完成流程；
- 生理指标连续异常时再升级提醒；
- 用户完成当前步骤后恢复被打断的意图；
- 某约束到期时请求重新确认。

### 论文切口

- time-based、event-based、state-based cue 的统一表示；
- 干扰任务中延迟意图的保持；
- 多个并发 deferred intentions 的冲突与优先级；
- cue 缺失、cue 模糊和机会窗口；
- prospective memory 与主动打扰成本的联合决策。

PM-Bench 已经提供七天模拟任务和 future-cue 评测，因此“首次做 LLM prospective memory”不可再声称。仍可做跨设备 cue、真实工具执行、生理 cue、权限和干预成本。

### 一周可验证版本

直接复现 PM-Bench 子集，在 context、external state、scheduled polling 和 event-driven trigger 间做对比。

### 资源

低。主要是 agent rollout，不要求训练。

## 4. 方向三：Proactive Memory / Active Retrieval

这里的主动行为发生在 Agent 内部：Agent 自己判断何时需要回忆、检索经验或向 action agent 注入提醒。

### 产品场景

- coding agent 在重复失败前主动调取上次修复经验；
- 工具调用前发现知识缺口并检索；
- 长任务中发现 behavioral state decay，主动提醒 action agent；
- 只在 memory 能改变下一步行动时增加上下文。

### 论文切口

- 把 retrieve / remind / remain silent 视为 policy action；
- 用 counterfactual branch 衡量“这次检索是否真的有用”；
- memory intervention 的时机、频率与预算；
- memory agent 与 action agent 的信用分配；
- 小模型 memory trigger 与大模型 action policy 的协作。

“Ask Only When Needed”和“Remember When It Matters”已经形成强 novelty pressure。新工作必须解决更复杂的状态、跨任务迁移、资源成本或可信性。

### 一周可验证版本

在同一轨迹前缀上构造 retrieve / no-retrieve paired branches，先用 API 评估 outcome delta，再训练小型 trigger。

### 资源

中。paired rollout 消耗推理预算；只有训练 retrieval policy 时需要 2–4×80G。

## 5. 方向四：Active Sensing 与 Wake-up Trigger

这是与用户“新奇触发方式”最直接的方向：Agent 不必把每个事件都交给大模型，而是先决定何时唤醒高成本感知或推理。

### 触发源

- 操作系统事件图；
- IMU、位置、麦克风、摄像头；
- 心率、HRV、PPG、ECG、EDA；
- 环境噪声、温度、光照；
- 日历、IM、代码提交、训练 Job；
- memory conflict、uncertainty、future cue；
- 多传感器状态变化或异常。

### 研究问题

- small trigger model 是否优于 LLM-as-trigger；
- 低成本传感器何时唤醒摄像头/VLM；
- 事件级和连续时间级 trigger；
- trigger calibration、漏检、误唤醒、能耗和隐私；
- 多级级联：always-on tiny model → medium encoder → LLM/VLM。

ProAgent 已使用 on-demand tiered perception；2026 的 TGL 工作进一步显示，结构化事件流可以由小型 temporal graph model 做 trigger 和 routing，只在触发时调用 LLM。

### 一周可验证版本

- 把公开事件或传感器数据转换成 event stream；
- 比较规则、轻量分类器、temporal model、LLM trigger；
- 测 AUC/F1、false wake、missed event、延迟、模型调用数。

### 资源

低到中，且非常适合每周快速迭代。小 trigger 通常不需要 A100；GPU 留给 encoder 或下游 Agent。

## 6. 方向五：Wearable / Physiological Longitudinal Memory

### 已有压力

- VitalAgent 已经提出 longitudinal physiological memory、ECG/PPG 工具推理和 proactive monitoring；
- ProMemAssist 已经用多模态信号建立 working-memory model 并预测介入时机；
- ContextAgent / ProAgent 已经覆盖 wearable video/audio context、persona 和主动工具调用；
- AwareLLM 已开始融合 gaze、pupillometry、posture 与心脏活动；
- PH-LLM、NormWear 等已覆盖 wearable time series 的表示与健康建议。

因此，“把 IMU/生理数据输入 LLM，然后主动提醒”本身不够新。

### 更有空间的切口

1. **个体变化而不是群体分类**  
   研究相对个人 baseline 的异常、长期漂移和适应。
2. **state transition memory**  
   保存状态变化、恢复过程和触发后的后果，而不是保存原始窗口摘要。
3. **多时间尺度**  
   秒级动作、小时级疲劳、日级睡眠、周级习惯共同决定是否介入。
4. **反事实干预记忆**  
   记住什么干预在什么状态、对什么人有效或无效。
5. **uncertainty-aware escalation**  
   低置信度时询问，高风险或持续异常时升级，而不是直接给医疗结论。
6. **sensor-to-action benchmark**  
   从生理流到 silence / ask / notify / log / escalate 的完整闭环，而不是只做分类或 QA。

### 一周可验证版本

- 使用公开 IMU/PPG/ECG 数据，不先采自有数据；
- 将连续信号切成可控事件序列；
- 建立 static classifier、personal baseline、history-aware model 三类基线；
- 先测触发与状态更新，不生成医疗建议。

### 资源

中。传统时序 encoder 和轻量融合模型可在 1–2 卡运行；大规模 wearable foundation model 预训练不适合当前 6–8 周主循环。

## 7. 方向六：Interruptibility、Receptivity 与 JITAI

主动 Agent 不仅要判断用户是否需要帮助，还要判断用户此刻是否愿意、是否有能力响应。

### 关键拆分

```text
need      = 用户是否可能受益
timing    = 当前是否为机会窗口
receptivity = 用户是否愿意接收
feasibility = 用户此刻是否能够执行
delivery  = 用什么通道和强度
```

### 产品场景

- 压力、疲劳、久坐、睡眠、训练恢复；
- 进入/离开地点；
- 对话或任务的自然断点；
- 驾驶、会议、专注工作；
- 牙齿清洁、服药、康复等习惯行为；
- 环境热、噪声与舒适度。

### 论文切口

- 把 proactive agent 的 gate 与 JITAI decision point 统一；
- uncertainty-aware scheduling；
- micro-randomized trial 或 contextual bandit；
- 长期 habituation、notification fatigue 和干预衰减；
- need 与 receptivity 分离；
- 行为改变而不是点击/接受作为长期结果。

### 一周可验证版本

先做离线 replay：给定上下文和历史，预测 accept / feasible / act；随后再做极小规模体验采样，不把用户研究作为第一周阻塞项。

### 资源

模型训练成本低，数据和人类评测成本高。更适合 UbiComp/IMWUT/CHI，而不是只报模型准确率。

## 8. 方向七：Continual Personalization 与 Concept Drift

### 研究问题

- 不同用户值得写入的内容不同；
- 相同传感器模式对不同用户含义不同；
- 用户偏好、作息、身体状态和可接受介入方式都会变化；
- 个性化可能帮助，也可能产生 irrational personalization；
- 少量个人反馈能否快速校准 trigger 和 intervention policy。

### 产品价值

这是产品长期使用的核心：主动系统若不能个体化，误报和打扰会随使用时间累积。

### 一周可验证版本

- leave-one-user-out；
- global model、per-user calibration、few-shot adapter；
- 冷启动到第 N 天的 learning curve；
- 记录 personalization gain、calibration、forgetting 和隐私成本。

### 资源

低到中。小型 adapter、classifier head 或 calibration layer 很适合快速迭代。

## 9. 方向八：Delivery Modality / Unobtrusive Interaction

Proactivity 的 `How` 不只是文本内容，还包括输出通道：

```text
no output
silent logging
visual peripheral cue
haptic
short audio
notification
AR overlay
ambient light / object actuation
clarifying question
automatic tool action
human escalation
```

Sensible Agent 和 SocialMind 已表明，输出方式与时机本身可以成为研究问题。

### 可做切口

- 根据 cognitive load、social presence 和风险选择通道；
- 分级披露：先微弱 cue，用户响应后再展开；
- interruptibility-aware modality routing；
- 用户对不同通道的长期适应与厌烦；
- 同一 intent 下 timing × modality × content 的因子实验。

### 资源

模型成本低，原型和用户研究成本中等。可先用手机、手表和桌面模拟，不必立即制作新硬件。

## 10. 方向九：Personal Informatics

个人数据的价值链不只是提醒：

```text
decide what to track
→ collect
→ interpret
→ reflect
→ plan
→ act
→ evaluate consequence
```

这给 Memory 提供更完整的产品角色：记录因果假设、行动与后果，支持人做长期反思，而不是只保存聊天事实。

### 可做切口

- Agent 主动发现数据缺口；
- 根据目标改变 tracking plan；
- 将传感器变化与日记、日程、环境事件联系起来；
- 生成可验证的个人实验，而不是泛化建议；
- 记住建议采纳与否及后续结果。

这条线适合 UbiComp/CHI，也可以与 Auto Research 的“实验—结果—记忆”结构形成方法互通，但二者应用对象不同。

## 11. 方向十：Proactive Memory Maintenance

Agent 主动行为的目标可以是改善未来的记忆状态，而不是立刻完成用户任务：

- 发现冲突时询问；
- 推断的偏好在高风险使用前确认；
- 到期时重新验证；
- 识别需要删除或降权的信息；
- 发现感知缺口时请求额外传感器或自报告；
- 选择一次低打扰问题，减少未来多次错误干预。

这可以形式化为 value of information，是 Memory 和 Proactive 的深层交叉，尚比“主动提醒”更有研究空间。

## 12. 方向十一：Background Anticipation

Agent 利用用户不交互的时间：

- 预取资料；
- 生成候选方案；
- 检查未来依赖；
- 预计算可能需要的工具结果；
- 只在置信度和价值足够时向用户展示。

关键研究问题不是“能否提前做”，而是：

- 猜错需求造成多少算力浪费；
- 是否侵犯隐私或越过权限；
- 何时只准备、何时通知、何时执行；
- 如何从用户采纳/拒绝历史学习。

## 13. 方向十二：Privacy-Preserving Always-on Intelligence

Always-on agent 的论文问题可以直接围绕“最小必要感知”：

- 低成本/低隐私传感器先筛选；
- 只在必要时打开摄像头或上传云端；
- 原始生理数据留在设备端，只上传结构化事件；
- 可审计的 trigger 与数据保留策略；
- 用户可撤销、可删除、可查看为何触发。

HabitSense 的 selective recording 与 ProAgent 的 tiered perception 都说明，感知预算、隐私预算和推理预算可以统一成一个主动决策问题。

## 14. 当前最重要的判断

用户原先的三类方向可以重写为：

| 原方向 | 更细的论文族 |
| --- | --- |
| 现有 Memory / Proactive 优化 | Memory Core、Prospective Memory、Proactive Retrieval、Personalization、Memory Maintenance |
| 生理多模态 | Physiological Longitudinal Memory、JITAI、Concept Drift、Active Sensing |
| 新触发/产品实现 | Wake-up Trigger、Prospective Cue、Uncertainty Trigger、Delivery Modality、Ambient/AR Interaction、Privacy-aware Sensing |

真正新增且值得重点考虑的不是第四个孤立大方向，而是四条横切轴：

1. **未来意图轴**：retrospective memory → prospective memory；
2. **感知轴**：always-on LLM → active sensing / small trigger；
3. **个体轴**：global model → continual personalization；
4. **干预轴**：文本通知 → receptivity-aware multimodal delivery。

这些轴可以与现有三条主线组合，生成多个论文分支。

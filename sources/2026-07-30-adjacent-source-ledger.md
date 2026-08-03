# Literature Source Ledger

更新日期：2026-07-31

用途：记录六个方向的原始论文、benchmark 与方法来源。`verified` 表示已打开论文/官方页面核对标题与摘要中的核心主张，不表示复现实验、认可论文结论或完成 novelty search。论文簇与 idea tree 见 `LITERATURE_MAP.md`。

## Canonical Track Mapping

同一来源可以形成多个 related-work tag，但以下表格指定本项目的主要归档位置：

| Canonical branch | 主要来源 |
| --- | --- |
| M-AI | LoCoMo、LongMemEval、MemoryArena、MemGPT、Mem0、A-MEM、MemTX、MemTxn、STALE、PersistBench、GateMem、MemSecBench、Origin-bound Authority |
| M-PHY | NormWear、PaPaGei、LSM-2、OpenMHC、GLOBEM、PH-LLM、PHIA、WAG、VitalAgent |
| P-AI | ProactiveBench、ProCIS、ProEvent、π-Bench、ProAgentBench、AgentAbstain、ATRBench、PROBE |
| P-PHY | JITAI framework、HeartSteps、MRT methods、ContextAgent、ProAgent、PULSE、SigmaScheduling、Post-intervention Response |
| U-AI | LaMP、LongLaMP、AI PERSONA、RealPref、HorizonBench、PERMA、BenchPreS、Persona2Web、PersonaFeedback、PerMemBench、RPEval、PAHF、SAGER |
| U-PHY | GLOBEM、On-device Few-shot HAR、Uncertainty-aware HAR、Personalized Digital Health、PH-LLM、MRT methods |
| Product / UbiComp evidence | Opportune Smart Speaker、Sensible Agent、SocialMind、HabitSense、Personal Health Informatics、UbiComp Program |

Active Sensing、JITAI、Prospective Memory、Delivery Modality 等是 tag，不是一级主线。

| ID | 方向 | 来源与状态 | 本轮采用的证据边界 |
| --- | --- | --- | --- |
| PM-Bench | Prospective Memory | [arXiv:2607.12385](https://arxiv.org/abs/2607.12385), 2026 preprint, verified | 延迟意图需要在未来时间/事件/环境 cue 出现时执行；提供七天模拟任务。 |
| ProactAgent | Proactive Retrieval | [arXiv:2604.20572](https://arxiv.org/abs/2604.20572), 2026 preprint, verified | 把 retrieval 作为 policy action，用 paired branches 学习何时、检索什么。 |
| Proactive Memory Agent | Memory Intervention | [arXiv:2607.08716](https://arxiv.org/abs/2607.08716), 2026 preprint, verified | 独立 memory agent 更新 bank，并选择注入 reminder 或保持静默。 |
| ProAct | Background Anticipation | [arXiv:2605.25971](https://arxiv.org/abs/2605.25971), 2026 preprint, verified | 使用 idle-time compute、对话历史和持久 memory 预判后续需求。 |
| TGL Trigger | Wake-up Trigger | [arXiv:2605.30152](https://arxiv.org/abs/2605.30152), 2026 preprint, verified | 用小型 temporal graph model 处理事件流，只在 trigger 后调用 LLM。 |
| ContextAgent | Sensory Proactivity | [arXiv:2505.14668](https://arxiv.org/abs/2505.14668), 2025 preprint, verified | 用 wearable video/audio context 与 persona 预测是否主动服务，并调用工具。 |
| ProAgent | Active Sensing | [arXiv:2512.06721](https://arxiv.org/abs/2512.06721), 2025 preprint, verified | always-on 低成本信号与 on-demand 高成本视觉构成 tiered perception。 |
| ProMemAssist | Working Memory / Timing | [arXiv:2507.21378](https://arxiv.org/abs/2507.21378), 2025 preprint, verified | 根据多模态信号维护工作记忆，并在帮助价值与打扰成本间选择时机。 |
| VitalAgent | Physiological Memory | [arXiv:2605.29483](https://arxiv.org/abs/2605.29483), 2026 preprint, verified | longitudinal physiological memory、ECG/PPG 工具推理和 proactive monitoring。 |
| AwareLLM | Psychophysiological Agent | [arXiv:2605.09625](https://arxiv.org/abs/2605.09625), 2026 preprint, abstract checked | 融合 egocentric vision、gaze、pupillometry、posture 和 heart activity 做主动协作。 |
| PH-LLM | Personal Health LLM | [arXiv:2406.06474](https://arxiv.org/abs/2406.06474), 2024 preprint, verified | Fitbit/Pixel Watch 时间序列上的睡眠、运动洞察与建议；强调安全与专家评测。 |
| NormWear | Wearable Foundation Model | [arXiv:2412.09758](https://arxiv.org/abs/2412.09758), 2024 preprint, verified | 在 PPG/ECG/EEG/GSR/IMU 上预训练并与文本表示对齐。 |
| Wearable Health General Intelligence | Wearable Foundation Model / Personal Health Agent | [arXiv:2605.22759](https://arxiv.org/abs/2605.22759), `Towards a General Intelligence and Interface for Wearable Health Data`, 2026 preprint, official abstract verified | 摘要报告超过一万亿分钟、五百万参与者的未标注传感器预训练，并在 35 个 health prediction tasks 上评测；只用于说明 population-scale representation 的强规模压力，不代表本项目复现或认可其全部结果。 |
| Wearable Behavior FM | Wearable Representation | [arXiv:2507.00191](https://arxiv.org/abs/2507.00191), 2025 preprint, abstract checked | 大规模 wearable behavioral signals 的 foundation model 与多类健康预测。 |
| AURA-MFM | IMU–Language Alignment | [arXiv:2506.03174](https://arxiv.org/abs/2506.03174), 2025 preprint, abstract checked | 对齐 third-person video、motion capture、IMU 与 text。 |
| PerMemBench | Personalized Memory | [arXiv:2605.25535](https://arxiv.org/abs/2605.25535), 2026 preprint, verified | 不同用户具有不同的 memory value；研究 personalized storage gating。 |
| RPEval | Rational Personalization | [arXiv:2601.16621](https://arxiv.org/abs/2601.16621), 2026 preprint, verified | irrelevant memory 会干扰 intent understanding，评测何时不应使用个性化记忆。 |
| PersonaMem | Dynamic User Profile | [arXiv:2504.14225](https://arxiv.org/abs/2504.14225), 2025 preprint, abstract checked | 跨 session 追踪动态用户画像与偏好演化。 |
| On-device Few-shot HAR | Concept Drift | [arXiv:2508.15413](https://arxiv.org/abs/2508.15413), 2025 preprint, verified | 针对新用户的 concept drift，用设备端少样本适配分类头。 |
| SigmaScheduling | JITAI Timing | [arXiv:2507.10798](https://arxiv.org/abs/2507.10798), 2025 preprint, verified | 根据行为时间预测的不确定性动态安排 intervention decision point。 |
| Mental Health Receptivity | JITAI Receptivity | [arXiv:2508.02817](https://arxiv.org/abs/2508.02817), 2025 preprint, verified | 区分 intervention acceptance 与 feasibility，并使用被动感知上下文。 |
| Smartwatch JITAI | Contextual Intervention | [arXiv:2501.09530](https://arxiv.org/abs/2501.09530), 2025 preprint, verified | 基于环境、个体历史和微调查在手表上提供热/噪声干预。 |
| Opportune Smart Speaker | Interruptibility | [DOI:10.1145/3411810](https://doi.org/10.1145/3411810), IMWUT 2020, verified | 家庭活动、忙碌、情绪、移动与 social presence 影响主动语音介入时机。 |
| Sensible Agent | Delivery Modality | [arXiv:2509.09255](https://arxiv.org/abs/2509.09255), 2025 preprint, verified | 同时调整提供什么帮助和用什么低打扰方式表达。 |
| SocialMind | Proactive AR | [arXiv:2412.04036](https://arxiv.org/abs/2412.04036), 2024 preprint, verified | 多模态社会线索、AR 眼镜与对话中的及时建议。 |
| HabitSense | Selective Sensing / Privacy | [DOI:10.1145/3678591](https://doi.org/10.1145/3678591), IMWUT 2024, verified from author manuscript | 用 IMU/热成像等先判断事件，只在必要时记录并做端侧隐私处理。 |
| Personal Health Informatics | Personal Informatics | [DOI:10.1145/3749503](https://doi.org/10.1145/3749503), IMWUT 2025, verified | GAI 支持 personal tracking 的 planning、tracking、reflecting 与 acting。 |
| UbiComp/ISWC 2025 Program | Venue evidence | [official program](https://www.ubicomp.org/ubicomp-iswc-2025/program/), verified | 官方议程覆盖 proactive AR、wearable multimodality、personal health、activity recognition 和 edge agents。 |
| Hidden in Memory | Memory Poisoning | [arXiv:2605.15338](https://arxiv.org/abs/2605.15338), 2026 preprint, verified | 外部上下文可植入延迟触发的持久 memory poison；自然任务表现正常不代表未来安全。 |
| Securing LLM-Agent Long-Term Memory | Origin-bound Authority | [arXiv:2606.24322](https://arxiv.org/abs/2606.24322), 2026 preprint, verified | 将 memory authority 绑定到来源，并讨论 laundering attack 与机器可检验保证。 |
| MetaMem | Meta-memory | [arXiv:2602.11182](https://arxiv.org/abs/2602.11182), 2026 preprint, verified | 用可演化 meta-memory 教 Agent 如何利用碎片化历史，而不只增加存储。 |
| Multi-Agent Memory | Shared Memory Architecture | [arXiv:2603.10062](https://arxiv.org/abs/2603.10062), 2026 position paper, verified | 从共享/分布式记忆、一致性和访问控制讨论多 Agent memory 设计空间。 |
| Collaborative Memory | Multi-user Memory | [arXiv:2505.18279](https://arxiv.org/abs/2505.18279), 2025 preprint, verified | 研究多用户、多 Agent 的动态、非对称 memory sharing 与访问权限。 |
| TMEM | Parametric Self-evolution | [arXiv:2606.04536](https://arxiv.org/abs/2606.04536), 2026 preprint, abstract checked | 将显式 memory 与 episode 内快速 LoRA 更新结合，形成 parametric memory novelty pressure。 |
| MUSE-Autoskill | Skill Memory | [arXiv:2605.27366](https://arxiv.org/abs/2605.27366), 2026 preprint, abstract checked | 把 skill creation、memory、管理、测试和运行反馈组织为持续演化 lifecycle。 |
| PAHF | Continual Personalization | [arXiv:2602.16173](https://arxiv.org/abs/2602.16173), 2026 preprint, verified | 通过行动前澄清、memory 与行动后反馈做在线个性化，并考虑 persona shift。 |
| PPP | Proactivity × Personalization | [arXiv:2511.02208](https://arxiv.org/abs/2511.02208), 2025 preprint, verified | 在 UserVille 中联合训练 Productivity、Proactivity、Personalization，直接形成 P-AI×U-AI 压力。 |
| SAGER | Personalized Policy Skill | [arXiv:2604.14972](https://arxiv.org/abs/2604.14972), 2026 preprint, abstract checked | 为每个用户持续演化独立的决策 policy skill，区分“记住偏好”和“个性化推理方式”。 |
| Post-intervention Response | Physiological Response Personalization | [arXiv:2604.14738](https://arxiv.org/abs/2604.14738), 2026 preprint, abstract checked | 预测 wearable intervention 后 15–120 分钟生理轨迹；支持 U-PHY pilot，但预测不等于因果效应。 |
| MRT Methods | Causal JITAI Evaluation | [PMC9276848](https://pmc.ncbi.nlm.nih.gov/articles/PMC9276848/), methods paper, verified | Micro-randomized trial 与 causal excursion effect 用于回答何时、对谁、哪种介入有效。 |
| Generative Agents | Memory Stream / Reflection | [arXiv:2304.03442](https://arxiv.org/abs/2304.03442), 2023 paper, verified | 保存完整经验、生成高层 reflection 并动态检索用于规划；主要评测 believable behavior。 |
| MemoryBank | Long-term Companion Memory | [arXiv:2305.10250](https://arxiv.org/abs/2305.10250), 2023 preprint, verified | 存储对话、事件摘要与用户画像，并以遗忘曲线式机制更新；实验偏 recall 与陪伴质量。 |
| MemGPT | Hierarchical Memory Runtime | [arXiv:2310.08560](https://arxiv.org/abs/2310.08560), 2023 preprint, verified | 用类似操作系统的多层 memory 和 interrupt 管理有限上下文。 |
| LoCoMo | Long Conversational Memory | [arXiv:2402.17753](https://arxiv.org/abs/2402.17753), ACL 2024, verified | 最长 35 个 session、约 300 turns；评测 QA、event summarization 与多模态对话生成。 |
| LongMemEval | Long-term Interactive Memory | [arXiv:2410.10813](https://arxiv.org/abs/2410.10813), ICLR 2025, verified | 500 个问题覆盖 extraction、跨 session reasoning、temporal reasoning、knowledge update 与 abstention。 |
| LongMemEval-V2 | Environment Experience Memory | [arXiv:2605.12493](https://arxiv.org/abs/2605.12493), 2026 preprint, verified | 451 个问题评测 web agent 的 state、workflow、gotcha 与 premise awareness；历史可达 500 trajectories。 |
| MemoryArena | Memory–Action Loop | [arXiv:2602.16313](https://arxiv.org/abs/2602.16313), ICML 2026, verified | 用相互依赖的多 session agent tasks，把记忆获取、压缩与未来行动放在同一闭环评测。 |
| Mem0 | Scalable Long-term Memory | [arXiv:2504.19413](https://arxiv.org/abs/2504.19413), 2025 preprint, abstract verified | 动态抽取、整合、检索 conversational memory，并在 LoCoMo 上比较 accuracy、latency 与 token cost。 |
| A-MEM | Dynamic Agentic Memory | [arXiv:2502.12110](https://arxiv.org/abs/2502.12110), NeurIPS 2025, abstract verified | 以 Zettelkasten 式 note、link 与 evolution 动态组织 agent memory。 |
| Zep | Temporal Knowledge Graph Memory | [arXiv:2501.13956](https://arxiv.org/abs/2501.13956), 2025 preprint, abstract verified | 用 temporal knowledge graph 维护事实的历史关系，并在 DMR/LongMemEval 报告 accuracy 与 latency。 |
| MPBench | Memory Poisoning | [arXiv:2606.04329](https://arxiv.org/abs/2606.04329), 2026 preprint, verified | 枚举 memory write channel、结构漏洞与 poisoning attack；表明激进写入/检索会增加攻击面。 |
| MemSecBench | Lifecycle Memory Security | [arXiv:2607.27080](https://arxiv.org/abs/2607.27080), 2026 preprint, verified | 用 Write–Execute–Forget 七个 checkpoint 追踪 persistence、下游后果与 selective repair。 |
| MemGate | Trustworthy Memory Search | [arXiv:2606.06054](https://arxiv.org/abs/2606.06054), 2026 preprint, verified | 把 memory search 视为 trust boundary，在 A-MEM、Mem0、MemOS 与个人 Agent 设置评估 admission gate。 |
| AgentLeak | Multi-Agent Privacy Leakage | [arXiv:2602.11510](https://arxiv.org/abs/2602.11510), 2026 preprint, abstract verified | 评测 output、inter-agent message、shared memory 与 tool argument 等内部泄漏通道。 |
| MOMENT | General Time-series Foundation Model | [arXiv:2402.03885](https://arxiv.org/abs/2402.03885), ICML 2024, abstract verified | 建立 Time-series Pile 与 limited-supervision benchmark；是 wearable 专用模型的通用强基线。 |
| PaPaGei | Open PPG Foundation Model | [arXiv:2410.20542](https://arxiv.org/abs/2410.20542), 2024 preprint, abstract verified | 在公开 PPG 数据上预训练并跨 20 个任务评测，同时报告跨肤色 bias 与跨设备泛化压力。 |
| LSM-2 | Incomplete Wearable Data | [arXiv:2506.05321](https://arxiv.org/abs/2506.05321), 2025 preprint, verified | 用 Adaptive and Inherited Masking 直接从真实不完整 wearable 数据学习，而不是先插值。 |
| Large-scale Wearable SSL | Physiological Representation | [arXiv:2011.04601](https://arxiv.org/abs/2011.04601), 2020 preprint, abstract verified | 用大规模 wrist accelerometer 与 ECG 自监督学习可迁移、包含个体生理信息的表示。 |
| GLOBEM | Longitudinal Generalization | [arXiv:2211.02733](https://arxiv.org/abs/2211.02733), NeurIPS 2022 dataset, abstract verified | 700+ user-years、497 users，支持跨用户、跨年份和跨数据集行为建模评测。 |
| PHIA | Wearable Health Insight Agent | [arXiv:2406.06464](https://arxiv.org/abs/2406.06464), 2024 preprint, abstract verified | 用 code generation 与 retrieval 工具分析 wearable 数据；发布 4000+ health insight QA。 |
| PhysioLLM | Interactive Personal Health Insight | [arXiv:2406.19283](https://arxiv.org/abs/2406.19283), 2024 preprint, verified | 融合 wearable 与上下文进行健康探索，并以 24 名 Fitbit 用户的 user study 评测。 |
| Stress Reproducibility | Cross-device Physiological Generalization | [arXiv:2505.05694](https://arxiv.org/abs/2505.05694), 2025 preprint, abstract verified | 同一 stress pipeline 在研究级和消费级设备间表现变化，直接支持 device provenance 问题。 |
| ProactiveBench | Proactive Assistance Trigger | [arXiv:2410.12361](https://arxiv.org/abs/2410.12361), 2024 preprint, abstract verified | 6790 个 real-activity-derived events，用 human accept/reject 训练与评测主动帮助。 |
| ProCIS | Proactive Conversational Retrieval | [arXiv:2405.06460](https://arxiv.org/abs/2405.06460), SIGIR 2024, abstract verified | 2.8M conversations，评测何时主动检索何种资源，并提出 npDCG。 |
| Ask-before-Plan | Clarification before Planning | [arXiv:2406.12639](https://arxiv.org/abs/2406.12639), 2024 preprint, abstract verified | 评测是否需要澄清、调用工具补信息并形成计划。 |
| ProEvent | Event-centric Proactivity | [arXiv:2607.17701](https://arxiv.org/abs/2607.17701), 2026 preprint, verified | 从即时消息维护事件；评测 response timing、单步/多步 correctness，并包含 event cancellation 压力。 |
| ProAct-75 | Structure-aware Proactive Response | [arXiv:2602.03430](https://arxiv.org/abs/2602.03430), 2026 preprint, verified | 75 tasks、step-level task graph，评测 trigger、saved steps 与 parallel action。 |
| π-Bench | Long-horizon Personal Assistant | [arXiv:2605.14678](https://arxiv.org/abs/2605.14678), 2026 preprint, verified | 100 个多轮任务、5 类 persona、隐藏意图、跨任务依赖与跨 session continuity。 |
| ProAgentBench | Real Continuous Workflow | [arXiv:2602.04482](https://arxiv.org/abs/2602.04482), 2026 preprint, verified | 500+ 小时真实用户 session、28K+ events；拆分 timing prediction 与 assist content generation。 |
| AgentAbstain | Agentic Abstention | [arXiv:2607.10059](https://arxiv.org/abs/2607.10059), 2026 preprint, verified | 263 对 should-act/should-abstain executable tasks；揭示 task success 与 abstention 相互独立及 post-hoc abstention。 |
| ATRBench | Ask-to-Remember | [arXiv:2605.28108](https://arxiv.org/abs/2605.28108), 2026 preprint, verified | 隐藏偏好作为 ground truth，评测 Agent 是否现在询问、以后使用，而不只是回忆已知偏好。 |
| PROBE | Proactive Problem Solving | [arXiv:2510.19771](https://arxiv.org/abs/2510.19771), 2025 preprint, verified | 把 proactivity 拆为发现未明示问题、定位 bottleneck、执行 resolution。 |
| ProactiveVideoQA | Temporal Proactive Interaction | [arXiv:2507.09313](https://arxiv.org/abs/2507.09313), 2025 preprint, abstract verified | 评测视频播放中的主动响应时机，并提出考虑时间动态的 PAUC。 |
| Uncertainty of Thoughts | Active Information Seeking | [arXiv:2402.03271](https://arxiv.org/abs/2402.03271), 2024 preprint, abstract checked | 用 uncertainty-aware rollout 与 information gain 选择问题，覆盖 diagnosis/troubleshooting 等主动询问任务。 |
| JITAI Pragmatic Framework | Intervention Problem Definition | [PMC4732268](https://pmc.ncbi.nlm.nih.gov/articles/PMC4732268/), methods paper, verified | 把动态需求、receptivity 与 provide-nothing option 纳入 JITAI 构造。 |
| JITAI Design Principles | JITAI Components | [PMC5364076](https://pmc.ncbi.nlm.nih.gov/articles/PMC5364076/), methods paper, verified | 定义 decision point、tailoring variable、intervention option、decision rule、proximal/distal outcome。 |
| HeartSteps | Micro-randomized JITAI | [PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/), 2019 paper, verified | 6 周、44 人、每日最多五次随机化建议；直接测 suggestion 对随后步数的近端效应与随时间衰减。 |
| HeartSteps II | Longitudinal JITAI Testbed | [PMC8872509](https://pmc.ncbi.nlm.nih.gov/articles/PMC8872509/), protocol paper, verified | 一年部署，用多时间尺度随机化研究行为理论与实时个性化。 |
| WatchGuardian | User-defined Smartwatch Intervention | [arXiv:2502.05783](https://arxiv.org/abs/2502.05783), 2025 preprint, abstract verified | 让用户定义希望干预的行为并在手表上执行个性化 JITI。 |
| Last JITAI | LLM-issued JITAI | [arXiv:2402.08658](https://arxiv.org/abs/2402.08658), 2024 preprint, abstract verified | 比较 GPT-4、普通人和医护专家产生的 JITAI 决策/内容；human rating 不等于因果效果。 |
| LaMP | Language Model Personalization | [ACL Anthology](https://aclanthology.org/2024.acl-long.399/), ACL 2024, verified | 七个 classification/generation tasks，同时提供新用户与时间切分，建立 history-retrieval personalization 基线。 |
| LongLaMP | Personalized Long-form Generation | [arXiv:2407.11016](https://arxiv.org/abs/2407.11016), 2024 preprint, abstract verified | 覆盖 email、abstract、review、topic 等长文本个性化生成。 |
| AI PERSONA | Lifelong Personalization | [arXiv:2412.13103](https://arxiv.org/abs/2412.13103), 2024 preprint, verified | 明确定义持续适配不断变化用户 profile 的 lifelong personalization 任务。 |
| PersonaFeedback | Explicit-persona Personalization | [arXiv:2506.12915](https://arxiv.org/abs/2506.12915), 2025 preprint, verified | 用 8298 个 human-annotated cases 解耦 persona inference 与 persona-conditioned generation。 |
| RealPref | Long-horizon Preference Following | [arXiv:2603.04191](https://arxiv.org/abs/2603.04191), 2026 preprint, verified | 100 profiles、1300 preferences、显式到隐式四类表达及长上下文评测。 |
| PersoBench | Persona-aware Dialogue | [arXiv:2410.03198](https://arxiv.org/abs/2410.03198), 2024 preprint, verified | 同时评测 fluency、diversity、coherence 与 personalization，说明通用生成质量不等于个性化正确。 |
| Personalized Soups | Personalized Alignment | [arXiv:2310.11564](https://arxiv.org/abs/2310.11564), 2023 preprint, abstract verified | 把相互冲突的偏好视为多目标 alignment，并在推理时合并参数。 |
| PersonaVLM | Long-term Multimodal Personalization | [arXiv:2604.13074](https://arxiv.org/abs/2604.13074), 2026 preprint, abstract verified | 用 chronological multimodal memories 与 evolving personality 做长期 MLLM 个性化。 |
| PerCE | Token-level Personalization | [arXiv:2603.06595](https://arxiv.org/abs/2603.06595), 2026 preprint, abstract verified | 以 causal intervention 估计 token 的 personalization degree，形成 token-aware training 压力。 |
| Personalized Digital Health | Adaptive Support Users | [arXiv:2605.02004](https://arxiv.org/abs/2605.02004), 2026 preprint, verified | 用相似与不相似 support users 训练个体模型，直接暴露 sparse/noisy personal data 与负迁移压力。 |
| Uncertainty-aware HAR | On-device User Adaptation | [arXiv:2606.04798](https://arxiv.org/abs/2606.04798), 2026 preprint, verified | 支持有标注、无标注或无校准的轻量 prototype adaptation，并显式考虑不确定性。 |
| Personalized Stress Monitoring | Longitudinal Free-living Personalization | [arXiv:2108.00144](https://arxiv.org/abs/2108.00144), 2021 paper, abstract verified | 1–3 个月 free-living wearable 数据与主动请求标签，显示个体化和 label budget 压力。 |
| Federated HAR Privacy | Wearable Personalization Privacy | [arXiv:2405.10979](https://arxiv.org/abs/2405.10979), 2024 preprint, abstract verified | 在五个 HAR 数据集展示 federated wearable modeling 的 membership-inference 风险。 |
| MemTX | Transactional Belief Commit | [arXiv:2607.23929](https://arxiv.org/abs/2607.23929), 2026 preprint, verified | 将 memory update 组织为 snapshot-isolated staging 与 commit；用 evidence、permission、provenance 和 validity gate 约束不可逆工具动作，并在 retraction 后触发 typed repair。 |
| MemTxn | Memory Transaction Boundary | [arXiv:2607.27834](https://arxiv.org/abs/2607.27834), 2026 preprint, verified | 以 source-supported update validation、temporal version resolution 和 durable snapshot recovery 约束 stateful memory 更新。 |
| GateMem | Multi-principal Memory Governance | [arXiv:2606.18829](https://arxiv.org/abs/2606.18829), 2026 preprint, verified | 在 shared-memory agent 中联合评测 utility、access control 与 active forgetting，形成家庭/办公/医疗/教育多主体治理压力。 |
| STALE | Implicit Memory Invalidation | [arXiv:2605.06527](https://arxiv.org/abs/2605.06527), 2026 preprint, verified | 研究新信息并不显式否定旧记忆、但已使其失效的场景；评测 state resolution、premise resistance 与 policy adaptation。 |
| PersistBench | Cross-context Forgetting | [arXiv:2602.01146](https://arxiv.org/abs/2602.01146), ICML 2026, verified | 评测长期记忆何时应被忘记，覆盖跨域泄漏与 memory-induced sycophancy；直接压缩泛化“偏好冲突/遗忘”主张。 |
| Commit-Time Authorization | Durable-effect Authorization | [arXiv:2607.10487](https://arxiv.org/abs/2607.10487), 2026 preprint, verified | 主张 durable effect 只有在 commit 时 authority witness 仍 fresh、causal、bound 且 eligible 才可生效，直接形成 C02 的强邻近覆盖。 |
| OpenMHC | Wearable Foundation Model Benchmark | [arXiv:2607.16235](https://arxiv.org/abs/2607.16235), 2026 preprint, verified | 汇集超过 6000 万小时、19 类 sensor channels、11894 名参与者，并统一 downstream prediction、imputation 与 forecasting 评测。 |
| WAG | Personalized Wearable Graph Retrieval | [arXiv:2605.18763](https://arxiv.org/abs/2605.18763), 2026 preprint, verified | 以 query-conditioned graph retrieval 为个体 wearable 数据提供上下文化 LLM reasoning，压缩泛化“wearable-to-language memory”主张。 |
| PULSE | Passive-sensing Proactive Investigation | [arXiv:2605.17679](https://arxiv.org/abs/2605.17679), 2026 preprint, verified | Agent 自主选择 passive sensing modality 与 lookback depth，并结合个体 baseline 做癌症生存者主动介入；对 active sensing 与 proactive health 形成直接压力。 |
| HorizonBench | Evolving Long-horizon Preference | [arXiv:2604.17283](https://arxiv.org/abs/2604.17283), 2026 preprint, verified | 用结构化 mental-state graph 生成六个月偏好演化轨迹，提供每次变化的 ground-truth provenance；直接覆盖长期 preference state tracking。 |
| PERMA | Event-driven Personalized Memory | [arXiv:2603.23231](https://arxiv.org/abs/2603.23231), 2026 preprint, verified | 用跨 session、跨 domain 的事件关系与时序 preference query 评测 persona consistency，超出简单 needle retrieval。 |
| BenchPreS | Context-aware Preference Selectivity | [arXiv:2603.16557](https://arxiv.org/abs/2603.16557), 2026 preprint, verified | 评测第三方沟通中何时应用或抑制持久偏好，直接覆盖 context/role-conditioned preference selectivity。 |
| Persona2Web | Personalized Web Agent | [arXiv:2602.17003](https://arxiv.org/abs/2602.17003), 2026 preprint, verified | 以隐式长期用户历史和歧义 web query 评测 personalized agent 的 contextual reasoning，并拆分 reasoning evidence。 |

## 使用规则

1. 写论文 related work 前重新打开最新版本，不从本表复制结论充当全文核验。
2. 表中的作者报告结果不能当作本项目已经复现的结果。
3. 2026 preprint 的存在足以形成 novelty pressure，但不能被描述为稳定共识。
4. 新实验引用某个 benchmark 时，应单独记录数据许可、代码版本、commit 和本地快照。
5. 本账本的 source 数量不是 coverage 质量；立项前仍需按 cluster 做系统检索、citation chase 与代码/数据许可核对。

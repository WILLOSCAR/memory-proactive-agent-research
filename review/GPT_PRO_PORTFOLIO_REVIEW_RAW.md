# Research Program Review

## 1. Brutally Honest Executive Verdict

结论：

当前项目不是“不合理”，但还没有收敛成一个顶会级 paper portfolio。它更像一个优秀的 research operating system + 6 个潜在研究市场。最大风险不是方向错误，而是研究注意力稀释。

当前 3×2：

Memory × General/Physiological

Proactive Agent × General/Physiological

Personalization × General/Physiological

作为 research operations taxonomy 是成立的；作为 学术 ontology 不成立。

这一点与你们自己的 self-audit 基本一致：3×2 的价值是把“保留什么 / 何时行动 / 为谁适应”三个根问题和 physiological setting 分离，而不是声明六个独立学科。

bridge--decisions-portfolio-sel…

我的判断：

Memory：成立，甚至可能是未来 6–12 个月最强主线。

Proactive Agent：成立，但 novelty pressure 最大，需要避免“什么时候提醒用户”这种宽泛叙事。

Personalization：成立，但目前最危险，因为大量工作会退化成 preference memory。

Physiological：不是独立 novelty 来源，而是提高问题难度和评测质量的 setting。

Security / Meta-memory / Self-evolution / Causality：不是第四主线，应作为 forcing function。

Auto Research：这是生产系统，不应该成为 paper。

最终 verdict：

Promising but Over-Broad

需要收敛，不需要推翻。

## 2. Taxonomy: Keep / Modify / Replace

Verdict: Modify

不要 Replace。

保留：

Root Problem
├── Memory
├── Proactive Decision
└── Personal Adaptation

第二层不要叫 General vs Physiological。

建议改成：

Research Program

01 Memory Systems
   ├── M-AI: Agent memory
   └── M-Embodied: temporal/user/sensor memory

02 Intervention Policies
   ├── P-AI: digital agent intervention
   └── P-Embodied: contextual intervention

03 Adaptive User Models
   ├── U-AI: user modeling
   └── U-Embodied: personalized adaptation

原因：

“physiological”太窄。

例如：

wearable；

AR；

audio；

location；

activity；

environment；

它们共享的问题不是“生理”，而是：

agent 在 noisy longitudinal human state 下如何决策。

目前 PROGRAM_MAP 已经意识到这一点：生理数据改变 observation space、时间尺度、不确定性、privacy 和 evaluation，而不是改变根问题。

bridge--glossary-program-map--8…

### Primary branch assignment rule

不要按组件分。

错误：

“用了 memory，所以 Memory paper。”

正确：

问：

删除哪个模块，论文核心 claim 消失？

规则：

| Main causal variable | Primary |
| --- | --- |
| memory write/update/retrieve/forget | Memory |
| intervention timing/action selection | Proactive |
| user adaptation/personal policy | Personalization |

这个规则已经写入现有 map。

bridge--glossary-program-map--8…

## 3. Corrected Program Map

我建议：

```text
                    Human-Agent Loop

                         |
        ------------------------------------
        |                 |                |
     Remember          Decide           Adapt
        |                 |                |
    Memory          Proactive        Personalization
        |
        +--------------------------------+
                         |
              Horizontal Research Forces

  - provenance/security
  - uncertainty/meta-memory
  - multi-agent/shared memory
  - self-evolution
  - causal intervention
  - autonomy/control
  - privacy
  - active sensing
  - efficiency
```

不要升级：

memory security

multi-agent memory

self-evolving agents

成为一级线。

原因：

它们回答：

“memory 如何更安全？”

而不是：

“agent 为什么需要 memory？”

source ledger 中这些方向也更像横切压力，而不是新的 root question。

bridge--literature-2026-07-30-a…

## 4. Missing Directions and Their Proper Level

### 4.1 Memory Security / Poisoning

定位：

M-AI + Security lens

价值很高。

原因：

现在 memory 最大问题不是 recall，而是：

为什么相信这个 memory？

潜在强 claim：

Provenance-aware memory reduces long-horizon failure under adversarial memory updates.

不要做：

“提出一个 memory schema”。

已经太弱。

### 4.2 Meta-memory / Uncertainty

定位：

M-AI + P-AI

这是我认为非常值得关注的方向。

真正问题：

普通 memory：

retrieve relevant memory

meta-memory：

should I trust this memory?

how confident am I?

when should I ignore memory?

这是从 retrieval 进入 reasoning control。

### 4.3 Multi-user / Multi-agent Shared Memory

定位：

M-AI secondary.

机会：

高。

但是不要做：

“multi-agent memory architecture”。

太容易变系统工程。

应该做：

authority, visibility, conflict resolution.

### 4.4 Self-evolving Agents

定位：

M-AI / U-AI。

风险：

已经拥挤。

必须回答：

“memory 和 parameter update 的边界是什么？”

否则只是：

skill library + feedback。

### 4.5 Continual Co-adaptation

定位：

U-AI/U-PHY。

这是 Personalization 真正核心。

不是：

remember user likes coffee

而是：

user changes

agent changes

interaction changes

### 4.6 Causal Intervention

定位：

P-PHY/U-PHY。

这是 physiological 最大机会。

因为 wearable 最大问题：

预测 ≠ 干预有效。

source ledger 已明确：

Post-intervention response 支持 prediction，但 prediction 不等于 causal effect；MRT 才能回答 intervention 是否有效。

bridge--literature-2026-07-30-a…

## 5. Ranked Paper Seed Table

| Rank | Branch | Claim | Novelty | Cheap falsification | Verdict |
| --- | --- | --- | --- | --- | --- |
| 1 | M-AI | Agent should learn when memory is unreliable, not only what memory to retrieve | method/analysis | 100-300 memory QA replay + uncertainty baseline | pursue |
| 2 | P-AI | Calibrated intervention policy beats relevance-only proactive agents under interruption cost | benchmark+method | offline replay cost curve | pursue |
| 3 | U-PHY | Personal baseline adaptation improves wearable intervention decisions under drift | benchmark/method | public wearable split by user | pursue |
| 4 | M-AI | Provenance-aware memory prevents delayed memory poisoning | security benchmark | synthetic poison injection | pursue |
| 5 | U-AI | Personalization should learn when not to personalize | benchmark | persona memory ablation | pursue |
| 6 | P-PHY | Context + receptivity improves intervention timing | analysis/system | existing JITAI data replay | watch |
| 7 | M-PHY | Multi-timescale physiological memory improves longitudinal understanding | method | sensor history benchmark | watch |
| 8 | U-AI | User-specific policy skills outperform preference memory | method | few-shot personalization | watch |
| 9 | M-AI | Meta-memory improves long-context agent reasoning | method | memory confidence benchmark | watch |
| 10 | P-AI | Active retrieval is better than always retrieval | method | retrieval policy simulation | watch |
| 11 | M-PHY | Wearable foundation memory model | foundation model | requires scale | park |
| 12 | Product | Smartwatch proactive assistant | system | prototype only | product/HCI |

### Best Three Tracks

#### Track 1 — Calibrated Proactive Agent

Primary:

P-AI

Why:

这是最容易形成 AI story 的。

核心：

不是：

agent can proactively help

而是：

agent learns when intervention is worth the interruption cost.

Metric:

```text
utility =
benefit
- interruption cost
- false alarm cost
- privacy cost
```

cheap test：

不用训练。

先：

GPT baseline

relevance score

threshold policy

oracle

#### Track 2 — Memory with Trust / Provenance

Primary:

M-AI

原因：

Memory 未来最大瓶颈不是 storage。

是：

memory ≠ truth

实验：

poisoned memory benchmark。

资源：

CPU/API。

#### Track 3 — Personalization under Drift

Primary:

U-AI/U-PHY

不要做：

persona.

做：

adaptation.

核心：

用户变化后：

old memory

+

new evidence

=

policy update

## 6. Six-to-Eight-Week Iteration Plan

### Weekly structure

符合现有 resource-aware iteration：

Rung 0:

claim + killer baseline

↓

Rung 1:

oracle/replay

↓

Rung 2:

pilot

↓

Rung 3:

LoRA

↓

Rung 4:

confirmation

现有方案也是如此设计。

bridge--reference-weekly-iterat…

### Week 1-2

目标：

不要训练。

每条线：

产出：

benchmark slice

failure taxonomy

baseline curve

GPU:

### Week 3-4

只允许两个 heavy:

GPU 1

Proactive policy

GPU 2

Memory trust model

其他：

CPU/API。

### Week 5-6

如果 pilot 成功：

LoRA

ablation

multi-model

否则 kill。

### Week 7-8

只保留：

2 个 paper。

开始：

claim evidence

paper skeleton

reviewer attack

## 7. Asset Protocol Audit and Minimum Viable Schema

总体评价：

v0.2 已经接近专业 research infra。

最大风险：

不是不足。

是过重。

当前设计已经覆盖：

Track→Experiment→Run→Artifact；

immutable artifact；

claim evidence；

negative/failed/invalid；

source truth/cache；

physiological governance。

bridge--reference-asset-protoco…

但是需要删减。

### 必须保留

Track

必须：

claim

baseline

decision rule

owner

Experiment

必须：

hypothesis

metric

baseline

stop condition

resource ceiling

Run

自动生成：

commit

data hash

model

prompt version

GPU

time

output path

### 应自动化

不要人工填写：

GPU info

SSH host

mount

git diff

timestamp

checkpoint hash

### 可以 optional

以下不要强制：

parent_experiment

secondary tags

long narrative

### Minimum viable schema

Track

Claim

Experiment

Run Manifest

Artifact

Decision

足够。

## 8. Venue / Product Split

### Best Track 1: Proactive Agent

AI venue:

最好。

贡献：

benchmark

policy

calibration

不是：

watch app。

### Best Track 2: Memory Trust

AI venue。

方向：

benchmark

security analysis

method

### Best Track 3: Physiological Adaptation

两条路线：

AI：

如果有：

generalizable adaptation method

UbiComp:

如果有：

wearable system

deployment

user study

产品：

只能作为：

research vehicle

不能成为：

“我们做了一个智能手表助手”。

## 9. Portfolio Kill Criteria and Failure Modes

### Kill 1

两周内：

没有：

clear claim

killer baseline

cheap falsification

kill。

### Kill 2

提升来自：

bigger model

more tokens

more retrieval

不是方法。

kill。

### Kill 3

PHY：

只是：

LLM + wearable dataset

kill。

### Kill 4

Personalization:

如果只是：

remember preference

kill。

### Kill 5

Proactive:

如果无法定义：

false positive cost

kill。

## 10. Next Five Actions for Codex and User

1.

建立三个 paper track：

优先：

P-AI calibrated proactive

M-AI trusted memory

U-AI/U-PHY adaptation

不要维护六个 paper。

2.

每个 track 写一页：

包含：

one sentence claim

killer baseline

failure condition

3.

实现统一 replay benchmark harness

不要先做模型。

4.

把 asset protocol 自动化

优先：

run manifest collector。

5.

两周后做第一次 kill review

强制：

continue

branch

park

kill

## Final Judgment

Promising but Over-Broad

理由：

这个项目最大的价值不是“六个方向都做”，而是已经形成了一个非常强的研究操作系统：source → idea → track → experiment → run → artifact → decision 的证据链。

bridge--brief-project-brief--36…

但是当前 portfolio 仍然像一个研究地图，而不是论文计划。

未来 6–8 周应该从：

6 branches × many ideas

收敛到：

3 core claims
+
cheap falsification
+
2 heavy experiments
+
1-2 publishable stories

如果完成这个收敛，它可以成为：

Strong Research Program

否则会长期停留在：

“覆盖面很广、资产很多、但没有一篇 paper 足够尖锐”。

目前判断：

Promising but Over-Broad

# ADR-0002: Keep Settlement Globally Serialized First

- Status: accepted
- Date: 2026-08-10

## Context

多 Track 并行会制造写冲突，但当前 Settlement writer 已有全局锁、revision 校验和 durable journal。立即按 Track 分片会引入跨 Track link、Paper Project ownership、跨 shard revision 和恢复语义的新复杂度，而当前没有持续锁等待的测量证据。

## Decision

继续使用全局串行 Settlement。每个 writer 在最新 revision 上提交一个短、原子的 multi-change event；研究、实现和实验可并行，canonical 结算排队。

## Revisit trigger

只有同时满足以下条件才重新评估 sharding：

1. 记录到持续、可复现的锁等待或 settlement throughput blocker；
2. Track / Candidate / Paper Project 的唯一 ownership 已登记；
3. cross-shard link、revision、journal recovery 与 Dashboard consistent read 协议已有可验证设计。

## Consequences

当前更容易解释和恢复，但并行 Student 的 Handoff 可能短暂排队。排队不等于失败，也不能让不同 Chat 绕过 writer 直接改 index/event。

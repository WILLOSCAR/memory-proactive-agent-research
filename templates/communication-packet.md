# Communication Packet

```yaml
packet:
  packet_id: COM-YYYYMMDD-NNN
  type: direction_charter | research_line_brief | instruction_delta | student_handoff | portfolio_handoff | link_proposal | teacher_packet | engineering_incident
  primary_owner: "<role-id>"
  decision_owner: "<role-id>"
  writer:
    role_id: "<role-id>"
    writable_scope: "<exact-scope>"
  from:
    role_id: "<required>"
    thread_id: "<registered-or-unknown>"
  to:
    role_id: "<required>"
    thread_id: "<registered-or-unknown>"
  scope:
    program: PROGRAM
    portfolio_id: "<portfolio-or-PROGRAM>"
    track_id: "<track-or-null>"
    research_line_id: "<research-line-or-null>"
    cycle_id: "<cycle-or-null>"
    candidate_ids: []
  based_on_revision: "sha256:<canonical-revision-or-not-applicable>"
  authority:
    allowed: []
    excluded: []
  payload:
    uri: "<immutable-packet-payload-uri>"
    sha256: "<digest>"
    media_type: "text/markdown | application/json | application/yaml"
  current_judgment: "<stable-pointer-or-bounded-statement>"
  instruction_delta: "<delta-or-not-applicable>"
  judgment_delta: "<stable-pointer-or-no-material-change>"
  evidence_pointers:
    - uri: "<immutable-uri>"
      sha256: "<digest>"
  decision_question: "<one-question-or-null>"
  next_action: "<one-action>"
  completion: "<observable-condition>"
  stop_or_escalate: "<condition>"
  expected_ack: observed | accepted-or-changes-requested-or-rejected
  created_at: "<ISO-8601>"
```

`student_handoff` payload 至少包含：`research_line_id`、`cycle_id`、相关 `candidate_ids`、Brief 指针、预期与实际、五维 Run closure、Evidence/Artifact 指针、失败分类与根因、适用/不适用条件、反例、可复用资产、建议 Decision、下一证据和 Knowledge promotion 建议。

`engineering_incident` payload 至少包含：`incident_id`、`student_id`、`cycle_id`、failure layer、symptom、before evidence、last known good state、Controller 已尝试动作、root-cause confidence、允许/禁止修改范围、验收条件、rollback、`return_to_controller`。Engineer 只修复该 incident；技术终态由 Controller 读回，科研继续由原 Student/Cycle 承接。

Packet 写成后不可原地修改；更正使用新的 Packet 并指向被替代 ID。Delivery receipt 单独写入 ledger。不要把完整论文、日志、Pro 回答或 Chat transcript 填进 Packet；只使用稳定指针、不可变 URI 与 digest。

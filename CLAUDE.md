# Claude Code entry

Read and follow `AGENTS.md` before changing this repository.

For a repository-bound `/goal`, use the exact `tracks/<track-id>/GOAL.md` for a Track Mentor or `tracks/<track-id>/students/<student-id>/GOAL.md` for a Student. That concrete file is both the human launch interface and the binding; shared behavior lives in `templates/track-mentor-goal.md` and `templates/student-goal.md`. A Mentor invocation resolves and completes at most one bounded Mentor Action, then stops.

A Student invocation must recover the sole `initializing / active / paused` Cycle from files, or create exactly one Cycle when none exists and the Workspace is `create-ready`. It hands off and stops before another Cycle begins. Bootstrap Imports are starting pointers, not prior Handoffs or Mentor verdicts. No Prompt renderer or Node command is required. An unbound broad Topic may be inspected, but it must not write `AUTO_RESEARCH_*_STATE.md` at repository root or claim a live Student/Pro binding.

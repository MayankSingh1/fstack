---
name: planner
description: "Plan one job into phases, swarm each phase, and show who owns the step, what was handed off, and where a person must approve. Use for /planner, 'plan this and swarm the phases', or 'orchestrate this job'."
disable-model-invocation: true
---

# Planner

One job, several phases. The planner writes the phases, swarms each one, and carries only that phase's handoff into the next.

This is the orchestration pattern from [Agent Orchestration](https://aiuxplayground.com/pattern/agent-orchestration): people can see who owns the step, what passed between steps, and where a human approves. A phase board is the interface. Do not draw a graph of nodes and edges.

## When to use

- `/planner`
- "Plan this and swarm the phases"
- "Orchestrate this job"

## When not to use

| Situation | Use instead |
|-----------|-------------|
| One file, one screen, or "just tell me" | The normal playbook for that job |
| A program of PRs and workstreams | **Orchestrate** |
| A stacked landing sequence | **Multi-Phase Plan** |
| One parallel batch, no later phases | `/swarm` |

Skip the board when the run would finish before the board is useful.

## Phases

```
□ Phase 1: Write the board
□ Phase 2: Wait for the user to accept, reorder, or drop phases
□ Phase 3: Swarm the current phase
  └─ Calls: /swarm
□ Phase 4: Aggregate a handoff packet
□ Phase 5: Human gate, or continue
□ Phase 6: Retry a failed phase only
□ Phase 7: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Write the board

Write this before any worker starts. Each phase has an owner, a job in the user's language, inputs, a deliverable, and whether a person must approve.

```text
PHASE BOARD
| Phase | Owner | Status | Handoff in | Deliverable | Gate |
| 1 Research | swarm | pending | user job | notes | no |
| 2 Draft | swarm | waiting | phase 1 notes | spec | yes, before export |
```

Status values: `pending`, `running`, `passed`, `issues`, `blocked`, `skipped`.

Update the row when the status changes. A failed phase names the error on that row. Do not replace the board with one spinner.

## Phase 2: Accept the board

Show the board and stop. The user may reorder or drop a phase. Do not start `/swarm` until they accept it, or they already said to run the plan as written.

## Phase 3: Swarm the current phase

Call `/swarm` as a partition:

- Non-overlapping slices
- One worker per slice
- Each brief stands alone: goal, slice, how to verify, what to report
- Workers do not edit a shared file

Each worker returns `PASS`, `ISSUES`, or `BLOCKED`, plus evidence.

Set that phase's row to `running` while the swarm is out, then to the aggregate status.

## Phase 4: Aggregate a handoff packet

The planner, not the workers, writes one packet:

```text
HANDOFF
Phase: [name]
Status: passed | issues | blocked
Deliverable: [what the next phase may use]
Evidence: [paths or command output]
Dropped: [worker notes that did not make the packet]
```

The next phase may read this packet and its own board row. It may not read worker scratch or an earlier phase's raw output.

## Phase 5: Human gate

Pause before a phase that can spend money, send a message, or delete. Say which phase, what it will change, and wait.

Other phases start only after the user approves, or after they skip that phase (`skipped` on the board).

A phase with no gate continues from the handoff packet.

## Phase 6: Retry the failed phase

If a phase is `issues` or `blocked`, rerun that phase's swarm. Put the failure in the brief. Do not rerun phases already marked `passed`.

## Phase 7: Changelog

Call `/changelog-notetaker` with the board's final statuses and the last handoff.

The board is task memory. File anything that should outlive the run with `/memory`. Do not create a new store for the board.

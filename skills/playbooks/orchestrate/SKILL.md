---
name: orchestrate
description: "Project-scale coordination over multiple PRs, agents, or workstreams. Track progress, resolve conflicts, drive to completion. Use for 'coordinate this project', 'manage these PRs', or complex multi-agent work."
disable-model-invocation: true
---

# Orchestrate Playbook

Coordinate project-scale work across multiple PRs, agents, or parallel workstreams.

## Phases

```
□ Phase 1: Establish the project
□ Phase 2: Define workstreams
□ Phase 3: Spawn and track workers
□ Phase 4: Resolve conflicts
□ Phase 5: Drive to completion
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Establish the Project

### Project definition

```markdown
## Project: [Name]

**Goal:** [One sentence]
**Scope:** [What's included]
**Not in scope:** [Explicit exclusions]
**Done when:** [Verifiable conditions]
**Coordinator:** [This agent/session]
```

### Success metrics

| Metric | Target |
|--------|--------|
| PRs landed | [N] |
| Test coverage | [%] |
| Performance | [metric] |
| Timeline | [date] |

## Phase 2: Define Workstreams

### Workstream decomposition

Break the project into parallel workstreams:

```markdown
## Workstreams

### WS1: [Name]
**Owner:** [Agent/PR]
**Scope:** [What this workstream covers]
**Dependencies:** [Other workstreams]
**Deliverable:** [What ships]

### WS2: [Name]
...
```

### Dependency matrix

| Workstream | Depends On | Blocks | Can Parallel |
|------------|------------|--------|--------------|
| WS1 | - | WS3, WS4 | WS2 |
| WS2 | - | WS4 | WS1 |
| WS3 | WS1 | WS4 | WS2 |
| WS4 | WS1, WS2, WS3 | - | - |

### Integration points

```markdown
## Integration Points

| Point | Workstreams | Contract | Owner |
|-------|-------------|----------|-------|
| API shape | WS1, WS2 | types/api.ts | WS1 |
| Shared component | WS2, WS3 | Button props | WS2 |
| State schema | All | store/types.ts | WS1 |
```

## Phase 3: Spawn and Track Workers

### Worker spawn pattern

For each workstream, spawn with clear brief:

```markdown
**Worker brief:**
- Project: [Project name]
- Workstream: [WS name and number]
- Scope: [Exact scope]
- Dependencies: [What to wait for]
- Integration points: [Contracts to follow]
- Report to: [This orchestrator]
- Deadline: [If any]
```

### Status tracking

```markdown
## Project Status: [Name]

Last updated: [timestamp]

| WS | Name | Owner | Status | PR | Blockers |
|----|------|-------|--------|-----|----------|
| 1 | [Name] | [Agent] | 🔄 In Progress | #123 | None |
| 2 | [Name] | [Agent] | ⏸ Waiting | - | Needs WS1 |
| 3 | [Name] | [Agent] | ✓ Complete | #124 | - |
| 4 | [Name] | [Agent] | 📋 Not started | - | Needs WS1-3 |

**Overall:** [% complete]
**Critical path:** WS1 → WS4
**Next milestone:** [Description]
```

### Communication protocol

| Event | Action |
|-------|--------|
| Worker completes | Update status, unblock dependents |
| Worker blocked | Resolve or reassign |
| Integration conflict | Convene resolution |
| Scope change | Evaluate impact, communicate |

## Phase 4: Resolve Conflicts

### Conflict types

| Type | Resolution |
|------|------------|
| Merge conflict | Owner rebases, or orchestrator mediates |
| API disagreement | Meeting between affected workstreams |
| Resource contention | Priority assignment |
| Scope overlap | Assign clear ownership |
| Timeline slip | Re-sequence or parallelize |

### Conflict resolution process

```markdown
## Conflict: [Description]

**Workstreams:** [Which are affected]
**Nature:** [What's conflicting]
**Impact:** [What happens if unresolved]

**Options:**
1. [Option with trade-offs]
2. [Option with trade-offs]

**Decision:** [Chosen option]
**Rationale:** [Why]
**Action items:**
- [ ] [Who does what]
```

### Merge order

When PRs have dependencies, define merge order:

```markdown
## Merge Order

1. #123 (WS1) - Foundation
2. #124 (WS2) - Can merge after #123
3. #125 (WS3) - Can merge after #123, parallel with #124
4. #126 (WS4) - Needs all above
```

## Phase 5: Drive to Completion

### Daily check-in

```markdown
## Check-in: [Date]

**Progress since last:**
- [WS1]: [Progress]
- [WS2]: [Progress]

**Blockers:**
- [Blocker and owner]

**Focus today:**
- [Priority 1]
- [Priority 2]

**Risks:**
- [Risk and mitigation]
```

### Completion checklist

```markdown
## Completion Checklist

### All PRs
- [ ] All PRs reviewed
- [ ] All PRs approved
- [ ] All PRs landed

### Integration
- [ ] All workstreams integrated
- [ ] No merge conflicts
- [ ] All tests passing

### Verification
- [ ] Feature works end-to-end
- [ ] Performance meets targets
- [ ] Accessibility verified

### Documentation
- [ ] README updated
- [ ] API docs updated
- [ ] Changelog entries
```

### Handoff

When orchestration complete:

```markdown
## Project Handoff: [Name]

**Status:** Complete
**PRs:** #[list]
**Documentation:** [Links]
**Known issues:** [If any]
**Future work:** [If any]
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Project: [name]" |
| playbook_name | "orchestrate" |
| summary | Workstreams completed, overall outcome |
| files | Summary (individual WS have their own entries) |
| prs | All PR numbers |
| evidence | Status doc, completion checklist |

## Output Format

```markdown
## Project Orchestration Complete: [Name]

**Duration:** [Start] to [End]
**Workstreams:** [N] total
**PRs:** [N] landed

### Workstream Summary

| WS | Deliverable | PR | Status |
|----|-------------|-----|--------|
| 1 | [What shipped] | #123 | ✓ |
| 2 | [What shipped] | #124 | ✓ |
| ... | ... | ... | ... |

### Integration
[How workstreams came together]

### Outcomes
- [Outcome 1]
- [Outcome 2]

### Learnings
- [What worked]
- [What to improve]
```

## Tools

| Need | Use |
|------|-----|
| Parallel workers | `/swarm` |
| Worker progress | Check-in protocol |
| Conflict resolution | Resolution process |
| Complex dependencies | `/multi-phase-plan` |
| Individual workstream | Appropriate playbook |

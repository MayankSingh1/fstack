---
name: multi-phase-plan
description: "Work spanning multiple phases or stacked PRs. Plan the sequence, track dependencies, land incrementally. Use for 'this needs multiple PRs', 'break this into phases', or large migrations."
disable-model-invocation: true
---

# Multi-Phase Plan Playbook

Plan and execute work that spans multiple phases, PRs, or releases.

## Phases

```
□ Phase 1: Scope the full work
□ Phase 2: Decompose into phases
□ Phase 3: Plan dependencies
□ Phase 4: Execute phase by phase
□ Phase 5: Track and adjust
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Scope the Full Work

### Define the end state

```markdown
**End State:**
When all phases complete, the codebase will:
- [End state description 1]
- [End state description 2]
- [Measurable outcome]

**Why phases:**
- [Why this can't be one PR]
- [Risk mitigation rationale]
- [Incremental value at each phase]
```

### Identify components

| Component | Current State | Target State |
|-----------|---------------|--------------|
| [Component 1] | [How it is now] | [How it will be] |
| [Component 2] | [How it is now] | [How it will be] |

## Phase 2: Decompose into Phases

### Phase requirements

Each phase must be:
- **Landable:** Ships independently, doesn't break anything
- **Verifiable:** Has its own acceptance criteria
- **Valuable:** Provides benefit even if later phases don't land
- **Reversible:** Can be reverted without complex rollback

### Phase template

```markdown
## Phase [N]: [Name]

**Goal:** [What this phase accomplishes]
**Ships:** [What deliverables]
**Depends on:** [Previous phases]
**Unlocks:** [What can be done after]

**Scope:**
- [ ] [Specific deliverable 1]
- [ ] [Specific deliverable 2]

**Acceptance criteria:**
- [ ] [Verifiable condition 1]
- [ ] [Verifiable condition 2]
```

### Common phase patterns

**Feature flag rollout:**
```
Phase 1: Add feature flag, implement behind flag (off by default)
Phase 2: Enable for internal users
Phase 3: Enable for percentage rollout
Phase 4: Enable for all, remove flag
```

**Component migration:**
```
Phase 1: Create new component alongside old
Phase 2: Migrate critical paths
Phase 3: Migrate remaining usages
Phase 4: Delete old component
```

**Design system update:**
```
Phase 1: Add new tokens alongside old
Phase 2: Migrate high-visibility components
Phase 3: Migrate remaining components
Phase 4: Remove deprecated tokens
```

## Phase 3: Plan Dependencies

### Dependency graph

```markdown
Phase 1 ──────────────┐
                      │
Phase 2 ─────────┬────┴───→ Phase 4
                 │
Phase 3 ─────────┘

Legend:
→ depends on
│ can run in parallel
```

### Dependency table

| Phase | Depends On | Blocks | Can Parallel With |
|-------|------------|--------|-------------------|
| 1 | - | 2, 3, 4 | - |
| 2 | 1 | 4 | 3 |
| 3 | 1 | 4 | 2 |
| 4 | 2, 3 | - | - |

### Critical path

Identify the longest chain:
```
Phase 1 → Phase 2 → Phase 4 = critical path
Phase 3 can run in parallel with Phase 2
```

## Phase 4: Execute Phase by Phase

### For each phase:

1. **Create branch** from main (or previous phase)
   ```bash
   git checkout main
   git pull
   git checkout -b feature/[name]-phase-[N]
   ```

2. **Execute the scope** using appropriate playbook:
   - Simple change: Direct implementation
   - Feature: `/feature` playbook
   - Refactor: `/component-refactor` playbook

3. **Verify acceptance criteria**

4. **Open PR** with phase context:
   ```markdown
   ## Phase [N] of [Total]: [Name]
   
   Part of: #[tracking issue]
   Previous: #[previous PR]
   Next: [description of next phase]
   
   ### What this phase does
   [Description]
   
   ### Acceptance criteria
   - [x] Criterion 1
   - [x] Criterion 2
   ```

5. **Land and update tracking**

### Stacked PRs (if using)

```bash
# Create stack
git checkout main
git checkout -b feature/phase-1
# ... work ...
git checkout -b feature/phase-2
# ... work ...

# Rebase when phase-1 lands
git checkout feature/phase-2
git rebase main
```

## Phase 5: Track and Adjust

### Status tracking

```markdown
## Multi-Phase Work: [Name]

| Phase | Status | PR | Landed |
|-------|--------|-----|--------|
| 1 | ✓ Complete | #123 | 2024-01-10 |
| 2 | 🔄 In Progress | #124 | - |
| 3 | ⏸ Waiting on 2 | - | - |
| 4 | 📋 Not started | - | - |

**Next action:** Finish Phase 2 review
**Blockers:** None
**Scope changes:** None
```

### Adjustment triggers

| Situation | Action |
|-----------|--------|
| Phase takes longer than expected | Update estimates, communicate |
| Scope creep discovered | Add phase or parking lot |
| Dependency blocked | Resequence if possible |
| Phase becomes unnecessary | Document why, skip |
| Rollback needed | Document learnings, re-plan |

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Multi-phase: [work name]" |
| playbook_name | "multi-phase-plan" |
| summary | Phases completed, overall outcome |
| files | All files changed across phases |
| prs | All PR numbers |
| evidence | Tracking doc, final verification |

## Output Format

```markdown
## Multi-Phase Work Complete: [Name]

**Phases:** [N] total, [M] landed
**Duration:** [Start] to [End]
**PRs:** #[list]

### Phase Summary

| Phase | Goal | Status |
|-------|------|--------|
| 1 | [Goal] | ✓ Landed |
| 2 | [Goal] | ✓ Landed |
| ... | ... | ... |

### End State Achieved
[Description of final state]

### Learnings
- [What worked well]
- [What would do differently]

### Parking Lot
[Work identified but deferred]
```

## Templates

### Tracking issue template

```markdown
# [Multi-Phase Work Name]

## Overview
[Description of the full work]

## Phases
- [ ] Phase 1: [Name] - #[PR]
- [ ] Phase 2: [Name] - #[PR]
- [ ] Phase 3: [Name] - #[PR]

## Dependencies
[Dependency graph or table]

## Timeline
- Start: [Date]
- Target: [Date]

## Status
[Current status and next action]
```

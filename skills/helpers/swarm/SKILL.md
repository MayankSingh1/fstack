---
name: swarm
description: "Fan out N parallel workers for coverage, races, or exploration. Each reports PASS/ISSUES/BLOCKED. Parent aggregates and returns one report. Use for /swarm, 'swarm this', or parallel work across slices."
disable-model-invocation: true
---

# Swarm

Fan out N parallel workers. They may cover separate slices, race the same brief, or mix both. The parent waits, aggregates, and returns one consolidated report.

## Start

Open a todo list with phases:

1. Frame
2. Fan out
3. Aggregate
4. Report
5. Record in changelog

## Phase A: Frame

### 1. State the done predicate

What the swarm must return:
- A coverage report (all slices checked)
- A race result (first/best answer)
- An exploration summary

### 2. Choose the shape

| Shape | Use Case |
|-------|----------|
| **Partition** | Different slices, non-overlapping |
| **Race** | Same task, first or best wins |
| **Mixed** | Slices with redundancy |

For race or mixed, declare up front:
- `first pass` — first to pass wins
- `rank all` — compare all results
- `best-of` — pick highest quality

### 3. Set N

From user or derived from shape:
- Partition: one per slice
- Race: 2-3 typically
- Coverage: based on scope

### 4. Pick worker model

Use `swarm workers` line from `~/.cursor/rules/fstack-models.mdc` if available. Otherwise use a fast model for parallel work.

### 5. Define output locations

Each worker gets its own path when writing.

## Phase B: Fan out

Spawn all N workers in parallel:
- `run_in_background: true`
- Each brief stands alone (goal, scope, slice, how to verify, what to report)

### Report format

Each worker reports:

```
STATUS: PASS | ISSUES | BLOCKED

SCOPE: [what this worker covered]

EVIDENCE: [verification output]

ISSUES (if any):
- [issue with evidence]

BLOCKERS (if any):
- [what prevented completion]
```

### Design/Frontend slice patterns

**Component slices:**
- Worker 1: Button variants
- Worker 2: Input variants
- Worker 3: Card variants

**Breakpoint slices:**
- Worker 1: Mobile (< 768px)
- Worker 2: Tablet (768-1024px)
- Worker 3: Desktop (> 1024px)

**State slices:**
- Worker 1: Loading states
- Worker 2: Error states
- Worker 3: Empty states
- Worker 4: Success states

**Browser slices:**
- Worker 1: Chrome/Edge
- Worker 2: Firefox
- Worker 3: Safari
- Worker 4: iOS Safari

**Accessibility slices:**
- Worker 1: Keyboard navigation
- Worker 2: Screen reader
- Worker 3: Color contrast
- Worker 4: Motion sensitivity

## Phase C: Aggregate

Read all terminal results.

### Validation

Drop results that don't record:
- The slice/brief they covered
- The verification method used
- Concrete evidence

Respawn dropped worker once. After second miss, record a gap.

### Aggregation rules

**For coverage:**
- Every slice needs a result
- Gaps don't count as pass
- Collect all issues across workers

**For race:**
- Apply declared selection rule (first pass, rank all, best-of)
- Note timing if relevant

### Result table

| Worker | Slice | Status | Issues | Evidence |
|--------|-------|--------|--------|----------|
| 1 | Mobile | PASS | — | Screenshot |
| 2 | Tablet | ISSUES | Layout break at 900px | Screenshot |
| 3 | Desktop | PASS | — | Screenshot |

## Phase D: Report

Return one consolidated report:

```markdown
## Swarm Report: [Task Name]

**Shape:** Partition / Race / Mixed
**Workers:** N total, M completed

### Results

| Worker | Slice | Status | Issues |
|--------|-------|--------|--------|
| ... | ... | ... | ... |

### Issues Found
1. [Issue] — [Worker] — [Evidence]
2. ...

### Gaps
- [What wasn't covered and why]

### Verdict
[Overall: PASS / ISSUES / BLOCKED]
```

## Design/Frontend Swarm Examples

### Responsive audit
```
Partition into 4 breakpoints
Each worker:
- Resize viewport
- Screenshot key screens
- Report layout issues
```

### Cross-browser check
```
Partition into 4 browsers
Each worker:
- Load in browser
- Run interaction tests
- Report differences
```

### Component stress test
```
Partition into states
Each worker:
- Render component in state
- Verify accessibility
- Check visual regression
```

### Design system audit
```
Partition into categories
Each worker:
- Check token usage
- Verify naming
- Report violations
```

## Guardrails

- Workers don't coordinate — parent handles synthesis
- Each brief must stand alone
- Evidence must be concrete, not self-report
- Gaps are explicitly tracked

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Swarm: [what was swarmed]"
- playbook_name: "swarm"
- summary: N workers, M passed, issues found
- files: Report file path
- evidence: Aggregated results table

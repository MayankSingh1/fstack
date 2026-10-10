---
name: autopilot-full
description: "Queue of independent PRs run to completion and merged. Each PR is autonomous, verified, and landed without human intervention. Use for 'land all these PRs', 'autopilot this queue', or batch PR processing."
disable-model-invocation: true
---

# Autopilot Full Playbook

Process a queue of independent PRs autonomously: implement, verify, and land each without human intervention.

## Prerequisites

- Each PR in the queue must be independent (no cross-PR dependencies)
- Repository has CI configured
- Agent has push/merge permissions
- Clear acceptance criteria for each PR

## Phases

```
□ Phase 1: Build the queue
□ Phase 2: Validate independence
□ Phase 3: Process queue
□ Phase 4: Handle failures
□ Phase 5: Report results
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Build the Queue

### Queue format

```markdown
## PR Queue

| # | Task | Branch | Status |
|---|------|--------|--------|
| 1 | [Task description] | feature/task-1 | Queued |
| 2 | [Task description] | feature/task-2 | Queued |
| 3 | [Task description] | feature/task-3 | Queued |
```

### Task requirements

Each task needs:
- Clear scope
- Acceptance criteria
- Target branch
- Estimated complexity

### Queue order

Order by:
1. Dependencies (independent first)
2. Risk (low risk first)
3. Size (small first, for early wins)

## Phase 2: Validate Independence

### Independence check

For each pair of tasks:

| Task A | Task B | Independent? | Reason |
|--------|--------|--------------|--------|
| 1 | 2 | ✓ | Different files |
| 1 | 3 | ✓ | Different components |
| 2 | 3 | ✓ | No overlap |

### If dependencies found

- Reorder queue to respect dependencies
- Or use `/autopilot-stack` for dependent PRs
- Or split into independent chunks

## Phase 3: Process Queue

### For each PR in queue:

```markdown
## Processing: Task [N] — [Description]

### 1. Create branch
```bash
git checkout main && git pull
git checkout -b [branch-name]
```

### 2. Implement
- Use appropriate playbook for task type
- Maintain decision log
- Commit incrementally

### 3. Verify locally
- [ ] TypeScript compiles
- [ ] Tests pass
- [ ] Lint clean
- [ ] Feature works

### 4. Push and open PR
```bash
git push -u origin [branch-name]
```

### 5. Wait for CI
- Monitor CI status
- Fix any failures

### 6. Merge when green
```bash
# When CI passes and approved
# (Only if agent has merge permission)
```

### 7. Update queue status
```

### Processing rules

| Rule | Action |
|------|--------|
| CI passes | Merge immediately |
| CI fails | Fix, repush, retry (max 3) |
| Review requested | Wait or escalate |
| Merge conflict | Rebase, resolve, repush |
| Stuck > 30 min | Skip, log, continue |

## Phase 4: Handle Failures

### Failure types

| Type | Action |
|------|--------|
| Implementation failure | Skip, log reason |
| CI failure (fixable) | Fix and retry |
| CI failure (unfixable) | Skip, document issue |
| Merge conflict | Resolve if simple, skip if complex |
| Permission denied | Log, skip |
| Network error | Retry with backoff |

### Skip policy

When skipping a PR:
1. Log the reason
2. Leave branch and PR open
3. Add comment explaining failure
4. Continue with queue

### Retry policy

```
Attempt 1: Try immediately
Attempt 2: Wait 30 seconds
Attempt 3: Wait 2 minutes
After 3 failures: Skip
```

## Phase 5: Report Results

### Final status

```markdown
## Autopilot Run Complete

**Started:** [timestamp]
**Completed:** [timestamp]
**Duration:** [time]

### Summary

| Status | Count |
|--------|-------|
| ✓ Merged | [N] |
| ⚠ Skipped | [M] |
| ✗ Failed | [K] |
| Total | [N+M+K] |

### Merged PRs

| PR | Task | Branch | Merged At |
|----|------|--------|-----------|
| #123 | [Task 1] | feature/task-1 | [time] |
| #124 | [Task 2] | feature/task-2 | [time] |

### Skipped/Failed

| Task | Branch | Reason | PR |
|------|--------|--------|-----|
| [Task 3] | feature/task-3 | CI timeout | #125 (open) |
| [Task 4] | feature/task-4 | Implementation blocked | - |

### Recommendations
- [Task 3]: Investigate flaky test
- [Task 4]: Needs manual implementation
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Autopilot: [N] PRs" |
| playbook_name | "autopilot-full" |
| summary | N merged, M skipped, K failed |
| files | (Multiple — see individual PRs) |
| prs | List of all PR numbers |
| evidence | Final status report |

## Output Format

```markdown
## Autopilot Run Complete

**Queue:** [N] tasks
**Merged:** [M] PRs
**Skipped:** [K] tasks
**Duration:** [time]

### Results

| # | Task | Status | PR |
|---|------|--------|-----|
| 1 | [Task] | ✓ Merged | #123 |
| 2 | [Task] | ✓ Merged | #124 |
| 3 | [Task] | ⚠ Skipped | #125 |

### Skipped Tasks Need Attention
[List of skipped tasks with reasons]

### Log
Decision trail: [path]
```

## Guardrails

### Never autopilot

- Breaking changes
- Security-sensitive code
- Database migrations
- Infrastructure changes
- PRs that need human review

### Always verify

- Tests pass before merge
- CI is green
- No merge conflicts
- Changes match task description

### Escape hatches

| Condition | Action |
|-----------|--------|
| Unexpected error | Log, skip, continue |
| Queue blocked | Report status, stop |
| Permission issue | Report, require human |
| Scope creep detected | Stop, report |

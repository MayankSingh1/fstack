---
name: autonomous-run
description: "Drive a task to completion without stopping. Maintain decision trail, hit checkpoints, recover from errors. Use for 'finish this without me', 'complete autonomously', or long-running unattended work."
disable-model-invocation: true
---

# Autonomous Run Playbook

Drive a task to completion without human intervention. Maintain a decision trail, hit checkpoints, and recover from errors gracefully.

## Phases

```
□ Phase 1: Define done and boundaries
□ Phase 2: Set up decision logging
  └─ Calls: /show-me-your-work
□ Phase 3: Execute with checkpoints
□ Phase 4: Handle errors and blockers
□ Phase 5: Verify completion
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Define Done and Boundaries

### Before starting, establish:

**Done predicate:**
```markdown
This task is DONE when:
- [ ] [Specific, verifiable condition 1]
- [ ] [Specific, verifiable condition 2]
- [ ] All tests pass
- [ ] Changes committed and pushed
```

**Boundaries:**
```markdown
WILL DO:
- [Specific scope item 1]
- [Specific scope item 2]

WILL NOT DO (out of scope):
- [Explicit exclusion 1]
- [Explicit exclusion 2]

IF BLOCKED BY:
- [Blocker type] → [Recovery action]
```

**Rigor level:**
| Scope | Rigor |
|-------|-------|
| One file, < 50 lines | Low (ship directly) |
| Multiple files, one feature | Medium (test before commit) |
| Cross-cutting, architectural | High (checkpoint before each phase) |

## Phase 2: Set Up Decision Logging

Call `/show-me-your-work` to initialize the decision log.

### Log format

Every significant decision gets logged:

```tsv
timestamp	phase	decision	why	evidence	result
2024-01-15T10:30:00Z	implement	Add loading state to Card	Required by design spec	Figma link	DONE
2024-01-15T10:35:00Z	implement	Use existing Spinner component	Consistency with codebase	Found at src/components/Spinner	DONE
2024-01-15T10:40:00Z	error	API endpoint returns 404	Endpoint not deployed yet	Screenshot of network tab	BLOCKED→MOCKED
```

### What to log

- Decisions that affect the outcome
- Errors encountered and recovery actions
- Blocked items and workarounds
- Verification results

### What NOT to log

- Every file read
- Every line changed
- Routine navigation

## Phase 3: Execute with Checkpoints

### Checkpoint schedule

| Rigor | Checkpoint After |
|-------|------------------|
| Low | Only at completion |
| Medium | Each logical unit |
| High | Each file, each decision |

### Checkpoint format

```markdown
## Checkpoint [N] — [Phase/Step Name]

**Progress:** [What's been done]
**State:** [Current codebase state]
**Next:** [What's coming]
**Blockers:** [Any issues]

**Verification:**
- [x] Code compiles
- [x] No new lint errors
- [ ] Tests pass (pending)
```

### Commit at checkpoints

```bash
git add -A
git commit -m "checkpoint: [description]"
```

Checkpoints are recovery points if something goes wrong.

## Phase 4: Handle Errors and Blockers

### Error classification

| Type | Action |
|------|--------|
| Syntax error | Fix immediately, log |
| Test failure | Fix or document, continue |
| Type error | Fix immediately, log |
| Lint error | Fix immediately, log |
| External dependency | Mock/skip, document |
| Auth/credentials | Stop, request help |

### Recovery strategies

**Recoverable errors:**
```markdown
Error: [Description]
Recovery: [What was done]
Impact: [How it affects the work]
```

**Unrecoverable blockers:**
```markdown
BLOCKED: [Description]
Attempted: [What was tried]
Needed: [What's required to proceed]
Workaround: [If any]
```

### When to stop

Stop and request human input when:
- Credentials or secrets needed
- Destructive action required
- Scope needs to expand significantly
- Ambiguity that affects correctness
- External service permanently unavailable

## Phase 5: Verify Completion

### Verification checklist

```markdown
## Completion Verification

### Code Quality
- [ ] TypeScript compiles with no errors
- [ ] No new lint warnings
- [ ] All tests pass
- [ ] Changes follow existing patterns

### Functionality
- [ ] Feature works in dev server
- [ ] All states render correctly
- [ ] Accessibility intact
- [ ] No regressions

### Done Predicate
- [ ] [Condition 1 from Phase 1]
- [ ] [Condition 2 from Phase 1]
- [ ] ...
```

### Evidence collection

Gather evidence for each verification:
- Screenshots of working feature
- Test output
- Lint output
- Any automated check results

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | [Task description] |
| playbook_name | "autonomous-run" |
| summary | What was completed, hours elapsed |
| files | All changed files |
| prs | PR number if created |
| evidence | Decision log path, verification results |

## Output Format

```markdown
## Autonomous Run Complete

**Task:** [Description]
**Duration:** [Time elapsed]
**Status:** ✓ Complete / ⚠ Partial / ✗ Blocked

### Summary
[What was accomplished]

### Checkpoints
| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase] | ✓ |
| 2 | [Phase] | ✓ |
| ... | ... | ... |

### Decision Log
Path: [decisions.tsv path]
Entries: [N]

### Blockers Encountered
[List of blockers and how they were handled]

### Verification
- ✓ [Check 1]
- ✓ [Check 2]
- ...

### Artifacts
- PR: #[number]
- Decision log: [path]
- Screenshots: [path]
```

## Guardrails

### Never do autonomously

- Delete production data
- Push to main without PR
- Commit secrets or credentials
- Expand scope beyond boundaries
- Skip verification steps

### Always do

- Log decisions
- Commit at checkpoints
- Verify before completing
- Report blockers honestly
- Preserve existing functionality

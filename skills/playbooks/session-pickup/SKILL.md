---
name: session-pickup
description: "Resume or take over a prior agent's in-flight work from a transcript, branch, or decision log. Rebuild state, identify what's done and what remains, and resume cleanly."
disable-model-invocation: true
---

# Session Pickup

Resuming or taking over a prior agent's in-flight work. The new agent rebuilds state from the transcript, pushed branch, and decision log, then continues cleanly without redoing completed work or losing progress.

## When to use

- Picking up where a previous session left off
- Taking over another agent's work
- Resuming after a Cursor restart
- Continuing work from a transcript or PR
- "Continue this work", "pick up where I left off"

## Steps

```
PLAYBOOK: Session Pickup
──────────────────────────────────────

□ Step 1: Locate the prior work
  └─ Transcript: agent-transcripts/ or cloud-agent URL
  └─ Branch: pushed branch name
  └─ Decision log: decisions.tsv if exists
  └─ PR: if one was opened

□ Step 2: Read the prior state
  └─ Scan transcript for: what was the task, what was done
  └─ Check branch: what commits exist, what's uncommitted
  └─ Read decision log: what decisions were made
  └─ Read PR: description, comments, CI status

□ Step 3: Reconstruct the work state
  └─ What was the original goal?
  └─ What steps were completed?
  └─ What steps remain?
  └─ Are there any blockers noted?

□ Step 4: Check for drift
  └─ Has main moved since the branch diverged?
  └─ Are there merge conflicts?
  └─ Has the problem changed?
  └─ Were there new review comments?

□ Step 5: Verify completed work
  └─ Don't trust summaries—check the actual state
  └─ Does the code match what was claimed?
  └─ Do tests pass?
  └─ Is the dev server working?

□ Step 6: Document pickup state
  └─ Write a brief of: done / remaining / blockers
  └─ If using /show-me-your-work, add a pickup entry
  └─ Note anything ambiguous

□ Step 7: Resume cleanly
  └─ Continue from the next incomplete step
  └─ Don't redo completed work
  └─ Don't skip incomplete steps
  └─ Follow the original playbook

□ Step 8: Report to user
  └─ Confirm what you inherited
  └─ State what you're continuing with
  └─ Note any issues found during pickup

□ Step 9: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Pickup brief documenting done/remaining/blockers, verified against actual state
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Session pickup: [task resumed]" |
| playbook_name | "session-pickup" |
| summary | Prior state verified, resuming from step N |
| files | Pickup brief path |
| evidence | Branch/commit verified, state confirmed |

## Pickup brief format

```markdown
## Session Pickup Brief

### Original task
[What was the prior agent trying to accomplish]

### Source of prior work
- Transcript: [path or URL]
- Branch: [branch name]
- Decision log: [path if exists]
- PR: [URL if exists]

### Completed
- [x] Step 1: [description] (commit abc123)
- [x] Step 2: [description] (commit def456)

### Remaining
- [ ] Step 3: [description]
- [ ] Step 4: [description]

### Blockers found
- [Any blockers noted in prior work]

### State verification
- Branch checked out: ✓
- Tests passing: ✓ / ✗
- Dev server runs: ✓ / ✗
- Uncommitted changes: [list if any]

### Drift detected
- Main moved: [yes/no, if yes how much]
- Conflicts: [yes/no]

### Resuming from
Step 3: [description]
```

## Reading prior state

### From transcript
Look for:
- Task definition ("I want to...", "build...", "fix...")
- Playbook invoked
- Steps completed (checkmarks, "done", "complete")
- Blockers or errors
- Final state before ending

### From branch
```bash
# What commits exist
git log --oneline main..HEAD

# What's uncommitted
git status

# What was the last commit message
git log -1 --format="%B"
```

### From decision log
```bash
# If decisions.tsv exists
cat decisions.tsv
# Look at last few entries for state
```

### From PR
- Description: what was planned
- Comments: feedback received
- CI status: passing/failing
- Review status: approved/changes requested

## Handling drift

### Main moved
```bash
git fetch origin main
git log HEAD..origin/main --oneline
# If conflicts likely, decide: rebase or merge
```

### Conflicts exist
```bash
git merge origin/main
# Resolve conflicts
# Re-verify after resolution
```

### Problem changed
- Read any new comments or requirements
- Update the task definition
- May need to restart with updated scope

## Rules

1. **Verify, don't trust.** Check actual state, not summaries.
2. **Don't redo.** Completed work stays completed unless broken.
3. **Don't skip.** Incomplete work must be finished.
4. **Document the pickup.** Future agents may pick up from you.
5. **Report honestly.** If the prior work is broken, say so.

## Integration with flash-mode

Session pickup is matched when:
- User says "continue", "pick up", "resume"
- A transcript or branch is referenced
- Previous session ended mid-task
- User returns to in-flight work

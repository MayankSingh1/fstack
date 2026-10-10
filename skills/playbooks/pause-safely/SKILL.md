---
name: pause-safely
description: "Stop work at an atomic boundary, make progress durable, and write a resume note. The complement to Session Pickup. Use when pausing, going offline, or context about to compact."
disable-model-invocation: true
---

# Pause Safely

Suspending in-flight work cleanly so it can be resumed. Stop at an atomic boundary, make work durable, and write a resume note. The complement to Session Pickup.

## When to use

- Explicit pause request ("pause", "stopping here")
- Going offline ("going to bed", "stepping away")
- Cursor restart imminent
- Context window filling up
- Switching to a different task
- End of work session

## Steps

```
PLAYBOOK: Pause Safely
──────────────────────────────────────

□ Step 1: Find an atomic boundary
  └─ Don't stop mid-edit
  └─ Complete the current small unit
  └─ Tests should pass (or known to fail)
  └─ No half-applied changes

□ Step 2: Make work durable
  └─ Commit all completed work
  └─ Push to remote branch
  └─ If PR exists, ensure it's up to date
  └─ Save any local state that matters

□ Step 3: Clean up scratch state
  └─ Close dev servers cleanly
  └─ Remove temp files that don't matter
  └─ Keep evidence files
  └─ Note any processes that need manual cleanup

□ Step 4: Write the resume note
  └─ What was the task?
  └─ What's done?
  └─ What remains?
  └─ What's the next step?
  └─ Any blockers or gotchas?

□ Step 5: Update decision log (if using)
  └─ Calls: /show-me-your-work
  └─ Add a "paused" entry
  └─ Note the state and reason

□ Step 6: Commit the resume note
  └─ Include in the branch or a known location
  └─ .cursor/resume.md or similar
  └─ Part of the durable state

□ Step 7: Report final state
  └─ Tell user what's saved
  └─ Where to find the resume note
  └─ How to continue (reference /session-pickup)

□ Step 8: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Committed work on pushed branch, resume note documenting state
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Paused: [task name]" |
| playbook_name | "pause-safely" |
| summary | State saved, what remains |
| files | Resume note path |
| evidence | Branch name, commit SHA |

## Atomic boundaries

### Good stopping points
- After a commit that passes tests
- After completing a playbook step
- After a file is fully edited (not mid-function)
- After a PR is opened/updated
- After evidence is captured

### Bad stopping points
- Mid-edit in a file
- Syntax errors present
- Tests failing unexpectedly
- Uncommitted changes
- Dev server in weird state

## Resume note format

```markdown
# Resume Note

**Task:** [Original task description]
**Branch:** [branch-name]
**PR:** [URL if exists]
**Paused:** [timestamp]

## Completed
- [x] [Step 1 description]
- [x] [Step 2 description]

## Next step
[Specific next action to take]

## Remaining
- [ ] [Step 3 description]
- [ ] [Step 4 description]

## State
- Tests: passing / failing [which]
- Dev server: stopped / running on port X
- Uncommitted: none / [list files]

## Blockers
- [Any known issues]

## To resume
1. Check out branch: `git checkout [branch]`
2. Start dev server: `npm run dev`
3. Continue with: [next step]

Or invoke `/session-pickup` with this note.
```

## Making work durable

### Git
```bash
# Stage and commit
git add -A
git commit -m "WIP: [where you stopped]"

# Push to remote
git push -u origin [branch]
```

### Local state to save
- Decision log (decisions.tsv)
- Evidence screenshots
- Resume note
- Any generated artifacts

### Local state to clean
- Node processes
- Temp files
- Browser tabs (close cleanly)

## Rules

1. **Never stop mid-edit.** Finish the atomic unit.
2. **Always push.** Local-only work can be lost.
3. **Always write the note.** Future agents need it.
4. **Be specific.** "Continue the work" is not a resume note.
5. **Include the gotchas.** What would trip up the next agent?

## Quick pause (time-critical)

If pausing urgently:

```bash
# Minimum viable pause
git add -A
git commit -m "WIP: pausing - see resume note"
echo "# Resume Note
Task: [TASK]
Next: [NEXT STEP]
State: [BRIEF STATE]" > .cursor/resume.md
git add .cursor/resume.md
git commit --amend --no-edit
git push -u origin HEAD
```

## Integration with flash-mode

Pause safely is matched when:
- User says "pause", "stop", "stepping away"
- User mentions going offline
- "Save my progress"
- End of session implicit or explicit

---
name: babysit-pr
description: "Shipping playbook for getting a PR to merge-ready. Handles review feedback, CI failures, and conflicts. Never auto-merges."
---

# Babysit PR

This playbook drives a pull request to merge-ready state. It handles review comments, fixes CI failures, resolves conflicts, and ensures the PR is in a state where it can be merged. It **never auto-merges** — the final merge decision is human.

## When to Use

- PR has review comments to address
- CI is failing
- PR has merge conflicts
- PR has been open a while and needs attention
- Bringing someone else's PR to merge-ready

## Playbook Steps

```
PLAYBOOK: Babysit PR
──────────────────────────────────────

□ Step 1: Check current state
  └─ Is CI passing or failing?
  └─ Are there open review comments?
  └─ Are there merge conflicts?
  └─ How long has PR been open?

□ Step 2: Address merge conflicts (if any)
  └─ Pull latest from base branch
  └─ Resolve conflicts carefully
  └─ Re-test after resolution
  └─ Push resolved changes

□ Step 3: Fix CI failures (if any)
  └─ Read CI logs to understand failure
  └─ Fix the actual issue (not just retry)
  └─ Push fix and wait for CI
  └─ Document any flaky test issues

□ Step 4: Review all comments
  └─ Read each comment carefully
  └─ Categorize: must address / should discuss / can dismiss
  └─ Don't dismiss valid feedback

□ Step 5: Address review feedback
  └─ For code changes: make the fix, push
  └─ For questions: respond with explanation
  └─ For discussions: engage thoughtfully
  └─ Principle: Smallest change that works

□ Step 6: Re-request review
  └─ After addressing all feedback
  └─ Point reviewer to specific changes
  └─ Summarize what was changed

□ Step 7: Verify readiness
  └─ CI is green
  └─ All conversations resolved
  └─ Required approvals received
  └─ No merge conflicts
  └─ Branch is up to date

□ Step 8: Update PR if needed
  └─ Calls: /unslop (on description if updated)
  └─ Screenshots updated if code changed visually
  └─ Checklist reflects current state

□ Step 9: Final self-review
  └─ Re-read the final diff
  └─ All changes intentional
  └─ Nothing accidentally reverted
  └─ Ready for merge

□ Step 10: Document merge readiness
  └─ Comment: "Ready for merge. CI green, approvals received."
  └─ DO NOT MERGE AUTOMATICALLY
  └─ Let the appropriate person merge

□ Step 11: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: PR in merge-ready state (CI passing, approvals received, no conflicts) OR documented blockers
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Babysit PR: #[number]" |
| playbook_name | "babysit-pr" |
| summary | Feedback addressed, current state |
| files | Files changed in response to review |
| prs | PR number |
| evidence | CI status, approval status |

## CI Failure Triage

### Common CI Failures

| Failure Type | First Action |
|--------------|--------------|
| Lint error | Fix the lint issue locally |
| Test failure | Read the failing test, understand why |
| Type error | Check TypeScript errors locally |
| Build failure | Check build logs for specific error |
| Flaky test | Note it, potentially re-run, file issue |

### Reading CI Logs

1. **Find the failing step** — most CI shows red X on failed step
2. **Look at the error message** — usually at the end of the log
3. **Find the stack trace** — points to the actual issue
4. **Check if it's your code** — or a pre-existing issue

### Flaky Tests

If a test fails inconsistently:
- Re-run CI once to confirm
- If it passes on retry, it's flaky
- File an issue about the flaky test
- Don't merge if test legitimately catches your bug

## Review Comment Response Guide

### Must Address
- Bug identified in the code
- Security concern
- Performance issue
- Accessibility problem
- Breaking change not documented

Response: Fix the issue, push, reply with what you changed.

### Should Discuss
- Alternative approach suggested
- Naming or style preference
- Architecture question
- Scope question

Response: Engage thoughtfully. Either agree and change, or explain your reasoning.

### Can Dismiss (with explanation)
- Out of scope suggestion
- Preference with no clear benefit
- Based on misunderstanding
- Already addressed elsewhere

Response: Explain why you're not making the change. Be respectful.

## Conflict Resolution

### Simple Conflicts
```bash
git fetch origin main
git merge origin/main
# Resolve conflicts in editor
git add .
git commit
git push
```

### Complex Conflicts
1. Understand both changes before merging
2. May need to re-test affected code
3. Get second pair of eyes if unsure
4. Don't blindly accept "theirs" or "ours"

### After Resolving
- Run tests locally
- Verify the merged behavior is correct
- Push and wait for CI

## Re-requesting Review

Good re-request comment:
```markdown
@reviewer Thanks for the feedback! I've addressed your comments:

- **Code organization**: Extracted the helper function as suggested (abc123)
- **Naming**: Renamed `handleClick` to `handleSubmit` for clarity
- **Question about X**: The reason we do it this way is [explanation]

Ready for another look when you have time.
```

Bad re-request:
```markdown
Fixed.
```

## Merge Readiness Checklist

Before declaring merge-ready:

- [ ] CI is passing (all checks green)
- [ ] Required approvals received
- [ ] All review conversations resolved
- [ ] No merge conflicts
- [ ] Branch is up to date with base
- [ ] Final diff reviewed

## What NOT to Do

- **Don't auto-merge**: This playbook gets PR ready, human decides to merge
- **Don't force push during review**: Makes it hard to see incremental changes
- **Don't dismiss valid feedback**: Engage with it properly
- **Don't merge with failing CI**: Unless it's a known flaky test
- **Don't resolve others' conversations**: Let the comment author resolve

## When to Escalate

Escalate to a human when:
- Reviewer is unresponsive for days
- Fundamental disagreement on approach
- Unclear if breaking change is acceptable
- CI infrastructure issues (not your code)
- Need decision from specific person

## Integration with Flash-Mode

After this playbook completes, you'll have:
- PR in merge-ready state
- All review feedback addressed
- CI passing
- Documented as ready for merge

The **human** then decides to merge. This playbook never auto-merges.

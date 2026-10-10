---
name: shipping
description: "The half after Babysit. Independently verify a green PR or stack with a fresh agent, check verdicts match current commit, land only the contiguous verified run. Never auto-merge without explicit user OK."
disable-model-invocation: true
---

# Shipping

Green is not safe. This playbook independently verifies a green PR or stack before landing. Nothing gets merged before an independent per-PR verdict, and only the contiguous verified run from the root lands.

## When to use

- PR is green and approved, ready to land
- Stack of PRs ready to ship
- "Ship this when it's verified"
- "Land the stack"
- After Babysit has done its job

## Steps

```
PLAYBOOK: Shipping
──────────────────────────────────────

□ Step 1: Identify the PRs
  └─ Single PR or a stack?
  └─ List all PRs from root to tip
  └─ Note the current commit SHA for each

□ Step 2: Fresh verification per PR
  └─ Spawn a fresh agent per PR (not the one that built it)
  └─ Agent runs the verification skill if available
  └─ Otherwise: build, test, visual check
  └─ Each returns: PASS, FAIL, or BLOCKED with evidence

□ Step 3: Record verdicts
  └─ Each verdict tied to specific commit SHA
  └─ Timestamp each verdict
  └─ Store in decision log if using /show-me-your-work

□ Step 4: Check verdicts match current commit
  └─ If PR was pushed since verdict → verdict is stale → re-verify
  └─ A verdict from an old commit does not carry forward
  └─ HEAD must match the verified SHA

□ Step 5: Determine landable run
  └─ Start from stack root
  └─ Walk up until first FAIL or BLOCKED
  └─ Only the contiguous PASS run from root is landable
  └─ A gap in the middle breaks the run

□ Step 6: Present to user
  └─ DO NOT AUTO-MERGE
  └─ Show: which PRs are verified, which are not
  └─ Show: exact SHAs verified
  └─ Ask for explicit merge approval

□ Step 7: Land on user OK
  └─ Only after explicit "merge" / "land" / "ship it"
  └─ Merge the contiguous verified run
  └─ Bottom-up for stacks (root first)
  └─ Report each merge

□ Step 8: Handle partial stack
  └─ If only part of stack is verified, land that part
  └─ Report what remains unverified
  └─ User decides: wait, re-verify, or investigate

EVIDENCE REQUIRED: Verification verdicts per PR with commit SHAs, explicit user merge approval
```

## Verification checklist

For each PR, verify:

### Build
- [ ] Builds without errors
- [ ] No new warnings (or acceptable)
- [ ] TypeScript passes

### Tests
- [ ] All tests pass
- [ ] No flaky test failures

### Visual (if UI change)
- [ ] Dev server runs
- [ ] Changed screens render correctly
- [ ] States work (empty, loading, error, success)
- [ ] Responsive at mobile/tablet/desktop

### Accessibility (if UI change)
- [ ] Keyboard navigation works
- [ ] No console accessibility errors
- [ ] Color contrast acceptable

### Runtime
- [ ] No console errors
- [ ] No network errors
- [ ] Performance acceptable

## Verdict format

```
PR #123: PASS
  SHA: abc1234
  Verified: 2026-10-10T09:30:00Z
  Evidence:
    - Build: clean
    - Tests: 42 passed
    - Visual: screenshot captured
    - A11y: no violations
```

```
PR #124: FAIL
  SHA: def5678
  Verified: 2026-10-10T09:35:00Z
  Reason: Test failure in Button.test.tsx
  Evidence: test-output.log
```

```
PR #125: BLOCKED
  SHA: (not checked)
  Reason: Depends on PR #124 which failed
```

## Stack landing order

```
Stack: #121 → #122 → #123 → #124

Verdicts:
  #121: PASS (abc)
  #122: PASS (def)
  #123: FAIL (ghi)
  #124: NOT CHECKED

Landable run: #121, #122
Blocked: #123 (failed), #124 (depends on #123)

Action: Ask user if they want to land #121 + #122
```

## Rules

1. **Never auto-merge.** Always require explicit user approval.
2. **Fresh eyes verify.** Don't trust the building agent's assessment.
3. **Verdicts are commit-specific.** New push = new verification.
4. **Bottom-up for stacks.** Root merges first.
5. **Document everything.** Every verdict has evidence.

## What to say to the user

```markdown
## Ready to Ship

### Verified PRs (ready to land)
| PR | SHA | Verdict | Evidence |
|----|-----|---------|----------|
| #121 | abc1234 | PASS | build clean, 42 tests |
| #122 | def5678 | PASS | build clean, visual OK |

### Not Ready
| PR | Status | Reason |
|----|--------|--------|
| #123 | FAIL | Test failure |
| #124 | BLOCKED | Depends on #123 |

**To land #121 and #122, say "merge" or "ship it".**
**To investigate #123, say "debug" or "investigate".**
```

## Integration with flash-mode

Shipping is matched when:
- User says "ship", "land", "merge the stack"
- PR is green and Babysit playbook is done
- User wants to verify before landing

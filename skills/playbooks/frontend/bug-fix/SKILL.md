---
name: bug-fix
description: "Frontend playbook for fixing UI bugs. Reproduces first, forms hypotheses, fixes with evidence, and verifies the original issue is resolved."
---

# Bug Fix

This playbook helps you fix UI bugs systematically. The key principle: reproduce before you fix. Form competing hypotheses, gather evidence, apply the minimal fix, and verify on the same interface where the bug was observed.

## When to Use

- User-reported bugs
- QA-identified issues
- Regression bugs
- "It's broken" reports

## Playbook Steps

```
PLAYBOOK: Bug Fix
──────────────────────────────────────

□ Step 1: Understand the bug report
  └─ What is the expected behavior?
  └─ What is the actual behavior?
  └─ What are the reproduction steps?
  └─ What environment (browser, viewport, OS)?

□ Step 2: Reproduce the bug
  └─ Principle: Prove it on the real screen
  └─ Follow exact reproduction steps
  └─ Confirm you see the same issue
  └─ If can't reproduce, gather more info
  └─ Document reproduction evidence

□ Step 3: Investigate the cause
  └─ Calls: /how-ui (to trace behavior)
  └─ Form multiple hypotheses
  └─ Check browser console for errors
  └─ Check network requests
  └─ Check component state

□ Step 4: Narrow down the cause
  └─ Test each hypothesis
  └─ Use breakpoints or logging
  └─ Eliminate possibilities systematically
  └─ Identify the root cause, not just symptom

□ Step 5: Check for related issues
  └─ Calls: /why-this-design (for historical context)
  └─ Has this been fixed before?
  └─ Are there related bugs?
  └─ Is there context in git history?

□ Step 6: Plan the fix
  └─ Principle: Smallest change that works
  └─ What's the minimum change to fix root cause?
  └─ Consider edge cases
  └─ Consider backward compatibility

□ Step 7: Write a failing test
  └─ Test that fails with current code
  └─ Test that will pass after fix
  └─ Captures the bug behavior

□ Step 8: Apply the fix
  └─ Make the minimal change
  └─ Keep the fix focused
  └─ No unrelated changes

□ Step 9: Verify the fix
  └─ Test passes
  └─ Manual reproduction steps now work
  └─ Original reporter's scenario resolved

□ Step 10: Check for regressions
  └─ All existing tests pass
  └─ No new console errors
  └─ Related functionality still works

□ Step 11: Visual verification
  └─ Calls: /visual-parity (if visual bug)
  └─ Screenshot showing fix
  └─ Before/after comparison

□ Step 12: Accessibility check
  └─ Calls: /a11y
  └─ Fix didn't break accessibility
  └─ If a11y-related bug, verify with AT

□ Step 13: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Before/after demonstrating bug is fixed, test capturing the bug, no regressions
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Bug fix: [description]" |
| playbook_name | "bug-fix" |
| summary | Root cause and fix applied |
| files | Changed files |
| prs | PR number if opened |
| evidence | Before/after screenshots, test output |

## Bug Investigation Techniques

### Console Debugging
```javascript
// Add temporary logging
console.log('State at render:', state);
console.log('Props received:', props);
console.log('Event fired:', event);
```

### React DevTools
1. Inspect component state
2. Check props at render time
3. Trace rerenders
4. Check context values

### Network Tab
1. Check API request/response
2. Look for failed requests
3. Check timing of requests
4. Verify response data

### CSS Debugging
```css
/* Temporarily make layout visible */
* { outline: 1px solid red; }

/* Find overflow source */
* { background: rgba(255, 0, 0, 0.1); }
```

## Hypothesis-Driven Debugging

```
BUG: Button doesn't respond to click

HYPOTHESIS 1: Event handler not attached
  Test: Check onClick prop in DevTools
  Result: onClick IS attached
  Status: ❌ Ruled out

HYPOTHESIS 2: Element is covered by another element
  Test: Check z-index, look for overlapping elements
  Result: Invisible overlay div on top
  Status: ✓ ROOT CAUSE FOUND

FIX: Remove overlay or add pointer-events: none
```

## Common UI Bug Patterns

| Symptom | Common Causes | Debug Approach |
|---------|---------------|----------------|
| Click doesn't work | Z-index, pointer-events, disabled state | Inspect element, check event listeners |
| Style not applied | Specificity, typo, caching | Inspect computed styles |
| Component doesn't render | Conditional logic, error boundary | Check render conditions |
| Wrong data shown | Stale state, prop mutation | Log data flow |
| Layout broken | Missing CSS, wrong box model | Outline all elements |
| Works sometimes | Race condition, async timing | Add logging, check timing |
| Works in Chrome only | Browser-specific CSS/JS | Test in failing browser |

## Writing a Bug-Capturing Test

```jsx
describe('UserCard', () => {
  it('should show email when user has email (bug #123)', () => {
    // This test captures the bug behavior
    // It failed before the fix, passes after
    const user = { name: 'Test', email: 'test@example.com' };
    
    render(<UserCard user={user} />);
    
    // Bug: email wasn't rendering when present
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
```

## Fix Commit Template

```
fix: Prevent button click when loading spinner active

Bug: Users could double-submit forms by clicking during loading state

Root cause: onClick handler checked state after async operation started,
but before state update completed

Fix: Add early return when isLoading is true

Reproduces: Click submit, rapidly click again before response
Expected: Second click ignored
Actual: Second submission sent

Fixes #123
```

## When You Can't Reproduce

1. **Gather more info**
   - Exact browser version
   - Device type
   - Network conditions
   - Steps in exact order

2. **Check environment differences**
   - Production vs development
   - Logged in vs anonymous
   - Different data state

3. **Add monitoring**
   - Error tracking for this code path
   - Logging to capture state when it happens

4. **Try variations**
   - Different data
   - Different timing
   - Different viewport

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Reproduced bug with evidence
- Root cause identified
- Minimal fix applied
- Test capturing the bug
- Verification that fix works

This feeds into: **Open a PR** or **Babysit PR** (if already in review).

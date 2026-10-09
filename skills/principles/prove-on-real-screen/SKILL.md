---
name: prove-on-real-screen
description: "Principle: Verification happens on the live UI. Screenshots and dev server previews count. 'It should work' does not."
---

# Prove It on the Real Screen

Verification happens on the live artifact. Not in your head. Not by reading the code. On the actual screen where users will see it.

## When This Principle Applies

- Completing any visual change
- Testing user interactions
- Final verification before marking a task done
- Validating that a bug is fixed

## The Practice

1. **Run the application** — dev server, preview, staging environment
2. **Navigate to the affected screen** — don't rely on component isolation alone
3. **Capture evidence** — screenshot, video, or verifiable description
4. **Test the actual flow** — not just the changed component in isolation

## Evidence Types

| Change Type | Valid Evidence |
|-------------|----------------|
| Visual styling | Screenshot comparison (before/after) |
| Interactive behavior | Recording or step-by-step verification |
| Responsive design | Screenshots at multiple breakpoints |
| Accessibility | Screen reader output, keyboard navigation test |
| Bug fix | Reproduction steps that now pass |

## Examples

### Bad: Trust the Code

"I updated the padding, it should look correct now."

No evidence. No verification. No proof.

### Good: Show the Result

"Updated the padding. Here's the before/after:
- Before: [screenshot showing 8px padding]
- After: [screenshot showing 16px padding matching design]

Verified on Chrome and Safari at desktop and mobile breakpoints."

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Prove It on the Real Screen
  └─ Artifact: [What was tested — URL, component, page]
  └─ Method: [How it was verified — screenshot, manual test, tool]
  └─ Evidence: [Screenshot, recording, or detailed description]
```

## Anti-Patterns

- "It compiles, so it works"
- "I checked the Storybook, that's enough"
- "The tests pass" (tests are necessary but not sufficient for UI)
- Claiming success without actually seeing the change

## When Evidence Is Not Possible

If the environment prevents verification (no dev server, broken build, etc.):

1. State clearly what verification was attempted
2. Document what would need to be checked
3. Mark the task as "Changes complete, verification pending"
4. Do not claim success

## Integration with Flash-Mode

Every playbook ends with an evidence requirement. This principle ensures that requirement is met with real proof, not assumptions.

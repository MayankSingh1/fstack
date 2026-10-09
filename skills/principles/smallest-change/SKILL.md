---
name: smallest-change
description: "Principle: Delete before adding. Modify before creating. The best change removes complexity."
---

# Smallest Change That Works

The best code is the code you don't write. Delete before adding. Modify before creating. Tweak before rewriting. The smallest change that solves the problem is usually the best change.

## When This Principle Applies

- Bug fixes
- Refactoring
- Feature additions
- Code review (is this change bigger than it needs to be?)

## The Practice

1. **Understand the current code** — what does it do, and why?
2. **Find the minimal fix** — what's the smallest change that addresses the issue?
3. **Check for side effects** — does the small change break anything?
4. **Resist the urge to "improve"** — unrelated cleanup belongs in a separate PR

## Decision Hierarchy

```
1. Can I delete code to fix this? → DELETE
2. Can I change one line? → CHANGE ONE LINE
3. Can I modify one function? → MODIFY THE FUNCTION
4. Can I modify one file? → MODIFY THE FILE
5. Do I need to create something new? → CREATE (last resort)
```

## Examples

### Bad: Rewrite When a Tweak Would Do

User: "The button is 2px too wide"

Bad response: Rewrite the entire button component with new props, new styles, and a new API.

### Good: Minimal Change

User: "The button is 2px too wide"

Good response: Change `padding: 12px 18px` to `padding: 12px 16px`. One line. Done.

### Bad: Scope Creep

User: "Fix the typo in this error message"

Bad response: Fix the typo AND refactor the error handling AND update the error component AND add new error types.

### Good: Stay Focused

User: "Fix the typo in this error message"

Good response: Fix the typo. Open a separate issue for the refactoring ideas if they're worth pursuing.

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Smallest Change That Works
  └─ Lines changed: [N]
  └─ Files touched: [N]
  └─ Could this be smaller? [Yes/No + explanation]
  └─ Unrelated changes removed: [List any scope creep caught]
```

## Anti-Patterns

- "While I'm in here, I'll also..."
- Rewriting a function that needed a one-line fix
- Adding abstraction for a problem that exists in one place
- Premature optimization
- "This code is old, let me modernize it" (unless that was the task)

## When Larger Changes Are Appropriate

Sometimes the smallest change isn't the right change:

- The existing code has a fundamental flaw that a patch would hide
- Technical debt is explicitly being addressed
- The user asked for a refactor, not a quick fix
- The small fix would introduce inconsistency or confusion

But even then, validate: is this the smallest change for *that* goal?

## The Laziness Protocol

From pstack's principles: prefer deletion, then modification, then addition. Ask:

1. Does this code still need to exist?
2. Can I solve this by removing something?
3. Is there dead code I can delete?

Deletion is the ultimate simplification.

## Integration with Flash-Mode

This principle is applied during implementation and review steps. Flash-mode checks diffs for scope creep and unnecessary changes.

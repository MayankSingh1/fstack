---
name: start-from-user-task
description: "Principle: Understand what the user actually needs before implementing. The stated goal is the starting point."
---

# Start from the User's Task

The user's stated goal is the starting point. Not the obvious code change. Not what looks similar to a previous task. The actual thing they're trying to accomplish.

## When This Principle Applies

- Beginning any new task
- Ambiguous or underspecified requests
- When multiple interpretations exist
- When the "obvious fix" seems too easy

## The Practice

1. **Restate the goal** in your own words before starting work
2. **Identify the outcome** the user wants to see, not just the change they requested
3. **Check for assumptions** — are you solving the stated problem or a different one?
4. **Ask clarifying questions** when the task could go multiple directions

## Examples

### Bad: Jump to the Obvious Change

User: "The button looks wrong"

Bad response: Immediately changing button styles without understanding what "wrong" means.

### Good: Understand First

User: "The button looks wrong"

Good response: "What specifically looks wrong? Is it the color, size, position, or behavior? Does it differ from the Figma design, or is the design itself the issue?"

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Start from the User's Task
  └─ Restated goal: [Your restatement]
  └─ Desired outcome: [What success looks like]
  └─ Assumptions checked: [List any assumptions made]
```

## Anti-Patterns

- Implementing what you think the user meant without confirming
- Fixing a symptom when the user described a root cause
- Adding features the user didn't ask for
- Expanding scope beyond the stated task

## Integration with Flash-Mode

This principle is checked at the start of every playbook. If the task is ambiguous, pause the playbook and seek clarification before proceeding.

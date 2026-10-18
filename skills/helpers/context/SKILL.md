---
name: context
description: "Choose what this task may read. Build a context pack from product.md, the task, one playbook, and the files that matter. Use for /context, 'context pack', or 'the window is noisy'."
disable-model-invocation: true
---

# Context

Put the right information in the window. Leave the rest unread.

Run this after `product.md` exists and before principles, playbook steps, or file reads. The pack is written in the task. Do not create a `context.md` in the repo.

## When to use

- The start of a `/flash-mode` task
- `/context`, "context pack", "what should I read"
- The window is noisy or about to fill up

## Context pack

```text
CONTEXT PACK
In:
- Product: [only the product.md lines that constrain this task]
- Task: [the user's words]
- Playbook: [one name]
- Files: [paths this change will touch]
- Reuse: [tokens or components to copy, not the whole system]
- Proof: [the screen or command that shows it worked]
Out:
- [what was considered and left unread, and why]
```

## In, in this order

1. The relevant lines of `product.md`. Skip sections that do not constrain this task.
2. The task, restated from the user.
3. The one matched playbook. Read that `SKILL.md` when its steps start. Do not open the other skills until a step names them.
4. Files, tokens, and components the change will touch.
5. The proof: a route, a screenshot, or a command.

Open a file only if it is named in the pack or in the current playbook step. Do not read a second copy of a file already in the pack.

## Out

Leave these unread:

- Other playbooks and helpers until a step names them
- `node_modules`, build output, lockfiles, generated CSS
- Screens, routes, and Figma frames outside the task
- Full transcripts. Use `/recall` or **Session Pickup** only when the user is resuming
- The previous pack after the user says `new task`

Name each exclusion in the Out list so the next step can see what was dropped.

## When the window is tight

Keep the pack plus the current playbook step. Drop everything else.

If work is mid-edit and still will not fit, stop and use **Pause Safely**. Do not summarize over unsaved edits.

On `new task`, throw away the old pack and build a new one.

## Not the same as

| Skill | Job |
|-------|-----|
| `/context` | Choose what this task may read |
| `/recall` | Rebuild what happened recently |
| Session Pickup | Resume one in-flight task |
| Pause Safely | Save state when stopping or compacting |

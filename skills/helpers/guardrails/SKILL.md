---
name: guardrails
description: "Check whether an fstack action is allowed, and block it with a named permission when it is not. Use for /guardrails, 'is this allowed', or 'why did you stop'."
disable-model-invocation: true
---

# Guardrails

These are the permissions this repo already enforces. They are not a content filter.

When an action is not allowed, stop. Name the permission. Say what to do instead. Do not say "something went wrong", and do not continue.

## When to use

- `/guardrails` or "is this allowed"
- "Why did you stop"
- Before merge, delete, send, spend, a `product.md` rewrite, a new memory file, or a skill edit

## Block

```text
BLOCKED: [permission]
Tried: [the action, in the user's words]
Rule: [skill or rule that owns it]
Instead: [the allowed next step]
Override: [the sentence the user must send, or "none"]
```

## Permissions

| Permission | Verdict | Instead | Override |
|------------|---------|---------|----------|
| Merge or land | Deny | Say the PR is ready. A person merges. Shipping and Babysit PR never auto-merge. | none |
| Rewrite `product.md` | Deny | Quote the section. The user edits the file. | none |
| Delete decision rows | Deny | A revert is a new row in `decisions.tsv`. | none |
| Invent a memory file | Deny | File the fact with `/memory` into an existing tier. | none |
| Read outside the context pack | Deny | Name the path and why it is Out. | User asks to add that path to the pack |
| Claim done with no evidence | Deny | Leave the step open and name the missing proof. | none |
| Edit a skill or rule from a hunch | Ask | Show the diff. Wait. | User names the file to change |
| Spend, send, or delete | Ask | Name the phase and what will change. Wait. | User names that phase |
| Swarm before the board is accepted | Deny | Show the board. Wait. | User accepts the board as written |
| Widen a verification rubric | Deny | Return to the failing rows only. | none |
| Copy a transcript into `product.md` or a skill | Deny | Keep it in the window, or file it through `/memory`. | none |
| Work outside the autonomous `WILL NOT` list | Deny | Stop at the boundary and report it. | User names the excluded act |

## Override

The user in the chat is the only override. They must name the action ("merge PR 12" does not apply here: merge stays `none`; "add `src/Button.tsx` to the context pack" does).

"Just do it" does not unlock a deny.

An **ask** row becomes allow only after that named confirmation. Then do that one action, not the rest of the queue.

Merge, replacing `product.md`, and deleting decision rows stay `none`. The user does those acts. The agent does not.

---
name: reflect
description: "Mine the current conversation for learnings and route each to a skill edit. Use for /reflect after completing a task where you learned something durable."
disable-model-invocation: true
---

# Reflect

Mine the current conversation for durable learnings, then route them into skill edits.

## When to invoke

Invoke when the user says "reflect" or "/reflect". Skip when the conversation is trivial, off-topic, or already covered by an existing skill that was followed correctly. One-offs are not learnings.

## Process

### 1. Mine the transcript

Review the current conversation for:

**Design Learnings**
- Design decisions that should be codified
- Component patterns that worked well
- Token usage that should be standardized
- Accessibility approaches that should be default

**Frontend Learnings**
- Code patterns that solved problems
- Testing approaches that caught bugs
- Performance optimizations worth repeating
- Cross-browser fixes that should be documented

**Process Learnings**
- Verification steps that were missing
- Handoff information that was needed
- Review feedback patterns
- Communication improvements

### 2. Evaluate each finding

For each potential learning, ask:

1. **Is it durable?** Will this apply to future work, or was it a one-off?
2. **Is it general?** Does it apply broadly, or only to this specific task?
3. **Is it actionable?** Can an agent follow it without human judgment?
4. **Is it missing?** Is there already a skill or principle covering this?

Score each: `Accept`, `Reject`, or `Backlog`

### 3. Route accepted learnings

For each accepted learning:

| Type | Routing |
|------|---------|
| Trivial edit (one-line, typo fix) | Edit skill directly |
| Substantive edit (new section, new pattern) | Open PR for review |
| New skill needed | Document requirement for later |
| Principle addition | Add to appropriate principle skill |

### 4. Present for approval

Before applying any edit, present:

**Accepted:**
- Learning, routing, what will change

**Rejected:**
- Learning, reason

**Backlog:**
- Learning, why deferred

Wait for explicit approval. Skill changes affect every future agent. Do not auto-apply.

### 5. Apply approved edits

For each approved learning:
- Edit the skill file
- Validate frontmatter
- Run `/unslop` on changed sections

### 6. Summarize

Short list:

- **Edits applied:** `<skill path>`. What changed, one line each.
- **New skills flagged:** `<name>`. Requirement, one line each.
- **Dropped:** One line per rejected finding + reason.

## Guardrails

- **Don't overfit.** A correction during the task isn't automatically a skill edit.
- **Don't widen scope.** Edit only what the learning touches.
- **Don't duplicate.** Check if an existing skill already covers this.
- **Don't be clever.** Plain language, operational rules.

## Example Findings

**Accept:**
- "Always check color contrast ratio meets WCAG AA" → Add to `/a11y` skill

**Reject:**
- "Use blue for this specific button" → One-off decision, not generalizable

**Backlog:**
- "Need a playbook for design system token migration" → Too large for reflect

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Reflection: skill updates"
- playbook_name: "reflect"
- summary: Number of learnings processed
- files: Skills that were edited
- evidence: User approval of changes

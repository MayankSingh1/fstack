---
name: harness-improve
description: "Turn repeated agent misses into edits of skills, rules, or graders. Use for /harness-improve after a pilot, a failed verification loop, or the same correction showing up twice. This is not the metric Hillclimb playbook."
disable-model-invocation: true
---

# Harness Improve

This is Loop 4 from `/loop-engineering`. It does not make the product metric better. **Hillclimb** does that. This skill makes the next agent run better by changing the harness: skills, model-role rules, or the project verification skill.

Use it when a miss is durable. One typo is not a harness bug.

## Inputs

Read what you can see. Do not invent traces.

| Source | Look for |
|--------|----------|
| This conversation | Corrections, skipped playbook steps, false "done" |
| `/show-me-your-work` log | Decisions that were reversed |
| `FSTACK_CHANGELOG.md` or `.fstack/changelog.md` | Repeated playbooks with thin evidence |
| Verification Loop rubrics | The same check failing across attempts or tasks |
| Review comments | The same class of mistake twice |

If none of these exist, say so and stop. Do not rewrite skills from a hunch.

## Steps

### 1. List miss classes

A class counts after it happens twice, or once if it shipped a false success.

```markdown
| Class | Evidence | Count |
|-------|----------|-------|
| Skipped empty state | changelog + this chat | 2 |
```

Drop one-offs.

### 2. Pick the smallest harness edit

Change the layer that would have made the miss impossible or obvious.

| Miss | Edit this | Not this |
|------|-----------|----------|
| Playbook step agents skip | That playbook's `SKILL.md` | A longer chat prompt |
| Wrong model used for review vs build | `rules/fstack-models.mdc` or the project's copy | A new playbook |
| Grader does not catch the bug | Project `verify-*` skill via `/maintain-verification-skill` | Another retry in the same session |
| Prose or format of a skill is wrong | **Authoring a Skill** | A drive-by rewrite with no frontmatter check |
| Repo lets the mistake compile | `/correct` (architecture, types, lint, tests) | A skill paragraph nobody will open |
| Lesson is from this chat only | `/reflect` | A broad harness rewrite |

Propose one class at a time unless the user asks for a batch.

### 3. Write the change as a diff

For each accepted class:

```markdown
**File:** [path]
**Why this file:** [one sentence]
**Change:** [section to add or replace, quoted]
**How we will know it worked:** [the next task that should not repeat the miss]
```

Then apply it using **Authoring a Skill** when the target is a `SKILL.md`. Do not rename **Hillclimb**. If someone said "hill climb the prompts", they mean this skill.

### 4. Leave a human gate

Skill and rule edits change every later run. Show the diff and wait for confirmation before treating it as the new default, unless the user already said to apply it.

### 5. Prove the inner loop moved

Re-run one real task on Loop 1 (and Loop 2 if a rubric existed). The miss class should be gone or explicitly still open. Record that in the changelog via `/changelog-notetaker`.

## Related skills

| Skill | Use it for |
|-------|------------|
| `/reflect` | Learnings still inside this conversation |
| `/correct` | The codebase should make the mistake unrepresentable |
| `/maintain-verification-skill` | The project grader is stale |
| `/loop-engineering` | You are not sure this is Loop 4 |
| **Hillclimb** | A product metric target, not a skill edit |

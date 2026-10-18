---
name: verification-loop
description: "Wrap finished work in a rubric, grade it, and retry with feedback until it passes or the cap is hit. Use for 'verify before ship', 'run with a grader', or 'retry until the rubric passes'."
disable-model-invocation: true
---

# Verification Loop

This is Loop 2 from `/loop-engineering`. It does not replace a domain playbook. It wraps the result of one.

The agent does the work (Loop 1). This playbook grades that work, sends specific failures back, and retries. Deterministic checks come before any model-as-judge.

## When to use

- Quality matters more than a single fast pass
- "Verify before ship", "run with a grader", "retry until this passes"
- A project already has a `verify-*` skill, or should get one

Skip it for a one-line question, a read-only investigation, or a throwaway prototype.

## Phases

```
□ Phase 1: Name the work being graded
□ Phase 2: Write the rubric
□ Phase 3: Attach a grader
  └─ Calls: project verify-* skill, or /create-verification-skill once
□ Phase 4: Grade
□ Phase 5: Retry with feedback (cap 3)
□ Phase 6: Record evidence and stop
□ Phase 7: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Name the Work Being Graded

State what Loop 1 already did, or which playbook is still in progress.

```markdown
**Work:** [one sentence]
**Playbook:** [Figma to Code / Hillclimb / Feature / …]
**Commit or state:** [SHA, branch, or "uncommitted in this session"]
**Out of scope for this grade:** [explicit exclusions]
```

Do not widen the task here. If the work itself is unfinished, go back to the domain playbook first.

## Phase 2: Write the Rubric

Deterministic checks first. Add a human or model judge only for what a command cannot see.

```markdown
## Rubric

| # | Check | How | Pass |
|---|--------|-----|------|
| 1 | Tests | `npm test` | exit 0 |
| 2 | Lint / typecheck | [command] | exit 0 |
| 3 | Real screen | project verify-* or screenshot of the user flow | evidence captured |
| 4 | Accessibility | axe or /a11y on the changed UI | no new violations |
| 5 | Taste / framing (optional) | human grade | named reviewer says pass |

**Retry cap:** 3
**Fail closed:** if a required check cannot run, the grade is FAIL, not skip
```

Drop rows that do not apply. Do not invent a green check.

Domain playbooks already own some of this. Point at them instead of duplicating steps:

| Concern | Grader |
|---------|--------|
| Matches the design | Visual Parity evidence |
| Keyboard, contrast, names | Accessibility Audit or `/a11y` |
| One product metric | The Hillclimb measurement script |
| PR is actually safe to land | Shipping verdicts |

## Phase 3: Attach a Grader

Look for a project-local skill matching `.cursor/skills/verify-*/SKILL.md` (or the global equivalent).

- If one exists and covers this flow, call it.
- If none exists and the task is UI, call `/create-verification-skill` **once**, then use it.
- If the check is a script (Lighthouse, bundle size, test), that script is the grader. Record the exact command.

## Phase 4: Grade

Run every required row. Write one line per check:

```markdown
## Attempt 1 — [timestamp]

| # | Result | Evidence |
|---|--------|----------|
| 1 | PASS | test output path or command |
| 2 | FAIL | [quote the failure] |
| 3 | PASS | screenshot path |
```

Overall is **PASS** only when every required row is PASS.

## Phase 5: Retry with Feedback

If overall is FAIL and attempts used are under 3:

1. Send the failing rows back as the only feedback. Quote the command output or screenshot. Do not add new scope.
2. Return to Loop 1 and fix only those rows.
3. Re-run Phase 4 as the next attempt.

Stop retrying when:

- Overall is PASS, or
- Attempt 3 fails, or
- The same check fails with the same cause twice and needs a human or a harness change (`/harness-improve`, not another silent retry)

## Phase 6: Record Evidence and Stop

```markdown
## Verification result: PASS | FAIL

**Attempts:** [1–3]
**Evidence:**
- [command output, CI URL, screenshot path, verdict SHA]

**Still open:** [none, or the failing rows]
```

On FAIL, say what failed and which loop should run next (another domain fix, a human grade, or `/harness-improve`). Do not report the task as done.

## Phase 7: Changelog

Call `/changelog-notetaker` with the rubric name, attempt count, result, and evidence paths.

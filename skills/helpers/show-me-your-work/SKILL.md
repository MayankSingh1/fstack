---
name: show-me-your-work
description: "Keep a reviewable decision trail for long-running or unattended work: a TSV log with one row per decision (time, phase, decision, reason, evidence, result). Local by default; commit when a reviewer needs the trail. Use for /show-me-your-work, autonomous runs, or work reviewed later."
disable-model-invocation: true
---

# /show-me-your-work

Keep one canonical decision log for auditable work.

## When to use

- Long-running or autonomous tasks
- Work the user reviews after stepping away
- Multi-phase or multi-PR work
- "Going to bed, trust it when I'm back"
- Any task that needs an auditable trail

## The format

A single TSV file, one row per decision. Cells stay single-line. Evidence is a pointer, not prose.

### Columns

| Column | Content |
|--------|---------|
| **ts** | ISO8601 timestamp |
| **phase** | The phase or workstream |
| **decision** | What was chosen or done, one line |
| **why** | The reason in plain words |
| **evidence** | Link or path: commit SHA, PR#, file:line, screenshot path |
| **result** | Outcome: `tests green`, `reverted`, `pixel-diff 0`, `open` |

### Example

```tsv
ts	phase	decision	why	evidence	result
2026-10-10T09:02:00Z	setup	forked branch from main at abc123	starting point for the work	commit abc123	branch created
2026-10-10T09:15:00Z	implement	used existing Button component instead of new	matches design system	commit def456	tests green
2026-10-10T09:30:00Z	visual	captured baseline screenshots	need before/after comparison	evidence/baseline/	12 screenshots saved
2026-10-10T09:45:00Z	visual	fixed padding mismatch on Card	design shows 16px, implementation had 12px	commit ghi789, pixel-diff 0	matches design
2026-10-10T10:00:00Z	a11y	added aria-label to icon button	button had no accessible name	commit jkl012	axe passes
```

## Where it lives

By default: `decisions.tsv` in the work directory. Not committed.

For multiple concurrent efforts: `.audit/<effort-name>.tsv`

**Commit it** only when ambitious work needs an auditable trail for a reviewer.

## Logging a row

Write each entry plainly, the way you'd tell a teammate. No AI speak.

### Using the helper script

```bash
./scripts/log.sh "<phase>" "<decision>" "<why>" "<evidence>" "<result>"
```

The script handles:
- Timestamp
- Header on first use
- Tab/newline escaping
- Prefix for cells starting with `=`, `+`, `-`, `@`

### Manual append

```bash
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ)	phase	decision	why	evidence	result" >> decisions.tsv
```

## What to log

**Log decision points and checkpoints:**
- A fork chosen (used A instead of B)
- A unit completed with its verification result
- A pivot or revert with its trigger
- A blocker surfaced
- A gate fixed

**Don't log every action.** Skip the trivial and self-evident.

**For loop runs:** One row per iteration.

## Run boundaries

A run is one agent conversation including later turns.

When picking up a log that has rows from another run:
- First row has phase `start`
- Names the ts range of prior rows not from this run
- Evidence names this run (agent id)

## Rules

1. **Append-only.** Never edit or delete history. A wrong call gets a new row that supersedes it.
2. **Evidence resolves.** Every evidence pointer must actually exist.
3. **Plain words.** No jargon. Write for a reviewer.
4. **Commit scripts.** Prefer evidence from committed scripts over hand-made one-offs.

## Audit the log

At run end, before handing back:

1. Walk this run's rows against what actually happened
2. Check every row maps to a real decision
3. Check evidence resolves and shows what was claimed
4. Add missing forks/pivots that shaped the work
5. Supersede (don't delete) any wrong rows

## Cross-model review

Before handing back, spawn a subagent on a different model family:

The subagent reads the log and transcript, then flags:
- Decisions with weak or absent evidence
- Verification steps claimed without proof
- Choices that look risky in hindsight
- Gaps the user would miss on casual skim

Every reply ends with an "Attention" section listing flags.

## Reading the log

```bash
# Terminal view
column -s$'\t' -t decisions.tsv

# Or open in any spreadsheet
# GitHub renders committed TSV as a table
```

## Example workflow

```
User: "Going to bed. Migrate these components to the new design system."

Agent:
1. Start decision log
2. Log: starting migration of 5 components
3. For each component:
   - Log: decision made (which approach)
   - Log: completed (with evidence)
4. Log: any blockers encountered
5. Log: final state (3/5 done, 2 blocked)
6. Audit the log
7. Get cross-model review
8. Report with Attention section
```

## Integration with fstack

This skill is invoked:
- During long or autonomous runs
- When user steps away
- In **Shipping** playbook (decision trail)
- In **Pause Safely** playbook (durability)
- In any playbook that benefits from auditable history

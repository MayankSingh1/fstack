---
name: loop-engineering
description: "Map a task onto stacked agent loops: do the work, grade it, trigger it, then improve the harness. Use for /loop-engineering, 'stack loops', 'loopcraft', or 'how do loops work in fstack'."
disable-model-invocation: true
---

# Loop Engineering

Agents do useful work by looping. One loop is not enough when quality, scale, or repeated mistakes matter. Stack loops so each outer loop makes the inner ones better.

This skill is the fstack map of that idea, adapted from [The Art of Loop Engineering](https://www.langchain.com/blog/the-art-of-loop-engineering). Read this before inventing a new workflow. Then call the skill that owns the loop you actually need.

## The four loops

| Loop | What it does | Stop when |
|------|----------------|-----------|
| **1. Agent** | Model uses tools until the task is done | Done predicate is true, or a blocker needs a human |
| **2. Verification** | Grade the output against a rubric; retry with feedback if it fails | Rubric passes, or the retry cap is hit |
| **3. Event-driven** | Something outside the chat starts the agent | A trigger fires and Loop 1 (and usually Loop 2) runs |
| **4. Harness improve** | Use traces and failures to edit skills, rules, or graders | The next run is less likely to repeat the same miss |

Outer loops do not replace inner ones. Loop 4 edits the skills that Loop 1 follows. Loop 2 sends the agent back into Loop 1 with a specific failure.

```
Event (optional)
  → Agent loop (playbook)
    → Verification loop (rubric, retry)
      → Harness improve (only after a pattern, not every task)
```

## fstack command map

| Loop | When to use | Start here |
|------|-------------|------------|
| 1. Agent | Default task execution | `/flash-mode`, domain playbooks, **Autonomous Run**, **Orchestrate**, `/swarm` |
| 2. Verification | Consistency matters more than one-shot speed | **Verification Loop** playbook; `/create-verification-skill`; Visual Parity, Accessibility Audit, Shipping |
| 3. Event-driven | The agent should run without someone typing in chat | Not a playbook yet. See below. |
| 4. Harness improve | The same miss keeps showing up | `/harness-improve`, `/reflect`, `/correct`, `/maintain-verification-skill`, **Authoring a Skill** |

## Stacking rules

- **Ordinary task:** Loop 1 only. `/flash-mode` picks the playbook. Evidence rules inside that playbook are enough.
- **Quality bar is high** (ship, visual match, a11y, "don't stop until this passes"): Loop 1 playbook, then **Verification Loop** around the result.
- **Unattended finish:** **Autonomous Run** is still Loop 1. Add Verification Loop before calling it done.
- **Repeated agent mistakes or a bad playbook:** stop adding prompt text in chat. Run Loop 4 (`/harness-improve` or `/reflect`).
- **Product metric** (LCP, bundle size, axe count): **Hillclimb**, not Loop 4. Hillclimb changes the product. Loop 4 changes the harness.

## Do not confuse these two "climbs"

| Name | Changes | Use when |
|------|---------|----------|
| **Hillclimb** playbook | The product metric (LCP, axe violations, JS size) | "Get LCP under 2.5s" |
| **Loop 4 / `/harness-improve`** | Skills, rules, verification graders | "Agents keep skipping empty states" |

Same word in the LangChain post ("hill climbing") means harness improvement. In fstack, `hillclimb` is reserved for the metric playbook.

## Loop 3 (documented only)

fstack does not ship an event-trigger playbook. Event-driven means an outside signal starts Loop 1:

- A CI job after a push
- A Cursor hook or scheduled local run
- A webhook or Slack message (for example LangSmith Fleet channels)

When you add a trigger, point it at `/flash-mode` or a named playbook, and keep Verification Loop in the path if the output can merge or ship. Do not invent a second agent loop inside the trigger.

## Human oversight

Automation does not remove judgment.

| Loop | Keep a human when |
|------|-------------------|
| 1. Agent | The next action is destructive, financial, or a production write |
| 2. Verification | The rubric cannot see taste, framing, or audience fit. A human grades that part. |
| 3. Event-driven | The trigger would return output to users or merge without review |
| 4. Harness improve | A skill or rule edit would change how the whole team works. Review the diff before it becomes default. |

Shipping playbooks already refuse to merge without an explicit OK. Flash-mode refuses success without evidence on the real artifact. Those are human gates. Do not bypass them from an outer loop.

## Pilot stacks

Use these when validating fstack with teammates.

### 1. Figma to merge

1. Loop 1: **Figma to Code** via `/flash-mode`
2. Loop 2: **Verification Loop** with a visual and accessibility rubric
3. Loop 1: **Shipping**
4. Optional Loop 4: `/reflect` after merge if the playbook missed a step

### 2. Performance target

1. Loop 1: **Perf Issue**, or **Hillclimb** if the target is one metric
2. Loop 2: **Verification Loop** whose grader is the measurement script (median of several runs)

### 3. Tune the harness after a pilot

1. Collect a week of `/flash-mode` sessions, changelogs, and failed rubrics
2. Loop 4: `/harness-improve`
3. Edit skills through **Authoring a Skill**
4. Re-run one real task on Loop 1 to see if the miss is gone

## Further reading

- [The Art of Loop Engineering](https://www.langchain.com/blog/the-art-of-loop-engineering)
- LangSmith Engine and Fleet are one way to host Loop 3 and Loop 4. fstack does not require them. The loop pattern is what matters.

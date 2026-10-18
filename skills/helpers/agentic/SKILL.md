---
name: agentic
description: "Choose the lowest autonomy level that still does the job: Suggest, Draft, Confirm, Bounded, or Monitor. Use for /agentic, 'how much authority', or before a side effect."
disable-model-invocation: true
---

# Agentic UX

This is a helper, not a playbook and not an eighth principle. Playbooks do the work. The seven principles judge the design. `/guardrails` says whether an action is allowed. This skill says how much authority an allowed action gets.

Source: the [Agentic UX framework](https://aiuxplayground.com/frameworks/agentic). Grant the lowest level that delivers the outcome. When the signals conflict, stay lower, or split the job so the safe steps proceed and the high-impact step waits.

Higher is not better.

## When to use

- `/agentic` or "how much authority"
- Before a side effect: write, send, spend, delete, merge, or edit a skill
- The user asks to "just do it" and the action is more than advice

## The five levels

| Level | Name | Decides | Acts | Monitors | fstack |
|-------|------|---------|------|----------|--------|
| L1 | Suggest | User | User | User | Investigation, `/how-ui`, `/teach`, `/critique`. Advice only. |
| L2 | Draft | User | User finishes | User | Prototype, UX copy, handoff note, PR description. Mark it a draft. No merge, send, or delete. |
| L3 | Confirm | User approves | Agent after OK | User | Planner gate. `/guardrails` ask rows. Preview the exact change. Re-ask if the plan changes. |
| L4 | Bounded | User set the policy | Agent inside limits | User on exceptions | **Autonomous Run** inside its `WILL NOT` list. **Verification Loop** as the stop rule. Escalate when a limit hits. |
| L5 | Monitor | User set the policy | Agent | User and systems | Not a default. fstack has no always-on trigger. Use L4 unless the user explicitly asks to watch a running system. |

## Score one action

Answer each, then take the **lowest** level the answers support.

| Signal | Lower autonomy when | Higher only when |
|--------|---------------------|------------------|
| Impact | High or external | Low and local |
| Reversibility | Hard or permanent | Immediate undo |
| Reliability | Limited or unknown | Stable on this exact task |
| Sensitivity | Regulated or personal | Public and low |
| Detection | Easy to miss | Easy to spot |

Write the result:

```text
AUTONOMY
Action: [one action]
Level: L1 Suggest | L2 Draft | L3 Confirm | L4 Bounded | L5 Monitor
Why this is the lowest that works: [one sentence]
Decides: [who]
Acts: [who]
Monitors: [who]
Side effects: blocked until [level condition]
If the plan changes: re-ask or stay inside the same bounds
```

## Before raising a level

- Is this the lowest level that still delivers the outcome?
- Can the user see who decides, who acts, and who monitors?
- Are side effects blocked until this level allows them?
- If the plan changes, will you re-ask or stay inside the same bounds?
- Is there a deny, interrupt, or shutdown path?
- Are the limits hard (scope, `WILL NOT`, rubric), not a preference?
- Can the work be recovered after a bad action?

If any answer is no, drop one level.

## With guardrails

A `/guardrails` deny stays a deny. Autonomy does not override it.

An ask row is at least L3. Do not treat it as L4 because the user said "finish without me" at the start of a different task.

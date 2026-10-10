---
name: problem-framing
description: "Design playbook for problem framing and research synthesis. Clarifies user needs, gathers evidence, and frames the problem before solutioning."
---

# Problem Framing & Research Synthesis

This playbook helps you understand the problem before jumping to solutions. Good design starts with clarity about what you're solving and for whom.

## When to Use

- Starting a new feature or product
- User feedback suggests something is wrong but unclear what
- Stakeholders have conflicting views on what to build
- You need to synthesize research findings into actionable insights

## Playbook Steps

```
PLAYBOOK: Problem Framing & Research Synthesis
──────────────────────────────────────

□ Step 1: Gather existing knowledge
  └─ Calls: /why-this-design (for historical context)
  └─ Collect: user feedback, support tickets, analytics, prior research

□ Step 2: Define the user(s)
  └─ Who is affected by this problem?
  └─ What are their goals, contexts, and constraints?
  └─ Create or reference existing personas if available

□ Step 3: Articulate the problem statement
  └─ Format: "[User] needs [goal] because [insight], but [obstacle]"
  └─ Avoid solution-language in the problem statement

□ Step 4: Map the current experience
  └─ How do users currently accomplish this goal?
  └─ What are the pain points and workarounds?
  └─ Include screenshots or recordings if available

□ Step 5: Identify constraints and requirements
  └─ Technical constraints (API limitations, browser support)
  └─ Business constraints (timeline, budget, compliance)
  └─ Design constraints (brand, accessibility, consistency)

□ Step 6: Synthesize insights
  └─ Group findings into themes
  └─ Prioritize by impact and frequency
  └─ Identify patterns and outliers

□ Step 7: Frame success criteria
  └─ How will we know the problem is solved?
  └─ What metrics or behaviors indicate success?
  └─ Define minimum viable outcome

□ Step 8: Document and share
  └─ Create a problem brief or research summary
  └─ Share with stakeholders for alignment
  └─ Get sign-off before solutioning

□ Step 9: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Problem statement document with user evidence and success criteria defined
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Problem framing: [subject]" |
| playbook_name | "problem-framing" |
| summary | Problem statement and key insights |
| files | Problem brief document |
| evidence | Research synthesis, stakeholder sign-off |

## Problem Statement Template

```markdown
## Problem Statement

**User:** [Who is experiencing this problem]

**Goal:** [What they're trying to accomplish]

**Insight:** [Why this matters to them]

**Obstacle:** [What's preventing them from achieving the goal]

## Evidence

- [Research finding 1]
- [User quote or behavior]
- [Analytics data point]

## Success Criteria

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

## Constraints

- Technical: [List]
- Business: [List]
- Design: [List]
```

## Research Synthesis Methods

### Affinity Mapping
Group individual findings into themes. Look for:
- Repeated behaviors
- Common frustrations
- Shared goals
- Contradictory needs

### Jobs-to-be-Done
Frame problems as jobs users are hiring your product to do:
- "When [situation], I want to [motivation], so I can [expected outcome]"

### Impact/Effort Matrix
Prioritize problems by:
- How many users are affected
- How severe the impact is
- How feasible solutions are likely to be

## Common Pitfalls

| Pitfall | How to Avoid |
|---------|--------------|
| Solution-first thinking | Enforce "no solutions" during framing |
| Assuming you know the user | Validate with evidence, not intuition |
| Scope creep | Keep the problem statement focused |
| Analysis paralysis | Set a timebox for research |

## Integration with Flash-Mode

After this playbook completes, you'll have:
- A clear problem statement
- Documented user evidence
- Defined success criteria
- Stakeholder alignment

This feeds into: **User Flows & IA**, **Wireframe to Hi-Fi**, or direct to **Figma to Code** if the solution is clear.

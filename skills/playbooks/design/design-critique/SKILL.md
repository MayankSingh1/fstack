---
name: design-critique
description: "Design playbook for structured design critique. Gathers multi-perspective feedback and produces actionable improvements."
---

# Design Critique

This playbook facilitates structured design critique. It gathers feedback from multiple perspectives, distinguishes opinion from evidence, and produces actionable improvements.

## When to Use

- Before finalizing a design for handoff
- When stuck on a design decision
- Seeking feedback on a new pattern
- Validating a design against principles

## Playbook Steps

```
PLAYBOOK: Design Critique
──────────────────────────────────────

□ Step 1: Set context
  └─ What problem does this design solve?
  └─ Who is the user?
  └─ What constraints exist?
  └─ What feedback are you seeking?

□ Step 2: Present the design
  └─ Share screens/flows being critiqued
  └─ Explain key decisions already made
  └─ Note areas of uncertainty

□ Step 3: Gather multi-perspective feedback
  └─ Calls: /critique (multi-reviewer analysis)
  └─ Consider: user perspective, business needs, technical feasibility
  └─ Look for: usability issues, consistency problems, missed states

□ Step 4: Categorize feedback
  └─ Act on: Must fix before shipping
  └─ Consider: Worth discussing, may improve design
  └─ Noted: Valid but not actionable now
  └─ Dismissed: Not applicable, with reason

□ Step 5: Check against principles
  └─ Start from the user's task
  └─ Accessible by default
  └─ States are part of the design
  └─ Tokens over hard-coded values
  └─ Consistency with the design system

□ Step 6: Document findings
  └─ List specific issues identified
  └─ Propose solutions for "act on" items
  └─ Note reasoning for dismissed items

□ Step 7: Apply changes
  └─ Principle: Smallest change that works
  └─ Update designs based on feedback
  └─ Keep changes scoped to issues identified

□ Step 8: Verify improvements
  └─ Principle: Prove it on the real screen
  └─ Re-review changed areas
  └─ Confirm issues are resolved

EVIDENCE REQUIRED: Critique document with categorized feedback and updated designs
```

## Critique Framework

### The Four Categories

| Category | Definition | Action |
|----------|------------|--------|
| **Act on** | Critical issues that must be fixed | Fix immediately |
| **Consider** | Valid feedback worth exploring | Discuss, may implement |
| **Noted** | True but not actionable now | Log for future reference |
| **Dismissed** | Not applicable or incorrect | Explain why rejected |

### Feedback Quality Spectrum

```
WEAK FEEDBACK                              STRONG FEEDBACK
"I don't like it" ──────────────────────── "The CTA button lacks visual 
                                            prominence because it uses
                                            the same weight as body text,
                                            reducing conversion potential"
```

Good critique is:
- **Specific**: Points to exact elements
- **Grounded**: Cites evidence or principles
- **Actionable**: Suggests direction for improvement
- **Respectful**: Critiques the work, not the person

## Critique Questions by Lens

### Usability Lens
- Can users accomplish their goal?
- Is the flow intuitive?
- Are affordances clear?
- Where might users get stuck?

### Accessibility Lens
- Does it meet WCAG AA?
- Is keyboard navigation logical?
- Are color contrast ratios sufficient?
- Can screen readers parse it?

### Consistency Lens
- Does it match the design system?
- Are patterns used correctly?
- Is visual language consistent?
- Do interactions match expectations?

### Technical Lens
- Is this buildable?
- What are the edge cases?
- Performance implications?
- Responsive behavior?

## Critique Session Structure

```
1. CONTEXT (5 min)
   Designer presents problem and constraints

2. SILENT REVIEW (5 min)
   Reviewers examine designs independently

3. QUESTIONS (5 min)
   Clarifying questions only, no opinions

4. FEEDBACK (15 min)
   Specific, grounded feedback
   One issue at a time

5. CATEGORIZATION (10 min)
   Together, sort into act on / consider / noted / dismissed

6. NEXT STEPS (5 min)
   Agree on what changes will be made
```

## Common Critique Anti-Patterns

| Anti-Pattern | Better Approach |
|--------------|-----------------|
| "I would do it differently" | "This pattern may confuse users because..." |
| Redesigning in the meeting | Note the issue, solve it later |
| Defending instead of listening | Take notes, process later |
| Too many cooks | Limit to 3-5 reviewers |
| No clear outcome | End with categorized action list |

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Categorized feedback document
- Updated designs addressing "act on" items
- Documented reasoning for dismissed items
- Confidence to move toward handoff

This feeds into: **Wireframe to Hi-Fi** (if major changes needed), **Handoff Note**, or **Figma to Code**.

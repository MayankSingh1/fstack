---
name: critique
description: "Helper skill for multi-reviewer design/code critique. Gathers diverse perspectives and merges feedback into act on / consider / noted / dismissed categories."
---

# /critique

Performs multi-perspective critique on designs or code. Gathers feedback from different viewpoints, synthesizes findings, and categorizes them into actionable groups: act on, consider, noted, dismissed.

## When to Use

- Design review before handoff
- Code review for complex changes
- Architecture review
- UX copy review
- Getting multiple perspectives on a decision

## How to Invoke

```
/critique review this design for usability issues
/critique review this component for accessibility
/critique review the PR diff
```

## Review Perspectives

### Design Critique Perspectives

| Perspective | Focus |
|-------------|-------|
| **User** | Can they accomplish their goal? Is it intuitive? |
| **Accessibility** | WCAG compliance, keyboard, screen reader |
| **Consistency** | Matches design system? Follows patterns? |
| **Edge Cases** | Empty, error, loading, overflow states |
| **Performance** | Will this be fast to load/render? |
| **Mobile** | Works on touch? Thumb-reachable? |

### Code Critique Perspectives

| Perspective | Focus |
|-------------|-------|
| **Correctness** | Does it work? Edge cases handled? |
| **Security** | Any vulnerabilities? Input validation? |
| **Performance** | Time/space complexity? Render efficiency? |
| **Maintainability** | Readable? Well-structured? Documented? |
| **Accessibility** | Semantic HTML? ARIA? Keyboard? |
| **Testing** | Testable? Has tests? Coverage? |

## Critique Process

### Step 1: Establish Context
- What is being reviewed?
- What's the goal/requirement?
- What constraints exist?
- What feedback is most valuable?

### Step 2: Review from Each Perspective
Each perspective independently identifies:
- Issues (problems that need fixing)
- Observations (notable things, not necessarily problems)
- Questions (things that need clarification)
- Suggestions (potential improvements)

### Step 3: Synthesize and Deduplicate
- Group similar findings
- Note where perspectives agree
- Note where perspectives conflict
- Prioritize by severity

### Step 4: Categorize

| Category | Definition | Action |
|----------|------------|--------|
| **Act on** | Must fix before shipping | Immediate fix required |
| **Consider** | Worth discussing, may improve | Discuss with team/stakeholder |
| **Noted** | Valid but not actionable now | Log for future reference |
| **Dismissed** | Not applicable | Explain why rejected |

## Output Format

```markdown
## Critique: [What was reviewed]

### Summary
[One paragraph overview of critique findings]

### Act On (Must Fix)

#### [Issue 1]
- **Severity**: Critical/High/Medium
- **Perspectives**: User, Accessibility
- **Issue**: [Clear description of the problem]
- **Evidence**: [Why this is a problem]
- **Recommendation**: [How to fix]

#### [Issue 2]
...

### Consider (Worth Discussing)

#### [Item 1]
- **Perspectives**: [Which perspectives raised this]
- **Observation**: [What was noticed]
- **Tradeoff**: [Pros/cons of addressing]
- **Recommendation**: [Suggested approach]

### Noted (For Later)

- [Item 1]: [Brief description] — [Why noted, not acted on]
- [Item 2]: [Brief description] — [Why noted, not acted on]

### Dismissed (Not Applicable)

- [Item 1]: [What was suggested] — [Why dismissed]
- [Item 2]: [What was suggested] — [Why dismissed]

### Perspectives That Agreed
[Note where multiple perspectives found the same issue — higher confidence]

### Open Questions
- [Question that needs stakeholder input]
```

## Quality Critique Characteristics

### Good Critique
- **Specific**: Points to exact elements
- **Grounded**: Cites evidence or principles
- **Actionable**: Clear path to improvement
- **Balanced**: Notes strengths, not just problems
- **Respectful**: Critiques work, not person

### Bad Critique
- **Vague**: "I don't like it"
- **Unfounded**: "This seems wrong"
- **Unhelpful**: "This is bad"
- **Pile-on**: Only negatives
- **Personal**: "You always do this"

## Critique by Severity

### Critical (Act On Immediately)
- Blocks users from completing tasks
- Security vulnerability
- Accessibility barrier
- Data loss risk
- Legal/compliance issue

### High (Act On Before Ship)
- Significant UX friction
- Performance problem
- Confusing interface
- Missing important state

### Medium (Consider)
- Minor UX improvement
- Code could be cleaner
- Documentation gap
- Nice-to-have enhancement

### Low (Note)
- Nitpick
- Style preference
- Future opportunity
- Edge case unlikely to hit

## Example Critique Output

```markdown
## Critique: User Settings Page

### Summary
The settings page is generally well-structured but has 
accessibility issues with form labels and could benefit 
from better feedback states. Three items need immediate 
attention, two are worth discussing.

### Act On (Must Fix)

#### 1. Form Labels Not Associated
- **Severity**: High
- **Perspectives**: Accessibility
- **Issue**: Input fields use visual labels but no `<label>` 
  element or `aria-labelledby`
- **Evidence**: Screen readers announce "edit text" with no context
- **Recommendation**: Add proper label association with `for` attribute

#### 2. No Error State for Failed Save
- **Severity**: High  
- **Perspectives**: User, Edge Cases
- **Issue**: When save fails, user gets no feedback
- **Evidence**: Network error results in silent failure
- **Recommendation**: Add error toast and inline field errors

#### 3. Insufficient Color Contrast
- **Severity**: Medium
- **Perspectives**: Accessibility
- **Issue**: Helper text is gray-400 on white (3.2:1 ratio)
- **Evidence**: WCAG AA requires 4.5:1 for normal text
- **Recommendation**: Use gray-600 or darker

### Consider (Worth Discussing)

#### Password Field Show/Hide
- **Perspectives**: User, Consistency
- **Observation**: Other forms in app have show/hide toggle, this doesn't
- **Tradeoff**: Adds complexity vs. consistency with rest of app
- **Recommendation**: Add for consistency

### Noted
- Form could use auto-save (low priority enhancement)
- Animation on save could be smoother (polish)

### Dismissed
- "Use a modal for confirmation" — Current inline confirmation 
  is sufficient and less disruptive
```

## Integration with Flash-Mode

This skill is called during:
- **Design Critique** playbook (dedicated critique session)
- **Open a PR** playbook (self-review step)
- **Wireframe to Hi-Fi** (design review checkpoint)
- Any playbook that benefits from multiple perspectives

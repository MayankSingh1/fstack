---
name: feature
description: "Full feature implementation playbook: understand user need, architect the solution, implement, critique, verify on real UI. Use for 'build this feature', 'implement this', or new feature work."
disable-model-invocation: true
---

# Feature Playbook

Full lifecycle for implementing a new feature from user need through verified, shipped code.

## Phases

```
□ Phase 1: Understand the user need
  └─ Calls: /how-ui (existing context)
□ Phase 2: Architect the solution
  └─ Calls: /architect
□ Phase 3: Implement
□ Phase 4: Critique
  └─ Calls: /critique
□ Phase 5: Verify on real UI
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Understand the User Need

Before building, understand what the user actually needs.

### Questions to answer

- What problem does this solve for the user?
- What does success look like from the user's perspective?
- What existing patterns does this relate to?
- Are there constraints (accessibility, performance, browser support)?

### Actions

1. Run `/how-ui` on related screens/components
2. Review design specs (Figma, requirements doc)
3. Identify affected states (loading, error, empty, success)
4. Note integration points with existing code

### Output

```markdown
**User Need:** [What the user is trying to accomplish]
**Success Criteria:** [How we know it's done]
**Related Patterns:** [Existing components/patterns to follow]
**States Required:** [loading, error, empty, success, etc.]
**Constraints:** [a11y, perf, browser, etc.]
```

## Phase 2: Architect the Solution

Design before implementing.

### Actions

1. Run `/architect` with the user need and constraints
2. Sketch component API from usage perspective first
3. Design at least two approaches before picking
4. Check against design system patterns

### Output

- Component API (props, types)
- State management approach
- File structure
- Key decisions with rationale

## Phase 3: Implement

Build the feature.

### Sequence

1. **Scaffold structure** — Files, types, exports
2. **Build the happy path** — Primary use case
3. **Handle states** — Loading, error, empty
4. **Add accessibility** — Keyboard, screen reader, focus
5. **Apply styling** — Using design tokens
6. **Add responsiveness** — Mobile through desktop

### Guidelines

- Follow the architecture from Phase 2
- Use design tokens, not hard-coded values
- Handle all states from Phase 1
- Keyboard navigable by default
- Match existing code patterns

### Checkpoints

- TypeScript compiles with no errors
- Renders in dev server
- Basic interaction works

## Phase 4: Critique

Get multi-perspective feedback.

### Actions

1. Run `/critique` on the implementation
2. Address critical issues immediately
3. Log non-critical issues for follow-up

### Reviewers

| Perspective | Focus |
|-------------|-------|
| User | Does it solve the problem? |
| Accessibility | Keyboard, screen reader, WCAG |
| Design | Matches specs, uses tokens |
| Code | Follows patterns, maintainable |

## Phase 5: Verify on Real UI

Prove it works on the real artifact.

### Verification checklist

| Check | Method |
|-------|--------|
| Renders correctly | Visual inspection in dev server |
| All states work | Toggle through each state |
| Responsive | Resize viewport |
| Accessible | Keyboard nav, screen reader test |
| Design match | Compare to Figma |
| No regressions | Run existing tests |

### Evidence required

- Screenshot of feature working
- States demonstrated (loading, error, empty, success)
- Accessibility test output
- Test results

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | Feature name |
| playbook_name | "feature" |
| summary | What was built |
| files | All changed files |
| prs | PR number if opened |
| evidence | Screenshots, test results |

## Output Format

```markdown
## Feature Complete: [Name]

**User Need:** [What problem it solves]
**Implementation:** [Brief technical approach]

### Architecture
[Key decisions from Phase 2]

### What Was Built
- [Component/file 1]
- [Component/file 2]
- ...

### Verification
- ✓ Visual: [screenshot link]
- ✓ States: All states render correctly
- ✓ Accessibility: [test output]
- ✓ Tests: [N] tests passing

### Changelog Entry
Recorded in [changelog path]
```

## When to Skip Steps

| Situation | Skip |
|-----------|------|
| Trivial feature (< 50 lines) | Phase 2 (architect) |
| Copy of existing pattern | Phase 2 (follow existing) |
| User already critiqued | Phase 4 |

Always do: Phase 1, Phase 3, Phase 5, Phase 6

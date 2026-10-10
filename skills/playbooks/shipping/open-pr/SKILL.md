---
name: open-pr
description: "Shipping playbook for opening pull requests. Covers clear descriptions, before/after evidence, accessibility notes, and review readiness checklist."
---

# Open a PR

This playbook helps you open high-quality pull requests that are easy to review and merge. Clear description, visual evidence, accessibility notes, and a checklist that proves the work is complete.

## When to Use

- Code is ready for review
- Feature or fix is complete
- After passing local tests
- When changes need team review

## Playbook Steps

```
PLAYBOOK: Open a PR
──────────────────────────────────────

□ Step 1: Verify changes are complete
  └─ All playbook steps from prior work completed
  └─ Local tests passing
  └─ No linting errors
  └─ No console errors

□ Step 2: Self-review the diff
  └─ Read every changed line
  └─ Look for: debug code, TODOs, commented code
  └─ Check: naming, formatting, imports
  └─ Calls: /unslop (on any copy/comments)

□ Step 3: Capture before/after evidence
  └─ Principle: Prove it on the real screen
  └─ Screenshots of visual changes
  └─ GIFs/videos for interactive changes
  └─ Before state and after state

□ Step 4: Write PR title
  └─ Format: type(scope): description
  └─ Types: feat, fix, refactor, style, docs, test
  └─ Keep under 72 characters
  └─ Example: feat(auth): add password reset flow

□ Step 5: Write PR description
  └─ What: What does this PR do?
  └─ Why: Why is this change needed?
  └─ How: How does it work? (if non-obvious)
  └─ Testing: How was this tested?

□ Step 6: Add visual evidence
  └─ Screenshots embedded in PR
  └─ Before/after comparison
  └─ All states if applicable
  └─ Responsive views if applicable

□ Step 7: Add accessibility notes
  └─ How was a11y tested?
  └─ Any known a11y considerations
  └─ WCAG criteria addressed (if relevant)

□ Step 8: Complete checklist
  └─ [ ] Code follows project conventions
  └─ [ ] Tests added/updated
  └─ [ ] Documentation updated
  └─ [ ] Accessibility verified
  └─ [ ] No console errors
  └─ [ ] Self-reviewed the diff

□ Step 9: Set reviewers and labels
  └─ Request appropriate reviewers
  └─ Add relevant labels
  └─ Link related issues

□ Step 10: Final check
  └─ PR description is complete
  └─ CI is passing (or expected to pass)
  └─ Ready for review

□ Step 11: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: PR opened with complete description, visual evidence, and passing CI
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "PR opened: [title]" |
| playbook_name | "open-pr" |
| summary | PR #N opened for [feature/fix] |
| files | Files in the PR |
| prs | PR number and URL |
| evidence | Screenshot evidence, checklist status |

## PR Description Template

```markdown
## What

[Brief description of what this PR does]

## Why

[Context on why this change is needed. Link to issue if applicable]

## How

[Technical details if the approach isn't obvious]

## Testing

- [ ] Tested manually in [browsers]
- [ ] Unit tests added/updated
- [ ] Accessibility tested with [tools/methods]

## Screenshots

### Before
[Screenshot of before state]

### After  
[Screenshot of after state]

## Accessibility

- Keyboard navigation: [verified/not applicable]
- Screen reader: [tested with X / not applicable]
- Color contrast: [verified/not applicable]

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added/updated tests
- [ ] Documentation updated (if needed)
- [ ] No console errors or warnings
- [ ] Accessibility verified
```

## PR Title Conventions

### Format
```
type(scope): imperative description

Examples:
feat(button): add loading state
fix(form): prevent double submission
refactor(card): extract CardHeader component
style(global): update primary color token
docs(readme): add installation instructions
test(auth): add login flow tests
```

### Types
| Type | Use For |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `style` | Visual/CSS changes |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependencies |

## Visual Evidence Guidelines

### Screenshots
- Full viewport for page-level changes
- Component-level crop for component changes
- Include relevant context (sidebar, header if meaningful)

### Before/After Format
```markdown
| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |
```

### Animated Changes
- Use GIF or video for interactions
- Keep under 10 seconds
- Show full interaction cycle
- Consider reduced motion users

### Responsive Views
```markdown
### Mobile (375px)
[screenshot]

### Desktop (1440px)  
[screenshot]
```

## Self-Review Checklist

Before requesting review:

### Code Quality
- [ ] No `console.log` or debug statements
- [ ] No commented-out code
- [ ] No TODOs that should be addressed now
- [ ] Variable names are clear
- [ ] Functions are reasonably sized
- [ ] No duplicate code

### Style
- [ ] Follows project formatting (Prettier/ESLint passing)
- [ ] Imports are organized
- [ ] CSS/styles use design tokens
- [ ] No hard-coded colors or spacing

### Testing
- [ ] New code has test coverage
- [ ] Existing tests still pass
- [ ] Edge cases considered

### Accessibility
- [ ] Interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Labels and ARIA are correct
- [ ] Color contrast is sufficient

### Performance
- [ ] No unnecessary re-renders
- [ ] Images are optimized
- [ ] No memory leaks from event listeners

## Linking to Issues

```markdown
## Related Issues

Closes #123
Relates to #456
Part of #789
```

| Keyword | Effect |
|---------|--------|
| `Closes #N` | Closes issue when PR merges |
| `Fixes #N` | Closes issue when PR merges |
| `Relates to #N` | Links without closing |
| `Part of #N` | For epic/larger issue |

## Draft PRs

Open as draft when:
- Work in progress, want early feedback
- CI needs to run before ready
- Documentation still being written
- Waiting on dependent changes

Convert to ready when all checklist items complete.

## Integration with Flash-Mode

After this playbook completes, you'll have:
- PR opened with complete description
- Visual evidence of changes
- Accessibility documented
- CI running (or passed)
- Ready for review

This feeds into: **Babysit PR** (to get it merged).

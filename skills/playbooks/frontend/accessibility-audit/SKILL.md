---
name: accessibility-audit
description: "Frontend playbook for WCAG 2.2 AA accessibility audits. Covers automated testing, manual checks, and remediation."
---

# Accessibility Audit

This playbook performs a comprehensive WCAG 2.2 AA accessibility audit. It combines automated testing, manual checks, and assistive technology testing to identify and fix accessibility issues.

## When to Use

- Pre-release accessibility verification
- Responding to accessibility bug reports
- Routine accessibility review
- New feature accessibility sign-off

## Playbook Steps

```
PLAYBOOK: Accessibility Audit (WCAG 2.2 AA)
──────────────────────────────────────

□ Step 1: Run automated checks
  └─ axe-core or similar automated tool
  └─ Document all violations
  └─ Note: Automated catches ~30% of issues

□ Step 2: Keyboard navigation audit
  └─ Tab through all interactive elements
  └─ Verify focus order matches visual order
  └─ Check all actions possible without mouse
  └─ Verify focus visible on all elements
  └─ Test Escape to close modals/dropdowns

□ Step 3: Screen reader testing
  └─ Test with VoiceOver (Mac) or NVDA (Windows)
  └─ Navigate by headings — is structure logical?
  └─ Navigate by landmarks — are regions identified?
  └─ Interact with forms — are labels announced?
  └─ Test dynamic content — are updates announced?

□ Step 4: Color and contrast
  └─ Run contrast checker on all text
  └─ Minimum 4.5:1 for normal text
  └─ Minimum 3:1 for large text (18px+ or 14px+ bold)
  └─ Check UI components have 3:1 contrast
  └─ Verify color isn't only indicator

□ Step 5: Forms and inputs
  └─ Every input has visible label
  └─ Labels programmatically associated (for/id)
  └─ Required fields indicated (not just *)
  └─ Error messages near the field
  └─ Errors announced to screen readers

□ Step 6: Images and media
  └─ All meaningful images have alt text
  └─ Decorative images have alt=""
  └─ Complex images have long descriptions
  └─ Videos have captions
  └─ Audio has transcripts

□ Step 7: Interactive components
  └─ Calls: /a11y (for detailed component check)
  └─ Buttons use <button> element
  └─ Links use <a> with href
  └─ Custom components have correct ARIA roles
  └─ State changes announced

□ Step 8: Motion and animation
  └─ Respect prefers-reduced-motion
  └─ No content flashes more than 3x/second
  └─ Animations can be paused

□ Step 9: Zoom and resize
  └─ Test at 200% zoom
  └─ Test at 400% zoom (WCAG 2.2)
  └─ Text resize doesn't break layout
  └─ No horizontal scrolling at 320px width

□ Step 10: Document findings
  └─ Categorize by severity (critical, serious, moderate, minor)
  └─ Include WCAG criterion violated
  └─ Provide remediation guidance

□ Step 11: Fix critical issues
  └─ Prioritize: critical → serious → moderate → minor
  └─ Principle: Smallest change that works
  └─ Verify each fix

□ Step 12: Retest
  └─ Run automated check again
  └─ Spot-check manual fixes
  └─ Document remaining issues

EVIDENCE REQUIRED: Accessibility audit report showing WCAG 2.2 AA compliance OR documented issues with remediation plan
```

## WCAG 2.2 Quick Reference

### Level A (Minimum)

| Criterion | Requirement |
|-----------|-------------|
| 1.1.1 Non-text Content | Alt text for images |
| 1.3.1 Info and Relationships | Semantic HTML structure |
| 1.4.1 Use of Color | Color not sole indicator |
| 2.1.1 Keyboard | All functionality via keyboard |
| 2.4.1 Bypass Blocks | Skip links |
| 3.1.1 Language of Page | Lang attribute |
| 4.1.1 Parsing | Valid HTML |

### Level AA (Standard)

| Criterion | Requirement |
|-----------|-------------|
| 1.4.3 Contrast | 4.5:1 text contrast |
| 1.4.4 Resize Text | 200% zoom without loss |
| 2.4.6 Headings and Labels | Descriptive headings |
| 2.4.7 Focus Visible | Visible focus indicator |
| 3.2.3 Consistent Navigation | Navigation consistency |
| 3.3.3 Error Suggestion | Help fixing errors |

### New in WCAG 2.2

| Criterion | Requirement |
|-----------|-------------|
| 2.4.11 Focus Not Obscured | Focus indicator not hidden |
| 2.4.13 Focus Appearance | Enhanced focus visibility |
| 2.5.7 Dragging Movements | Alternative to drag |
| 2.5.8 Target Size | 24x24px minimum |
| 3.2.6 Consistent Help | Help in consistent location |
| 3.3.7 Redundant Entry | Don't re-ask for info |

## Common Issues and Fixes

### Missing Focus Indicator

```css
/* Bad: removes focus */
:focus {
  outline: none;
}

/* Good: custom focus that's visible */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Color-Only Indicator

```jsx
// Bad: color only
<span className={error ? "text-red-500" : ""}>
  Email is invalid
</span>

// Good: color + icon
<span className={error ? "text-red-500" : ""}>
  <ErrorIcon /> Email is invalid
</span>
```

### Missing Form Label

```jsx
// Bad: placeholder only
<input placeholder="Email" />

// Good: visible label
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Inaccessible Button

```jsx
// Bad: div as button
<div onClick={handleClick}>Click me</div>

// Good: actual button
<button onClick={handleClick}>Click me</button>
```

## Testing Tools

### Automated
- axe DevTools (browser extension)
- Lighthouse accessibility audit
- WAVE (browser extension)
- eslint-plugin-jsx-a11y

### Manual
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Browser zoom (200%, 400%)
- Windows High Contrast mode

### Screen Readers
- VoiceOver (Mac): Cmd+F5 to enable
- NVDA (Windows): Free download
- TalkBack (Android)
- VoiceOver (iOS)

## Issue Severity Levels

| Level | Definition | Example |
|-------|------------|---------|
| **Critical** | Blocks access completely | Can't submit form via keyboard |
| **Serious** | Major barrier to use | Missing form labels |
| **Moderate** | Difficulty but usable | Low contrast on secondary text |
| **Minor** | Inconvenience | Redundant link text |

## Audit Report Template

```markdown
# Accessibility Audit Report

**Date:** [Date]
**Scope:** [Pages/components audited]
**Standard:** WCAG 2.2 AA

## Summary
- Critical: [N]
- Serious: [N]
- Moderate: [N]
- Minor: [N]

## Critical Issues

### Issue 1: [Title]
- **Location:** [URL/component]
- **WCAG:** [Criterion number]
- **Description:** [What's wrong]
- **Impact:** [Who is affected]
- **Recommendation:** [How to fix]

## [Repeat for other severity levels]
```

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Comprehensive audit results
- Issues categorized by severity
- Remediation guidance
- Evidence of compliance or improvement plan

This feeds into: **Bug Fix** (for remediation), **Open a PR** (with a11y notes), or ongoing maintenance.

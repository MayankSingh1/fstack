---
name: wireframe-to-hifi
description: "Design playbook for taking wireframes through to high-fidelity designs. Covers layout, visual design, and design system application."
---

# Wireframe to Hi-Fi

This playbook takes rough wireframes or sketches through to polished, high-fidelity designs ready for development. It covers layout decisions, visual design application, and design system usage.

## When to Use

- Turning sketches into detailed mockups
- Applying visual design to wireframes
- Creating final designs for handoff
- Iterating on existing designs toward polish

## Playbook Steps

```
PLAYBOOK: Wireframe to Hi-Fi
──────────────────────────────────────

□ Step 1: Validate wireframe with requirements
  └─ Does the wireframe address the user problem?
  └─ Are all required elements present?
  └─ Check against user flow if available

□ Step 2: Establish layout grid
  └─ Define column structure (12-column, etc.)
  └─ Set margins and gutters
  └─ Plan responsive breakpoints

□ Step 3: Inventory required components
  └─ Principle: Consistency with the design system
  └─ List all UI elements needed
  └─ Check existing design system for components

□ Step 4: Apply typography
  └─ Principle: Tokens over hard-coded values
  └─ Use type scale from design system
  └─ Establish hierarchy (H1, H2, body, caption)

□ Step 5: Apply color
  └─ Use color tokens from design system
  └─ Ensure sufficient contrast
  └─ Principle: Accessible by default

□ Step 6: Design all states
  └─ Principle: States are part of the design
  └─ Empty state
  └─ Loading state
  └─ Error state
  └─ Success/filled state
  └─ Interactive states (hover, focus, active, disabled)

□ Step 7: Add spacing and alignment
  └─ Principle: Tokens over hard-coded values
  └─ Use spacing scale consistently
  └─ Align elements to grid

□ Step 8: Design responsive variants
  └─ Mobile viewport
  └─ Tablet viewport (if applicable)
  └─ Desktop viewport
  └─ Consider touch targets on mobile

□ Step 9: Add micro-interactions
  └─ Transitions between states
  └─ Feedback on user actions
  └─ Loading indicators

□ Step 10: Run accessibility check
  └─ Calls: /a11y
  └─ Contrast ratios
  └─ Focus indicators
  └─ Touch target sizes

□ Step 11: Review against design system
  └─ Are all components from the system?
  └─ Any deviations documented?
  └─ New patterns identified?

□ Step 12: Prepare for handoff
  └─ Annotate complex interactions
  └─ Document any edge cases
  └─ Organize layers and naming

EVIDENCE REQUIRED: Hi-fi designs in Figma (or equivalent) showing all states and responsive variants
```

## Layout Grid Guidelines

### Desktop (1440px)
- 12 columns
- 72px column width
- 24px gutter
- 80px margins (or full-bleed)

### Tablet (768px)
- 8 columns
- Variable column width
- 24px gutter
- 32px margins

### Mobile (375px)
- 4 columns
- Variable column width
- 16px gutter
- 16px margins

## State Design Checklist

For each interactive component:

| State | Required? | Considerations |
|-------|-----------|----------------|
| Default | ✓ | Normal appearance |
| Hover | Desktop | Subtle visual change |
| Focus | ✓ | Visible focus ring |
| Active/Pressed | ✓ | Feedback on click/tap |
| Disabled | If applicable | Reduced contrast, no interaction |
| Loading | If async | Spinner or skeleton |
| Error | If validation | Red border, error message |
| Success | If feedback needed | Confirmation |

## Typography Scale Example

```
Display:    48px / 56px line-height / -0.02em
H1:         36px / 44px line-height / -0.01em
H2:         28px / 36px line-height
H3:         24px / 32px line-height
H4:         20px / 28px line-height
Body:       16px / 24px line-height
Body Small: 14px / 20px line-height
Caption:    12px / 16px line-height
```

## Spacing Scale Example

```
4px   (xs)   - tight spacing, inline elements
8px   (sm)   - related elements
16px  (md)   - standard spacing
24px  (lg)   - section spacing
32px  (xl)   - large gaps
48px  (2xl)  - major sections
64px  (3xl)  - page-level spacing
```

## Common Hi-Fi Mistakes

| Mistake | Fix |
|---------|-----|
| Designing only happy path | Design all states first |
| Inconsistent spacing | Use spacing scale |
| Ignoring mobile | Design mobile-first |
| Custom colors | Use color tokens |
| Missing focus states | Every interactive = focus ring |
| Placeholder as label | Always visible labels |

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Polished hi-fi designs
- All states designed
- Responsive variants
- Accessibility verified
- Ready for handoff

This feeds into: **Design Critique**, **Figma to Code**, or **Handoff Note**.

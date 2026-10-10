---
name: figma-to-code
description: "Frontend playbook for implementing Figma designs in code. Uses Figma MCP when available, ensures design fidelity, and maintains design system alignment."
---

# Figma to Code

This playbook helps you implement Figma designs in production code. It uses the Figma MCP when available, ensures visual fidelity, and maintains alignment with the design system.

## When to Use

- Implementing a new design from Figma
- Building components from design specs
- Translating mockups to production code
- Updating implementations to match design changes

## Prerequisites

- Figma file URL or frame reference
- Access to Figma MCP (recommended) or exported assets
- Understanding of the target framework (React, Vue, etc.)

## Playbook Steps

```
PLAYBOOK: Figma to Code
──────────────────────────────────────

□ Step 1: Analyze the Figma design
  └─ If Figma MCP available: Use get_design_context to extract structure
  └─ If not: Manually inspect layers, spacing, typography, colors
  └─ Identify all components and their variants
  └─ Note any interactions or animations specified

□ Step 2: Map to existing components
  └─ Principle: Consistency with the design system
  └─ Which design elements map to existing code components?
  └─ What's new that needs to be built?
  └─ Document any gaps between design system and design

□ Step 3: Extract design tokens
  └─ Principle: Tokens over hard-coded values
  └─ Map colors to existing tokens (or note new ones needed)
  └─ Map typography to existing scales
  └─ Map spacing to existing spacing scale

□ Step 4: Plan component structure
  └─ Break down into atomic components
  └─ Identify shared vs. specific components
  └─ Plan props and variants needed

□ Step 5: Implement structure first
  └─ Build the HTML/JSX structure
  └─ No styling yet — just semantic markup
  └─ Principle: Accessible by default
  └─ Use correct HTML elements (button, nav, etc.)

□ Step 6: Add accessibility foundations
  └─ ARIA labels where needed
  └─ Keyboard interaction handlers
  └─ Focus management
  └─ Alt text for images

□ Step 7: Apply styling with tokens
  └─ Use design tokens, not hard-coded values
  └─ Match spacing exactly
  └─ Match typography exactly
  └─ Match colors exactly

□ Step 8: Implement all states
  └─ Principle: States are part of the design
  └─ Default state
  └─ Hover/focus/active states
  └─ Loading state
  └─ Error state
  └─ Disabled state
  └─ Empty state (if applicable)

□ Step 9: Add responsive behavior
  └─ Mobile breakpoint
  └─ Tablet breakpoint (if designed)
  └─ Desktop breakpoint
  └─ Check touch targets on mobile (44px minimum)

□ Step 10: Visual comparison
  └─ Calls: /visual-parity (if detailed comparison needed)
  └─ Screenshot implementation
  └─ Compare against Figma
  └─ List any discrepancies

□ Step 11: Accessibility audit
  └─ Calls: /a11y
  └─ Keyboard navigation test
  └─ Screen reader test
  └─ Contrast check

□ Step 12: Document deviations
  └─ Note any intentional differences from design
  └─ Document any technical constraints
  └─ Flag any design issues discovered

□ Step 13: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Working implementation with screenshot comparison to Figma design
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Figma to code: [component/screen]" |
| playbook_name | "figma-to-code" |
| summary | What was implemented |
| files | Created/modified files |
| evidence | Screenshot comparison, Figma link |

## Using Figma MCP

When the Figma MCP is available, use it for accurate extraction:

```
1. Get design context:
   - Call get_design_context with node ID and file key
   - Receives structured component data

2. Extract tokens:
   - Colors, fonts, and spacing from the design
   - Maps to or identifies gaps in your token system

3. Get assets:
   - Export icons and images through the MCP
   - Proper formats and sizes
```

### Figma URL Parsing

```
figma.com/design/:fileKey/:fileName?node-id=:nodeId
                  ↑                         ↑
                  Use as fileKey            Convert "-" to ":"
```

## Token Mapping Workflow

```
Figma Value          Your Token System           Code
─────────────────────────────────────────────────────────
#3B82F6              → --color-primary          var(--color-primary)
16px                 → --spacing-4              spacing={4} or p-4
600 weight           → --font-weight-semibold   font-semibold
8px radius           → --radius-md              rounded-md
```

If a Figma value doesn't map to an existing token:
1. Check if the design should use an existing token
2. If new value is intentional, propose a new token
3. Never hard-code values that should be tokens

## Common Figma-to-Code Issues

| Figma | Code Reality | Solution |
|-------|--------------|----------|
| Auto Layout | Flexbox | Map direction, gap, padding |
| Constraints | Responsive CSS | Use relative units |
| Component variants | Props | Map variant names to prop values |
| Shadows | box-shadow | Extract values, map to tokens |
| Blending modes | mix-blend-mode | May need adjustment |
| Specific pixel values | Token equivalents | Map to closest token |

## Responsive Implementation

### From Figma Frames to Breakpoints

```
Figma Frame          CSS Breakpoint
───────────────────────────────────
Mobile (375px)       @media (max-width: 767px)
Tablet (768px)       @media (min-width: 768px)
Desktop (1440px)     @media (min-width: 1024px)
```

### Touch Target Adjustment

```jsx
// Figma shows 24px icon
// Code needs 44px touch target

<button className="p-2.5 -m-2.5">  {/* Extends hit area */}
  <Icon size={24} />
</button>
```

## Quality Checklist

Before marking complete:

- [ ] All design elements implemented
- [ ] Using design tokens, not hard-coded values
- [ ] All states implemented (hover, focus, loading, error, empty)
- [ ] Responsive at all breakpoints
- [ ] Accessible (keyboard, screen reader, contrast)
- [ ] Visual comparison shows match (or deviations documented)
- [ ] Code follows existing patterns in codebase

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Production code matching Figma design
- All states implemented
- Responsive behavior working
- Accessibility verified

This feeds into: **Visual Parity** (for detailed comparison), **Open a PR**, or **Design Critique** (if issues found).

---
name: visual-parity
description: "Frontend playbook for achieving visual parity between design and implementation. Uses screenshot comparison — nonzero pixel diff equals failure."
---

# Visual Parity

This playbook ensures pixel-perfect alignment between design and implementation. It uses screenshot comparison as the source of truth. A nonzero pixel difference in meaningful areas is a failure that must be addressed.

## When to Use

- Verifying Figma-to-code implementation
- QA of visual changes
- Debugging "it doesn't look right" reports
- Pre-PR visual verification

## Playbook Steps

```
PLAYBOOK: Visual Parity
──────────────────────────────────────

□ Step 1: Identify the source of truth
  └─ Get the specific Figma frame URL
  └─ Confirm this is the approved design
  └─ Note any known intentional deviations

□ Step 2: Set up comparison environment
  └─ Implementation running on dev server
  └─ Same viewport size as Figma frame
  └─ Same content/data as design shows
  └─ Light/dark mode matching design

□ Step 3: Capture design screenshot
  └─ Export from Figma at 1x resolution
  └─ Or use Figma MCP get_screenshot
  └─ Save as reference image

□ Step 4: Capture implementation screenshot
  └─ Same viewport dimensions
  └─ Same component state
  └─ Same content
  └─ Save for comparison

□ Step 5: Run pixel-level diff
  └─ Overlay comparison
  └─ Identify all differences
  └─ Categorize: meaningful vs noise

□ Step 6: Analyze each discrepancy
  └─ Spacing differences → check token usage
  └─ Color differences → check token mapping
  └─ Typography differences → check font loading
  └─ Layout differences → check CSS

□ Step 7: Apply fixes
  └─ Principle: Tokens over hard-coded values
  └─ Principle: Smallest change that works
  └─ Fix one discrepancy at a time
  └─ Re-capture after each fix

□ Step 8: Verify all states
  └─ Principle: States are part of the design
  └─ Default state
  └─ Hover state
  └─ Focus state
  └─ Active state
  └─ Disabled state
  └─ Loading state
  └─ Error state

□ Step 9: Check responsive parity
  └─ Mobile viewport comparison
  └─ Tablet viewport (if designed)
  └─ Desktop viewport

□ Step 10: Final diff
  └─ Run comparison again
  └─ Goal: zero meaningful pixel difference
  └─ Document any intentional deviations

□ Step 11: Document anti-aliasing/rendering differences
  └─ Browser rendering ≠ Figma rendering
  └─ Font smoothing variations
  └─ Sub-pixel differences
  └─ These may be acceptable

□ Step 12: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Before/after screenshots showing visual parity achieved OR documented list of intentional deviations
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Visual parity: [component/screen]" |
| playbook_name | "visual-parity" |
| summary | Discrepancies fixed, deviations documented |
| files | Modified files |
| evidence | Before/after screenshots, diff report |

## Visual Diff Categories

### Must Fix
- Spacing differences > 1px
- Color differences (wrong token)
- Typography (wrong size, weight, or family)
- Layout shifts
- Missing elements
- Wrong border radius

### Acceptable Differences
- Sub-pixel anti-aliasing (< 1px)
- Font rendering between Figma and browser
- SVG rendering minor variations
- Shadow edge softness

### Requires Discussion
- Differences in design system tokens vs. design file
- Technical constraints preventing exact match
- Performance tradeoffs (e.g., blur effects)

## Common Causes of Visual Differences

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Spacing off | Hard-coded values instead of tokens | Use spacing tokens |
| Colors off | Wrong token or missing opacity | Check color token mapping |
| Text looks different | Font not loaded, wrong weight | Verify font loading |
| Icons misaligned | SVG viewBox issues | Check SVG dimensions |
| Shadows different | Browser rendering vs Figma | Match token values, accept minor diffs |
| Border radius wrong | Different radius scale | Use radius tokens |
| Layout breaks | Missing responsive styles | Add breakpoint styles |

## Screenshot Comparison Technique

### Manual Overlay Method

1. Export Figma at 1x, PNG format
2. Screenshot implementation at same size
3. Open both in image editor
4. Set top layer to "Difference" blend mode
5. Black = match, colored = difference

### Automated Diff Tools

```bash
# Using ImageMagick
compare design.png implementation.png diff.png

# Get diff percentage
compare -metric AE design.png implementation.png null: 2>&1
```

### Browser Dev Tools Method

1. Screenshot implementation
2. Add Figma export as overlay layer
3. Set opacity to 50%
4. Visually spot differences

## State Comparison Checklist

For each component, capture and compare:

```
Component: Button
──────────────────────────────────────
□ default state     ─ Figma ✓  Impl ✓  Match ✓
□ hover state       ─ Figma ✓  Impl ✓  Match ✓
□ focus state       ─ Figma ✓  Impl ✓  Match □ (ring color off)
□ active state      ─ Figma ✓  Impl ✓  Match ✓
□ disabled state    ─ Figma ✓  Impl ✓  Match ✓
□ loading state     ─ Figma ✓  Impl ✓  Match ✓
```

## When Perfect Parity Isn't Possible

Sometimes exact parity is impossible:

1. **Font licensing** — System fonts instead of specific fonts
2. **Performance** — Simplified effects for animation smoothness
3. **Browser limitations** — CSS can't achieve certain Figma effects
4. **Accessibility** — Design change needed for a11y compliance

Document these clearly:

```markdown
## Intentional Deviations

| Element | Design | Implementation | Reason |
|---------|--------|----------------|--------|
| Blur behind modal | 20px blur | 12px blur | Performance on mobile |
| Focus ring | 2px blue | 3px with offset | WCAG 2.2 requires visible focus |
```

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Verified visual parity with design
- All states compared
- Deviations documented
- Confidence in implementation accuracy

This feeds into: **Open a PR** or back to **Figma to Code** (if major fixes needed).

---
name: responsive-cross-browser
description: "Frontend playbook for responsive design and cross-browser testing. Ensures consistent experience across devices and browsers."
---

# Responsive & Cross-Browser

This playbook ensures your implementation works across viewport sizes and browsers. It covers responsive design verification, cross-browser testing, and fixing inconsistencies.

## When to Use

- Verifying responsive implementation
- Testing before release
- Debugging "works in Chrome, broken in Safari"
- Adding support for a new browser/device

## Playbook Steps

```
PLAYBOOK: Responsive & Cross-Browser
──────────────────────────────────────

□ Step 1: Define test matrix
  └─ Viewports: 375px (mobile), 768px (tablet), 1440px (desktop)
  └─ Browsers: Chrome, Safari, Firefox, Edge
  └─ Devices: iOS Safari, Android Chrome
  └─ Prioritize based on analytics if available

□ Step 2: Mobile-first audit
  └─ Start at 375px width
  └─ All content visible (no horizontal scroll)
  └─ Touch targets ≥ 44px
  └─ Text readable without zoom
  └─ Forms usable on mobile keyboard

□ Step 3: Tablet viewport check
  └─ Test at 768px
  └─ Layout adapts appropriately
  └─ Doesn't look like stretched mobile
  └─ Doesn't look like cramped desktop

□ Step 4: Desktop viewport check
  └─ Test at 1440px and 1920px
  └─ Max-width containers behave correctly
  └─ Content doesn't stretch uncomfortably
  └─ Whitespace is intentional

□ Step 5: In-between breakpoints
  └─ Slowly resize from 320px to 1920px
  └─ Watch for layout breaks
  └─ No content disappears or overlaps
  └─ No jarring transitions

□ Step 6: Cross-browser testing
  └─ Chrome (latest)
  └─ Safari (latest + previous major)
  └─ Firefox (latest)
  └─ Edge (latest)

□ Step 7: iOS Safari specific
  └─ Test in actual iOS Safari
  └─ Check: 100vh issues (use dvh)
  └─ Check: form input zoom
  └─ Check: safe areas (notch, home indicator)
  └─ Check: momentum scrolling

□ Step 8: Android Chrome specific
  └─ Test on actual Android device
  └─ Check: soft keyboard behavior
  └─ Check: font rendering
  └─ Check: touch behavior

□ Step 9: Document issues found
  └─ Browser-specific bugs
  └─ Viewport-specific issues
  └─ Device-specific quirks

□ Step 10: Apply fixes
  └─ Principle: Smallest change that works
  └─ Use feature detection, not browser sniffing
  └─ Consider polyfills for critical features
  └─ Document any browser-specific code

□ Step 11: Retest fixes
  └─ Verify fix in affected browser
  └─ Verify fix doesn't break other browsers
  └─ Regression test at all viewports

□ Step 12: Accessibility at all sizes
  └─ Calls: /a11y
  └─ Focus visible at mobile
  └─ Zoom works at all breakpoints
  └─ Touch and keyboard both work

□ Step 13: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Screenshots at mobile/tablet/desktop viewports across Chrome, Safari, Firefox showing consistent rendering
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Responsive/cross-browser: [scope]" |
| playbook_name | "responsive-cross-browser" |
| summary | Issues found and fixed |
| files | Modified files |
| evidence | Screenshots across devices/browsers |

## Viewport Breakpoints Reference

```css
/* Mobile-first approach */

/* Base: Mobile (< 640px) */
.component {
  padding: 1rem;
}

/* Small tablets (≥ 640px) */
@media (min-width: 640px) {
  .component {
    padding: 1.5rem;
  }
}

/* Tablets (≥ 768px) */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}

/* Laptops (≥ 1024px) */
@media (min-width: 1024px) {
  .component {
    padding: 2.5rem;
  }
}

/* Desktops (≥ 1280px) */
@media (min-width: 1280px) {
  .component {
    padding: 3rem;
  }
}
```

## Common Cross-Browser Issues

### Safari Issues

| Issue | Fix |
|-------|-----|
| `100vh` includes URL bar | Use `100dvh` or `-webkit-fill-available` |
| Flexbox gap support (older) | Use margins as fallback |
| Date input styling | Limited — consider custom component |
| `:focus-visible` support (older) | Include polyfill |
| Font smoothing differs | Accept variation or use `-webkit-font-smoothing` |

### Firefox Issues

| Issue | Fix |
|-------|-----|
| Form control styling | Reset with `appearance: none` |
| Scrollbar styling | Use `scrollbar-width: thin` |
| Sub-pixel rendering | Accept minor variations |

### Mobile Safari (iOS)

```css
/* Safe area handling */
padding-bottom: env(safe-area-inset-bottom);
padding-top: env(safe-area-inset-top);

/* Viewport height that works */
height: 100dvh; /* Dynamic viewport height */

/* Prevent zoom on input focus */
input, select, textarea {
  font-size: 16px; /* Prevents iOS zoom */
}

/* Smooth scrolling */
-webkit-overflow-scrolling: touch;
```

### Touch vs. Pointer

```css
/* Touch-friendly hover states */
@media (hover: hover) {
  .button:hover {
    background: var(--color-hover);
  }
}

/* Pointer size differentiation */
@media (pointer: coarse) {
  .button {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## Testing Tools

### Browser Testing
- BrowserStack (cloud devices)
- LambdaTest (cloud devices)
- Actual devices (preferred)

### Responsive Testing
- Chrome DevTools device mode
- Firefox Responsive Design Mode
- Actual devices (preferred)

### Specific Simulators
- Xcode Simulator (iOS Safari)
- Android Emulator (Android Chrome)

## Device Testing Priority

Based on typical analytics:

| Priority | Device/Browser | Why |
|----------|---------------|-----|
| 1 | Mobile Chrome (Android) | Largest mobile segment |
| 2 | Mobile Safari (iOS) | Large mobile segment, unique bugs |
| 3 | Desktop Chrome | Largest desktop segment |
| 4 | Desktop Safari | Mac users |
| 5 | Desktop Firefox | Standards-focused users |
| 6 | Desktop Edge | Windows default |

## Responsive Checklist

### Layout
- [ ] No horizontal scrollbar at any width
- [ ] Content fits viewport at 320px minimum
- [ ] Images scale down properly
- [ ] Tables become scrollable or stack

### Typography
- [ ] Text remains readable (no < 14px on mobile)
- [ ] Line lengths appropriate (45-75 chars)
- [ ] Headings scale reasonably

### Navigation
- [ ] Mobile nav accessible (hamburger or tabs)
- [ ] All links tappable (44px minimum)
- [ ] Dropdowns work on touch

### Forms
- [ ] Inputs don't cause zoom
- [ ] Labels visible when keyboard open
- [ ] Submit button visible when keyboard open

### Media
- [ ] Images have responsive sizes
- [ ] Videos scale to container
- [ ] No overflow from fixed-size embeds

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Verified responsive behavior
- Cross-browser compatibility confirmed
- Issues documented and fixed
- Evidence across devices/browsers

This feeds into: **Open a PR** or back to **Figma to Code** (if major fixes needed).

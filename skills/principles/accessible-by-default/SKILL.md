---
name: accessible-by-default
description: "Principle: Accessibility is not optional. Every component is keyboard-navigable, every image has alt text, every form has labels, and contrast meets WCAG AA."
---

# Accessible by Default

Accessibility is not a feature. It's not something to add later. It's the baseline for all UI work. Every interactive element is keyboard-navigable. Every image has meaningful alt text. Every form has proper labels. Contrast ratios meet WCAG AA.

## When This Principle Applies

- Creating any interactive component (buttons, links, inputs)
- Adding images, icons, or media
- Building forms
- Implementing navigation
- Every single UI change

## The WCAG AA Baseline

| Requirement | Standard |
|-------------|----------|
| Color contrast (normal text) | 4.5:1 minimum |
| Color contrast (large text) | 3:1 minimum |
| Focus indicators | Visible on all interactive elements |
| Keyboard navigation | All functionality reachable via keyboard |
| Form labels | Every input has an associated label |
| Alt text | Every meaningful image has descriptive alt |
| Error messages | Clearly identified and described |

## The Practice

### 1. Keyboard Navigation
- All interactive elements are focusable (no `tabindex="-1"` on buttons)
- Focus order follows visual order
- Custom components handle Enter/Space for activation
- Escape closes modals and dropdowns

### 2. Semantic HTML
```html
<!-- Good: semantic -->
<button>Submit</button>
<nav><a href="/">Home</a></nav>

<!-- Bad: div soup -->
<div onclick="submit()">Submit</div>
<div><span onclick="goHome()">Home</span></div>
```

### 3. ARIA When Needed
```html
<!-- Good: ARIA supplements semantics -->
<button aria-expanded="false" aria-controls="menu">Menu</button>

<!-- Bad: ARIA overused -->
<div role="button" aria-label="button that submits">Submit</div>
<!-- Just use a <button> -->
```

### 4. Focus Management
```jsx
// Modal opened: focus moves to modal
// Modal closed: focus returns to trigger
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  } else {
    triggerRef.current?.focus();
  }
}, [isOpen]);
```

## Examples

### Bad: Inaccessible Form

```html
<div class="form-field">
  <span>Email</span>
  <input type="text" placeholder="Enter email">
</div>
```

Problems: No `<label>`, no `for`/`id` association, no `type="email"`.

### Good: Accessible Form

```html
<div class="form-field">
  <label for="email">Email</label>
  <input type="email" id="email" aria-describedby="email-hint">
  <p id="email-hint">We'll never share your email.</p>
</div>
```

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Accessible by Default
  └─ Keyboard test: [Pass/Fail — can all elements be reached and activated?]
  └─ Semantic check: [Are correct HTML elements used?]
  └─ Labels/alt text: [Are all inputs labeled and images described?]
  └─ Contrast: [Do colors meet 4.5:1 for text?]
```

## Anti-Patterns

- "We'll add accessibility later"
- `<div>` with `onClick` instead of `<button>`
- Placeholder text as the only label
- `outline: none` without a replacement focus style
- Color as the only indicator (error = red, with no icon or text)
- Skip links missing on long pages

## Testing Checklist

- [ ] Tab through the entire component — is everything reachable?
- [ ] Activate with Enter/Space — do buttons and links work?
- [ ] Use a screen reader — is the content announced correctly?
- [ ] Check color contrast — run through a contrast checker
- [ ] Zoom to 200% — does the layout still work?

## Integration with Flash-Mode

This principle applies to every implementation step. The `/a11y` helper skill runs detailed accessibility audits when called.

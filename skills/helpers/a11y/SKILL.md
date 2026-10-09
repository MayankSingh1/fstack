---
name: a11y
description: "Helper skill for quick accessibility checks. Runs through WCAG 2.2 AA essentials and identifies issues with specific remediation guidance."
---

# /a11y

Quick accessibility check against WCAG 2.2 AA essentials. Identifies issues and provides specific remediation guidance. For full audits, use the Accessibility Audit playbook.

## When to Use

- Quick check during development
- Verifying a specific component
- Before opening a PR
- When asked "is this accessible?"

## How to Invoke

```
/a11y check this button component
/a11y is this form accessible?
/a11y review the modal for a11y issues
```

## Quick Check Checklist

### 1. Keyboard Navigation

```
□ All interactive elements reachable via Tab
□ Focus order matches visual order
□ Focus indicator visible on all elements
□ Enter/Space activate buttons
□ Escape closes modals/dropdowns
□ Arrow keys work in menus/tabs
□ No keyboard traps
```

### 2. Screen Reader

```
□ Headings provide page structure (h1→h6)
□ Links and buttons have descriptive text
□ Images have appropriate alt text
□ Form inputs have labels
□ Errors are announced
□ Dynamic content updates announced
□ No content only visible to sighted users
```

### 3. Visual

```
□ Text contrast ≥ 4.5:1 (normal text)
□ Text contrast ≥ 3:1 (large text 18px+)
□ UI component contrast ≥ 3:1
□ Color not sole indicator (add icon/text)
□ Focus visible (2px+ indicator)
□ Text resizable to 200%
□ No horizontal scroll at 320px width
```

### 4. Interaction

```
□ Touch targets ≥ 44x44px (mobile)
□ Target spacing ≥ 8px
□ Error messages near the field
□ Required fields indicated
□ Timeouts warned or adjustable
□ Animation respects reduced motion
```

## Common Issues and Fixes

### Missing Form Label

```jsx
// ❌ Bad: No label
<input type="email" placeholder="Email" />

// ✓ Good: Proper label
<label htmlFor="email">Email</label>
<input type="email" id="email" />

// ✓ Also good: aria-label for icon buttons
<button aria-label="Search">
  <SearchIcon />
</button>
```

### Insufficient Contrast

```css
/* ❌ Bad: 2.8:1 contrast */
.text-light {
  color: #9CA3AF; /* gray-400 on white */
}

/* ✓ Good: 4.6:1 contrast */
.text-light {
  color: #6B7280; /* gray-500 on white */
}
```

### Missing Focus Indicator

```css
/* ❌ Bad: Removes focus entirely */
button:focus {
  outline: none;
}

/* ✓ Good: Custom focus that's visible */
button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Non-Semantic Elements

```jsx
// ❌ Bad: div as button
<div onClick={handleClick}>Click me</div>

// ✓ Good: actual button
<button onClick={handleClick}>Click me</button>

// ❌ Bad: no semantic structure
<div className="heading">Title</div>

// ✓ Good: proper heading
<h2>Title</h2>
```

### Color-Only Indicator

```jsx
// ❌ Bad: only color indicates error
<input className={hasError ? "border-red-500" : ""} />

// ✓ Good: color + icon + text
<div>
  <input 
    className={hasError ? "border-red-500" : ""} 
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-red-500">
      <ErrorIcon /> Please enter a valid email
    </p>
  )}
</div>
```

### Interactive Area Too Small

```jsx
// ❌ Bad: 24px icon with no extended hit area
<button>
  <Icon size={24} />
</button>

// ✓ Good: Extended touch target
<button className="p-2.5 -m-2.5 min-w-[44px] min-h-[44px]">
  <Icon size={24} />
</button>
```

### No Focus Management

```jsx
// ❌ Bad: No focus management on modal
const Modal = ({ isOpen }) => {
  if (!isOpen) return null;
  return <div className="modal">...</div>;
};

// ✓ Good: Focus trapped and managed
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      ...
    </div>
  );
};
```

## Testing Commands

### Automated

```bash
# axe-core via CLI
npx axe <url>

# Lighthouse
npx lighthouse <url> --only-categories=accessibility
```

### Browser DevTools

1. **Chrome**: Lighthouse tab → Accessibility
2. **Firefox**: Accessibility Inspector
3. **Safari**: Develop → Show Accessibility Inspector

### Manual Tests

- **Tab test**: Can you reach everything with Tab?
- **Keyboard test**: Can you activate with Enter/Space?
- **Zoom test**: Does layout work at 200% zoom?
- **Screen reader**: What does VoiceOver/NVDA announce?

## Output Format

```markdown
## Accessibility Check: [Component/Page]

### Critical Issues
- [ ] **[Issue]**: [Specific location] — [WCAG criterion]
  - **Fix**: [How to fix]

### Warnings
- [ ] **[Issue]**: [Specific location]
  - **Fix**: [Suggestion]

### Passed
- ✓ Keyboard navigation works
- ✓ Focus indicators visible
- ✓ Labels properly associated

### Not Testable
- Motion: No animations present
- Timing: No time-based interactions
```

## Quick Reference: WCAG 2.2 AA

| Category | Requirements |
|----------|--------------|
| **Perceivable** | Alt text, contrast 4.5:1, resize to 200% |
| **Operable** | Keyboard accessible, no traps, focus visible |
| **Understandable** | Labels, error identification, consistent nav |
| **Robust** | Valid HTML, name/role/value for components |

## Integration with Flash-Mode

This skill is called for quick checks during:
- **Figma to Code** (verify implementation)
- **Visual Parity** (after visual match)
- **Open a PR** (pre-review check)
- **Design Critique** (accessibility perspective)

For comprehensive audits, use the **Accessibility Audit** playbook.

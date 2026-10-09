---
name: tokens-over-hardcoded
description: "Principle: Use design tokens and CSS custom properties instead of magic numbers. Consistency and maintainability over convenience."
---

# Tokens over Hard-Coded Values

Design tokens exist for a reason. Use them. `var(--spacing-md)` beats `16px`. `theme.colors.primary` beats `#3B82F6`. Tokens enable consistency, theming, and maintainability.

## When This Principle Applies

- Adding any spacing value
- Setting colors
- Defining typography (font size, line height, weight)
- Adding shadows, borders, border-radius
- Any value that could change with a theme

## The Practice

1. **Check existing tokens** — what does the design system already define?
2. **Use the closest token** — don't create new tokens for one-off values
3. **If no token exists** — discuss whether one should be created, or if the design should use an existing value
4. **Document exceptions** — if a hard-coded value is truly necessary, explain why

## Token Patterns by Framework

### CSS Custom Properties
```css
/* Good */
padding: var(--spacing-md);
color: var(--color-text-primary);
font-size: var(--font-size-body);

/* Bad */
padding: 16px;
color: #1a1a1a;
font-size: 14px;
```

### Tailwind CSS
```jsx
/* Good — uses Tailwind's token system */
<div className="p-4 text-gray-900 text-sm">

/* Bad — arbitrary values */
<div className="p-[16px] text-[#1a1a1a] text-[14px]">
```

### CSS-in-JS / Theme Objects
```jsx
/* Good */
padding: theme.spacing.md,
color: theme.colors.text.primary,

/* Bad */
padding: '16px',
color: '#1a1a1a',
```

## Examples

### Bad: Magic Numbers

```css
.card {
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Good: Design Tokens

```css
.card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Tokens over Hard-Coded Values
  └─ Values added: [List of spacing/color/typography values]
  └─ Tokens used: [Which tokens replaced hard-coded values]
  └─ Exceptions: [Any hard-coded values and why they're necessary]
```

## Anti-Patterns

- Using hex colors when a color token exists
- Pixel values for spacing when spacing tokens exist
- Creating "one-off" tokens for a single component
- Mixing token systems (half Tailwind utilities, half arbitrary values)

## When Hard-Coded Values Are Acceptable

Rarely, but sometimes:
- One-time layout adjustments that will never change with theming
- Values from external constraints (e.g., a third-party widget requires exact dimensions)
- Transitional code during a token system migration

Even then, add a comment explaining why.

## Integration with Flash-Mode

This principle is applied during implementation steps. When flash-mode sees styling being added, it checks for token usage.

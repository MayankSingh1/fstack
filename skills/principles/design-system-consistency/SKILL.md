---
name: design-system-consistency
description: "Principle: New components match existing patterns. Check what already exists before creating something new."
---

# Consistency with the Design System

The design system exists to prevent reinventing the wheel. Before creating a new component, check what already exists. If the codebase has a Button, use it. If the design system has a card pattern, follow it. Consistency beats novelty.

## When This Principle Applies

- Adding any new UI element
- Choosing component patterns
- Naming props, classes, or tokens
- Deciding on visual treatments

## The Practice

### 1. Inventory Before Creating

Before adding a new component:

1. **Search the codebase** — does this component already exist?
2. **Check the design system** — is there a documented pattern?
3. **Look at similar components** — how are related things built?
4. **Review Figma** — is there a component in the library?

### 2. Extend, Don't Duplicate

```jsx
// Bad: Creating a similar-but-different button
const MySpecialButton = styled.button`
  padding: 12px 24px;
  background: blue;
`;

// Good: Extending the existing button
<Button variant="primary" size="lg" {...props} />
```

### 3. Follow Naming Conventions

If the codebase uses:
- `isLoading` → don't use `loading` or `showSpinner`
- `onSubmit` → don't use `handleSubmit` or `submitHandler`
- `variant` → don't use `type` or `kind`

Match what exists.

### 4. Respect Visual Patterns

| If existing components have... | New components should have... |
|--------------------------------|-------------------------------|
| 8px padding | 8px padding |
| 4px border radius | 4px border radius |
| fade-in animation | fade-in animation |
| gray-100 backgrounds | gray-100 backgrounds |

## Examples

### Bad: Breaking Consistency

The design system has cards with 16px padding and 8px border radius.

```css
/* New component ignores the pattern */
.my-card {
  padding: 20px;
  border-radius: 12px;
}
```

### Good: Following the System

```css
/* New component follows the pattern */
.my-card {
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}
```

Or even better, use the existing Card component.

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: Consistency with the Design System
  └─ Similar components found: [List existing related components]
  └─ Patterns matched: [Which conventions were followed]
  └─ New patterns introduced: [Anything that deviates, with justification]
  └─ Naming aligned: [Props/classes match existing conventions]
```

## Anti-Patterns

- "I'll just make my own button for this"
- Using different spacing on similar components
- Naming props differently than existing components
- Creating a new pattern when one exists
- Not checking Figma before implementing

## When Breaking Consistency Is Acceptable

Rarely, but sometimes:

- The existing pattern has a documented flaw
- The new use case is genuinely different
- The design system is being intentionally evolved
- The old pattern is deprecated

In these cases, document the deviation and discuss with the team.

## Discovery Commands

Before creating something new:

```bash
# Find similar components
rg -l "Button" --type tsx
rg -l "Card" --type tsx

# Check for existing patterns
rg "variant=" --type tsx
rg "isLoading" --type tsx
```

## Integration with Flash-Mode

This principle is applied during implementation steps. The `/how-ui` helper can trace existing patterns before new code is written.

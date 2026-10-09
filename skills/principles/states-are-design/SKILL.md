---
name: states-are-design
description: "Principle: Empty, loading, error, success — each state is a designed moment, not an afterthought."
---

# States Are Part of the Design

A component isn't done when the happy path works. Empty states, loading states, error states, success states — each is a designed moment that users will experience. "We'll handle errors later" is not design. It's avoidance.

## When This Principle Applies

- Building any data-driven UI
- Creating forms
- Implementing async operations
- Adding new screens or components

## The Four Core States

| State | User Experience | Design Requirement |
|-------|-----------------|-------------------|
| **Empty** | No data yet | Clear message, helpful action |
| **Loading** | Waiting for data | Progress indicator, no layout shift |
| **Error** | Something went wrong | Clear explanation, recovery action |
| **Success** | Data loaded / action completed | Smooth transition, confirmation |

## The Practice

### 1. Design All States Upfront

Before implementing the happy path, ask:
- What does this look like with zero items?
- What does this look like while loading?
- What happens when the API fails?
- How do we confirm success?

### 2. Empty States Need Content

```jsx
// Bad: Just hide everything
{items.length === 0 && null}

// Good: Helpful empty state
{items.length === 0 && (
  <EmptyState
    title="No projects yet"
    description="Create your first project to get started."
    action={<Button>Create Project</Button>}
  />
)}
```

### 3. Loading States Preserve Layout

```jsx
// Bad: Layout shift when loading
{isLoading ? <Spinner /> : <CardGrid items={items} />}

// Good: Skeleton maintains layout
{isLoading ? <CardGridSkeleton count={6} /> : <CardGrid items={items} />}
```

### 4. Error States Are Actionable

```jsx
// Bad: Generic error
{error && <div>Something went wrong</div>}

// Good: Specific and actionable
{error && (
  <ErrorState
    title="Couldn't load projects"
    description={error.message}
    action={<Button onClick={retry}>Try again</Button>}
  />
)}
```

## State Checklists by Component Type

### Data List
- [ ] Empty: No items message + create CTA
- [ ] Loading: Skeleton or spinner
- [ ] Error: Error message + retry button
- [ ] Partial: What if only some items load?

### Form
- [ ] Initial: All fields ready
- [ ] Validating: Field-level feedback
- [ ] Submitting: Disabled state + progress
- [ ] Error: Inline errors + summary
- [ ] Success: Confirmation + next step

### Button
- [ ] Default: Normal appearance
- [ ] Hover: Visual feedback
- [ ] Focus: Clear focus ring
- [ ] Active: Pressed state
- [ ] Loading: Spinner + disabled
- [ ] Disabled: Reduced opacity + no interaction

### Applying the Principle

When flash-mode invokes this principle:

```
□ Applying: States Are Part of the Design
  └─ States identified: [List all states this component has]
  └─ States implemented: [Which are done]
  └─ States missing: [Which need work]
  └─ Transitions: [How does the UI move between states?]
```

## Anti-Patterns

- "We'll handle errors later"
- Empty state is just an empty screen
- Loading state causes layout shift
- Error message is "An error occurred"
- No visual feedback during async actions
- Only designing the happy path in Figma

## Integration with Flash-Mode

This principle is applied during wireframe-to-hifi, Figma-to-code, and component work. Flash-mode checks that all states are addressed before marking implementation complete.

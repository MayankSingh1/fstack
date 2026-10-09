---
name: component-refactor
description: "Frontend playbook for safely refactoring components. Characterizes existing behavior first, then changes structure while keeping behavior unchanged."
---

# Component Refactor

This playbook helps you safely refactor components. The key principle: characterize existing behavior before changing anything. Then modify structure while keeping that behavior unchanged.

## When to Use

- Cleaning up messy component code
- Extracting reusable components
- Restructuring component hierarchy
- Performance optimization refactoring
- Making a component more flexible

## Playbook Steps

```
PLAYBOOK: Component Refactor
──────────────────────────────────────

□ Step 1: Understand current behavior
  └─ Calls: /how-ui (to trace component behavior)
  └─ What does this component do?
  └─ What props does it accept?
  └─ What state does it manage?
  └─ What are all its visual states?

□ Step 2: Document current behavior
  └─ List all props and their effects
  └─ List all user interactions
  └─ List all visual states
  └─ Document any side effects

□ Step 3: Create characterization tests
  └─ Test each prop combination
  └─ Test each interaction
  └─ Snapshot current visual output
  └─ These tests must pass before AND after refactor

□ Step 4: Identify refactoring goal
  └─ What's wrong with current structure?
  └─ What will be better after refactor?
  └─ Define clear success criteria

□ Step 5: Plan the refactor
  └─ Principle: Smallest change that works
  └─ Break into small, reversible steps
  └─ Each step should keep tests passing
  └─ Plan for backward compatibility if public API

□ Step 6: Make structure changes
  └─ One change at a time
  └─ Run tests after each change
  └─ Commit working states frequently
  └─ Keep behavior identical

□ Step 7: Verify no behavior change
  └─ All characterization tests pass
  └─ Visual output unchanged
  └─ Interactions work the same
  └─ No console errors/warnings

□ Step 8: Visual regression check
  └─ Calls: /visual-parity (if visual component)
  └─ Before/after screenshots
  └─ No unintended visual changes

□ Step 9: Performance check
  └─ If refactor was for performance: measure
  └─ No performance regressions
  └─ Document any improvements

□ Step 10: Update documentation
  └─ If API changed, update docs
  └─ If new patterns emerged, document them
  └─ Note migration path if breaking

□ Step 11: Accessibility verify
  └─ Calls: /a11y
  └─ Keyboard navigation still works
  └─ Screen reader still works
  └─ No ARIA changes that break a11y

EVIDENCE REQUIRED: All characterization tests pass, before/after comparison showing identical behavior
```

## Characterization Test Example

Before refactoring, write tests that capture current behavior:

```jsx
describe('Button component (characterization)', () => {
  // Prop behavior
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  // Interaction behavior
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} isDisabled>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // Visual states (snapshot)
  it('matches snapshot for all variants', () => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'];
    variants.forEach(variant => {
      const { container } = render(<Button variant={variant}>Text</Button>);
      expect(container).toMatchSnapshot(`button-${variant}`);
    });
  });
});
```

## Safe Refactoring Steps

### Step 1: Prepare
```
1. Characterization tests in place
2. All tests passing
3. Working commit to revert to
```

### Step 2: Small Steps
```
Original:    A → B → C → D (monolithic)

Refactor:
  Step 1:    A → B' → C → D  (extract B)
  Step 2:    A → B' → C' → D (extract C)
  Step 3:    A' → B' → C' → D (clean up A)
```

### Step 3: Verify at Each Step
```
After each change:
  □ Tests pass
  □ No console errors
  □ Visually unchanged
  □ Commit
```

## Refactoring Patterns

### Extract Component
```jsx
// Before: embedded in parent
const Page = () => (
  <div>
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleClick}>Action</button>
    </div>
  </div>
);

// After: extracted
const Card = ({ title, description, onAction }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    <button onClick={onAction}>Action</button>
  </div>
);

const Page = () => (
  <div>
    <Card title={title} description={description} onAction={handleClick} />
  </div>
);
```

### Lift State Up
```jsx
// Before: sibling state duplication
const ComponentA = () => {
  const [value, setValue] = useState('');
  // ...
};

// After: state lifted to parent
const Parent = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <ComponentA value={value} onChange={setValue} />
      <ComponentB value={value} />
    </>
  );
};
```

### Composition over Props Explosion
```jsx
// Before: props explosion
<Card
  title="..."
  titleIcon={<Icon />}
  titleAction={<Button />}
  body="..."
  footer="..."
  footerAlign="right"
/>

// After: composition
<Card>
  <Card.Header>
    <Icon />
    <Card.Title>...</Card.Title>
    <Button />
  </Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer align="right">...</Card.Footer>
</Card>
```

## When NOT to Refactor

- No clear benefit identified
- No tests to catch regressions
- Under time pressure with no safety net
- Working code that rarely changes
- During active feature development on same code

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Refactored component with same behavior
- Characterization tests proving equivalence
- Documentation of what changed
- Clean commit history showing steps

This feeds into: **Open a PR** or continued development.

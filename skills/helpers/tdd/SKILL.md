---
name: tdd
description: "Test-driven development for UI and components. Write the failing test first, then implement. Use only when explicitly asked for TDD, a failing test, or when the bug has an obvious test target."
disable-model-invocation: true
---

# TDD for UI/Components

When fixing a bug or building a feature with a clear test path, make the behavior executable before writing production code. The goal is a focused test that fails before the change and passes after.

## When to use

- User explicitly asks for TDD
- Bug has an obvious, cheap test target
- Feature has clear acceptance criteria
- Component behavior can be unit tested

## When NOT to use

- Test requires broad harness setup
- Needs brittle mocks of complex dependencies
- Requires production-only state
- Reproduction steps are vague
- Would need large fixture churn

Don't force a test when it would be impractical.

## Workflow

### 1. Understand the behavior

Identify:
- **Intended behavior:** What should happen
- **Current behavior:** What happens now
- **Affected path:** Component/screen/flow
- **Smallest reproduction:** Minimal steps to observe

### 2. Choose the narrowest test

| Test Type | Use When |
|-----------|----------|
| Unit test | Pure function, isolated component |
| Component test | UI behavior, user interaction |
| Integration test | Multiple components together |
| Visual regression | Styling, layout |
| Accessibility test | WCAG compliance |
| E2E test | Full user flow |

Prefer the closest existing test pattern in the codebase.

### 3. Write the failing test first

```tsx
// Testing Library example
describe('Button', () => {
  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

The test encodes intended behavior, not current implementation.

### 4. Run and verify failure

```bash
npm test -- --testPathPattern="Button"
```

Confirm it fails for the intended reason. If it:
- **Passes:** Test doesn't capture the bug
- **Fails for wrong reason:** Fix the test first

### 5. Implement the fix

Make the smallest change that satisfies the behavior:

```tsx
const Button = ({ isLoading, children, ...props }) => {
  return (
    <button disabled={isLoading} {...props}>
      {isLoading ? <Spinner role="progressbar" /> : children}
    </button>
  );
};
```

### 6. Run and verify pass

```bash
npm test -- --testPathPattern="Button"
```

All tests pass. No regressions.

## UI/Component Test Patterns

### Testing user interactions
```tsx
it('toggles dropdown on click', async () => {
  const user = userEvent.setup();
  render(<Dropdown options={options} />);
  
  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('listbox')).toBeVisible();
  
  await user.click(screen.getByRole('button'));
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});
```

### Testing async behavior
```tsx
it('shows loading then data', async () => {
  render(<DataCard endpoint="/api/stats" />);
  
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('$1,234')).toBeInTheDocument();
  });
});
```

### Testing accessibility
```tsx
it('is keyboard navigable', async () => {
  const user = userEvent.setup();
  render(<Menu items={items} />);
  
  await user.tab();
  expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();
  
  await user.keyboard('{ArrowDown}');
  expect(screen.getByRole('menuitem', { name: 'Second' })).toHaveFocus();
});
```

### Testing states
```tsx
it.each([
  ['loading', { isLoading: true }, 'progressbar'],
  ['error', { error: 'Failed' }, 'alert'],
  ['empty', { data: [] }, 'No items'],
])('renders %s state', (_, props, expected) => {
  render(<DataList {...props} />);
  expect(screen.getByRole(expected) || screen.getByText(expected)).toBeInTheDocument();
});
```

## Visual Regression Testing

When styling/layout is the concern:

```tsx
it('matches snapshot in all states', async () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container).toMatchSnapshot();
  
  await userEvent.hover(screen.getByRole('button'));
  expect(container).toMatchSnapshot();
});
```

Or with visual testing tools:
```tsx
it('button looks correct', async () => {
  await expect(page).toHaveScreenshot('button-default.png');
});
```

## If Failing Test Is Impractical

Use closest executable check:
- Manual reproduction with documented steps
- Targeted script that runs the scenario
- Browser automation for visual verification
- Console assertion for runtime behavior

Prefer no new test over a bad test.

## Guardrails

- Don't change tests to match wrong implementation
- Don't weaken assertions unless behavior genuinely changed
- Keep test focused on the one behavior
- Make flaky tests deterministic
- First land focused regression, then consider broader coverage

## Final Response

Report evidence:

```markdown
**Failing-before:**
Test: `Button.test.tsx` — "shows loading spinner"
Failure: Expected progressbar, found none

**Passing-after:**
Test run: All 24 tests passing
Related tests: Button loading, Button disabled

**Verification:**
- Visual check in Storybook: Loading state renders correctly
- Accessibility: Spinner has role="progressbar"
```

If failing-before couldn't be demonstrated, state why and describe the alternative check used.

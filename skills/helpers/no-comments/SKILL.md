---
name: no-comments
description: "Find and remove unnecessary comments. Offer structural alternatives for constraints. Use for /no-comments, 'clean up comments', or 'comment sicko mode'."
disable-model-invocation: true
---

# No Comments

Find unnecessary comments and remove them. Offer structural alternatives (types, tests, lint rules) for comments that claim to enforce constraints.

## Scope

Use the caller's files or diff. Otherwise use the current diff against main, including working tree.

## Comment Categories

### MUST KILL — Delete immediately

| Pattern | Why It's Noise |
|---------|----------------|
| `// increment counter` | States the obvious |
| `// TODO: fix later` (old) | Stale, nobody will fix it |
| `// This is a button` | The code says that |
| `// Added by [name]` | Git knows |
| `// v2.0 changes` | Git knows |
| `// temporary fix` | Make it permanent or revert |
| Commented-out code | Delete it, git has history |
| `// eslint-disable` without reason | Either fix or explain |

### CONSIDER KILL — Usually noise, sometimes signal

| Pattern | Keep If |
|---------|---------|
| `// HACK:` | Links to issue and has expiry |
| `// NOTE:` | Explains non-obvious business rule |
| `// FIXME:` | Links to tracked issue |
| Large section headers | File is too long (split instead) |

### KEEP — Actual value

| Pattern | Why It's Useful |
|---------|-----------------|
| Why, not what | `// Safari doesn't support X, workaround:` |
| Non-obvious constraints | `// Must run before Y due to Z` |
| API contracts | JSDoc on public interfaces |
| Regex explanations | `// Matches: user@domain.tld` |
| Performance notes | `// Memoized: O(n) → O(1)` |

## Process

### 1. Scan scope

List all comments in scope with file:line.

### 2. Categorize each

For each comment:
- MUST KILL + reason
- CONSIDER KILL + what would make it keep
- KEEP + why

### 3. Check constraint comments

Comments that say "do not remove", "do not change", "talk to X before changing" claim to enforce something. For each:

1. Is the constraint real? Run `/how-ui` or `/why-this-design` if unclear.
2. Can it be encoded?

| Constraint | Encoding |
|------------|----------|
| Order matters | Type system, test |
| Don't change value | Constant, test |
| Must call after X | Lint rule, type |
| Performance sensitive | Benchmark test |
| Accessibility requirement | axe test |

3. If encodable, offer the encoding. Delete comment after encoding lands.
4. If not encodable, keep the comment.

### 4. Present for approval

```markdown
## MUST KILL (delete immediately)

| File:Line | Comment | Reason |
|-----------|---------|--------|
| Button.tsx:23 | // click handler | States obvious |
| Card.tsx:45 | // old code | Commented out |

## CONSIDER KILL (recommend delete)

| File:Line | Comment | Keep If |
|-----------|---------|---------|
| Modal.tsx:12 | // HACK | Links to issue |

## CONSTRAINT COMMENTS

| File:Line | Comment | Proposed Encoding |
|-----------|---------|-------------------|
| api.ts:89 | // must be 32 chars | `z.string().length(32)` |

## KEEP

| File:Line | Comment | Why |
|-----------|---------|-----|
| fetch.ts:34 | // Safari bug | Explains workaround |
```

Wait for approval.

### 5. Execute approved deletes

Remove approved comments. Apply approved encodings.

### 6. Report

- Comments deleted: N
- Constraints encoded: M
- Kept: K

## React/TSX Specific

### Kill these
```tsx
// Bad
return (
  // Main container
  <div>
    {/* Render the header */}
    <Header />
    {/* List of items */}
    {items.map(item => (
      // Each item
      <Item key={item.id} item={item} />
    ))}
  </div>
);

// Good (no comments needed)
return (
  <div>
    <Header />
    {items.map(item => (
      <Item key={item.id} item={item} />
    ))}
  </div>
);
```

### Keep these
```tsx
// Good: explains non-obvious behavior
return (
  <div>
    {/* Portal to body to escape overflow:hidden ancestor */}
    <Portal>
      <Modal />
    </Portal>
  </div>
);
```

## Encoding Examples

### Type encoding
```tsx
// Before: // status must be 'active' or 'inactive'
type Status = 'active' | 'inactive';

// Before: // password must be at least 8 chars
const passwordSchema = z.string().min(8);
```

### Test encoding
```tsx
// Before: // must render loading state first
it('renders loading before data', async () => {
  render(<DataCard />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
});
```

### Lint encoding
```js
// .eslintrc.js
rules: {
  // Before: // don't use inline styles
  'react/forbid-component-props': ['error', { forbid: ['style'] }],
}
```

## Guardrails

- Never delete comments that explain browser bugs or workarounds
- Never delete JSDoc on public APIs
- Encoding must actually enforce, not just document
- Get approval before mass deletion
- Git blame suspicious "KEEP" candidates

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Comment cleanup"
- playbook_name: "no-comments"
- summary: N deleted, M encoded, K kept
- files: Modified files
- evidence: Before/after line counts

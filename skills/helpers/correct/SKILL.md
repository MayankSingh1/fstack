---
name: correct
description: "Find the mistakes agents keep repeating and make each one impossible. Architecture first, then types, then lint rules, then tests. Use for /correct when you notice repeated errors."
disable-model-invocation: true
---

# Correct

The user keeps correcting agents for the same mistakes. Change the repo so the next agent can't make them.

Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Design the repo so a change that looks right from one file is right for the whole repo.

## Find the mistake classes

First, read recent:
- Review comments and corrections
- Reverts and rollbacks
- Repeated issues in PRs
- Comments explaining workarounds
- Agent instruction files

Group mistakes into classes. A class counts once it has happened twice.

**Common design/frontend mistake classes:**

| Class | Example |
|-------|---------|
| Token violations | Hard-coded colors instead of tokens |
| Accessibility gaps | Missing focus states, no aria labels |
| State handling | Forgetting loading/error/empty states |
| Responsive gaps | Desktop-only styles |
| Naming drift | Inconsistent component naming |
| Import patterns | Wrong import paths or barrel files |

## Fix each class at the highest level

1. **Eliminate with architecture.** Give each piece one owner. Hide internals so wrong imports fail. Delete old patterns agents would copy.

2. **Enforce with types.** Make bad state unrepresentable. If TypeScript, use discriminated unions for states.

3. **Add lint rules.** Lint errors should name the file/function to use instead. For existing violations, fail only on new instances.

4. **Test the behavior.** Add tests that fail when the mistake occurs.

5. **Write docs last.** Agent rules only for judgment calls that can't be enforced.

## Fix and prove

Fix the most frequent classes, one commit each. Prove each new check fails on a real past mistake:

```bash
# Run the check on a known-bad commit
git checkout <bad-commit>
npm run lint  # Should fail
git checkout -

# Run on current
npm run lint  # Should pass
```

## Keep the rule table

Maintain a table in agent instructions pairing each rule with its enforcement:

| Rule | Enforced By |
|------|-------------|
| Use design tokens for colors | stylelint: no-hardcoded-colors |
| All interactive elements have focus state | stylelint: require-focus-visible |
| Components handle loading state | TypeScript: LoadingState union |
| Import from barrel files only | eslint: no-direct-imports |

When the user corrects you:
1. Fix the mistake
2. Add the rule to the table
3. If the rule already exists and nothing enforces it, fix at the highest level in the same change

Drop a rule once its mistake can't happen.

## Enforcement levels for design/frontend

### Architecture
- Component composition patterns
- State management boundaries
- Design token structure
- File/folder conventions

### Types (TypeScript)
```typescript
// Bad: optional fields that are actually required in practice
type Button = { label?: string; onClick?: () => void }

// Good: discriminated union
type Button = 
  | { variant: 'primary'; label: string; onClick: () => void }
  | { variant: 'icon'; icon: IconType; onClick: () => void }
```

### Lint Rules
- ESLint for JS/TS patterns
- Stylelint for CSS patterns
- Custom rules for project conventions

### Tests
- Visual regression tests
- Accessibility tests (axe-core)
- Component behavior tests

## Reply format

For each class:
- **Class:** What mistake
- **Evidence:** Where it happened (2+ instances)
- **Level:** Architecture / Types / Lint / Test / Docs
- **Fix:** What you did
- **Why not higher:** Why a higher level didn't work

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Mistake class corrections"
- playbook_name: "correct"
- summary: Number of classes fixed and enforcement method
- files: Changed files (lint configs, types, tests)
- evidence: Before/after lint output or test results

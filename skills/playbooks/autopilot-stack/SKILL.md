---
name: autopilot-stack
description: "Queue delivered as a linear reviewed stack. Each PR builds on the previous, merged in order. Use for 'land this as a stack', 'stacked PRs', or dependent PR sequences."
disable-model-invocation: true
---

# Autopilot Stack Playbook

Process a queue of dependent PRs as a linear stack: each builds on the previous, merged in strict order.

## Prerequisites

- PRs must have linear dependency (1 → 2 → 3)
- Repository supports stacked PRs (or sequential merge)
- Agent has push/merge permissions
- Clear acceptance criteria for each PR

## Phases

```
□ Phase 1: Plan the stack
□ Phase 2: Create branches
□ Phase 3: Implement stack
□ Phase 4: Review and iterate
□ Phase 5: Land the stack
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Plan the Stack

### Stack structure

```markdown
## PR Stack: [Feature Name]

Base: main

| Level | PR | Description | Status |
|-------|-----|-------------|--------|
| 1 | #TBD | Foundation / Types | Planned |
| 2 | #TBD | Core implementation | Planned |
| 3 | #TBD | UI components | Planned |
| 4 | #TBD | Integration | Planned |
```

### Stack design principles

| Principle | Why |
|-----------|-----|
| Each PR is small and reviewable | Easier review, faster iteration |
| Each PR is shippable | Can stop at any level |
| Dependencies flow downward | Lower levels don't know about higher |
| Each PR has clear scope | No scope mixing |

### Anti-patterns

| Pattern | Problem |
|---------|---------|
| UI depends on types not yet in stack | Should add types in earlier PR |
| Large PR in middle of stack | Blocks everything above |
| Circular dependencies | Stack impossible |
| Optional levels | Use feature flags instead |

## Phase 2: Create Branches

### Branch structure

```bash
main
└── stack/feature-1  (Level 1)
    └── stack/feature-2  (Level 2)
        └── stack/feature-3  (Level 3)
            └── stack/feature-4  (Level 4)
```

### Create all branches

```bash
# Start from main
git checkout main
git pull

# Create stack
git checkout -b stack/feature-1
# ... implement level 1 ...
git commit -m "stack 1/4: foundation"

git checkout -b stack/feature-2
# ... implement level 2 ...
git commit -m "stack 2/4: core implementation"

git checkout -b stack/feature-3
# ... implement level 3 ...
git commit -m "stack 3/4: UI components"

git checkout -b stack/feature-4
# ... implement level 4 ...
git commit -m "stack 4/4: integration"
```

## Phase 3: Implement Stack

### For each level:

1. **Checkout the branch**
   ```bash
   git checkout stack/feature-[N]
   ```

2. **Implement scope** (builds on previous)

3. **Test at this level**
   - Run tests
   - Verify feature so far
   - Check for regressions

4. **Commit with stack context**
   ```
   stack [N]/[total]: [description]
   
   Part of: [feature name]
   Builds on: [previous level description]
   Enables: [next level description]
   ```

5. **Push and open PR**
   ```bash
   git push -u origin stack/feature-[N]
   # PR targets: previous branch (or main for level 1)
   ```

### PR description template

```markdown
## Stack [N]/[Total]: [Title]

Part of: [Feature link or description]

### This PR
[What this level does]

### Stack context
- Previous: #[PR] - [description]
- Next: #[PR] - [description] (or "Final")

### Depends on
Must land after: #[previous PR]

### Changes
- [Change 1]
- [Change 2]

### Testing
- [How to test at this level]
```

## Phase 4: Review and Iterate

### Stack review workflow

1. **Review from bottom up**
   - Start with level 1
   - Each level should make sense independently
   - Higher levels add features, not fix lower

2. **Apply feedback**
   - Fix in the lowest appropriate level
   - Rebase higher levels

### Rebase after changes

When level N changes, rebase all levels > N:

```bash
# After changes to stack/feature-2
git checkout stack/feature-3
git rebase stack/feature-2

git checkout stack/feature-4
git rebase stack/feature-3

# Push with force-with-lease (safer than -f)
git push --force-with-lease origin stack/feature-3
git push --force-with-lease origin stack/feature-4
```

### Handling conflicts during rebase

```bash
# If conflict occurs
# 1. Fix the conflict
git add [conflicted-files]
# 2. Continue rebase
git rebase --continue
# 3. Continue up the stack
```

## Phase 5: Land the Stack

### Landing order

**CRITICAL:** Land in order from bottom to top.

```markdown
## Landing Sequence

1. [ ] Merge #101 (stack/feature-1) → main
2. [ ] Rebase remaining PRs on main
3. [ ] Merge #102 (stack/feature-2) → main
4. [ ] Rebase remaining PRs on main
5. [ ] Merge #103 (stack/feature-3) → main
6. [ ] Rebase remaining PRs on main
7. [ ] Merge #104 (stack/feature-4) → main
8. [ ] Delete stack branches
```

### After each merge

```bash
# After merging level N
git checkout main
git pull

# Rebase level N+1
git checkout stack/feature-[N+1]
git rebase main
git push --force-with-lease

# Update PR to target main (if tooling requires)
```

### Cleanup

```bash
# After all merged
git checkout main
git branch -d stack/feature-1 stack/feature-2 stack/feature-3 stack/feature-4
git push origin --delete stack/feature-1 stack/feature-2 stack/feature-3 stack/feature-4
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Stack: [feature name]" |
| playbook_name | "autopilot-stack" |
| summary | N levels landed, feature complete |
| files | All files across stack |
| prs | All PR numbers in order |
| evidence | Stack diagram, final verification |

## Output Format

```markdown
## Stack Complete: [Feature Name]

**Levels:** [N]
**PRs:** #[list in order]
**Duration:** [time]

### Stack Summary

| Level | PR | Description | Status |
|-------|-----|-------------|--------|
| 1 | #101 | Foundation | ✓ Merged |
| 2 | #102 | Core | ✓ Merged |
| 3 | #103 | UI | ✓ Merged |
| 4 | #104 | Integration | ✓ Merged |

### Final State
[Description of complete feature]

### Verification
- [How the complete feature was verified]
```

## Guardrails

### Never do

- Merge out of order
- Skip a level
- Merge with conflicts unresolved
- Force push without rebasing stack

### Always do

- Land bottom to top
- Rebase after each merge
- Verify each level independently
- Keep PRs small and focused

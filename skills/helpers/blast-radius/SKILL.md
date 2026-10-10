---
name: blast-radius
description: "Find what a change could break elsewhere before it ships, beyond the diff. Prove the one fact it's safe because of by running real code. Use for 'blast radius', 'what could this break', or reviewing a small diff you don't trust."
disable-model-invocation: true
---

# Blast Radius

Find what a change breaks elsewhere, before it ships. Use for "blast radius of X", "what could this break", or reviewing a small diff you don't trust.

Companion to `/how-ui` and `/why-this-design`. `/how-ui` tells you what the code does. `/why-this-design` tells you why it's shaped that way. Blast radius tells you what it breaks elsewhere.

Listing the callers is not the job. The agent can grep those in a second. The job is the breakage grep won't show you.

## Don't trust your own writeup

A blast-radius writeup that sounds right is worthless. It reads as convincing whether or not it's true. Find the one or two facts the whole thing depends on and prove them by running code.

### Confidence levels

For each fact the change's safety depends on, get it as far down this list as cheap:

| Level | Meaning |
|-------|---------|
| 1. You said so | Worthless on its own |
| 2. You pointed at the line | Real `file:line` or source reference |
| 3. You showed the bad case can't happen | Walked the failure path, it doesn't reach |
| 4. You ran it | Script/test that calls real code, fails loud if wrong |
| 5. You reproduced in running app | Verified in dev server or preview |

Level 4 is usually one small script that imports the same module the app ships.

## Steps

### 1. Read the change

The diff, the symbols added/changed/deleted, what it now does differently — including what the diff doesn't spell out.

### 2. Find the one fact it's safe because of

Most risky changes are safe because of a single fact:
- "This hook only affects components that mount it"
- "This token change only affects hover states"
- "This refactor preserves the exact same render output"

Find that fact. If it holds, most risky cases clear at once.

### 3. Look where grep stops

**For design/frontend changes:**

- **Token usage:** Search for the token. Check computed styles.
- **Component consumers:** Not just direct imports — composition, HOCs, render props
- **CSS specificity:** Changes can be overridden elsewhere
- **State dependencies:** Other components reading the same state
- **Event handlers:** Other code responding to same events
- **Media queries:** Breakpoint changes affect multiple components
- **Third-party consumers:** External apps using your components

### 4. Be honest about each risk

Give each a real chance of happening and a real cost:

| Risk | Likelihood | Impact | Evidence |
|------|------------|--------|----------|
| Button color wrong in dark mode | Medium | Low | No dark mode tokens in change |
| Layout breaks at tablet | Low | High | Checked breakpoints, no tablet-specific |

Keep risks you confirmed. List cleared ones separately.

### 5. Prove the one fact

**For design changes:**
```bash
# Visual regression test
npm run test:visual -- --filter="affected-components"
```

**For frontend changes:**
```bash
# Run component in isolation
npm run storybook -- --story="ComponentName"

# Run actual tests
npm test -- --testPathPattern="AffectedComponent"
```

Paste what happened.

### 6. Consider arena for wide changes

For changes touching many files or affecting many consumers, run `/arena`:
- Multiple models check the same blast radius
- Merge their findings
- Different models catch different real bugs

## Output format

### What it does
What changed, including the non-obvious part.

### The one fact it's safe because of
State it. Which confidence level you got it to. Show the proof.
If you couldn't prove it, write "unproven".

### Risks

| Risk | How it breaks | File:line | Likelihood | Impact | Check |
|------|---------------|-----------|------------|--------|-------|
| ... | ... | ... | ... | ... | ... |

### Cleared
What you checked and why it's fine.

### Before you merge
The cheapest test or repro that catches the real bug, including any script you wrote.

## Design/Frontend specific checks

### Component changes
- All consumers render correctly
- Props API didn't change unexpectedly
- Default values still make sense
- TypeScript types still correct

### Style changes
- No unintended cascading
- Specificity didn't break existing overrides
- Responsive behavior intact
- Theme/dark mode variations work

### State changes
- Derived state still computes correctly
- Subscribed components update
- No stale closures
- Cleanup/unmount still works

### Token/theme changes
- All usages produce intended result
- Semantic tokens still meaningful
- Fallback values work
- Documentation matches reality

## Reply

The writeup above, with the one safety fact either proven or marked unproven.

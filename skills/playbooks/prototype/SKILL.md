---
name: prototype
description: "Build the smallest throwaway UI sketch to settle a design or behavior decision. Use when the answer is observable by building, not by asking. Prototype decides, then gets deleted or promoted."
disable-model-invocation: true
---

# Prototype

A throwaway sketch to make a design or behavioral decision cheaply. Build it, observe it, decide, then delete or promote. The point is to settle a fork by seeing, not by debating.

## When to use

- "Should we use tabs or a sidebar?"
- "Which animation feels better?"
- "Does this layout work at mobile?"
- "How does this interaction feel?"
- "Mock it up to decide"
- "Try this layout and see"
- Any fork that observation can settle faster than discussion

## Steps

```
PLAYBOOK: Prototype
──────────────────────────────────────

□ Step 1: Define the decision
  └─ What specific question does this prototype answer?
  └─ What are the options being compared?
  └─ What would prove one option better?

□ Step 2: Scope the sketch
  └─ Principle: Smallest change that works
  └─ What's the minimum to see the difference?
  └─ Hard-code data, skip edge cases, fake backends
  └─ Don't build infrastructure

□ Step 3: Choose the approach
  └─ Isolated sandbox (CodeSandbox, StackBlitz)
  └─ Branch in the real repo
  └─ Storybook story
  └─ Figma prototype (for layout/visual only)

□ Step 4: Build option A
  └─ Minimum viable implementation
  └─ Just enough to see it working
  └─ Capture screenshot/recording

□ Step 5: Build option B (if comparing)
  └─ Same scope as A
  └─ Side-by-side or toggle between
  └─ Capture screenshot/recording

□ Step 6: Observe and decide
  └─ Principle: Prove it on the real screen
  └─ Which answers the original question?
  └─ Note what you learned
  └─ Record the decision and why

□ Step 7: Clean up
  └─ Delete the prototype OR
  └─ Promote to a proper implementation
  └─ Don't leave sketches in the codebase

□ Step 8: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Screenshots/recordings of options, documented decision with rationale
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Prototype: [decision made]" |
| playbook_name | "prototype" |
| summary | Decision reached and rationale |
| files | Screenshot/recording paths |
| evidence | Comparison screenshots, decision doc |

## What prototypes are NOT

| Prototype | Not a prototype |
|-----------|-----------------|
| Throwaway code to answer a question | Production code |
| Minimum to observe the difference | Complete feature |
| Disposable after decision | Permanent fixture |
| Fast and rough | Polished and tested |
| Settles one specific fork | Explores everything |

## Prototype patterns

### Layout comparison
```jsx
// Option A: Tabs
<Tabs>
  <Tab>Settings</Tab>
  <Tab>Profile</Tab>
</Tabs>

// Option B: Sidebar
<Sidebar>
  <NavItem>Settings</NavItem>
  <NavItem>Profile</NavItem>
</Sidebar>
```

### Animation feel
```css
/* Option A: Fast */
.transition-a { transition: transform 150ms ease-out; }

/* Option B: Smooth */
.transition-b { transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1); }
```

### Mobile layout
```jsx
// Force mobile viewport
<div style={{ maxWidth: 375, margin: 'auto' }}>
  <YourComponent />
</div>
```

### Interaction pattern
```jsx
// Build both, toggle with state
const [variant, setVariant] = useState('A');
return (
  <>
    <button onClick={() => setVariant(v => v === 'A' ? 'B' : 'A')}>
      Toggle ({variant})
    </button>
    {variant === 'A' ? <VariantA /> : <VariantB />}
  </>
);
```

## Decision documentation

After observing, document:

```markdown
## Decision: [The question]

### Options tried
- **A:** [Description]
- **B:** [Description]

### Observation
[What you saw when using each]

### Decision
Chose **[A/B]** because [concrete reason from observation]

### Evidence
- [Screenshot of A]
- [Screenshot of B]

### What happens next
- [ ] Delete prototype
- [ ] Promote winning option to production
```

## Rules

1. **Set a timebox.** Prototypes are fast. If it takes more than an hour, scope down.
2. **One question at a time.** Don't prototype multiple unrelated decisions.
3. **Observe, don't imagine.** Build it and use it. Screenshots are evidence.
4. **Document the decision.** The prototype dies; the learning persists.
5. **Clean up.** Delete it or promote it. No zombie sketches.

## Integration with flash-mode

Prototype is matched when:
- Request mentions "try", "mock up", "sketch", "prototype"
- A design fork could be settled by observation
- User is stuck between two UI approaches
- The answer is empirical, not preference

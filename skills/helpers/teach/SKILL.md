---
name: teach
description: "Explain a UI, component, or design decision plainly so a person actually understands it. Combines /how-ui and /why-this-design into one clear explanation built up step by step. Use for 'teach me', 'help me understand', 'explain this'."
disable-model-invocation: true
---

# /teach

Explain what a thing is, how it works, and why it's built that way, in one plain account at the person's pace. The goal is that they understand it, not that you change anything.

## When to use

- "Teach me how this component works"
- "Help me really understand the auth flow"
- "Explain this design system to me"
- "Walk me through this code"
- New team member onboarding
- Before making major changes

## Process

### 1. Decide what they should walk away understanding

Read from the conversation:
- Why are they asking? (about to change it, reviewing it, debugging it, new to it)
- What do they already know?
- Where is their question?

Skip what they plainly already know. Put the depth where their question is.

### 2. Let /how-ui and /why-this-design do the work

Don't redo their investigation. Run them and combine the results.

```
For "how does X work?"
  └─ Run /how-ui

For "why is X like this?"
  └─ Run /why-this-design

For understanding a subsystem:
  └─ Run both in parallel, synthesize
```

Keep `/why-this-design` narrow by default since its full sweep is slow.

### 3. Start with a plain definition

Name the thing and say what it is in general terms, the way a senior engineer would say it out loud.

```
Bad: "This is a complex state management solution utilizing..."
Good: "This is a shopping cart. It holds items until checkout."
```

Then tie it to the case in front of you and build from there.

### 4. Build up, don't dump

**One layer at a time:**
1. The one-sentence answer
2. How it actually works
3. The deeper reasons
4. The edge cases

**Show, don't only tell:**
- Open the code when that helps
- Draw diagrams for flows
- For 3+ moving parts: draw it three times, adding one part each time

### 5. Keep it conversational

- Offer to go deeper or move on
- No quizzes or pacing theater
- Don't announce "the key insight" — just say it
- When you would pause, stop and let them respond

## Output format

```markdown
## [Thing Name]

[One or two sentences: what it is in plain terms]

### How it works

[The mechanism, step by step, building up complexity]

[Diagram if helpful]

### Why it's this way

[The reasons, from /why-this-design]
[Keep confidence labels: documented, inferred, unknown]

### The edge cases

[What's non-obvious or tricky]

### Going deeper

[Offer threads to explore via /how-ui or /why-this-design]
```

## Diagram rules

For anything with 3+ moving parts, build the picture up:

```
Step 1: A → B (just these two)
Step 2: A → B → C (add the third)
Step 3: A → B → C → result (complete the flow)
```

A single all-at-once diagram is reference, not teaching.

## Writing style

Write the way you'd explain to a colleague:
- Plain spoken English
- Tight, not terse
- State the concrete mechanism, not a metaphor
- Normal sentence case
- One or two commas per sentence max
- Give each concept one name and keep it

**Don't:**
- Print "TL;DR" or "the key takeaway"
- Use em dashes
- Write walls of text
- List functions and constants (that's reference, not teaching)

## Example

**User:** "Teach me how the modal system works"

```markdown
## Modal System

The modal system shows overlays on top of the main content. 
It handles focus trapping, backdrop clicks, and escape to close.

### How it works

There's one ModalProvider at the app root that manages which 
modals are open.

[Diagram 1: App → ModalProvider → Content]

When you call openModal(), it adds an entry to the stack.

[Diagram 2: App → ModalProvider → Content
                    ↓
                 Modal Stack: [SettingsModal]]

The modal renders via a portal to document.body, so it sits 
above everything else.

[Diagram 3: Full flow with portal rendering]

### Why it's this way

The portal approach (documented in PR #234) was chosen because:
- Z-index issues with nested modals were causing bugs
- Focus trapping is easier with a single container

### Edge cases

- Nested modals: supported, but avoid going more than 2 deep
- Mobile: uses bottom sheet variant automatically
- Escape key: closes top modal only

### Going deeper

- How focus trapping works → /how-ui
- Why portal vs inline → /why-this-design
```

## Rules

1. **Understand before you teach.** Run /how-ui and /why-this-design first.
2. **Build up, don't dump.** Layers, not walls.
3. **Plain words.** No jargon without explanation.
4. **Show, don't tell.** Code and diagrams beat descriptions.
5. **Stay conversational.** Pause and let them respond.

## Integration with flash-mode

/teach routes through the **Investigation** playbook first, then weaves the findings into an explanation. It's invoked when:
- User says "teach me", "explain", "help me understand"
- User is learning, not doing
- The goal is knowledge transfer, not code changes

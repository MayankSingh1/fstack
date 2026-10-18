---
name: flash-help
description: "Quick reference that maps questions to the right skill, playbook, or principle. Use for /flash-help, 'what skill should I use', or 'how do I do X with fstack'."
disable-model-invocation: true
---

# /flash-help

Maps your question to the right fstack skill, playbook, or principle.

## Quick Map

### "I want to understand..."

| Question | Use |
|----------|-----|
| How does this component/screen work? | `/how-ui` |
| Why was this designed this way? | `/why-this-design` |
| Teach me how this works | `/teach` |
| Read-only investigation | **Investigation** playbook |

### "I want to build..."

| Task | Use |
|------|-----|
| Implement a Figma design | **Figma to Code** playbook |
| Build a new feature end-to-end | **Feature** playbook |
| Build a new component | **Figma to Code** + design system principle |
| Create a quick sketch to decide | **Prototype** playbook |
| Refactor a component | **Component Refactor** playbook |
| Design component API first | `/architect` |

### "I want to check..."

| Check | Use |
|-------|-----|
| Does this match the design? | **Visual Parity** playbook |
| Is this accessible? | `/a11y` or **Accessibility Audit** playbook |
| Does this work on mobile? | **Responsive & Cross-Browser** playbook |
| Can I verify this feature? | `/create-verification-skill` |
| Grade this and retry until it passes | **Verification Loop** playbook |

### "I want to ship..."

| Task | Use |
|------|-----|
| Open a PR | **Open a PR** playbook |
| Get a PR to merge-ready | **Babysit PR** playbook |
| Verify and land a PR | **Shipping** playbook |
| Hand off to developers | **Handoff Note** playbook |

### "I want to fix..."

| Problem | Use |
|---------|-----|
| Bug in UI | **Bug Fix** playbook |
| Not matching design | **Visual Parity** playbook |
| Accessibility issue | **Accessibility Audit** playbook |
| Performance issue, slow | **Perf Issue** playbook |
| Memory leak, CPU spin | **Runtime Forensics** playbook |
| Stop repeated mistakes | `/correct` |

### "I want to review..."

| Review | Use |
|--------|-----|
| Get design feedback | `/critique` or **Design Critique** playbook |
| Clean up AI-generated text | `/unslop` |
| Multi-perspective review | `/critique` |

### "I want to manage work..."

| Task | Use |
|------|-----|
| Continue previous work | **Session Pickup** playbook |
| Pause and save progress | **Pause Safely** playbook |
| Keep a decision trail | `/show-me-your-work` |
| Configure fstack | `/setup-fstack` |
| Catch me up on context | `/recall` |
| What should this task read? | `/context` |
| What should I remember, or can I forget this? | `/memory` |
| Is this allowed, or why did you stop? | `/guardrails` |
| How much authority should this action have? | `/agentic` |
| Finish without me | **Autonomous Run** playbook |
| Multiple PRs, stacked | **Multi-Phase Plan** playbook |
| Coordinate workstreams | **Orchestrate** playbook |
| Plan one job and swarm each phase | **Planner** playbook |

### "I want to improve..."

| Task | Use |
|------|-----|
| Improve metric to target | **Hillclimb** playbook |
| Compare approaches | `/arena` |
| Parallel workers | `/swarm` |
| What could this break | `/blast-radius` |
| Turn learnings into skills | `/reflect` |
| Create my personal mode | `/automate-me` |
| Which loop should I stack? | `/loop-engineering` |
| Agents keep missing the same thing | `/harness-improve` (not Hillclimb) |

### "I want to write..."

| Task | Use |
|------|-----|
| Docs, READMEs, RFCs | `/technical-writing` |
| Write a skill | **Authoring a Skill** playbook |
| Clean up comments | `/no-comments` |
| Say that simpler | `/bro` |

## Skill Index

### Helpers — Understanding

| Command | Purpose |
|---------|---------|
| `/how-ui` | Trace how a screen/component works |
| `/why-this-design` | Find evidence for design decisions |
| `/teach` | Combines how + why into plain explanation |
| `/recall` | Catch up from recent transcripts and git state |

### Helpers — Review & Quality

| Command | Purpose |
|---------|---------|
| `/critique` | Multi-reviewer feedback |
| `/a11y` | Quick accessibility check |
| `/unslop` | Remove AI-generated fluff |
| `/blast-radius` | What could this change break |
| `/no-comments` | Clean up unnecessary comments |

### Helpers — Architecture & Comparison

| Command | Purpose |
|---------|---------|
| `/architect` | Design component API before building |
| `/arena` | Competing attempts, pick best, graft ideas |
| `/swarm` | Parallel workers across slices |
| `/tdd` | Test-driven development for UI |

### Helpers — Meta & Learning

| Command | Purpose |
|---------|---------|
| `/reflect` | Turn learnings into skill edits |
| `/loop-engineering` | Map a task onto agent, verification, and harness loops |
| `/harness-improve` | Edit skills or rules after repeated misses |
| `/context` | Choose what this task may read |
| `/memory` | Choose what lasts, and what may be forgotten |
| `/guardrails` | Block an action this repo does not allow |
| `/agentic` | Lowest autonomy level for one action |
| `/automate-me` | Create personal mode from patterns |
| `/correct` | Stop repeated mistakes |
| `/figure-it-out` | Custom playbook when none fits |

### Helpers — Writing & Code

| Command | Purpose |
|---------|---------|
| `/technical-writing` | Docs, READMEs, PRs, commit messages |
| `/typescript-best-practices` | TypeScript/React patterns |
| `/bro` | Say the last message simpler |
| `/changelog-notetaker` | Record task in project changelog |

### Helpers — Setup & Reference

| Command | Purpose |
|---------|---------|
| `/setup-fstack` | Configure model roles |
| `/create-verification-skill` | Generate project verification skill |
| `/maintain-verification-skill` | Keep verification skill current |
| `/show-me-your-work` | Decision log for auditable trail |
| `/flash-help` | This help map |

### Design Playbooks

| Playbook | Trigger |
|----------|---------|
| Problem Framing | Research, user needs, problem understanding |
| User Flows & IA | Navigation, site structure, flows |
| Wireframe to Hi-Fi | Sketches to polished designs |
| Design Critique | Get design feedback |
| Design System | Tokens, components, design system |
| UX Copy | Microcopy, labels, error messages |

### Frontend Playbooks

| Playbook | Trigger |
|----------|---------|
| Figma to Code | Implement from Figma |
| Visual Parity | Match the design exactly |
| Accessibility Audit | WCAG 2.2 AA audit |
| Responsive & Cross-Browser | Mobile, Safari, Firefox |
| Component Refactor | Refactor safely |
| Bug Fix | Fix UI bugs |
| Feature | Build new feature end-to-end |
| Perf Issue | Performance diagnosis and fix |
| Hillclimb | Improve metric to target |
| Runtime Forensics | Memory leak, CPU spin, frozen UI |
| Trace Forensics | Analyze captured profile/trace |

### Shipping Playbooks

| Playbook | Trigger |
|----------|---------|
| Open a PR | Create pull request |
| Babysit PR | Drive PR to merge-ready |
| Shipping | Verify and land PRs |
| Handoff Note | Designer-developer handoff |

### Session Playbooks

| Playbook | Trigger |
|----------|---------|
| Investigation | Read-only questions |
| Prototype | Throwaway sketch to decide |
| Session Pickup | Continue previous work |
| Pause Safely | Save progress cleanly |

### Advanced Playbooks

| Playbook | Trigger |
|----------|---------|
| Autonomous Run | Finish without human intervention |
| Multi-Phase Plan | Work spanning multiple PRs |
| Orchestrate | Coordinate across workstreams |
| Planner | Plan one job, swarm each phase, show the handoff and the gate |
| Autopilot Full | Land queue of independent PRs |
| Autopilot Stack | Land PRs as linear stack |
| Authoring a Skill | Write or edit a SKILL.md |
| Verification Loop | Rubric, grade, retry up to 3 times |

## Principles

| Principle | When it applies |
|-----------|-----------------|
| Start from the User's Task | Beginning any task |
| Prove It on the Real Screen | Verifying changes |
| Tokens over Hard-Coded Values | Adding styles |
| Accessible by Default | Any interactive element |
| Smallest Change That Works | Bug fixes, refactors |
| States Are Part of the Design | Building UI with data |
| Design System Consistency | Adding new components |

## Decision Tree

```
What do you want to do?
│
├─ Understand something
│  ├─ How it works → /how-ui
│  ├─ Why it's this way → /why-this-design
│  └─ Both, explained → /teach
│
├─ Build something
│  ├─ From Figma → Figma to Code playbook
│  ├─ Quick experiment → Prototype playbook
│  └─ Refactor existing → Component Refactor playbook
│
├─ Check something
│  ├─ Matches design? → Visual Parity playbook
│  ├─ Accessible? → /a11y or Accessibility Audit
│  └─ Works everywhere? → Responsive playbook
│
├─ Ship something
│  ├─ Open PR → Open a PR playbook
│  ├─ Fix PR → Babysit PR playbook
│  └─ Land PR → Shipping playbook
│
├─ Review something
│  ├─ Design feedback → /critique
│  └─ Clean up text → /unslop
│
├─ Stack loops
│  ├─ Which loop? → /loop-engineering
│  ├─ Grade and retry → Verification Loop playbook
│  └─ Fix the harness → /harness-improve
│
├─ Set the window
│  ├─ What may this task read? → /context
│  ├─ What lasts, and what may be forgotten? → /memory
│  └─ Is this allowed? → /guardrails
│
├─ Choose authority
│  └─ How much should the agent do? → /agentic
│
└─ Manage session
   ├─ Continue work → Session Pickup playbook
   ├─ Pause work → Pause Safely playbook
   └─ Track decisions → /show-me-your-work
```

## Still not sure?

Just describe what you want to do in plain language and invoke `/flash-mode`. It will match you to the right playbook automatically.

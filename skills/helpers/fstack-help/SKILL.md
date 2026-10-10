---
name: fstack-help
description: "Quick reference that maps questions to the right skill, playbook, or principle. Use for /fstack-help, 'what skill should I use', or 'how do I do X with fstack'."
disable-model-invocation: true
---

# /fstack-help

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
| Build a new component | **Figma to Code** + design system principle |
| Create a quick sketch to decide | **Prototype** playbook |
| Refactor a component | **Component Refactor** playbook |

### "I want to check..."

| Check | Use |
|-------|-----|
| Does this match the design? | **Visual Parity** playbook |
| Is this accessible? | `/a11y` or **Accessibility Audit** playbook |
| Does this work on mobile? | **Responsive & Cross-Browser** playbook |
| Can I verify this feature? | `/create-verification-skill` |

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

## Skill Index

### Helpers

| Command | Purpose |
|---------|---------|
| `/how-ui` | Trace how a screen/component works |
| `/why-this-design` | Find evidence for design decisions |
| `/teach` | Combines how + why into plain explanation |
| `/critique` | Multi-reviewer feedback |
| `/a11y` | Quick accessibility check |
| `/unslop` | Remove AI-generated fluff |
| `/setup-fstack` | Configure model roles |
| `/create-verification-skill` | Generate project verification skill |
| `/maintain-verification-skill` | Keep verification skill current |
| `/show-me-your-work` | Decision log for auditable trail |
| `/fstack-help` | This help map |

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
└─ Manage session
   ├─ Continue work → Session Pickup playbook
   ├─ Pause work → Pause Safely playbook
   └─ Track decisions → /show-me-your-work
```

## Still not sure?

Just describe what you want to do in plain language and invoke `/flash-mode`. It will match you to the right playbook automatically.

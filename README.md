# fstack (flash stack)

**Agent skills for product designers, UX designers, UI designers, and frontend developers.**

Covers the flow from research and design through frontend build, review, raising PRs, and shipping. Modeled on [pstack](https://flaviocopes.com/pstack/) by Lauren Tan ([@poteto](https://x.com/poteto)).

> **Note:** Flavio Copes uses the name "fstack" for his own workflow. This is **fstack (flash stack)** — a distinct Cursor plugin focused on design and frontend work.

## Quick Start

### Cursor

```
/add-plugin fstack
/setup-fstack
```

Then start a new chat and run:

```
/flash-mode implement this Figma design
```

### Claude Code / Codex (Manual Install)

Copy the `skills/` directory to your project or user skills folder:

```bash
# Claude Code
cp -r skills/ ~/.claude/skills/fstack/

# Codex  
cp -r skills/ .codex/skills/fstack/
```

Then invoke with `/flash-mode` or reference skills directly.

## How It Works

fstack has one main command: **`/flash-mode`**

Flash-mode is a **sticky router**. You describe what you want, and it:

1. Reads the principles index
2. Matches your request to a playbook
3. Copies the playbook steps into a task list
4. Calls specialist skills when needed
5. Delegates to appropriate models (if configured)
6. Refuses to report success without evidence on the real artifact

### Example

```
/flash-mode make this button match the Figma design
```

Flash-mode selects the **Visual Parity** playbook and creates:

```
PLAYBOOK: Visual Parity
──────────────────────────────────────

□ Step 1: Identify the source of truth (Figma file/frame)
□ Step 2: Take a screenshot of the current implementation
□ Step 3: Run visual diff between design and implementation
□ Step 4: List every discrepancy
□ Step 5: Apply fixes using design tokens
□ Step 6: Re-run visual diff
□ Step 7: Verify all states match
□ Step 8: Capture final screenshot as evidence

EVIDENCE REQUIRED: 0 pixel difference OR documented intentional deviations
```

### Sticky Mode

After `/flash-mode` is invoked:
- Follow-up messages stay in flash-mode
- Say `new task` to match a fresh playbook
- Say `exit` or `stop` to leave flash-mode

## Skill Catalogue

### Router

| Skill | Command | Description |
|-------|---------|-------------|
| Flash Mode | `/flash-mode` | Sticky router — matches requests to playbooks |

### Understanding (Read-Only)

| Playbook | Trigger Patterns | Purpose |
|----------|------------------|---------|
| Investigation | how does X work, why, are we sure | Read-only investigation, cited answer |
| Prototype | mock it up, try this layout, sketch | Throwaway UI sketch to settle a decision |

### Design Playbooks

| Playbook | Trigger Patterns | Purpose |
|----------|------------------|---------|
| Problem Framing | research, user needs, problem | Clarify the problem before solutioning |
| User Flows & IA | user flows, navigation, structure | Map how users move through the product |
| Wireframe to Hi-Fi | wireframes, mockups, high-fidelity | Take sketches to polished designs |
| Design Critique | review this design, feedback | Multi-perspective design feedback |
| Design System | tokens, components, design system | Create/maintain design systems |
| UX Copy | microcopy, labels, error messages | Write effective UI text |

### Frontend Playbooks

| Playbook | Trigger Patterns | Purpose |
|----------|------------------|---------|
| Figma to Code | implement from Figma, build this design | Translate Figma designs to code |
| Visual Parity | match the design, pixel-perfect | Achieve exact visual match |
| Accessibility Audit | accessibility, a11y, WCAG | WCAG 2.2 AA compliance audit |
| Responsive & Cross-Browser | responsive, mobile, Safari | Ensure cross-device/browser consistency |
| Component Refactor | refactor, extract, restructure | Safely refactor components |
| Bug Fix | fix bug, broken, not working | Systematic bug fixing |

### Shipping Playbooks

| Playbook | Trigger Patterns | Purpose |
|----------|------------------|---------|
| Open a PR | open PR, create PR | Create high-quality pull requests |
| Babysit PR | review comments, CI failing | Drive PRs to merge-ready (never auto-merges) |
| Shipping | ship, land, verify and merge | Independent verification before landing |
| Handoff Note | handoff, notes for dev | Designer-developer handoff documentation |

### Session Playbooks

| Playbook | Trigger Patterns | Purpose |
|----------|------------------|---------|
| Session Pickup | continue, pick up, resume | Resume prior agent's work cleanly |
| Pause Safely | pause, stop, stepping away | Save progress at atomic boundary |

### Helper Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| How UI | `/how-ui` | Trace how screens/components work |
| Why This Design | `/why-this-design` | Find evidence for design decisions |
| Teach | `/teach` | Combines how + why into plain explanation |
| Critique | `/critique` | Multi-reviewer feedback (act on/consider/noted/dismissed) |
| A11y | `/a11y` | Quick accessibility check |
| Unslop | `/unslop` | Remove AI-generated fluff from text |
| Setup fstack | `/setup-fstack` | Configure model roles |
| Create Verification Skill | `/create-verification-skill` | Generate project-local verification skill |
| Maintain Verification Skill | `/maintain-verification-skill` | Keep verification skill current |
| Show Me Your Work | `/show-me-your-work` | Decision log for auditable trail |
| fstack Help | `/fstack-help` | Maps questions to the right skill |

### Principles

These are automatically applied by flash-mode when relevant:

| Principle | Core Idea |
|-----------|-----------|
| Start from the User's Task | Understand what users need before jumping to code |
| Prove It on the Real Screen | Verify on the live UI, not in imagination |
| Tokens over Hard-Coded Values | Use design tokens, not magic numbers |
| Accessible by Default | Keyboard-navigable, screen-reader friendly |
| Smallest Change That Works | Delete before adding, modify before creating |
| States Are Part of the Design | Empty, loading, error, success — all designed |
| Consistency with Design System | Match existing patterns |

## Configuration

### Model Roles

Run `/setup-fstack` to configure which models handle different work types.

Or manually create `~/.cursor/rules/fstack-models.mdc`:

```markdown
---
description: "fstack model role configuration"
alwaysApply: true
---

# fstack Model Roles

## Investigation
Model: claude-sonnet

## Implementation
Model: claude-sonnet

## Judgment
Model: claude-opus

## Review
Models: claude-opus, claude-sonnet

## Prose
Model: claude-opus
```

### Roles Explained

| Role | Use Case |
|------|----------|
| `investigation` | `/how-ui`, `/why-this-design`, `/teach`, understanding code |
| `implementation` | Writing code, Figma-to-code |
| `judgment` | Design decisions, architecture |
| `review` | `/critique`, accessibility audits |
| `prose` | UX copy, PR descriptions |

## Example Prompts

### Understanding

```
/flash-mode how does the modal system work?
/flash-mode why was the navigation built this way?
/flash-mode teach me how the auth flow works
```

### Design Work

```
/flash-mode research why users abandon the checkout flow
/flash-mode design a user flow for password reset
/flash-mode take these wireframes to high-fidelity
/flash-mode create tokens for our color system
/flash-mode write the error messages for this form
/flash-mode mock up both layouts so we can decide
```

### Frontend Work

```
/flash-mode implement this Figma design for the dashboard header
/flash-mode this button doesn't match the design, fix it
/flash-mode audit this page for accessibility
/flash-mode make this component work on mobile
/flash-mode refactor this card component to be more flexible
/flash-mode fix the bug where the modal won't close
```

### Shipping

```
/flash-mode open a PR for these changes
/flash-mode help me address these review comments
/flash-mode verify and ship this PR
/flash-mode create a handoff note for the checkout redesign
```

### Session Management

```
/flash-mode continue from where we left off
/flash-mode pause and save my progress
/show-me-your-work
```

### Helpers

```
/how-ui how does the notification system work?
/why-this-design why is the button 48px tall?
/teach explain the state management approach
/critique review this design for usability issues
/a11y check this form for accessibility
/unslop clean up this PR description
/fstack-help what skill should I use for X?
/create-verification-skill
```

## File Structure

```
fstack/
├── skill.json                          # Plugin manifest
├── README.md                           # This file
├── validate.sh                         # Validation script
├── scripts/
│   └── log.sh                          # Decision log helper
├── references/
│   └── decision-log-template.tsv       # TSV template
├── rules/
│   └── fstack-models.mdc               # Example model config
└── skills/
    ├── flash-mode/
    │   ├── SKILL.md                    # Main router
    │   └── principles-index.md         # Principles reference
    ├── principles/                     # 7 principle skills
    ├── playbooks/
    │   ├── design/                     # 6 design playbooks
    │   ├── frontend/                   # 6 frontend playbooks
    │   ├── shipping/                   # 4 shipping playbooks
    │   ├── investigation/              # Read-only investigation
    │   ├── prototype/                  # Throwaway sketches
    │   ├── session-pickup/             # Resume prior work
    │   └── pause-safely/               # Save progress cleanly
    └── helpers/                        # 11 helper skills
        ├── how-ui/
        ├── why-this-design/
        ├── teach/
        ├── critique/
        ├── a11y/
        ├── unslop/
        ├── setup-fstack/
        ├── create-verification-skill/
        ├── maintain-verification-skill/
        ├── show-me-your-work/
        └── fstack-help/
```

## Validation

Run the validation script to check all skills have valid frontmatter and cross-references:

```bash
./validate.sh
```

The script checks:
- All SKILL.md files have valid `name` and `description` in frontmatter
- All playbooks referenced in the router exist
- All helper skills exist
- Principles index matches principle skill files

## Differences from pstack

fstack is inspired by pstack but focused specifically on design and frontend work:

| pstack | fstack |
|--------|--------|
| Full engineering workflow | Design + frontend focus |
| 22+ playbooks | 20 playbooks (design, frontend, shipping, session) |
| `/poteto-mode` router | `/flash-mode` router |
| `/interrogate` multi-model review | `/critique` multi-reviewer feedback |
| `/how`, `/why` | `/how-ui`, `/why-this-design` |
| Engineering principles | Design + frontend principles |

Both share:
- Sticky router pattern
- Playbook-based task lists
- Evidence-based completion
- Model role delegation
- Verification skills
- Decision logging
- Session pickup/pause
- Helper skill architecture

## License

MIT

## Credits

- Inspired by [pstack](https://flaviocopes.com/pstack/) by Lauren Tan ([@poteto](https://x.com/poteto))
- Article: [A deep dive into pstack](https://flaviocopes.com/pstack/) by Flavio Copes

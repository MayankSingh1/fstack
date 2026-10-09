---
name: flash-mode
description: "Sticky router for fstack. Matches request to playbook, copies steps verbatim, calls specialist skills, delegates by model role, and refuses success without evidence on the real artifact. Type 'new task' to reset."
---

# Flash Mode

You are now in **flash-mode** — the fstack router for design and frontend work. This mode is **sticky**: follow-up messages stay in flash-mode until the user says `new task` or exits explicitly.

## How Flash Mode Works

1. **Read the principles index** at the start of every task
2. **Match the request** to a playbook
3. **Copy the playbook verbatim** into the task list (skipped steps stay listed with a reason)
4. **Call specialist skills** when their step arrives
5. **Delegate by model role** when available (see `~/.cursor/rules/fstack-models.mdc`)
6. **Refuse to report success** without evidence on the real artifact

## Principles Index

Before starting work, internalize these principles. When a task triggers a principle, apply it explicitly.

| Principle | Core Idea |
|-----------|-----------|
| **Start from the user's task** | Understand what the user actually needs, not what looks like the obvious change |
| **Prove it on the real screen** | Verification happens on the live UI, not in imagination |
| **Tokens over hard-coded values** | Use design tokens and CSS custom properties, not magic numbers |
| **Accessible by default** | Every component is keyboard-navigable and screen-reader friendly |
| **Smallest change that works** | Delete before you add. Modify before you create |
| **States are part of the design** | Empty, loading, error, success — each is a designed state |
| **Consistency with the design system** | New components match existing patterns in the codebase |

## Playbook Matching

Match the user's request to the most appropriate playbook:

### Design Playbooks

| Request Pattern | Playbook |
|-----------------|----------|
| Research, user needs, problem understanding | **Problem Framing & Research Synthesis** |
| User flows, navigation, site structure | **User Flows & Information Architecture** |
| Sketches, wireframes, mockups, high-fidelity | **Wireframe to Hi-Fi** |
| Review this design, feedback on design | **Design Critique** |
| Design tokens, components, design system | **Design System** |
| Microcopy, labels, error messages, UX writing | **UX Copy** |

### Frontend Playbooks

| Request Pattern | Playbook |
|-----------------|----------|
| Implement from Figma, build this design | **Figma to Code** |
| Match the design, pixel-perfect, visual diff | **Visual Parity** |
| Accessibility, a11y, WCAG, screen reader | **Accessibility Audit** |
| Responsive, mobile, cross-browser, Safari/Firefox | **Responsive & Cross-Browser** |
| Refactor component, extract, restructure | **Component Refactor** |
| Fix bug, broken, not working, regression | **Bug Fix** |

### Shipping Playbooks

| Request Pattern | Playbook |
|-----------------|----------|
| Open PR, create PR, submit for review | **Open a PR** |
| Review comments, CI failing, get to merge | **Babysit PR** |
| Handoff, notes for dev, design specs | **Handoff Note** |

## Task List Format

When a playbook is matched, copy its steps verbatim:

```
PLAYBOOK: [Name]
──────────────────────────────────────

□ Step 1: [Description]
□ Step 2: [Description]
  └─ Calls: /helper-skill
□ Step 3: [Description]
  └─ SKIPPED: [reason]
□ Step 4: [Description]
...

EVIDENCE REQUIRED: [What proves this task is done]
```

## Model Role Delegation

When `~/.cursor/rules/fstack-models.mdc` exists, delegate by role:

| Role | Typical Use |
|------|-------------|
| `investigation` | `/how-ui`, `/why-this-design`, research |
| `implementation` | Code changes, Figma-to-code |
| `judgment` | Design decisions, architecture |
| `review` | `/critique`, accessibility audit |
| `prose` | UX copy, PR descriptions |

If no role file exists, use the current model for all work.

## Commands

- **`new task`** — Reset flash-mode. Match a fresh playbook for the next request.
- **`exit flash-mode`** or **`stop`** — Leave flash-mode entirely.
- **`apply [principle name]`** — Explicitly invoke a principle during the current task.
- **`skip [step]`** — Skip a step, but record the reason in the task list.

## Evidence Rules

Never report success without:

1. **For design work**: Screenshot, Figma link, or visible state in the design tool
2. **For frontend work**: The change running on a real screen (dev server, preview, etc.)
3. **For PRs**: The PR link and confirmation that CI passes or failures are addressed
4. **For a11y work**: Output from an accessibility checker or manual keyboard/screen reader test

If evidence cannot be gathered, report what was done and what verification is still needed.

## Specialist Skill Calls

Flash-mode calls these skills when their step arrives:

| Skill | When Called |
|-------|-------------|
| `/how-ui` | Understanding how a screen or component works |
| `/why-this-design` | Tracing design rationale from history |
| `/critique` | Multi-reviewer design feedback |
| `/a11y` | Accessibility checks |
| `/unslop` | Cleaning up AI-generated copy |

## Example Flow

User: `/flash-mode make this button match the Figma design`

```
PLAYBOOK: Visual Parity
──────────────────────────────────────

□ Step 1: Identify the source of truth (Figma file/frame)
□ Step 2: Take a screenshot of the current implementation
□ Step 3: Run visual diff between design and implementation
□ Step 4: List every discrepancy (spacing, color, typography, states)
□ Step 5: Apply fixes using design tokens
  └─ Principle: Tokens over hard-coded values
□ Step 6: Re-run visual diff
□ Step 7: Verify all states match (hover, focus, disabled, active)
  └─ Principle: States are part of the design
□ Step 8: Capture final screenshot as evidence

EVIDENCE REQUIRED: Screenshot showing 0 pixel difference OR explanation of intentional deviations
```

## Sticky Behavior

After `/flash-mode` is invoked:
- Normal follow-up messages stay in flash-mode
- `continue`, `do it`, `keep going` continue the current playbook
- `new task` resets and matches a fresh playbook
- Mode persists until explicitly exited

## Integration Notes

- **Claude Code / Codex**: This skill loads as-is. Use `/flash-mode` to invoke.
- **Cursor**: Install via `/add-plugin fstack` or copy to `.cursor/skills/`.
- **Model roles**: Run `/setup-fstack` to configure model delegation.

# fstack (flash stack)

**Agent skills for product designers, UX designers, UI designers, and frontend developers.**

Covers the flow from research and design through frontend build, review, raising PRs, and shipping. Modeled on [pstack](https://flaviocopes.com/pstack/) by Lauren Tan ([@poteto](https://x.com/poteto)).

> **Note:** Flavio Copes uses the name "fstack" for his own workflow. This is **fstack (flash stack)** — a distinct plugin focused on design and frontend work.

---

## Table of Contents

- [What is fstack?](#what-is-fstack)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Skills Reference](#skills-reference)
  - [Flash Mode (Router)](#flash-mode-router)
  - [Playbooks](#playbooks)
  - [Helpers](#helpers)
  - [Principles](#principles)
- [Configuration](#configuration)
- [Example Prompts](#example-prompts)
- [File Structure](#file-structure)
- [Validation](#validation)
- [pstack to fstack Mapping](#pstack-to-fstack-mapping)
- [License](#license)

---

## What is fstack?

fstack is a collection of **65 AI agent skills** that help designers and frontend developers work faster and more consistently. It provides:

| Feature | Description |
|---------|-------------|
| **Sticky Router** | One command (`/flash-mode`) that understands your intent and picks the right workflow |
| **31 Playbooks** | Step-by-step workflows for design, frontend, shipping, and session management |
| **26 Helpers** | Quick-access tools for specific tasks like accessibility checks, code review, and documentation |
| **7 Principles** | Guardrails that keep your work consistent and high-quality |

### Who is this for?

- **Product Designers** — Research, user flows, wireframes, design systems
- **UX Designers** — User research, information architecture, usability
- **UI Designers** — Visual design, Figma workflows, design tokens
- **Frontend Developers** — Figma-to-code, accessibility, responsive design, component architecture

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Skill** | A markdown file (`SKILL.md`) that teaches the AI how to perform a specific task |
| **Playbook** | A multi-step workflow with checkboxes, evidence requirements, and a mandatory changelog entry |
| **Helper** | A single-purpose tool you invoke directly (e.g., `/a11y`, `/critique`) |
| **Principle** | A guideline automatically applied by flash-mode when relevant |
| **Sticky Mode** | After invoking `/flash-mode`, follow-up messages stay in context until you say `exit` |

---

## Installation

### npm (Recommended)

Install fstack to any supported AI coding tool with one command:

```bash
npx fstack-skills init --platform cursor
npx fstack-skills init --platform claude-code
npx fstack-skills init --platform codex
npx fstack-skills init --platform antigravity
npx fstack-skills init --platform opencode
npx fstack-skills init --platform windsurf
npx fstack-skills init --platform copilot
```

### Installation Options

| Option | Command | Description |
|--------|---------|-------------|
| Local install | `npx fstack-skills init --platform cursor` | Install to current project only |
| Global install | `npx fstack-skills init --platform cursor --global` | Install for all projects |
| All platforms | `npx fstack-skills init --platform all` | Install to all detected platforms |
| Custom path | `npx fstack-skills init --path ./my-skills` | Install to custom directory |

### CLI Commands

```bash
fstack init          # Install skills to a platform
fstack uninstall     # Remove fstack from a platform  
fstack list          # Show all supported platforms
fstack status        # Check what's installed
fstack info          # Show package info
fstack help          # Show help
```

### Supported Platforms

| Platform | Local Path | Global Path |
|----------|------------|-------------|
| Cursor | `.cursor/skills/fstack` | `~/.cursor/skills/fstack` |
| Claude Code | `.claude/commands/fstack` | `~/.claude/commands/fstack` |
| Codex | `.codex/skills/fstack` | `~/.codex/skills/fstack` |
| Antigravity IDE | `.antigravity/skills/fstack` | `~/.antigravity/skills/fstack` |
| Open Code | `.opencode/skills/fstack` | `~/.opencode/skills/fstack` |
| Windsurf | `.windsurf/skills/fstack` | `~/.windsurf/skills/fstack` |
| GitHub Copilot | `.github/copilot/skills/fstack` | `~/.config/github-copilot/skills/fstack` |

### Manual Installation

```bash
git clone https://github.com/fstack-plugin/fstack.git
cp -r fstack/skills/ ~/.cursor/skills/fstack/  # or your platform's path
```

### Updating

```bash
npx fstack-skills@latest init --platform cursor --global
```

---

## Quick Start

### 1. Install fstack

```bash
npx fstack-skills init --platform cursor --global
```

### 2. Configure model roles (optional)

```
/setup-fstack
```

### 3. Start using flash-mode

```
/flash-mode implement this Figma design
```

### 4. Or use helpers directly

```
/a11y check this form
/critique review this component
/how-ui how does the modal work?
```

---

## How It Works

### The Flash-Mode Router

fstack has one main command: **`/flash-mode`**

Flash-mode is a **sticky router**. You describe what you want, and it:

1. Reads the principles index
2. Matches your request to a playbook
3. Copies the playbook steps into a task list
4. Calls specialist helpers when needed
5. Delegates to appropriate models (if configured)
6. Refuses to report success without evidence
7. Records the task in the project changelog

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
□ Step 9: Record in changelog via /changelog-notetaker

EVIDENCE REQUIRED: 0 pixel difference OR documented intentional deviations
```

### Sticky Mode

After `/flash-mode` is invoked:

| Action | What happens |
|--------|--------------|
| Send follow-up message | Stays in flash-mode context |
| Say `new task` | Match a fresh playbook |
| Say `exit` or `stop` | Leave flash-mode |

---

## Skills Reference

fstack includes **65 skills** organized into four categories:

| Category | Count | Description |
|----------|-------|-------------|
| [Flash Mode](#flash-mode-router) | 1 | The main router |
| [Playbooks](#playbooks) | 31 | Multi-step workflows |
| [Helpers](#helpers) | 26 | Quick-access tools |
| [Principles](#principles) | 7 | Automatic guardrails |

---

### Flash Mode (Router)

The central command that routes your requests to the appropriate playbook.

| Skill | Command | Description |
|-------|---------|-------------|
| Flash Mode | `/flash-mode` | Sticky router — understands your intent, selects the right playbook, creates a task list, and ensures evidence-based completion |

**Usage:**
```
/flash-mode <describe what you want to do>
```

**Examples:**
```
/flash-mode implement this Figma design
/flash-mode fix the accessibility issues on this form
/flash-mode open a PR for these changes
```

---

### Playbooks

Playbooks are multi-step workflows with checkboxes and evidence requirements. Every playbook ends with a mandatory changelog entry.

#### Understanding Playbooks

Read-only playbooks for investigating and prototyping.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Investigation | "how does X work", "why", "are we sure" | Read-only investigation with cited sources — never modifies code, just explains |
| Prototype | "mock it up", "try this layout", "sketch" | Throwaway UI sketch to settle a design decision — intentionally disposable |

#### Design Playbooks

Workflows for design research, user flows, and visual design.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Problem Framing | "research", "user needs", "problem" | Clarify the problem before solutioning — synthesize research into actionable insights |
| User Flows & IA | "user flows", "navigation", "structure" | Map how users move through the product — define information architecture |
| Wireframe to Hi-Fi | "wireframes", "mockups", "high-fidelity" | Take rough sketches to polished designs — progressive refinement workflow |
| Design Critique | "review this design", "feedback" | Multi-perspective design feedback — usability, accessibility, visual, brand |
| Design System | "tokens", "components", "design system" | Create and maintain design systems — variables, components, documentation |
| UX Copy | "microcopy", "labels", "error messages" | Write effective UI text — clear, concise, helpful, inclusive |

#### Frontend Playbooks

Workflows for implementing designs and building UI.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Figma to Code | "implement from Figma", "build this design" | Translate Figma designs to production code — respects tokens and components |
| Visual Parity | "match the design", "pixel-perfect" | Achieve exact visual match between design and implementation |
| Accessibility Audit | "accessibility", "a11y", "WCAG" | WCAG 2.2 AA compliance audit — keyboard, screen reader, color contrast |
| Responsive & Cross-Browser | "responsive", "mobile", "Safari" | Ensure consistency across devices and browsers |
| Component Refactor | "refactor", "extract", "restructure" | Safely refactor components — tests first, incremental changes |
| Bug Fix | "fix bug", "broken", "not working" | Systematic bug fixing — reproduce, isolate, fix, verify, prevent |
| Feature | "build feature", "implement" | Full feature implementation end-to-end — from spec to shipping |
| Perf Issue | "slow", "performance" | Performance diagnosis and fix — measure, identify bottleneck, optimize |
| Hillclimb | "improve metric", "target" | Sustained metric improvement — small incremental gains toward a goal |
| Runtime Forensics | "memory leak", "CPU", "frozen" | Diagnose live runtime issues — memory leaks, CPU spin, freezes |
| Trace Forensics | "analyze trace", "profile" | Analyze captured performance profiles — flame graphs, traces |

#### Shipping Playbooks

Workflows for code review, PRs, and deployment.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Open a PR | "open PR", "create PR" | Create high-quality pull requests — clear description, tests, screenshots |
| Babysit PR | "review comments", "CI failing" | Drive PRs to merge-ready — address feedback, fix CI (never auto-merges) |
| Shipping | "ship", "land", "verify and merge" | Independent verification before landing — confirms all checks pass |
| Handoff Note | "handoff", "notes for dev" | Designer-developer handoff documentation — specs, tokens, edge cases |

#### Session Playbooks

Workflows for managing work sessions.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Session Pickup | "continue", "pick up", "resume" | Resume a prior agent's work cleanly — reads context, continues from last state |
| Pause Safely | "pause", "stop", "stepping away" | Save progress at an atomic boundary — ensures work can be resumed |

#### Advanced Playbooks

Workflows for complex multi-step or autonomous work.

| Skill | Trigger Patterns | Description |
|-------|------------------|-------------|
| Autonomous Run | "finish without me", "autonomous" | Complete task unattended — runs to completion, reports results |
| Multi-Phase Plan | "multiple PRs", "stacked" | Work spanning multiple PRs — breaks large changes into reviewable chunks |
| Orchestrate | "coordinate", "manage workstreams" | Project-scale coordination — multiple parallel workstreams |
| Autopilot Full | "land these PRs" | Queue of independent PRs to merge — processes in order |
| Autopilot Stack | "land as stack" | Queue as linear reviewed stack — maintains dependencies |
| Authoring a Skill | "write a skill" | Create or edit SKILL.md files — follows skill authoring conventions |

---

### Helpers

Helpers are single-purpose tools you invoke directly. They don't use the router — just call them.

#### Understanding Helpers

Tools for learning how things work.

| Skill | Command | Description |
|-------|---------|-------------|
| How UI | `/how-ui` | Trace how screens and components work — follows data flow, event handlers, rendering |
| Why This Design | `/why-this-design` | Find evidence for design decisions — searches git history, docs, comments |
| Teach | `/teach` | Combines how + why into a plain explanation — great for onboarding |
| Recall | `/recall` | Catch up from recent transcripts and git state — summarizes recent context |

#### Review & Quality Helpers

Tools for feedback and quality checks.

| Skill | Command | Description |
|-------|---------|-------------|
| Critique | `/critique` | Multi-reviewer feedback with categories: act on / consider / noted / dismissed |
| A11y | `/a11y` | Quick accessibility check — keyboard, focus, contrast, ARIA |
| Unslop | `/unslop` | Remove AI-generated fluff from text — makes copy crisp and direct |
| Blast Radius | `/blast-radius` | What could this change break — identifies dependencies and risks |
| No Comments | `/no-comments` | Clean up unnecessary code comments — removes obvious/redundant ones |

#### Architecture & Comparison Helpers

Tools for design decisions and parallel work.

| Skill | Command | Description |
|-------|---------|-------------|
| Architect | `/architect` | Design component API before building — props, state, composition |
| Arena | `/arena` | Run competing attempts, pick best, graft winning ideas together |
| Swarm | `/swarm` | Parallel workers across slices — divide work, combine results |
| TDD | `/tdd` | Test-driven development for UI — red, green, refactor cycle |

#### Meta & Learning Helpers

Tools for improving your workflow.

| Skill | Command | Description |
|-------|---------|-------------|
| Reflect | `/reflect` | Turn learnings into skill edits — mines patterns from your work |
| Automate Me | `/automate-me` | Create a personal mode from your patterns — captures your preferences |
| Correct | `/correct` | Stop repeated mistakes — adds guardrails to prevent specific errors |
| Figure It Out | `/figure-it-out` | Create a custom playbook when none fits — for novel situations |

#### Writing & Code Helpers

Tools for documentation and code quality.

| Skill | Command | Description |
|-------|---------|-------------|
| Technical Writing | `/technical-writing` | Write docs, READMEs, PRs, commit messages — clear technical prose |
| TypeScript Best Practices | `/typescript-best-practices` | TypeScript and React patterns — types, hooks, composition |
| Bro | `/bro` | Restate the last message simpler — ELI5 mode |
| Changelog Notetaker | `/changelog-notetaker` | Record task in project changelog — mandatory at end of every playbook |

#### Setup & Reference Helpers

Tools for configuration and help.

| Skill | Command | Description |
|-------|---------|-------------|
| Setup fstack | `/setup-fstack` | Configure model roles — which models handle which work types |
| Create Verification Skill | `/create-verification-skill` | Generate a project-local verification skill — custom checks for your repo |
| Maintain Verification Skill | `/maintain-verification-skill` | Keep verification skill current — updates as your project evolves |
| Show Me Your Work | `/show-me-your-work` | Decision log for auditable trail — records choices and rationale |
| Flash Help | `/flash-help` | Maps questions to the right skill — "what should I use for X?" |

---

### Principles

Principles are automatically applied by flash-mode when relevant. They act as guardrails to keep your work consistent and high-quality.

| Principle | Description |
|-----------|-------------|
| Start from the User's Task | Understand what users need before jumping to implementation — user goals drive decisions |
| Prove It on the Real Screen | Verify on the live UI, not in imagination — screenshots and recordings as evidence |
| Tokens over Hard-Coded Values | Use design tokens, not magic numbers — `--color-primary` not `#3b82f6` |
| Accessible by Default | Keyboard-navigable, screen-reader friendly — accessibility is not an afterthought |
| Smallest Change That Works | Delete before adding, modify before creating — minimize blast radius |
| States Are Part of the Design | Empty, loading, error, success — all states are designed, not just happy path |
| Consistency with Design System | Match existing patterns — don't invent new conventions |

---

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

---

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

### Direct Helper Usage

```
/how-ui how does the notification system work?
/why-this-design why is the button 48px tall?
/teach explain the state management approach
/critique review this design for usability issues
/a11y check this form for accessibility
/unslop clean up this PR description
/flash-help what skill should I use for X?
```

---

## File Structure

```
fstack/
├── package.json                        # npm package manifest
├── skill.json                          # Cursor plugin manifest
├── README.md                           # This file
├── validate.sh                         # Validation script
├── bin/
│   └── fstack.js                       # CLI entry point
├── scripts/
│   └── log.sh                          # Decision log helper
├── references/
│   └── decision-log-template.tsv       # TSV template
├── rules/
│   └── fstack-models.mdc               # Example model config
└── skills/
    ├── flash-mode/
    │   ├── SKILL.md                    # Main router (1 skill)
    │   └── principles-index.md         # Principles reference
    ├── principles/                     # 7 principle skills
    │   ├── start-from-user-task/
    │   ├── prove-on-real-screen/
    │   ├── tokens-over-hardcoded/
    │   ├── accessible-by-default/
    │   ├── smallest-change/
    │   ├── states-are-design/
    │   └── design-system-consistency/
    ├── playbooks/                      # 31 playbook skills
    │   ├── investigation/
    │   ├── prototype/
    │   ├── design/
    │   │   ├── problem-framing/
    │   │   ├── user-flows-ia/
    │   │   ├── wireframe-to-hifi/
    │   │   ├── design-critique/
    │   │   ├── design-system/
    │   │   └── ux-copy/
    │   ├── frontend/
    │   │   ├── figma-to-code/
    │   │   ├── visual-parity/
    │   │   ├── accessibility-audit/
    │   │   ├── responsive-cross-browser/
    │   │   ├── component-refactor/
    │   │   └── bug-fix/
    │   ├── shipping/
    │   │   ├── open-pr/
    │   │   ├── babysit-pr/
    │   │   ├── SKILL.md (shipping)
    │   │   └── handoff-note/
    │   ├── session-pickup/
    │   ├── pause-safely/
    │   ├── feature/
    │   ├── perf-issue/
    │   ├── hillclimb/
    │   ├── runtime-forensics/
    │   ├── trace-forensics/
    │   ├── autonomous-run/
    │   ├── multi-phase-plan/
    │   ├── orchestrate/
    │   ├── autopilot-full/
    │   ├── autopilot-stack/
    │   └── authoring-a-skill/
    └── helpers/                        # 26 helper skills
        ├── how-ui/
        ├── why-this-design/
        ├── teach/
        ├── recall/
        ├── critique/
        ├── a11y/
        ├── unslop/
        ├── blast-radius/
        ├── no-comments/
        ├── architect/
        ├── arena/
        ├── swarm/
        ├── tdd/
        ├── reflect/
        ├── automate-me/
        ├── correct/
        ├── figure-it-out/
        ├── technical-writing/
        ├── typescript-best-practices/
        ├── bro/
        ├── changelog-notetaker/
        ├── setup-fstack/
        ├── create-verification-skill/
        ├── maintain-verification-skill/
        ├── show-me-your-work/
        └── flash-help/
```

---

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
- All playbooks have mandatory changelog step

---

## pstack to fstack Mapping

fstack is modeled on pstack, adapted for design and frontend work.

### Equivalent Skills

| pstack Skill | fstack Equivalent | Notes |
|--------------|-------------------|-------|
| `/poteto-mode` | `/flash-mode` | Sticky router |
| `/how` | `/how-ui` | Trace behavior |
| `/why` | `/why-this-design` | Historical rationale |
| `/interrogate` | `/critique` | Multi-reviewer feedback |
| `/automate-me` | `/automate-me` | Personal mode from patterns |
| `/reflect` | `/reflect` | Mine learnings, edit skills |
| `/correct` | `/correct` | Stop repeated mistakes |
| `/figure-it-out` | `/figure-it-out` | Custom playbook |
| `/recall` | `/recall` | Catch up from context |
| `/blast-radius` | `/blast-radius` | What could break |
| `/architect` | `/architect` | Design before implementing |
| `/arena` | `/arena` | Competing attempts |
| `/swarm` | `/swarm` | Parallel workers |
| `/tdd` | `/tdd` | Test-driven development |
| `/technical-writing` | `/technical-writing` | Docs, PRs, READMEs |
| `/no-comments` | `/no-comments` | Clean up comments |
| `/bro` | `/bro` | Say it simpler |
| `investigation` | `investigation` | Read-only questions |
| `session-pickup` | `session-pickup` | Resume prior work |
| `pause-safely` | `pause-safely` | Save progress cleanly |
| `shipping` | `shipping` | Verify and land PRs |
| `feature` | `feature` | Full feature playbook |
| `perf-issue` | `perf-issue` | Performance diagnosis |
| `hillclimb` | `hillclimb` | Metric improvement |
| `autonomous-run` | `autonomous-run` | Unattended completion |
| `multi-phase-plan` | `multi-phase-plan` | Stacked PRs |
| `orchestrate` | `orchestrate` | Coordinate workstreams |
| `autopilot-full` | `autopilot-full` | Land PR queue |
| `autopilot-stack` | `autopilot-stack` | Land as stack |
| `authoring-a-skill` | `authoring-a-skill` | Write SKILL.md |

### fstack-Specific Skills

These skills are fstack originals for design/frontend work:

| Skill | Description |
|-------|-------------|
| `/a11y` | Quick accessibility check |
| `/typescript-best-practices` | TypeScript and React patterns |
| `/changelog-notetaker` | Record task in project changelog |
| `problem-framing` | Research synthesis and problem definition |
| `user-flows-ia` | Navigation and information architecture |
| `wireframe-to-hifi` | Sketches to polished designs |
| `design-critique` | Multi-perspective design feedback |
| `design-system` | Design tokens and components |
| `ux-copy` | UI text and microcopy |
| `figma-to-code` | Implement designs from Figma |
| `visual-parity` | Match design exactly |
| `accessibility-audit` | Full WCAG 2.2 AA audit |
| `responsive-cross-browser` | Mobile and browser compatibility |
| `component-refactor` | Safely refactor components |
| `handoff-note` | Designer-developer handoff |
| `runtime-forensics` | Memory leaks and CPU issues |
| `trace-forensics` | Analyze performance profiles |

### Key Differences

| Aspect | pstack | fstack |
|--------|--------|--------|
| Focus | Full engineering workflow | Design + frontend focus |
| Skills | 30+ skills | 65 skills |
| Router | `/poteto-mode` | `/flash-mode` |
| Review | `/interrogate` | `/critique` |
| Investigation | `/how`, `/why` | `/how-ui`, `/why-this-design` |
| Principles | Engineering-focused | Design + frontend focused |

### Shared Patterns

Both pstack and fstack share:
- Sticky router pattern
- Playbook-based task lists
- Evidence-based completion
- Model role delegation
- Verification skills
- Decision logging
- Session pickup/pause
- Helper skill architecture
- Mandatory changelog step on every playbook

---

## License

MIT

---

## Credits

- Inspired by [pstack](https://flaviocopes.com/pstack/) by Lauren Tan ([@poteto](https://x.com/poteto))
- Article: [A deep dive into pstack](https://flaviocopes.com/pstack/) by Flavio Copes

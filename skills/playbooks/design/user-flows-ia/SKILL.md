---
name: user-flows-ia
description: "Design playbook for user flows and information architecture. Maps how users navigate through the product and how content is organized."
---

# User Flows & Information Architecture

This playbook helps you design how users move through your product and how information is organized. Good IA makes products intuitive; good flows make tasks completable.

## When to Use

- Designing navigation for a new product or section
- Reorganizing existing content structure
- Mapping a multi-step user journey
- Onboarding or complex task flows

## Playbook Steps

```
PLAYBOOK: User Flows & Information Architecture
──────────────────────────────────────

□ Step 1: Identify key user tasks
  └─ What are users trying to accomplish?
  └─ Reference: problem framing output if available
  └─ List top 3-5 critical user goals

□ Step 2: Inventory existing content/features
  └─ Calls: /how-ui (for current structure)
  └─ Map what already exists
  └─ Identify orphaned or buried content

□ Step 3: Define the IA structure
  └─ Primary navigation (top-level categories)
  └─ Secondary navigation (sub-sections)
  └─ Utility navigation (search, settings, help)

□ Step 4: Create user flow diagrams
  └─ Map entry points → steps → completion
  └─ Include decision points and branches
  └─ Note error states and recovery paths

□ Step 5: Validate navigation labels
  └─ Are labels clear and consistent?
  └─ Do they match user mental models?
  └─ Tree testing or card sorting if time allows

□ Step 6: Define URL structure (web)
  └─ URLs should reflect IA hierarchy
  └─ Human-readable and logical paths
  └─ Plan for deep linking

□ Step 7: Document state transitions
  └─ Principle: States are part of the design
  └─ What happens at each step?
  └─ Loading, error, empty states per screen

□ Step 8: Create sitemap or app map
  └─ Visual representation of all screens/pages
  └─ Show relationships and hierarchy
  └─ Include all navigation paths

□ Step 9: Review against accessibility
  └─ Principle: Accessible by default
  └─ Can users navigate via keyboard?
  └─ Is focus order logical?

□ Step 10: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: User flow diagram and sitemap showing all navigation paths
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "User flows & IA: [subject]" |
| playbook_name | "user-flows-ia" |
| summary | Key flows and IA structure defined |
| files | Flow diagrams, sitemap files |
| evidence | Flow documentation, navigation structure |

## User Flow Notation

```
[Entry Point]
    │
    ▼
[Screen/Step 1]
    │
    ├─ [Action A] ──▶ [Screen 2a]
    │                    │
    │                    ▼
    │               [Success State]
    │
    └─ [Action B] ──▶ [Screen 2b]
                         │
                    ┌────┴────┐
                    ▼         ▼
              [Error]    [Success]
```

### Flow Elements

| Symbol | Meaning |
|--------|---------|
| `[Box]` | Screen or step |
| `──▶` | Navigation/transition |
| `├─` / `└─` | Decision branch |
| `(Circle)` | Entry/exit point |

## Information Architecture Patterns

### Hierarchical
```
Home
├── Products
│   ├── Category A
│   └── Category B
├── About
└── Contact
```
Best for: Content-heavy sites, documentation

### Flat
```
Home ─── Page 1 ─── Page 2 ─── Page 3
```
Best for: Simple apps, marketing sites

### Hub and Spoke
```
        ┌── Feature A
        │
Home ───┼── Feature B
        │
        └── Feature C
```
Best for: Dashboard apps, utilities

### Matrix
```
By Category ──┬── Item 1 ──┬── By Date
              │            │
              ├── Item 2 ──┤
              │            │
              └── Item 3 ──┘
```
Best for: E-commerce, content with multiple taxonomies

## Navigation Checklist

- [ ] User can always get home
- [ ] Current location is indicated
- [ ] Back navigation works predictably
- [ ] Search is available for large sites
- [ ] Mobile navigation is considered
- [ ] Breadcrumbs for deep hierarchies
- [ ] No dead ends (always a next action)

## Common IA Mistakes

| Mistake | Fix |
|---------|-----|
| Org-chart navigation | Use user mental models, not internal structure |
| Too many top-level items | Aim for 5-7 primary nav items |
| Jargon in labels | Use user language, not internal terms |
| Inconsistent depth | Keep hierarchy balanced |
| Hidden critical features | Important = prominent |

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Clear user task flows
- Sitemap/app map
- Navigation structure
- URL architecture (web)

This feeds into: **Wireframe to Hi-Fi** or **Handoff Note** for development planning.

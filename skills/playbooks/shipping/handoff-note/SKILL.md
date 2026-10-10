---
name: handoff-note
description: "Shipping playbook for designer-developer handoff. Creates clear documentation bridging design decisions to implementation requirements."
---

# Handoff Note

This playbook creates clear documentation for designer-developer handoff. It bridges design decisions to implementation requirements, ensuring developers have everything they need to build accurately.

## When to Use

- Handing designs to developers
- Documenting design decisions for implementation
- Creating specs for complex interactions
- Preparing for development sprint

## Playbook Steps

```
PLAYBOOK: Designer-Developer Handoff Note
──────────────────────────────────────

□ Step 1: Link to design files
  └─ Figma file URL(s)
  └─ Specific frames to implement
  └─ Mark which frames are approved

□ Step 2: Document design intent
  └─ What problem does this solve?
  └─ Who is the user?
  └─ What's the expected outcome?

□ Step 3: List all screens/states
  └─ Principle: States are part of the design
  └─ Empty state
  └─ Loading state
  └─ Error state
  └─ Success state
  └─ Edge case states

□ Step 4: Component inventory
  └─ List all components used
  └─ Note which exist vs need building
  └─ Principle: Consistency with design system
  └─ Link to design system components

□ Step 5: Interaction specifications
  └─ What happens on click/tap?
  └─ Hover states and transitions
  └─ Animations and motion
  └─ Keyboard interactions
  └─ Focus behavior

□ Step 6: Responsive behavior
  └─ Breakpoints and how layout changes
  └─ Mobile-specific interactions
  └─ Touch considerations
  └─ What reflows vs hides

□ Step 7: Content requirements
  └─ Final copy (or placeholder rules)
  └─ Character limits if applicable
  └─ Localization considerations
  └─ Calls: /unslop (verify copy quality)

□ Step 8: Accessibility requirements
  └─ Principle: Accessible by default
  └─ Keyboard navigation flow
  └─ ARIA requirements
  └─ Focus management
  └─ Screen reader considerations

□ Step 9: Data requirements
  └─ What data does this need?
  └─ API endpoints if known
  └─ Data shape expectations
  └─ Loading/error handling

□ Step 10: Edge cases and constraints
  └─ What happens with long text?
  └─ What happens with no data?
  └─ What happens with too much data?
  └─ Browser/device constraints

□ Step 11: Open questions
  └─ List any unresolved decisions
  └─ Who needs to answer
  └─ Blocking vs non-blocking

□ Step 12: Acceptance criteria
  └─ Principle: Prove it on the real screen
  └─ How will we know it's done?
  └─ What does QA need to check?

□ Step 13: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Complete handoff document with Figma links, all states documented, and acceptance criteria defined
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Handoff: [feature name]" |
| playbook_name | "handoff-note" |
| summary | Handoff doc created for [feature] |
| files | Handoff document path |
| evidence | Figma links, component inventory |

## Handoff Document Template

```markdown
# [Feature Name] Design Handoff

## Overview

**Problem:** [What problem this solves]
**User:** [Who this is for]
**Outcome:** [What success looks like]

## Design Files

- **Figma:** [URL to specific frames]
- **Prototype:** [URL if applicable]
- **Design System:** [Link to relevant components]

## Screens & States

### [Screen Name]

| State | Figma Frame | Notes |
|-------|-------------|-------|
| Default | [link] | Main view with data |
| Empty | [link] | No items yet, show CTA |
| Loading | [link] | Skeleton while fetching |
| Error | [link] | Failed to load message |

### [Next Screen]
...

## Components

### New Components Needed
| Component | Description | Design |
|-----------|-------------|--------|
| [Name] | [What it does] | [Figma link] |

### Existing Components Used
- Button (primary variant)
- Card
- Input (with error state)

## Interactions

### [Interaction Name]
- **Trigger:** [What initiates it]
- **Animation:** [Duration, easing]
- **End State:** [Where it lands]

### Keyboard Navigation
1. Tab order: [describe order]
2. Enter/Space actions: [what they do]
3. Escape: [behavior]

## Responsive Behavior

| Breakpoint | Layout Change |
|------------|---------------|
| Mobile (<640px) | Stack to single column |
| Tablet (640-1024px) | Two-column grid |
| Desktop (>1024px) | Three-column grid |

### Mobile-Specific
- [Touch target considerations]
- [Swipe gestures if any]
- [Bottom sheet vs modal]

## Content

### Copy (Final)
- Heading: "Your Projects"
- Empty state: "No projects yet. Create your first project to get started."
- Error: "We couldn't load your projects. Please try again."

### Character Limits
- Title: 50 characters max
- Description: 200 characters max

## Accessibility

### Keyboard
- All interactive elements reachable via Tab
- Modal traps focus, Escape to close
- Arrow keys navigate within [component]

### Screen Reader
- Headings provide page structure
- Images have descriptive alt text
- Form errors announced via aria-live

### Focus Management
- After [action], focus moves to [element]
- Modal opening: focus moves to first focusable element
- Modal closing: focus returns to trigger

## Data

### Required Data
```typescript
interface Project {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### API Endpoints
- GET /api/projects - List projects
- POST /api/projects - Create project
- DELETE /api/projects/:id - Delete project

### Error States
- 404: Show "Project not found"
- 500: Show generic error with retry

## Edge Cases

| Case | Behavior |
|------|----------|
| Title > 50 chars | Truncate with ellipsis |
| 100+ projects | Paginate, 20 per page |
| Offline | Show cached data with banner |

## Open Questions

- [ ] **Q:** [Question] — **Owner:** [Who decides]
- [ ] **Q:** [Question] — **Owner:** [Who decides]

## Acceptance Criteria

- [ ] All screens match Figma designs
- [ ] All states implemented (empty, loading, error, success)
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Responsive at all breakpoints
- [ ] Performance acceptable (< 3s load)
```

## Interaction Specification Format

For complex interactions:

```markdown
### Add to Cart Interaction

**Trigger:** Click "Add to Cart" button

**Animation:**
1. Button shows loading spinner (fade in, 150ms)
2. On success: 
   - Button shows checkmark (scale in, 200ms)
   - Cart icon in header shows +1 badge (bounce, 300ms)
3. On error:
   - Button returns to default
   - Toast appears with error message

**Timing:**
- Loading: until API responds (timeout 5s)
- Success state: 2s, then return to default
- Error toast: 5s, dismissible

**Keyboard:**
- Enter/Space triggers add
- Focus stays on button

**Screen Reader:**
- On loading: "Adding to cart"
- On success: "Added to cart"
- On error: "Failed to add to cart: [reason]"
```

## Component Handoff Format

For new components:

```markdown
### Component: ProjectCard

**Purpose:** Display project summary in list/grid

**Props:**
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| project | Project | Yes | - | Project data |
| onEdit | () => void | No | - | Edit callback |
| onDelete | () => void | No | - | Delete callback |

**States:**
- Default: Shows project info
- Hover: Elevated shadow, action icons appear
- Focus: Focus ring, actions keyboard accessible
- Loading: Skeleton during data fetch

**Variants:** None currently

**Accessibility:**
- Card is not focusable (actions inside are)
- Title is h3 for structure
- Actions have aria-labels
```

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Complete handoff documentation
- Figma links for all screens/states
- Interaction specifications
- Accessibility requirements
- Clear acceptance criteria

Developer can implement without design ambiguity.

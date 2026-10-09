---
name: design-system
description: "Design playbook for creating and maintaining design systems. Covers tokens, components, documentation, and governance."
---

# Design System

This playbook helps you create, extend, or maintain a design system. It covers design tokens, component libraries, documentation, and governance practices.

## When to Use

- Starting a new design system
- Adding components to an existing system
- Defining or updating design tokens
- Auditing and improving system consistency

## Playbook Steps

```
PLAYBOOK: Design System
──────────────────────────────────────

□ Step 1: Audit current state
  └─ Calls: /how-ui (to understand existing patterns)
  └─ Inventory existing components and styles
  └─ Identify inconsistencies and gaps
  └─ Document technical constraints

□ Step 2: Define token foundations
  └─ Principle: Tokens over hard-coded values
  └─ Color: primitives and semantic tokens
  └─ Typography: scale and styles
  └─ Spacing: consistent scale (4px/8px base)
  └─ Elevation: shadow levels
  └─ Border radius: consistent scale
  └─ Motion: duration and easing

□ Step 3: Establish component hierarchy
  └─ Primitives (Button, Input, Text)
  └─ Compounds (Form Field, Card, Modal)
  └─ Patterns (Login Form, Settings Panel)
  └─ Templates (Dashboard Layout, List Page)

□ Step 4: Define component API
  └─ Props/variants per component
  └─ State handling (loading, disabled, error)
  └─ Composition patterns
  └─ Accessibility requirements

□ Step 5: Document each component
  └─ Purpose and when to use
  └─ Visual examples of all variants
  └─ Props/API reference
  └─ Accessibility notes
  └─ Do's and don'ts

□ Step 6: Build or update Figma library
  └─ Components with variants
  └─ Auto-layout for flexibility
  └─ Consistent naming (matches code)
  └─ Documentation in Figma

□ Step 7: Sync with code implementation
  └─ Ensure Figma ↔ code parity
  └─ Document any intentional differences
  └─ Set up Figma MCP for sync

□ Step 8: Establish governance
  └─ How are new components proposed?
  └─ Who approves additions?
  └─ How are deprecations handled?
  └─ Version strategy

□ Step 9: Create contribution guidelines
  └─ How to add a new component
  └─ How to modify existing components
  └─ Testing requirements
  └─ Documentation requirements

□ Step 10: Set up quality checks
  └─ Principle: Accessible by default
  └─ Automated a11y testing
  └─ Visual regression tests
  └─ Linting for token usage

EVIDENCE REQUIRED: Token definitions, component documentation, and Figma library
```

## Token Structure

### Color Tokens

```
// Primitive tokens (don't use directly)
--color-blue-500: #3B82F6;
--color-blue-600: #2563EB;
--color-gray-100: #F3F4F6;
--color-gray-900: #111827;

// Semantic tokens (use these)
--color-primary: var(--color-blue-500);
--color-primary-hover: var(--color-blue-600);
--color-text-primary: var(--color-gray-900);
--color-background: var(--color-gray-100);
--color-error: var(--color-red-500);
--color-success: var(--color-green-500);
```

### Typography Tokens

```
// Scale
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;

// Weights
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

// Composed styles
--text-body: var(--font-size-base) / 1.5 var(--font-family-sans);
--text-heading-1: var(--font-weight-bold) var(--font-size-3xl) / 1.2;
```

### Spacing Tokens

```
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

## Component Documentation Template

```markdown
# Button

Primary action trigger for user interactions.

## When to Use
- Triggering actions (submit, save, delete)
- Navigation that feels like an action
- Primary CTAs

## When Not to Use
- Text links for navigation
- Toggle states (use Switch)
- Multiple equal choices (use Button Group)

## Variants
| Variant | Use Case |
|---------|----------|
| Primary | Main action on the page |
| Secondary | Supporting actions |
| Ghost | Tertiary, low-emphasis |
| Danger | Destructive actions |

## States
- Default, Hover, Focus, Active, Disabled, Loading

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| isLoading | boolean | false | Shows loading spinner |
| isDisabled | boolean | false | Prevents interaction |

## Accessibility
- Uses `<button>` element
- Disabled state uses `aria-disabled` not `disabled` for screen reader announcement
- Loading state announces "Loading" to screen readers
```

## Governance Model

### Adding New Components

1. **Propose**: Document the use case and why existing components don't suffice
2. **Review**: Design system team reviews proposal
3. **Design**: Create Figma component with all states
4. **Build**: Implement in code with tests
5. **Document**: Full documentation with examples
6. **Release**: Add to library, announce to team

### Modifying Components

1. **Identify**: Document what needs to change and why
2. **Impact**: Assess who uses this component
3. **Deprecation**: If breaking, follow deprecation process
4. **Update**: Make changes with backward compatibility if possible
5. **Communicate**: Notify consumers of changes

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Documented token system
- Component library (Figma + code)
- Documentation for all components
- Governance process defined

This feeds into: **Figma to Code**, **Wireframe to Hi-Fi**, or ongoing maintenance.

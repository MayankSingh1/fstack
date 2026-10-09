# fstack Principles Index

Quick reference for all fstack principles. Flash-mode reads this at task start.

## 1. Start from the User's Task

The user's stated goal is the starting point. Understand what they actually need before jumping to implementation. A clear task beats a plausible assumption.

**Triggers**: Beginning any task, ambiguous requests, scope clarification needed.

**Anti-pattern**: Implementing the obvious change without confirming it solves the user's problem.

## 2. Prove It on the Real Screen

Verification happens on the live artifact. Screenshots, dev server previews, and real user flows count. "It should work" does not count.

**Triggers**: Completing any visual change, testing interactions, final verification.

**Anti-pattern**: Claiming success based on code review alone when UI is involved.

## 3. Tokens over Hard-Coded Values

Design tokens (CSS custom properties, theme values) instead of magic numbers. `var(--spacing-md)` beats `16px`. `theme.colors.primary` beats `#3B82F6`.

**Triggers**: Adding spacing, colors, typography, shadows, borders.

**Anti-pattern**: Hard-coding pixel values or hex colors that already have token equivalents.

## 4. Accessible by Default

Every interactive element is keyboard-navigable. Every image has alt text. Every form has labels. Contrast ratios meet WCAG AA. This is not optional.

**Triggers**: Creating any interactive component, adding images, building forms.

**Anti-pattern**: "We'll add accessibility later" or shipping without keyboard testing.

## 5. Smallest Change That Works

Delete before adding. Modify before creating. The best change is the one that removes complexity. If the existing code can be tweaked, don't rewrite it.

**Triggers**: Bug fixes, refactors, feature additions.

**Anti-pattern**: Rewriting a file when a one-line fix would work.

## 6. States Are Part of the Design

Empty states, loading states, error states, success states — each is a designed moment. "Design the happy path only" is an incomplete design.

**Triggers**: Building any data-driven UI, forms, async operations.

**Anti-pattern**: Only implementing the "data exists" state and ignoring empty/loading/error.

## 7. Consistency with the Design System

New components match existing patterns. Check what already exists before creating something new. If the codebase has a Button component, use it.

**Triggers**: Adding new UI, choosing component patterns, naming conventions.

**Anti-pattern**: Creating a new button variant when the design system already has one.

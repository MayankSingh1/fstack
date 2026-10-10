---
name: architect
description: "Sketch types, signatures, and component structure before code. Design from the caller's perspective first. Use for /architect, 'architect this', 'design this', or non-trivial work where jumping to code would lock in the wrong shape."
disable-model-invocation: true
---

# Architect

Design before implementing. Sketch component APIs, prop types, state shape, and module boundaries with placeholder implementations. Start from how the component will be used, not how it will be built.

## Start

Open a todo list with phases:

1. Ground
2. Sketch
3. Agree (opt-in)
4. Implement
5. Scrap (if needed)
6. Record in changelog

## Phase A: Ground the problem

Build a real mental model of every system the new UI touches. Run `/how-ui` over relevant components and screens.

If the design changes ownership or composition patterns, also run `/why-this-design` on the existing shape.

**Ground in these dimensions:**
- Existing design system components
- State management patterns in use
- Styling approach (tokens, CSS modules, etc.)
- Accessibility patterns established
- Testing patterns expected

Skip Phase A only for genuinely greenfield work with no surrounding system.

## Phase B: Sketch

### Start from usage, not implementation

Write the component API first — how it will be called:

```tsx
// Usage sketch — write this first
<DataCard
  title="Revenue"
  value={revenue}
  trend="up"
  loading={isLoading}
/>

// Then derive the types
interface DataCardProps {
  title: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}
```

### Design it twice

Require at least two structurally distinct approaches before picking:

**Approach A: Compound components**
```tsx
<DataCard>
  <DataCard.Title>Revenue</DataCard.Title>
  <DataCard.Value trend="up">{revenue}</DataCard.Value>
</DataCard>
```

**Approach B: Props-based**
```tsx
<DataCard
  title="Revenue"
  value={revenue}
  trend="up"
/>
```

Compare on:
- API simplicity for consumers
- Flexibility for variants
- Consistency with existing patterns
- Accessibility requirements
- Testing complexity

### Run arena for non-trivial designs

For significant component APIs, run `/arena` with the design sketch task:
- Multiple models propose APIs
- Pick the base
- Graft best ideas from losers

### Check against red flags

Screen candidates against design red flags:

| Red Flag | Why It's Bad |
|----------|--------------|
| Props explosion (10+ props) | Hard to use, likely needs composition |
| Boolean props for modes | Use discriminated unions instead |
| Render prop when slot would do | Over-engineering |
| Deep prop drilling | Needs context or composition |
| String unions for extensible sets | Use const objects or enums |
| Optional props that are always used together | Make them required or group |

### Prefer simpler interface

Compare candidates on interface depth. Prefer the design that hides more complexity behind a smaller public surface.

## Phase C: Agree (opt-in)

Default: proceed directly to implementation with chosen design.

Opt in to checkpoint when asked: "/architect with checkpoint", "stop and show me before implementing", etc.

The sketch can ship as its own commit (scaffold-first approach).

If the human pushes back, treat that as Phase A evidence. Re-ground and re-run Phase B.

## Phase D: Implement against the sketch

Replace placeholder implementations with real code. The sketch is the contract.

```tsx
// Sketch
const DataCard = ({ title, value, trend, loading }: DataCardProps) => {
  // TODO: implement
  throw new Error('not implemented');
};

// Implementation
const DataCard = ({ title, value, trend, loading }: DataCardProps) => {
  if (loading) {
    return <DataCardSkeleton />;
  }
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>
        {value}
        {trend && <TrendIndicator direction={trend} />}
      </div>
    </article>
  );
};
```

Deviations from sketch are signal:
- Need a parameter the sketch didn't anticipate? Ask if sketch was wrong.
- Edge case the API can't handle? Surface it, don't hide it.

## Phase E: Scrap when wrong

If implementation keeps producing friction, throw the sketch out.

**Tells that the architecture is wrong:**
- Same workaround appearing repeatedly
- Multiple edge cases needing special branches
- Types needing escape hatches to compile
- Callers needing to know internal rules
- Props that are always passed together

When you scrap:
1. Re-run `/how-ui` on what's been built
2. Redesign as if new constraints were day-one assumptions
3. Subtract before adding — new sketch should be smaller
4. Return to Phase B

## Outputs

- **Usage sketch:** How the component/API is called
- **Type definitions:** Props, state, return types
- **Composition diagram:** How pieces fit together
- **Rationale:** Why this shape over alternatives
- **Red flags cleared:** Which concerns were addressed

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Architecture for [component/feature]"
- playbook_name: "architect"
- summary: Chosen approach and key decisions
- files: Type definitions, sketch files
- evidence: Rationale document, comparison of alternatives

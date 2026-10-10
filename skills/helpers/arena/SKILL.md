---
name: arena
description: "Spawn N parallel attempts at the same task, pick the best as base, graft ideas from losers. Use for /arena, 'arena this', 'throw it in the arena', or when one attempt would lock in the wrong shape."
disable-model-invocation: true
---

# Arena

Fan out N parallel attempts at the same task. Read every candidate end to end. Pick the strongest as base. Graft the best ideas from others. Verify the synthesized result.

## Start

Open a todo list with phases:

1. Frame
2. Fan out
3. Cross-judge
4. Pick
5. Graft
6. Verify
7. Record in changelog

## Phase A: Frame

### 1. State the artifact

What each candidate is producing:
- A component implementation
- A design approach
- An API shape
- A styling solution

### 2. Derive the rubric

State what success looks like, then turn it into 3-6 gradeable criteria:

**Design arena rubric example:**
| Criterion | Weight |
|-----------|--------|
| Matches design system | 30% |
| Handles all states | 25% |
| Accessible | 20% |
| Maintainable | 15% |
| Performance | 10% |

**Component arena rubric example:**
| Criterion | Weight |
|-----------|--------|
| API simplicity | 30% |
| Type safety | 25% |
| Flexibility | 20% |
| Test coverage | 15% |
| Bundle size | 10% |

The rubric is for the judge. Candidates only see the task.

### 3. Pick runners

Use `arena runners` line from `~/.cursor/rules/fstack-models.mdc` if available. Otherwise:
- Minimum 2 runners
- Different models catch different things
- Same model N times for generation-bound work

### 4. Assign output paths

Each candidate writes to its own location:
```
/tmp/arena-<id>/candidate-1/
/tmp/arena-<id>/candidate-2/
```

## Phase B: Fan out

Spawn all N candidates in parallel with `run_in_background: true`.

Each candidate receives:
- The task description
- Path to shared grounding (design specs, existing code)
- Its output path
- Instruction to produce artifact AND short rationale

Each rationale names alternatives considered and rejected.

If a candidate fails, proceed with N-1.

## Phase C: Cross-judge

After candidates complete, spawn one readonly judge:
- Different model family from runners preferred
- Sees rubric and all candidates by path label
- Scores each criterion
- Recommends base with rationale

Judge runs parallel with your reading in Phase D.

## Phase D: Pick a base

Read every candidate end to end before picking.

Score each against rubric criterion by criterion. Compare your scores with the cross-judge.

**Agreement:** Confirms the pick.
**Disagreement:** Read both rationales before deciding.

Pick based on:
- Which can a future developer extend most easily
- Which has cleaner boundaries
- Which has smaller API surface (when tied)

Record the pick and reason.

## Phase E: Graft

Walk each losing candidate for ideas worth porting:

| Candidate | Worth Porting | Reject |
|-----------|---------------|--------|
| Candidate 2 | Error state animation | Over-complex loading |
| Candidate 3 | Token usage pattern | Inline styles |

Fold each graft by hand — the result must stay coherent.

**Convergence signal:** When N candidates arrive at the same shape, that's strong agreement. Ship the consensus, no graft needed.

**Divergence signal:** When candidates wildly diverge, Phase A was under-specified. Reframe and re-run rather than averaging.

## Phase F: Verify

The synthesized artifact gets the same scrutiny as any output.

**Design verification:**
- Visual inspection
- Design system compliance
- State coverage

**Code verification:**
- Tests pass
- Types correct
- Linting clean
- Renders correctly

If verification surfaces a problem:
- Phase A was wrong → reframe and re-run
- One candidate caught it → go back to Phase E

## Outputs

One synthesized artifact plus:

```markdown
## Arena Synthesis

**Base:** Candidate 2
**Reason:** Cleanest component API, best type safety

**Grafts:**
- From C1: Loading skeleton animation approach
- From C3: Error boundary integration

**Rejected:**
- C1 main approach: Over-abstracted, 12 props
- C3 state machine: Overkill for this use case

**Verification:** Tests pass, renders correctly, a11y clean
```

## Design/Frontend Arena Patterns

### Component API arena
- 3 candidates propose different prop APIs
- Judge on usability, type safety, flexibility
- Synthesize best API shape

### Styling arena
- Candidates try: CSS modules, Tailwind, styled-components
- Judge on consistency, maintainability, performance
- Pick approach that fits codebase

### Layout arena
- Candidates propose different responsive approaches
- Judge on breakpoint handling, flexibility
- Synthesize best grid/layout system

### State management arena
- Candidates try: local state, context, external store
- Judge on complexity, testability, performance
- Pick simplest that works

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Arena: [what was arena'd]"
- playbook_name: "arena"
- summary: Base picked, key grafts, verification result
- files: Synthesized artifact paths
- evidence: Synthesis note with rationale

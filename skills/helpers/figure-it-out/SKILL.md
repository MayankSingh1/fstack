---
name: figure-it-out
description: "Design an auditable playbook when no existing one fits. For large migrations, ambitious multi-part changes, or work a human reviews after stepping away. Use for /figure-it-out or 'figure it out'."
disable-model-invocation: true
---

# Figure It Out

When the task matches no playbook, design one. The deliverable before any code is the workflow itself: a sequence of phases that scales rigor to the task, runs the scientific method, and leaves a decision trail a human can audit.

## Start

Open a todo list with phases:

1. Frame
2. Design the workflow
3. Run the loop
4. Keep the audit trail
5. Verify and hand back
6. Record in changelog

## Phase A: Frame

Ground first, then commit. State:

- **Definition of done** as a falsifiable predicate
- **Scope**, quantified: rough units, effort, blockers
- **Rigor level**, biased high. One-way doors get more. Reversible steps get less.

Present framing before committing to a long run. Reversible work proceeds, but a multi-hour run earns one checkpoint.

### Design/Frontend Framing

For design/frontend work, scope includes:

- Number of components/screens affected
- Design system impact
- Accessibility requirements
- Browser/device coverage
- Performance targets
- States to handle (loading, error, empty, etc.)

## Phase B: Design the workflow

Decompose into atomic, independently-landable units. Sequence riskiest-unknown-first.

**For design work:**
1. Research and framing first
2. Low-fidelity before high-fidelity
3. Single component before composition
4. Desktop before responsive

**For frontend work:**
1. Build verification harness before the work
2. Scaffold structure before implementation
3. Happy path before edge cases
4. Styles before interactions

### Parallelize across seams

- Different components (not layers of same component)
- Different breakpoints (after base is solid)
- Different states (after structure exists)

Write the designed phase list. That list is what the human reviews.

## Phase C: Run the loop

Each unit is an experiment. State the hypothesis, make the smallest change, measure against the predicate on the real artifact.

**Design verification loop:**
1. Hypothesis: "This layout communicates hierarchy"
2. Make the change in Figma
3. Run critique or user test
4. Keep if validated, revert if not

**Frontend verification loop:**
1. Hypothesis: "This component handles all states"
2. Make the code change
3. Verify in dev server with each state
4. Keep if passing, revert if not

### Verification rules

- Verify by inspecting the real artifact, not self-report
- When something passes too easily, suspect the observation method
- A verdict is VERIFIED, NOT VERIFIED, or INCONCLUSIVE
- Inconclusive is not a pass

## Phase D: Keep the audit trail

Log the run via `/show-me-your-work`. For figure-it-out work:

- Log decision points, not every action
- Include hypotheses and verdicts
- Note what was reverted and why
- Track the path taken through the design

Commit the trail so reviewers can read it.

## Phase E: Verify and hand back

Check the whole against the Phase A predicate on the real product.

**Design verification:**
- Visual inspection at all breakpoints
- Accessibility audit
- Design critique pass
- Stakeholder review if needed

**Frontend verification:**
- All states render correctly
- Accessibility tests pass
- Cross-browser check
- Performance within targets

Encode any recurring correction as a lint rule, type, or test.

## Reply format

- The playbook you designed
- Rigor level and why
- Decision trail path
- What's verified against predicate
- What's still open

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: Descriptive name of the work
- playbook_name: "figure-it-out (custom)"
- summary: What the custom playbook achieved
- files: All files changed
- prs: Any PRs created
- evidence: Verification results from Phase E

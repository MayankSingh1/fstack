---
name: investigation
description: "Read-only playbook for understanding how something works or why it was built that way. Routes through /how-ui and /why-this-design. Deliverable is a cited answer, not code changes."
disable-model-invocation: true
---

# Investigation

A read-only question: how does X work, why was Y built this way, are we sure about Z, should we do X or Y. The deliverable is a cited answer, not code changes.

## When to use

- "How does this component work?"
- "Why was this designed this way?"
- "Are we sure this is the right approach?"
- "Should we use X or Y?"
- Understanding before changing
- Tracing data flow or behavior
- Researching historical decisions

## Steps

```
PLAYBOOK: Investigation
──────────────────────────────────────

□ Step 1: Frame the question
  └─ What specifically are we trying to understand?
  └─ Is this a "how" question or a "why" question?
  └─ What would a complete answer look like?

□ Step 2: Route to appropriate skill
  └─ "How does X work?" → Calls: /how-ui
  └─ "Why was Y built this way?" → Calls: /why-this-design
  └─ Both needed → Run both, synthesize

□ Step 3: Gather evidence
  └─ Read relevant code
  └─ Trace execution paths
  └─ Check git history if "why" question
  └─ Note confidence level for each finding

□ Step 4: Synthesize answer
  └─ Lead with the direct answer
  └─ Support with evidence (file:line, commit SHA, PR)
  └─ Distinguish: documented facts vs inference
  └─ Note what you couldn't find

□ Step 5: Identify follow-up threads
  └─ Related questions worth exploring
  └─ Deeper dives available via /how-ui or /why-this-design
  └─ Gaps in documentation

EVIDENCE REQUIRED: Cited answer with source references distinguishing fact from inference
```

## Question routing

| Question pattern | Route to | Focus |
|------------------|----------|-------|
| How does X work? | /how-ui | Mechanics, data flow |
| Why is X like this? | /why-this-design | History, rationale |
| Should we do X or Y? | Both, then compare | Tradeoffs |
| Are we sure about X? | /why-this-design | Evidence for decision |
| What happens when X? | /how-ui | Behavior tracing |

## Answer format

```markdown
## Answer

[Direct answer to the question]

## Evidence

### From code
- `path/to/file.tsx:42` — [what it shows]
- `path/to/other.ts:15` — [what it shows]

### From history (if /why-this-design was run)
- PR #123 — [what was decided]
- Commit abc123 — [what changed and why]

### Confidence levels
- **Documented:** [facts from explicit sources]
- **Inferred:** [reasonable conclusions from code]
- **Unknown:** [what couldn't be determined]

## Related threads
- [Thread 1] — could explore via /how-ui
- [Thread 2] — could explore via /why-this-design
```

## Rules

1. **No code changes.** This is read-only. Changes belong in a different playbook.
2. **Cite everything.** Every claim has a source or a confidence label.
3. **Distinguish fact from inference.** "The code does X" vs "This probably means Y."
4. **Answer the actual question.** Don't drift to related topics without finishing.
5. **Stay scoped.** A narrow question gets a narrow answer. Offer to go deeper.

## When to pivot to another playbook

If investigation reveals:
- A bug → pivot to **Bug Fix** playbook
- An improvement needed → pivot to **appropriate playbook** after delivering the answer
- A design question → finish investigation, then suggest **Prototype** if empirical

Investigation answers first, then recommends next steps.

## Integration with flash-mode

Investigation is matched when:
- Request is phrased as a question
- User says "how does", "why is", "are we sure"
- Request explicitly asks to understand, not change
- `/teach` was invoked (routes through Investigation first)

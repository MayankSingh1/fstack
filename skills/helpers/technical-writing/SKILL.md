---
name: technical-writing
description: "Layered technical writing standard: Diátaxis structure, Google developer style, clear sentences. Use for /technical-writing or when writing docs, RFCs, READMEs, PR descriptions, or commit messages."
disable-model-invocation: true
---

# Technical Writing

The goal is writing a tired engineer understands on the first read. Four layers get you there.

## Above everything

- **Cut every word that does no work.** "In order to" → "to". "It is important to note that" → nothing.
- **Use the short, everyday word.** "Use" not "utilize". "Help" not "facilitate".
- **When a rule makes a sentence worse, fix the sentence another way.**

The codebase is the word list. Write real symbol, file, flag names — not synonyms.

## Layer 1: Pick the mode (Diátaxis)

One document, one mode. Two questions pick it:

| | Learning | Work |
|---|---|---|
| **Action** | Tutorial | How-to |
| **Understanding** | Explanation | Reference |

### Tutorial (learning by doing)
- You are the teacher
- Every step produces a visible result
- Tell them what they should see
- Cut explanation to one clause and a link
- Write as "we", in commands: "First, do X. Now, do Y."

### How-to (steps to a goal)
- Solve a problem, not an operation
- Assume competence, skip teaching
- Action only: no digressions
- "If you want X, do Y" for forks

### Reference (facts for lookup)
- Describe. Only describe.
- No instruction, no persuasion
- Be dry, complete, and sure
- Mirror structure of the thing described

### Explanation (understanding)
- One bounded topic
- Anchor on a real "why" question
- Opinion allowed here only

**Don't mix modes.** No reference tables in tutorials. Split and link.

## Layer 2: Write to the reader (Google style)

- Talk to the reader as "you", present tense
- Say who does what: "the compiler checks", not "is checked"
- Instructions as commands: "Click Submit."
- Condition before instruction: "To delete, click Delete."
- Common case first
- Sound like a knowledgeable friend — no buzzwords
- Never "simply", "easy", or "quickly" in procedures
- Link with words that say where: the page title, not "click here"
- Headings carry the point: "Pick the mode first", not "Modes"

## Layer 3: One thought per sentence

- One instruction per sentence
- Split sentences longer than ~25 words
- Warning or condition before the step
- Keep "the" and "a" — they disambiguate
- Pick one word per action and stick to it

## Layer 4: No ambiguity

- Keep modifiers next to what they modify
- Break up noun strings: "proto import budget check script" → "the script that checks the proto-import budget"
- Make every "it", "they", "this" point at one thing
- Don't drop verbs
- Keep structure words: "Ensure that the switch is off"
- Use periods, not semicolons
- No slashes: "a, b, or both" not "a/b"
- Call each thing by one name, everywhere

## PR Descriptions

Every layer except Diátaxis applies. A PR body is a briefing the reviewer reads in under a minute.

### Structure
```markdown
## What
[One sentence: what this PR does]

## Why
[One sentence: why this change is needed]

## How
[Brief technical approach — what changed and why that way]

## Testing
[How you verified it works]

## Screenshots
[Before/after if visual change]
```

### Don't
- Paste swarm logs, SHA lists, or metric tables (link them)
- Explain every line changed
- Apologize or hedge
- Use vague words: "improvements", "updates", "changes"

### Do
- Be specific: "Added focus-visible styles to Button"
- Link related issues
- Call out anything surprising
- Note what to watch for in review

## Commit Messages

```
<type>: <subject in imperative mood, ≤50 chars>

[Body: why this change, not how. Wrap at 72.]

[Footer: references, breaking changes]
```

Types: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`

```
feat: add loading state to DataCard component

DataCard now shows a skeleton loader when data is fetching.
Previously it showed a blank space which confused users.

Fixes #234
```

## README Structure

```markdown
# Project Name

[One sentence: what it does]

## Quick Start

[Minimal steps to run]

## Usage

[Common use cases with examples]

## API / Configuration

[Reference docs]

## Contributing

[How to contribute]
```

## Worked Example

**Before:**
> Configuration of the token import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails.

**After:**
> `budget.mjs` reads the committed budget from `budget.json` and counts the files that import tokens. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget.

## Integration

- Apply `/unslop` to every doc this skill touches
- Run spell check
- Verify all code snippets work
- Check all links resolve

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Documentation: [what was written]"
- playbook_name: "technical-writing"
- summary: What docs were written/updated
- files: Changed documentation files
- evidence: Before/after word count, readability improvement

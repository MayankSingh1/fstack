---
name: automate-me
description: "Create or update a personal -mode skill from working patterns in transcripts and direct questions. Use for 'automate me', 'create my mode skill', 'capture how I work', or 'update my preferences'."
disable-model-invocation: true
---

# Automate Me

Turn the user's working conventions into a personal `-mode` skill that agents will follow. The output is one skill tailored to their design and frontend workflow (e.g., `maya-mode`, `alex-mode`).

This skill orchestrates: mining recent transcripts for patterns, asking focused questions, and authoring a mode skill via `/unslop`.

## Flow

### 0. Check for existing skill

Look for `.cursor/skills/**/*-mode/SKILL.md` or `~/.cursor/skills/*-mode/SKILL.md` matching the user's handle.

If found, confirm intent:
- **Update** the existing skill (default for repeat runs)
- **Start fresh** (rare — ask why before proceeding)

Update mode changes the flow:
- Step 1 mines only history since the skill was last edited
- Step 2 asks what's changed or missing
- Step 4 edits the existing file, preserving unchanged sections

### 1. Mine their history

Survey recent agent conversations for recurring design and frontend patterns. Default signals:

**Design Patterns**
- Preferred design tools (Figma, Sketch, etc.)
- Component naming conventions
- Token/variable preferences
- Review and feedback style
- Handoff documentation habits

**Frontend Patterns**
- Framework preferences (React, Vue, etc.)
- Styling approach (CSS modules, Tailwind, etc.)
- Testing expectations
- Accessibility standards
- Performance targets

**Process Patterns**
- Verification posture (what "done" means)
- PR description style
- Review workflow
- Session management (how they pause/resume)

**Communication Patterns**
- Response length preferences
- Explanation depth
- Use of examples
- Feedback format

Cross-check patterns across multiple conversations before codifying. Single instances are noise.

### 2. Ask directly

Mining misses intent that hasn't come up. Use structured questions:

One or two questions with 4-6 options, `allow_multiple: true`. Start broad ("Which areas matter most?"), then follow up on selections.

Example areas:
- Design tool workflow
- Code style preferences
- Verification standards
- Communication style

One free-form question catches anything options missed.

Don't dump 20 questions.

### 3. Cluster findings

Group signals into sections. Use only what applies:

- **Design workflow**: Tools, process, handoff style
- **Code style**: Framework conventions, naming, structure
- **Verification**: What counts as done, testing expectations
- **Communication**: Length, tone, format, explanation depth
- **Review**: Feedback style, PR expectations
- **Session management**: How they pause, resume, track work

### 4. Draft the skill

**Placement:**
- Preserve existing skill's location for updates
- New skills: `.cursor/skills/<handle>-mode/SKILL.md` in project, or `~/.cursor/skills/<handle>-mode/` for personal

**Frontmatter:**
```yaml
---
name: <handle>-mode
description: "Work in <Name>'s style for design and frontend tasks. Triggers on <handle>, <Name>, or 'work in my style'."
disable-model-invocation: true
---
```

Set `disable-model-invocation: true` by default. Only opt out if the user explicitly wants their mode on every turn.

### 5. Apply prose discipline

Run the `/unslop` skill on every line.

Show the draft and take feedback. Expect multiple iterations. Cut ruthlessly. A mode skill is not a manual.

### 6. Land it

Commit the skill. For team repos, open a PR rather than pushing to main directly.

## Guardrails

- **Don't overfit to one conversation.** A preference stated once and contradicted another time is noise.
- **Don't be clever.** No metaphors, no poetic prose. Keep it operational.
- **Reference, don't inline.** Other skills should appear as path references, not pasted content.
- **Keep sections minimal.** Only add a section if the user has a specific, non-default rule there.
- **Name conventions generic.** Use "the user" in imperatives, not the author's first name.
- **Don't force symmetry.** Skip empty sections.

## Evaluation

A mode skill is subjective. Verify with the user: does it read like them? Did it miss anything? Then ship.

## When not to use

- Task-specific skill (not working conventions): Use skill authoring directly
- Single narrow workflow (e.g., "how I write commit messages"): Regular skill, not mode

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: "Personal mode skill [created/updated]"
- playbook_name: "automate-me"
- summary: What was captured
- files: The mode skill path
- evidence: User approval of the draft

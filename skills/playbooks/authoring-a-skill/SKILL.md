---
name: authoring-a-skill
description: "Write or edit a SKILL.md file. Follow the fstack skill format, validate frontmatter, test the skill works. Use for 'create a skill', 'write a skill', or 'edit this skill'."
disable-model-invocation: true
---

# Authoring a Skill Playbook

Create or edit an fstack skill following the standard format.

## Phases

```
□ Phase 1: Define the skill
□ Phase 2: Write the skill
□ Phase 3: Apply prose discipline
  └─ Calls: /unslop
□ Phase 4: Validate structure
□ Phase 5: Test the skill
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Define the Skill

### Skill type

| Type | Location | Purpose |
|------|----------|---------|
| Helper | `skills/helpers/[name]/` | Focused tool for specific task |
| Playbook | `skills/playbooks/[category]/[name]/` | Multi-step workflow |
| Principle | `skills/principles/[name]/` | Guideline to follow |
| Router | `skills/[name]/` | Matches requests to other skills |

### Skill requirements

Before writing, define:

```markdown
**Name:** [skill-name] (kebab-case)
**Type:** [helper/playbook/principle/router]
**Trigger:** [When should this skill be invoked?]
**Output:** [What does the skill produce?]
**Calls:** [Other skills it calls, if any]
```

### Name conventions

| Good | Bad |
|------|-----|
| `visual-parity` | `VisualParity` |
| `bug-fix` | `fix_bug` |
| `how-ui` | `how-does-the-ui-work` |

## Phase 2: Write the Skill

### File structure

```
skills/
└── [type]/
    └── [skill-name]/
        ├── SKILL.md          # Required
        └── references/       # Optional supporting files
            ├── example.md
            └── template.md
```

### Frontmatter (required)

```yaml
---
name: skill-name
description: "One-line description that describes when to use this skill. Include trigger phrases."
disable-model-invocation: true
---
```

### Frontmatter options

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | Skill identifier (kebab-case) |
| `description` | Yes | When to invoke (include trigger phrases) |
| `disable-model-invocation` | Yes | Always `true` for fstack skills |
| `mode` | No | `true` for sticky router skills |
| `reminder` | No | Shown when skill is active |
| `paths` | No | Auto-apply to matching files |

### Description best practices

```yaml
# Good: includes trigger phrases
description: "Find what a change could break elsewhere before it ships. Use for 'blast radius', 'what could this break', or reviewing a small diff."

# Bad: vague, no triggers
description: "Helps with code review."
```

### Body structure

```markdown
# Skill Name

[One paragraph: what this skill does and when to use it]

## Phases/Steps/Sections

[Main content organized logically]

## Output Format

[What the skill produces]

## Record in changelog

Call `/changelog-notetaker` with:
[Standard changelog fields]
```

### For playbooks

```markdown
## Phases

```
□ Phase 1: [Name]
□ Phase 2: [Name]
  └─ Calls: /helper-skill
□ Phase 3: [Name]
...
□ Phase N: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: [Name]

[Content]

## Phase 2: [Name]

[Content]

...
```

### For helpers

```markdown
## When to use

[Specific situations]

## Process

[Step by step]

## Output

[What it produces]
```

## Phase 3: Apply Prose Discipline

Run `/unslop` on the skill content.

### Writing rules

| Do | Don't |
|----|-------|
| Direct imperatives | Passive voice |
| Concrete examples | Abstract descriptions |
| Real file paths | Vague references |
| Tables for structured info | Long paragraphs |
| Code blocks for code | Inline code for paths |

### Cut these

- "In order to" → "To"
- "It is important to" → (delete)
- "Basically" → (delete)
- "Simply" → (delete)
- "Please note that" → (delete)

## Phase 4: Validate Structure

### Frontmatter check

```bash
head -20 skills/[type]/[name]/SKILL.md
```

Verify:
- [ ] Starts with `---`
- [ ] Has `name:` field
- [ ] Has `description:` field
- [ ] Has `disable-model-invocation: true`
- [ ] Ends frontmatter with `---`

### Content check

- [ ] H1 matches skill name
- [ ] Has clear sections
- [ ] All referenced skills exist
- [ ] Code examples are valid
- [ ] Tables are formatted correctly

### Run validator

```bash
./validate.sh
```

Should pass with 0 errors.

## Phase 5: Test the Skill

### Invocation test

Try invoking the skill:

```
/[skill-name]
```

Verify:
- [ ] Skill is recognized
- [ ] Description triggers are accurate
- [ ] Content is read correctly

### Workflow test

For playbooks:
- [ ] Walk through each phase
- [ ] Verify called skills exist
- [ ] Check output format is clear

For helpers:
- [ ] Try on a real example
- [ ] Verify output is useful
- [ ] Check edge cases

### Integration test

If skill calls other skills:
- [ ] Each called skill exists
- [ ] Handoff is clear
- [ ] Return flow is defined

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Skill: [name] [created/updated]" |
| playbook_name | "authoring-a-skill" |
| summary | What the skill does |
| files | SKILL.md path |
| evidence | Validation output, test result |

## Output Format

```markdown
## Skill Complete: [Name]

**Type:** [helper/playbook/principle]
**Path:** skills/[type]/[name]/SKILL.md
**Triggers:** [When it's invoked]

### Purpose
[What it does]

### Validation
- ✓ Frontmatter valid
- ✓ validate.sh passes
- ✓ Invocation works

### Integration
Calls: [skills it calls]
Called by: [skills that call it, if known]
```

## Skill Templates

### Helper template

```markdown
---
name: helper-name
description: "One-line with trigger phrases. Use for /helper-name, 'do X', or 'Y situation'."
disable-model-invocation: true
---

# Helper Name

[One paragraph purpose]

## When to use

[Specific situations]

## Process

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Output

[What it produces]

## Record in changelog

At the end, call `/changelog-notetaker` with:
- task_name: [appropriate name]
- playbook_name: "[this skill name]"
- summary: [what was done]
- files: [changed files]
- evidence: [verification]
```

### Playbook template

```markdown
---
name: playbook-name
description: "Multi-step workflow for X. Use for 'do Y', 'Z situation'."
disable-model-invocation: true
---

# Playbook Name

[One paragraph purpose]

## Phases

```
□ Phase 1: [Name]
□ Phase 2: [Name]
□ Phase 3: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: [Name]

[Content]

## Phase 2: [Name]

[Content]

## Phase 3: Record in Changelog

Call `/changelog-notetaker` with:
[fields]

## Output Format

[What the playbook produces]
```

---
name: setup-fstack
description: "Helper skill to configure fstack model roles. Creates the ~/.cursor/rules/fstack-models.mdc file with model assignments for different task types."
---

# /setup-fstack

Configures fstack model roles by creating the `~/.cursor/rules/fstack-models.mdc` rule file. This file tells flash-mode which models to use for different types of work.

## When to Use

- First time setting up fstack
- After getting access to new models
- When adjusting model preferences
- When optimizing for cost or quality

## How to Invoke

```
/setup-fstack
/setup-fstack configure models
```

## What It Does

1. Detects available models in your Cursor account
2. Suggests role assignments based on model capabilities
3. Creates `~/.cursor/rules/fstack-models.mdc`
4. Explains how flash-mode uses the configuration

## Model Roles

| Role | Purpose | Typical Work |
|------|---------|--------------|
| `investigation` | Understanding code/designs | `/how-ui`, `/why-this-design`, research |
| `implementation` | Writing code | Figma-to-code, bug fixes, feature work |
| `judgment` | Making decisions | Design decisions, architecture choices |
| `review` | Critiquing work | `/critique`, code review, accessibility audit |
| `prose` | Writing text | UX copy, PR descriptions, documentation |

## Configuration Format

```markdown
---
description: "fstack model role configuration"
alwaysApply: true
---

# fstack Model Roles

When flash-mode delegates work, use these models:

## Investigation
Model: claude-sonnet
Use for: Understanding existing code, tracing behavior, research

## Implementation  
Model: claude-sonnet
Use for: Writing and modifying code

## Judgment
Model: claude-opus
Use for: Design decisions, architecture choices, complex tradeoffs

## Review
Models: claude-opus, gpt-4, gemini-pro
Use for: Multi-perspective critique (uses multiple models)

## Prose
Model: claude-opus
Use for: UX copy, documentation, PR descriptions

## Notes
- `auto` or `inherit-parent` uses the chat's current model
- Review role accepts multiple models for diverse perspectives
- Adjust based on your model access and budget
```

## Default Recommendations

### High Quality (More Expensive)

```
investigation: claude-opus
implementation: claude-opus
judgment: claude-opus
review: [claude-opus, gpt-4o, gemini-1.5-pro]
prose: claude-opus
```

### Balanced (Recommended)

```
investigation: claude-sonnet
implementation: claude-sonnet
judgment: claude-opus
review: [claude-opus, claude-sonnet]
prose: claude-opus
```

### Cost-Conscious

```
investigation: claude-sonnet
implementation: claude-sonnet
judgment: claude-sonnet
review: [claude-sonnet]
prose: claude-sonnet
```

### Speed-Optimized

```
investigation: claude-haiku
implementation: claude-sonnet
judgment: claude-sonnet
review: [claude-sonnet]
prose: claude-haiku
```

## Setup Process

### Step 1: Check Available Models

Flash-mode works best with access to:
- At least one capable model (Sonnet-class or better)
- Ideally both a fast model and a powerful model
- Multiple models for review panels

### Step 2: Choose Your Strategy

Consider:
- **Quality needs**: How critical is this work?
- **Budget**: Token costs vary significantly
- **Speed**: Faster models for interactive work
- **Diversity**: Review benefits from different perspectives

### Step 3: Create Configuration

The setup skill creates the file with your choices:

```bash
# File location
~/.cursor/rules/fstack-models.mdc
```

### Step 4: Restart Chat

After setup, start a new chat so the rule is loaded.

## Special Values

| Value | Meaning |
|-------|---------|
| `auto` | Use chat's current model |
| `inherit-parent` | Use parent chat's model |
| Model name | Use that specific model |
| `[model1, model2]` | Use multiple models (review only) |

## Customizing for Project Types

### Design-Heavy Projects

Emphasize judgment and prose:
```
judgment: claude-opus
prose: claude-opus
implementation: claude-sonnet
```

### Frontend-Heavy Projects

Emphasize implementation:
```
implementation: claude-sonnet
review: [claude-opus, claude-sonnet]
```

### Maintenance/Bug Fix Projects

Emphasize investigation:
```
investigation: claude-opus
implementation: claude-sonnet
```

## Troubleshooting

### "Model not available"
- Check your Cursor subscription
- Verify model name spelling
- Fall back to `auto`

### "Too expensive"
- Switch to Sonnet/Haiku for routine work
- Reserve Opus for judgment and review
- Reduce review panel size

### "Too slow"
- Use faster models for investigation
- Reserve slower models for final review
- Use `auto` for interactive work

### "Not using the configuration"
- Verify file is at `~/.cursor/rules/fstack-models.mdc`
- Check frontmatter is valid YAML
- Start a new chat after changes

## File Template

```markdown
---
description: "fstack model role configuration"
alwaysApply: true
---

# fstack Model Roles

## Investigation
Model: [your-choice]

## Implementation
Model: [your-choice]

## Judgment
Model: [your-choice]

## Review
Models: [your-choice, optional-additional]

## Prose
Model: [your-choice]
```

## Integration with Flash-Mode

When flash-mode delegates work:

1. Identifies the type of work (investigation, implementation, etc.)
2. Reads `fstack-models.mdc` for role assignment
3. Delegates to specified model(s)
4. Falls back to current chat model if no config found

The configuration is optional — flash-mode works without it, using the current chat model for all work.

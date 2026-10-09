---
name: unslop
description: "Helper skill to remove AI-generated fluff from UI copy and PR text. Cuts filler words, false enthusiasm, and robotic patterns while preserving meaning."
---

# /unslop

Removes AI-generated fluff from writing. Cuts filler words, false enthusiasm, weasel phrases, and robotic patterns while preserving meaning. Makes text sound human and direct.

## When to Use

- Cleaning up generated UI copy
- Editing PR descriptions
- Improving error messages
- Before publishing any user-facing text
- Reviewing commit messages

## How to Invoke

```
/unslop clean up this button text
/unslop this error message sounds robotic
/unslop make this PR description less AI-sounding
```

## Slop Patterns to Remove

### Filler Words

```
❌ "In order to" → ✓ "To"
❌ "It's important to note that" → ✓ (just state it)
❌ "As a matter of fact" → ✓ (delete)
❌ "Basically" → ✓ (delete)
❌ "Actually" → ✓ (usually delete)
❌ "Simply" → ✓ (delete)
❌ "Just" → ✓ (usually delete)
❌ "Really" → ✓ (delete or use stronger word)
❌ "Very" → ✓ (delete or use stronger word)
```

### False Enthusiasm

```
❌ "Great news!"
❌ "We're excited to..."
❌ "You'll love this..."
❌ "Amazing new feature!"
❌ "Awesome!"
```

### Weasel Words

```
❌ "It seems like..."
❌ "Perhaps you could..."
❌ "You might want to consider..."
❌ "It's possible that..."
❌ "Some users may find..."
```

### Robotic Phrases

```
❌ "I hope this helps!"
❌ "Please let me know if you have any questions."
❌ "Feel free to reach out."
❌ "Thank you for your patience."
❌ "We apologize for any inconvenience."
```

### Corporate Speak

```
❌ "Leverage" → ✓ "Use"
❌ "Utilize" → ✓ "Use"
❌ "Implement" → ✓ "Build" or "Add"
❌ "Facilitate" → ✓ "Help" or "Enable"
❌ "Optimize" → ✓ "Improve" (when not technical)
❌ "Streamline" → ✓ "Simplify"
❌ "Robust" → ✓ "Strong" or "Reliable"
```

## Before/After Examples

### Error Message

```
❌ Before:
"Oops! It looks like something went wrong. We're really sorry 
for any inconvenience this may have caused. Please try again, 
and if the problem persists, feel free to reach out to our 
support team."

✓ After:
"Couldn't save your changes. Please try again."
```

### Button Label

```
❌ "Click here to get started with your journey"
✓ "Get Started"

❌ "Submit your information"
✓ "Submit"
```

### PR Description

```
❌ Before:
"This PR introduces a new feature that allows users to easily 
and efficiently manage their settings. I've implemented a 
robust solution that should provide a great user experience. 
Please let me know if you have any questions or concerns!"

✓ After:
"Adds settings management page. Users can update profile, 
change password, and manage notifications."
```

### UI Copy

```
❌ Before:
"Welcome to your personalized dashboard! Here you'll find 
everything you need to get the most out of our amazing 
platform. We've designed this experience with you in mind!"

✓ After:
"Your Dashboard"
```

### Empty State

```
❌ Before:
"Oops! It looks like you don't have any projects yet. But 
don't worry, getting started is super easy! Simply click 
the button below to create your first amazing project!"

✓ After:
"No projects yet. Create one to get started."
```

## The Unslop Process

### Step 1: Identify Slop
- Highlight filler words
- Mark false enthusiasm
- Note weasel phrases
- Spot robotic patterns

### Step 2: Cut Ruthlessly
- Delete anything that doesn't add meaning
- Shorten phrases to their essence
- Remove all enthusiasm (let the feature speak for itself)

### Step 3: Rewrite Simply
- Subject-verb-object
- Active voice
- Specific over general
- One idea per sentence

### Step 4: Verify Meaning
- Same information conveyed?
- User knows what to do?
- Tone appropriate for context?

## Style Guidelines After Unslopping

### Good UI Copy Is:
- **Clear**: User knows what's happening
- **Concise**: No wasted words
- **Useful**: Helps user take action
- **Honest**: No false promises or fake enthusiasm

### Voice Should Be:
- Direct, not curt
- Helpful, not patronizing
- Professional, not corporate
- Human, not robotic

### Tone Varies by Context:

| Context | Appropriate Tone |
|---------|------------------|
| Error | Calm, solution-focused |
| Success | Brief, confirming |
| Onboarding | Welcoming but not gushing |
| Warning | Serious, clear |
| Help | Patient, detailed |

## Common Unslopping Tasks

### Button Text
Keep to 1-3 words. Use verbs.
```
Submit | Save | Cancel | Delete | Continue | Back | Done
```

### Error Messages
Say what happened and how to fix it.
```
"Invalid email address. Use format: name@example.com"
```

### Empty States
Say what's missing and how to add it.
```
"No results for 'xyz'. Try different keywords."
```

### Success Messages
Confirm what happened, briefly.
```
"Saved" | "Sent" | "Deleted" | "Updated"
```

## Output Format

```markdown
## Unslopped Text

### Original
[The AI-sounding original text]

### Problems Found
- [Pattern 1]: "[specific phrase]"
- [Pattern 2]: "[specific phrase]"

### Cleaned Version
[The unslopped text]

### Changes Made
- Removed [N] filler words
- Cut [N] enthusiasm phrases
- Shortened from [N] to [N] words
- [Other specific changes]
```

## Integration with Flash-Mode

This skill is called to clean up text in:
- **UX Copy** playbook (main focus)
- **Open a PR** playbook (PR description)
- **Design Critique** playbook (copy feedback)
- **Handoff Note** playbook (content specs)
- Any time generated text needs human editing

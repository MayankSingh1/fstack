---
name: why-this-design
description: "Helper skill to find evidence for why a design decision was made. Searches git history, PRs, Figma, and docs. Distinguishes facts from inference."
---

# /why-this-design

Finds evidence for why a design decision was made. Searches git history, pull requests, Figma comments, documentation, and other sources. Clearly distinguishes documented facts from reasonable inference.

## When to Use

- Understanding why code/design is structured a certain way
- Before changing something that looks wrong but might be intentional
- Researching historical decisions
- Building context for new team members

## How to Invoke

```
/why-this-design why is the button 48px tall?
/why-this-design why do we have two modal components?
/why-this-design why was this feature built this way?
```

## Evidence Sources

### 1. Git History

```bash
# Find commits that touched this file/line
git log -p --follow -- path/to/file.tsx

# Search commit messages
git log --grep="button height" --all

# Find who last modified
git blame path/to/file.tsx
```

### 2. Pull Requests

Search PR history for:
- PR that introduced the change
- Discussion in PR comments
- Design decisions documented in description
- Linked issues or design docs

### 3. Figma Comments

If Figma MCP available:
- Check comments on relevant components
- Look for version history
- Check linked Figma files in PRs

### 4. Documentation

Search for:
- ADRs (Architecture Decision Records)
- Design system documentation
- README files
- Inline code comments
- Wiki pages

### 5. Issue Trackers

Search for:
- Issues that requested this feature
- Bug reports that led to changes
- Design discussions in issues

## Investigation Process

### Step 1: Identify the Artifact
What specific thing are we investigating?
- A component?
- A pattern?
- A value (spacing, color, etc.)?
- An architectural decision?

### Step 2: Find When It Was Introduced
```bash
# Find the commit that introduced it
git log -p -S "the-thing" -- path/to/file
git log --all --full-history -- path/to/file
```

### Step 3: Read the Context
- What was the commit message?
- What was the full PR?
- Were there comments or discussions?

### Step 4: Search for Explicit Documentation
- Grep for terms in docs
- Search ADRs
- Check design system docs

### Step 5: Look for Related Changes
- Other files changed in same commit
- Related PRs from same time period
- Patterns that emerged together

## Output Format

```markdown
## Why: [The Decision in Question]

### Evidence Found

#### Direct Evidence (Documented)
- **Source**: [Link to PR/commit/doc]
- **What it says**: [Quote or summary]
- **Confidence**: High (explicitly documented)

#### Supporting Evidence
- **Source**: [Link]
- **What it says**: [Quote]
- **Confidence**: Medium (related but not explicit)

### Inference (Not Documented)
- [Reasonable guess based on context]
- [Another reasonable inference]
- **Confidence**: Low (inference, not fact)

### No Evidence Found
- Searched: [what you searched]
- The decision may predate documentation
- Consider asking: [team member who might know]

### Summary
[One paragraph: what we know for sure vs what we're inferring]
```

## Evidence Quality Levels

| Level | Meaning | Example |
|-------|---------|---------|
| **Documented** | Explicitly stated in writing | "We chose 48px because..." in PR |
| **Attributed** | Someone said it, recorded | Commit message explains why |
| **Inferred** | Reasonable guess from context | Changed same time as a11y audit |
| **Unknown** | No evidence found | Predates version control |

## Common Investigation Patterns

### "Why is this value X?"
1. Git blame the line
2. Find the commit that set it
3. Read the PR/commit message
4. Search for design system rationale

### "Why are there two versions of this?"
1. Find when each was introduced
2. Check if one is deprecated
3. Look for migration plans
4. Search for feature flags

### "Why doesn't this follow the pattern?"
1. Find when divergence happened
2. Check if it predates the pattern
3. Look for technical constraints
4. Search for documented exceptions

### "Why was this designed this way?"
1. Find linked Figma files
2. Check design system docs
3. Search for user research
4. Look for related issues/feedback

## What to Do with the Answer

### If You Find a Good Reason
- Preserve the decision
- Document it better if unclear
- Reference it in new related work

### If the Reason No Longer Applies
- Document this finding
- Propose a change
- Get alignment before changing

### If No Reason Found
- Ask team members who might know
- Make a reasonable decision
- Document the new reasoning

## Anti-Patterns

- **Don't assume**: "It's probably because..." without evidence
- **Don't trust memory**: Find the actual documentation
- **Don't skip context**: Read the whole PR/issue, not just the code
- **Don't change without understanding**: The reason may still apply

## Example Output

```markdown
## Why: The modal has a 300ms close delay

### Evidence Found

#### Direct Evidence (Documented)
- **Source**: PR #234 "Fix modal flash on Safari"
- **What it says**: "Added 300ms delay because Safari 
  requires time for the backdrop animation to complete, 
  otherwise content flashes"
- **Confidence**: High (explicitly documented)

#### Supporting Evidence
- **Source**: Issue #201
- **What it says**: Users reported "flicker" when closing modals
- **Confidence**: High (this is the bug that led to the fix)

### Inference
- None needed — the reason is documented

### Summary
The 300ms delay was intentionally added in PR #234 to fix a 
Safari-specific rendering bug where modal content would flash 
before the backdrop animation completed. This is still relevant 
as we still support Safari.
```

## Integration with Flash-Mode

This skill is called by playbooks when historical context matters:
- During **Bug Fix** (has this been fixed before?)
- During **Design Critique** (why was it designed this way?)
- Before **Component Refactor** (why is structure like this?)
- During **Problem Framing** (what decisions led here?)

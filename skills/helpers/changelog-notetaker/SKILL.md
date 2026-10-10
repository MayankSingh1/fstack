---
name: changelog-notetaker
description: "Record completed work in the project changelog. Every fstack playbook calls this at the end. Creates or appends to FSTACK_CHANGELOG.md or .fstack/changelog.md with task name, version, date, playbook, summary, files/PRs, and evidence."
disable-model-invocation: true
---

# Changelog Notetaker

Record the completed task in the project changelog. This skill is called at the end of every playbook execution.

## Changelog Location

Search in order. Use the first match:

1. `.fstack/changelog.md` — if `.fstack/` directory exists
2. `FSTACK_CHANGELOG.md` — project root
3. Create `FSTACK_CHANGELOG.md` in project root if neither exists

## Entry Format

Append a new entry to the top of the changelog (below the header):

```markdown
## [Version or Task Name] — YYYY-MM-DD

**Playbook:** [Playbook name used]
**Summary:** [One-sentence description of what was done]

### Changes
- [Brief list of key changes made]

### Files Changed
- `path/to/file1.tsx`
- `path/to/file2.css`

### PRs / Commits
- PR #123 or commit `abc1234`

### Evidence
- [Screenshot link, verification output, or other proof]
```

## Entry Fields

| Field | Required | Description |
|-------|----------|-------------|
| Version/Task | Yes | Semantic version (v1.2.0) or descriptive task name |
| Date | Yes | ISO date (YYYY-MM-DD) |
| Playbook | Yes | Which fstack playbook was executed |
| Summary | Yes | One sentence describing the work |
| Changes | Yes | Bullet list of key changes |
| Files Changed | Yes | List of files touched |
| PRs/Commits | If applicable | References to PRs or commits |
| Evidence | Yes | Link or description of verification evidence |

## Workflow

1. **Locate or create changelog file**
2. **Collect entry data** from the playbook execution:
   - Task name from user's original request or PR title
   - Playbook name from the executed playbook
   - Summary synthesized from what was accomplished
   - Files from git diff or edited files list
   - PRs/commits from any created during the work
   - Evidence from the verification step
3. **Format the entry** using the template above
4. **Insert at top** below the changelog header
5. **Confirm** the entry was recorded

## Creating New Changelog

If no changelog exists, create with this header:

```markdown
# fstack Changelog

This changelog is maintained by fstack playbooks. Each entry records completed work with evidence.

---

## [Entry goes here]
```

## Guidelines

- **Keep summaries atomic**: One entry per playbook execution
- **Be specific**: "Fixed button hover state" not "Made improvements"
- **Link evidence**: Screenshot URLs, verification output paths, or inline descriptions
- **Version when shipping**: Use semantic versions for shipped features; task names for in-progress work
- **Don't duplicate**: If the same task spans multiple sessions, update the existing entry

## Example Entry

```markdown
## Button Accessibility Fix — 2024-01-15

**Playbook:** Accessibility Audit
**Summary:** Added keyboard navigation and focus indicators to primary button component

### Changes
- Added focus-visible styles with 2px offset ring
- Implemented keyboard enter/space activation
- Added aria-pressed for toggle buttons

### Files Changed
- `src/components/Button.tsx`
- `src/components/Button.module.css`
- `src/components/Button.test.tsx`

### PRs / Commits
- PR #456

### Evidence
- axe-core: 0 violations (was 3)
- Keyboard navigation: Tab/Enter/Space all functional
- Screenshot: `.fstack/evidence/button-focus-state.png`
```

## Integration with Playbooks

Every playbook includes a final step:

```
□ Record in changelog
  └─ Calls: /changelog-notetaker
```

The parent playbook passes:
- `task_name`: From the original request or derived
- `playbook_name`: The playbook that was executed
- `summary`: What was accomplished
- `files`: List of changed files
- `prs`: Any PR numbers or commit SHAs
- `evidence`: Verification proof from the playbook

## Reply Format

After recording:

```
✓ Recorded in [changelog path]:
  [Version/Task] — [Date]
  Playbook: [Name]
  Summary: [One line]
```

---
name: recall
description: "Reconstruct recent working context from transcripts, git state, and PRs, then hand back a tight current-state brief. Use for 'recall', 'catch me up', 'where did I leave off', or before starting/resuming work."
disable-model-invocation: true
---

# Recall

Before starting or resuming work, rebuild the user's recent working context and hand back a tight capsule of where things stand and what to do next.

## When to use

- "Recall my work on X"
- "Catch me up"
- "What have I been working on"
- "Where did I leave off"
- Before starting work that might overlap with prior sessions

## Sources

**Your own history:**
- Recent agent transcripts for this workspace
- Chat messages referencing the topic

**Shared record:**
- Git history (commits, branches, stashes)
- Pull requests (open, merged, closed)
- Review comments and CI status
- Design files (Figma branches, version history)
- Task/issue trackers if connected

## Process

### 1. Classify and route

| Situation | Route |
|-----------|-------|
| One specific prior chat to resume | `/session-pickup` playbook |
| Turn habits into durable skill | `/automate-me` |
| Summary for human (not agent context) | Different task |
| Load context before acting | This skill (recall) |

If the user already gave a full state capsule, use it and skip mining.

### 2. Lock the scope

Pin:
- Time window (default: last 7 days)
- Topic if named
- Workspace (default: active one)

State the scope back. Never quietly turn "all" into "recent N".

### 3. Mine chat history

Search transcripts for the topic:
- Order by modification time, not UUID
- Grep topic first, then read matching chats
- Skip subagent, eval, and test chats

For each relevant chat, extract:
- Topic and user goal
- Decisions made
- Open threads
- Struggles and corrections
- Artifacts (PRs, branches, design files)

### 4. Check shared record

For design/frontend work, check:

**Git:**
```bash
git log --oneline --since="7 days ago"
git branch -a | grep -i <topic>
git stash list
```

**PRs:**
- Open PRs on related files
- Recently merged PRs
- Review comments pending response

**Design files:**
- Figma branch status
- Recent version history
- Comments pending response

### 5. Verify against live state

Take PRs, branches, and Figma links surfaced and verify current status:
- Branch exists and is ahead/behind main?
- PR still open? CI status?
- Design comments resolved?

### 6. Write the brief

## Output format

**Capsule** (max 5 bullets)
- What this work is and where it stands

**Threads** (one line each, status tagged)
- `[merged #N]` — PR merged
- `[open PR #N]` — PR awaiting review
- `[in flight]` — Work in progress, not yet PR
- `[verified, uncommitted]` — Ready but not pushed
- `[reverted #N]` — Was merged, had to revert
- `[planned, not started]` — Known next step
- `[design: approved]` — Design approved, ready for dev
- `[design: review]` — Design awaiting feedback
- `[design: wip]` — Design in progress

**Problems** (max 5)
- Recurring issues
- Unresolved blockers
- Failing CI that wasn't fixed

**Next move**
- The single most useful next action, concrete

## Example output

```
**Capsule**
- Dashboard redesign: header and sidebar shipped, main content area in progress
- Using new token system, all components migrated
- Accessibility audit passed for shipped sections

**Threads**
- [merged #234] Header component with responsive nav
- [merged #235] Sidebar with collapsible sections
- [open PR #242] Main content grid layout
- [design: approved] Data visualization cards
- [in flight] Filter panel component

**Problems**
- Safari rendering glitch on sidebar collapse animation
- Filter state not persisting across navigation

**Next move**
Address Safari animation issue in PR #242 before requesting review.
```

## Guardrails

- Keep it tight and on-topic
- Read only what the in-scope threads need
- Cut detail before cutting threads
- Cite chat findings by UUID, shared-record by source
- Sanitize private context before any public output

## Reply

The brief, formatted as above.

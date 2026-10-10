---
name: ux-copy
description: "Design playbook for UX writing. Covers microcopy, error messages, labels, and UI text that helps users accomplish tasks."
---

# UX Copy

This playbook helps you write effective UI text. Good UX copy is clear, concise, helpful, and matches the user's mental model. It makes interfaces usable.

## When to Use

- Writing button labels, form labels, and placeholders
- Crafting error messages and success confirmations
- Creating empty states and onboarding text
- Reviewing and improving existing copy

## Playbook Steps

```
PLAYBOOK: UX Copy
──────────────────────────────────────

□ Step 1: Understand the context
  └─ What is the user trying to do?
  └─ What screen/flow is this copy in?
  └─ What's the user's emotional state?

□ Step 2: Gather existing patterns
  └─ Calls: /how-ui (for existing copy patterns)
  └─ What voice/tone exists in the product?
  └─ Are there content guidelines?

□ Step 3: Write for the user's task
  └─ Principle: Start from the user's task
  └─ Use action verbs for buttons
  └─ Be specific about what will happen
  └─ Match user language, not internal jargon

□ Step 4: Apply UX writing principles
  └─ Clear > clever
  └─ Concise (every word earns its place)
  └─ Useful (helps user take action)
  └─ Consistent (same terms throughout)

□ Step 5: Handle errors with care
  └─ Explain what happened (user terms)
  └─ Tell them how to fix it
  └─ Never blame the user
  └─ Offer a way forward

□ Step 6: Design empty states
  └─ Principle: States are part of the design
  └─ Explain why it's empty
  └─ Guide them to the next action
  └─ Keep it encouraging

□ Step 7: Test for clarity
  └─ Can someone understand it without context?
  └─ Is it free of jargon?
  └─ Does it pass the "so what" test?

□ Step 8: Run unslop check
  └─ Calls: /unslop
  └─ Remove AI-sounding phrases
  └─ Cut filler words
  └─ Ensure natural voice

□ Step 9: Check accessibility
  └─ Principle: Accessible by default
  └─ Screen reader will read this aloud — does it make sense?
  └─ Error messages are programmatically associated with fields?

□ Step 10: Document copy decisions
  └─ Record terminology choices
  └─ Note any intentional inconsistencies
  └─ Add to content guidelines if new pattern

□ Step 11: Record in changelog
  └─ Calls: /changelog-notetaker

EVIDENCE REQUIRED: Final copy with rationale for key decisions
```

## Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "UX copy: [component/flow]" |
| playbook_name | "ux-copy" |
| summary | What copy was written or updated |
| files | Files containing updated copy |
| evidence | Copy decisions, terminology choices |

## UX Writing Principles

### 1. Clear > Clever
```
❌ "Oops! Looks like something went sideways 🙈"
✓  "We couldn't save your changes. Please try again."
```

### 2. Be Concise
```
❌ "Click here in order to submit your form"
✓  "Submit"
```

### 3. Use Action Verbs
```
❌ "Form Submission"
✓  "Submit Form"

❌ "Account Deletion"
✓  "Delete Account"
```

### 4. Be Specific
```
❌ "Done"
✓  "Message Sent"

❌ "Continue"
✓  "Continue to Payment"
```

## Copy Patterns by Context

### Button Labels
- Use verbs: Save, Submit, Delete, Cancel
- Be specific: "Save Changes" not just "Save"
- Match the action: "Delete Account" for destructive actions
- Avoid: "Click Here", "OK", "Yes/No"

### Form Labels
```
✓ Email address
✓ Phone number (optional)
✓ Password (8+ characters)

❌ Your Email:
❌ Enter your phone
❌ Password*
```

### Error Messages

| Pattern | Example |
|---------|---------|
| **What happened** | "This email is already registered" |
| **How to fix** | "Sign in instead, or use a different email" |
| **Helpful tone** | "Check the file size and try again" |

```
❌ "Error: Invalid input"
❌ "Validation failed"
❌ "An error occurred"

✓ "Enter a valid email address (example: name@company.com)"
✓ "Password must be at least 8 characters"
✓ "This file is too large. Maximum size is 5MB"
```

### Empty States

```markdown
## No Projects Yet

You haven't created any projects.
[Create Your First Project]

---

## No Search Results

We couldn't find anything matching "xyz".
Try different keywords or [browse all items].
```

### Confirmation Messages

```
✓ "Project deleted"
✓ "Changes saved"
✓ "Email sent to team@example.com"

❌ "Success!"
❌ "Done"
❌ "Your action has been completed successfully"
```

## Voice and Tone Guidelines

### Voice (Consistent)
- Helpful, not patronizing
- Confident, not arrogant
- Professional, not stuffy
- Friendly, not silly

### Tone (Varies by Context)

| Context | Tone |
|---------|------|
| Onboarding | Encouraging, welcoming |
| Errors | Calm, solution-focused |
| Success | Brief, confirming |
| Warnings | Serious, clear |
| Help text | Patient, detailed |

## Common UX Copy Mistakes

| Mistake | Fix |
|---------|-----|
| Internal jargon | Use user language |
| Passive voice | "Your file was deleted" → "We deleted your file" |
| Vague errors | Specific, actionable message |
| Too wordy | Cut 50%, then cut again |
| Inconsistent terms | "Save" or "Submit", not both for same action |
| ALL CAPS | Sentence case for readability |

## Integration with Flash-Mode

After this playbook completes, you'll have:
- Polished copy for all UI elements
- Error messages that help users recover
- Empty states that guide next steps
- Voice/tone consistency

This feeds into: **Design Critique**, **Figma to Code**, or **Handoff Note**.

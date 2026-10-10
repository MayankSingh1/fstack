---
name: create-verification-skill
description: "Generate a project-local verification skill for frontend apps. Creates a verify-<project> skill that launches dev server, health checks, drives UI via browser automation, captures screenshots, and cleans up. Includes a feature map. Use for /create-verification-skill or when a project has no scripted way to prove UI behavior."
disable-model-invocation: true
---

# Create a verification skill

Every frontend project needs a scripted way to drive the real app and prove behavior: launch the dev server, exercise a feature the way a user would, and capture evidence. This skill generates that as a project-local skill (`.cursor/skills/verify-<project>/`) tailored to the repo.

## 1. Interview the repo

Answer these from the codebase. Only ask the user what you cannot observe:

- **Stack:** React, Vue, Svelte, Next.js, plain HTML? What's the framework and build tool?
- **Run:** How does the app start locally? Check `package.json` scripts, README, Makefile. Note the port, env vars, and any seed data or auth needed.
- **Drive:** How can an agent interact with it? Look for existing test harnesses first (Playwright, Cypress, Testing Library). If none exist, plan for Playwright with CDP.
- **Observe:** What evidence can be captured? Screenshots, console logs, network requests, DOM state.
- **Isolate:** Can two instances run side by side? Different ports, data dirs? Document any conflicts.

If the checkout doesn't build or start, fix that first before generating the skill.

## 2. Generate the skill

Write `.cursor/skills/verify-<project>/SKILL.md` with this structure:

```markdown
---
name: verify-<project>
description: "Verification skill for <project>. Launches dev server, drives UI, captures evidence."
---

# Verify <Project>

## Launch

[Exact command to start the app]
[How to tell it's ready — port responding, log line]
[Teardown command]

## Doctor

[One read-only check: is the dev server healthy?]
- Process running on expected port
- No console errors on initial load
- Expected route responds

## Drive

[The harness recipe with real selectors from this repo]
- Prefer: data-testid, ARIA labels, semantic selectors
- Avoid: coordinates, fragile CSS selectors, tab order

## Evidence

[What to capture and where]
- Screenshots: ./evidence/screenshots/
- Console logs: ./evidence/logs/
- Network: ./evidence/network/

Standards:
- Exercise the real user path, not test-only endpoints
- Capture action and resulting state
- Verify side effects (localStorage, API calls) alongside visible state

## Cleanup

[How to tear down]
- Kill only what you started (by PID, not process name)
- Remove scratch state
- Evidence survives cleanup

## Helpers

[Any scripts the skill needs, with invocation shown]
```

## 3. Seed the feature map

Create `.cursor/skills/verify-<project>/features/README.md` plus one file per user-facing feature (top 3-5).

### Feature file structure

```markdown
# <Feature Name>

## What it is
[One sentence description]

## Sub-features
- [Sub-feature 1]
- [Sub-feature 2]

## How to get to it (user POV)
1. [Step 1]
2. [Step 2]
3. [Arrival state]

## Driving it with Playwright
```javascript
// Selector strategy
await page.click('[data-testid="feature-button"]');
await expect(page.locator('.result')).toBeVisible();
```

## Observable end state
- [What proves it worked]
- [Side effects to verify]

## Gotchas
- [Edge cases]
- [Known issues]
```

### Features README structure

```markdown
# Feature Map

## Coverage

| Feature | File | Last Verified |
|---------|------|---------------|
| [Feature 1] | `feature-1.md` | [date] |
| [Feature 2] | `feature-2.md` | [date] |

## How to add a feature

1. Create `features/<feature-name>.md`
2. Follow the template structure
3. Add to this index
```

## 4. Prove the skill before handing it over

Run the generated skill end to end once:

1. Launch the dev server
2. Run doctor check
3. Drive ONE mapped feature
4. Capture evidence (screenshot)
5. Clean up
6. Verify evidence still exists after cleanup

Fix what fails. A generated skill that was never executed is a draft, not a deliverable.

## 5. Offer maintenance

Point the user at `/maintain-verification-skill` for keeping the map honest as the app changes.

## Frontend-specific patterns

### React/Next.js
```bash
# Launch
npm run dev -- --port 3456
# Ready when: "ready - started server on"
```

### Vite
```bash
# Launch
npm run dev -- --port 3456
# Ready when: "Local:" appears in output
```

### Playwright drive
```javascript
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3456');
await page.screenshot({ path: './evidence/screenshots/home.png' });
```

### Evidence capture
```javascript
// Console logs
page.on('console', msg => console.log(msg.text()));

// Network requests
page.on('request', req => console.log(req.url()));

// Screenshot with timestamp
const ts = new Date().toISOString().replace(/[:.]/g, '-');
await page.screenshot({ path: `./evidence/screenshots/${ts}.png` });
```

## Integration with fstack

This skill is called when:
- A project has no scripted verification
- User asks for a way to prove UI behavior
- Before major refactors (to establish baseline)
- Setting up a new frontend project

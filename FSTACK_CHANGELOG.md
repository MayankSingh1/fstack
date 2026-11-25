# fstack Changelog

## 2026-11-25 · Redesign after alyn.dev: fstack website

**Playbook:** wireframe-to-hifi · **Reference:** https://alyn.dev/ (inspected: content, computed styles, full-page captures)

### Summary
Restyled the site on alyn.dev's patterns with fstack's own content and visuals: cool grey palette
(#F5F6F7 / #02070A), Inter at weight 500 with tight tracking, floating glass-pill nav, rounded sky
hero panel (original CSS gradient, no copied imagery) with giant wordmark, floating helper chips and
popular-playbook cards, two-tone headings, role cards, bento feature cards, a five-column skill index,
two-column FAQ and a sky CTA. No invented stars or install counts; every number comes from skill.json.

### Files changed
- `site/src/pages/index.astro`, `site/src/pages/skills/index.astro` (adds `?role=`)
- `site/src/layouts/Base.astro`, `site/src/styles/global.css`, `site/src/lib/skills.ts` (roles, step counts)

### Evidence
- 1440 light/dark and 390/768: no horizontal scroll, nav fits, no console errors.
- Agent tabs update command and path; `/skills?role=frontend` → 8, clear → 65, unknown role → 65.

## 2026-11-25 · Minimal redesign: fstack website home page

**Playbook:** wireframe-to-hifi (direction set without live Awwwards references: awwwards.com reset the connection from this environment)

### Summary
Replaced the dark "darkroom" home page with a light, minimal "spec sheet" layout built for scanning:
label-left / content-right sections, one sans typeface, one accent colour, system light/dark.

### Structure
Hero (headline + install card with agent picker) → stats → How it works (3 steps + router demo)
→ Why it helps (without/with table) → All 65 skills (role presets, kind filter, search, first 12 then "Show all")
→ Questions → CTA.

### Removed
Flash wall, agent marquee, scroll-lit manifesto, before/after stepper, giant wordmark, grain overlay,
Unbounded and Instrument Serif fonts, `VerifiedStepper.astro`, `InstallTabs.astro`.

### Files changed
- `site/src/pages/index.astro`
- `site/src/styles/global.css`, `site/src/layouts/Base.astro`, `site/src/components/RouterDemo.astro`
- deleted `site/src/components/VerifiedStepper.astro`, `site/src/components/InstallTabs.astro`

### Evidence
- Page height 11,341px → 4,294px (desktop), 12,583px → 6,259px (390px).
- Light and dark at 1440 and 390: no horizontal scroll, no console errors.
- Agent picker updates command, copy target and path; role Frontend → 8, + Helpers → 1, "figma" → 2,
  no-match → empty state, reset → 65; "Show all" reveals 65.

## 2026-11-25 · User flows & IA: fstack website home page

**Playbook:** user-flows-ia · **Version:** 1.2.0

### Summary
Restructured the landing page around the four things a visitor comes to do:
understand fstack, check it fits their role, install it, and find a skill.
Reordered existing sections instead of rewriting them (smallest change that works).

### Key user tasks
1. Understand what fstack is → Hero (00), Problem (02)
2. Check it fits my role → Who it's for (01), moved up from 06, each role now links into the catalog
3. Install → Hero command, Install (06), nav "Install"
4. Find a skill → Inside the stack (05): stats strip, playbooks, helpers (new), principles; nav "Skills" moved first

### Sitemap
```
/                         Home
├── #for                  (01) Who it's for  → /skills?group=design | /skills/ux-copy | /skills/design-system | /skills?group=frontend
├── (02) The problem
├── #router               (03) The router
├── #verified             (04) Before / after
├── #playbooks            (05) Inside the stack
│   ├── #playbook-index   (05.1) Playbooks   → /skills?group=<group>, /skills/<slug>
│   ├── #helpers          (05.2) Helpers     → /skills/<slug>   (new on home)
│   └── #principles       (05.3) Principles  → /skills/<slug>
├── #install              (06) Install
├── #faq                  (07) Questions
└── (08) Open source      → GitHub, issues
/skills                   Catalog (?group=router|design|frontend|shipping|session|advanced|helper|principle, ?q=)
└── /skills/<slug>        65 skill pages
/docs                     README rendered with contents sidebar
```

### User flows
```
(Visitor) → Home hero
    ├─ Copy install command ─────────────▶ (Installed)
    ├─ Pick a role (01) ─▶ /skills?group=… ─▶ /skills/<slug> ─▶ Copy install ─▶ (Installed)
    ├─ Scroll: problem → router → proof → inside ─▶ Install (06) ─▶ (Installed)
    └─ Nav "Skills" ─▶ /skills ─▶ search / filter
                         ├─ results ─▶ /skills/<slug>
                         └─ no results ─▶ empty state ─▶ "clearing the filters" ─▶ all 65
```

### States
- Catalog: unknown `?group=` falls back to All; empty search shows a reset action; filter choice is written to the URL so it can be shared.
- Theme: every page now defaults to dark to match the home page; Docs and Skills keep the light/dark toggle.

### Files changed
- `site/src/pages/index.astro`
- `site/src/pages/skills/index.astro`
- `site/src/layouts/Base.astro`

### Evidence
- Browser check (Playwright, 1440px and 390px): no horizontal scroll, no console errors, no broken in-page anchors.
- `/skills?group=design` → 6 results with Design pressed; `?group=bogus` → all 65; `?q=zzzz` → empty state visible.
- Keyboard tab order: skip link → nav → install → roles → router demo → stepper → stats → playbooks, in reading order.

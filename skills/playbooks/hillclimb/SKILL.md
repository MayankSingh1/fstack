---
name: hillclimb
description: "Sustained improvement of one metric against a target. Measure, change one thing, measure again. Repeat until target is met. Use for 'improve X metric', 'get Y below Z', or sustained optimization work."
disable-model-invocation: true
---

# Hillclimb Playbook

Systematic, sustained improvement of one metric until a target is reached. Each iteration changes one thing and measures the result.

## Phases

```
□ Phase 1: Define the metric and target
□ Phase 2: Measure baseline
□ Phase 3: Identify opportunities
□ Phase 4: Run improvement iterations
□ Phase 5: Lock in the gains
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Define the Metric and Target

### Be specific

| Vague | Specific |
|-------|----------|
| "Make it faster" | "LCP under 2.5s on 3G" |
| "Improve accessibility" | "axe-core violations = 0" |
| "Better bundle size" | "Initial JS < 200KB gzipped" |
| "Reduce re-renders" | "< 3 renders per user action" |

### Metric requirements

- **Measurable:** Can be captured with a tool or script
- **Reproducible:** Same conditions give same result
- **Meaningful:** Connects to user experience
- **Automated:** Can be checked in CI eventually

### Define the target

```markdown
**Metric:** Lighthouse Performance Score
**Current:** 45
**Target:** 90
**Why:** User complaints about slow load times
**Constraint:** Cannot break existing functionality
```

## Phase 2: Measure Baseline

Establish reproducible baseline measurement.

### Measurement script

Create a repeatable measurement:

```bash
#!/bin/bash
# measure.sh

# Lighthouse
npx lighthouse http://localhost:3000 --output json --quiet | jq '.categories.performance.score * 100'

# Bundle size
du -sk .next/static/chunks/*.js | sort -n | tail -10

# Render count (custom script)
npm run test:render-count
```

### Multiple samples

Run 3-5 measurements, report median:

```markdown
**Baseline — [Date]**

| Run | Score |
|-----|-------|
| 1 | 44 |
| 2 | 46 |
| 3 | 45 |
| **Median** | **45** |
```

## Phase 3: Identify Opportunities

List potential improvements ranked by impact.

### Analysis tools

| Metric | Analysis Tool |
|--------|---------------|
| Lighthouse score | Lighthouse opportunities/diagnostics |
| Bundle size | webpack-bundle-analyzer |
| Render performance | React Profiler |
| Accessibility | axe DevTools |
| CSS size | PurgeCSS analysis |

### Opportunity format

```markdown
| Opportunity | Est. Impact | Effort | Priority |
|-------------|-------------|--------|----------|
| Lazy load images | +10 points | Low | 1 |
| Code split routes | +15 points | Medium | 2 |
| Remove unused CSS | +5 points | Low | 3 |
| Optimize renders | +8 points | High | 4 |
```

### Prioritization

Score = (Estimated Impact) / (Effort)

Start with highest score. One change at a time.

## Phase 4: Run Improvement Iterations

Each iteration is one change with measurement.

### Iteration format

```markdown
## Iteration [N]: [Change Description]

**Hypothesis:** [This change] will improve [metric] by [estimate] because [reason]

**Change:**
- [What was changed]
- [Files affected]

**Measurement:**
| Run | Before | After |
|-----|--------|-------|
| 1 | 45 | 52 |
| 2 | 46 | 51 |
| 3 | 45 | 53 |
| **Median** | **45** | **52** |

**Result:** +7 points ✓ (or ✗ if no improvement)

**Cumulative:** 45 → 52 (target: 90)
```

### Decision rules

| Result | Action |
|--------|--------|
| Improved metric | Keep change, continue |
| No change | Revert, try next opportunity |
| Regression | Revert immediately |
| Side effects | Evaluate trade-off, document |

### Progress tracking

```markdown
| Iteration | Change | Before | After | Cumulative |
|-----------|--------|--------|-------|------------|
| 1 | Lazy images | 45 | 52 | 52 |
| 2 | Code split | 52 | 67 | 67 |
| 3 | Remove CSS | 67 | 72 | 72 |
| ... | ... | ... | ... | ... |
```

## Phase 5: Lock in the Gains

Once target is reached, prevent regression.

### Add CI check

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    budgetPath: ./budget.json
    temporaryPublicStorage: true
```

### Budget file

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}]
      }
    }
  }
}
```

### Document the floor

```markdown
## Performance Budget

| Metric | Floor | Current | Target |
|--------|-------|---------|--------|
| Performance Score | 85 | 92 | 90 |
| LCP | 2.5s | 1.8s | 2.0s |
| Bundle Size | 250KB | 180KB | 200KB |

CI will fail if any metric drops below floor.
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Hillclimb: [metric] to [target]" |
| playbook_name | "hillclimb" |
| summary | Iterations run, final value achieved |
| files | All changed files across iterations |
| evidence | Before/after measurements, CI integration |

## Output Format

```markdown
## Hillclimb Complete: [Metric] → [Target]

**Start:** [baseline value]
**End:** [final value]
**Target:** [target value]
**Status:** ✓ Target reached / ✗ Target not reached

### Iterations Summary

| # | Change | Impact |
|---|--------|--------|
| 1 | [change] | +N |
| 2 | [change] | +N |
| ... | ... | ... |

### What Worked
- [Change that had most impact]
- [Another effective change]

### What Didn't Work
- [Change that was reverted]
- [Another reverted change]

### Regression Prevention
- CI check added: [description]
- Budget file: [path]
```

## Common Hillclimb Targets

| Metric | Tools | Common Improvements |
|--------|-------|---------------------|
| Lighthouse Score | Lighthouse CLI | Images, code splitting, CSS |
| Bundle Size | webpack-bundle-analyzer | Tree shaking, lazy loading |
| Render Count | React Profiler | Memoization, context splitting |
| a11y Violations | axe-core | Labels, contrast, focus |
| Test Coverage | Jest coverage | Add missing tests |
| Type Coverage | typescript-coverage | Remove any, add types |

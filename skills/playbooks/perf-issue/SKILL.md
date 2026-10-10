---
name: perf-issue
description: "Diagnose and fix performance issues with before/after measurements. Use Lighthouse, Web Vitals, React profiler, or custom metrics. Use for 'this is slow', 'performance issue', or 'optimize this'."
disable-model-invocation: true
---

# Performance Issue Playbook

Systematic approach to diagnosing and fixing performance issues with measured evidence.

## Phases

```
□ Phase 1: Measure baseline
□ Phase 2: Identify the bottleneck
□ Phase 3: Hypothesize cause
□ Phase 4: Fix and measure
□ Phase 5: Verify improvement
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Measure Baseline

Get concrete numbers before changing anything.

### Tools by problem type

| Symptom | Tool |
|---------|------|
| Page load slow | Lighthouse, WebPageTest |
| Interaction slow | Chrome DevTools Performance |
| React renders slow | React DevTools Profiler |
| Bundle large | webpack-bundle-analyzer, source-map-explorer |
| Memory issues | Chrome Memory tab |
| Animation jank | DevTools Performance (FPS) |

### Lighthouse baseline

```bash
# CLI
npx lighthouse http://localhost:3000 --output json --output-path ./baseline.json

# Or in Chrome DevTools > Lighthouse
```

Capture:
- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

### React Profiler baseline

1. Open React DevTools Profiler
2. Click Record
3. Perform the slow action
4. Stop recording
5. Screenshot the flamegraph
6. Note render times and commit counts

### Bundle baseline

```bash
# Next.js
npx @next/bundle-analyzer

# Generic webpack
npx webpack-bundle-analyzer stats.json
```

Capture:
- Total bundle size
- Largest chunks
- Duplicate dependencies

### Document baseline

```markdown
**Baseline Measurements — [Date]**

| Metric | Value |
|--------|-------|
| Lighthouse Performance | 45 |
| LCP | 4.2s |
| TBT | 890ms |
| Component render time | 340ms |
| Bundle size | 1.2MB |
```

## Phase 2: Identify the Bottleneck

Find where time is actually being spent.

### Performance panel workflow

1. Open DevTools → Performance
2. Click Record
3. Perform the slow action
4. Stop recording
5. Look at:
   - Main thread (long tasks in red)
   - Network waterfall
   - Frame rate

### React Profiler workflow

1. Record a slow interaction
2. Sort components by render time
3. Look for:
   - Components rendering unnecessarily
   - Expensive computations in render
   - Large component trees re-rendering

### Common bottleneck patterns

| Pattern | Indicator |
|---------|-----------|
| Too many re-renders | Same component appears many times in Profiler |
| Expensive computation | Long "Rendering" time in single component |
| Layout thrashing | Purple "Layout" events in Performance panel |
| Large bundle | JS parsing/compile time in Performance |
| Waterfall requests | Sequential network requests |

## Phase 3: Hypothesize Cause

Form a testable hypothesis about the cause.

### Common causes by symptom

**Slow initial load:**
- Large bundle size
- Unoptimized images
- Render-blocking resources
- Too much client-side work

**Slow interactions:**
- Unnecessary re-renders
- Missing memoization
- Expensive computations
- Layout thrashing

**Janky animations:**
- Animating wrong properties (layout vs. transform)
- Too much work per frame
- Forced synchronous layout

### Hypothesis format

```markdown
**Hypothesis:** [Component X] re-renders on every [event] because [reason]
**Test:** Add React.memo to [Component X] and measure render count
**Expected outcome:** Render count drops from N to M
```

## Phase 4: Fix and Measure

Make one change, measure, repeat.

### React optimization patterns

```tsx
// Memoize expensive computations
const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components
const MemoizedChild = React.memo(Child);

// Lazy load components
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

### Bundle optimization patterns

```tsx
// Dynamic import
const HeavyFeature = dynamic(() => import('./HeavyFeature'), {
  loading: () => <Skeleton />,
});

// Code split routes
const routes = {
  '/dashboard': lazy(() => import('./pages/Dashboard')),
  '/settings': lazy(() => import('./pages/Settings')),
};
```

### After each fix

Re-run the same measurement from Phase 1:

```markdown
**After Fix: [Description]**

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| LCP | 4.2s | 2.1s | -50% |
| Render time | 340ms | 120ms | -65% |
```

## Phase 5: Verify Improvement

Confirm the fix actually helped.

### Verification checklist

| Check | Pass? |
|-------|-------|
| Target metric improved | |
| No regressions in other metrics | |
| Functionality still works | |
| Edge cases still work | |
| Different devices/browsers | |

### Compare before/after

```markdown
## Performance Improvement Summary

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| LCP | 4.2s | 2.1s | < 2.5s | ✓ |
| TBT | 890ms | 200ms | < 300ms | ✓ |
| Bundle | 1.2MB | 0.8MB | < 1MB | ✓ |
```

### Evidence required

- Before/after Lighthouse reports
- Before/after Profiler screenshots
- Before/after bundle analysis
- Test that functionality works

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Performance: [what was optimized]" |
| playbook_name | "perf-issue" |
| summary | Improvement achieved with metrics |
| files | Changed files |
| evidence | Before/after measurements |

## Output Format

```markdown
## Performance Fix Complete

**Problem:** [What was slow]
**Cause:** [Root cause identified]
**Fix:** [What was changed]

### Measurements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| ... | ... | ... | ... |

### Changes Made
- [File]: [What changed]
- ...

### Verification
- ✓ Target metrics improved
- ✓ No regressions
- ✓ Functionality verified
```

## Tools Reference

| Tool | Use For |
|------|---------|
| Lighthouse | Overall page performance |
| Web Vitals | Core metrics (LCP, FID, CLS) |
| React DevTools Profiler | Component render times |
| Chrome Performance | Detailed timeline |
| webpack-bundle-analyzer | Bundle composition |
| why-did-you-render | Unnecessary re-renders |

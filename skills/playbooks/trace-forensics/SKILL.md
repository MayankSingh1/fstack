---
name: trace-forensics
description: "Diagnose issues from captured profiling artifacts: Chrome traces, React Profiler exports, Lighthouse reports, performance recordings. Use for 'analyze this trace', 'what's in this profile', or post-mortem performance analysis."
disable-model-invocation: true
---

# Trace Forensics Playbook

Analyze captured profiling artifacts to diagnose issues after the fact.

## Phases

```
□ Phase 1: Identify the artifact type
□ Phase 2: Load and orient
□ Phase 3: Find the hotspots
□ Phase 4: Diagnose root cause
□ Phase 5: Recommend fixes
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Identify the Artifact Type

### Supported artifact types

| Artifact | File | Tool to Open |
|----------|------|--------------|
| Chrome Performance trace | `.json` (large) | DevTools Performance |
| React Profiler export | `.json` | React DevTools |
| Lighthouse report | `.json` or `.html` | Lighthouse Viewer |
| webpack stats | `stats.json` | webpack-bundle-analyzer |
| Coverage report | `coverage-final.json` | Istanbul/NYC |
| Memory snapshot | `.heapsnapshot` | DevTools Memory |

### Quick identification

```bash
# Check file structure
head -c 1000 artifact.json | jq 'keys' 2>/dev/null

# Chrome trace has "traceEvents"
# React Profiler has "version" and "dataForRoots"
# Lighthouse has "lighthouseVersion"
# webpack stats has "assets" and "chunks"
```

## Phase 2: Load and Orient

### Chrome Performance Trace

1. DevTools → Performance
2. Click load (↑) icon
3. Select the `.json` file
4. Orient:
   - Top: Summary timeline
   - Middle: Main thread activity
   - Bottom: Detailed breakdown

### React Profiler Export

1. React DevTools → Profiler
2. Click import (↓) icon
3. Select the `.json` file
4. Orient:
   - Left: Commit list
   - Right: Flamegraph or Ranked view

### Lighthouse Report

```bash
# View in browser
npx lighthouse-viewer report.json

# Or upload to https://googlechrome.github.io/lighthouse/viewer/
```

### webpack Stats

```bash
npx webpack-bundle-analyzer stats.json
```

## Phase 3: Find the Hotspots

### Chrome trace analysis

**Long Tasks:**
- Look for red bars on the main thread
- Tasks > 50ms block user input
- Zoom in on the longest tasks

**Categories to check:**
| Color | Meaning |
|-------|---------|
| Yellow | JavaScript |
| Purple | Layout/Reflow |
| Green | Paint |
| Gray | Idle |

**Key metrics:**
- Total Blocking Time (TBT)
- Time to Interactive (TTI)
- Scripting time breakdown

### React Profiler analysis

**Commit analysis:**
- Sort by duration (longest first)
- Look for unexpected re-renders
- Check "Why did this render?" reasons

**Component analysis:**
- Find components appearing in multiple commits
- Look for large "Self time" values
- Check for missing memoization signals

### Lighthouse analysis

**Priority order:**
1. Opportunities (most impact)
2. Diagnostics (specific issues)
3. Passed audits (confirm good state)

## Phase 4: Diagnose Root Cause

### Pattern recognition

**Symptoms in Chrome trace:**

| Pattern | Diagnosis |
|---------|-----------|
| Repeating yellow blocks | Infinite/excessive re-renders |
| Large purple blocks | Layout thrashing |
| Long single yellow block | Expensive computation |
| Many small yellow gaps | Too many small tasks |
| Green spikes | Expensive paints |

**Symptoms in React Profiler:**

| Pattern | Diagnosis |
|---------|-----------|
| Same component, every commit | Missing memoization |
| "Props changed" always | Parent creating new references |
| "Context changed" | Context value not memoized |
| Deep tree in flamegraph | Too much in single render |

**Symptoms in Lighthouse:**

| Finding | Diagnosis |
|---------|-----------|
| Large JS bundles | Code splitting needed |
| Render-blocking resources | Defer/async scripts |
| Large images | Optimization needed |
| Long main-thread work | Heavy computation |

### Build the narrative

```markdown
**Timeline of issue:**
1. User clicks [action]
2. Event handler triggers state update
3. State update causes [N] components to re-render
4. One component ([Name]) takes [X]ms to render
5. Total blocking time: [Y]ms

**Root cause:**
[Component] has expensive computation in render body without memoization
```

## Phase 5: Recommend Fixes

### Prioritized recommendations

```markdown
## Recommended Fixes

### High Impact
1. **[Issue]**: [Fix]
   - Location: `path/to/file.tsx:123`
   - Expected improvement: [X]ms reduction
   - Effort: Low/Medium/High

### Medium Impact
2. **[Issue]**: [Fix]
   ...

### Low Impact / Future
3. **[Issue]**: [Fix]
   ...
```

### Fix patterns by diagnosis

**For expensive render:**
```tsx
// Before
const Component = ({ data }) => {
  const processed = expensiveProcess(data);
  return <div>{processed}</div>;
};

// After
const Component = ({ data }) => {
  const processed = useMemo(() => expensiveProcess(data), [data]);
  return <div>{processed}</div>;
};
```

**For excessive re-renders:**
```tsx
// Before
const Parent = () => {
  const [state, setState] = useState();
  return <Child data={{ value: state }} />;
};

// After
const Parent = () => {
  const [state, setState] = useState();
  const data = useMemo(() => ({ value: state }), [state]);
  return <MemoizedChild data={data} />;
};
```

**For layout thrashing:**
```tsx
// Before
elements.forEach(el => {
  el.style.width = el.offsetWidth + 'px'; // read/write/read/write
});

// After
const widths = elements.map(el => el.offsetWidth); // batch reads
elements.forEach((el, i) => {
  el.style.width = widths[i] + 'px'; // batch writes
});
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Trace analysis: [artifact type]" |
| playbook_name | "trace-forensics" |
| summary | Key findings and recommendations |
| files | Artifact file path, recommendation doc |
| evidence | Screenshots of hotspots |

## Output Format

```markdown
## Trace Analysis Complete

**Artifact:** [file name and type]
**Captured:** [date if known]
**Duration:** [trace duration]

### Key Findings

| Issue | Location | Impact | Fix |
|-------|----------|--------|-----|
| [Finding 1] | file:line | [X]ms | [Solution] |
| [Finding 2] | file:line | [Y]ms | [Solution] |

### Timeline Narrative
[What happened, step by step]

### Recommendations
1. [Most impactful fix]
2. [Second priority fix]
...

### Artifacts
- Annotated screenshot: [path]
- Full analysis: [path]
```

## Tool Quick Reference

| Need | Command |
|------|---------|
| View Chrome trace | Open DevTools → Performance → Load |
| View React profile | Open React DevTools → Profiler → Import |
| View Lighthouse | `npx lighthouse-viewer report.json` |
| View bundle | `npx webpack-bundle-analyzer stats.json` |
| Generate Chrome trace | DevTools Performance → Record → Export |
| Generate React profile | React DevTools → Profiler → Export |

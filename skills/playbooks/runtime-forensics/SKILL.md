---
name: runtime-forensics
description: "Diagnose live runtime symptoms: memory leaks, CPU spin, unresponsive UI, infinite loops. Use for 'the app is frozen', 'memory keeps growing', 'CPU is maxed', or debugging live runtime issues."
disable-model-invocation: true
---

# Runtime Forensics Playbook

Diagnose and fix live runtime symptoms: memory leaks, CPU spin, frozen UI, infinite loops.

## Phases

```
□ Phase 1: Capture the symptom
□ Phase 2: Reproduce reliably
□ Phase 3: Isolate the cause
□ Phase 4: Fix and verify
□ Phase 5: Prevent recurrence
□ Phase 6: Record in changelog
  └─ Calls: /changelog-notetaker
```

## Phase 1: Capture the Symptom

Document exactly what's happening.

### Symptom checklist

| Symptom | Indicators |
|---------|------------|
| Memory leak | Memory grows over time, eventual crash |
| CPU spin | Fan loud, process using 100% CPU |
| Frozen UI | Clicks don't respond, animations stuck |
| Infinite loop | Console flooding, never finishes |
| Render storm | React Profiler shows continuous renders |

### Initial capture

```markdown
**Symptom:** [What's happening]
**When:** [What action triggers it]
**Frequency:** [Always / Sometimes / After N minutes]
**Browser:** [Which browser(s)]
**Console errors:** [Any errors visible]
```

### Quick diagnostics

```javascript
// Memory check
console.log('Heap:', performance.memory?.usedJSHeapSize / 1024 / 1024, 'MB');

// Long task check
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long task:', entry.duration, 'ms');
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

## Phase 2: Reproduce Reliably

Create minimal reproduction steps.

### Reproduction format

```markdown
**Steps to reproduce:**
1. Open [page]
2. [Action]
3. Wait [time] or [repeat action N times]
4. Observe: [symptom]

**Environment:**
- Browser: Chrome 120
- React: 18.2.0
- Node: 20.x
```

### Isolation questions

- Does it happen in incognito? (Extensions?)
- Does it happen in other browsers?
- Does it happen in production only? (Build issue?)
- Does it happen after specific actions? (Event handler?)
- Does it grow over time? (Accumulation?)

## Phase 3: Isolate the Cause

Use the right tool for the symptom.

### Memory Leaks

**Tool:** Chrome DevTools → Memory tab

```markdown
1. Take heap snapshot (baseline)
2. Perform leaking action
3. Take heap snapshot
4. Compare snapshots (select "Comparison")
5. Look for objects that shouldn't exist
```

**Common React memory leak causes:**
- Event listeners not removed on unmount
- setInterval/setTimeout not cleared
- Subscriptions not unsubscribed
- References in closures keeping objects alive
- Refs to removed DOM elements

**Detection pattern:**
```tsx
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  
  // LEAK if missing:
  return () => window.removeEventListener('resize', handler);
}, []);
```

### CPU Spin / Infinite Loops

**Tool:** Chrome DevTools → Performance tab

```markdown
1. Start recording
2. Trigger the issue
3. Stop recording
4. Look at Main thread - find the repeating work
5. Zoom into the longest task
```

**Common causes:**
- useEffect with wrong dependencies causing re-trigger
- State update in render causing re-render
- Recursive function without base case
- Event handler triggering itself

**Detection pattern:**
```tsx
// INFINITE LOOP: effect triggers itself
useEffect(() => {
  setCount(count + 1); // count in deps, setCount changes count
}, [count]);

// FIXED: use functional update
useEffect(() => {
  setCount(c => c + 1);
}, []); // Run once
```

### Frozen UI / Long Tasks

**Tool:** Chrome DevTools → Performance tab with CPU throttling

```markdown
1. Enable 4x CPU slowdown
2. Record the interaction
3. Look for long tasks (> 50ms, shown in red)
4. Expand to find the expensive operation
```

**Common causes:**
- Expensive computation in render
- Large list rendering without virtualization
- Synchronous heavy operations
- Layout thrashing (read/write/read/write DOM)

### Render Storms

**Tool:** React DevTools → Profiler

```markdown
1. Enable "Record why each component rendered"
2. Start recording
3. Trigger the issue
4. Stop and analyze
5. Look for components rendering repeatedly
```

**Common causes:**
- Context value changing reference every render
- Parent re-rendering with new object/array props
- Missing memoization
- State lifting too high

## Phase 4: Fix and Verify

Apply the fix and prove it works.

### Memory leak fixes

```tsx
// Cleanup subscriptions
useEffect(() => {
  const subscription = dataSource.subscribe(handleData);
  return () => subscription.unsubscribe();
}, []);

// Cleanup event listeners
useEffect(() => {
  const handler = () => {};
  element.addEventListener('scroll', handler);
  return () => element.removeEventListener('scroll', handler);
}, []);

// Cleanup timers
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id);
}, []);
```

### Infinite loop fixes

```tsx
// Use refs for values that shouldn't trigger re-render
const countRef = useRef(0);
useEffect(() => {
  countRef.current += 1;
}, [someDep]);

// Use functional updates
setItems(prev => [...prev, newItem]);

// Break circular dependencies
const memoizedValue = useMemo(() => compute(dep), [dep]);
```

### Verification

```markdown
**Before fix:**
- Memory: Grew 10MB per minute
- CPU: Sustained 100%
- Renders: 500/second

**After fix:**
- Memory: Stable at 50MB
- CPU: Idle at 2%
- Renders: 3 per interaction

**Test duration:** 10 minutes without regression
```

## Phase 5: Prevent Recurrence

Add checks to catch this class of issue.

### ESLint rules

```javascript
// .eslintrc.js
{
  'react-hooks/exhaustive-deps': 'error',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'CallExpression[callee.name="setInterval"]',
      message: 'Use useInterval hook with cleanup'
    }
  ]
}
```

### Testing patterns

```tsx
// Memory leak test
it('cleans up subscriptions on unmount', () => {
  const unsubscribe = jest.fn();
  jest.spyOn(dataSource, 'subscribe').mockReturnValue({ unsubscribe });
  
  const { unmount } = render(<Component />);
  unmount();
  
  expect(unsubscribe).toHaveBeenCalled();
});
```

## Phase 6: Record in Changelog

Call `/changelog-notetaker` with:

| Field | Value |
|-------|-------|
| task_name | "Runtime fix: [symptom]" |
| playbook_name | "runtime-forensics" |
| summary | Root cause and fix applied |
| files | Changed files |
| evidence | Before/after measurements |

## Output Format

```markdown
## Runtime Issue Fixed

**Symptom:** [What was happening]
**Root cause:** [Why it was happening]
**Fix:** [What was changed]

### Diagnosis
[Tool used, what it showed]

### Evidence
| Metric | Before | After |
|--------|--------|-------|
| Memory | +10MB/min | Stable |
| CPU | 100% | 2% |

### Prevention
- [Lint rule added]
- [Test added]

### Files Changed
- [file]: [what changed]
```

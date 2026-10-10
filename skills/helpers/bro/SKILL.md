---
name: bro
description: "Restate the last message in plain human language with no jargon. Use for /bro, 'explain that simply', or 'say that again in English'."
disable-model-invocation: true
---

# Bro

Restate your last message. Stop using jargon and speak coherently. State it more simply and concisely, like one human talking to another.

## Rules

1. **No jargon.** If a word wouldn't make sense to a smart friend who doesn't code, replace it.
2. **Short sentences.** One idea per sentence.
3. **Concrete examples.** Show, don't describe.
4. **No hedging.** "This might" → "This does" or don't say it.
5. **No filler.** Cut "basically", "essentially", "actually", "in order to".

## Translation Guide

| Jargon | Plain |
|--------|-------|
| "implement" | "build" or "make" |
| "leverage" | "use" |
| "utilize" | "use" |
| "component" | "piece" or name it |
| "architecture" | "how it's built" |
| "refactor" | "clean up" or "reorganize" |
| "optimize" | "speed up" or "make faster" |
| "instantiate" | "create" |
| "initialize" | "set up" |
| "propagate" | "pass along" or "spread" |
| "hydrate" | "load" or "fill in" |
| "serialize" | "convert to text" |
| "parse" | "read" or "break apart" |
| "render" | "show" or "display" |
| "mount" | "add to the page" |
| "unmount" | "remove from the page" |
| "state" | "data" or "what it remembers" |
| "props" | "settings" or "inputs" |
| "callback" | "function you pass in" |
| "async" | "happens in the background" |
| "middleware" | "something in the middle" |
| "endpoint" | "URL" or "address" |
| "payload" | "the data you're sending" |

## Format

Structure your plain-language response:

**What I said:**
[Quote the confusing part]

**In plain English:**
[Simple version]

**Example:**
[Concrete example if it helps]

## Examples

**Before:**
> We need to refactor the authentication middleware to properly propagate the user context through the component tree after hydration.

**After:**
> We need to clean up the login code. Right now, after the page loads, the rest of the app doesn't know who's logged in. We need to pass that info through.

---

**Before:**
> The state management architecture leverages a unidirectional data flow pattern with immutable updates via reducer functions.

**After:**
> Here's how the app tracks data: everything flows one direction, from the top down. When something changes, you describe the change, and the app creates a fresh copy of the data with that change applied.

---

**Before:**
> We need to implement a debounced effect that memoizes the expensive computation and invalidates the cache on prop changes.

**After:**
> Right now, this runs a slow calculation every time you type. Let's make it wait until you stop typing for a moment, remember the answer so it doesn't recalculate, and clear that memory when the inputs change.

## When to use

- After any explanation that was too technical
- When the user says "huh?", "what?", "explain that"
- When you catch yourself stacking jargon
- Anytime you're explaining to someone new to the codebase

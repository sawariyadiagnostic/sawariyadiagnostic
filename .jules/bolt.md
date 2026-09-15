## 2024-05-18 - Deferring search with useDeferredValue

**Learning:** When building responsive search components with frequent keystrokes (like Fuse.js fuzzy search), tying the heavy filter operations directly to the input state (`searchQuery`) causes layout thrashing and prevents the browser from responding immediately to the user typing.
**Action:** Use Reacts `useDeferredValue(searchQuery)` for expensive search/filter iterations while keeping the input firmly bound to the raw `searchQuery`. This guarantees typing stays fast, while the DOM update for the filtered list queues behind.


## 2024-05-18 - Deferring Expensive Client-Side Searches
**Learning:** Using `fuse.js` on every keystroke blocks the main thread in React causing sluggish input rendering.
**Action:** Always wrap the search query for expensive filtering (like `fuse.js` or large list filtering) using `useDeferredValue(query)`. This keeps inputs extremely responsive while delaying the heavy lifting until the main thread is idle, a pattern particularly important for mobile users and low-end devices.

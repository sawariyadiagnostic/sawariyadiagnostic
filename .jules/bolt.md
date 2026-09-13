## 2023-11-20 - [Frontend] Deferred Value for Search Query

**Learning:** When dealing with heavy client-side searching operations such as `Fuse.js` executing on potentially large arrays within rendering loops (React), directly triggering the search off the `useState` input results in perceptible UI lag during rapid typing.

**Action:** Wrap user input strings directly driving heavy searches with `useDeferredValue`. Let React run the slow `searchEngine.search` in a background-like transition context, ensuring text input responsiveness stays instantaneous.

## 2023-11-06 - TestCatalog debounced search input
**Learning:** In the TestCatalog component, typing into the search box synchronously updates the state and executes `fuse.search()`. Fuse.js is fast, but re-rendering the list with every keystroke can block the main thread and feel sluggish on mobile devices with large catalogs.
**Action:** Implemented a custom `useDebounce` hook and applied it to the `searchQuery` variable used in the `useMemo` search filter. This delays the execution of the search until 300ms after the user stops typing, reducing unnecessary re-renders.

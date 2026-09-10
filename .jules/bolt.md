## 2025-02-28 - Avoid Array Mapping Inside Render Loops

**Learning:** In `src/components/TestCatalog.tsx`, calculating a maximum value (`Math.max(...packages.map(...))`) inside the `filteredPackages.map` iteration created an O(N^2) complexity path. Because the component's state updates on every keystroke (via the `searchQuery` state), this caused significant main thread blocking and unnecessary recalculations for each list item on every render.

**Action:** Always verify if iterative calculations (like finding max/min or filtering) within a rendering map (`.map()`) can be extracted to a single `useMemo` block outside the map. This reduces complexity from O(N^2) to O(N) and caches the result across renders unless dependencies change.

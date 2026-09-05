## 2024-05-24 - Deferring input values for heavy lists
**Learning:** In highly interactive React apps featuring fuzzy search over moderately large data sets (like TestCatalog with 180+ tests), maintaining input responsiveness is crucial. Debouncing the actual onChange handler breaks controlled inputs where the state directly reflects what the user sees.
**Action:** Use `useDeferredValue` on the query state when calculating filtered lists with `useMemo`. This allows the text input to update instantly while the heavy filtering operation yields to the main thread.

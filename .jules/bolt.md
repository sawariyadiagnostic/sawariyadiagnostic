
## 2023-10-27 - React.memo on Mapped Components
**Learning:** In a single page application passing stable state setters to mapped child components, not using `React.memo` causes unnecessary re-renders of the entire list when unrelated state in the parent changes. Furthermore, using inline arrow functions in props defeats the purpose of `React.memo` by breaking reference equality on every render.
**Action:** When rendering long lists of components (e.g. `TestCard` in a catalog), wrap the component in `React.memo` and ensure that the callback props passed to it are stable (like the direct `setState` functions or those wrapped in `useCallback`), rather than inline arrow functions.

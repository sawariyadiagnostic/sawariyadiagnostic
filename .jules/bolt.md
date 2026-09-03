## 2024-05-24 - Stable Prop References in React
**Learning:** When using React.memo to optimize list items, inline arrow functions in the parent component create new references on every render, defeating the memoization.
**Action:** When memoizing a list item, always check its parent's props to ensure no inline functions or unstable object references are passed to the memoized child.

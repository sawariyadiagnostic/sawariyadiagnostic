## 2024-05-24 - Accessibility of Inline Buttons
**Learning:** Inline action buttons inside inputs, like "Clear search", frequently lack ARIA labels and focus visibility in this codebase, relying solely on text or hover colors which are inaccessible to screen readers and keyboard users.
**Action:** When auditing forms and inputs, always check inline action buttons for `aria-label`, `type="button"`, and `focus-visible` styles to ensure complete accessibility.

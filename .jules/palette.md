## 2024-05-15 - Icon-only buttons lacking ARIA labels
**Learning:** In `LegalModal.tsx`, the close button containing only an `<X />` icon lacks an `aria-label`, making it inaccessible to screen readers. This pattern appears to occur in custom modals not using Radix components.
**Action:** Audit icon-only buttons in custom components and add appropriate `aria-label`s. Also ensure they have keyboard focus states (`focus-visible:ring-2`, etc.).

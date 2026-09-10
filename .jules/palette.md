## 2024-05-19 - Improved Legal Modal Accessibility
**Learning:** Custom modals like `LegalModal.tsx` require manual addition of ARIA roles (`role="dialog"`, `aria-modal="true"`) and focus-visible styling for keyboard navigation because they do not use Radix UI primitives.
**Action:** When implementing or modifying custom modal components, strictly verify and include standard ARIA dialog attributes and ensure all interactive elements have visible focus states.

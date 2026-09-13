## 2024-11-20 - [Add noopener to external links]
**Vulnerability:** External links opening in a new tab without `noopener` can expose `window.opener`.
**Learning:** React elements with `target="_blank"` and `rel="noreferrer"` without `noopener` might not trigger warnings but they don't fully protect older browsers from reverse tabnabbing. Always explicitely declare `noopener noreferrer`.
**Prevention:** Always use `rel="noopener noreferrer"` with `target="_blank"` links.

## 2025-03-01 - Fix Path Traversal in Server-to-Server LIS Fetch
**Vulnerability:** Path Traversal via unvalidated `patientId` and `reportId` query parameters directly interpolated into an internal API `fetch` call in `server.ts`.
**Learning:** Even though the parameters were for an external API fetch (Server-Side Request Forgery / Path Traversal), untrusted input passed to the frontend can be manipulated (e.g. `../` or additional paths) to fetch unauthorized endpoints on the remote LIS server.
**Prevention:** Always validate that inputs used in URL paths are strings and encode them using `encodeURIComponent` before interpolating them into a fetch request URL.

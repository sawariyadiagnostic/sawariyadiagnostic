## 2024-05-24 - SSRF and Path Traversal in Server
**Vulnerability:** The Express server used unvalidated user input (`patientId`, `reportId`) directly in the construction of an external API URL string in the `/api/lis/download-report` endpoint.
**Learning:** This architectural pattern (using a lightweight proxy server to fetch reports) creates a major SSRF and path traversal risk if inputs aren't strongly typed and sanitized before URL interpolation.
**Prevention:** Always validate parameter types (ensure they are strings, not arrays or objects from body parsers), explicitly reject path traversal characters (`/`, `..`), and wrap interpolated URL variables with `encodeURIComponent`.

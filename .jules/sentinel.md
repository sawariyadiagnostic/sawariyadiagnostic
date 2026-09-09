## 2024-05-18 - SSRF and Path Traversal in Report Download
**Vulnerability:** The `/api/lis/download-report` endpoint directly appended user input (`patientId` and `reportId`) to the `fetch` URL, making it susceptible to Server-Side Request Forgery (SSRF) and Path Traversal. An attacker could use `../` or other sequences to access unauthorized endpoints on the FLabs API using the server authentication.
**Learning:** External API integrations that dynamically construct URLs from client inputs must validate those inputs explicitly.
**Prevention:** Always validate URL path parameters via strict regex (e.g., `^[a-zA-Z0-9_-]+$`) to ensure only alphanumeric identifiers and hyphens/underscores are permitted.

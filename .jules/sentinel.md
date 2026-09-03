## 2025-02-19 - Fix SSRF / Path Traversal in LIS Integration
**Vulnerability:** The `/api/lis/download-report` endpoint directly concatenated user input (`patientId` and `reportId`) into the backend `fetch` URL without validation or encoding. This allowed an attacker to perform path traversal and potentially Server-Side Request Forgery (SSRF) against the internal FLabs LIS API.
**Learning:** Even when making requests to trusted backend services, user inputs must be strictly validated and encoded. Concatenating raw input directly into URLs creates critical vulnerabilities.
**Prevention:** Use strictly defined regex matching for expected formats (e.g., alphanumeric IDs) and always use `encodeURIComponent` when building URLs with dynamic segments to prevent path manipulation.

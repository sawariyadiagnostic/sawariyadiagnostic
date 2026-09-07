## 2025-02-24 - SSRF and Path Traversal in LIS Integration
**Vulnerability:** The `/api/lis/download-report` endpoint directly used user-provided `patientId` and `reportId` parameters to construct the FLabs API fetch URL without any sanitization or validation, allowing for Path Traversal or Server-Side Request Forgery (SSRF).
**Learning:** External or backend proxy endpoints built with Express should always validate and sanitize input strictly, as attackers could modify identifiers to traverse paths or request unintended internal endpoints.
**Prevention:** Implement regex validation (e.g., `/^[a-zA-Z0-9\-_]+$/`) on path identifiers to ensure only alphanumeric characters and safe symbols are allowed before passing them to internal service URLs.

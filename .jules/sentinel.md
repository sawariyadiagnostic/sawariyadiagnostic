## 2023-10-27 - [Fix] SSRF and Path Traversal in LIS Integration
**Vulnerability:** Path Traversal / SSRF via un-sanitized string interpolation in a backend fetch URL (`${baseUrl}/api/v1/patients/${patientId}/reports/${reportId}`).
**Learning:** External or user-provided parameters were directly injected into an internal backend URL without being typed-checked or encoded.
**Prevention:** Always validate parameter types and safely encode using `encodeURIComponent` before inserting into URL paths.

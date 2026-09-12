## 2024-05-18 - [Path Traversal in API]
**Vulnerability:** The `/api/lis/download-report` endpoint allowed arbitrary characters in `patientId` and `reportId` which were interpolated into a proxy `fetch` call, leading to SSRF and Path Traversal.
**Learning:** `encodeURIComponent` alone is insufficient to prevent path traversal because it does not encode periods (`.`), which allows `..` sequences.
**Prevention:** Always combine `encodeURIComponent` with strict regex input validation (e.g., `/^[a-zA-Z0-9_-]+$/`) to drop unexpected characters before they hit sensitive internal backend proxy targets.

## 2024-05-15 - Missing Security Headers Enhancement
**Vulnerability:** The Express server in `server.ts` lacked standard security headers, exposing the application to clickjacking, MIME-sniffing, and cross-site scripting risks.
**Learning:** Security headers should be standard across all environments where Express runs, even if it's primarily a static file server or dev proxy. The absence of headers like `X-Frame-Options` and `X-Content-Type-Options` is a common omission that can be trivially fixed.
**Prevention:** Integrate standard security middleware in all Express applications by default, specifically adding `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, and `Referrer-Policy`.

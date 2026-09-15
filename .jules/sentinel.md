## 2024-05-18 - Missing Security Headers in Express Proxy
**Vulnerability:** Express proxy was missing key security headers (CSP, HSTS), leaving the application vulnerable to various injection and man-in-the-middle attacks. X-XSS-Protection was purposefully left out as it's deprecated and can introduce vulnerabilities.
**Learning:** Default Express setups do not include secure headers. Manually adding them or using a library like `helmet` is essential for basic defense-in-depth. Note that X-XSS-Protection should NOT be used in modern applications.
**Prevention:** Always ensure standard security headers (CSP, HSTS, X-Content-Type-Options, etc.) are implemented as early middleware in any Node.js/Express application.

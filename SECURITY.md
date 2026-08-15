# Security Policy

## Architecture & Privacy Model

GradeForge is built as a static, client-side web application. It runs entirely inside your browser:
- No user accounts or authentication tokens.
- No remote databases storing grades, names, or course information.
- All calculations, custom scales, and semesters are kept in the browser's `localStorage`.
- No analytics or third-party scripts receive student course entries.

## Reporting a Vulnerability

If you find a security issue—such as a Cross-Site Scripting (XSS) flaw in input rendering, a dependency vulnerability, or a privacy leak—please report it responsibly:

1. Do not open a public GitHub issue for critical security vulnerabilities.
2. Reach out to me directly through the contact options on [poorvithmp.com](https://poorvithmp.com) or use GitHub's private vulnerability reporting feature on this repo.
3. Include clear reproduction steps or a proof of concept.

I will investigate and patch verified security vulnerabilities as quickly as possible.

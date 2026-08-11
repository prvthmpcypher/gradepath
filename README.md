# GradePath

GradePath is a multi-page, browser-local SGPA and CGPA calculator. It supports preset and custom grading scales, multiple semesters, subject credits, live credit-weighted results, and local saving without an account.

## Formula

`SGPA = Σ(credit × grade point) ÷ Σ(credit)`

CGPA uses the same formula across all included subjects in all semesters. Incomplete rows and non-positive credits are skipped. Results display two decimal places after calculation.

Grading rules change and may include institution-specific policies. Verify the current official scheme before relying on a result.

## Privacy

Calculator entries can be stored in this browser's local storage. If persistence is unavailable, calculations continue for the page session. Vercel Analytics measures aggregate visits and does not receive calculator entries.

## Development and build

The application is plain HTML, CSS, and JavaScript modules.

```bash
npm run build
```

The deterministic build copies the approved public pages and assets to `dist/`. Vercel serves that directory with clean multi-page URLs and security headers.

Built by [Poorvith M P](https://poorvithmp.com) and released under the MIT licence.

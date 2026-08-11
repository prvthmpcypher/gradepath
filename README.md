<p align="center"><img src="docs/assets/logo.svg" width="88" alt="GradePath logo"></p>

# GradePath

![GradePath — your grading scale and a result you can check](docs/assets/cover.svg)

GradePath is my browser-local SGPA and CGPA calculator. I built it for students who want a calculation they can repeat and inspect without turning every semester into another spreadsheet.

[Open GradePath](https://gradepath.poorvithmp.com) · [View the calculator](docs/assets/product.png) · [My portfolio](https://poorvithmp.com)

## Main features

- VTU CBCS, Anna University, and generic 10-point presets.
- Custom grading scales with editable grade labels and points.
- Multiple semesters with editable subjects, credits, and grades.
- Live credit-weighted SGPA for each semester and CGPA across semesters.
- Browser-local saving and restoration without an account.
- Separate calculator, formula documentation, About, and support pages.

## Formula

```text
SGPA = Σ(credit × grade point) ÷ Σ(credit)
```

CGPA uses the same credit-weighted formula across the included subjects in every semester. Incomplete rows and non-positive credits are skipped. Displayed results use two decimal places.

## Installation and local use

GradePath is plain HTML, CSS, and JavaScript modules. Clone the repository:

```bash
git clone https://github.com/prvthmpcypher/gradepath.git
cd gradepath
```

Serve the repository with any local static-file server, then open `index.html` through that server. There are no application runtime dependencies to install.

To create the approved deployment folder, you need Node.js and npm:

```bash
npm run build
```

The deterministic build copies the public pages and assets to `dist/`. Vercel is configured to serve that directory with clean multi-page URLs and response headers.

## How to use it

1. Choose the grading preset that matches your current official scheme, or create a custom scale.
2. Add a semester and its subjects.
3. Enter each subject's credit value and grade.
4. Read the semester SGPA and cumulative CGPA as the entries change.
5. Compare the scale and credits with the institution's current rules before relying on the result.

## Privacy and limits

GradePath can store grading scales, semesters, and subject entries in this browser's local storage. If storage is unavailable, calculations can continue for the current page session.

Vercel Analytics measures aggregate visits and does not receive calculator entries.

Grading rules vary and can change. GradePath does not know whether a chosen preset matches a particular programme, academic year, rounding policy, or institution-specific exception. The result depends on the scale and credits entered.

## Built with

- Semantic HTML
- CSS
- JavaScript modules
- Browser local storage
- Vercel Analytics

## Contributing

1. Fork the repository and create a focused branch.
2. Keep calculations in the existing JavaScript modules and keep public pages usable without an account.
3. Document the official source and scope for any proposed grading preset.
4. Run `npm run build` before opening a pull request.
5. Explain changes to formulas, rounding, validation, storage, or preset data.

## Licence

GradePath is available under the [MIT Licence](LICENSE).

## Author

Built by [Poorvith M P](https://poorvithmp.com). You can also find me on [GitHub](https://github.com/prvthmpcypher).

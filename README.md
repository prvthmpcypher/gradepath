<p align="center"><img src="docs/assets/logo.svg" width="88" alt="GradeForge logo"></p>

# GradeForge

![GradeForge — your grading scale and a result you can check](docs/assets/cover.svg)

GradeForge is a modern, privacy-first browser-local SGPA and CGPA calculator. Built for students who want a calculation they can repeat, inspect, and trust without turning every semester into another spreadsheet.

[Open GradeForge](https://gradeforge.poorvithmp.com) · [View the calculator](docs/assets/product.png) · [My portfolio](https://poorvithmp.com)

## Main features

- **Multi-University Presets**: VTU CBCS, Anna University, Generic 10-point, Mumbai University, KTU, JNTU, and US 4.0 GPA scales.
- **Custom Grading Scales**: Easily define and save custom letter grades, boundaries, and point scales (0 to 10 or 4.0).
- **Multiple Semesters**: Editable course names, credits, and live grade calculations.
- **Target CGPA Planner / What-If Simulator**: Calculate the required SGPA needed across remaining semesters to hit your dream CGPA.
- **Visual Analytics**: Interactive SGPA progression graph and credit load distribution visualization.
- **Data Portability**: JSON Backup & Restore + CSV marksheet downloads.
- **Printable Transcripts**: Generate clean academic performance records and PDF summaries.
- **Onboarding Flow**: 2-step quickstart with sample engineering semester loader.
- **First-Party Attribution & Sharing**: Trackable share links, UTM capture, and dark-social discovery polling.
- **Search Engine Optimized**: Multi-route static prerendering, structured JSON-LD schemas (`SoftwareApplication`, `FAQPage`), and OpenGraph metadata.
- **100% Browser-Local Privacy**: No accounts, no database tracking. All data remains in your device's browser.

## Formulas

```text
SGPA = Σ(credit × grade point) ÷ Σ(credit)
```

CGPA uses the same credit-weighted formula across all completed semesters. Incomplete rows and non-positive credits are automatically skipped. Displayed results use two decimal places.

## Installation and Local Development

GradeForge is built with React 18, TypeScript, Tailwind CSS, and Vite.

```bash
# Clone the repository
git clone https://github.com/prvthmpcypher/gradepath.git
cd gradepath

# Install dependencies
npm install

# Start development server
npm run dev
```

To build for production:

```bash
npm run build
```

The production bundle is compiled into `dist/` with static multi-page HTML entry points.

## Built with

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- Browser Local Storage
- Vercel Analytics

## Privacy & Limits

GradeForge stores grading scales, semesters, and subject entries entirely in the browser's local storage. No academic data is sent to external servers.

## Licence

GradeForge is available under the [MIT Licence](LICENSE).

## Author

Built by [Poorvith M P](https://poorvithmp.com). Find me on [GitHub](https://github.com/prvthmpcypher).

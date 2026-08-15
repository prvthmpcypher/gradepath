# Contributing to GradeForge

Thanks for wanting to help improve GradeForge. Whether you're adding a grading preset for your university, fixing a math edge case, or tweaking the UI, contributions are welcome.

## How you can help

1. **Adding university grading schemes**: If your college or university uses a specific grading scale, you can add it to `src/constants/presets.ts`. Make sure to link the official university regulation document in your PR description so we can verify the grade points.
2. **Bug fixes & edge cases**: Handling strange credit combinations, rounding mismatches, or layout glitches on mobile.
3. **Feature improvements**: Suggesting useful tools for students (like better export options or formula explainers).

## Getting started

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/your-username/gradeforge.git
   cd gradeforge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feat/add-my-university-scale
   ```

## Rules to keep in mind

- **Keep it 100% private**: No backend databases, logins, or tracking of student grades. Everything must work client-side in the browser.
- **Verify the math**: Any new grading scale or formula calculation needs to be verified against the official university syllabus or notification.
- **Run the build**: Make sure `npm run build` passes with zero TypeScript and bundling errors before opening a pull request.

## Submitting a PR

1. Commit your changes with a clear commit message.
2. Push to your fork and open a Pull Request against `main`.
3. Explain what you changed and why, with references if you added new grading schemes.

I review PRs as soon as I can. If you want to discuss an idea before building it, open an issue on GitHub first.

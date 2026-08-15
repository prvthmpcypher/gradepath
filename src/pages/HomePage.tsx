import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../components/seo/MetaTags';
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Sliders, Laptop } from 'lucide-react';

export const HomePage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GradeForge',
    url: 'https://gradeforge.poorvithmp.com/',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    description: 'Calculate credit-weighted SGPA and CGPA with preset or custom grading scales without a spreadsheet.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Poorvith M P',
      url: 'https://poorvithmp.com',
    },
  };

  return (
    <>
      <MetaTags
        title="GradeForge — SGPA and CGPA Calculator"
        description="Calculate credit-weighted SGPA and CGPA with VTU, Anna University, KTU, Mumbai University, 4.0 GPA, or custom grading scales. Fast, private, browser-local."
        canonicalPath="/"
        schema={schema}
      />

      <main className="w-[min(1100px,90vw)] mx-auto">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 max-w-4xl">
          <p className="eyebrow inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-gpblue tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gpgold" /> An academic notebook for grade points
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-ink leading-tight tracking-tight mb-6">
            Calculate SGPA and CGPA without a spreadsheet.
          </h1>
          <p className="text-gpmuted text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Choose a grading scale, add your semesters and subjects, and see credit-weighted results as you work. All data stays private and stored locally in your browser.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gpblue bg-gpblue text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity shadow-sm"
            >
              Open the calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gpline bg-paper text-ink font-bold text-sm sm:text-base hover:bg-gpwash transition-colors"
            >
              Read the formula
            </Link>
          </div>
        </section>

        {/* 3-Step Notebook Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-gpline border border-gpline mb-20">
          <article className="p-8 bg-paper">
            <span className="text-gpblue font-mono font-semibold text-xs tracking-wider">01</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink mt-2 mb-2">Use your scale</h2>
            <p className="text-gpmuted text-sm leading-relaxed m-0">
              Start with presets for VTU CBCS, Anna University, KTU, Mumbai University, US 4.0 GPA, or customize your own grade labels and point values.
            </p>
          </article>

          <article className="p-8 bg-paper">
            <span className="text-gpblue font-mono font-semibold text-xs tracking-wider">02</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink mt-2 mb-2">Enter credits & grades</h2>
            <p className="text-gpmuted text-sm leading-relaxed m-0">
              Only complete rows with positive credits and recognized grades contribute to the weighted formula. Incomplete entries never skew results.
            </p>
          </article>

          <article className="p-8 bg-paper">
            <span className="text-gpblue font-mono font-semibold text-xs tracking-wider">03</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink mt-2 mb-2">Inspect & plan ahead</h2>
            <p className="text-gpmuted text-sm leading-relaxed m-0">
              Check live SGPA/CGPA updates, test future targets with the What-If planner, export to CSV/JSON, or print a clean academic report card.
            </p>
          </article>
        </section>

        {/* Feature Highlights Bento */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gpblue font-semibold mb-1">
              Engineered for Students
            </p>
            <h2 className="text-3xl font-serif font-bold text-ink">
              Everything you need for academic tracking
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border border-gpline bg-paper space-y-2">
              <div className="w-9 h-9 flex items-center justify-center bg-gpwash text-gpblue mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink m-0">Target CGPA / What-If Planner</h3>
              <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
                Want to reach an 8.5 or 9.0 CGPA before graduation? GradeForge calculates the exact SGPA you need across remaining semesters.
              </p>
            </div>

            <div className="p-6 border border-gpline bg-paper space-y-2">
              <div className="w-9 h-9 flex items-center justify-center bg-gpwash text-gpblue mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink m-0">100% Privacy & Browser Local</h3>
              <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
                Zero signups, zero database tracking. All course entries and grades are saved directly into your device's browser localStorage.
              </p>
            </div>

            <div className="p-6 border border-gpline bg-paper space-y-2">
              <div className="w-9 h-9 flex items-center justify-center bg-gpwash text-gpblue mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink m-0">Multi-University Presets</h3>
              <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
                Built-in grading scales for VTU (CBCS), Anna University, KTU, Mumbai University, JNTU, standard 10-point, and US 4.0 GPA scales.
              </p>
            </div>

            <div className="p-6 border border-gpline bg-paper space-y-2">
              <div className="w-9 h-9 flex items-center justify-center bg-gpwash text-gpblue mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ink m-0">Printable Report & Data Export</h3>
              <p className="text-xs sm:text-sm text-gpmuted leading-relaxed m-0">
                Generate clean printable performance records for scholarship applications or export your data to CSV spreadsheets and JSON backups.
              </p>
            </div>
          </div>
        </section>

        {/* Quick CTA */}
        <section className="p-8 sm:p-12 border border-gpline bg-gpwash/40 text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink mb-3">
            Ready to calculate your GPA?
          </h2>
          <p className="text-gpmuted text-sm max-w-md mx-auto mb-6">
            Get instant calculations with zero setup. Switch grading scales anytime.
          </p>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gpblue bg-gpblue text-white font-bold text-sm hover:opacity-90 shadow-sm"
          >
            Start Calculating Now <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </>
  );
};

import React from 'react';
import { MetaTags } from '../components/seo/MetaTags';
import { Shield, EyeOff, BookOpen, Sparkles, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About GradeForge',
    url: 'https://gradeforge.poorvithmp.com/about',
    description: 'GradeForge is an academic notebook for calculating SGPA and CGPA with full browser-local privacy.',
    author: {
      '@type': 'Person',
      name: 'Poorvith M P',
      url: 'https://poorvithmp.com',
    },
  };

  return (
    <>
      <MetaTags
        title="About — GradeForge"
        description="Learn about GradeForge, its privacy-first browser-local architecture, and why it was built as an academic notebook for students."
        canonicalPath="/about"
        schema={schema}
      />

      <main className="w-[min(1100px,90vw)] mx-auto py-8 sm:py-12">
        <section className="max-w-3xl mb-12">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-gpblue mb-1">
            About GradeForge
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink tracking-tight mb-6">
            An academic notebook for grade points.
          </h1>
          <p className="text-gpmuted text-base sm:text-lg leading-relaxed mb-4">
            I built GradeForge for students who want a calculation they can repeat, inspect, and trust without having to configure a new spreadsheet every semester or hand their academic records to proprietary portals.
          </p>
        </section>

        {/* Core Principles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="p-6 border border-gpline bg-paper space-y-2">
            <div className="flex items-center gap-2 text-gpblue font-bold font-mono text-sm">
              <EyeOff className="w-4 h-4" /> Privacy-First by Design
            </div>
            <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
              GradeForge does not require an account or login. Your course names, credits, grades, and custom grading schemes are stored in your device's browser local storage.
            </p>
          </div>

          <div className="p-6 border border-gpline bg-paper space-y-2">
            <div className="flex items-center gap-2 text-gpblue font-bold font-mono text-sm">
              <BookOpen className="w-4 h-4" /> Repeatable & Inspectable
            </div>
            <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
              Formulas strictly adhere to credit-weighted summation standards used by UGC, AICTE, VTU, Anna University, and global universities.
            </p>
          </div>

          <div className="p-6 border border-gpline bg-paper space-y-2">
            <div className="flex items-center gap-2 text-gpblue font-bold font-mono text-sm">
              <SlidersIcon className="w-4 h-4" /> Fully Customizable Schemes
            </div>
            <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
              Institutions change their grade point scales over time. If your university uses custom grade boundaries (e.g., S=10 or O=10 or 4.0 GPA), you can configure and save your custom scale.
            </p>
          </div>

          <div className="p-6 border border-gpline bg-paper space-y-2">
            <div className="flex items-center gap-2 text-gpblue font-bold font-mono text-sm">
              <Shield className="w-4 h-4" /> Zero Ads, Zero Bloat
            </div>
            <p className="text-gpmuted text-xs sm:text-sm leading-relaxed m-0">
              Built as a focused tool with an academic editorial design. No pop-up advertisements, trackers, or paywalls.
            </p>
          </div>
        </section>

        {/* Creator Section */}
        <section className="p-8 border border-gpline bg-paper max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-ink mb-3">About the Author</h2>
          <p className="text-gpmuted text-sm leading-relaxed mb-4">
            GradeForge was conceptualized and developed by <strong>Poorvith M P</strong>. It is open source and freely accessible to students and educators worldwide.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs font-semibold">
            <a
              href="https://poorvithmp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gpblue hover:underline"
            >
              Portfolio Website <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/prvthmpcypher/gradeforge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gpblue hover:underline"
            >
              GitHub Repository <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

const SlidersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Sparkles className={className} />
);

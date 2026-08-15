import React, { useState, useEffect } from 'react';
import { useGrade } from '../context/GradeContext';
import { MetaTags } from '../components/seo/MetaTags';
import { ScaleSelector } from '../components/calculator/ScaleSelector';
import { SemesterList } from '../components/calculator/SemesterList';
import { ProgressionChart } from '../components/calculator/ProgressionChart';
import { ResultsSummary } from '../components/calculator/ResultsSummary';
import { QuickstartModal } from '../components/onboarding/QuickstartModal';
import { ExportImportModal } from '../components/calculator/ExportImportModal';
import { isOnboardingCompleted } from '../utils/storage';
import { initializeAttribution } from '../utils/attribution';
import { Sparkles } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const { state, loadSampleData } = useGrade();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  useEffect(() => {
    // Initialize first-party attribution capture on load
    initializeAttribution();

    // Open onboarding modal if user has never visited and has 0 semesters
    if (!isOnboardingCompleted() && state.semesters.length === 0) {
      setIsOnboardingOpen(true);
    }
  }, [state.semesters.length]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'GradeForge Calculator',
    url: 'https://gradeforge.poorvithmp.com/calculator',
    description: 'Enter subjects, credits, and grades to calculate SGPA and CGPA with VTU, Anna University, and custom scales.',
    isPartOf: {
      '@type': 'SoftwareApplication',
      name: 'GradeForge',
      url: 'https://gradeforge.poorvithmp.com/',
    },
  };

  return (
    <>
      <MetaTags
        title="Calculator — GradeForge SGPA and CGPA Calculator"
        description="Enter subjects, credits, and grades to calculate semester SGPA and cumulative CGPA. Features target planning and multi-university presets."
        canonicalPath="/calculator"
        schema={schema}
      />

      <main className="w-[min(1100px,90vw)] mx-auto py-8 sm:py-12">
        {/* Page Lead */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-gpblue mb-1">
                Calculator
              </p>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ink tracking-tight m-0">
                Your academic notebook
              </h1>
            </div>

            {state.semesters.length === 0 && (
              <button
                type="button"
                onClick={loadSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-gpline bg-paper hover:bg-gpwash text-ink self-start sm:self-auto cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-gpgold" /> Load Sample Data
              </button>
            )}
          </div>
          <p className="text-gpmuted text-sm sm:text-base mt-2 max-w-2xl">
            Verify the selected scale against your institution’s current official grading scheme. Results update live with each keystroke.
          </p>
        </section>

        {/* Scale Selector */}
        <ScaleSelector />

        {/* Semesters & Subjects */}
        <SemesterList />

        {/* Progression & Visual Trend */}
        <ProgressionChart />

        {/* Live Results Card & Actions */}
        <ResultsSummary />

        {/* Onboarding and Import Modals */}
        <QuickstartModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onOpenImport={() => setIsImportOpen(true)}
        />

        {isImportOpen && (
          <ExportImportModal onClose={() => setIsImportOpen(false)} />
        )}
      </main>
    </>
  );
};

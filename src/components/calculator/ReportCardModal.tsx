import React from 'react';
import { useGrade } from '../../context/GradeContext';
import { displayGrade, convertToPercentage } from '../../utils/calculations';
import { X, Printer } from 'lucide-react';

interface ReportCardModalProps {
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({ onClose }) => {
  const { state, activeScale, overall } = useGrade();

  const handlePrint = () => {
    window.print();
  };

  const pointMap = new Map<string, number>(
    activeScale.grades.map((g) => [g.label.toUpperCase(), g.point])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div
        className="w-full max-w-3xl bg-paper border border-gpline shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:w-full print:p-0"
        role="dialog"
        aria-labelledby="report-card-title"
      >
        {/* Controls - Hidden on print */}
        <div className="flex items-center justify-between pb-4 border-b border-gpline mb-6 print:hidden">
          <h2 id="report-card-title" className="text-xl font-serif font-bold text-ink m-0">
            Academic Performance Summary
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gpblue bg-gpblue text-white text-xs font-bold hover:opacity-90 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-gpmuted hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Transcript Document */}
        <div className="p-4 sm:p-6 bg-white text-slate-900 border border-slate-200 print:border-none print:p-0">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-5 mb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-950 m-0">
              GradeForge Academic Performance Record
            </h1>
            <p className="text-xs font-mono text-slate-600 mt-1.5 uppercase tracking-wider">
              Grading Scheme: {activeScale.name} (Max Scale: {activeScale.maxScale})
            </p>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">
              Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 mb-6 text-center">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 block">Cumulative CGPA</span>
              <strong className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                {displayGrade(overall.cgpa)}
              </strong>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 block">Total Credits</span>
              <strong className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                {overall.totalCredits}
              </strong>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-500 block">Approx. Percentage</span>
              <strong className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                {convertToPercentage(overall.cgpa, activeScale.id)}
              </strong>
            </div>
          </div>

          {/* Semester-by-Semester Tables */}
          <div className="space-y-6">
            {state.semesters.map((sem, sIdx) => {
              const res = overall.semesterResults[sIdx];
              return (
                <div key={sem.id} className="border border-slate-200">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                    <strong className="font-serif text-slate-900 text-sm">
                      {sem.name || `Semester ${sIdx + 1}`}
                    </strong>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      SGPA: {res?.sgpa ? res.sgpa.toFixed(2) : '—'} ({res?.totalCredits || 0} Credits)
                    </span>
                  </div>

                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-mono text-slate-600 uppercase">
                        <th className="py-2 px-3 w-8">#</th>
                        <th className="py-2 px-3">Subject / Course</th>
                        <th className="py-2 px-3 text-center w-20">Credits</th>
                        <th className="py-2 px-3 text-center w-20">Grade</th>
                        <th className="py-2 px-3 text-center w-24">Grade Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sem.subjects.map((sub, idx) => {
                        const pt = pointMap.get(sub.gradeLabel.toUpperCase());
                        return (
                          <tr key={sub.id}>
                            <td className="py-2 px-3 font-mono text-slate-400">{idx + 1}</td>
                            <td className="py-2 px-3 text-slate-800 font-medium">{sub.name || 'Untitled Course'}</td>
                            <td className="py-2 px-3 text-center font-mono">{sub.credits || '—'}</td>
                            <td className="py-2 px-3 text-center font-mono font-bold text-slate-900">{sub.gradeLabel || '—'}</td>
                            <td className="py-2 px-3 text-center font-mono">{pt !== undefined ? pt : '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-500 font-mono">
            GradeForge · Independent local calculation notebook · Verify official scheme with university prior to formal reliance.
          </div>
        </div>
      </div>
    </div>
  );
};

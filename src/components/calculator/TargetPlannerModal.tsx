import React, { useState, useMemo } from 'react';
import { useGrade } from '../../context/GradeContext';
import { calculateTargetPlan, displayGrade } from '../../utils/calculations';
import { X, Target, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface TargetPlannerModalProps {
  onClose: () => void;
}

export const TargetPlannerModal: React.FC<TargetPlannerModalProps> = ({ onClose }) => {
  const { overall, activeScale } = useGrade();
  const maxScale = activeScale.maxScale || 10;

  const currentCGPA = overall.cgpa;
  const currentCredits = overall.totalCredits;

  const [targetCGPA, setTargetCGPA] = useState<number>(() => {
    if (currentCGPA !== null && currentCGPA > 0) {
      return Math.min(maxScale, Number((currentCGPA + 0.5).toFixed(2)));
    }
    return maxScale === 4 ? 3.5 : 8.5;
  });

  const [remainingSemesters, setRemainingSemesters] = useState<number>(2);
  const [avgCreditsPerSem, setAvgCreditsPerSem] = useState<number>(() => {
    if (overall.totalSemesters > 0 && currentCredits > 0) {
      return Math.round(currentCredits / overall.totalSemesters);
    }
    return 20;
  });

  const planResult = useMemo(() => {
    return calculateTargetPlan(
      currentCGPA,
      currentCredits,
      targetCGPA,
      remainingSemesters,
      avgCreditsPerSem,
      maxScale
    );
  }, [currentCGPA, currentCredits, targetCGPA, remainingSemesters, avgCreditsPerSem, maxScale]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-xl bg-paper border border-gpline shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="target-planner-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gpline mb-5">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-gpblue" />
            <h2 id="target-planner-title" className="text-xl font-serif font-bold text-ink m-0">
              Target CGPA & What-If Planner
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-gpmuted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Standing Card */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-gpwash/40 border border-gpline mb-5">
          <div>
            <span className="text-[11px] font-mono text-gpmuted uppercase tracking-wider block">
              Current CGPA
            </span>
            <output className="font-serif font-bold text-2xl text-ink">
              {displayGrade(currentCGPA)}
            </output>
          </div>
          <div>
            <span className="text-[11px] font-mono text-gpmuted uppercase tracking-wider block">
              Credits Completed
            </span>
            <output className="font-serif font-bold text-2xl text-ink">
              {currentCredits}
            </output>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-1.5">
              Desired Target CGPA (Max {maxScale})
            </label>
            <input
              type="number"
              step="0.05"
              min="0"
              max={maxScale}
              value={targetCGPA}
              onChange={(e) => setTargetCGPA(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gpline bg-bg text-ink font-mono text-sm rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-1.5">
                Remaining Semesters
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={remainingSemesters}
                onChange={(e) => setRemainingSemesters(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gpline bg-bg text-ink font-mono text-sm rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-ink uppercase tracking-wider mb-1.5">
                Avg Credits / Semester
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={avgCreditsPerSem}
                onChange={(e) => setAvgCreditsPerSem(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gpline bg-bg text-ink font-mono text-sm rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
              />
            </div>
          </div>
        </div>

        {/* Calculation Result Banner */}
        <div
          className={`p-4 border mb-6 transition-colors ${
            planResult.statusType === 'achieved'
              ? 'bg-green-50 dark:bg-green-950/40 border-green-300 text-green-950 dark:text-green-200'
              : planResult.statusType === 'impossible'
              ? 'bg-red-50 dark:bg-red-950/40 border-gpred/40 text-gpred'
              : planResult.statusType === 'challenging'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-gpgold text-amber-950 dark:text-amber-200'
              : 'bg-gpwash border-gpblue/40 text-ink'
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-mono uppercase font-semibold flex items-center gap-1.5">
              {planResult.statusType === 'impossible' ? (
                <XCircle className="w-4 h-4 text-gpred" />
              ) : planResult.statusType === 'challenging' ? (
                <AlertTriangle className="w-4 h-4 text-gpgold" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              )}
              Required SGPA per remaining semester:
            </span>
            <output className="font-serif font-bold text-2xl sm:text-3xl text-gpblue">
              {planResult.requiredSGPA !== null ? planResult.requiredSGPA.toFixed(2) : '—'}
            </output>
          </div>

          <p className="text-xs font-sans leading-relaxed m-0 opacity-90">
            {planResult.explanation}
          </p>
        </div>

        {/* Informative breakdown */}
        <div className="p-3 bg-bg border border-gpline text-xs text-gpmuted space-y-1 font-mono">
          <div className="flex items-center gap-1.5 text-ink font-semibold">
            <Info className="w-3.5 h-3.5 text-gpblue" /> Formula Breakdown:
          </div>
          <p className="m-0">
            Future Credits = {remainingSemesters} sem × {avgCreditsPerSem} cr = {remainingSemesters * avgCreditsPerSem} cr
          </p>
          <p className="m-0">
            Total Final Credits = {currentCredits + (remainingSemesters * avgCreditsPerSem)} cr
          </p>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-gpline">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold border border-gpblue bg-gpblue text-white hover:opacity-90 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

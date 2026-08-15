import React, { useState } from 'react';
import { useGrade } from '../../context/GradeContext';
import { PRESET_GRADING_SCALES } from '../../constants/presets';
import { setOnboardingCompleted } from '../../utils/storage';
import { Sparkles, Plus, Upload, Check, GraduationCap, X } from 'lucide-react';

interface QuickstartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenImport: () => void;
}

export const QuickstartModal: React.FC<QuickstartModalProps> = ({
  isOpen,
  onClose,
  onOpenImport,
}) => {
  const { state, setSelectedScaleId, loadSampleData, addSemester } = useGrade();
  const [step, setStep] = useState<number>(1);

  if (!isOpen) return null;

  const handleFinish = (action: 'sample' | 'blank' | 'import') => {
    setOnboardingCompleted(true);
    if (action === 'sample') {
      loadSampleData();
    } else if (action === 'blank') {
      if (state.semesters.length === 0) {
        addSemester('Semester 1');
      }
    } else if (action === 'import') {
      onClose();
      onOpenImport();
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-paper border border-gpline shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="quickstart-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            setOnboardingCompleted(true);
            onClose();
          }}
          className="absolute top-4 right-4 p-1 text-gpmuted hover:text-ink transition-colors cursor-pointer"
          aria-label="Skip onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-gpwash border border-gpline text-gpblue">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-mono text-gpblue uppercase tracking-wider m-0">
              Welcome to GradeForge
            </p>
            <h2 id="quickstart-title" className="text-xl sm:text-2xl font-serif font-bold text-ink m-0">
              Set Up Your Calculator
            </h2>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6 border-b border-gpline pb-3 text-xs font-mono">
          <span className={`px-2 py-0.5 ${step === 1 ? 'bg-gpblue text-white font-bold' : 'text-gpmuted'}`}>
            1. Choose Scheme
          </span>
          <span className="text-gpmuted">→</span>
          <span className={`px-2 py-0.5 ${step === 2 ? 'bg-gpblue text-white font-bold' : 'text-gpmuted'}`}>
            2. Choose Starting Point
          </span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-gpmuted m-0">
              Select your university grading scheme. GradeForge automatically weights credit points and calculates semester SGPA & overall CGPA.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {PRESET_GRADING_SCALES.map((scale) => {
                const isSelected = state.selectedScaleId === scale.id;
                return (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setSelectedScaleId(scale.id)}
                    className={`w-full text-left p-3 border transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-gpblue bg-gpwash/60 text-ink'
                        : 'border-gpline bg-bg/40 text-ink/80 hover:bg-bg hover:border-gpline'
                    }`}
                  >
                    <div>
                      <strong className="block text-sm font-sans">{scale.name}</strong>
                      <span className="text-xs font-mono text-gpmuted">{scale.description}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-gpblue shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gpline flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 text-xs font-bold border border-gpblue bg-gpblue text-white hover:opacity-90 cursor-pointer"
              >
                Next: Select Mode →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-gpmuted m-0">
              How would you like to start your notebook session?
            </p>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => handleFinish('sample')}
                className="p-4 border border-gpline hover:border-gpblue bg-bg/30 hover:bg-gpwash/40 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-gpgold" />
                  <strong className="text-sm font-sans text-ink group-hover:text-gpblue">
                    Load Sample Semesters (VTU Demo)
                  </strong>
                </div>
                <p className="text-xs text-gpmuted m-0 font-sans">
                  Populate with 3 sample engineering semesters to see live SGPA, progression charts, and CGPA formulas immediately.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleFinish('blank')}
                className="p-4 border border-gpline hover:border-gpblue bg-bg/30 hover:bg-gpwash/40 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Plus className="w-4 h-4 text-gpblue" />
                  <strong className="text-sm font-sans text-ink group-hover:text-gpblue">
                    Start Blank Notebook
                  </strong>
                </div>
                <p className="text-xs text-gpmuted m-0 font-sans">
                  Begin with a clean canvas and add your actual semester subjects and credits one-by-one.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleFinish('import')}
                className="p-4 border border-gpline hover:border-gpblue bg-bg/30 hover:bg-gpwash/40 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Upload className="w-4 h-4 text-gpblue" />
                  <strong className="text-sm font-sans text-ink group-hover:text-gpblue">
                    Restore Previous JSON Backup
                  </strong>
                </div>
                <p className="text-xs text-gpmuted m-0 font-sans">
                  Restore your saved semesters and custom grading scales from another browser or device.
                </p>
              </button>
            </div>

            <div className="pt-3 border-t border-gpline flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-3 py-1.5 text-xs font-mono text-gpmuted hover:text-ink cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => handleFinish('blank')}
                className="px-4 py-2 text-xs font-bold border border-gpline bg-paper hover:bg-bg text-ink cursor-pointer"
              >
                Skip & Start Blank
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

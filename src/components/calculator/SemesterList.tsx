import React from 'react';
import { useGrade } from '../../context/GradeContext';
import { SemesterCard } from './SemesterCard';
import { Plus, Sparkles, BookOpen } from 'lucide-react';

export const SemesterList: React.FC = () => {
  const {
    state,
    activeScale,
    addSemester,
    removeSemester,
    updateSemesterName,
    duplicateSemester,
    addSubject,
    updateSubject,
    removeSubject,
    loadSampleData,
  } = useGrade();

  return (
    <div className="mb-8">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-gpline">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink m-0">Semesters</h2>
          <span className="text-xs font-mono text-gpmuted bg-gpwash px-2 py-0.5 border border-gpline">
            {state.semesters.length} added
          </span>
        </div>

        <button
          id="add-semester-btn"
          type="button"
          onClick={() => addSemester()}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-gpblue bg-gpblue text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Semester
        </button>
      </div>

      {/* Empty State or List */}
      {state.semesters.length === 0 ? (
        <div className="p-8 sm:p-12 text-center border-2 border-dashed border-gpline bg-paper/60 transition-colors">
          <BookOpen className="w-12 h-12 text-gpblue mx-auto mb-3 opacity-70" />
          <h3 className="font-serif font-bold text-xl text-ink mb-1.5">No semesters yet</h3>
          <p className="text-gpmuted text-sm max-w-md mx-auto mb-6">
            Add your first semester to begin calculating credit-weighted SGPA and CGPA, or load sample data to explore.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => addSemester()}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gpblue bg-gpblue text-white font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add First Semester
            </button>
            <button
              type="button"
              onClick={loadSampleData}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gpline bg-paper hover:bg-gpwash text-ink font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gpgold" /> Load Sample Data (VTU)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {state.semesters.map((sem, index) => (
            <SemesterCard
              key={sem.id}
              semester={sem}
              index={index}
              activeScale={activeScale}
              onUpdateName={(name) => updateSemesterName(sem.id, name)}
              onDuplicate={() => duplicateSemester(sem.id)}
              onRemove={() => {
                if (window.confirm(`Delete ${sem.name || `Semester ${index + 1}`} and all its subjects?`)) {
                  removeSemester(sem.id);
                }
              }}
              onAddSubject={() => addSubject(sem.id)}
              onUpdateSubject={(subId, updates) => updateSubject(sem.id, subId, updates)}
              onRemoveSubject={(subId) => removeSubject(sem.id, subId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

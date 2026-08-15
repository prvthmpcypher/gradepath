import React, { useMemo } from 'react';
import { Semester, GradingScale } from '../../types/grade';
import { calculateSGPA, displayGrade } from '../../utils/calculations';
import { SubjectRow } from './SubjectRow';
import { Plus, Copy, Trash2 } from 'lucide-react';

interface SemesterCardProps {
  semester: Semester;
  index: number;
  activeScale: GradingScale;
  onUpdateName: (name: string) => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onAddSubject: () => void;
  onUpdateSubject: (subId: string, updates: Record<string, unknown>) => void;
  onRemoveSubject: (subId: string) => void;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  index,
  activeScale,
  onUpdateName,
  onDuplicate,
  onRemove,
  onAddSubject,
  onUpdateSubject,
  onRemoveSubject,
}) => {
  const calculation = useMemo(
    () => calculateSGPA(semester.subjects || [], activeScale),
    [semester.subjects, activeScale]
  );

  return (
    <div className="border border-gpline bg-paper mb-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gpwash/30 border-b border-gpline">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={semester.name || `Semester ${index + 1}`}
            onChange={(e) => onUpdateName(e.target.value)}
            className="font-serif font-bold text-lg text-ink bg-transparent border-b border-transparent hover:border-gpline focus:border-gpblue focus:outline-none px-1 py-0.5"
            placeholder={`Semester ${index + 1}`}
          />
          <span className="text-xs font-mono text-gpmuted">
            ({calculation.validSubjectCount}/{semester.subjects.length} subjects counted)
          </span>
        </div>

        {/* Live SGPA Badge & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gpmuted uppercase tracking-wider">
              SGPA:
            </span>
            <span className="font-mono font-bold text-lg text-gpblue bg-paper px-2.5 py-0.5 border border-gpline">
              {displayGrade(calculation.sgpa)}
            </span>
            <span className="text-xs font-mono text-gpmuted">
              ({calculation.totalCredits} cr)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onDuplicate}
              title="Duplicate semester"
              aria-label="Duplicate semester"
              className="p-1.5 text-gpmuted hover:text-gpblue border border-transparent hover:border-gpline bg-paper transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              title="Delete semester"
              aria-label="Delete semester"
              className="p-1.5 text-gpmuted hover:text-gpred border border-transparent hover:border-gpline bg-paper transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Headers for Desktop */}
      <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-2 bg-bg/60 border-b border-gpline text-[11px] font-mono font-semibold text-gpmuted uppercase tracking-wider">
        <div className="col-span-6 pl-7">Subject Title</div>
        <div className="col-span-2 text-center">Credits</div>
        <div className="col-span-3 text-center">Grade</div>
        <div className="col-span-1 text-right pr-2">Action</div>
      </div>

      {/* Subject Rows */}
      <div className="divide-y divide-gpline/30">
        {semester.subjects.length === 0 ? (
          <div className="p-6 text-center text-gpmuted text-sm">
            No subjects in this semester yet.{' '}
            <button
              type="button"
              onClick={onAddSubject}
              className="text-gpblue font-bold hover:underline cursor-pointer ml-1"
            >
              Add first subject
            </button>
          </div>
        ) : (
          semester.subjects.map((sub, sIdx) => (
            <SubjectRow
              key={sub.id}
              subject={sub}
              index={sIdx}
              activeScale={activeScale}
              onUpdate={(updates) => onUpdateSubject(sub.id, updates)}
              onRemove={() => onRemoveSubject(sub.id)}
            />
          ))
        )}
      </div>

      {/* Footer Add Subject */}
      <div className="p-3 bg-bg/40 border-t border-gpline flex items-center justify-between">
        <button
          type="button"
          onClick={onAddSubject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-gpline bg-paper hover:bg-gpwash text-ink transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-gpblue" /> Add Subject
        </button>

        <span className="text-xs font-mono text-gpmuted">
          Credits: <strong className="text-ink">{calculation.totalCredits}</strong>
        </span>
      </div>
    </div>
  );
};

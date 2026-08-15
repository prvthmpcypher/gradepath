import React from 'react';
import { Subject, GradingScale } from '../../types/grade';
import { Trash2 } from 'lucide-react';

interface SubjectRowProps {
  subject: Subject;
  index: number;
  activeScale: GradingScale;
  onUpdate: (updates: Partial<Subject>) => void;
  onRemove: () => void;
}

export const SubjectRow: React.FC<SubjectRowProps> = ({
  subject,
  index,
  activeScale,
  onUpdate,
  onRemove,
}) => {
  const currentCredit = typeof subject.credits === 'number' ? subject.credits : parseFloat(String(subject.credits));
  const currentPoint = activeScale.grades.find(
    (g) => g.label.toUpperCase() === (subject.gradeLabel || '').toUpperCase()
  )?.point;

  const isComplete = Number.isFinite(currentCredit) && currentCredit > 0 && currentPoint !== undefined;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center py-2.5 px-3 border-b border-gpline/40 last:border-b-0 hover:bg-gpwash/20 transition-colors">
      {/* Subject Name */}
      <div className="sm:col-span-6 flex items-center gap-2">
        <span className="text-[11px] font-mono text-gpmuted w-5 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <input
          type="text"
          value={subject.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder={`Subject ${index + 1}`}
          maxLength={100}
          className="w-full px-3 py-1.5 border border-gpline bg-bg text-ink text-sm rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
        />
      </div>

      {/* Credits */}
      <div className="grid grid-cols-2 sm:contents gap-2">
        <div className="sm:col-span-2">
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="30"
            value={subject.credits}
            onChange={(e) => {
              const val = e.target.value;
              onUpdate({ credits: val === '' ? '' : Number(val) });
            }}
            placeholder="Credits"
            className="w-full px-2.5 py-1.5 border border-gpline bg-bg text-ink font-mono text-sm text-center rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
          />
        </div>

        {/* Grade Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={subject.gradeLabel}
            onChange={(e) => onUpdate({ gradeLabel: e.target.value })}
            className="w-full px-2.5 py-1.5 border border-gpline bg-bg text-ink font-mono text-sm font-semibold rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gpgold"
          >
            {activeScale.grades.map((grade) => (
              <option key={grade.label} value={grade.label}>
                {grade.label} ({grade.point} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete / Status */}
      <div className="sm:col-span-1 flex items-center justify-end">
        <button
          type="button"
          onClick={onRemove}
          title="Remove subject"
          aria-label={`Remove subject ${index + 1}`}
          className="p-1.5 text-gpmuted hover:text-gpred transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Optional inline badge on small screens */}
      {!isComplete && (
        <div className="sm:hidden col-span-full text-[11px] text-gpgold font-mono">
          * Incomplete credits or unassigned grade
        </div>
      )}
    </div>
  );
};

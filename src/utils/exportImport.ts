import { GradeState, GradingScale } from '../types/grade';
import { validateState } from './storage';

export function exportStateAsJSON(state: GradeState): void {
  const data = {
    app: 'GradeForge',
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    state: validateState(state),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gradeforge_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportStateAsCSV(state: GradeState, activeScale: GradingScale): void {
  const rows: string[] = [
    ['Semester', 'Subject Name', 'Credits', 'Grade', 'Grade Point'].join(','),
  ];

  const pointMap = new Map<string, number>(
    activeScale.grades.map((g) => [g.label.toUpperCase(), g.point])
  );

  state.semesters.forEach((sem, sIdx) => {
    const semName = sem.name || `Semester ${sIdx + 1}`;
    if (!sem.subjects || sem.subjects.length === 0) {
      rows.push([`"${semName}"`, 'No subjects added', '', '', ''].join(','));
      return;
    }

    sem.subjects.forEach((sub) => {
      const subName = (sub.name || 'Untitled Subject').replace(/"/g, '""');
      const grade = sub.gradeLabel || '';
      const point = pointMap.has(grade) ? String(pointMap.get(grade)) : '';
      rows.push([`"${semName}"`, `"${subName}"`, `${sub.credits ?? ''}`, `"${grade}"`, point].join(','));
    });
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
  const a = document.createElement('a');
  a.href = csvContent;
  a.download = `gradeforge_grades_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function importStateFromJSON(jsonString: string): { success: boolean; state?: GradeState; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed) {
      return { success: false, error: 'Empty or invalid JSON file.' };
    }

    const targetState = parsed.state ? parsed.state : parsed;
    const validated = validateState(targetState);

    return {
      success: true,
      state: validated,
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse JSON file: ${(err as Error).message}`,
    };
  }
}

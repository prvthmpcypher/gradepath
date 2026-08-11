export function calculateSGPA(subjects, scale) {
  if (!Array.isArray(subjects) || !scale?.grades) return null;
  const points = new Map(scale.grades.map((grade) => [grade.label, Number(grade.point)]));
  let weighted = 0; let credits = 0;
  for (const subject of subjects) {
    const credit = Number(subject.credits); const point = points.get(subject.gradeLabel);
    if (!Number.isFinite(credit) || credit <= 0 || !Number.isFinite(point)) continue;
    weighted += credit * point; credits += credit;
  }
  return credits > 0 ? weighted / credits : null;
}

export function calculateCGPA(semesters, scale) {
  if (!Array.isArray(semesters)) return null;
  return calculateSGPA(semesters.flatMap((semester) => Array.isArray(semester.subjects) ? semester.subjects : []), scale);
}

export function validateScaleEntries(entries) {
  const errors = []; const labels = new Set(); const clean = [];
  for (const [index, entry] of entries.entries()) {
    const label = String(entry.label ?? '').trim().toUpperCase(); const point = Number(entry.point);
    if (!label) errors.push(`Row ${index + 1}: add a grade label.`);
    else if (label.length > 5) errors.push(`Row ${index + 1}: use no more than five characters.`);
    else if (labels.has(label)) errors.push(`Grade label ${label} is duplicated.`);
    else if (!Number.isFinite(point) || point < 0 || point > 10) errors.push(`Row ${index + 1}: grade point must be from 0 to 10.`);
    else { labels.add(label); clean.push({ label, point }); }
  }
  if (!clean.length) errors.push('Add at least one complete grade.');
  return { valid: errors.length === 0, entries: clean, errors };
}

export const displayGrade = (value) => value === null || !Number.isFinite(value) ? '—' : value.toFixed(2);

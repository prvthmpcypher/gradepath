const KEY = 'gradepath_state_v2';
const bounded = (value, max = 100) => typeof value === 'string' ? value.slice(0, max) : '';

export function defaultState() { return { selectedScaleId: 'vtu', customScales: [], semesters: [] }; }
export function validateState(value) {
  if (!value || typeof value !== 'object') return defaultState();
  const customScales = Array.isArray(value.customScales) ? value.customScales.slice(0, 10).map((scale) => ({ id: bounded(scale.id, 80), name: bounded(scale.name, 60), grades: Array.isArray(scale.grades) ? scale.grades.slice(0, 30).map((grade) => ({ label: bounded(grade.label, 5).toUpperCase(), point: Math.min(10, Math.max(0, Number(grade.point) || 0)) })) : [] })).filter((scale) => scale.id && scale.name && scale.grades.length) : [];
  const semesters = Array.isArray(value.semesters) ? value.semesters.slice(0, 24).map((semester) => ({ id: bounded(semester.id, 80) || crypto.randomUUID(), subjects: Array.isArray(semester.subjects) ? semester.subjects.slice(0, 40).map((subject) => ({ id: bounded(subject.id, 80) || crypto.randomUUID(), name: bounded(subject.name), credits: Number.isFinite(Number(subject.credits)) ? Math.min(30, Math.max(0, Number(subject.credits))) : '', gradeLabel: bounded(subject.gradeLabel, 5).toUpperCase() })) : [] })) : [];
  return { selectedScaleId: bounded(value.selectedScaleId, 80) || 'vtu', customScales, semesters };
}
export function loadState() { try { return validateState(JSON.parse(localStorage.getItem(KEY) || 'null')); } catch { return defaultState(); } }
export function saveState(state) { try { localStorage.setItem(KEY, JSON.stringify(validateState(state))); return true; } catch { return false; } }

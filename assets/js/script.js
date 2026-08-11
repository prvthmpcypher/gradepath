import { calculateCGPA, calculateSGPA, displayGrade, validateScaleEntries } from './calculations.js';
import { GRADING_SCALES } from './presets.js';
import { loadState, saveState } from './state.js';

let state = loadState();
const byId = (id) => document.getElementById(id);
const scales = () => [...GRADING_SCALES, ...state.customScales];
const currentScale = () => scales().find((scale) => scale.id === state.selectedScaleId) || GRADING_SCALES[0];
const announce = (message) => { byId('calculator-status').textContent = message; };
const persist = () => { if (!saveState(state)) announce('Calculations still work, but this browser could not save your changes.'); };

function option(value, label, selected = false) { const item = document.createElement('option'); item.value = value; item.textContent = label; item.selected = selected; return item; }
function renderScaleSelect() {
  const select = byId('scale-select'); select.replaceChildren();
  scales().forEach((scale) => select.append(option(scale.id, scale.name, scale.id === state.selectedScaleId)));
  select.append(option('custom', 'Build a custom scale'));
}
function addSubject(semester) { semester.subjects.push({ id: crypto.randomUUID(), name: '', credits: '', gradeLabel: '' }); persist(); render(); }
function removeSubject(semester, id) { if (!confirm('Remove this subject?')) return; semester.subjects = semester.subjects.filter((subject) => subject.id !== id); persist(); render(); }
function field(type, value, label) { const input = document.createElement('input'); input.type = type; input.value = value; input.setAttribute('aria-label', label); return input; }
function renderSubject(semester, subject) {
  const row = document.createElement('div'); row.className = 'subject-row';
  const name = field('text', subject.name, 'Subject name'); name.maxLength = 100;
  const credits = field('number', subject.credits, 'Credits'); credits.min = '0'; credits.max = '30'; credits.step = '0.5';
  const grade = document.createElement('select'); grade.setAttribute('aria-label', 'Grade'); grade.append(option('', 'Choose grade'));
  currentScale().grades.forEach((item) => grade.append(option(item.label, `${item.label} (${item.point})`, item.label === subject.gradeLabel)));
  const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'btn btn-danger btn-sm'; remove.textContent = 'Remove';
  name.addEventListener('input', () => { subject.name = name.value.slice(0, 100); persist(); });
  credits.addEventListener('input', () => { subject.credits = credits.value; persist(); updateResults(); });
  grade.addEventListener('change', () => { subject.gradeLabel = grade.value; persist(); updateResults(); });
  remove.addEventListener('click', () => removeSubject(semester, subject.id));
  row.append(name, credits, grade, remove); return row;
}
function renderSemester(semester, index) {
  const card = document.createElement('section'); card.className = 'semester-card';
  const header = document.createElement('div'); header.className = 'semester-header';
  const title = document.createElement('h3'); title.textContent = `Semester ${index + 1}`;
  const result = document.createElement('output'); result.className = 'semester-sgpa'; result.dataset.semester = semester.id;
  const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'btn btn-danger btn-sm'; remove.textContent = 'Remove semester'; remove.addEventListener('click', () => { if (confirm('Remove this semester and its subjects?')) { state.semesters = state.semesters.filter((item) => item.id !== semester.id); persist(); render(); } });
  header.append(title, result, remove); card.append(header);
  semester.subjects.forEach((subject) => card.append(renderSubject(semester, subject)));
  const add = document.createElement('button'); add.type = 'button'; add.className = 'btn btn-secondary btn-sm'; add.textContent = 'Add subject'; add.addEventListener('click', () => addSubject(semester)); card.append(add); return card;
}
function updateResults() {
  const scale = currentScale();
  state.semesters.forEach((semester) => { const output = document.querySelector(`[data-semester="${semester.id}"]`); if (output) output.textContent = `SGPA ${displayGrade(calculateSGPA(semester.subjects, scale))}`; });
  byId('total-semesters').textContent = String(state.semesters.length); byId('overall-cgpa').textContent = displayGrade(calculateCGPA(state.semesters, scale));
  announce('Results updated.');
}
function render() { renderScaleSelect(); const container = byId('semesters-container'); container.replaceChildren(); state.semesters.forEach((semester, index) => container.append(renderSemester(semester, index))); byId('empty-state').hidden = state.semesters.length > 0; updateResults(); }

byId('scale-select').addEventListener('change', (event) => { if (event.target.value === 'custom') byId('custom-builder').hidden = false; else { state.selectedScaleId = event.target.value; byId('custom-builder').hidden = true; persist(); render(); } });
byId('add-semester-btn').addEventListener('click', () => { state.semesters.push({ id: crypto.randomUUID(), subjects: [] }); persist(); render(); announce('Semester added.'); });
byId('add-custom-grade-btn').addEventListener('click', () => { const row = document.createElement('div'); row.className = 'custom-grade-row'; const label = field('text', '', 'Grade label'); label.maxLength = 5; const point = field('number', '', 'Grade point'); point.min='0'; point.max='10'; point.step='.01'; const remove=document.createElement('button'); remove.type='button'; remove.textContent='Remove'; remove.addEventListener('click',()=>row.remove()); row.append(label,point,remove); byId('custom-grades-container').append(row); });
byId('save-custom-scale-btn').addEventListener('click', () => { const name=byId('custom-scale-name').value.trim(); const entries=[...document.querySelectorAll('.custom-grade-row')].map((row)=>({label:row.children[0].value,point:row.children[1].value})); const checked=validateScaleEntries(entries); if(name.length<2 || checked.errors.length){announce(name.length<2?'Add a scale name.':checked.errors.join(' '));return;} if(scales().some((scale)=>scale.name.toLowerCase()===name.toLowerCase())){announce('That scale name already exists.');return;} const scale={id:`custom-${crypto.randomUUID()}`,name:name.slice(0,60),grades:checked.entries}; state.customScales.push(scale); state.selectedScaleId=scale.id; byId('custom-builder').hidden=true; persist(); render(); announce('Custom scale saved.'); });
byId('cancel-custom-scale-btn').addEventListener('click',()=>{byId('custom-builder').hidden=true;renderScaleSelect();});
byId('add-custom-grade-btn').click(); render();

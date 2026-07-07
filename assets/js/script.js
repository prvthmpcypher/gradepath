/* ===== script.js — CGPA Calculator Logic ===== */

// ===== APP STATE =====
const STORAGE_KEY = 'gradepath_state';

function getDefaultState() {
  return {
    selectedScaleId: 'vtu',
    customScales: [],
    semesters: []
  };
}

function getAppState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure customScales and semesters exist
      if (!parsed.customScales) parsed.customScales = [];
      if (!parsed.semesters) parsed.semesters = [];
      if (!parsed.selectedScaleId) parsed.selectedScaleId = 'vtu';
      return parsed;
    }
  } catch (e) {
    // Ignore parse errors
  }
  return getDefaultState();
}

function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage may be full or unavailable
  }
}

// ===== DOM REFS =====
const scaleSelect = document.getElementById('scale-select');
const customBuilder = document.getElementById('custom-builder');
const semestersContainer = document.getElementById('semesters-container');
const emptyState = document.getElementById('empty-state');
const addSemesterBtn = document.getElementById('add-semester-btn');
const resultsSection = document.getElementById('results-section');
const totalSemestersEl = document.getElementById('total-semesters');
const overallCgpaEl = document.getElementById('overall-cgpa');

// Custom builder refs
const customGradesContainer = document.getElementById('custom-grades-container');
const addCustomGradeBtn = document.getElementById('add-custom-grade-btn');
const saveCustomScaleBtn = document.getElementById('save-custom-scale-btn');
const cancelCustomScaleBtn = document.getElementById('cancel-custom-scale-btn');

// ===== STATE =====
let state = getAppState();
let semesterCounter = state.semesters.length;

// ===== INIT =====
function init() {
  populateScaleSelect();
  if (state.selectedScaleId === 'custom') {
    showCustomBuilder();
  }
  renderAllSemesters();
  updateResults();
}

// ===== SCALE SELECT =====
function populateScaleSelect() {
  const allScales = getAllScales();
  scaleSelect.innerHTML = '';

  // Add presets
  GRADING_SCALES.forEach(scale => {
    const opt = document.createElement('option');
    opt.value = scale.id;
    opt.textContent = scale.name;
    if (scale.id === state.selectedScaleId) opt.selected = true;
    scaleSelect.appendChild(opt);
  });

  // Add custom scales
  state.customScales.forEach(scale => {
    const opt = document.createElement('option');
    opt.value = scale.id;
    opt.textContent = scale.name + ' (Custom)';
    if (scale.id === state.selectedScaleId) opt.selected = true;
    scaleSelect.appendChild(opt);
  });

  // Add "Custom" option
  const customOpt = document.createElement('option');
  customOpt.value = 'custom';
  customOpt.textContent = '— Build Custom Scale —';
  if (state.selectedScaleId === 'custom') customOpt.selected = true;
  scaleSelect.appendChild(customOpt);
}

scaleSelect.addEventListener('change', function () {
  const value = this.value;
  state.selectedScaleId = value;
  saveAppState(state);

  if (value === 'custom') {
    showCustomBuilder();
  } else {
    hideCustomBuilder();
    // Update all grade dropdowns to new scale
    updateAllGradeDropdowns();
    calculateAll();
  }
});

// ===== CUSTOM SCALE BUILDER =====
function showCustomBuilder() {
  customBuilder.classList.add('visible');
}

function hideCustomBuilder() {
  customBuilder.classList.remove('visible');
}

function addCustomGradeRow(labelVal = '', pointVal = '') {
  const row = document.createElement('div');
  row.className = 'custom-grade-row';

  row.innerHTML = `
    <input type="text" class="grade-label-input" placeholder="e.g. A+" value="${labelVal}" maxlength="3">
    <input type="number" class="grade-point-input" placeholder="Point e.g. 9" value="${pointVal}" min="0" max="10" step="0.5">
    <button class="btn btn-danger btn-sm" type="button" title="Remove grade">✕</button>
  `;

  row.querySelector('.btn-danger').addEventListener('click', function () {
    row.remove();
  });

  customGradesContainer.appendChild(row);
}

addCustomGradeBtn.addEventListener('click', function () {
  addCustomGradeRow();
});

// ===== GRADE VALIDATION HELPERS =====

/**
 * Collect and validate all grade entries from the builder rows.
 * Returns { valid: boolean, entries: Array, errors: string[] }
 */
function collectAndValidateGradeEntries(rows) {
  const entries = [];
  const errors = [];
  const seenLabels = new Set();

  rows.forEach((row, index) => {
    const labelInput = row.querySelector('.grade-label-input');
    const pointInput = row.querySelector('.grade-point-input');
    const rawLabel = labelInput.value.trim();
    const label = rawLabel.toUpperCase();
    const point = parseFloat(pointInput.value);

    // Skip completely empty rows silently
    if (!rawLabel && (pointInput.value === '' || pointInput.value === '')) {
      return;
    }

    // Validate label
    if (!rawLabel) {
      errors.push(`Row ${index + 1}: Grade label cannot be empty.`);
      return;
    }

    if (rawLabel.length > 5) {
      errors.push(`Row ${index + 1}: Label "${rawLabel}" is too long (max 5 chars).`);
      return;
    }

    // Validate point
    if (isNaN(point)) {
      errors.push(`Row ${index + 1}: "${label}" has an invalid grade point.`);
      return;
    }

    if (point < 0) {
      errors.push(`Row ${index + 1}: "${label}" has a negative grade point (${point}).`);
      return;
    }

    if (point > 100) {
      errors.push(`Row ${index + 1}: "${label}" has a grade point over 100 (${point}).`);
      return;
    }

    // Check duplicate label
    if (seenLabels.has(label)) {
      errors.push(`Duplicate grade label "${label}" found. Each label must be unique.`);
      return;
    }

    seenLabels.add(label);
    entries.push({ label, point, rowIndex: index });
  });

  if (entries.length === 0 && errors.length === 0) {
    errors.push('Add at least one valid grade (label + point) to save a scale.');
  }

  return {
    valid: errors.length === 0 && entries.length > 0,
    entries,
    errors
  };
}

/**
 * Build a grade preview table HTML for the modal
 */
function buildGradePreviewHTML(entries, duplicates) {
  if (entries.length === 0) {
    return '<p style="color:var(--text-muted);text-align:center;padding:12px 0;">No grade entries yet.</p>';
  }

  const dupeSet = new Set(duplicates.map(d => d.label));
  const rows = entries.map((e, idx) => {
    const isDupe = dupeSet.has(e.label);
    const rowClass = isDupe ? 'grade-duplicate' : '';
    const badge = isDupe ? '<span class="grade-duplicate-badge">Duplicate</span>' : '';
    return `<tr class="${rowClass}">
      <td class="grade-label-cell">${escapeHtml(e.label)} ${badge}</td>
      <td class="grade-point-cell">${e.point}</td>
      <td class="grade-point-cell" style="color:var(--success);">${e.point > 0 ? (e.point >= 4 ? '✓' : '⚠') : '✗'}</td>
    </tr>`;
  }).join('');

  return `
    <table class="grade-preview-table">
      <thead>
        <tr>
          <th>Grade Label</th>
          <th>Grade Point</th>
          <th>Valid</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Build validation summary HTML
 */
function buildValidationHTML(errors) {
  if (errors.length === 0) {
    return '<div class="validation-summary success"><p>✅ All grades look good! Give your scale a name and save.</p></div>';
  }
  const items = errors.map(e => `<p>⚠️ ${escapeHtml(e)}</p>`).join('');
  return `<div class="validation-summary">${items}</div>`;
}

// ===== SAVE CUSTOM SCALE WITH MODAL =====

saveCustomScaleBtn.addEventListener('click', function () {
  const rows = customGradesContainer.querySelectorAll('.custom-grade-row');
  const { valid, entries, errors } = collectAndValidateGradeEntries(rows);

  // Show the save modal with grade preview
  showSaveScaleModal(entries, errors, valid);
});

/**
 * Opens a modal with scale name input, grade preview, and validation
 */
function showSaveScaleModal(entries, validationErrors, isValid) {
  const previewHtml = buildGradePreviewHTML(entries, []);

  // Find duplicate labels specifically for preview highlighting
  const seen = new Set();
  const duplicates = [];
  entries.forEach(e => {
    if (seen.has(e.label)) duplicates.push(e);
    seen.add(e.label);
  });
  const previewHtmlWithDupes = buildGradePreviewHTML(entries, duplicates);

  const validationHtml = buildValidationHTML(validationErrors);

  const totalPoints = entries.reduce((sum, e) => sum + e.point, 0);
  const avgPoint = entries.length > 0 ? (totalPoints / entries.length).toFixed(1) : '—';

  const bodyHtml = `
    <div class="modal-form-group">
      <label for="scale-name-input">Scale Name <span style="color:var(--danger)">*</span></label>
      <input type="text" id="scale-name-input" class="form-input" placeholder="e.g. My University (10-point)" maxlength="60" autocomplete="off">
      <div class="form-hint">Give your scale a descriptive name — it will appear in the dropdown.</div>
      <div id="scale-name-error" class="form-error">Please enter a name for your scale.</div>
    </div>

    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:4px;">
        <span style="font-size:14px;font-weight:600;color:var(--text);">📋 Grades Preview</span>
        <span style="font-size:12px;color:var(--text-muted);">${entries.length} grade${entries.length !== 1 ? 's' : ''} · Avg ${avgPoint} pts</span>
      </div>
      ${previewHtmlWithDupes}
    </div>

    <div id="modal-validation-summary">
      ${validationHtml}
    </div>
  `;

  showModal({
    title: '💾 Save Custom Scale',
    type: 'info',
    messageHtml: bodyHtml,
    dismissible: true,
    buttons: [
      {
        label: 'Cancel',
        type: 'secondary',
        action: () => closeModal()
      },
      {
        label: '💾 Save Scale',
        type: 'primary',
        attrs: { id: 'modal-save-scale-btn' },
        action: (modalEl, overlay) => {
          handleModalSave(modalEl, overlay, entries);
        }
      }
    ],
    onOpen: (modalEl) => {
      const nameInput = modalEl.querySelector('#scale-name-input');
      const saveBtn = modalEl.querySelector('#modal-save-scale-btn');

      // Focus name input
      setTimeout(() => nameInput.focus(), 100);

      // Disable save if no valid entries
      if (!isValid) {
        saveBtn.disabled = true;
      }

      // Live validation on name input
      nameInput.addEventListener('input', function () {
        const errorEl = modalEl.querySelector('#scale-name-error');
        if (this.value.trim().length > 0) {
          errorEl.classList.remove('visible');
          this.classList.remove('input-error');
        } else {
          errorEl.classList.add('visible');
          this.classList.add('input-error');
        }

        // Enable/disable save button based on both validity and name
        const nameOk = this.value.trim().length > 0;
        saveBtn.disabled = !(isValid && nameOk);
      });

      // Enter key to save
      nameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !saveBtn.disabled) {
          saveBtn.click();
        }
      });

      // Initial validation state for save button
      saveBtn.disabled = !(isValid && false); // disabled until name is entered
    }
  });
}

/**
 * Handle the modal save action — finalizes scale creation
 */
function handleModalSave(modalEl, overlay, entries) {
  const nameInput = modalEl.querySelector('#scale-name-input');
  const nameError = modalEl.querySelector('#scale-name-error');
  const name = nameInput.value.trim();

  // Validate name
  if (!name) {
    nameError.classList.add('visible');
    nameInput.classList.add('input-error');
    nameInput.focus();
    return;
  }

  if (name.length < 2) {
    nameError.textContent = 'Scale name must be at least 2 characters.';
    nameError.classList.add('visible');
    nameInput.classList.add('input-error');
    nameInput.focus();
    return;
  }

  // Check for duplicate name against existing scales (both presets and custom)
  const allExisting = [...GRADING_SCALES, ...state.customScales];
  const nameExists = allExisting.some(s => s.name.toLowerCase() === name.toLowerCase());
  if (nameExists) {
    nameError.textContent = 'A scale with this name already exists. Choose a different name.';
    nameError.classList.add('visible');
    nameInput.classList.add('input-error');
    nameInput.focus();
    return;
  }

  // Final validation — re-check grades
  if (entries.length === 0) {
    showToast('Cannot save: No valid grade entries.', 'error');
    return;
  }

  // All good — create the scale
  const scaleId = 'custom-' + Date.now();
  const maxPoint = Math.max(...entries.map(g => g.point));

  const newScale = {
    id: scaleId,
    name: name,
    maxScale: maxPoint,
    isCustom: true,
    grades: entries.map(e => ({ label: e.label, point: e.point }))
  };

  state.customScales.push(newScale);
  state.selectedScaleId = scaleId;
  saveAppState(state);

  // Close modal
  closeModal();

  // Reset builder
  customGradesContainer.innerHTML = '';
  addCustomGradeRow();
  hideCustomBuilder();

  // Refresh scale dropdown and update UI
  populateScaleSelect();
  updateAllGradeDropdowns();
  calculateAll();

  // Success toast
  showToast(`✅ "${name}" scale created and selected!`, 'success', 5000);
}

cancelCustomScaleBtn.addEventListener('click', function () {
  // Switch back to previously selected non-custom scale
  const prevScale = GRADING_SCALES.find(s => s.id === state.selectedScaleId) ||
    state.customScales.find(s => s.id === state.selectedScaleId);
  
  if (!prevScale || state.selectedScaleId === 'custom') {
    state.selectedScaleId = GRADING_SCALES[0].id;
  }
  saveAppState(state);
  populateScaleSelect();
  hideCustomBuilder();
  updateAllGradeDropdowns();
  calculateAll();
});

// ===== SEMESTER MANAGEMENT =====
addSemesterBtn.addEventListener('click', function () {
  addSemester();
});

function addSemester(subjectsData = null) {
  semesterCounter++;
  const semesterId = 'sem-' + Date.now() + '-' + semesterCounter;
  const label = 'Semester ' + (state.semesters.length + 1);

  const newSemester = {
    id: semesterId,
    label: label,
    subjects: subjectsData || []
  };

  state.semesters.push(newSemester);
  saveAppState(state);
  renderAllSemesters();
  updateResults();
}

function removeSemester(semesterId) {
  state.semesters = state.semesters.filter(s => s.id !== semesterId);
  saveAppState(state);
  renderAllSemesters();
  updateResults();
}

function addSubjectToSemester(semesterId, subjectData = null) {
  const semester = state.semesters.find(s => s.id === semesterId);
  if (!semester) return;

  const newSubject = subjectData || {
    id: 'subj-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    name: '',
    credits: '',
    gradeLabel: ''
  };

  semester.subjects.push(newSubject);
  saveAppState(state);
  renderAllSemesters();
  calculateAll();
}

function removeSubjectFromSemester(semesterId, subjectId) {
  const semester = state.semesters.find(s => s.id === semesterId);
  if (!semester) return;

  semester.subjects = semester.subjects.filter(s => s.id !== subjectId);
  saveAppState(state);
  renderAllSemesters();
  calculateAll();
}

function updateSubjectField(semesterId, subjectId, field, value) {
  const semester = state.semesters.find(s => s.id === semesterId);
  if (!semester) return;

  const subject = semester.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  if (field === 'credits') {
    subject.credits = value === '' ? '' : parseFloat(value);
  } else if (field === 'name') {
    subject.name = value;
  } else if (field === 'gradeLabel') {
    subject.gradeLabel = value;
  }

  saveAppState(state);
  calculateAll();
}

// ===== RENDER =====
function renderAllSemesters() {
  semestersContainer.innerHTML = '';

  if (state.semesters.length === 0) {
    emptyState.classList.remove('hidden');
    semestersContainer.appendChild(emptyState);
    return;
  }

  emptyState.classList.add('hidden');

  state.semesters.forEach((semester, idx) => {
    const card = document.createElement('div');
    card.className = 'semester-card';
    card.dataset.semesterId = semester.id;

    const currentScale = findScaleById(state.selectedScaleId);
    const sgpa = calculateSemesterSGPA(semester, currentScale);
    const sgpaDisplay = sgpa !== null ? sgpa.toFixed(2) : '—';

    card.innerHTML = `
      <div class="semester-header">
        <span class="semester-title">Semester ${idx + 1}</span>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="semester-sgpa ${sgpa === null ? 'empty' : ''}">SGPA: ${sgpaDisplay}</span>
          <button class="btn btn-danger btn-sm remove-semester-btn" type="button">Remove Semester</button>
        </div>
      </div>
      <div class="subject-rows" data-semester-id="${semester.id}"></div>
      <button class="btn btn-secondary btn-sm add-subject-btn" type="button" data-semester-id="${semester.id}">
        + Add Subject
      </button>
    `;

    const subjectRowsContainer = card.querySelector('.subject-rows');
    const addSubjectBtn = card.querySelector('.add-subject-btn');

    // Render subjects
    semester.subjects.forEach(subject => {
      const row = createSubjectRow(semester.id, subject, currentScale);
      subjectRowsContainer.appendChild(row);
    });

    // Add subject button
    addSubjectBtn.addEventListener('click', function () {
      addSubjectToSemester(semester.id);
    });

    // Remove semester button
    card.querySelector('.remove-semester-btn').addEventListener('click', function () {
      if (confirm('Remove this semester and all its subjects?')) {
        removeSemester(semester.id);
      }
    });

    semestersContainer.appendChild(card);
  });
}

function createSubjectRow(semesterId, subject, scale) {
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.dataset.subjectId = subject.id;

  const grades = scale ? scale.grades : [];
  const gradeOptions = grades.map(g =>
    `<option value="${g.label}" ${subject.gradeLabel === g.label ? 'selected' : ''}>${g.label} (${g.point})</option>`
  ).join('');

  row.innerHTML = `
    <input type="text" class="subject-name-input" placeholder="Subject (optional)" value="${escapeHtml(subject.name || '')}" maxlength="100">
    <input type="number" class="subject-credit-input" placeholder="Credits" value="${subject.credits !== '' && subject.credits !== undefined ? subject.credits : ''}" min="0" max="30" step="0.5">
    <select class="subject-grade-select">
      <option value="">— Grade —</option>
      ${gradeOptions}
    </select>
    <button class="btn btn-danger btn-sm" type="button" title="Remove subject">✕</button>
  `;

  // Event listeners
  const nameInput = row.querySelector('.subject-name-input');
  const creditInput = row.querySelector('.subject-credit-input');
  const gradeSelect = row.querySelector('.subject-grade-select');
  const removeBtn = row.querySelector('.btn-danger');

  let debounceTimer;

  function handleChange() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      validateAndUpdate();
    }, 300);
  }

  function validateAndUpdate() {
    const credits = creditInput.value.trim();
    const gradeLabel = gradeSelect.value;

    // Validation
    creditInput.classList.remove('input-error');
    let errorEl = row.querySelector('.error-msg');
    if (errorEl) errorEl.remove();

    if (credits !== '' && (isNaN(parseFloat(credits)) || parseFloat(credits) <= 0)) {
      creditInput.classList.add('input-error');
      const err = document.createElement('div');
      err.className = 'error-msg';
      err.textContent = 'Enter a valid positive number for credits.';
      row.appendChild(err);
    }

    updateSubjectField(semesterId, subject.id, 'name', nameInput.value);
    updateSubjectField(semesterId, subject.id, 'credits', credits);
    updateSubjectField(semesterId, subject.id, 'gradeLabel', gradeLabel);

    // Update SGPA display
    updateSemesterSGPADisplay(semesterId);
  }

  nameInput.addEventListener('input', handleChange);
  creditInput.addEventListener('input', handleChange);
  gradeSelect.addEventListener('change', function () {
    validateAndUpdate();
  });

  removeBtn.addEventListener('click', function () {
    removeSubjectFromSemester(semesterId, subject.id);
  });

  return row;
}

function updateAllGradeDropdowns() {
  const scale = findScaleById(state.selectedScaleId);
  if (!scale) return;

  const allSelects = document.querySelectorAll('.subject-grade-select');
  allSelects.forEach(select => {
    const currentValue = select.value;
    const options = scale.grades.map(g =>
      `<option value="${g.label}" ${currentValue === g.label ? 'selected' : ''}>${g.label} (${g.point})</option>`
    ).join('');
    select.innerHTML = `<option value="">— Grade —</option>\n${options}`;
  });

  // Recalculate
  calculateAll();
}

function updateSemesterSGPADisplay(semesterId) {
  const semester = state.semesters.find(s => s.id === semesterId);
  if (!semester) return;

  const scale = findScaleById(state.selectedScaleId);
  const sgpa = calculateSemesterSGPA(semester, scale);

  const cards = document.querySelectorAll('.semester-card');
  for (const card of cards) {
    if (card.dataset.semesterId === semesterId) {
      const sgpaEl = card.querySelector('.semester-sgpa');
      if (sgpaEl) {
        sgpaEl.textContent = sgpa !== null ? `SGPA: ${sgpa.toFixed(2)}` : 'SGPA: —';
        sgpaEl.className = `semester-sgpa ${sgpa === null ? 'empty' : ''}`;
      }
      break;
    }
  }

  updateResults();
}

// ===== CALCULATION LOGIC =====
function calculateSemesterSGPA(semester, scale) {
  if (!semester || !scale || semester.subjects.length === 0) return null;

  let totalPoints = 0;
  let totalCredits = 0;

  semester.subjects.forEach(subject => {
    const credits = parseFloat(subject.credits);
    if (isNaN(credits) || credits <= 0) return;
    if (!subject.gradeLabel) return;

    const grade = scale.grades.find(g => g.label === subject.gradeLabel);
    if (!grade) return;

    totalPoints += credits * grade.point;
    totalCredits += credits;
  });

  if (totalCredits === 0) return null;

  return totalPoints / totalCredits;
}

function calculateCGPA() {
  const scale = findScaleById(state.selectedScaleId);
  if (!scale || state.semesters.length === 0) return null;

  let totalPoints = 0;
  let totalCredits = 0;

  state.semesters.forEach(semester => {
    semester.subjects.forEach(subject => {
      const credits = parseFloat(subject.credits);
      if (isNaN(credits) || credits <= 0) return;
      if (!subject.gradeLabel) return;

      const grade = scale.grades.find(g => g.label === subject.gradeLabel);
      if (!grade) return;

      totalPoints += credits * grade.point;
      totalCredits += credits;
    });
  });

  if (totalCredits === 0) return null;

  return totalPoints / totalCredits;
}

function calculateAll() {
  // Recalculate all semester SGPAs
  state.semesters.forEach(semester => {
    updateSemesterSGPADisplay(semester.id);
  });

  // Update overall results
  updateResults();
}

function updateResults() {
  const scale = findScaleById(state.selectedScaleId);
  const cgpa = calculateCGPA();
  const activeSemesters = state.semesters.filter(s => s.subjects.length > 0);

  totalSemestersEl.textContent = state.semesters.length;
  overallCgpaEl.textContent = cgpa !== null ? cgpa.toFixed(2) : '—';
  
  if (cgpa === null) {
    overallCgpaEl.className = 'result-value empty';
  } else {
    overallCgpaEl.className = 'result-value';
  }
}

// ===== UTILITY =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== START APP =====
document.addEventListener('DOMContentLoaded', function () {
  // Add initial empty custom grade row if builder is visible
  if (customGradesContainer.children.length === 0) {
    addCustomGradeRow();
  }

  init();

  // If no semesters, show empty state properly
  if (state.semesters.length === 0) {
    emptyState.classList.remove('hidden');
    semestersContainer.appendChild(emptyState);
  }
});

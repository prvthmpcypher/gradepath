// presets.js — Grading Scale Data
// Each scale is an object matching the GradingScale data model from the PRD.

const GRADING_SCALES = [
  {
    id: 'vtu',
    name: 'VTU (10-point) — CBCS',
    maxScale: 10,
    isCustom: false,
    grades: [
      { label: 'S', point: 10 },
      { label: 'A', point: 9 },
      { label: 'B', point: 8 },
      { label: 'C', point: 7 },
      { label: 'D', point: 6 },
      { label: 'E', point: 5 },
      { label: 'F', point: 0 }
    ]
  },
  {
    id: 'anna-univ',
    name: 'Anna University',
    maxScale: 10,
    isCustom: false,
    grades: [
      { label: 'O', point: 10 },
      { label: 'A+', point: 9 },
      { label: 'A', point: 8 },
      { label: 'B+', point: 7 },
      { label: 'B', point: 6 },
      { label: 'C', point: 5 },
      { label: 'U', point: 0 }
    ]
  },
  {
    id: 'generic-10',
    name: 'Generic 10-point',
    maxScale: 10,
    isCustom: false,
    grades: [
      { label: 'O', point: 10 },
      { label: 'A+', point: 9 },
      { label: 'A', point: 8 },
      { label: 'B+', point: 7 },
      { label: 'B', point: 6 },
      { label: 'C', point: 5 },
      { label: 'P', point: 4 },
      { label: 'F', point: 0 }
    ]
  }
];

// Helper to find a scale by id
function findScaleById(id) {
  // Check presets first
  const preset = GRADING_SCALES.find(s => s.id === id);
  if (preset) return preset;
  // Then check custom scales saved in app state
  const state = getAppState();
  return state.customScales.find(s => s.id === id) || null;
}

// Helper to get all available scales (presets + custom)
function getAllScales() {
  const state = getAppState();
  return [...GRADING_SCALES, ...state.customScales];
}

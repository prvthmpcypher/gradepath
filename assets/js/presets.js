// presets.js — Grading Scale Data
// Each scale is an object matching the GradingScale data model from the PRD.

export const GRADING_SCALES = [
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

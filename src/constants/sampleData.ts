import { Semester } from '../types/grade';

export const SAMPLE_SEMESTERS: Semester[] = [
  {
    id: 'sample-sem-1',
    name: 'Semester 1',
    subjects: [
      { id: 'sub-101', name: 'Engineering Mathematics I', credits: 4, gradeLabel: 'S' },
      { id: 'sub-102', name: 'Engineering Physics', credits: 4, gradeLabel: 'A' },
      { id: 'sub-103', name: 'Basic Electrical Engineering', credits: 3, gradeLabel: 'S' },
      { id: 'sub-104', name: 'Elements of Civil Engineering', credits: 3, gradeLabel: 'B' },
      { id: 'sub-105', name: 'Physics Laboratory', credits: 1.5, gradeLabel: 'S' },
      { id: 'sub-106', name: 'Basic Electrical Workshop', credits: 1.5, gradeLabel: 'A' },
    ],
  },
  {
    id: 'sample-sem-2',
    name: 'Semester 2',
    subjects: [
      { id: 'sub-201', name: 'Engineering Mathematics II', credits: 4, gradeLabel: 'A' },
      { id: 'sub-202', name: 'Engineering Chemistry', credits: 4, gradeLabel: 'S' },
      { id: 'sub-203', name: 'Computer Programming (C/C++)', credits: 3, gradeLabel: 'S' },
      { id: 'sub-204', name: 'Basic Electronics Engineering', credits: 3, gradeLabel: 'A' },
      { id: 'sub-205', name: 'Computer Programming Lab', credits: 1.5, gradeLabel: 'S' },
      { id: 'sub-206', name: 'Chemistry Laboratory', credits: 1.5, gradeLabel: 'A' },
    ],
  },
  {
    id: 'sample-sem-3',
    name: 'Semester 3',
    subjects: [
      { id: 'sub-301', name: 'Data Structures and Applications', credits: 4, gradeLabel: 'S' },
      { id: 'sub-302', name: 'Analog and Digital Electronics', credits: 4, gradeLabel: 'B' },
      { id: 'sub-303', name: 'Computer Organization & Arch', credits: 3, gradeLabel: 'A' },
      { id: 'sub-304', name: 'Software Engineering', credits: 3, gradeLabel: 'S' },
      { id: 'sub-305', name: 'Data Structures Laboratory', credits: 1.5, gradeLabel: 'S' },
      { id: 'sub-306', name: 'ADE Laboratory', credits: 1.5, gradeLabel: 'A' },
    ],
  },
];

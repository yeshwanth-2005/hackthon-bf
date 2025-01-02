import { useState } from 'react';
import { Student } from '../types/student';
import { StudentFormData } from '../components/students/AddStudentModal';

// Mock data - replace with API calls
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    enrollmentDate: '2024-01-15',
    overallGrade: 92,
    status: 'active',
    courses: [
      {
        id: '1',
        name: 'Web Development',
        progress: 75,
        grade: 88,
        testScores: [
          { id: '1', name: 'Midterm', score: 85, date: '2024-02-15' },
          { id: '2', name: 'Final', score: 92, date: '2024-03-15' }
        ],
        projects: [
          { id: '1', name: 'Portfolio Website', status: 'completed', grade: 90, dueDate: '2024-02-28' },
          { id: '2', name: 'E-commerce Site', status: 'in_progress', dueDate: '2024-04-15' }
        ]
      }
    ]
  }
];

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const addStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: data.name,
      email: data.email,
      enrollmentDate: new Date().toISOString().split('T')[0],
      overallGrade: 0,
      status: 'active',
      courses: []
    };

    setStudents([...students, newStudent]);
  };

  return {
    students,
    selectedStudent,
    setSelectedStudent,
    addStudent
  };
};
import React from 'react';
import { StudentList } from '../../components/students/StudentList';
import { StudentProfile } from '../../components/students/StudentProfile';
import { useStudents } from '../../hooks/useStudent';
import { StudentFormData } from '../../components/students/AddStudentModal';

export const StudentDashboard = () => {
  const { students, selectedStudent, setSelectedStudent, addStudent } = useStudents();

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <StudentList
          students={students}
          onSelectStudent={setSelectedStudent}
          onAddStudent={addStudent}
        />
      </div>
      <div className="col-span-8">
        {selectedStudent ? (
          <StudentProfile student={selectedStudent} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Select a student to view their profile</p>
          </div>
        )}
      </div>
    </div>
  );
};
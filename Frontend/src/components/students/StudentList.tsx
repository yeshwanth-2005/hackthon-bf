import React, { useState } from 'react';
import { Student } from '../../types/student';
import { Search, Filter, UserPlus } from 'lucide-react';
import { AddStudentModal, StudentFormData } from './AddStudentModal';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onAddStudent: (data: StudentFormData) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  onSelectStudent,
  onAddStudent 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'top_performers' | 'pending_tasks'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'top_performers':
        return student.overallGrade >= 90;
      case 'pending_tasks':
        return student.courses.some(course => 
          course.projects.some(project => project.status === 'pending')
        );
      default:
        return true;
    }
  });

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Students</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" />
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All Students</option>
              <option value="top_performers">Top Performers</option>
              <option value="pending_tasks">Pending Tasks</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectStudent(student)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{student.overallGrade}%</p>
                  <p className="text-sm text-gray-600">{student.courses.length} Courses</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddStudent}
      />
    </>
  );
};
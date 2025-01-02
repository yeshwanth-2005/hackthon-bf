import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Student } from '../../types/student';
import { GraduationCap, BookOpen, Trophy, Clock } from 'lucide-react';

interface StudentProfileProps {
  student: Student;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const testScoreData = student.courses.flatMap(course =>
    course.testScores.map(score => ({
      date: score.date,
      score: score.score,
      course: course.name,
    }))
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-600">{student.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full ${
            student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Overall Grade</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{student.overallGrade}%</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Active Courses</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{student.courses.length}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Completed Projects</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {student.courses.reduce((acc, course) => 
              acc + course.projects.filter(p => p.status === 'completed').length, 0
            )}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600">Pending Tasks</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {student.courses.reduce((acc, course) => 
              acc + course.projects.filter(p => p.status === 'pending').length, 0
            )}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>
        <div className="h-64">
          <LineChart width={800} height={250} data={testScoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#3B82F6" />
          </LineChart>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Course Progress</h3>
        {student.courses.map(course => (
          <div key={course.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{course.name}</h4>
              <span className="text-sm text-gray-600">Grade: {course.grade}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
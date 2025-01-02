import React, { useState } from "react";
import CourseForm from "../../components/courses/CourseForm";
import CourseLibrary from "../../components/courses/CourseLibrary";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  semester: string;
  year: number;
  resources: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateCourse = (courseData: Omit<Course, "id">) => {
    const newCourse = {
      ...courseData,
      id: Math.random().toString(36).substr(2, 9),
    };

    setCourses([...courses, newCourse]);
    setShowForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleUpdateCourse = (courseData: Omit<Course, "id">) => {
    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? { ...courseData, id: course.id }
          : course
      );
      setCourses(updatedCourses);
      setIsEditing(false);
      setEditingCourse(null);
      setShowForm(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Course
            </button>
          )}
        </div>

        {showForm ? (
          <div className="mb-8">
            <CourseForm
              onSubmit={isEditing ? handleUpdateCourse : handleCreateCourse}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setEditingCourse(null);
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <CourseLibrary
            courses={courses}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        )}
      </div>
    </div>
  );
}

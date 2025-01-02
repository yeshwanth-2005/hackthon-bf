import React, { useState } from 'react';
import { Upload, BookOpen, Clock, User, Search, Filter } from 'lucide-react';

interface Resource {
  name: string;
  type: 'pdf' | 'video' | 'slide';
  url: string;
}

interface CourseFormProps {
  onSubmit: (courseData: any) => void;
}

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: '',
    semester: '',
    year: new Date().getFullYear(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleResourceAdd = (type: 'pdf' | 'video' | 'slide') => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = type === 'pdf' ? '.pdf' : type === 'video' ? 'video/*' : '.ppt,.pptx';
    
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you'd upload to a server here
        const newResource = {
          name: file.name,
          type,
          url: URL.createObjectURL(file)
        };
        setResources([...resources, newResource]);
      }
    };
    
    fileInput.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...courseData, resources });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Course</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (weeks)</label>
              <input
                type="number"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
              <input
                type="text"
                name="instructor"
                value={courseData.instructor}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <select
                name="semester"
                value={courseData.semester}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select Semester</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                name="year"
                value={courseData.year}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resources</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleResourceAdd('pdf')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add PDF
              </button>
              <button
                type="button"
                onClick={() => handleResourceAdd('video')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Video
              </button>
              <button
                type="button"
                onClick={() => handleResourceAdd('slide')}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Slides
              </button>
            </div>

            {resources.length > 0 && (
              <div className="mt-4 space-y-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-600">{resource.name}</span>
                    <button
                      type="button"
                      onClick={() => setResources(resources.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Course
          </button>
        </div>
      </div>
    </form>
  );
}
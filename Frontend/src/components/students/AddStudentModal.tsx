import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
  studentId?: string; // Optional ID for update
}

export interface StudentFormData {
  id?: string; // Optional ID for update
  name: string;
  email: string;
  courses: string[];
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  studentId,
}) => {
  const [formData, setFormData] = React.useState<StudentFormData>({
    name: '',
    email: '',
    courses: [],
  });
  const [isUpdate, setIsUpdate] = React.useState(false);

  // Check if we are updating an existing student
  useEffect(() => {
    if (studentId) {
      setIsUpdate(true);
      // Fetch existing student data if we have an ID
      axios
        .get(`http://localhost:5000/api/students/${studentId}`)
        .then((response) => {
          const student = response.data;
          setFormData({
            id: student._id, // Set the student ID
            name: student.name,
            email: student.email,
            courses: student.courses || [],
          });
        })
        .catch((error) => {
          console.error('Error fetching student:', error);
        });
    } else {
      setIsUpdate(false);
      setFormData({ name: '', email: '', courses: [] });
    }
  }, [studentId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdate) {
      // If we are updating, send a PUT request
      try {
        const response = await axios.put(
          `http://localhost:5000/api/students/${formData.id}`,
          formData
        );
        console.log('Student updated:', response.data);
        onSubmit(response.data); // Notify parent of the update
      } catch (error) {
        console.error('Error updating student:', error);
      }
    } else {
      // If we are adding, send a POST request
      try {
        const response = await axios.post(
          'http://localhost:5000/api/students',
          formData
        );
        console.log('Student created:', response.data);
        onSubmit(response.data); // Notify parent of the new student
      } catch (error) {
        console.error('Error creating student:', error);
      }
    }

    setFormData({ name: '', email: '', courses: [] }); // Clear form data
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isUpdate ? 'Update Student' : 'Add New Student'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Courses</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.courses.join(', ')}
              onChange={(e) => setFormData({ ...formData, courses: e.target.value.split(', ') })}
              placeholder="Enter comma-separated courses"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {isUpdate ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  
import React, { useState } from 'react';
import { Calendar, Clock, Upload, File } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Assignment, AttachedFile } from '../../types/assignment';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface AssignmentFormProps {
  onSubmit: (data: Omit<Assignment, 'id'>) => void;
  initialData?: Assignment;
}

export default function AssignmentForm({ onSubmit, initialData }: AssignmentFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    deadline: initialData?.deadline ? new Date(initialData.deadline) : new Date(),
    instructions: initialData?.instructions || '',
    maxScore: initialData?.maxScore || 100,
    courseId: initialData?.courseId || '',
    materials: initialData?.materials || [],
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles: AttachedFile[] = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, ...newFiles]
      }));
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <Input
          label="Assignment Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div>
        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="datetime-local"
            label="Deadline"
            value={formData.deadline.toISOString().slice(0, 16)}
            onChange={(e) => setFormData(prev => ({ ...prev, deadline: new Date(e.target.value) }))}
            required
            icon={<Calendar className="h-4 w-4" />}
          />
        </div>
        <div>
          <Input
            type="number"
            label="Maximum Score"
            value={formData.maxScore}
            onChange={(e) => setFormData(prev => ({ ...prev, maxScore: parseInt(e.target.value) }))}
            required
            min={0}
          />
        </div>
      </div>

      <div>
        <TextArea
          label="Submission Instructions"
          value={formData.instructions}
          onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
          required
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supporting Materials
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drag and drop files here, or click to select files
          </p>
        </div>

        {formData.materials.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.materials.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    materials: prev.materials.filter(f => f.id !== file.id)
                  }))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="submit" variant="primary">
          {initialData ? 'Update Assignment' : 'Create Assignment'}
        </Button>
      </div>
    </form>
  );
}
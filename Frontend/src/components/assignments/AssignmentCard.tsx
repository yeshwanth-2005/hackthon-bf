import React from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { Assignment } from '../../types/assignment';
import Button from '../ui/Button';

interface AssignmentCardProps {
  assignment: Assignment;
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignmentId: string) => void;
}

export default function AssignmentCard({ assignment, onEdit, onDelete }: AssignmentCardProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      onDelete(assignment.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(assignment)}
            className="flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{assignment.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
        </div>
        <p className="text-sm">
          <span className="font-medium">Max Score:</span> {assignment.maxScore}
        </p>
        {assignment.materials.length > 0 && (
          <p className="text-sm">
            <span className="font-medium">Materials:</span> {assignment.materials.length} files attached
          </p>
        )}
      </div>
    </div>
  );
}
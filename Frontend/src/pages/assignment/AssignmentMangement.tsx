import React, { useState } from 'react';
import { Assignment, Submission } from '../../types/assignment';
import AssignmentForm from '../../components/assignments/AssignmentForm';
import SubmissionGrading from '../../components/assignments/SubmissionGrading';
import AssignmentCard from '../../components/assignments/AssignmentCard';
import Button from '../../components/ui/Button';
import { PlusCircle } from 'lucide-react';



export default function AssignmentManagement() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submission, setSubmissions] = useState<Submission[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const handleCreateAssignment = (data: Omit<Assignment, 'id'>) => {
    const newAssignment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9)
    };
    setAssignments([...assignments, newAssignment]);
    setShowForm(false);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleUpdateAssignment = (data: Omit<Assignment, 'id'>) => {
    if (editingAssignment) {
      setAssignments(prev =>
        prev.map(assignment =>
          assignment.id === editingAssignment.id
            ? { ...data, id: assignment.id }
            : assignment
        )
      );
      setEditingAssignment(null);
      setShowForm(false);
    }
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
  };

  const handleGradeSubmission = (
    submissionId: string,
    grade: number,
    feedback: string,
    feedbackFiles: any[]
  ) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, grade, feedback, feedbackFiles }
          : sub
      )
    );
    setSelectedSubmission(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Assignment Management</h1>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingAssignment(null);
            }}
            variant="primary"
            className="flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Assignment
          </Button>
        </div>

        {showForm ? (
          <div className="mb-8">
            <AssignmentForm
              onSubmit={editingAssignment ? handleUpdateAssignment : handleCreateAssignment}
              initialData={editingAssignment || undefined}
            />
            <div className="mt-4 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingAssignment(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : selectedSubmission ? (
          <SubmissionGrading
            submission={selectedSubmission}
            onGrade={handleGradeSubmission}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map(assignment => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onEdit={handleEditAssignment}
                onDelete={handleDeleteAssignment}
              />
            ))}
            {assignments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No assignments yet. Create your first assignment!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
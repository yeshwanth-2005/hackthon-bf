import React, { useState } from 'react';
import { InterviewForm } from '../../components/interviews/InterviewForm';
import { InterviewList } from '../../components/interviews/InterviewList';
import type { Interview } from '../../types/interview';

export function InterviewManagement() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const handleCreateInterview = (data: Omit<Interview, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newInterview: Interview = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInterviews([...interviews, newInterview]);
  };

  const handleUpdateInterview = (data: Omit<Interview, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingInterview) return;
    
    const updatedInterview: Interview = {
      ...editingInterview,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    setInterviews(interviews.map((interview) =>
      interview.id === editingInterview.id ? updatedInterview : interview
    ));
    setEditingInterview(null);
  };

  const handleDeleteInterview = (interviewId: string) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      setInterviews(interviews.filter((interview) => interview.id !== interviewId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {editingInterview ? 'Edit Interview' : 'Create New Interview'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {editingInterview
              ? 'Update the interview details below'
              : 'Fill in the details to create a new interview'}
          </p>
        </div>

        <InterviewForm
          onSubmit={editingInterview ? handleUpdateInterview : handleCreateInterview}
          initialData={editingInterview || undefined}
        />

        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all scheduled interviews
          </p>
          <div className="mt-6">
            <InterviewList
              interviews={interviews}
              onEdit={setEditingInterview}
              onDelete={handleDeleteInterview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
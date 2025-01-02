import React, { useState } from 'react';
import { Test, Question } from '../../types/test';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import QuestionForm from './QuestionForm';
import { Plus, Clock, Calendar } from 'lucide-react';

interface TestFormProps {
  onSubmit: (test: Omit<Test, 'id'>) => void;
  initialData?: Test;
}

export default function TestForm({ onSubmit, initialData }: TestFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    duration: initialData?.duration || 60,
    scheduledFor: initialData?.scheduledFor || new Date(),
    randomizeQuestions: initialData?.randomizeQuestions || false,
    questions: initialData?.questions || [],
    courseId: initialData?.courseId || '',
    totalMarks: initialData?.totalMarks || 0,
  });

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      type: 'mcq',
      marks: 0,
      options: []
    };
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleQuestionChange = (index: number, questionData: Partial<Question>) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...questionData };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions,
      totalMarks: updatedQuestions.reduce((sum, q) => sum + (q.marks || 0), 0)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Test Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <TextArea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <Input
                type="number"
                label="Duration (minutes)"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                min={1}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Input
                type="datetime-local"
                label="Schedule For"
                value={new Date(formData.scheduledFor).toISOString().slice(0, 16)}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: new Date(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.randomizeQuestions}
              onChange={(e) => setFormData(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="text-sm text-gray-700">Randomize questions for each student</label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Questions</h3>
          <Button
            type="button"
            onClick={handleAddQuestion}
            variant="secondary"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>

        <div className="space-y-4">
          {formData.questions.map((question, index) => (
            <QuestionForm
              key={question.id}
              question={question}
              onChange={(questionData) => handleQuestionChange(index, questionData)}
              onRemove={() => {
                const updatedQuestions = formData.questions.filter((_, i) => i !== index);
                setFormData(prev => ({
                  ...prev,
                  questions: updatedQuestions,
                  totalMarks: updatedQuestions.reduce((sum, q) => sum + (q.marks || 0), 0)
                }));
              }}
            />
          ))}
        </div>

        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">Total Marks: {formData.totalMarks}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="submit" variant="primary">
          {initialData ? 'Update Test' : 'Create Test'}
        </Button>
      </div>
    </form>
  );
}
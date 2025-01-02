import React, { useState } from 'react';
import { Test, TestAnalytics as TestAnalyticsType } from '../../types/test';
import TestForm from '../../components/tests/TestForm';
import TestAnalytics from '../../components/tests/TestAnalytics';
import Button from '../../components/ui/Button';
import { PlusCircle, BarChart } from 'lucide-react';

export default function TestManagement() {
  const [tests, setTests] = useState<Test[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Mock analytics data
  const mockAnalytics: TestAnalyticsType = {
    averageScore: 75.5,
    highestScore: 95,
    lowestScore: 45,
    totalParticipants: 30,
    questionAnalytics: [
      { questionId: '1', averageScore: 80, correctAnswers: 25 },
      { questionId: '2', averageScore: 65, correctAnswers: 20 },
      { questionId: '3', averageScore: 90, correctAnswers: 28 },
    ],
  };

  const handleCreateTest = (data: Omit<Test, 'id'>) => {
    const newTest = {
      ...data,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTests([...tests, newTest]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
          <Button
            onClick={() => {
              setShowForm(true);
              setSelectedTest(null);
              setShowAnalytics(false);
            }}
            variant="primary"
            className="flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Test
          </Button>
        </div>

        {showForm ? (
          <TestForm
            onSubmit={handleCreateTest}
            initialData={selectedTest || undefined}
          />
        ) : showAnalytics ? (
          <TestAnalytics analytics={mockAnalytics} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map(test => (
              <div key={test.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedTest(test);
                      setShowAnalytics(true);
                    }}
                    className="flex items-center"
                  >
                    <BarChart className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">{test.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span> {test.duration} minutes
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Total Marks:</span> {test.totalMarks}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Questions:</span> {test.questions.length}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Scheduled for:</span>{' '}
                    {new Date(test.scheduledFor).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
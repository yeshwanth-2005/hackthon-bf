import React from 'react';
import { TestAnalytics as TestAnalyticsType } from '../../types/test';
import { BarChart, PieChart, Users } from 'lucide-react';

interface TestAnalyticsProps {
  analytics: TestAnalyticsType;
}

export default function TestAnalytics({ analytics }: TestAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-2xl font-semibold">{analytics.averageScore.toFixed(1)}%</p>
            </div>
            <BarChart className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Highest Score</p>
              <p className="text-2xl font-semibold">{analytics.highestScore.toFixed(1)}%</p>
            </div>
            <PieChart className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Participants</p>
              <p className="text-2xl font-semibold">{analytics.totalParticipants}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Question Analysis</h3>
        <div className="space-y-4">
          {analytics.questionAnalytics.map((qa, index) => (
            <div key={qa.questionId} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Question {index + 1}</p>
                <p className="text-sm text-gray-500">
                  Average Score: {qa.averageScore.toFixed(1)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${qa.averageScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {qa.correctAnswers} correct answers
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
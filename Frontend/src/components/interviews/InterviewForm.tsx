import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Interview, Resource } from '../../types/interview';

interface InterviewFormProps {
  onSubmit: (data: Omit<Interview, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Interview;
}

export function InterviewForm({ onSubmit, initialData }: InterviewFormProps) {
  const [resources, setResources] = useState<Omit<Resource, 'id'>[]>(
    initialData?.resources || []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      companyName: formData.get('companyName') as string,
      jobRole: formData.get('jobRole') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      mode: formData.get('mode') as 'online' | 'offline',
      resources,
    });
  };

  const addResource = () => {
    setResources([...resources, { type: 'url', title: '', url: '' }]);
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            defaultValue={initialData?.companyName}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Role
          </label>
          <input
            type="text"
            name="jobRole"
            defaultValue={initialData?.jobRole}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            defaultValue={initialData?.date}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            name="time"
            defaultValue={initialData?.time}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mode
          </label>
          <select
            name="mode"
            defaultValue={initialData?.mode || 'online'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Resources</h3>
          <button
            type="button"
            onClick={addResource}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </button>
        </div>

        {resources.map((resource, index) => (
          <div key={index} className="flex items-start space-x-4">
            <select
              value={resource.type}
              onChange={(e) => {
                const newResources = [...resources];
                newResources[index] = {
                  ...resource,
                  type: e.target.value as Resource['type'],
                };
                setResources(newResources);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="url">URL</option>
            </select>

            <input
              type="text"
              value={resource.title}
              onChange={(e) => {
                const newResources = [...resources];
                newResources[index] = {
                  ...resource,
                  title: e.target.value,
                };
                setResources(newResources);
              }}
              placeholder="Resource Title"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />

            <input
              type="url"
              value={resource.url}
              onChange={(e) => {
                const newResources = [...resources];
                newResources[index] = {
                  ...resource,
                  url: e.target.value,
                };
                setResources(newResources);
              }}
              placeholder="Resource URL"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => removeResource(index)}
              className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {initialData ? 'Update Interview' : 'Create Interview'}
        </button>
      </div>
    </form>
  );
}
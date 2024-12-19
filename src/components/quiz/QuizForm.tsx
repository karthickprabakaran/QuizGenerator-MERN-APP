import React from 'react';
import { Quiz } from '../../types';

interface QuizFormProps {
  quiz: Partial<Quiz>;
  onChange: (field: keyof Quiz, value: any) => void;
}

export function QuizForm({ quiz, onChange }: QuizFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={quiz.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={quiz.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={quiz.category || ''}
            onChange={(e) => onChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Mode
          </label>
          <select
            value={quiz.displayMode || 'all'}
            onChange={(e) => onChange('displayMode', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All at once</option>
            <option value="single">One at a time</option>
          </select>
        </div>
      </div>
    </div>
  );
}
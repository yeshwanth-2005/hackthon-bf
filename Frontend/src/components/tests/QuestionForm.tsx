import React from 'react';
import { Question, QuestionType } from '../../types/test';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Plus, Minus } from 'lucide-react';

interface QuestionFormProps {
  question: Partial<Question>;
  onChange: (question: Partial<Question>) => void;
  onRemove: () => void;
}

export default function QuestionForm({ question, onChange, onRemove }: QuestionFormProps) {
  const handleOptionAdd = () => {
    const newOption = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      isCorrect: false
    };
    onChange({
      ...question,
      options: [...(question.options || []), newOption]
    });
  };

  const handleOptionRemove = (optionId: string) => {
    onChange({
      ...question,
      options: question.options?.filter(opt => opt.id !== optionId)
    });
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex-1 mr-4">
            <TextArea
              label="Question Text"
              value={question.text || ''}
              onChange={(e) => onChange({ ...question, text: e.target.value })}
              required
            />
          </div>
          <Button variant="danger" size="sm" onClick={onRemove}>
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={question.type || 'mcq'}
              onChange={(e) => onChange({ ...question, type: e.target.value as QuestionType })}
            >
              <option value="mcq">Multiple Choice</option>
              <option value="descriptive">Descriptive</option>
            </select>
          </div>
          <Input
            type="number"
            label="Marks"
            value={question.marks || 0}
            onChange={(e) => onChange({ ...question, marks: Number(e.target.value) })}
            min={0}
            required
          />
        </div>

        {question.type === 'mcq' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => {
                    const updatedOptions = question.options?.map(opt => ({
                      ...opt,
                      isCorrect: opt.id === option.id
                    }));
                    onChange({ ...question, options: updatedOptions });
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <Input
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = question.options?.map(opt =>
                      opt.id === option.id ? { ...opt, text: e.target.value } : opt
                    );
                    onChange({ ...question, options: updatedOptions });
                  }}
                  className="flex-1"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleOptionRemove(option.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleOptionAdd}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Option
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
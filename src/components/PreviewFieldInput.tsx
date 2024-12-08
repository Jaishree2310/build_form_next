import React from 'react';
import { Input } from '@/components/ui/input';
import { FormField } from '@/type/form-type';

interface PreviewFieldInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export const PreviewFieldInput: React.FC<PreviewFieldInputProps> = ({ 
  field, 
  value, 
  onChange,
  error 
}) => {
  const inputClassName = `h-8 ${error ? 'border-red-500 focus:ring-red-500' : ''}`;
  
  switch (field.type) {
    case 'single':
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      );
    case 'long':
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[100px] ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
      );
    case 'radio':
      return (
        <div className="space-y-2">
          {field.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={value === option}
                onChange={() => onChange(option)}
                id={`${field.id}-${index}`}
                className={error ? 'text-red-500' : ''}
              />
              <label 
                htmlFor={`${field.id}-${index}`}
                className={error ? 'text-red-500' : ''}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    case 'url':
      return (
        <Input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      );
    case 'date':
      return (
        <Input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      );
    default:
      return null;
  }
};
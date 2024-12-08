import React from 'react';
import { Input } from '@/components/ui/input';
import { FormField } from '@/type/form-type';

interface PreviewFieldInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export const PreviewFieldInput: React.FC<PreviewFieldInputProps> = ({ 
  field, 
  value, 
  onChange 
}) => {
  switch (field.type) {
    case 'single':
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="h-8"
        />
      );
    case 'long':
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
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
              />
              <label htmlFor={`${field.id}-${index}`}>{option}</label>
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
          className="h-8"
        />
      );
    case 'date':
      return (
        <Input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="h-8"
        />
      );
    default:
      return null;
  }
};

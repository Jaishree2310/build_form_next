import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/type/form-type';
import { PreviewFieldInput } from './PreviewFieldInput';

interface PreviewFormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}

export const PreviewFormField: React.FC<PreviewFormFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  return (
    <Card className="mb-6">
      <div className="p-4">
        <CardHeader>
          <CardTitle className="text-base font-medium text-gray-700">
            {field.label}
          </CardTitle>
          {field.help && (
            <p className="text-sm text-gray-500">{field.help}</p>
          )}
        </CardHeader>
        <CardContent className="pt-2">
          <PreviewFieldInput 
            field={field}
            value={value}
            onChange={onChange}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export type FormFieldType = 'single' | 'long' | 'date' | 'url' | 'radio';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  help: string;
  options?: string[];
  required?: boolean;
}


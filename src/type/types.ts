import { FormField } from "./form-type";

export interface FormData {
  id: string;
  title: string;
  fields: FormField[];
  responses: Record<string, any>;
}
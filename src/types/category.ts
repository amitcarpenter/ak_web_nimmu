// Category and Dynamic Field types

export type FieldType = 
  | 'TEXT' 
  | 'NUMBER' 
  | 'BOOLEAN' 
  | 'DROPDOWN' 
  | 'IMAGE' 
  | 'CURRENCY' 
  | 'TOGGLE'
  | 'TEXTAREA'
  | 'DATE'
  | 'TIME';

export type CategoryStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export interface CategoryField {
  id?: string;
  fieldType: FieldType;
  fieldName: string;
  fieldLabel: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  validationRules?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  helpText?: string;
  displayOrder?: number;
  fieldConfig?: {
    options?: Array<{ label: string; value: string }>;
    accept?: string;
    multiple?: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  status: CategoryStatus;
  displayOrder: number;
  fields?: CategoryField[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  icon?: string;
  description?: string;
  status?: CategoryStatus;
  displayOrder?: number;
  fields: CategoryField[];
}


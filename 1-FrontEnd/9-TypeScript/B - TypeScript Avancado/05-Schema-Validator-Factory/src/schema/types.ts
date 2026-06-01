// Tipos base do schema de validação
export type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array';

export interface BaseSchema {
  type: SchemaType;
  required?: boolean;
}

export interface StringSchema extends BaseSchema {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface NumberSchema extends BaseSchema {
  type: 'number';
  min?: number;
  max?: number;
}

export interface BooleanSchema extends BaseSchema {
  type: 'boolean';
}

export interface ObjectSchema extends BaseSchema {
  type: 'object';
  properties: Record<string, Schema>;
}

export interface ArraySchema extends BaseSchema {
  type: 'array';
  items: Schema;
}

// Union discriminada — o TypeScript usa o campo `type` para narrowing
export type Schema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ObjectSchema
  | ArraySchema;

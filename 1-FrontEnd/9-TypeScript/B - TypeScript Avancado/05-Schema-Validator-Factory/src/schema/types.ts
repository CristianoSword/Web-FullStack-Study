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
  properties: Record<string, SchemaDefinition>;
}

export interface ArraySchema extends BaseSchema {
  type: 'array';
  items: SchemaDefinition;
}

export type SchemaDefinition =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ObjectSchema
  | ArraySchema;

export type InferType<T extends SchemaDefinition> = T extends StringSchema
  ? string
  : T extends NumberSchema
  ? number
  : T extends BooleanSchema
  ? boolean
  : T extends ObjectSchema
  ? { [K in keyof T['properties']]: InferType<T['properties'][K]> }
  : T extends ArraySchema
  ? InferType<T['items']>[]
  : never;

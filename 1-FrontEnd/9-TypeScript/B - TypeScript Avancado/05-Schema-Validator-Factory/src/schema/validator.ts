import { Schema } from './types';

// Erro customizado com rastreamento de caminho (path) para localizar o campo inválido
export class ValidationError extends Error {
  constructor(message: string, public readonly path: string[]) {
    super(`${path.join('.')}: ${message}`);
    this.name = 'ValidationError';
  }
}

/**
 * Valida `data` contra `schema` recursivamente.
 * Lança `ValidationError` com o path completo do campo inválido.
 */
export function validate<T = unknown>(
  schema: Schema,
  data: unknown,
  path: string[] = []
): T {
  // Verificação de campo obrigatório
  if (schema.required && (data === undefined || data === null)) {
    throw new ValidationError('Value is required', path);
  }

  // Campo opcional ausente — retorna sem validar
  if (!schema.required && (data === undefined || data === null)) {
    return data as T;
  }

  // Narrowing via discriminated union no campo `type`
  switch (schema.type) {
    case 'string': {
      if (typeof data !== 'string') {
        throw new ValidationError('Expected string', path);
      }
      if (schema.minLength !== undefined && data.length < schema.minLength) {
        throw new ValidationError(`String too short (min ${schema.minLength})`, path);
      }
      if (schema.maxLength !== undefined && data.length > schema.maxLength) {
        throw new ValidationError(`String too long (max ${schema.maxLength})`, path);
      }
      if (schema.pattern && !schema.pattern.test(data)) {
        throw new ValidationError('String does not match pattern', path);
      }
      return data as T;
    }

    case 'number': {
      if (typeof data !== 'number' || isNaN(data)) {
        throw new ValidationError('Expected valid number', path);
      }
      if (schema.min !== undefined && data < schema.min) {
        throw new ValidationError(`Number too small (min ${schema.min})`, path);
      }
      if (schema.max !== undefined && data > schema.max) {
        throw new ValidationError(`Number too large (max ${schema.max})`, path);
      }
      return data as T;
    }

    case 'boolean': {
      if (typeof data !== 'boolean') {
        throw new ValidationError('Expected boolean', path);
      }
      return data as T;
    }

    case 'object': {
      if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new ValidationError('Expected object', path);
      }
      const validatedObj: Record<string, unknown> = {};
      const dataObj = data as Record<string, unknown>;

      for (const [key, propSchema] of Object.entries(schema.properties)) {
        validatedObj[key] = validate(propSchema, dataObj[key], [...path, key]);
      }
      return validatedObj as T;
    }

    case 'array': {
      if (!Array.isArray(data)) {
        throw new ValidationError('Expected array', path);
      }
      return data.map((item, index) =>
        validate(schema.items, item, [...path, index.toString()])
      ) as T;
    }

    default: {
      // Exhaustiveness check — TypeScript garante que nunca chegamos aqui
      const _exhaustive: never = schema;
      throw new ValidationError(`Unsupported schema type`, path);
    }
  }
}

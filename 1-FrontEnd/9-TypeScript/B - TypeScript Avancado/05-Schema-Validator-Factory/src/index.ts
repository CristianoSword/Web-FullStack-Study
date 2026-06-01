import { validate, ValidationError } from './schema/validator';
import { ObjectSchema } from './schema/types';

// Definição do schema com tipos TypeScript estáticos
const userSchema: ObjectSchema = {
  type: 'object',
  required: true,
  properties: {
    username: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    age: {
      type: 'number',
      required: true,
      min: 18,
    },
    isActive: {
      type: 'boolean',
      required: true,
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

// Dados válidos
const validData = {
  username: 'johndoe',
  age: 25,
  isActive: true,
  tags: ['developer', 'typescript'],
};

// Dados inválidos
const invalidData = {
  username: 'jo',    // muito curto (min 3)
  age: 16,           // menor de idade (min 18)
  isActive: 'yes',   // tipo errado (esperado boolean)
};

console.log('=== Schema Validator Factory ===\n');

console.log('✅ Testando dados válidos:');
try {
  const result = validate(userSchema, validData);
  console.log('Validação bem-sucedida!', result);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Falha inesperada:', error.message);
  }
}

console.log('\n❌ Testando dados inválidos:');
try {
  validate(userSchema, invalidData);
  console.log('Passou (inesperado)');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Falha esperada:', error.message, '| Path:', error.path);
  }
}

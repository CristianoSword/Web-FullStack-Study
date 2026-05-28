import { validate } from './schema/validator';
import { ObjectSchema } from './schema/types';

// Example Schema Definition
const userSchema: ObjectSchema = {
  type: 'object',
  required: true,
  properties: {
    username: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 20
    },
    age: {
      type: 'number',
      required: true,
      min: 18
    },
    isActive: {
      type: 'boolean',
      required: true
    },
    tags: {
      type: 'array',
      items: { type: 'string' }
    }
  }
};

// Example Usage
const validData = {
  username: 'johndoe',
  age: 25,
  isActive: true,
  tags: ['developer', 'typescript']
};

const invalidData = {
  username: 'jo', // too short
  age: 16, // too young
  isActive: 'yes' // wrong type
};

console.log('Testing valid data:');
try {
  const result = validate(userSchema, validData);
  console.log('Validation successful!', result);
} catch (error) {
  console.error('Validation failed:', error);
}

console.log('\nTesting invalid data:');
try {
  validate(userSchema, invalidData);
} catch (error) {
  console.error('Validation failed as expected:', error);
}

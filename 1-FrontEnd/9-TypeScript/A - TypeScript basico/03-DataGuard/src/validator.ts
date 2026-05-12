import { ValidationResult, Schema } from "./types";

export class DataGuard<T> {
    private schema: Schema<T>;

    constructor(schema: Schema<T>) {
        this.schema = schema;
    }

    validate(data: T): ValidationResult {
        const errors: string[] = [];
        
        for (const key in this.schema) {
            const value = data[key];
            const validators = this.schema[key];

            if (validators) {
                validators.forEach(validator => {
                    const error = validator(value);
                    if (error) {
                        errors.push(`${key}: ${error}`);
                    }
                });
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

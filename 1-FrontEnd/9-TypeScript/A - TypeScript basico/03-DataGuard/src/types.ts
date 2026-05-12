export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export type ValidatorFn<T> = (value: T) => string | null;

export type Schema<T> = {
    [K in keyof T]?: ValidatorFn<T[K]>[];
};

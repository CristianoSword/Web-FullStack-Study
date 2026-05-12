import { ValidatorFn } from "./types";

export const required: ValidatorFn<any> = (val) => 
    val === undefined || val === null || val === "" ? "Campo obrigatrio" : null;

export const minLength = (min: number): ValidatorFn<string> => (val) => 
    val.length < min ? `Mnimo de ${min} caracteres` : null;

export const isEmail: ValidatorFn<string> = (val) => 
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "E-mail invlido" : null;

export const isNumber: ValidatorFn<any> = (val) => 
    typeof val !== "number" ? "Deve ser um nmero" : null;

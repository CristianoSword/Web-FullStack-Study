import { Question, Difficulty } from "./types";

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Qual palavra-chave  usada para definir uma constante no TypeScript?",
        options: ["var", "let", "const", "def"],
        correctAnswer: 2,
        difficulty: Difficulty.EASY
    },
    {
        id: 2,
        text: "O que  um 'Tuple' no TypeScript?",
        options: ["Um array de tamanho fixo e tipos conhecidos", "Um tipo de loop", "Um tipo de classe", "Um objeto JSON"],
        correctAnswer: 0,
        difficulty: Difficulty.MEDIUM
    },
    {
        id: 3,
        text: "Qual  a vantagem principal do TypeScript sobre o JavaScript?",
        options: ["Sintaxe mais curta", "Tipagem esttica", "Execuo mais rpida", "Menos arquivos"],
        correctAnswer: 1,
        difficulty: Difficulty.EASY
    }
];

import { type Question, Difficulty } from "./types";

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Qual palavra-chave eh usada para definir uma constante no TypeScript?",
        options: ["var", "let", "const", "def"],
        correctAnswer: 2,
        difficulty: Difficulty.EASY
    },
    {
        id: 2,
        text: "O que eh um 'Tuple' no TypeScript?",
        options: ["Um array de tamanho fixo e tipos conhecidos", "Um tipo de loop", "Um tipo de classe", "Um objeto JSON"],
        correctAnswer: 0,
        difficulty: Difficulty.MEDIUM
    },
    {
        id: 3,
        text: "Qual eh a vantagem principal do TypeScript sobre o JavaScript?",
        options: ["Sintaxe mais curta", "Tipagem estatica", "Execucao mais rapida", "Menos arquivos"],
        correctAnswer: 1,
        difficulty: Difficulty.EASY
    }
];

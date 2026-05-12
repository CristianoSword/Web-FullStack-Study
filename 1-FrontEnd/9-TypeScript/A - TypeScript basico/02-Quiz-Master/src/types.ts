// types.ts - atualizado para forçar recarregamento
export enum Difficulty {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard"
}

export type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    difficulty: Difficulty;
}

export type QuizState = {
    currentQuestionIndex: number;
    score: number;
    isFinished: boolean;
}

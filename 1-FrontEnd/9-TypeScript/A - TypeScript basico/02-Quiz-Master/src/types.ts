export enum Difficulty {
    EASY = "Fcil",
    MEDIUM = "Mdio",
    HARD = "Difcil"
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    difficulty: Difficulty;
}

export interface QuizState {
    currentQuestionIndex: number;
    score: number;
    isFinished: boolean;
}

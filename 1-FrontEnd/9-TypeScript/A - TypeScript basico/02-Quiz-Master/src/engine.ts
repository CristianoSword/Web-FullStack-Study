import { Question, QuizState } from "./types";

export class QuizEngine {
    private questions: Question[];
    private state: QuizState;

    constructor(questions: Question[]) {
        this.questions = questions;
        this.state = {
            currentQuestionIndex: 0,
            score: 0,
            isFinished: false
        };
    }

    getCurrentQuestion(): Question | undefined {
        return this.questions[this.state.currentQuestionIndex];
    }

    submitAnswer(answerIndex: number): boolean {
        if (this.state.isFinished) return false;
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return false;

        const isCorrect = answerIndex === currentQuestion.correctAnswer;
        if (isCorrect) {
            this.state.score++;
        }

        this.nextQuestion();
        return isCorrect;
    }

    private nextQuestion(): void {
        this.state.currentQuestionIndex++;
        if (this.state.currentQuestionIndex >= this.questions.length) {
            this.state.isFinished = true;
        }
    }

    getState(): QuizState {
        return { ...this.state };
    }

    getScorePercentage(): number {
        return (this.state.score / this.questions.length) * 100;
    }
}

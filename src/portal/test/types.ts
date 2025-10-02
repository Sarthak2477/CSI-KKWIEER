export interface TestQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    image?: string;
}

export interface TestAnswer {
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
}

export interface TestResult {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    violations: number;
    timeTaken: number;
}
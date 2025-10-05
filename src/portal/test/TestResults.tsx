import React from 'react';
import { TestQuestion } from './types';

interface TestResultsProps {
    answers: Record<number, string>;
    questions: TestQuestion[];
    violations: number;
}

export const TestResults: React.FC<TestResultsProps> = ({
    answers,
    questions,
    violations
}) => {
    const calculateResults = () => {
        let correct = 0;
        const results = questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) correct++;
            
            return {
                question,
                userAnswer,
                isCorrect,
                correctAnswer: question.correctAnswer
            };
        });

        const score = Math.round((correct / questions.length) * 100);
        return { correct, total: questions.length, score, results };
    };

    const { correct, total, score, results } = calculateResults();

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getGrade = (score: number) => {
        if (score >= 90) return 'A+';
        if (score >= 80) return 'A';
        if (score >= 70) return 'B';
        if (score >= 60) return 'C';
        if (score >= 50) return 'D';
        return 'F';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h1 className="text-3xl font-bold text-center mb-8">Test Results</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{correct}/{total}</div>
                            <div className="text-sm text-gray-600">Correct Answers</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{getGrade(score)}</div>
                            <div className="text-sm text-gray-600">Grade</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{violations}</div>
                            <div className="text-sm text-gray-600">Violations</div>
                        </div>
                    </div>

                    {violations > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-red-800 mb-2">Security Violations Detected</h3>
                            <p className="text-red-700 text-sm">
                                {violations} violation(s) were recorded during the test. This may affect your final evaluation.
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6">Detailed Review</h2>
                    
                    <div className="space-y-6">
                        {results.map((result, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-500">
                                        Question {index + 1}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                        result.isCorrect 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>
                                
                                <p className="text-gray-900 mb-4">{result.question.question}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                                        <p className={`text-sm ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                            {result.userAnswer || 'No answer selected'}
                                        </p>
                                    </div>
                                    {!result.isCorrect && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</p>
                                            <p className="text-sm text-green-600">{result.correctAnswer}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    );
};
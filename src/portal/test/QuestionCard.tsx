import React from 'react';
import { TestQuestion } from './types';

interface QuestionCardProps {
    question: TestQuestion;
    selectedAnswer?: string;
    onAnswer: (answer: string) => void;
    isFlagged?: boolean;
    onToggleFlag?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedAnswer,
    onAnswer,
    isFlagged = false,
    onToggleFlag
}) => {
    if (!question) {
        return <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">Loading question...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="mb-4">
                <div className="flex justify-end items-start mb-3">
                    {onToggleFlag && (
                        <button
                            onClick={onToggleFlag}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                                isFlagged
                                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {isFlagged ? '🚩 Flagged' : '🏳️ Flag for Review'}
                        </button>
                    )}
                </div>
                <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                    {question.question || 'Question text not available'}
                </h2>
                {question.image && (
                    <div className="mt-4">
                        <img 
                            src={question.image} 
                            alt="Question illustration" 
                            className="max-w-full h-auto rounded-lg border border-gray-200"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-3">
                {(question.options || []).map((option, index) => {
                    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
                    const isSelected = selectedAnswer === option;
                    
                    return (
                        <label
                            key={index}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                isSelected
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={isSelected}
                                onChange={() => onAnswer(option)}
                                className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                                isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                            }`}>
                                {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>
                            <span className="font-medium text-gray-700 mr-3">{optionLabel}.</span>
                            <span className="text-gray-900">{option}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};
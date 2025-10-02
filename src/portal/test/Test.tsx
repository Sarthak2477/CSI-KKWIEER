import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TestQuestion } from './types';
import { QuestionCard } from './QuestionCard';
import { TestResults } from './TestResults';
import { Login } from './Login';
import { questions } from './questions';

const Test = (): JSX.Element => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [violations, setViolations] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<{username: string; password: string; secretCode: string} | null>(null);

    const testRef = useRef<HTMLDivElement>(null);

    // Anti-cheating: Prevent context menu, copy, paste
    useEffect(() => {
        const preventActions = (e: Event) => {
            e.preventDefault();
            alert('⚠️ WARNING: This action is not allowed during the test. Repeated attempts will result in violations.');
            addViolation();
        };

        const preventKeyActions = (e: KeyboardEvent) => {
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 's')) {
                e.preventDefault();
                alert('⚠️ WARNING: Copy/paste operations are disabled during the test. This will be recorded as a violation.');
                addViolation();
            }
            // if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            //     e.preventDefault();
            //     alert('⚠️ WARNING: Developer tools are not allowed during the test. This will be recorded as a violation.');
            //     addViolation();
            // }
        };

        document.addEventListener('contextmenu', preventActions);
        document.addEventListener('keydown', preventKeyActions);
        document.addEventListener('selectstart', preventActions);
        document.addEventListener('dragstart', preventActions);

        return () => {
            document.removeEventListener('contextmenu', preventActions);
            document.removeEventListener('keydown', preventKeyActions);
            document.removeEventListener('selectstart', preventActions);
            document.removeEventListener('dragstart', preventActions);
        };
    }, []);

    // Anti-cheating: Tab switching detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && testStarted && !testCompleted) {
                setIsBlurred(true);
                setTimeout(() => {
                    if (document.hidden) {
                        alert('⚠️ VIOLATION: You switched tabs or minimized the window. Return to the test immediately!');
                        addViolation();
                    }
                }, 1000);
            } else {
                setIsBlurred(false);
            }
        };

        const handleBlur = () => {
            if (testStarted && !testCompleted) {
                setIsBlurred(true);
                setTimeout(() => {
                    if (document.hidden || !document.hasFocus()) {
                        alert('⚠️ VIOLATION: You left the test window. This has been recorded as a violation.');
                        addViolation();
                    }
                }, 1000);
            }
        };

        const handleFocus = () => {
            setIsBlurred(false);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, [testStarted, testCompleted]);

    // Timer
    useEffect(() => {
        if (!testStarted || testCompleted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setTestCompleted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [testStarted, testCompleted]);

    const addViolation = useCallback(() => {
        setViolations(prev => {
            const newCount = prev + 1;
            if (newCount >= 3) {
                setTestCompleted(true);
                alert('Test terminated due to multiple violations!');
            }
            return newCount;
        });
    }, []);

    const enterFullscreen = async () => {
        try {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } catch (err) {
            console.error('Fullscreen failed:', err);
        }
    };

    const startTest = async () => {
        await enterFullscreen();
        setTestStarted(true);
    };

    const handleLogin = (credentials: { username: string; password: string; secretCode: string }) => {
        setUserInfo(credentials);
        setIsLoggedIn(true);
    };



    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const toggleFlag = (questionId: number) => {
        setFlaggedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const goToQuestion = (questionIndex: number) => {
        setCurrentQuestion(questionIndex);
    };

    const getQuestionStatus = (questionIndex: number) => {
        if (answers[questionIndex]) return 'answered';
        if (flaggedQuestions.has(questionIndex)) return 'flagged';
        return 'unanswered';
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const submitTest = () => {
        setTestCompleted(true);
        document.exitFullscreen?.();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    if (testCompleted) {
        return <TestResults answers={answers} questions={questions} violations={violations} />;
    }

    if (!testStarted) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Aptitude Test</h1>
                    <div className="space-y-4 text-sm text-gray-600">
                        <p>• Test duration: 60 minutes</p>
                        <p>• Total questions: {questions.length}</p>
                        <p>• No tab switching allowed</p>
                        <p>• Fullscreen mode required</p>
                        <p>• Copy/paste disabled</p>
                        <p>• Maximum 3 violations allowed</p>
                    </div>
                    <button
                        onClick={startTest}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Start Test
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={testRef} className="min-h-screen bg-gray-100 select-none">
            {isBlurred && (
                <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50">
                    <div className="text-white text-center">
                        <h2 className="text-2xl font-bold mb-2">⚠️ WARNING!</h2>
                        <p className="text-lg mb-2">You have left the test window</p>
                        <p>Return immediately to avoid a violation</p>
                        <p className="text-sm mt-2">Current Violations: {violations}/3</p>
                        <div className="mt-4 text-sm opacity-75">
                            <p>• Do not switch tabs</p>
                            <p>• Do not minimize the window</p>
                            <p>• Stay focused on the test</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-sm border-b px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Aptitude Test</h1>
                        <span className="text-sm text-gray-500">Welcome, {userInfo?.username}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-sm text-gray-600">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-lg font-mono text-red-600">
                            {formatTime(timeLeft)}
                        </span>
                        <span className="text-sm text-red-600">
                            Violations: {violations}/3
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 p-6">
                {/* Question Navigation Panel */}
                <div className="w-80 bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-semibold mb-4">Question Navigator</h3>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {questions.map((_, index) => {
                            const status = getQuestionStatus(index);
                            const isCurrent = index === currentQuestion;
                            return (
                                <button
                                    key={index}
                                    onClick={() => goToQuestion(index)}
                                    className={`w-10 h-10 text-sm font-medium rounded border-2 transition-colors ${
                                        isCurrent
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : status === 'answered'
                                            ? 'border-green-500 bg-green-100 text-green-700 hover:bg-green-200'
                                            : status === 'flagged'
                                            ? 'border-orange-500 bg-orange-100 text-orange-700 hover:bg-orange-200'
                                            : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                            <span>Answered ({Object.keys(answers).length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-100 border border-orange-500 rounded"></div>
                            <span>Flagged ({flaggedQuestions.size})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded"></div>
                            <span>Unanswered ({questions.length - Object.keys(answers).length})</span>
                        </div>
                    </div>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                    <QuestionCard
                        question={questions[currentQuestion]}
                        selectedAnswer={answers[currentQuestion]}
                        onAnswer={(answer) => handleAnswer(currentQuestion, answer)}
                        isFlagged={flaggedQuestions.has(currentQuestion)}
                        onToggleFlag={() => toggleFlag(currentQuestion)}
                    />

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevQuestion}
                            disabled={currentQuestion === 0}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
                        >
                            Previous
                        </button>

                        <div className="flex space-x-4">
                            {currentQuestion === questions.length - 1 ? (
                                <button
                                    onClick={submitTest}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Submit Test
                                </button>
                            ) : (
                                <button
                                    onClick={nextQuestion}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
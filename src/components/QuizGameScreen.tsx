"use client"

import { ComponentProps, useEffect, useRef, useState } from "react";

import Question from "./Question";
import { AnimatePresence } from "motion/react";
import { Question as TQuestion } from "@/types";
import QuizResults from "./QuizResults";








interface QuizGameScreenProps {
    questions: TQuestion[];
    duration: number;
}



const QuizGameScreen: React.FC<QuizGameScreenProps> = ({ questions, duration }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allQuestions, setAllQuestions] = useState<TQuestion[]>(questions);
    const [direction, setDirection] = useState("right");
    const [showResults, setShowResults] = useState(false);
    const [attemptedQuestionCount, setAttemptedQuestionsCount] = useState(0);
    const [remTime, setRemTime] = useState(duration * 60);
    const nextQuestion = () => {
        if (currentIndex < allQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setDirection("right")
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setDirection("left");
        }

    };

    const handleSaveProgress = (questionIndex: number, selectedOption: number) => {
        const updatedQuestions = [...allQuestions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            selected_option: selectedOption,
        };
        setAllQuestions(updatedQuestions);
        setAttemptedQuestionsCount(attemptedQuestionCount + 1);
    };

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            
            setRemTime(prev => {
                if (prev <= 1) {  // Stop at 0
                    clearInterval(timerRef.current!);
                    setShowResults(true);
                    return 0;
                }
                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timerRef.current!); // Cleanup on unmount
    }, []);



    return (
        <div className="flex  flex-col items-start justify-center min-h-[calc(100vh-84px)] p-4">
            
            {!isNaN(remTime) && !showResults && <div
            className="font-bold w-[600px] mx-auto animate animate-pulse my-1 text-lg self-end max-w-full"
            >
                {Math.floor(remTime / 60) } : {remTime % 60}
            </div>}
            <AnimatePresence mode="wait">
                {
                    !showResults && allQuestions.map((question, index) => (
                        index === currentIndex && (
                            <Question
                                key={question.id}
                                direction={direction}
                                question={question}
                                onNext={nextQuestion}
                                onPrev={prevQuestion}
                                currentIndex={currentIndex}
                                totalQuestions={allQuestions.length}
                                onSubmit={() => setShowResults(true)}
                                saveProgress={(selectedOption) => handleSaveProgress(index, selectedOption)}
                            />
                        )
                    ))
                }
                {
                    showResults && <QuizResults
                    attemptedQuestions={attemptedQuestionCount}
                        allQuestions={allQuestions}
                    />
                }
            </AnimatePresence>
        </div>
    );
};

export default QuizGameScreen;

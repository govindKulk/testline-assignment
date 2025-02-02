"use client"

import { ComponentProps, useState } from "react";

import Question from "./Question";
import { AnimatePresence } from "motion/react";
import { Question as TQuestion } from "@/types";
import QuizResults from "./QuizResults";








interface QuizGameScreenProps {
    questions: TQuestion[];
}



const QuizGameScreen: React.FC<QuizGameScreenProps> = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allQuestions, setAllQuestions] = useState<TQuestion[]>(questions);
    const [direction, setDirection] = useState("right");
    const [showResults, setShowResults] = useState(false);
    const [attemptedQuestionCount, setAttemptedQuestionsCount] = useState(0);

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



    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-84px)] p-4">
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

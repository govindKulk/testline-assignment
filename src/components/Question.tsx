import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown'
import { Option, Question as TQuestion } from '@/types';
import {Howl} from 'howler'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface QuestionProps {
    question: TQuestion,
    onNext: () => void;
    onPrev: () => void;
    saveProgress: (selectedOption: number) => void;
    onSubmit: () => void;
    currentIndex: number;
    totalQuestions: number;
    direction: string;

}

const correctSound = new Howl({
    src: ["/sounds/success.wav"], 
});

const wrongSound = new Howl({
    src: ["/sounds/wrong.wav"], 
});

const completionSound = new Howl({
    src: ["/sounds/completion.wav"],
});






const Question: React.FC<QuestionProps> = ({ question, onNext, onPrev, saveProgress, currentIndex, totalQuestions, direction, onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFull, setShowFull] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctOption = question.options.find((o: Option) => o.is_correct);
    const [exitDirection, setExitDirection] = useState("left");
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        setSelectedOption(question.selected_option || null);
        setIsCorrect(question.selected_option ? question.options.find((o: Option) => o.id === question.selected_option)?.is_correct ?? null : null);
    }, [question]);

    const handleSelect = (option: Option) => {
        if (selectedOption !== null) {
            return;
        }

        setSelectedOption(option.id);
        setIsCorrect(option.is_correct);
        saveProgress(option.id);

        if (option.is_correct) {
            correctSound.play();
        } else {
            wrongSound.play();
        }
    };

    const handleNext = () => {
        setShowFull(false);
        setExitDirection("left");
        onNext();
    };

    const handlePrev = () => {
        setShowFull(false);
        setExitDirection("right");
        onPrev();
    };

    const handleSubmit = () => {
        setShowFull(false);
        setLoading(true);
        setDialogOpen(false);
        setTimeout(() => {
            setLoading(false);
            onSubmit();
            completionSound.play();
    
        }, 3000);
    };

    

    return (
        <motion.div
            initial={{ x: direction ==="right" ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: exitDirection ==="right" ? '100%' : '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[600px]"
        >
            <Card className="w-full h-full min-h-[634px] max-w-[600px] mx-auto sm:p-4 flex flex-col justify-evenly">
                <CardContent>
                    <CardTitle className="text-slate-600 text-lg sm:text-xl font-bold">
                        Q: {currentIndex + 1 + "/" + totalQuestions}
                    </CardTitle>
                    <CardTitle className="text-slate-600 text-lg sm:text-xl font-bold">
                        {question.description}
                    </CardTitle>
                </CardContent>

                <CardContent>
                    <div className="space-y-2">
                        {question.options.map((option: Option) => (
                            <Button
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                className={`w-full py-6 px-4 border border-slate-300 flex items-center justify-center rounded-xl text-left transition-colors text-slate-500 hover:text-foreground/80 text-base sm:text-lg font-bold ${
                                    selectedOption === option.id
                                        ? isCorrect
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        : "bg-white hover:bg-gray-200"
                                }`}
                            >
                                {option.description}
                            </Button>
                        ))}
                    </div>
                    {selectedOption && correctOption && (
                        <div className="bg-green-50 text-green-500 font-semibold text-lg py-2 rounded-md shadow border my-4 px-4 border-green-500">
                            Correct Answer: {correctOption.description}
                        </div>
                    )}
                    {selectedOption !== null && (
                        <div className="mt-4 text-justify text-gray-600">
                            {!showFull ? (
                                <ReactMarkdown className="inline text-justify">
                                    {question.detailed_solution.split(" ").slice(0, 30).join(" ")}
                                </ReactMarkdown>
                            ) : (
                                <ReactMarkdown className="inline text-justify">
                                    {question.detailed_solution}
                                </ReactMarkdown>
                            )}
                            <span className="inline text-blue-500 hover:cursor-pointer" onClick={() => setShowFull((prev) => !prev)}>
                                Read {showFull ? "Less" : "More"}
                            </span>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button className="bg-emerald-500 text-white font-bold text-lg" disabled={currentIndex === 0} onClick={handlePrev}>Previous</Button>
                    {currentIndex < totalQuestions - 1 ? (
                        <Button className="bg-emerald-500 text-white font-bold text-lg" onClick={handleNext}>Next</Button>
                    ) : (
                        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-emerald-500 text-white font-bold text-lg" disabled={!selectedOption}>Submit</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Complete Quiz?</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to submit your answers?</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </CardFooter>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
                    </div>
                )}
            </Card>
        </motion.div>
    );
};


export default Question;
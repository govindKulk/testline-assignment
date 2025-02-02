import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Option, Question as TQuestion } from '@/types';
import ResultQuestion from './ResultQuestion';

interface QuizResultsProps {
    allQuestions: TQuestion[];
    attemptedQuestions: number;
}

type FilterType = "all" | "correct" | "wrong" | "attempted" | "non_attempted";

export default function QuizResults({ allQuestions, attemptedQuestions }: QuizResultsProps) {
    const [correctCount, setCorrectCount] = useState(0);
    const [filter, setFilter] = useState<FilterType>("all");

    useEffect(() => {
        setCorrectCount(
            allQuestions.filter(q => q.selected_option === q.options.find(o => o.is_correct)?.id).length
        );
    }, [allQuestions]);

    const filteredQuestions = allQuestions.filter(q => {
        switch (filter) {
            case "correct":
                return q.selected_option === q.options.find(o => o.is_correct)?.id;
            case "wrong":
                return q.selected_option && q.selected_option !== q.options.find(o => o.is_correct)?.id;
            case "attempted":
                return q.selected_option;
            case "non_attempted":
                return !q.selected_option;
            default:
                return true;
        }
    });

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1.2, 1], opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[600px]"
        >
            <Card className="w-full h-full min-h-[634px] max-w-[600px] mx-auto sm:p-4 flex flex-col justify-evenly">
                <CardContent>
                    <CardTitle className="text-slate-600 text-xl sm:text-2xl font-bold">
                        Results
                    </CardTitle>
                    <CardDescription>
                        <div className='bg-slate-100 shadow rounded-xl text-black my-2 px-4 py-2 border-slate-100 border w-full text-lg'>
                            <p className='font-semibold text-xl'>Summary:</p>
                            <p>Total: {allQuestions.length}</p>
                            <p>Attempted: {attemptedQuestions}</p>
                            <p className='text-emerald-400'>Correct: {correctCount}</p>
                            <p className='text-rose-400'>Wrong: {attemptedQuestions - correctCount}</p>
                        </div>
                    </CardDescription>
                </CardContent>
                
                <CardContent>
                    <Select onValueChange={(value) => setFilter(value as FilterType)}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Filter Questions" />
                        </SelectTrigger>
                        <SelectContent
                        className='text-lg w-[300px]'
                        >
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="correct">Correct</SelectItem>
                            <SelectItem value="wrong">Wrong</SelectItem>
                            <SelectItem value="attempted">Attempted</SelectItem>
                            <SelectItem value="non_attempted">Non-Attempted</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                
                <CardContent>
                    <div className="space-y-2">
                        {filteredQuestions.map((question, index) => (
                            <ResultQuestion
                                isCorrect={question.selected_option === question.options.find(o => o.is_correct)?.id}
                                question={question}
                                questionNumber={index}
                                selectedOption={question.selected_option}
                                totalQuestions={allQuestions.length}
                                key={index}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

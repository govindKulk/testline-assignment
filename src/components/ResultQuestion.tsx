import React, {  useState } from 'react'
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown'
import { Option, Question as TQuestion } from '@/types';

interface QuestionProps {
    question: TQuestion,
    questionNumber: number;
    totalQuestions: number;
    selectedOption: number;
    isCorrect: boolean;
}







const ResultQuestion: React.FC<QuestionProps> = ({ question, questionNumber, totalQuestions, selectedOption, isCorrect }) => {
    const [showFull, setShowFull] = useState(false);
    const correctOption = question.options.find((o: Option) => o.is_correct);


  
    

    return (
        
            <Card className="w-full h-full min-h-[634px] max-w-[600px] mx-auto sm:p-4 flex flex-col justify-evenly">
                <CardContent>
                    <CardTitle className="text-slate-600 text-base xs:text-lg sm:text-xl font-bold">
                        Q: {questionNumber + 1 + "/" + totalQuestions}
                    </CardTitle>
                    <CardTitle className="text-slate-600 text-base xs:text-lg sm:text-xl font-bold">
                        {question.description}
                    </CardTitle>
                </CardContent>

                <CardContent>
                    <div className="space-y-2">
                        {question.options.map((option: Option) => (
                            <span
                                key={option.id}
                                className={`w-full py-2 xs:py-4 sm:py-6 px-2 xs:px-3  sm:px-4 border border-slate-300 flex items-center justify-center rounded-xl text-left transition-colors text-slate-500 hover:text-foreground/80 text-sm xs:text-base sm:text-lg font-bold ${
                                    selectedOption === option.id
                                        ? isCorrect
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        : "bg-white hover:bg-gray-200"
                                }`}
                            >
                                {option.description}
                            </span>
                        ))}
                    </div>
                    { correctOption && (
                        <div className="bg-green-50 text-green-500 font-semibold text-base sm:text-lg py-2 rounded-md shadow border my-2 sm:my-4 px-4 border-green-500">
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

            </Card>
    );
};


export default ResultQuestion;
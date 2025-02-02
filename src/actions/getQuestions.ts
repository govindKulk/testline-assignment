"use server"

import { QustionApiResponse } from "@/types";


const apiUrl = `https://api.jsonserve.com/`

export const getQuestions = async  (id = `Uw5CrX`) =>  {
    // here id for the quiz is passed to get the questions for a particular quiz by id.

    const res = await fetch(apiUrl+id);
    const data = await res.json();

    const questions: QustionApiResponse =  {
        duration: data.duration,
        questions: [
            ...data.questions,
        ]
    }

    return questions; 
}
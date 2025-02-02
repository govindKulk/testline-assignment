"use server"

import { AllQuizType } from "@/types";

const apiUrl = `https://api.jsonserve.com/Uw5CrX`


export const getAllQuizes  = async  () =>  {

    try{

    const res = await fetch(apiUrl);
    const data = await res.json();

    // since api only contains data for single page we are accessign properties directly from the data
    // but we should map through the data and create an array of quizes.
    const quizes: AllQuizType = [{
        id: data.id,
        title: data.title,
        topic: data.topic,
        duration: data.duration,
        questions_count: data.questions_count,
        max_mistake_count: data.max_mistake_count
    }]

    return quizes; 
    }catch(e){
        console.error("error fetching all quizes >> ", e);
        return null
    }
}
import { getQuestions } from '@/actions/getQuestions'
import QuizGameScreen from '@/components/QuizGameScreen';
import { redirect } from 'next/navigation';
import React from 'react'

async function SingleQuizPage() {

  const questions = await getQuestions();
  if(!questions){
    return  redirect('/');
  }
  return (
    <div
    className="max-w-screen-xl mx-auto "
    >
    
          <QuizGameScreen questions={questions}/>
        
    </div>
  )
}

export default SingleQuizPage
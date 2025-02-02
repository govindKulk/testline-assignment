import { getQuestions } from '@/actions/getQuestions'
import QuizGameScreen from '@/components/QuizGameScreen';
import { redirect } from 'next/navigation';
import React from 'react'

async function SingleQuizPage() {

  const res = await getQuestions();
  if(!res){
    return  redirect('/');
  }
  return (
    <div
    className="max-w-screen-xl mx-auto "
    >
    
          <QuizGameScreen questions={res.questions} duration={res.duration}/>
        
    </div>
  )
}

export default SingleQuizPage
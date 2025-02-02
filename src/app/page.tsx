import Image from "next/image";
import data from '@/data.json'
import { getAllQuizes } from "@/actions/getQuizData";
import QuizCard from "@/components/QuizCard";
export default async function Home() {

  const allQuizData = await getAllQuizes();

  

  if(!allQuizData){
    return  (<div
    className="max-w-screen-xl mx-auto "
    >
      No Quizes to show currently.
    </div>)
  }

  return (
    <div
    className="max-w-screen-xl mx-auto max-xl:px-4 py-4 "
    >
    {
      allQuizData.length > 0 && allQuizData.map((quiz, i) => {
        return (
          <QuizCard
          key={data.id}
          title={quiz.title}
          topic={quiz.topic}
          questions_count={quiz.questions_count}
          duration={quiz.duration}
          id={quiz.id}
          />
        )
      })
    }
    </div>
  );
}



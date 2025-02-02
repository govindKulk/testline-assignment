export type AllQuizType = QuizMetaData[];

export type QuizMetaData = {
  id: number;
  title: string;
  topic: string;
  duration: number;
  questions_count: number;
  max_mistake_count: number;
}

export interface Option {
  id: number;
  description: string;
  is_correct: boolean;
}

export type Question = {
  id: number;
  description: string;
  options: Option[];
  detailed_solution: string;
  selected_option: number
}



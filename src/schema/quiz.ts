export type QuestionType = "unique" | "multiple";

export type Question = {
  title: string;
  type: QuestionType;
  answers: string[];
  correct_answers: string | string[];
};

export type Quiz = {
  title: string;
  description: string;
  questions: Question[];
};

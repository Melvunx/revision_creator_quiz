export type QuestionType = "unique" | "multiple";

export type Question = {
  id: number;
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

export type ExportQuiz = {
  title: string;
  description: string;
  questions: Omit<Question, "id">[];
};

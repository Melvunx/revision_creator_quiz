import type { ExportQuiz, Question, QuestionType, Quiz } from "@/schema/quiz";
import { useState } from "react";

export const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    questions: [],
  });

  const updateQuizInfo = (field: "title" | "description", value: string) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      title: "",
      type: "unique",
      answers: ["", ""],
      correct_answers: "",
    };
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (
    questionId: number,
    field: keyof Question,
    value: string | string[],
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const deleteQuestion = (questionId: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const addAnswer = (questionId: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId && q.answers.length < 4) {
          return { ...q, answers: [...q.answers, ""] };
        }
        return q;
      }),
    }));
  };

  const updateAnswer = (
    questionId: number,
    answerIndex: number,
    value: string,
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          const newAnswers = [...q.answers];
          newAnswers[answerIndex] = value;
          return { ...q, answers: newAnswers };
        }
        return q;
      }),
    }));
  };

  const deleteAnswer = (questionId: number, answerIndex: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId && q.answers.length > 2) {
          const newAnswers = q.answers.filter((_, i) => i !== answerIndex);
          return { ...q, answers: newAnswers };
        }
        return q;
      }),
    }));
  };

  const toggleCorrectAnswer = (questionId: number, answer: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          if (q.type === "unique") {
            return { ...q, correct_answers: answer };
          } else {
            // Type multiple
            const currentCorrect = Array.isArray(q.correct_answers)
              ? q.correct_answers
              : [];
            const isSelected = currentCorrect.includes(answer);

            return {
              ...q,
              correct_answers: isSelected
                ? currentCorrect.filter((a) => a !== answer)
                : [...currentCorrect, answer],
            };
          }
        }
        return q;
      }),
    }));
  };

  const changeQuestionType = (questionId: number, newType: QuestionType) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            type: newType,
            correct_answers: newType === "unique" ? "" : [],
          };
        }
        return q;
      }),
    }));
  };

  const exportQuiz = () => {
    const cleanQuiz: ExportQuiz = {
      title: quiz.title,
      description: quiz.description,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: quiz.questions.map(({ id, ...question }) => question),
    };

    // Sauvegarder dans localStorage pour test rapide
    localStorage.setItem("currentQuiz", JSON.stringify(cleanQuiz));

    // Export JSON
    const dataStr = JSON.stringify(cleanQuiz, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${quiz.title.toLowerCase().replace(/\s+/g, "-") || "quiz"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const storeQuiz = (quiz: Quiz) => {
    localStorage.clear();

    const cleanQuiz = {
      title: quiz.title,
      description: quiz.description,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: quiz.questions.map(({ id, ...question }) => question),
    };
    localStorage.setItem("currentQuiz", JSON.stringify(cleanQuiz));
  };

  return {
    quiz,
    updateQuizInfo,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    toggleCorrectAnswer,
    changeQuestionType,
    exportQuiz,
    storeQuiz,
  };
};

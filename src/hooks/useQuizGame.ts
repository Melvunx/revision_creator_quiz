// hooks/useQuizGame.ts
import type { Question, QuestionResult } from "@/schema/quiz";
import { useMemo, useState } from "react";

type QuizGameState = {
  currentQuestionIndex: number;
  userAnswers: Map<number, string | string[]>;
  isFinished: boolean;
  score: number;
  showReview: boolean;
};

export const useQuizGame = (questions: Question[]) => {
  const [gameState, setGameState] = useState<QuizGameState>({
    currentQuestionIndex: 0,
    userAnswers: new Map(),
    isFinished: false,
    score: 0,
    showReview: false,
  });

  // Mélanger les questions de manière aléatoire
  const shuffledQuestions = useMemo(() => {
    if (questions.length === 0) return [];
    return [...questions].sort(() => Math.random() - 0.5);
  }, [questions]);

  const currentQuestion = shuffledQuestions[gameState.currentQuestionIndex];

  const selectAnswer = (answer: string) => {
    if (!currentQuestion) return;
    const questionId = currentQuestion.id;
    const newAnswers = new Map(gameState.userAnswers);

    if (currentQuestion.type === "unique") {
      newAnswers.set(questionId, answer);
    } else {
      // Type multiple
      const current = (newAnswers.get(questionId) as string[]) || [];
      const isSelected = current.includes(answer);

      if (isSelected) {
        newAnswers.set(
          questionId,
          current.filter((a) => a !== answer),
        );
      } else {
        newAnswers.set(questionId, [...current, answer]);
      }
    }

    setGameState((prev) => ({
      ...prev,
      userAnswers: newAnswers,
    }));
  };

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex < shuffledQuestions.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const previousQuestion = () => {
    if (gameState.currentQuestionIndex > 0) {
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const getDetailedResults = (): QuestionResult[] => {
    return shuffledQuestions.map((question) => {
      const userAnswer = gameState.userAnswers.get(question.id);
      let isCorrect = false;

      if (question.type === "unique") {
        isCorrect = userAnswer === question.correct_answers;
      } else {
        const correctAnswers = question.correct_answers as string[];
        const userAnswersArray = (userAnswer as string[]) || [];
        isCorrect =
          correctAnswers.length === userAnswersArray.length &&
          correctAnswers.every((ans) => userAnswersArray.includes(ans));
      }

      return {
        question,
        userAnswer,
        isCorrect,
      };
    });
  };

  const finishQuiz = () => {
    const calculatedScore = calculateScore();
    setGameState((prev) => ({
      ...prev,
      isFinished: true,
      score: calculatedScore,
    }));
  };

  const toggleReview = () => {
    setGameState((prev) => ({
      ...prev,
      showReview: !prev.showReview,
    }));
  };

  const calculateScore = () => {
    if (shuffledQuestions.length === 0) return 0;

    let correct = 0;

    shuffledQuestions.forEach((question) => {
      const userAnswer = gameState.userAnswers.get(question.id);

      if (question.type === "unique") {
        if (userAnswer === question.correct_answers) {
          correct++;
        }
      } else {
        // Type multiple
        const correctAnswers = question.correct_answers as string[];
        const userAnswersArray = (userAnswer as string[]) || [];

        // Vérifier si les tableaux sont identiques (même contenu, même longueur)
        const isCorrect =
          correctAnswers.length === userAnswersArray.length &&
          correctAnswers.every((ans) => userAnswersArray.includes(ans));

        if (isCorrect) {
          correct++;
        }
      }
    });

    return Math.round((correct / shuffledQuestions.length) * 100);
  };

  const resetQuiz = () => {
    setGameState({
      currentQuestionIndex: 0,
      userAnswers: new Map(),
      isFinished: false,
      score: 0,
      showReview: false,
    });
  };

  const canProceed = () => {
    if (!currentQuestion) return false;

    const userAnswer = gameState.userAnswers.get(currentQuestion.id);

    if (currentQuestion.type === "unique") {
      return userAnswer !== undefined && userAnswer !== "";
    } else {
      return Array.isArray(userAnswer) && userAnswer.length > 0;
    }
  };

  return {
    currentQuestion,
    currentQuestionIndex: gameState.currentQuestionIndex,
    totalQuestions: shuffledQuestions.length,
    userAnswers: gameState.userAnswers,
    isFinished: gameState.isFinished,
    score: gameState.score,
    showReview: gameState.showReview,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    getDetailedResults,
    finishQuiz,
    toggleReview,
    resetQuiz,
    canProceed: canProceed(),
  };
};

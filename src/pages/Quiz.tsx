// pages/Quiz.tsx
import { LoadQuiz } from "@/components/LoadQuiz";
import { QuestionCard } from "@/components/QuestionCard";
import { QuizResults } from "@/components/QuizResults";
import { Button } from "@/components/ui/button";
import { useQuizGame } from "@/hooks/useQuizGame";
import type { Question, Quiz } from "@/schema/quiz";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState("");

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    isFinished,
    score,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    canProceed,
  } = useQuizGame(quiz?.questions || []);

  useEffect(() => {
    // Essayer de charger le quiz depuis le localStorage ou autre source
    const loadStorageQuiz = () => {
      const savedQuiz = localStorage.getItem("currentQuiz");
      if (savedQuiz) {
        try {
          const parsedQuiz: Quiz = JSON.parse(savedQuiz);
          // Ajouter des IDs aux questions si elles n'en ont pas
          const quizWithIds: Quiz = {
            ...parsedQuiz,
            questions: parsedQuiz.questions.map(
              (q: Question, index: number) => ({
                ...q,
                id: q.id || Date.now() + index,
              }),
            ),
          };
          setQuiz(quizWithIds);
        } catch (error) {
          setError("Erreur lors du chargement du quiz");
          console.log(error);
        }
      }
    };

    loadStorageQuiz();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedQuiz = JSON.parse(content);

        // Validation basique
        if (
          !parsedQuiz.title ||
          !parsedQuiz.questions ||
          !Array.isArray(parsedQuiz.questions)
        ) {
          setError("Format de quiz invalide");
          return;
        }

        // Ajouter des IDs aux questions
        const quizWithIds: Quiz = {
          ...parsedQuiz,
          questions: parsedQuiz.questions.map((q: Question, index: number) => ({
            ...q,
            id: Date.now() + index,
          })),
        };

        setQuiz(quizWithIds);
        localStorage.setItem("currentQuiz", JSON.stringify(quizWithIds));
        setError("");
      } catch (error) {
        setError("Erreur lors de la lecture du fichier JSON");
        console.log(error);
      }
    };
    reader.readAsText(file);
  };

  const handleRestart = () => {
    resetQuiz();
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Écran de chargement de quiz
  if (!quiz)
    return <LoadQuiz handleFileUpload={handleFileUpload} error={error} />;

  // Écran de résultats
  if (isFinished) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <QuizResults
          score={score}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // Écran de quiz
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quitter le quiz
        </Button>
        <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
        <p className="text-muted-foreground">{quiz.description}</p>
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progression</span>
          <span>
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        userAnswer={userAnswers.get(currentQuestion.id)}
        onSelectAnswer={selectAnswer}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>

        {isLastQuestion ? (
          <Button onClick={finishQuiz} disabled={!canProceed}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Terminer le quiz
          </Button>
        ) : (
          <Button onClick={nextQuestion} disabled={!canProceed}>
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

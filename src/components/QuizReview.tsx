// components/QuizReview.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuestionResult } from "@/schema/quiz";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "motion/react";

type QuizReviewProps = {
  results: QuestionResult[];
}

export const QuizReview: React.FC<QuizReviewProps> = ({ results }) => {
  const getAnswerStatus = (
    answer: string,
    userAnswer: string | string[] | undefined,
    correctAnswers: string | string[],
  ) => {
    // Vérification des bonnes réponses
    const correctAnswersArray = Array.isArray(correctAnswers)
      ? correctAnswers
      : [correctAnswers];

    const userAnswersArray = Array.isArray(userAnswer)
      ? userAnswer
      : userAnswer
        ? [userAnswer]
        : [];

    const isCorrectAnswer = correctAnswersArray.includes(answer);
    const isUserAnswer = userAnswersArray.includes(answer);

    if (isCorrectAnswer && isUserAnswer) {
      return "correct"; // Bonne réponse sélectionnée
    } else if (isCorrectAnswer && !isUserAnswer) {
      return "missed"; // Bonne réponse manquée
    } else if (!isCorrectAnswer && isUserAnswer) {
      return "wrong"; // Mauvaise réponse sélectionnée
    }
    return "neutral"; // Réponse non sélectionnée et incorrecte
  };

  const getAnswerClassName = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-green-100 border-green-500 dark:bg-green-950 dark:border-green-600";
      case "wrong":
        return "bg-red-100 border-red-500 dark:bg-red-950 dark:border-red-600";
      case "missed":
        return "bg-orange-100 border-orange-500 dark:bg-orange-950 dark:border-orange-600";
      default:
        return "bg-muted border-muted-foreground/20";
    }
  };

  const getAnswerIcon = (status: string) => {
    switch (status) {
      case "correct":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      case "wrong":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case "missed":
        return (
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Révision des réponses</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>Erreur</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <span>Manqué</span>
          </div>
        </div>
      </div>

      {results.map((result, index) => (
        <motion.div
          key={result.question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={
              !result.isCorrect ? "border-red-300 dark:border-red-800" : ""
            }
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {index + 1}
                    </span>
                    {result.isCorrect ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Correct
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incorrect
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    {result.question.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.question.answers.map((answer, answerIndex) => {
                  const status = getAnswerStatus(
                    answer,
                    result.userAnswer,
                    result.question.correct_answers,
                  );

                  return (
                    <div
                      key={answerIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getAnswerClassName(status)}`}
                    >
                      <div className="shrink-0">{getAnswerIcon(status)}</div>
                      <div className="flex-1">
                        <p className="font-medium">{answer}</p>
                        {status === "missed" && (
                          <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                            Vous auriez dû sélectionner cette réponse
                          </p>
                        )}
                        {status === "wrong" && (
                          <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                            Cette réponse est incorrecte
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explication supplémentaire si question incorrecte */}
              {!result.isCorrect && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    {result.question.type === "unique"
                      ? "💡 Réponse correcte :"
                      : "💡 Réponses correctes :"}
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {Array.isArray(result.question.correct_answers)
                      ? result.question.correct_answers.join(", ")
                      : result.question.correct_answers}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

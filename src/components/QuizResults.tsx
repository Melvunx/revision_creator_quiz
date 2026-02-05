// components/QuizResults.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, RotateCcw, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const navigate = useNavigate();

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (score === 100) return "Parfait ! 🎉";
    if (score >= 80) return "Excellent travail ! 👏";
    if (score >= 60) return "Bon travail ! 👍";
    if (score >= 40) return "Pas mal, vous pouvez mieux faire ! 💪";
    return "Continuez à vous entraîner ! 📚";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
        <CardTitle className="text-3xl">Quiz Terminé !</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div>
            <p className="text-lg text-muted-foreground mb-2">Votre score</p>
            <p className={`text-6xl font-bold ${getScoreColor()}`}>{score}%</p>
          </div>

          <p className="text-xl font-medium">{getScoreMessage()}</p>

          <div className="pt-4">
            <p className="text-muted-foreground">
              Vous avez répondu correctement à{" "}
              <span className="font-semibold">
                {Math.round((score / 100) * totalQuestions)}
              </span>{" "}
              sur <span className="font-semibold">{totalQuestions}</span>{" "}
              questions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button onClick={onRestart} className="flex-1" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Recommencer le quiz
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            <Home className="h-4 w-4 mr-2" />
            Créer un nouveau quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

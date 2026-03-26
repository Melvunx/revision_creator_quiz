// components/QuizResults.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, PenBox, RotateCcw, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type QuizResultsProps = {
  score: number;
  totalQuestions: number;
  showReview: boolean;
  onToggleReview: () => void;
  onRestart: () => void;
};

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  showReview,
  onToggleReview,
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

  const loadNewQuiz = () => {
    localStorage.clear();
    window.location.reload();
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -200, scale: 0.5 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ ease: "easeOut" }}
    >
      <Card className="container w-6xl">
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
              <p className={`text-6xl font-bold ${getScoreColor()}`}>
                {score}%
              </p>
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
              <PenBox className="h-4 w-4 mr-2" />
              Créer un nouveau quiz
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1">Charger un nouveau quiz</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous sûr de vouloir faire cela ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Si vous décidez de charger un nouveau quiz, le quiz que vous
                    avez télécharger sera définitivement supprimé !
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={loadNewQuiz}>
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              onClick={onToggleReview}
              variant="outline"
              size="lg"
              className="flex-1 hover:bg-lime-200"
            >
              {showReview ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Masquer les corrections
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir les corrections
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

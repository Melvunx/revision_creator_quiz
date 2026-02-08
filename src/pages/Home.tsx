// pages/Home.tsx
import { QuestionBuilder } from "@/components/QuizBuilder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuiz } from "@/hooks/useQuiz";
import { ArrowRight, Download, Play, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {
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
    storeQuiz,
    exportQuiz,
  } = useQuiz();

  const handleTestQuiz = () => {
    if (quiz.title && quiz.questions.length > 0) storeQuiz();
    navigate("/quiz");
  };

  const isQuizValid = () => {
    // Vérifier le titre du quiz
    if (!quiz.title || quiz.title.trim() === "") {
      return false;
    }

    // Vérifier qu'il y a au moins une question
    if (quiz.questions.length === 0) {
      return false;
    }

    // Vérifier chaque question
    for (const question of quiz.questions) {
      // Vérifier le titre de la question
      if (!question.title || question.title.trim() === "") {
        return false;
      }

      // Vérifier que toutes les réponses sont remplies
      for (const answer of question.answers) {
        if (!answer || answer.trim() === "") {
          return false;
        }
      }

      // Vérifier qu'au moins une réponse correcte est sélectionnée
      if (question.type === "unique") {
        // Pour les questions à choix unique
        if (!question.correct_answers || question.correct_answers === "") {
          return false;
        }
      } else {
        // Pour les questions à choix multiple
        if (
          !Array.isArray(question.correct_answers) ||
          question.correct_answers.length === 0
        ) {
          return false;
        }
      }
    }

    return true;
  };

  const transition = { duration: 0.2 };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto py-6 max-w-6xl">
        {/* Header avec badge */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Créateur de Quiz
            </h1>
            <Badge variant="secondary" className="text-sm px-3 py-1 italic">
              Par Melvunx 🥷🏾
            </Badge>
          </div>

          {/* Présentation du projet */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                À propos
              </h2>
              <p className="text-muted-foreground">
                Créez facilement des quiz interactifs et exportez-les au format
                JSON. Idéal pour l'apprentissage, l'évaluation ou simplement
                pour s'amuser !
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1 hover:bg-neutral-300/45 transition-colors rounded-sm">
                <div className="font-medium text-sm flex items-center gap-2">
                  <span className="text-lg">✏️</span>
                  Créez
                </div>
                <p className="ml-0.5 italic text-xs text-muted-foreground">
                  Ajoutez des questions à choix unique ou multiple
                </p>
              </div>
              <div className="space-y-1 hover:bg-neutral-300/45 transition-colors rounded-sm">
                <div className="font-medium text-sm flex items-center gap-2">
                  <span className="text-lg">🎮</span>
                  Testez
                </div>
                <p className="ml-0.5 italic text-xs text-muted-foreground">
                  Essayez votre quiz avec questions aléatoires
                </p>
              </div>
              <div className="w-52 space-y-1 hover:bg-neutral-300/45 transition-colors rounded-sm">
                <div className="font-medium text-sm flex items-center gap-2">
                  <span className="text-lg">💾</span>
                  Exportez
                </div>
                <p className="ml-0.5 italic text-xs text-muted-foreground">
                  Téléchargez vos quiz au format JSON
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de création */}
        <div className="space-y-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6 bg-linear-to-r from-primary to-primary/30 bg-clip-text text-transparent">
              Informations du quiz
            </h3>
            <div className="space-y-10">
              <div className="flex flex-col gap-1">
                <Label className="ml-1" htmlFor="title">
                  <p>
                    Titre du quiz
                    <span className="text-red-600 font-extrabold">*</span>
                  </p>
                </Label>
                <Input
                  id="title"
                  className="placeholder:italic"
                  value={quiz.title}
                  onChange={(e) => updateQuizInfo("title", e.target.value)}
                  placeholder="Ex: Quiz de culture générale..."
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="ml-1" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="placeholder:italic resize-none min-h-24"
                  value={quiz.description}
                  onChange={(e) =>
                    updateQuizInfo("description", e.target.value)
                  }
                  placeholder="Ex: Testez vos connaissances en 10 questions..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Message d'avertissement */}
          <AnimatePresence>
            {quiz.questions.length > 0 && !isQuizValid() && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={transition}
              >
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 dark:text-yellow-500">
                    ⚠️ Complétez tous les champs avant de tester ou exporter le
                    quiz :
                  </p>
                  <ul className="text-xs text-yellow-600/80 dark:text-yellow-500/80 mt-2 ml-4 list-disc">
                    <li
                      className={`transition-colors
                    ${quiz.title.trim() === "" ? "text-red-600" : "text-lime-600"}
                    `}
                    >
                      Titre du quiz
                    </li>
                    <li>Titre de chaque question</li>
                    <li>Toutes les réponses</li>
                    <li>Au moins une réponse correcte par question</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Questions */}
          <AnimatePresence mode="popLayout">
            {quiz.questions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Questions ({quiz.questions.length})
                </h3>
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {quiz.questions.map((question, index) => (
                      <QuestionBuilder
                        key={question.id}
                        question={question}
                        index={index}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                        onAddAnswer={addAnswer}
                        onUpdateAnswer={updateAnswer}
                        onDeleteAnswer={deleteAnswer}
                        onToggleCorrect={toggleCorrectAnswer}
                        onChangeType={changeQuestionType}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={addQuestion} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une question
            </Button>

            {quiz.questions.length === 0 && (
              <Button variant="outline" size="lg" onClick={handleTestQuiz}>
                Tester un quiz
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            )}

            {quiz.questions.length > 0 && (
              <>
                <Button
                  onClick={handleTestQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!isQuizValid()}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Tester le quiz
                </Button>

                <Button
                  onClick={exportQuiz}
                  variant="secondary"
                  size="lg"
                  disabled={!isQuizValid()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter JSON
                </Button>
              </>
            )}
          </div>

          {/* Note d'aide */}
          <AnimatePresence>
            {quiz.questions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={transition}
                className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed"
              >
                <p className="text-muted-foreground">
                  👆 Commencez par ajouter votre première question
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

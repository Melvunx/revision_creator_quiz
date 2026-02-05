// pages/Home.tsx
import { QuestionBuilder } from "@/components/QuizBuilder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuiz } from "@/hooks/useQuiz";
import { Download, Play, Plus } from "lucide-react";
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
    exportQuiz,
    storeQuiz,
  } = useQuiz();

  const handleTestQuiz = () => {
    if (quiz.title && quiz.questions.length > 0) storeQuiz(quiz);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 max-w-4xl">
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
              <h2 className="text-xl font-semibold mb-2">À propos</h2>
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
            <h3 className="text-lg font-semibold mb-6">Informations du quiz</h3>
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

          {/* Questions */}
          {quiz.questions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Questions ({quiz.questions.length})
              </h3>
              <div className="space-y-4">
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
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={addQuestion} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une question
            </Button>

            {quiz.questions.length === 0 && (
              <Button variant="outline" size="lg" onClick={handleTestQuiz}>
                Tester un quiz
              </Button>
            )}

            {quiz.questions.length > 0 && (
              <>
                <Button
                  onClick={handleTestQuiz}
                  variant="outline"
                  size="lg"
                  disabled={!quiz.title}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Tester le quiz
                </Button>

                <Button
                  onClick={exportQuiz}
                  variant="secondary"
                  size="lg"
                  disabled={!quiz.title}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter JSON
                </Button>
              </>
            )}
          </div>

          {/* Note d'aide */}
          {quiz.questions.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
              <p className="text-muted-foreground">
                👆 Commencez par ajouter votre première question
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

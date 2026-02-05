// pages/Home.tsx
import { QuestionBuilder } from "@/components/QuizBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuiz } from "@/hooks/useQuiz";
import { Download, Plus } from "lucide-react";

export default function Home() {
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
  } = useQuiz();

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Créateur de Quiz</h1>

      {/* Informations du quiz */}
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="title">Titre du quiz</Label>
          <Input
            id="title"
            value={quiz.title}
            onChange={(e) => updateQuizInfo("title", e.target.value)}
            placeholder="Entrez le titre du quiz"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={quiz.description}
            onChange={(e) => updateQuizInfo("description", e.target.value)}
            placeholder="Entrez une description"
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-8">
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

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={addQuestion}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une question
        </Button>

        <Button
          onClick={exportQuiz}
          variant="secondary"
          disabled={!quiz.title || quiz.questions.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter JSON
        </Button>
      </div>
    </div>
  );
}

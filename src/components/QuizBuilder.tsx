// components/QuestionBuilder.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Question, QuestionType } from "@/schema/quiz";
import { Plus, Trash2 } from "lucide-react";

type QuestionBuilderProps = {
  question: Question;
  index: number;

  onUpdate: (
    questionId: number,
    field: keyof Question,
    value: string | string[],
  ) => void;

  onDelete: (questionId: number) => void;
  onAddAnswer: (questionId: number) => void;

  onUpdateAnswer: (
    questionId: number,
    answerIndex: number,
    value: string,
  ) => void;

  onDeleteAnswer: (questionId: number, answerIndex: number) => void;
  onToggleCorrect: (questionId: number, answer: string) => void;
  onChangeType: (questionId: number, newType: QuestionType) => void;
};

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  question,
  index,
  onUpdate,
  onDelete,
  onAddAnswer,
  onUpdateAnswer,
  onDeleteAnswer,
  onToggleCorrect,
  onChangeType,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(question.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Titre de la question */}
        <div>
          <Label htmlFor={`question-${question.id}`}>
            Titre de la question
          </Label>
          <Input
            id={`question-${question.id}`}
            value={question.title}
            onChange={(e) => onUpdate(question.id, "title", e.target.value)}
            placeholder="Entrez votre question"
          />
        </div>

        {/* Type de question */}
        <div>
          <Label>Type de question</Label>
          <Select
            value={question.type}
            onValueChange={(value: QuestionType) =>
              onChangeType(question.id, value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unique">Choix unique</SelectItem>
              <SelectItem value="multiple">Choix multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Réponses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Réponses</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddAnswer(question.id)}
              disabled={question.answers.length >= 4}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter (max 4)
            </Button>
          </div>

          <div className="space-y-2">
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center gap-2">
                {/* Checkbox/Radio pour marquer comme correcte */}
                {question.type === "unique" ? (
                  <RadioGroup
                    value={question.correct_answers as string}
                    disabled={answer ? false : true}
                    onValueChange={(value) =>
                      onToggleCorrect(question.id, value)
                    }
                  >
                    <RadioGroupItem value={answer} />
                  </RadioGroup>
                ) : (
                  <Checkbox
                    disabled={answer ? false : true}
                    checked={
                      Array.isArray(question.correct_answers) &&
                      question.correct_answers.includes(answer)
                    }
                    onCheckedChange={() => onToggleCorrect(question.id, answer)}
                  />
                )}

                {/* Input réponse */}
                <Input
                  value={answer}
                  onChange={(e) =>
                    onUpdateAnswer(question.id, answerIndex, e.target.value)
                  }
                  placeholder={`Réponse ${answerIndex + 1}`}
                  className="flex-1"
                />

                {/* Bouton supprimer */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteAnswer(question.id, answerIndex)}
                  disabled={question.answers.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

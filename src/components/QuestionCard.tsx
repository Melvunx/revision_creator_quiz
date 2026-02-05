// components/QuestionCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Question } from "@/schema/quiz";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string | string[] | undefined;
  onSelectAnswer: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onSelectAnswer,
}) => {
  const isAnswerSelected = (answer: string): boolean => {
    if (question.type === "unique") {
      return userAnswer === answer;
    } else {
      return Array.isArray(userAnswer) && userAnswer.includes(answer);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="text-sm text-muted-foreground mb-2">
          Question {questionNumber} sur {totalQuestions}
        </div>
        <CardTitle className="text-xl">{question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.type === "unique" ? (
            <RadioGroup
              value={userAnswer as string}
              onValueChange={onSelectAnswer}
            >
              {question.answers.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                  onClick={() => onSelectAnswer(answer)}
                >
                  <RadioGroupItem value={answer} id={`answer-${index}`} />
                  <Label
                    htmlFor={`answer-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">
                Sélectionnez toutes les bonnes réponses
              </p>
              {question.answers.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                  onClick={() => onSelectAnswer(answer)}
                >
                  <Checkbox
                    id={`answer-${index}`}
                    checked={isAnswerSelected(answer)}
                    onCheckedChange={() => onSelectAnswer(answer)}
                  />
                  <Label
                    htmlFor={`answer-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {answer}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

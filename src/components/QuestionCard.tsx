// components/QuestionCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Question } from "@/schema/quiz";
import { motion } from "motion/react";

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

  // Animation pour le changement de question (Card entière)
  const cardVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Animation pour la sélection d'une réponse
  const answerVariants = {
    unselected: {
      scale: 1,
      backgroundColor: "transparent",
    },
    selected: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      key={question.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // transition={{ ease: "easeOut" }}
      exit="exit"
    >
      <Card className="w-full">
        <CardHeader>
          <div className="text-muted-foreground mb-2">
            Question {questionNumber} sur {totalQuestions}
          </div>
          <CardTitle className="text-2xl">{question.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {question.type === "unique" ? (
              <RadioGroup
                value={userAnswer as string}
                onValueChange={onSelectAnswer}
              >
                {question.answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                    onClick={() => onSelectAnswer(answer)}
                    variants={answerVariants}
                    animate={
                      isAnswerSelected(answer) ? "selected" : "unselected"
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RadioGroupItem value={answer} id={`answer-${index}`} />
                    <Label
                      htmlFor={`answer-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {answer}
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Sélectionnez toutes les bonnes réponses
                </p>
                {question.answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                    onClick={() => onSelectAnswer(answer)}
                    variants={answerVariants}
                    animate={
                      isAnswerSelected(answer) ? "selected" : "unselected"
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

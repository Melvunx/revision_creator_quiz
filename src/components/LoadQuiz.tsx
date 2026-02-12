import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MotionButton } from "./MotionButton";

type LoadQuizProps = {
  error: string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LoadQuiz({ error, handleFileUpload }: LoadQuizProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen container mx-auto py-6 flex flex-col gap-12 justify-center max-w-2xl">
      <div className="flex">
        <MotionButton
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </MotionButton>
      </div>

      <Card className="bg-muted/30 rounded-lg border-2 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div>
              <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Charger un quiz</h2>
              <p className="text-muted-foreground">
                Importez un fichier JSON de quiz pour commencer
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="quiz-upload"
              />
              <label htmlFor="quiz-upload">
                <Button asChild size="lg">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Choisir un fichier
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

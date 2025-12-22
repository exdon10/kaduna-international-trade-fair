"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getSponsorshipRecommendation } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Bot, CircleCheck, AlertTriangle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Getting Recommendation..." : "Get Recommendation"}
      {!pending && <Wand2 className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export default function RecommendationTool() {
  const initialState = { message: null, errors: {}, recommendation: null };
  const [state, dispatch] = useActionState(getSponsorshipRecommendation, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "An error occurred while getting your recommendation. Please try again.") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section id="recommendation-tool" className="py-16 sm:py-24 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-extrabold text-foreground sm:text-4xl font-headline">
              AI-Powered Sponsorship Advisor
            </CardTitle>
            <CardDescription className="mt-4 max-w-2xl mx-auto text-lg">
              Not sure which package is right for you? Describe your business goals, and our AI will suggest the best fit to maximize your ROI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="businessGoals"
                  name="businessGoals"
                  placeholder="e.g., 'We want to launch our new fintech app to a large audience, generate 1,000 new user sign-ups, and establish our brand as a major player in Northern Nigeria.'"
                  className="min-h-[120px] text-base"
                  aria-describedby="goals-error"
                  required
                />
                {state.errors?.businessGoals && (
                  <p id="goals-error" className="text-sm font-medium text-destructive">
                    {state.errors.businessGoals.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <SubmitButton />
              </div>
            </form>

            {state.recommendation && (
              <Card className="mt-8 bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline">
                    <CircleCheck className="h-6 w-6 text-green-500" />
                    Your AI-Powered Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">Recommended Tier(s)</h4>
                    <p className="text-primary font-bold text-xl">{state.recommendation.recommendedTiers}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Reasoning</h4>
                    <p className="text-muted-foreground">{state.recommendation.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {state.message && !state.recommendation && state.message !== "Success" && (
                <Card className="mt-8 bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline text-destructive">
                    <AlertTriangle className="h-6 w-6" />
                    An Error Occurred
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">{state.message}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MultipleChoiceLetterActivity as MultipleChoiceType } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MultipleChoiceLetterActivity({
  activity,
  onNext,
  onAnswer
}: {
  activity: MultipleChoiceType;
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === activity.correct;

  return (
    <Card className="mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-black text-brand-ink">{activity.prompt}</h2>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {activity.choices.map((choice) => (
          <motion.button
            whileTap={{ scale: 0.98 }}
            key={choice}
            className={`rounded-4xl border-2 p-6 text-5xl font-black transition ${
              selected === choice
                ? choice === activity.correct
                  ? "border-brand-green bg-brand-green/20"
                  : "border-brand-red bg-brand-red/20"
                : "border-slate-200 bg-white hover:border-brand-sky"
            }`}
            onClick={() => {
              setSelected(choice);
              onAnswer(choice === activity.correct);
            }}
          >
            {choice}
          </motion.button>
        ))}
      </div>

      {selected ? (
        <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-lg font-black">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Great job
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                Try again next time
              </>
            )}
          </div>
          <p className="text-sm text-slate-600">
            {isCorrect ? activity.successMessage : `The correct answer was ${activity.correct}.`}
          </p>
          <Button className="mt-4" onClick={onNext}>
            Next
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

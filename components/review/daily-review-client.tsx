"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useProgress } from "@/hooks/use-progress";
import { buildDailyReview } from "@/lib/review";

export function DailyReviewClient() {
  const { progress, logReview } = useProgress();
  const questions = useMemo(() => buildDailyReview(progress), [progress]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const done = index >= questions.length;
  const current = questions[index];

  if (!questions.length) {
    return (
      <AppShell title="Daily Review">
        <EmptyState title="No review yet" body="Learn your first letters, then daily review will appear here." />
      </AppShell>
    );
  }

  if (done) {
    return (
      <AppShell title="Daily Review">
        <Card className="mx-auto max-w-2xl text-center">
          <div className="text-6xl">🌟</div>
          <h2 className="mt-4 text-3xl font-black text-brand-ink">Review complete</h2>
          <p className="mt-2 text-slate-600">
            You scored {score} out of {questions.length}. Come back tomorrow for more review.
          </p>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell title="Daily Review">
      <Card className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-slate-500">
          Question {index + 1} of {questions.length}
        </p>
        <h2 className="mt-2 text-3xl font-black text-brand-ink">{current.prompt}</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {current.choices.map((choice) => (
            <button
              key={choice}
              className={`rounded-4xl border-2 p-5 text-left transition ${
                selected === choice
                  ? current.correctAnswers.includes(choice)
                    ? "border-brand-green bg-brand-green/20"
                    : "border-brand-red bg-brand-red/20"
                  : "border-slate-200 bg-white hover:border-brand-sky"
              }`}
              onClick={() => {
                if (selected) return;
                const correct = current.correctAnswers.includes(choice);
                setSelected(choice);
                if (correct) setScore((value) => value + 1);
                logReview(current.letterId, correct);
              }}
            >
              <div className="text-3xl font-black text-brand-amharic">{choice}</div>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="mt-6 text-center">
            <Button
              onClick={() => {
                setSelected(null);
                setIndex((value) => value + 1);
              }}
            >
              Next
            </Button>
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}

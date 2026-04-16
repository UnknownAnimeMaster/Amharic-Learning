"use client";

import { useMemo, useState } from "react";
import { WordFindActivity as WordFindType } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { percent } from "@/lib/utils";

export function WordFindActivity({
  activity,
  onNext,
  onAnswer
}: {
  activity: WordFindType;
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const correctSet = useMemo(() => new Set(activity.correctWords), [activity.correctWords]);

  const done = selected.length >= activity.correctWords.length;
  const score = selected.filter((item) => correctSet.has(item)).length;

  return (
    <Card className="mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-black text-brand-ink">{activity.instruction}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {activity.words.map((word) => {
          const chosen = selected.includes(word.amharic);

          return (
            <button
              key={word.amharic}
              className={`rounded-4xl border-2 p-5 text-left transition ${
                chosen
                  ? correctSet.has(word.amharic)
                    ? "border-brand-green bg-brand-green/20"
                    : "border-brand-red bg-brand-red/20"
                  : "border-slate-200 bg-white hover:border-brand-sky"
              }`}
              onClick={() => {
                if (chosen) return;
                const nextSelected = [...selected, word.amharic];
                setSelected(nextSelected);
                onAnswer(correctSet.has(word.amharic));
              }}
            >
              <div className="text-3xl">{word.emoji ?? "🌼"}</div>
              <div className="mt-2 text-2xl font-black text-brand-amharic">{word.amharic}</div>
              <div className="text-sm text-slate-500">{word.english}</div>
            </button>
          );
        })}
      </div>

      {done ? (
        <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-center">
          <p className="text-lg font-black text-brand-ink">
            Score: {percent(score, activity.correctWords.length)}%
          </p>
          <p className="text-sm text-slate-600">Nice searching. Let’s keep moving.</p>
          <Button className="mt-4" onClick={onNext}>
            Next
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

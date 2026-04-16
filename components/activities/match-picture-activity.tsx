"use client";

import { useState } from "react";
import { MatchPictureActivity as MatchPictureType } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MatchPictureActivity({
  activity,
  onNext,
  onAnswer
}: {
  activity: MatchPictureType;
  onNext: () => void;
  onAnswer: (correct: boolean) => void;
}) {
  const [done, setDone] = useState(false);

  return (
    <Card className="mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-black text-brand-ink">Match the letter and picture</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {activity.pairs.map((pair) => (
          <button
            key={pair.id}
            className="rounded-4xl border-2 border-slate-200 bg-white p-5 text-left transition hover:border-brand-sky"
            onClick={() => {
              onAnswer(true);
              setDone(true);
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{pair.emoji}</div>
              <div>
                <div className="text-4xl font-black text-brand-amharic">{pair.letter}</div>
                <div className="text-xl font-bold text-brand-ink">{pair.word}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {done ? (
        <div className="mt-6 text-center">
          <Button onClick={onNext}>Next</Button>
        </div>
      ) : null}
    </Card>
  );
}

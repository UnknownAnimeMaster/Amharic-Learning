"use client";

import { motion } from "framer-motion";
import { IntroCardActivity as IntroType } from "@/types";
import { lettersById } from "@/data/letters";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioChip } from "./audio-chip";

export function IntroCardActivity({
  activity,
  onNext
}: {
  activity: IntroType;
  onNext: () => void;
}) {
  const letter = activity.letterId ? lettersById[activity.letterId] : undefined;

  return (
    <Card className="mx-auto max-w-3xl text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-amharic">Intro</p>
        <h2 className="mt-2 text-3xl font-black text-brand-ink">{activity.title}</h2>
        {letter ? (
          <div className="mt-6 text-8xl font-black text-brand-amharic">{letter.character}</div>
        ) : null}
        {letter ? (
          <p className="mt-2 text-lg font-semibold text-slate-500">
            {letter.transliteration}, {letter.soundHint}
          </p>
        ) : null}

        <p className="mx-auto mt-4 max-w-xl text-slate-600">{activity.body}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {(activity.examples ?? []).map((word) => (
            <div key={word.amharic} className="rounded-3xl bg-brand-cream px-4 py-3">
              <div className="text-2xl">{word.emoji ?? "🌼"}</div>
              <div className="mt-1 text-xl font-black text-brand-amharic">{word.amharic}</div>
              <div className="text-xs text-slate-500">{word.english}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AudioChip audioKey={letter ? `letter-${letter.id}` : undefined} label="Hear it" />
          <Button onClick={onNext}>Continue</Button>
        </div>
      </motion.div>
    </Card>
  );
}

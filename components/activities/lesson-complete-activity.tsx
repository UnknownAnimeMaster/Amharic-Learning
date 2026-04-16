"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LessonCompleteActivity as CompleteType } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LessonCompleteActivity({
  activity,
  xp,
  stars,
  onFinish
}: {
  activity: CompleteType;
  xp: number;
  stars: number;
  onFinish: () => void;
}) {
  return (
    <Card className="mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-4"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-4xl">
          🎉
        </div>
        <div className="flex items-center justify-center gap-2 text-brand-amharic">
          <Sparkles className="h-5 w-5" />
          Celebration
        </div>
        <h2 className="text-3xl font-black text-brand-ink">{activity.title}</h2>
        <p className="text-slate-600">{activity.celebrationText}</p>

        <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
          <div className="rounded-3xl bg-brand-cream p-4">
            <div className="text-2xl font-black">{xp}</div>
            <div className="text-sm text-slate-500">XP gained</div>
          </div>
          <div className="rounded-3xl bg-brand-cream p-4">
            <div className="text-2xl font-black">{"⭐".repeat(stars)}</div>
            <div className="text-sm text-slate-500">Stars earned</div>
          </div>
        </div>

        <p className="text-5xl">🐥</p>

        <Button className="mt-2" onClick={onFinish}>
          Continue
        </Button>
      </motion.div>
    </Card>
  );
}

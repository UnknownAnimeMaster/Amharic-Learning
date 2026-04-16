"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { lessonsById } from "@/data/lessons";
import { useProgress } from "@/hooks/use-progress";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { IntroCardActivity } from "@/components/activities/intro-card-activity";
import { MultipleChoiceLetterActivity } from "@/components/activities/multiple-choice-letter-activity";
import { WordFindActivity } from "@/components/activities/word-find-activity";
import { MatchPictureActivity } from "@/components/activities/match-picture-activity";
import { TraceLetterActivity } from "@/components/activities/trace-letter-activity";
import { LessonCompleteActivity } from "@/components/activities/lesson-complete-activity";

export function LessonPlayer({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const { completeLesson, logReview } = useProgress();
  const lesson = lessonsById[lessonId];
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const activity = lesson?.activities[step];

  const stars = useMemo(() => {
    if (!lesson) return 0;
    const answerable = lesson.activities.filter((item) => item.type !== "intro" && item.type !== "lesson-complete").length;
    const ratio = answerable ? correctAnswers / answerable : 1;
    if (ratio >= 0.85) return 3;
    if (ratio >= 0.55) return 2;
    return 1;
  }, [correctAnswers, lesson]);

  if (!lesson || !activity) {
    return (
      <Card>
        <h2 className="text-2xl font-black text-brand-ink">Lesson not found</h2>
        <p className="mt-2 text-slate-600">
          The lesson data is missing. Check data/lessons.ts and try again.
        </p>
      </Card>
    );
  }

  function next() {
    setStep((current) => Math.min(current + 1, lesson.activities.length - 1));
  }

  function handleAnswer(correct: boolean) {
    if (correct) setCorrectAnswers((current) => current + 1);
    if (activity.letterId) logReview(activity.letterId, correct);
  }

  const headerProgress = Math.round(((step + 1) / lesson.activities.length) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-500">{lesson.description}</p>
            <h2 className="text-2xl font-black text-brand-ink">{lesson.title}</h2>
          </div>
          <div className="rounded-full bg-brand-cream px-4 py-2 text-sm font-bold text-brand-ink">
            {lesson.estimatedMinutes} min
          </div>
        </div>
        <ProgressBar className="mt-4" value={headerProgress} />
      </Card>

      {activity.type === "intro" ? (
        <IntroCardActivity activity={activity} onNext={next} />
      ) : null}

      {activity.type === "multiple-choice-letter" ? (
        <MultipleChoiceLetterActivity activity={activity} onNext={next} onAnswer={handleAnswer} />
      ) : null}

      {activity.type === "word-find" ? (
        <WordFindActivity activity={activity} onNext={next} onAnswer={handleAnswer} />
      ) : null}

      {activity.type === "match-picture" ? (
        <MatchPictureActivity activity={activity} onNext={next} onAnswer={handleAnswer} />
      ) : null}

      {activity.type === "trace" ? (
        <TraceLetterActivity activity={activity} onNext={next} onAnswer={handleAnswer} />
      ) : null}

      {activity.type === "lesson-complete" ? (
        <LessonCompleteActivity
          activity={activity}
          xp={lesson.rewardXp}
          stars={stars}
          onFinish={() => {
            completeLesson(lesson.id, stars);
            router.push("/home");
          }}
        />
      ) : null}
    </div>
  );
}

"use client";

import { AppShell } from "@/components/layout/app-shell";
import { LessonPath } from "@/components/lesson/lesson-path";
import { useProgress } from "@/hooks/use-progress";

export default function LearnPage() {
  const { progress } = useProgress();

  return (
    <AppShell title="Lesson Path">
      <LessonPath
        starsByLesson={progress.starsByLesson}
        completedLessons={progress.completedLessons}
      />
    </AppShell>
  );
}

import { AppShell } from "@/components/layout/app-shell";
import { LessonPlayer } from "@/components/lesson/lesson-player";

export default async function LessonPage({
  params
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return (
    <AppShell title="Lesson Player">
      <LessonPlayer lessonId={lessonId} />
    </AppShell>
  );
}

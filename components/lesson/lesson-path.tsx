import Link from "next/link";
import { units } from "@/data/units";
import { lessonsById } from "@/data/lessons";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";

export function LessonPath({
  starsByLesson,
  completedLessons
}: {
  starsByLesson: Record<string, number>;
  completedLessons: string[];
}) {
  return (
    <div className="space-y-6">
      {units.map((unit, unitIndex) => (
        <Card key={unit.id} className={unit.status === "locked" ? "opacity-80" : ""}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Unit {unitIndex + 1}</p>
              <h3 className="text-2xl font-black text-brand-ink">{unit.title}</h3>
              <p className="text-sm text-slate-500">{unit.subtitle}</p>
            </div>
            <BadgePill
              className={
                unit.status === "locked"
                  ? "bg-slate-100 text-slate-500"
                  : unit.status === "completed"
                  ? "bg-brand-green"
                  : "bg-brand-gold"
              }
            >
              {unit.status === "locked"
                ? "Locked"
                : unit.status === "completed"
                ? "Completed"
                : "Current"}
            </BadgePill>
          </div>

          {unit.lessonIds.length ? (
            <div className="mt-6 space-y-4">
              {unit.lessonIds.map((lessonId, lessonIndex) => {
                const lesson = lessonsById[lessonId];
                if (!lesson) return null;
                const done = completedLessons.includes(lessonId);
                const stars = starsByLesson[lessonId] ?? 0;

                return (
                  <div key={lessonId} className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 ${
                        done
                          ? "border-brand-green bg-brand-green/30"
                          : unit.status === "locked"
                          ? "border-slate-200 bg-slate-100"
                          : "border-brand-gold bg-brand-cream"
                      } text-lg font-black text-brand-ink`}
                    >
                      {lessonIndex + 1}
                    </div>
                    <div className="flex-1 rounded-3xl bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-black text-brand-ink">{lesson.title}</h4>
                          <p className="text-sm text-slate-500">{lesson.description}</p>
                        </div>
                        {unit.status === "locked" ? (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-500">
                            Soon
                          </span>
                        ) : (
                          <Link
                            href={`/learn/${lessonId}`}
                            className="rounded-full bg-brand-gold px-4 py-2 text-sm font-bold text-brand-ink"
                          >
                            {done ? "Play again" : "Start"}
                          </Link>
                        )}
                      </div>
                      <p className="mt-3 text-xs font-semibold text-slate-500">
                        Stars earned: {"⭐".repeat(stars) || "No stars yet"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
              This unit is a future-ready placeholder for the next lesson set.
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

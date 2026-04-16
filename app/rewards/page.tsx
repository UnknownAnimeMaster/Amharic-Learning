"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { lettersById } from "@/data/letters";

const badgeMeta = [
  { id: "first-lesson", title: "First Lesson", description: "Complete your first lesson", emoji: "🎓" },
  { id: "three-day-streak", title: "3 Day Streak", description: "Practice three days in a row", emoji: "🔥" },
  { id: "letter-finder", title: "Letter Finder", description: "Learn at least three letters", emoji: "🔎" },
  { id: "tracing-star", title: "Tracing Star", description: "Do lots of tracing practice", emoji: "✍️" }
];

export default function RewardsPage() {
  const { progress, stats, togglePracticeDay } = useProgress();

  return (
    <AppShell title="Rewards & Progress">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-2xl font-black text-brand-ink">Big picture progress</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-brand-cream p-4">
              <div className="text-2xl font-black">{progress.xp}</div>
              <div className="text-sm text-slate-500">Total XP</div>
            </div>
            <div className="rounded-3xl bg-brand-cream p-4">
              <div className="text-2xl font-black">{stats.totalStars}</div>
              <div className="text-sm text-slate-500">Stars earned</div>
            </div>
            <div className="rounded-3xl bg-brand-cream p-4">
              <div className="text-2xl font-black">{progress.currentStreak}</div>
              <div className="text-sm text-slate-500">Current streak</div>
            </div>
            <div className="rounded-3xl bg-brand-cream p-4">
              <div className="text-2xl font-black">{stats.lessonCount}</div>
              <div className="text-sm text-slate-500">Lessons completed</div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-black text-brand-ink">Badges</h2>
          <div className="mt-4 grid gap-3">
            {badgeMeta.map((badge) => {
              const unlocked = progress.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-3xl border p-4 ${
                    unlocked ? "border-brand-green bg-brand-green/15" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{badge.emoji}</div>
                    <div>
                      <h3 className="font-black text-brand-ink">{badge.title}</h3>
                      <p className="text-sm text-slate-500">{badge.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="text-2xl font-black text-brand-ink">7-Day Letter Practice</h2>
        <p className="mt-2 text-slate-600">
          The booklet-style routine can be tracked here. Tap a day box when the child practiced that letter.
        </p>

        <div className="mt-6 grid gap-4">
          {progress.knownLetters.length ? (
            progress.knownLetters.map((letterId) => {
              const letter = lettersById[letterId];
              if (!letter) return null;
              const days = progress.sevenDayPractice[letterId] ?? [false, false, false, false, false, false, false];

              return (
                <div key={letterId} className="rounded-4xl bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black text-brand-amharic">{letter.character}</div>
                    <div>
                      <h3 className="font-black text-brand-ink">{letter.specialName ?? letter.transliteration}</h3>
                      <p className="text-sm text-slate-500">{letter.traceLabel}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {days.map((checked, dayIndex) => (
                      <Button
                        key={dayIndex}
                        variant={checked ? "success" : "secondary"}
                        onClick={() => togglePracticeDay(letterId, dayIndex)}
                      >
                        Day {dayIndex + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">Learn some letters first to unlock practice cards.</p>
          )}
        </div>
      </Card>
    </AppShell>
  );
}

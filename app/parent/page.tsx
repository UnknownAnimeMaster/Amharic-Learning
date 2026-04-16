"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { lettersById } from "@/data/letters";
import { useProgress } from "@/hooks/use-progress";
import { getProfile } from "@/lib/storage";

export default function ParentPage() {
  const profile = getProfile();
  const { progress, stats } = useProgress();

  const weakLetters = Object.entries(progress.weakLetters)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <AppShell title="Parent / Teacher Summary">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-2xl font-black text-brand-ink">{profile.name}</h2>
          <p className="mt-2 text-sm text-slate-500">Current unit: ሀለሐመ</p>
          <p className="text-sm text-slate-500">Total lessons completed: {stats.lessonCount}</p>
          <p className="text-sm text-slate-500">Total review sessions completed: {progress.reviewHistory.length}</p>
          <p className="text-sm text-slate-500">Last active date: {progress.lastActiveDate ?? "Not yet"}</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-black text-brand-ink">Letters learned</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {stats.lettersLearned.length ? (
              stats.lettersLearned.map((letter) => (
                <div key={letter.id} className="rounded-3xl bg-brand-cream px-4 py-3 text-center">
                  <div className="text-4xl font-black text-brand-amharic">{letter.character}</div>
                  <div className="text-xs text-slate-500">{letter.transliteration}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No letters learned yet.</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="text-2xl font-black text-brand-ink">Weak letters needing review</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {weakLetters.length ? (
            weakLetters.map(([letterId, count]) => {
              const letter = lettersById[letterId];
              return (
                <div key={letterId} className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-4xl font-black text-brand-amharic">{letter?.character}</div>
                  <div className="font-bold text-brand-ink">{letter?.transliteration}</div>
                  <div className="text-sm text-slate-500">Needs review score: {count}</div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">No weak letters yet. Keep practicing.</p>
          )}
        </div>
      </Card>

      <Card className="mt-4">
        <h2 className="text-2xl font-black text-brand-ink">Printable practice list</h2>
        <p className="mt-2 text-slate-600">
          Future version placeholder: generate take-home worksheets for {profile.name} with the letters:
        </p>
        <p className="mt-3 text-lg font-bold text-brand-amharic">
          {stats.lettersLearned.map((letter) => letter.character).join("  ") || "ሀ ለ ሐ መ"}
        </p>
      </Card>
    </AppShell>
  );
}

"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Card } from "@/components/ui/card";
import { RecentLetters } from "@/components/dashboard/recent-letters";
import { RewardPanel } from "@/components/dashboard/reward-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { useProgress } from "@/hooks/use-progress";
import { getProfile } from "@/lib/storage";

export default function HomePage() {
  const profile = getProfile();
  const { progress, stats } = useProgress();

  const todayPercent = Math.min(Math.round((progress.dailyGoalProgress / profile.goalMinutes) * 100), 100);

  return (
    <AppShell
      title={`Hi, ${profile.name}`}
      action={
        <Link href="/onboarding">
          <Button variant="secondary">Edit profile</Button>
        </Link>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-gradient-to-br from-brand-cream to-white">
          <p className="text-sm font-semibold text-brand-amharic">Today’s journey</p>
          <h2 className="mt-2 text-4xl font-black text-brand-ink">
            Ready to keep your streak going?
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Keep learning one letter at a time. Short practice every day helps your memory grow.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard label="Current streak" value={progress.currentStreak} emoji="🔥" />
            <StatCard label="XP" value={progress.xp} emoji="✨" />
            <StatCard label="Stars" value={stats.totalStars} emoji="⭐" />
          </div>

          <div className="mt-6 rounded-4xl bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-brand-ink">Today’s goal</p>
              <p className="text-sm text-slate-500">
                {progress.dailyGoalProgress}/{profile.goalMinutes} min
              </p>
            </div>
            <ProgressBar className="mt-3" value={todayPercent} />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/learn">
                <Button>Continue lesson</Button>
              </Link>
              <Link href="/review">
                <Button variant="secondary">Quick daily review</Button>
              </Link>
            </div>
          </div>
        </Card>

        <RewardPanel xp={progress.xp} stars={stats.totalStars} streak={progress.currentStreak} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <RecentLetters letterIds={progress.knownLetters.slice(-4)} />
        <Card>
          <h3 className="text-lg font-black text-brand-ink">Weekly progress</h3>
          <p className="mt-2 text-sm text-slate-600">
            Lessons completed: {stats.lessonCount}
          </p>
          <p className="text-sm text-slate-600">Reviews done: {progress.reviewHistory.length}</p>
          <p className="text-sm text-slate-600">Motivation: You are doing great. Keep your steps small and steady.</p>
        </Card>
      </div>
    </AppShell>
  );
}

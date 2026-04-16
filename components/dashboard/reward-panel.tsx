import { Card } from "@/components/ui/card";

export function RewardPanel({
  xp,
  stars,
  streak
}: {
  xp: number;
  stars: number;
  streak: number;
}) {
  const message =
    streak >= 3
      ? "You are on a hot streak."
      : xp >= 30
      ? "You are growing fast."
      : "Your learning garden is just starting.";

  return (
    <Card className="bg-gradient-to-br from-brand-green/30 to-brand-sky/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-600">Friendly rewards</p>
          <h3 className="text-2xl font-black text-brand-ink">Keep going</h3>
          <p className="mt-2 text-sm text-slate-600">{message}</p>
        </div>
        <div className="text-5xl">🐣</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-3xl bg-white p-3">
          <div className="text-xl font-black">{xp}</div>
          <div className="text-xs text-slate-500">XP</div>
        </div>
        <div className="rounded-3xl bg-white p-3">
          <div className="text-xl font-black">{stars}</div>
          <div className="text-xs text-slate-500">Stars</div>
        </div>
        <div className="rounded-3xl bg-white p-3">
          <div className="text-xl font-black">{streak}</div>
          <div className="text-xs text-slate-500">Streak</div>
        </div>
      </div>
    </Card>
  );
}

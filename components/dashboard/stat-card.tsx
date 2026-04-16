import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  emoji,
  helper
}: {
  label: string;
  value: string | number;
  emoji: string;
  helper?: string;
}) {
  return (
    <Card className="bg-white">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cream text-2xl">
        {emoji}
      </div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <h3 className="text-2xl font-black text-brand-ink">{value}</h3>
      {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
    </Card>
  );
}

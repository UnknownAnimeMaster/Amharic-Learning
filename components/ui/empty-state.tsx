import { Card } from "./card";

export function EmptyState({
  title,
  body
}: {
  title: string;
  body: string;
}) {
  return (
    <Card className="text-center">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cream text-3xl">
        🌼
      </div>
      <h3 className="text-xl font-bold text-brand-ink">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </Card>
  );
}

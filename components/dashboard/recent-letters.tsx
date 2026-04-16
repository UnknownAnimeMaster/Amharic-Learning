import { lettersById } from "@/data/letters";
import { Card } from "@/components/ui/card";

export function RecentLetters({ letterIds }: { letterIds: string[] }) {
  return (
    <Card>
      <h3 className="text-lg font-black text-brand-ink">Recently learned letters</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {letterIds.length ? (
          letterIds.map((id) => {
            const letter = lettersById[id];
            if (!letter) return null;
            return (
              <div key={id} className="rounded-3xl bg-brand-cream p-4 text-center">
                <div className="text-4xl font-black text-brand-amharic">{letter.character}</div>
                <div className="mt-1 text-xs font-semibold text-slate-600">
                  {letter.transliteration}
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-sm text-slate-500">
            Start Unit 1 to fill this area with your first letters.
          </p>
        )}
      </div>
    </Card>
  );
}

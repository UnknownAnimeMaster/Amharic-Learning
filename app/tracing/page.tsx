"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { letters } from "@/data/letters";
import { TraceLetterActivity } from "@/components/activities/trace-letter-activity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TracingPage() {
  const [index, setIndex] = useState(0);
  const letter = letters[index];

  return (
    <AppShell title="Tracing Practice">
      <div className="space-y-4">
        <TraceLetterActivity
          activity={{
            id: `trace-${letter.id}`,
            type: "trace",
            letterId: letter.id,
            guideLetter: letter.character,
            instruction: `Practice tracing ${letter.character}`
          }}
          onNext={() => setIndex((value) => (value + 1) % letters.length)}
          onAnswer={() => {}}
        />

        <Card>
          <h3 className="text-xl font-black text-brand-ink">Writing steps fallback</h3>
          <p className="mt-2 text-slate-600">{letter.traceLabel}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {letters.map((item, itemIndex) => (
              <Button
                key={item.id}
                variant={itemIndex === index ? "primary" : "secondary"}
                onClick={() => setIndex(itemIndex)}
              >
                {item.character}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

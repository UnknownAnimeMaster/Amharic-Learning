"use client";

import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playAudio } from "@/lib/audio";

export function AudioChip({
  audioKey,
  label = "Sound"
}: {
  audioKey?: string;
  label?: string;
}) {
  return (
    <Button variant="secondary" className="gap-2 px-4 py-2" onClick={() => playAudio(audioKey)}>
      <Volume2 className="h-4 w-4" />
      {label}
    </Button>
  );
}

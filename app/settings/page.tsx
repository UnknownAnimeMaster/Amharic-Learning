"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  exportProgressBlob,
  getProfile,
  resetAllProgress,
  saveProfile
} from "@/lib/storage";

export default function SettingsPage() {
  const router = useRouter();
  const initialProfile = getProfile();
  const [name, setName] = useState(initialProfile.name);
  const [soundOn, setSoundOn] = useState(initialProfile.soundOn);
  const [musicOn, setMusicOn] = useState(initialProfile.musicOn);
  const [languageMode, setLanguageMode] = useState(initialProfile.languageMode);
  const [theme, setTheme] = useState(initialProfile.theme);

  function persist() {
    const nextProfile = {
      ...initialProfile,
      name,
      soundOn,
      musicOn,
      languageMode,
      theme
    };
    saveProfile(nextProfile);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  function exportJson() {
    const blob = exportProgressBlob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "fidel-friends-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AppShell title="Settings">
      <Card className="mx-auto max-w-3xl">
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="font-bold text-brand-ink">Learner name</span>
            <input
              className="rounded-3xl border border-slate-200 px-4 py-3"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className={`rounded-3xl border-2 p-4 text-left ${soundOn ? "border-brand-green bg-brand-green/15" : "border-slate-200"}`}
              onClick={() => setSoundOn((value) => !value)}
            >
              Sound: {soundOn ? "On" : "Off"}
            </button>
            <button
              className={`rounded-3xl border-2 p-4 text-left ${musicOn ? "border-brand-green bg-brand-green/15" : "border-slate-200"}`}
              onClick={() => setMusicOn((value) => !value)}
            >
              Music: {musicOn ? "On" : "Off"}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className={`rounded-3xl border-2 p-4 text-left ${languageMode === "english-amharic" ? "border-brand-sky bg-brand-sky/15" : "border-slate-200"}`}
              onClick={() => setLanguageMode("english-amharic")}
            >
              English + Amharic
            </button>
            <button
              className={`rounded-3xl border-2 p-4 text-left ${languageMode === "amharic-mostly" ? "border-brand-sky bg-brand-sky/15" : "border-slate-200"}`}
              onClick={() => setLanguageMode("amharic-mostly")}
            >
              Amharic mostly
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className={`rounded-3xl border-2 p-4 text-left ${theme === "light" ? "border-brand-gold bg-brand-cream" : "border-slate-200"}`}
              onClick={() => setTheme("light")}
            >
              Light theme
            </button>
            <button
              className={`rounded-3xl border-2 p-4 text-left ${theme === "dark" ? "border-brand-gold bg-brand-cream" : "border-slate-200"}`}
              onClick={() => setTheme("dark")}
            >
              Dark theme
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={persist}>Save settings</Button>
            <Button variant="secondary" onClick={exportJson}>
              Export progress JSON
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetAllProgress();
                router.push("/");
              }}
            >
              Reset progress
            </Button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}

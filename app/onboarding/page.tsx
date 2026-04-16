"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultProfile, saveProfile } from "@/lib/storage";
import { AgeRange, GoalMinutes, LanguageMode } from "@/types";

const steps = ["name", "age", "goal", "language", "finish"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Friend");
  const [ageRange, setAgeRange] = useState<AgeRange>("6-7");
  const [goalMinutes, setGoalMinutes] = useState<GoalMinutes>(5);
  const [languageMode, setLanguageMode] = useState<LanguageMode>("english-amharic");

  function next() {
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function finish() {
    saveProfile({
      ...defaultProfile,
      name,
      ageRange,
      goalMinutes,
      languageMode,
      createdAt: new Date().toISOString()
    });
    router.push("/home");
  }

  return (
    <AppShell title="Welcome">
      <Card className="mx-auto max-w-2xl bg-white">
        {step === 0 ? (
          <>
            <h2 className="text-3xl font-black text-brand-ink">What is your learner name?</h2>
            <input
              className="mt-6 w-full rounded-3xl border border-slate-200 px-5 py-4 text-lg outline-none ring-brand-sky focus:ring-2"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Type a name"
            />
            <Button className="mt-6" onClick={next}>
              Continue
            </Button>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h2 className="text-3xl font-black text-brand-ink">Choose an age range</h2>
            <div className="mt-6 grid gap-3">
              {(["4-5", "6-7", "8-10"] as AgeRange[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setAgeRange(value)}
                  className={`rounded-3xl border-2 p-4 text-left font-bold ${
                    ageRange === value ? "border-brand-green bg-brand-green/20" : "border-slate-200"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <Button className="mt-6" onClick={next}>
              Continue
            </Button>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h2 className="text-3xl font-black text-brand-ink">Pick a daily goal</h2>
            <div className="mt-6 grid gap-3">
              {[5, 10, 15].map((value) => (
                <button
                  key={value}
                  onClick={() => setGoalMinutes(value as GoalMinutes)}
                  className={`rounded-3xl border-2 p-4 text-left font-bold ${
                    goalMinutes === value ? "border-brand-gold bg-brand-cream" : "border-slate-200"
                  }`}
                >
                  {value} min per day
                </button>
              ))}
            </div>
            <Button className="mt-6" onClick={next}>
              Continue
            </Button>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h2 className="text-3xl font-black text-brand-ink">Choose language support</h2>
            <div className="mt-6 grid gap-3">
              {[
                { id: "english-amharic", label: "English + Amharic" },
                { id: "amharic-mostly", label: "Amharic mostly" }
              ].map((value) => (
                <button
                  key={value.id}
                  onClick={() => setLanguageMode(value.id as LanguageMode)}
                  className={`rounded-3xl border-2 p-4 text-left font-bold ${
                    languageMode === value.id ? "border-brand-sky bg-brand-sky/20" : "border-slate-200"
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>
            <Button className="mt-6" onClick={next}>
              Continue
            </Button>
          </>
        ) : null}

        {step === 4 ? (
          <div className="text-center">
            <div className="text-6xl">🎈</div>
            <h2 className="mt-4 text-3xl font-black text-brand-ink">You are ready, {name}</h2>
            <p className="mt-2 text-slate-600">
              Your goal is {goalMinutes} minutes a day with {languageMode === "english-amharic" ? "English + Amharic" : "Amharic mostly"} support.
            </p>
            <Button className="mt-6" onClick={finish}>
              Start Unit 1
            </Button>
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}

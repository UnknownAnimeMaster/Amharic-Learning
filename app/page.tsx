import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { copyEn } from "@/data/copy/en";

const homeBlocks = [
  {
    title: "Learn one letter at a time",
    body: "Kids start with core letter shapes before bigger reading challenges."
  },
  {
    title: "Daily review builds memory",
    body: "Short practice helps children remember what they learned yesterday."
  },
  {
    title: "Perfect for families and weekend schools",
    body: "Parents and teachers can sit with the child and see progress clearly."
  }
];

export default function LandingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-amharic">
            Fidel Friends
          </p>
          <h1 className="text-2xl font-black text-brand-ink">{copyEn.subtitle}</h1>
        </div>
        <Link href="/onboarding">
          <Button>Start Learning</Button>
        </Link>
      </header>

      <section className="mt-10 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-brand-cream to-white p-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-amharic">
              <Sparkles className="h-4 w-4" />
              Warm, playful, beginner-friendly
            </div>
            <h2 className="mt-6 text-5xl font-black leading-tight text-brand-ink">
              {copyEn.hero}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              A joyful web app for Ethiopian kids in America to learn Amharic letters with small
              daily steps, tracing, rewards, and reviews.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/onboarding">
                <Button className="gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/home">
                <Button variant="secondary">Try Demo</Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {copyEn.featureCards.map((item, index) => (
                <div key={item} className="rounded-3xl bg-white p-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-cream">
                    {index === 0 ? <BookOpen className="h-5 w-5" /> : index === 1 ? "📅" : <Star className="h-5 w-5" />}
                  </div>
                  <div className="text-sm font-bold text-brand-ink">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-b from-brand-sky/30 to-brand-green/30 p-6 text-center">
          <Image
            src="/mascot.svg"
            alt="Friendly mascot"
            width={240}
            height={240}
            className="mx-auto"
            priority
          />
          <div className="mt-2 text-7xl font-black text-brand-amharic">ሀ ለ ሐ መ</div>
          <p className="mt-3 text-sm text-slate-600">
            Big letters, big buttons, and friendly practice for young learners.
          </p>
        </Card>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {homeBlocks.map((block) => (
          <Card key={block.title}>
            <h3 className="text-xl font-black text-brand-ink">{block.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{block.body}</p>
          </Card>
        ))}
      </section>

      <section className="mt-12">
        <Card className="bg-white">
          <h3 className="text-2xl font-black text-brand-ink">Why this app helps</h3>
          <p className="mt-3 max-w-3xl text-slate-600">
            Children can learn Amharic in short, cheerful sessions with bilingual support, simple
            goals, and repeated tracing practice that matches real early-literacy routines.
          </p>
        </Card>
      </section>
    </main>
  );
}

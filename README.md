# Fidel Friends

Fidel Friends is a kid-friendly prototype web app for learning Amharic letters step by step. It is designed for Ethiopian-born kids in America, families, weekend schools, and beginner learners who may understand English first and need playful, low-pressure Amharic reading practice.

This MVP follows a letter-first approach:
- learn core shapes before full vowel families
- recognize letters
- find letters inside words
- trace letters
- review daily
- earn XP, stars, streaks, and badges

The prototype includes a polished responsive UI, a reusable lesson engine, local curriculum data, and local progress saving with `localStorage`, so it works without a backend.

## Features

- Landing page with child-friendly product-style design
- Onboarding flow with learner profile setup
- Home dashboard with streak, XP, goal progress, and recent letters
- Vertical lesson path with Unit 1 playable and Units 2-3 locked
- Playable lesson engine for:
  - intro cards
  - multiple choice letter selection
  - word finding
  - picture matching
  - tracing activity
  - end-of-lesson celebration
- Daily review page with simple spaced review logic
- Tracing and free-draw practice page
- Rewards page with badges and a 7-day practice tracker
- Parent / teacher summary page
- Settings page with sound, music, language mode, theme, export, and reset

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Clean reusable UI components in a shadcn-style structure
- Framer Motion
- Lucide icons
- Local curriculum data in TypeScript
- `localStorage` for offline-friendly MVP progress tracking

## Who It Is For

- Kids about ages 4 to 10
- Beginner Amharic readers
- English-dominant Ethiopian kids learning Amharic letters
- Parents, teachers, tutors, and weekend schools

## Curriculum Included in MVP

The seeded MVP includes Unit 1:

- ሀ
- ለ
- ሐ
- መ

Playable lessons:
1. Welcome to ሀ
2. Learn ለ
3. Learn ሐ
4. Learn መ
5. Unit Review: ሀ ለ ሐ መ

Units 2 and 3 are included as locked placeholders.

## Project Structure

```text
fidel-friends/
├─ app/
│  ├─ home/
│  ├─ learn/
│  ├─ onboarding/
│  ├─ parent/
│  ├─ rewards/
│  ├─ review/
│  ├─ settings/
│  ├─ tracing/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ activities/
│  ├─ dashboard/
│  ├─ layout/
│  ├─ lesson/
│  └─ ui/
├─ data/
│  ├─ copy/
│  ├─ lessons.ts
│  ├─ letters.ts
│  └─ units.ts
├─ hooks/
├─ lib/
├─ public/
│  └─ mascot.svg
├─ styles/
└─ types/
```

## How to Install

1. Make sure Node.js is installed.
2. Open the project folder in your terminal.
3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## How to Deploy to Vercel

1. Push the project to GitHub.
2. Go to Vercel.
3. Import the repository.
4. Keep the defaults.
5. Deploy.

No paid services or API keys are required for the MVP.

## How to Edit Lesson Data

Most content lives in:
- `data/letters.ts`
- `data/lessons.ts`
- `data/units.ts`
- `data/copy/en.ts`
- `data/copy/am.ts`

You can:
- add new letters
- add more vocabulary
- add more lesson activities
- add new units
- change prompts and child-friendly messages

## How Progress Is Stored

The MVP stores data in the browser using `localStorage`:
- learner profile
- XP
- stars
- streak
- completed lessons
- review history
- weak letters
- known letters
- badges
- 7-day practice checklist

This means it works without accounts or a backend.

## Audio Placeholder Support

The app includes an audio button pattern and a mock audio helper.

Later, you can add real files like:

```text
/public/audio/letters/ha.mp3
/public/audio/words/hager.mp3
```

Then wire them into the audio map in `lib/audio.ts`.

## Future Roadmap

- Real accounts and cloud sync
- Parent login
- Teacher dashboard
- Printable practice sheets
- Full letter families
- Real audio pronunciation library
- Songs and chants
- Mini games
- Classroom mode
- Better tracing scoring
- Progress sync across devices
- Adaptive review scheduling

## Notes

- This project is intentionally beginner-friendly and heavily commented.
- The lesson system is structured so more activity types can be added later.
- The MVP avoids backend complexity so it is easy to learn from and host.

## Quick Start Summary

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

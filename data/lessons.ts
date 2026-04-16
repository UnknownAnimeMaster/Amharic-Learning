import { Lesson } from "@/types";
import { lettersById } from "./letters";

export const lessons: Lesson[] = [
  {
    id: "lesson-ha",
    unitId: "unit-1",
    title: "Welcome to ሀ",
    description: "Meet your first Amharic letter.",
    targetLetters: ["ha"],
    vocabulary: lettersById.ha.exampleWords,
    rewardXp: 15,
    difficulty: "easy",
    estimatedMinutes: 5,
    unlockedByDefault: true,
    activities: [
      {
        id: "ha-intro",
        type: "intro",
        letterId: "ha",
        title: "Meet ሀ",
        body: "Say hello to ሀ. We will look, listen, find, and trace it.",
        examples: lettersById.ha.exampleWords
      },
      {
        id: "ha-choice",
        type: "multiple-choice-letter",
        letterId: "ha",
        prompt: "Tap the letter ሀ",
        choices: ["ሀ", "ለ", "ሐ", "መ"],
        correct: "ሀ",
        successMessage: "Nice job. You found ሀ."
      },
      {
        id: "ha-word-find",
        type: "word-find",
        letterId: "ha",
        instruction: "Tap the words that contain ሀ",
        words: [
          ...lettersById.ha.exampleWords,
          ...lettersById.la.exampleWords.slice(0, 1),
          ...lettersById.ma.exampleWords.slice(0, 1)
        ],
        correctWords: lettersById.ha.exampleWords.map((item) => item.amharic)
      },
      {
        id: "ha-trace",
        type: "trace",
        letterId: "ha",
        guideLetter: "ሀ",
        instruction: "Trace ሀ with your finger or mouse."
      },
      {
        id: "ha-complete",
        type: "lesson-complete",
        title: "You learned ሀ",
        celebrationText: "Amazing start. You finished your first letter lesson."
      }
    ]
  },
  {
    id: "lesson-la",
    unitId: "unit-1",
    title: "Learn ለ",
    description: "Spot and trace ለ in friendly words.",
    targetLetters: ["la"],
    vocabulary: lettersById.la.exampleWords,
    rewardXp: 15,
    difficulty: "easy",
    estimatedMinutes: 5,
    activities: [
      {
        id: "la-intro",
        type: "intro",
        letterId: "la",
        title: "Meet ለ",
        body: "Look at the shape of ለ and practice saying la.",
        examples: lettersById.la.exampleWords
      },
      {
        id: "la-match",
        type: "match-picture",
        letterId: "la",
        pairs: [
          { id: "1", letter: "ለ", emoji: "👕", word: "ለበሰ" },
          { id: "2", letter: "ለ", emoji: "🌿", word: "ለምለም" }
        ]
      },
      {
        id: "la-word-find",
        type: "word-find",
        letterId: "la",
        instruction: "Tap the words with ለ",
        words: [
          ...lettersById.la.exampleWords,
          ...lettersById.ha.exampleWords.slice(0, 1),
          ...lettersById.ha2.exampleWords.slice(0, 1)
        ],
        correctWords: lettersById.la.exampleWords.map((item) => item.amharic)
      },
      {
        id: "la-trace",
        type: "trace",
        letterId: "la",
        guideLetter: "ለ",
        instruction: "Trace ለ slowly and carefully."
      },
      {
        id: "la-complete",
        type: "lesson-complete",
        title: "You learned ለ",
        celebrationText: "Great work. ለ is now one of your letter friends."
      }
    ]
  },
  {
    id: "lesson-ha2",
    unitId: "unit-1",
    title: "Learn ሐ",
    description: "Compare ሐ and ሀ, then trace the new shape.",
    targetLetters: ["ha2"],
    vocabulary: lettersById.ha2.exampleWords,
    rewardXp: 18,
    difficulty: "easy",
    estimatedMinutes: 6,
    activities: [
      {
        id: "ha2-intro",
        type: "intro",
        letterId: "ha2",
        title: "Meet ሐ",
        body: "This letter is ሐ. It is different from ሀ, so we look closely.",
        examples: lettersById.ha2.exampleWords
      },
      {
        id: "ha2-choice",
        type: "multiple-choice-letter",
        letterId: "ha2",
        prompt: "Tap ሐ, not ሀ",
        choices: ["ሀ", "ለ", "ሐ", "መ"],
        correct: "ሐ",
        successMessage: "Yes. That is ሐ."
      },
      {
        id: "ha2-word-find",
        type: "word-find",
        letterId: "ha2",
        instruction: "Tap the words that contain ሐ",
        words: [
          ...lettersById.ha2.exampleWords,
          ...lettersById.ha.exampleWords.slice(0, 1),
          ...lettersById.ma.exampleWords.slice(0, 1)
        ],
        correctWords: lettersById.ha2.exampleWords.map((item) => item.amharic)
      },
      {
        id: "ha2-trace",
        type: "trace",
        letterId: "ha2",
        guideLetter: "ሐ",
        instruction: "Trace ሐ and compare it with ሀ."
      },
      {
        id: "ha2-complete",
        type: "lesson-complete",
        title: "You learned ሐ",
        celebrationText: "Awesome. You noticed the difference and traced it well."
      }
    ]
  },
  {
    id: "lesson-ma",
    unitId: "unit-1",
    title: "Learn መ",
    description: "Recognize and trace the cozy letter መ.",
    targetLetters: ["ma"],
    vocabulary: lettersById.ma.exampleWords,
    rewardXp: 18,
    difficulty: "easy",
    estimatedMinutes: 6,
    activities: [
      {
        id: "ma-intro",
        type: "intro",
        letterId: "ma",
        title: "Meet መ",
        body: "Let us look at መ in words you may see often.",
        examples: lettersById.ma.exampleWords
      },
      {
        id: "ma-choice",
        type: "multiple-choice-letter",
        letterId: "ma",
        prompt: "Tap the letter መ",
        choices: ["መ", "ሀ", "ለ", "ሐ"],
        correct: "መ",
        successMessage: "Great. That is መ."
      },
      {
        id: "ma-word-find",
        type: "word-find",
        letterId: "ma",
        instruction: "Tap the words with መ",
        words: [
          ...lettersById.ma.exampleWords,
          ...lettersById.la.exampleWords.slice(0, 1),
          ...lettersById.ha.exampleWords.slice(0, 1)
        ],
        correctWords: lettersById.ma.exampleWords.map((item) => item.amharic)
      },
      {
        id: "ma-trace",
        type: "trace",
        letterId: "ma",
        guideLetter: "መ",
        instruction: "Trace መ and notice its box-like shape."
      },
      {
        id: "ma-complete",
        type: "lesson-complete",
        title: "You learned መ",
        celebrationText: "You did it. መ is now part of your reading toolkit."
      }
    ]
  },
  {
    id: "lesson-review-1",
    unitId: "unit-1",
    title: "Unit Review: ሀ ለ ሐ መ",
    description: "Review all four letters together.",
    targetLetters: ["ha", "la", "ha2", "ma"],
    vocabulary: [
      ...lettersById.ha.exampleWords,
      ...lettersById.la.exampleWords,
      ...lettersById.ha2.exampleWords,
      ...lettersById.ma.exampleWords
    ],
    rewardXp: 25,
    difficulty: "medium",
    estimatedMinutes: 8,
    activities: [
      {
        id: "review-intro",
        type: "intro",
        title: "Unit Review Time",
        body: "Let us review ሀ, ለ, ሐ, and መ together.",
        examples: [
          lettersById.ha.exampleWords[0],
          lettersById.la.exampleWords[0],
          lettersById.ha2.exampleWords[0],
          lettersById.ma.exampleWords[0]
        ]
      },
      {
        id: "review-choice",
        type: "multiple-choice-letter",
        prompt: "Tap ሐ",
        choices: ["ሀ", "ሐ", "ለ", "መ"],
        correct: "ሐ",
        successMessage: "Nice. You remembered ሐ."
      },
      {
        id: "review-word-find",
        type: "word-find",
        instruction: "Tap the words with መ",
        words: [
          ...lettersById.ma.exampleWords,
          ...lettersById.ha.exampleWords,
          ...lettersById.la.exampleWords
        ],
        correctWords: lettersById.ma.exampleWords.map((item) => item.amharic)
      },
      {
        id: "review-match",
        type: "match-picture",
        pairs: [
          { id: "r1", letter: "ሀ", emoji: "🌍", word: "ሀገር" },
          { id: "r2", letter: "ለ", emoji: "🌿", word: "ለምለም" },
          { id: "r3", letter: "ሐ", emoji: "☀️", word: "ፀሐይ" },
          { id: "r4", letter: "መ", emoji: "📘", word: "መጽሐፍ" }
        ]
      },
      {
        id: "review-complete",
        type: "lesson-complete",
        title: "Unit 1 Complete",
        celebrationText: "Amazing. You reviewed all four letters and earned stars."
      }
    ]
  }
];

export const lessonsById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));

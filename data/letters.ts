import { Letter } from "@/types";

export const letters: Letter[] = [
  {
    id: "ha",
    character: "ሀ",
    transliteration: "Ha",
    soundHint: "sounds like ha",
    order: 1,
    specialName: "ሃሌታው ሀ",
    kidExplanation: "This is ሀ. It is a friendly starting letter that looks tall and open.",
    traceLabel: "Trace ሀ from top to bottom and curve gently.",
    exampleWords: [
      { amharic: "ሀገር", english: "country", transliteration: "hager", emoji: "🌍" },
      { amharic: "ሀበሻ", english: "Habesha", transliteration: "habesha", emoji: "💚" }
    ],
    reviewPrompts: ["Find ሀ", "Tap the word with ሀ", "Trace ሀ"]
  },
  {
    id: "la",
    character: "ለ",
    transliteration: "La",
    soundHint: "sounds like la",
    order: 2,
    kidExplanation: "This is ለ. It looks like a standing line with a friendly arm.",
    traceLabel: "Start at the top, go down, then add the small arm.",
    exampleWords: [
      { amharic: "ለበሰ", english: "wore", transliteration: "lebese", emoji: "👕" },
      { amharic: "ለምለም", english: "green and fresh", transliteration: "lemlem", emoji: "🌿" }
    ],
    reviewPrompts: ["Tap ለ", "Which word has ለ?", "Trace ለ"]
  },
  {
    id: "ha2",
    character: "ሐ",
    transliteration: "Ḥa",
    soundHint: "a deeper ha sound",
    order: 3,
    specialName: "ሐመሩ ሐ",
    kidExplanation: "This is ሐ. It looks different from ሀ, so we slow down and compare them.",
    traceLabel: "Trace the strong sides and middle shape carefully.",
    exampleWords: [
      { amharic: "ሐመር", english: "red clay soil", transliteration: "hamer", emoji: "🟤" },
      { amharic: "ፀሐይ", english: "sun", transliteration: "tsehayi", emoji: "☀️" }
    ],
    reviewPrompts: ["Spot ሐ", "Choose ሐ not ሀ", "Trace ሐ"]
  },
  {
    id: "ma",
    character: "መ",
    transliteration: "Ma",
    soundHint: "sounds like ma",
    order: 4,
    kidExplanation: "This is መ. It is a cozy letter you will see in many words.",
    traceLabel: "Trace the box-like shape and the little opening.",
    exampleWords: [
      { amharic: "መኪና", english: "car", transliteration: "mekina", emoji: "🚗" },
      { amharic: "መጽሐፍ", english: "book", transliteration: "metshaf", emoji: "📘" }
    ],
    reviewPrompts: ["Find መ", "Tap the word with መ", "Trace መ"]
  }
];

export const lettersById = Object.fromEntries(letters.map((letter) => [letter.id, letter]));

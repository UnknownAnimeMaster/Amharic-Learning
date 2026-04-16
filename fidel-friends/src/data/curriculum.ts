// Amharic letters and curriculum data for Unit 1: ሀለሐመ
// This follows the booklet structure where Session 1 begins with grouped letters "ሀለሐመ"

import { Letter, Lesson, Unit, VocabularyWord } from '@/types';

// Base letters for Unit 1
export const unit1Letters: Letter[] = [
  {
    id: 'ha',
    character: 'ሀ',
    name: 'ሀ',
    transliteration: 'ha',
    soundHint: 'Like "h" in "hello"',
    order: 1,
    specialName: 'ሃሌታው ሀ',
    kidExplanation: 'This is the first letter! It makes an "h" sound like when you breathe on a window.',
    exampleWords: [
      { amharic: 'ሀገር', english: 'country', transliteration: 'hager' },
      { amharic: 'ሀበሻ', english: 'wedding', transliteration: 'habesha' },
    ],
  },
  {
    id: 'la',
    character: 'ለ',
    name: 'ለ',
    transliteration: 'le',
    soundHint: 'Like "l" in "love"',
    order: 2,
    kidExplanation: 'This letter makes an "l" sound. Stick your tongue out a little when you say it!',
    exampleWords: [
      { amharic: 'ለበሰ', english: 'wore (clothes)', transliteration: 'lebese' },
      { amharic: 'ለምለም', english: 'fertile/green', transliteration: 'lemlem' },
    ],
  },
  {
    id: 'ha2',
    character: 'ሐ',
    name: 'ሐ',
    transliteration: 'ha',
    soundHint: 'A deeper "h" sound from the throat',
    order: 3,
    specialName: 'ሐመሩ ሐ',
    kidExplanation: 'This is a different "h" sound. It comes from deeper in your throat!',
    exampleWords: [
      { amharic: 'ሐመር', english: 'sickness', transliteration: 'hamer' },
      { amharic: 'ፀሐይ', english: 'sun', transliteration: 'tsehay' },
    ],
  },
  {
    id: 'me',
    character: 'መ',
    name: 'መ',
    transliteration: 'me',
    soundHint: 'Like "m" in "mom"',
    order: 4,
    kidExplanation: 'This letter makes an "m" sound. Close your lips and hum!',
    exampleWords: [
      { amharic: 'መኪና', english: 'car', transliteration: 'mekina' },
      { amharic: 'መጽሐፍ', english: 'book', transliteration: 'metsihaf' },
    ],
  },
];

// Unit 1: ሀለሐመ
export const unit1: Unit = {
  id: 'unit-1',
  title: 'First Letters',
  titleAmharic: 'ሀለሐመ',
  description: 'Learn your first four Amharic letters!',
  order: 1,
  isLocked: false,
  lessons: [], // Will be populated below
};

// Lesson 1: Welcome to ሀ
const lesson1: Lesson = {
  id: 'lesson-1-1',
  unitId: 'unit-1',
  title: 'Meet ሀ',
  titleAmharic: 'ሀ',
  description: 'Learn the first letter ሀ',
  targetLetters: ['ha'],
  order: 1,
  difficulty: 'easy',
  estimatedMinutes: 5,
  rewardXP: 20,
  activities: [
    {
      id: 'l1-a1',
      type: 'intro',
      instruction: "Let's meet the letter ሀ!",
      letterId: 'ha',
      showExampleWords: true,
    },
    {
      id: 'l1-a2',
      type: 'multipleChoice',
      instruction: 'Tap the letter ሀ',
      question: 'Which one is ሀ?',
      correctAnswer: 'ሀ',
      options: ['ሀ', 'ለ', 'ሐ', 'መ'],
    },
    {
      id: 'l1-a3',
      type: 'wordFind',
      instruction: 'Find words with ሀ',
      prompt: 'Tap the words that have ሀ',
      targetLetter: 'ha',
      words: [
        { amharic: 'ሀገር', english: 'country' },
        { amharic: 'መኪና', english: 'car' },
        { amharic: 'ሀበሻ', english: 'wedding' },
        { amharic: 'ለበሰ', english: 'wore' },
      ],
    },
    {
      id: 'l1-a4',
      type: 'traceLetter',
      instruction: 'Trace the letter ሀ',
      letterId: 'ha',
      guideOpacity: 0.3,
      strokeWidth: 8,
    },
    {
      id: 'l1-a5',
      type: 'lessonComplete',
      instruction: 'Great job!',
      xpReward: 20,
      starsEarned: 3,
      celebrationMessage: 'You learned ሀ! Amazing!',
    },
  ],
};

// Lesson 2: Learn ለ
const lesson2: Lesson = {
  id: 'lesson-1-2',
  unitId: 'unit-1',
  title: 'Meet ለ',
  titleAmharic: 'ለ',
  description: 'Learn the letter ለ',
  targetLetters: ['la'],
  order: 2,
  difficulty: 'easy',
  estimatedMinutes: 5,
  rewardXP: 20,
  activities: [
    {
      id: 'l2-a1',
      type: 'intro',
      instruction: "Let's meet the letter ለ!",
      letterId: 'la',
      showExampleWords: true,
    },
    {
      id: 'l2-a2',
      type: 'matchPicture',
      instruction: 'Match the letter to the word',
      pairs: [
        {
          letter: 'ለ',
          word: { amharic: 'ለበሰ', english: 'wore' },
          emoji: '👕',
        },
        {
          letter: 'ለ',
          word: { amharic: 'ለምለም', english: 'green' },
          emoji: '🌿',
        },
      ],
    },
    {
      id: 'l2-a3',
      type: 'wordFind',
      instruction: 'Find words with ለ',
      prompt: 'Tap the words that have ለ',
      targetLetter: 'la',
      words: [
        { amharic: 'ለበሰ', english: 'wore' },
        { amharic: 'ሀገር', english: 'country' },
        { amharic: 'ለምለም', english: 'green' },
        { amharic: 'መኪና', english: 'car' },
      ],
    },
    {
      id: 'l2-a4',
      type: 'traceLetter',
      instruction: 'Trace the letter ለ',
      letterId: 'la',
      guideOpacity: 0.3,
      strokeWidth: 8,
    },
    {
      id: 'l2-a5',
      type: 'lessonComplete',
      instruction: 'Excellent!',
      xpReward: 20,
      starsEarned: 3,
      celebrationMessage: 'You learned ለ! Wonderful!',
    },
  ],
};

// Lesson 3: Learn ሐ
const lesson3: Lesson = {
  id: 'lesson-1-3',
  unitId: 'unit-1',
  title: 'Meet ሐ',
  titleAmharic: 'ሐ',
  description: 'Learn the letter ሐ',
  targetLetters: ['ha2'],
  order: 3,
  difficulty: 'medium',
  estimatedMinutes: 6,
  rewardXP: 25,
  activities: [
    {
      id: 'l3-a1',
      type: 'intro',
      instruction: "Let's meet the letter ሐ!",
      letterId: 'ha2',
      showExampleWords: true,
    },
    {
      id: 'l3-a2',
      type: 'multipleChoice',
      instruction: 'Choose the right letter',
      question: 'Which one is ሐ? (Remember, it looks different from ሀ!)',
      correctAnswer: 'ሐ',
      options: ['ሀ', 'ሐ', 'ለ', 'መ'],
    },
    {
      id: 'l3-a3',
      type: 'wordFind',
      instruction: 'Find words with ሐ',
      prompt: 'Tap the words that have ሐ',
      targetLetter: 'ha2',
      words: [
        { amharic: 'ሐመር', english: 'sickness' },
        { amharic: 'ሀገር', english: 'country' },
        { amharic: 'ፀሐይ', english: 'sun' },
        { amharic: 'መኪና', english: 'car' },
      ],
    },
    {
      id: 'l3-a4',
      type: 'traceLetter',
      instruction: 'Trace the letter ሐ',
      letterId: 'ha2',
      guideOpacity: 0.3,
      strokeWidth: 8,
    },
    {
      id: 'l3-a5',
      type: 'lessonComplete',
      instruction: 'Awesome!',
      xpReward: 25,
      starsEarned: 3,
      celebrationMessage: 'You learned ሐ! You are so smart!',
    },
  ],
};

// Lesson 4: Learn መ
const lesson4: Lesson = {
  id: 'lesson-1-4',
  unitId: 'unit-1',
  title: 'Meet መ',
  titleAmharic: 'መ',
  description: 'Learn the letter መ',
  targetLetters: ['me'],
  order: 4,
  difficulty: 'easy',
  estimatedMinutes: 5,
  rewardXP: 20,
  activities: [
    {
      id: 'l4-a1',
      type: 'intro',
      instruction: "Let's meet the letter መ!",
      letterId: 'me',
      showExampleWords: true,
    },
    {
      id: 'l4-a2',
      type: 'multipleChoice',
      instruction: 'Choose መ',
      question: 'Which one is መ?',
      correctAnswer: 'መ',
      options: ['መ', 'ሀ', 'ለ', 'ሐ'],
    },
    {
      id: 'l4-a3',
      type: 'traceLetter',
      instruction: 'Trace the letter መ',
      letterId: 'me',
      guideOpacity: 0.3,
      strokeWidth: 8,
    },
    {
      id: 'l4-a4',
      type: 'wordFind',
      instruction: 'Find words with መ',
      prompt: 'Tap the words that have መ',
      targetLetter: 'me',
      words: [
        { amharic: 'መኪና', english: 'car' },
        { amharic: 'ሀገር', english: 'country' },
        { amharic: 'መጽሐፍ', english: 'book' },
        { amharic: 'ለበሰ', english: 'wore' },
      ],
    },
    {
      id: 'l4-a5',
      type: 'lessonComplete',
      instruction: 'Perfect!',
      xpReward: 20,
      starsEarned: 3,
      celebrationMessage: 'You learned መ! Fantastic!',
    },
  ],
};

// Lesson 5: Unit Review
const lesson5: Lesson = {
  id: 'lesson-1-5',
  unitId: 'unit-1',
  title: 'Unit Review',
  titleAmharic: 'ግምገማ',
  description: 'Review all four letters: ሀ ለ ሐ መ',
  targetLetters: ['ha', 'la', 'ha2', 'me'],
  order: 5,
  difficulty: 'medium',
  estimatedMinutes: 8,
  rewardXP: 40,
  activities: [
    {
      id: 'l5-a1',
      type: 'multipleChoice',
      instruction: 'Which letter is this?',
      question: 'What letter is this?',
      correctAnswer: 'ሀ',
      options: ['ሀ', 'ለ', 'ሐ', 'መ'],
    },
    {
      id: 'l5-a2',
      type: 'multipleChoice',
      instruction: 'Find the letter',
      question: 'Which one is ሐ?',
      correctAnswer: 'ሐ',
      options: ['መ', 'ለ', 'ሐ', 'ሀ'],
    },
    {
      id: 'l5-a3',
      type: 'wordFind',
      instruction: 'Find all the letters',
      prompt: 'Find words with any of the letters you learned!',
      targetLetter: 'all',
      words: [
        { amharic: 'ሀገር', english: 'country' },
        { amharic: 'ለበሰ', english: 'wore' },
        { amharic: 'ሐመር', english: 'sickness' },
        { amharic: 'መኪና', english: 'car' },
      ],
    },
    {
      id: 'l5-a4',
      type: 'matchPicture',
      instruction: 'Match letters to words',
      pairs: [
        { letter: 'ሀ', word: { amharic: 'ሀገር', english: 'country' }, emoji: '🌍' },
        { letter: 'ለ', word: { amharic: 'ለበሰ', english: 'wore' }, emoji: '👕' },
        { letter: 'ሐ', word: { amharic: 'ፀሐይ', english: 'sun' }, emoji: '☀️' },
        { letter: 'መ', word: { amharic: 'መጽሐፍ', english: 'book' }, emoji: '📚' },
      ],
    },
    {
      id: 'l5-a5',
      type: 'lessonComplete',
      instruction: 'AMAZING!',
      xpReward: 40,
      starsEarned: 3,
      celebrationMessage: 'You completed Unit 1! You know ሀ ለ ሐ መ! Super star!',
    },
  ],
};

// Populate unit lessons
unit1.lessons = [lesson1, lesson2, lesson3, lesson4, lesson5];

// Placeholder units for future content
export const unit2: Unit = {
  id: 'unit-2',
  title: 'Next Letters',
  titleAmharic: 'ሠረሰሸ',
  description: 'Learn more Amharic letters!',
  order: 2,
  isLocked: true,
  lessons: [],
};

export const unit3: Unit = {
  id: 'unit-3',
  title: 'More Letters',
  titleAmharic: 'ቀበቨተቸ',
  description: 'Continue your learning journey!',
  order: 3,
  isLocked: true,
  lessons: [],
};

// Export all units
export const units: Unit[] = [unit1, unit2, unit3];

// Helper function to get a letter by ID
export const getLetterById = (id: string): Letter | undefined => {
  return unit1Letters.find((l) => l.id === id);
};

// Helper function to get all letters
export const getAllLetters = (): Letter[] => {
  return unit1Letters;
};

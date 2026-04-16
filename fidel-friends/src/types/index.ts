// TypeScript type definitions for Fidel Friends app

/**
 * Represents a single Amharic letter (Fidel character)
 */
export interface Letter {
  id: string;
  character: string; // The actual Amharic character
  name: string; // Name of the letter in Amharic
  transliteration: string; // Romanized pronunciation
  soundHint: string; // English sound description
  order: number; // Position in alphabet
  exampleWords: VocabularyWord[];
  kidExplanation: string; // Child-friendly explanation
  specialName?: string; // Special descriptive name like "ሃሌታው ሀ"
}

/**
 * A vocabulary word with Amharic and English
 */
export interface VocabularyWord {
  amharic: string;
  english: string;
  transliteration?: string;
}

/**
 * Base activity interface - all activity types extend this
 */
export interface BaseActivity {
  id: string;
  type: ActivityType;
  instruction: string;
  instructionAmharic?: string;
}

export type ActivityType =
  | 'intro'
  | 'multipleChoice'
  | 'wordFind'
  | 'matchPicture'
  | 'traceLetter'
  | 'lessonComplete';

/**
 * Intro card activity - shows a new letter
 */
export interface IntroCardActivity extends BaseActivity {
  type: 'intro';
  letterId: string;
  showExampleWords: boolean;
}

/**
 * Multiple choice activity - pick the correct letter
 */
export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multipleChoice';
  question: string;
  correctAnswer: string; // Letter ID or character
  options: string[]; // Array of letter IDs or characters
  audioPrompt?: string; // Optional audio file path
}

/**
 * Word find activity - find letter in words
 */
export interface WordFindActivity extends BaseActivity {
  type: 'wordFind';
  targetLetter: string; // Letter to find
  words: VocabularyWord[];
  prompt: string;
}

/**
 * Match picture activity - match letter to picture/word
 */
export interface MatchPictureActivity extends BaseActivity {
  type: 'matchPicture';
  pairs: {
    letter: string;
    word: VocabularyWord;
    emoji?: string; // Placeholder for image
  }[];
}

/**
 * Tracing activity - practice writing the letter
 */
export interface TraceLetterActivity extends BaseActivity {
  type: 'traceLetter';
  letterId: string;
  guideOpacity?: number;
  strokeWidth?: number;
}

/**
 * Lesson completion celebration
 */
export interface LessonCompleteActivity extends BaseActivity {
  type: 'lessonComplete';
  xpReward: number;
  starsEarned: number;
  celebrationMessage: string;
}

/**
 * Union type for all activity types
 */
export type Activity =
  | IntroCardActivity
  | MultipleChoiceActivity
  | WordFindActivity
  | MatchPictureActivity
  | TraceLetterActivity
  | LessonCompleteActivity;

/**
 * A lesson containing multiple activities
 */
export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  titleAmharic?: string;
  description: string;
  targetLetters: string[]; // Letter IDs
  activities: Activity[];
  rewardXP: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  order: number;
}

/**
 * A unit containing multiple lessons
 */
export interface Unit {
  id: string;
  title: string;
  titleAmharic: string;
  description: string;
  lessons: Lesson[];
  order: number;
  isLocked?: boolean;
}

/**
 * User profile stored in localStorage
 */
export interface LearnerProfile {
  id: string;
  name: string;
  ageRange: '4-6' | '7-8' | '9-10';
  learningGoal: '5min' | '10min' | '15min';
  languageMode: 'english-first' | 'amharic-first';
  createdAt: string;
  lastActiveAt: string;
}

/**
 * Progress tracking for lessons
 */
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  starsEarned: number;
  xpEarned: number;
  attempts: number;
}

/**
 * Spaced repetition data for letters
 */
export interface LetterReviewData {
  letterId: string;
  timesPracticed: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  strengthLevel: number; // 0-5, higher = better known
  incorrectCount: number;
}

/**
 * Badge/Achievement system
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

/**
 * 7-Day practice tracker for each letter
 */
export interface SevenDayPractice {
  letterId: string;
  startDate: string;
  daysCompleted: boolean[]; // Array of 7 booleans
  completed: boolean;
}

/**
 * Main progress state stored in localStorage
 */
export interface ProgressState {
  profile: LearnerProfile | null;
  completedLessons: Record<string, LessonProgress>;
  letterReviews: Record<string, LetterReviewData>;
  badges: Badge[];
  sevenDayPractices: Record<string, SevenDayPractice>;
  totalXP: number;
  totalStars: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  dailyGoalProgress: number; // Minutes practiced today
  settings: UserSettings;
}

/**
 * User settings
 */
export interface UserSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
  theme: 'light' | 'dark' | 'system';
}

/**
 * Daily review question
 */
export interface DailyReviewQuestion {
  id: string;
  type: 'recognize' | 'match' | 'find' | 'choice';
  letterId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
}

/**
 * Default/empty progress state
 */
export const createEmptyProgressState = (): ProgressState => ({
  profile: null,
  completedLessons: {},
  letterReviews: {},
  badges: [],
  sevenDayPractices: {},
  totalXP: 0,
  totalStars: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  dailyGoalProgress: 0,
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    reducedMotion: false,
    theme: 'light',
  },
});

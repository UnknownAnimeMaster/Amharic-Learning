export type LanguageMode = "english-amharic" | "amharic-mostly";
export type GoalMinutes = 5 | 10 | 15;
export type AgeRange = "4-5" | "6-7" | "8-10";

export interface LearnerProfile {
  name: string;
  ageRange: AgeRange;
  goalMinutes: GoalMinutes;
  languageMode: LanguageMode;
  soundOn: boolean;
  musicOn: boolean;
  theme: "light" | "dark";
  createdAt: string;
}

export interface VocabularyWord {
  amharic: string;
  english: string;
  transliteration?: string;
  emoji?: string;
  audioKey?: string;
}

export interface Letter {
  id: string;
  character: string;
  transliteration: string;
  soundHint: string;
  order: number;
  specialName?: string;
  kidExplanation: string;
  traceLabel: string;
  exampleWords: VocabularyWord[];
  reviewPrompts: string[];
}

export type ActivityType =
  | "intro"
  | "multiple-choice-letter"
  | "word-find"
  | "match-picture"
  | "trace"
  | "lesson-complete";

export interface BaseActivity {
  id: string;
  type: ActivityType;
  prompt?: string;
  letterId?: string;
}

export interface IntroCardActivity extends BaseActivity {
  type: "intro";
  title: string;
  body: string;
  examples: VocabularyWord[];
}

export interface MultipleChoiceLetterActivity extends BaseActivity {
  type: "multiple-choice-letter";
  choices: string[];
  correct: string;
  successMessage: string;
}

export interface WordFindActivity extends BaseActivity {
  type: "word-find";
  words: VocabularyWord[];
  correctWords: string[];
  instruction: string;
}

export interface MatchPictureActivity extends BaseActivity {
  type: "match-picture";
  pairs: {
    id: string;
    letter: string;
    emoji: string;
    word: string;
  }[];
}

export interface TraceLetterActivity extends BaseActivity {
  type: "trace";
  guideLetter: string;
  instruction: string;
}

export interface LessonCompleteActivity extends BaseActivity {
  type: "lesson-complete";
  title: string;
  celebrationText: string;
}

export type Activity =
  | IntroCardActivity
  | MultipleChoiceLetterActivity
  | WordFindActivity
  | MatchPictureActivity
  | TraceLetterActivity
  | LessonCompleteActivity;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  targetLetters: string[];
  vocabulary: VocabularyWord[];
  activities: Activity[];
  rewardXp: number;
  difficulty: "easy" | "medium";
  estimatedMinutes: number;
  unlockedByDefault?: boolean;
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  lessonIds: string[];
  status: "current" | "locked" | "completed";
  themeColor: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface ProgressState {
  xp: number;
  starsByLesson: Record<string, number>;
  completedLessons: string[];
  knownLetters: string[];
  weakLetters: Record<string, number>;
  reviewHistory: string[];
  lessonAttempts: Record<string, number>;
  currentStreak: number;
  lastActiveDate?: string;
  badges: string[];
  dailyGoalProgress: number;
  sevenDayPractice: Record<string, boolean[]>;
}

export interface DailyReviewQuestion {
  id: string;
  type: "recognize" | "word" | "missing" | "tap-all";
  prompt: string;
  choices: string[];
  correctAnswers: string[];
  letterId: string;
}

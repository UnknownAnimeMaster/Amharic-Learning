import { LearnerProfile, ProgressState } from "@/types";
import { todayKey } from "./utils";

export const STORAGE_KEYS = {
  profile: "fidel-friends.profile",
  progress: "fidel-friends.progress"
};

export const defaultProfile: LearnerProfile = {
  name: "Friend",
  ageRange: "6-7",
  goalMinutes: 5,
  languageMode: "english-amharic",
  soundOn: true,
  musicOn: false,
  theme: "light",
  createdAt: new Date().toISOString()
};

export const defaultProgress: ProgressState = {
  xp: 0,
  starsByLesson: {},
  completedLessons: [],
  knownLetters: [],
  weakLetters: {},
  reviewHistory: [],
  lessonAttempts: {},
  currentStreak: 0,
  lastActiveDate: undefined,
  badges: [],
  dailyGoalProgress: 0,
  sevenDayPractice: {}
};

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile() {
  return safeRead(STORAGE_KEYS.profile, defaultProfile);
}

export function saveProfile(profile: LearnerProfile) {
  safeWrite(STORAGE_KEYS.profile, profile);
}

export function getProgress() {
  return safeRead(STORAGE_KEYS.progress, defaultProgress);
}

export function saveProgress(progress: ProgressState) {
  safeWrite(STORAGE_KEYS.progress, progress);
}

export function resetAllProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.profile);
  window.localStorage.removeItem(STORAGE_KEYS.progress);
}

export function touchActiveDay(progress: ProgressState): ProgressState {
  const today = todayKey();
  const previous = progress.lastActiveDate;

  if (previous === today) return progress;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = todayKey(yesterday);

  const nextStreak =
    !previous ? 1 : previous === yesterdayKey ? progress.currentStreak + 1 : 1;

  return {
    ...progress,
    currentStreak: nextStreak,
    lastActiveDate: today
  };
}

export function exportProgressBlob() {
  const profile = getProfile();
  const progress = getProgress();
  const payload = {
    exportedAt: new Date().toISOString(),
    profile,
    progress
  };
  return new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
}

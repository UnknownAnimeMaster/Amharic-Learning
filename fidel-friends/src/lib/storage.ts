// localStorage utility for persisting user progress
// This allows the app to work without a backend

import { ProgressState, createEmptyProgressState, LearnerProfile } from '@/types';

const STORAGE_KEY = 'fidel-friends-progress';

/**
 * Get progress state from localStorage
 */
export const getProgressState = (): ProgressState => {
  if (typeof window === 'undefined') {
    return createEmptyProgressState();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createEmptyProgressState();
    }
    return JSON.parse(stored) as ProgressState;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return createEmptyProgressState();
  }
};

/**
 * Save progress state to localStorage
 */
export const saveProgressState = (state: ProgressState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Update profile in progress state
 */
export const updateProfile = (profile: LearnerProfile): ProgressState => {
  const state = getProgressState();
  state.profile = profile;
  state.lastActiveDate = new Date().toISOString().split('T')[0];
  saveProgressState(state);
  return state;
};

/**
 * Mark a lesson as completed
 */
export const completeLesson = (
  lessonId: string,
  xpEarned: number,
  starsEarned: number
): ProgressState => {
  const state = getProgressState();

  // Check if already completed
  const existing = state.completedLessons[lessonId];

  state.completedLessons[lessonId] = {
    lessonId,
    completed: true,
    completedAt: new Date().toISOString(),
    starsEarned: Math.max(existing?.starsEarned || 0, starsEarned),
    xpEarned: xpEarned,
    attempts: (existing?.attempts || 0) + 1,
  };

  // Update totals
  if (!existing) {
    state.totalXP += xpEarned;
    state.totalStars += starsEarned;
  } else {
    // If replayed with more stars, add the difference
    const starDiff = starsEarned - (existing.starsEarned || 0);
    if (starDiff > 0) {
      state.totalStars += starDiff;
    }
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  if (state.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (state.lastActiveDate === yesterday) {
      state.currentStreak += 1;
    } else if (state.lastActiveDate !== today) {
      state.currentStreak = 1;
    }
    state.longestStreak = Math.max(state.longestStreak, state.currentStreak);
    state.lastActiveDate = today;
    state.dailyGoalProgress = 0;
  }

  saveProgressState(state);
  return state;
};

/**
 * Update letter review data (for spaced repetition)
 */
export const updateLetterReview = (
  letterId: string,
  isCorrect: boolean
): ProgressState => {
  const state = getProgressState();

  const existing = state.letterReviews[letterId] || {
    letterId,
    timesPracticed: 0,
    strengthLevel: 0,
    incorrectCount: 0,
  };

  state.letterReviews[letterId] = {
    ...existing,
    timesPracticed: existing.timesPracticed + 1,
    lastReviewedAt: new Date().toISOString(),
    strengthLevel: isCorrect
      ? Math.min(5, existing.strengthLevel + 1)
      : Math.max(0, existing.strengthLevel - 1),
    incorrectCount: isCorrect ? existing.incorrectCount : existing.incorrectCount + 1,
    nextReviewAt: isCorrect
      ? new Date(Date.now() + 86400000 * (existing.strengthLevel + 1)).toISOString()
      : new Date(Date.now() + 3600000).toISOString(), // 1 hour if wrong
  };

  saveProgressState(state);
  return state;
};

/**
 * Mark a day as complete in 7-day practice
 */
export const markPracticeDay = (
  letterId: string,
  dayIndex: number
): ProgressState => {
  const state = getProgressState();

  const existing = state.sevenDayPractices[letterId];

  if (!existing) {
    state.sevenDayPractices[letterId] = {
      letterId,
      startDate: new Date().toISOString(),
      daysCompleted: Array(7).fill(false),
      completed: false,
    };
  }

  state.sevenDayPractices[letterId].daysCompleted[dayIndex] = true;

  // Check if all 7 days are complete
  const allComplete = state.sevenDayPractices[letterId].daysCompleted.every(
    (d) => d
  );
  state.sevenDayPractices[letterId].completed = allComplete;

  saveProgressState(state);
  return state;
};

/**
 * Unlock a badge
 */
export const unlockBadge = (badgeId: string): ProgressState => {
  const state = getProgressState();

  const badge = state.badges.find((b) => b.id === badgeId);
  if (badge && !badge.unlocked) {
    badge.unlocked = true;
    badge.unlockedAt = new Date().toISOString();
    saveProgressState(state);
  }

  return state;
};

/**
 * Check and unlock badges based on progress
 */
export const checkBadges = (): ProgressState => {
  const state = getProgressState();

  const defaultBadges = [
    { id: 'first-lesson', name: 'First Lesson', description: 'Complete your first lesson', icon: '🎉' },
    { id: 'three-day-streak', name: '3 Day Streak', description: 'Practice for 3 days in a row', icon: '🔥' },
    { id: 'letter-finder', name: 'Letter Finder', description: 'Learn 4 letters', icon: '⭐' },
    { id: 'tracing-star', name: 'Tracing Star', description: 'Complete 5 tracing activities', icon: '✏️' },
  ];

  // Initialize badges if empty
  if (state.badges.length === 0) {
    state.badges = defaultBadges.map((b) => ({ ...b, unlocked: false }));
  }

  // Check first lesson
  const lessonCount = Object.keys(state.completedLessons).length;
  if (lessonCount >= 1) {
    const badge = state.badges.find((b) => b.id === 'first-lesson');
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toISOString();
    }
  }

  // Check 3 day streak
  if (state.currentStreak >= 3) {
    const badge = state.badges.find((b) => b.id === 'three-day-streak');
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toISOString();
    }
  }

  // Check letters learned (count unique letters from completed lessons)
  const learnedLetters = new Set<string>();
  Object.values(state.completedLessons).forEach((progress) => {
    // In a real app, we'd look up the lesson to get target letters
    // For now, just count lessons as proxy
  });
  if (lessonCount >= 4) {
    const badge = state.badges.find((b) => b.id === 'letter-finder');
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toISOString();
    }
  }

  saveProgressState(state);
  return state;
};

/**
 * Reset all progress
 */
export const resetProgress = (): ProgressState => {
  const state = createEmptyProgressState();
  saveProgressState(state);
  return state;
};

/**
 * Export progress as JSON string
 */
export const exportProgress = (): string => {
  const state = getProgressState();
  return JSON.stringify(state, null, 2);
};

/**
 * Import progress from JSON string
 */
export const importProgress = (jsonString: string): ProgressState => {
  try {
    const state = JSON.parse(jsonString) as ProgressState;
    saveProgressState(state);
    return state;
  } catch (error) {
    console.error('Error importing progress:', error);
    return getProgressState();
  }
};

// Custom hook for managing progress state
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProgressState, createEmptyProgressState } from '@/types';
import { getProgressState, saveProgressState } from '@/lib/storage';

/**
 * Hook to manage global progress state
 */
export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(createEmptyProgressState());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = getProgressState();
    setProgress(stored);
    setIsLoaded(true);
  }, []);

  // Save progress whenever it changes
  const updateProgress = useCallback((newState: ProgressState) => {
    setProgress(newState);
    saveProgressState(newState);
  }, []);

  return {
    progress,
    isLoaded,
    updateProgress,
  };
};

/**
 * Hook for lesson player state management
 */
export const useLessonPlayer = (lessonId: string) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const goToNext = useCallback(() => {
    setCurrentActivityIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowFeedback(null);
  }, []);

  const goToBack = useCallback(() => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex((prev) => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(null);
    }
  }, [currentActivityIndex]);

  const checkAnswer = useCallback((answer: string, correctAnswer: string) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }
  }, []);

  const resetLesson = useCallback(() => {
    setCurrentActivityIndex(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setShowFeedback(null);
  }, []);

  return {
    currentActivityIndex,
    isComplete,
    selectedAnswer,
    showFeedback,
    goToNext,
    goToBack,
    checkAnswer,
    resetLesson,
    setIsComplete,
  };
};

/**
 * Hook for streak tracking
 */
export const useStreak = () => {
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

  useEffect(() => {
    const state = getProgressState();
    setStreak(state.currentStreak);
    setLastActiveDate(state.lastActiveDate);
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = streak;
    if (lastActiveDate !== today) {
      if (lastActiveDate === yesterday) {
        newStreak += 1;
      } else if (lastActiveDate !== today) {
        newStreak = 1;
      }
    }

    setStreak(newStreak);
    setLastActiveDate(today);

    const state = getProgressState();
    state.currentStreak = newStreak;
    state.lastActiveDate = today;
    saveProgressState(state);
  }, [streak, lastActiveDate]);

  return { streak, lastActiveDate, updateStreak };
};

/**
 * Hook for 7-day practice tracking
 */
export const useSevenDayPractice = (letterId: string) => {
  const [practiceData, setPracticeData] = useState<{
    daysCompleted: boolean[];
    completed: boolean;
  }>({ daysCompleted: Array(7).fill(false), completed: false });

  useEffect(() => {
    const state = getProgressState();
    const existing = state.sevenDayPractices[letterId];
    if (existing) {
      setPracticeData({
        daysCompleted: existing.daysCompleted,
        completed: existing.completed,
      });
    }
  }, [letterId]);

  const markDay = useCallback((dayIndex: number) => {
    const state = getProgressState();
    
    if (!state.sevenDayPractices[letterId]) {
      state.sevenDayPractices[letterId] = {
        letterId,
        startDate: new Date().toISOString(),
        daysCompleted: Array(7).fill(false),
        completed: false,
      };
    }

    state.sevenDayPractices[letterId].daysCompleted[dayIndex] = true;
    const allComplete = state.sevenDayPractices[letterId].daysCompleted.every(d => d);
    state.sevenDayPractices[letterId].completed = allComplete;

    saveProgressState(state);
    setPracticeData({
      daysCompleted: [...state.sevenDayPractices[letterId].daysCompleted],
      completed: allComplete,
    });
  }, [letterId]);

  return { practiceData, markDay };
};

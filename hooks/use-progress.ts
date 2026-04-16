"use client";

import { useEffect, useMemo, useState } from "react";
import { getProgress, saveProgress, touchActiveDay } from "@/lib/storage";
import { lettersById } from "@/data/letters";
import { lessonsById } from "@/data/lessons";
import { ProgressState } from "@/types";

const badgeRules = {
  "first-lesson": (progress: ProgressState) => progress.completedLessons.length >= 1,
  "three-day-streak": (progress: ProgressState) => progress.currentStreak >= 3,
  "letter-finder": (progress: ProgressState) => progress.knownLetters.length >= 3,
  "tracing-star": (progress: ProgressState) =>
    Object.values(progress.lessonAttempts).reduce((sum, value) => sum + value, 0) >= 4
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  function updateProgress(updater: (current: ProgressState) => ProgressState) {
    setProgress((current) => {
      const next = touchActiveDay(updater(current));
      const nextBadges = Object.entries(badgeRules)
        .filter(([id, rule]) => rule(next) && !next.badges.includes(id))
        .map(([id]) => id);

      const finalState = nextBadges.length
        ? { ...next, badges: [...next.badges, ...nextBadges] }
        : next;

      saveProgress(finalState);
      return finalState;
    });
  }

  function completeLesson(lessonId: string, starCount: number) {
    const lesson = lessonsById[lessonId];
    if (!lesson) return;

    updateProgress((current) => {
      const known = Array.from(new Set([...current.knownLetters, ...lesson.targetLetters]));
      const currentStars = current.starsByLesson[lessonId] ?? 0;
      const sevenDay = { ...current.sevenDayPractice };

      lesson.targetLetters.forEach((letterId) => {
        if (!sevenDay[letterId]) {
          sevenDay[letterId] = [true, false, false, false, false, false, false];
        }
      });

      return {
        ...current,
        xp: current.xp + lesson.rewardXp,
        completedLessons: Array.from(new Set([...current.completedLessons, lessonId])),
        starsByLesson: {
          ...current.starsByLesson,
          [lessonId]: Math.max(currentStars, starCount)
        },
        knownLetters: known,
        dailyGoalProgress: Math.min(current.dailyGoalProgress + lesson.estimatedMinutes, 15),
        lessonAttempts: {
          ...current.lessonAttempts,
          [lessonId]: (current.lessonAttempts[lessonId] ?? 0) + 1
        },
        sevenDayPractice: sevenDay
      };
    });
  }

  function logReview(letterId: string, correct: boolean) {
    updateProgress((current) => ({
      ...current,
      reviewHistory: [...current.reviewHistory, new Date().toISOString()],
      weakLetters: {
        ...current.weakLetters,
        [letterId]: correct
          ? Math.max((current.weakLetters[letterId] ?? 0) - 1, 0)
          : (current.weakLetters[letterId] ?? 0) + 2
      }
    }));
  }

  function togglePracticeDay(letterId: string, dayIndex: number) {
    updateProgress((current) => {
      const existing = current.sevenDayPractice[letterId] ?? [
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];

      const updated = [...existing];
      updated[dayIndex] = !updated[dayIndex];

      return {
        ...current,
        sevenDayPractice: {
          ...current.sevenDayPractice,
          [letterId]: updated
        }
      };
    });
  }

  const stats = useMemo(() => {
    const lessonCount = progress.completedLessons.length;
    const totalStars = Object.values(progress.starsByLesson).reduce((sum, value) => sum + value, 0);
    const lettersLearned = progress.knownLetters.map((id) => lettersById[id]).filter(Boolean);

    return {
      lessonCount,
      totalStars,
      lettersLearned
    };
  }, [progress]);

  return {
    progress,
    stats,
    completeLesson,
    logReview,
    togglePracticeDay,
    setProgress
  };
}

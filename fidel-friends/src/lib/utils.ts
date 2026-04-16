// Utility functions

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Get random encouraging message
 */
export const getEncouragement = (): string => {
  const messages = [
    'Great job!',
    "You're doing amazing!",
    'Keep it up!',
    'Super star!',
    'Wonderful work!',
    'Awesome!',
    'Fantastic!',
    'Excellent!',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
};

/**
 * Shuffle array randomly
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Get days between two dates
 */
export const getDaysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((date2.getTime() - date1.getTime()) / oneDay);
};

/**
 * Play sound effect (placeholder for future audio implementation)
 */
export const playSound = (soundType: 'correct' | 'incorrect' | 'click' | 'celebration'): void => {
  // Placeholder - in future versions, this will play actual audio files
  // For now, just log to console
  console.log(`Playing sound: ${soundType}`);
  
  // Future implementation example:
  // const audio = new Audio(`/audio/${soundType}.mp3`);
  // audio.play().catch(err => console.error('Audio play failed:', err));
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

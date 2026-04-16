// Streak badge component
'use client';

import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export const StreakBadge = ({ streak, className }: StreakBadgeProps) => {
  return (
    <div className={cn('inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold', className)}>
      <Flame className="w-5 h-5" />
      <span>{streak}</span>
      <span>day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
};

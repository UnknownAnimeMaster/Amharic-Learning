// XP badge component
'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPBadgeProps {
  xp: number;
  className?: string;
}

export const XPBadge = ({ xp, className }: XPBadgeProps) => {
  return (
    <div className={cn('inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold', className)}>
      <Star className="w-5 h-5 fill-yellow-500" />
      <span>{xp} XP</span>
    </div>
  );
};

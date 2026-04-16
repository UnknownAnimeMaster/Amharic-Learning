// Progress bar component
'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  color?: 'primary' | 'green' | 'blue';
}

export const ProgressBar = ({ progress, className, showLabel = true, color = 'primary' }: ProgressBarProps) => {
  const colors = {
    primary: 'from-primary-400 to-primary-500',
    green: 'from-green-400 to-green-500',
    blue: 'from-blue-400 to-blue-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
      )}
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full bg-gradient-to-r transition-all duration-500 ease-out',
            colors[color]
          )}
          style={{ width: `${Math.min(100, Math.round(progress))}%` }}
        />
      </div>
    </div>
  );
};

// Card component for activities and content
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'activity' | 'reward';
}

export const Card = ({ children, className, variant = 'default' }: CardProps) => {
  const variants = {
    default: 'bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100',
    activity: 'bg-white rounded-3xl shadow-xl p-6 md:p-8 border-4 border-primary-200',
    reward: 'bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl p-6 border-4 border-yellow-300',
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
};

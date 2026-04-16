// Button component - child-friendly large tap targets
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', children, ...props }, ref) => {
    const baseStyles = 'font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
    
    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white',
      secondary: 'bg-accent-blue hover:bg-blue-600 text-white',
      success: 'bg-accent-green hover:bg-green-600 text-white',
      danger: 'bg-accent-red hover:bg-red-600 text-white',
      outline: 'border-4 border-primary-500 text-primary-500 hover:bg-primary-50',
    };

    const sizes = {
      sm: 'py-2 px-4 text-sm',
      md: 'py-3 px-6 text-base',
      lg: 'py-4 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

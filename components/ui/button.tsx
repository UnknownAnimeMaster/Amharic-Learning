import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-gold text-brand-ink hover:translate-y-[-1px]",
      secondary: "bg-white text-brand-ink border border-slate-200 hover:bg-slate-50",
      ghost: "bg-transparent text-brand-ink hover:bg-white/50",
      success: "bg-brand-green text-brand-ink hover:translate-y-[-1px]",
      danger: "bg-brand-red text-brand-ink hover:translate-y-[-1px]"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-sky disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-4xl border border-white/50 bg-white/90 p-5 shadow-float backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

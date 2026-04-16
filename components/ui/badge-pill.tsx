import { cn } from "@/lib/utils";

export function BadgePill({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-cream px-3 py-1 text-xs font-bold text-brand-ink",
        className
      )}
    >
      {children}
    </span>
  );
}

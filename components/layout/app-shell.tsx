"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, RefreshCw, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/review", label: "Review", icon: RefreshCw },
  { href: "/rewards", label: "Rewards", icon: Trophy },
  { href: "/parent", label: "Parent", icon: Users }
];

export function AppShell({
  title,
  children,
  action
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-amharic">
            Fidel Friends
          </p>
          <h1 className="text-3xl font-black text-brand-ink">{title}</h1>
        </div>
        <div>{action}</div>
      </header>

      <main>{children}</main>

      <nav className="fixed inset-x-0 bottom-4 mx-auto flex max-w-2xl justify-between rounded-full border border-white/60 bg-white/90 px-2 py-2 shadow-float backdrop-blur">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/home" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-[72px] flex-col items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition",
                active ? "bg-brand-cream text-brand-amharic" : "text-slate-500 hover:text-brand-ink"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

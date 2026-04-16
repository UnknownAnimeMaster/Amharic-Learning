import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/layout/theme-script";

export const metadata: Metadata = {
  title: "Fidel Friends",
  description: "A fun way for kids to learn Amharic letters every day."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}

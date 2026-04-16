import type { Metadata } from 'next';
import { Inter, Noto_Sans_Ethiopic } from 'next/font/google';
import './globals.css';

// Load fonts for English and Amharic text
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansEthiopic = Noto_Sans_Ethiopic({ 
  weight: ['400', '700', '900'],
  subsets: ['ethiopic'],
  variable: '--font-noto-sans-ethiopic',
});

export const metadata: Metadata = {
  title: 'Fidel Friends - Learn Amharic Letters',
  description: 'A fun way for kids to learn Amharic letters step by step',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSansEthiopic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

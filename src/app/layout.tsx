import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Providers from "@/components/common/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Warm serif used for headings — the "textbook" voice.
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concept Visuals",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow users to zoom for accessibility.
  maximumScale: 5,
};

// Set the saved theme on <html> before first paint so there's no flash of the
// wrong theme on load. Mirrors getThemePreference() in components/common/settings.ts.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('pcv:theme');document.documentElement.dataset.theme=(t==='terminal')?'terminal':'academic';}catch(e){document.documentElement.dataset.theme='academic';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

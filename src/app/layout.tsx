import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import Providers from "@/components/common/Providers";
import { THEME_COOKIE, normalizeTheme } from "@/components/common/themeConfig";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve the theme server-side from the cookie so the SSR markup already
  // carries the right theme — no flash of the wrong theme on load.
  const cookieStore = await cookies();
  const initialTheme = normalizeTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <html lang="en" data-theme={initialTheme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <Providers initialTheme={initialTheme}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}

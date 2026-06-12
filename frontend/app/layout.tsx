import type { Metadata } from "next";

import {
  Newsreader,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Evidence Intelligence Platform",
  description:
    "Investigative Document Intelligence System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${newsreader.variable}
          ${jetbrainsMono.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
import { MiniPlayer } from "@/components/MiniPlayer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Player Demo",
  description: "Demo of a persistent mini player with Next.js and Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
          <Link href="/" className="font-bold hover:underline">
            Home
          </Link>
          <Link href="/about" className="font-bold hover:underline">
            About
          </Link>
        </nav>
        {children}
        <MiniPlayer />
      </body>
    </html>
  );
}

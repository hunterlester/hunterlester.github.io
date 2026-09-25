import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Guilford Hunter Lester Benevedes | Software Engineer",
  description:
    "Full-stack product engineer exploring software, AI, and human-centered systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
    <body>
  <header className="site-header">
    <div className="site-header-inner">
      <a className="site-name" href="/">
        Guilford Hunter Lester Benevedes
      </a>

      <nav className="site-nav">
        <a href="/#work">Work</a>
        <a href="/haf">HAF</a>
      </nav>
    </div>
  </header>

  {children}
  </body>
    </html>
  );
}

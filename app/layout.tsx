import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGenAI – Prompt Library",
  description: "Browse, copy, and share the best AI prompts curated for creators, developers, and marketers.",
  keywords: ["AI", "Prompts", "ChatGPT", "Midjourney", "Prompt Engineering"],
  authors: [{ name: "NextGenAI Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenai.zhust.me'),
  openGraph: {
    title: "NextGenAI – Prompt Library",
    description: "Browse, copy, and share the best AI prompts curated for creators, developers, and marketers.",
    url: "/",
    siteName: "NextGenAI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextGenAI Prompt Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGenAI – Prompt Library",
    description: "Discover the best AI Prompt Gems.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Navbar />

        {/* Page content offset for fixed nav */}
        <div style={{ paddingTop: 64, flex: 1 }}>
          <main>
            {children}
          </main>
        </div>

        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(14,14,31,0.95)',
              border: '1px solid rgba(139,92,246,0.3)',
              color: '#f0f0ff',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
      </body>
    </html>
  );
}

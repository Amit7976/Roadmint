import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export const metadata: Metadata = {
  title: "Roadmint — Free AI-Powered Learning Roadmaps",
  description:
    "Instantly generate personalized, day-wise learning roadmaps for any topic. No sign-up required. Free forever. Export progress, track completion, and learn smarter!",
  keywords: [
    "roadmap generator",
    "AI learning roadmap",
    "personalized roadmap",
    "learning tracker",
    "study planner",
    "progress tracker",
    "web development roadmap",
    "free learning tool",
    "daily learning steps",
    "education roadmap",
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  authors: [{ name: "Roadmint Team", url: "https://roadmap-999.vercel.app" }],
  creator: "Amit | Roadmint",
  metadataBase: new URL("https://roadmap-999.vercel.app"),
  openGraph: {
    title: "Roadmint — Your Free AI Learning Companion",
    description:
      "Turn any topic into a clear, day-wise roadmap. Stay consistent, track progress, and export anytime. No account needed.",
    url: "https://roadmap-999.vercel.app",
    siteName: "Roadmint",
    images: [
      {
        url: "https://roadmap-999.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roadmint — AI-Powered Roadmap Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmint — Free AI-Powered Learning Roadmaps",
    description:
      "Create custom learning roadmaps for any topic. Track, export, and learn—no sign-up required.",
    images: ["https://roadmap-999.vercel.app/og-image.png"],
  },
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        {children}
      </body>
    </html>
  );
}

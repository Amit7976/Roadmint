import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

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
    "Get a personalized free AI-powered learning roadmap in seconds. No sign-up & Account needed. Free forever. Track your progress and export your learning data.",
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
    "free roadmap",
  ],
  verification: {
    google: 'NNBw6f7lAr5SUMYT2XyMDeknY_fr1ad6mUgnRXBL3TM',
  },
  alternates: {
    canonical: "https://roadmint.vercel.app",
  },
  other: {
    "next-size-adjust": "100%",
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  authors: [{ name: "Roadmint Team", url: "https://roadmint.vercel.app" }],
  creator: "Amit | Roadmint",
  metadataBase: new URL("https://roadmint.vercel.app"),
  openGraph: {
    title: "Roadmint — Free AI-Powered Learning Roadmaps",
    description:
      "Get a personalized free AI-powered learning roadmap in seconds. No sign-up & Account needed. Free forever. Track your progress and export your learning data.",
    url: "https://roadmint.vercel.app",
    siteName: "Roadmint",
    images: [
      {
        url: "https://roadmint.vercel.app/opengraph-image.png",
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
      "Get a personalized free AI-powered learning roadmap in seconds. No sign-up & Account needed. Free forever. Track your progress and export your learning data.",
    images: ["https://roadmint.vercel.app/opengraph-image.png"],
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

const updatedTime = "2025-06-05T10:00:00+05:30";

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta property="og:updated_time" content={updatedTime} />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Roadmint",
              "url": "https://roadmint.vercel.app",
              "description":
                "Get a personalized free AI-powered learning roadmap in seconds. No sign-up & Account needed. Free forever. Track your progress and export your learning data.",
              "applicationCategory": "EducationApplication",
              "operatingSystem": "All",
              "inLanguage": "en",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "INR"
              },
              "creator": {
                "@type": "Organization",
                "name": "Roadmint"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-SQW8D7ZEZ2" />
    </html>
  );
}
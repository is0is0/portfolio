import type { Metadata } from "next";
import Script from "next/script";
import { Hanken_Grotesk, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { linkedInUrl } from "@/lib/social";
import { THEME_SWITCH_ENABLED, themeInitScript } from "@/lib/theme";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const description =
  "Justin Nelson is a developer and designer focused on intelligent interfaces and human computer interaction that advance how society works.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Justin Nelson — Developer & Designer",
    template: "%s — Justin Nelson",
  },
  description,
  keywords: [
    "Justin Nelson",
    "developer",
    "designer",
    "human computer interaction",
    "intelligent interfaces",
    "AI engineer",
    "GIEBEL",
  ],
  authors: [{ name: "Justin Nelson" }],
  creator: "Justin Nelson",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Justin Nelson",
    title: "Justin Nelson — Developer & Designer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Nelson — Developer & Designer",
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justin Nelson",
  url: siteUrl,
  jobTitle: "Developer & Designer",
  worksFor: { "@type": "Organization", name: "GIEBEL" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Georgia" },
  sameAs: [linkedInUrl],
  knowsAbout: [
    "Human computer interaction",
    "Intelligent interfaces",
    "Artificial intelligence",
    "Software engineering",
    "Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-paper text-ink">
        {THEME_SWITCH_ENABLED && (
          <Script id="theme-init" strategy="beforeInteractive">
            {themeInitScript}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeSwitch />
        {children}
      </body>
    </html>
  );
}

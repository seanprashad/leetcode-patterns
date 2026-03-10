import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistrar from "@/components/layout/ServiceWorkerRegistrar";
import { AuthProvider } from "@/components/layout/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const siteUrl = "https://seanprashad.com/leetcode-patterns";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Leetcode Patterns",
  description:
    "A curated list of LeetCode questions grouped by pattern to help you ace coding interviews. Filter by difficulty, company, and topic.",
  manifest: `${basePath}/manifest.json`,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Leetcode Patterns",
    description:
      "A curated list of LeetCode questions grouped by pattern to help you ace coding interviews.",
    url: siteUrl,
    siteName: "Leetcode Patterns",
    images: [
      {
        url: `${basePath}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Leetcode Patterns – A curated list of LeetCode questions grouped by pattern",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leetcode Patterns",
    description:
      "A curated list of LeetCode questions grouped by pattern to help you ace coding interviews.",
    images: [`${basePath}/images/og-image.png`],
  },
  keywords: [
    "leetcode",
    "coding interview",
    "data structures",
    "algorithms",
    "interview prep",
    "blind 75",
    "leetcode patterns",
  ],
  authors: [{ name: "Sean Prashad", url: "https://github.com/SeanPrashad" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();if(location.hash&&location.hash.indexOf("access_token")>-1)window.__SUPABASE_AUTH_HASH__=location.hash`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <ServiceWorkerRegistrar />
      </body>
      <GoogleAnalytics gaId="G-J7FBQPGZTW" />
    </html>
  );
}

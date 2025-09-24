import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Paradaim - Creative Agency",
    template: "%s | Paradaim",
  },
  description:
    "The starting point of your brand with the presentation of innovation and creativity. Newly made, but backed by excellence – team with proven records in top-tier projects.",
  generator: "Paradaim Creative Agency",
  applicationName: "Paradaim",
  keywords: [
    "creative agency",
    "design",
    "development",
    "branding",
    "innovation",
    "Paradaim",
    "web design",
    "graphic design",
    "brand strategy",
    "digital marketing",
  ],
  authors: [{ name: "Paradaim Team", url: "https://paradaim.com" }],
  creator: "Paradaim",
  publisher: "Paradaim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://paradaim.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "Paradaim - Creative Agency",
    description:
      "The starting point of your brand with the presentation of innovation and creativity. Newly made, but backed by excellence – team with proven records in top-tier projects.",
    url: "https://paradaim.com",
    siteName: "Paradaim",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paradaim Creative Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradaim - Creative Agency",
    description:
      "The starting point of your brand with the presentation of innovation and creativity. Newly made, but backed by excellence.",
    images: ["/twitter-image.jpg"],
    creator: "@paradaim",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Paradaim",
  alternateName: "Paradaim Creative Agency",
  url: "https://paradaim.com",
  logo: "https://paradaim.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-PARADAIM",
    contactType: "customer service",
    availableLanguage: ["en", "de"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Creative Street",
    addressLocality: "Design City",
    addressRegion: "CA",
    postalCode: "90210",
    addressCountry: "US",
  },
  sameAs: [
    "https://twitter.com/paradaim",
    "https://linkedin.com/company/paradaim",
    "https://instagram.com/paradaim",
    "https://github.com/paradaim",
  ],
  foundingDate: "2025",
  description:
    "Creative agency specializing in brand design, web development, and digital marketing. Newly made, but backed by excellence – team with proven records in top-tier projects.",
  serviceType: ["Graphic Design", "Web Development", "Brand Strategy", "Digital Marketing"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics placeholder
              // Replace GA_MEASUREMENT_ID with your actual Google Analytics ID
              // window.gtag = window.gtag || function(){(window.gtag.q=window.gtag.q||[]).push(arguments)};
              // gtag('js', new Date());
              // gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

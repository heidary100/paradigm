import type { Metadata } from "next"
import ArticlesClient from "./articles-client"

export const metadata: Metadata = {
  title: "Latest Articles",
  description:
    "Insights, trends, and expertise from our team of creative professionals. Stay updated with the latest in design, development, and digital strategy.",
  keywords: ["design articles", "web development", "creative insights", "design trends", "branding", "UX design"],
  openGraph: {
    title: "Latest Articles | Paradaim",
    description: "Insights, trends, and expertise from our team of creative professionals.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paradaim Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Articles | Paradaim",
    description: "Insights, trends, and expertise from our team of creative professionals.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/articles",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Paradaim Articles",
  description: "Insights, trends, and expertise from our team of creative professionals.",
  url: "https://paradaim.com/articles",
  publisher: {
    "@type": "Organization",
    name: "Paradaim",
    logo: {
      "@type": "ImageObject",
      url: "https://paradaim.com/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://paradaim.com/articles",
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://paradaim.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Articles",
      item: "https://paradaim.com/articles",
    },
  ],
}

export default function ArticlesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ArticlesClient />
    </>
  )
}

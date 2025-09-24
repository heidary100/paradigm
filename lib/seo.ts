import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

export function generateSEO({
  title,
  description = "The starting point of your brand with the presentation of innovation and creativity. Newly formed with industry veterans boasting 10+ years in design and development.",
  image = "/og-image.jpg",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}): Metadata {
  const siteUrl = "https://paradaim.com"
  const fullUrl = `${siteUrl}${url}`
  const fullImage = `${siteUrl}${image}`

  return {
    title: title ? `${title} | Paradaim` : "Paradaim - Creative Agency",
    description,
    openGraph: {
      title: title || "Paradaim - Creative Agency",
      description,
      url: fullUrl,
      siteName: "Paradaim",
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || "Paradaim Creative Agency",
        },
      ],
      locale: "en_US",
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Paradaim - Creative Agency",
      description,
      images: [fullImage],
      creator: "@paradaim",
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  authors = ["Paradaim Team"],
}: {
  title: string
  description: string
  url: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://paradaim.com${url}`,
    image: image ? `https://paradaim.com${image}` : "https://paradaim.com/og-image.jpg",
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author,
    })),
    publisher: {
      "@type": "Organization",
      name: "Paradaim",
      logo: {
        "@type": "ImageObject",
        url: "https://paradaim.com/logo.png",
      },
    },
  }
}

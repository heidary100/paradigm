import type { Metadata } from "next"

interface GenerateMetadataProps {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  type?: "website" | "article"
  publishedTime?: string
  authors?: string[]
}

export function generateMetadata({
  title,
  description,
  path,
  image = "/og-image.jpg",
  keywords = [],
  type = "website",
  publishedTime,
  authors = [],
}: GenerateMetadataProps): Metadata {
  const fullTitle = title.includes("Paradaim") ? title : `${title} | Paradaim`
  const url = `https://paradaim.com${path}`

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, "Paradaim", "creative agency", "design", "development"],
    authors: authors.map((name) => ({ name })),
    creator: "Paradaim",
    publisher: "Paradaim",
    ...(publishedTime && { publishedTime }),
    metadataBase: new URL("https://paradaim.com"),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Paradaim",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(authors.length > 0 && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
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
  }
}

import type { Metadata } from "next"
import ArticlePageClient from "./client"
import { getArticle } from "@/lib/api" // Assuming getArticle is moved to a lib file

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The article you are looking for could not be found.",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    publishedTime: article.publishedAt,
    category: article.category,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  // The client component will handle the notFound() case
  return <ArticlePageClient article={article} />
}

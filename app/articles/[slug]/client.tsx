"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from "lucide-react"
import { motion } from "framer-motion"
import type { Article } from "@/lib/types" // Assuming Article type is defined in a types file
import { getRelatedArticles } from "@/lib/api" // Assuming getRelatedArticles is moved to a lib file
import { useEffect, useState } from "react"

interface ArticlePageClientProps {
  article: Article | null
}

export default function ArticlePageClient({ article }: ArticlePageClientProps) {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])

  useEffect(() => {
    if (article) {
      getRelatedArticles(article.category, article.id).then(setRelatedArticles)
    }
  }, [article])

  if (!article) {
    notFound()
  }

  // JSON-LD structured data for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      image: article.author.avatar,
      description: article.author.bio,
    },
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
      "@id": `https://paradaim.com/articles/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
    wordCount: article.content.split(" ").length,
    timeRequired: `PT${article.readTime}M`,
  }

  // Breadcrumb structured data
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://paradaim.com/articles/${article.slug}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-primary transition-colors">
                Articles
              </Link>
              <span>/</span>
              <span className="text-foreground">{article.title}</span>
            </nav>

            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime} min read
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight text-balance">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 text-pretty">{article.excerpt}</p>

              {/* Author Info */}
              <div className="flex items-center justify-between border-b border-border pb-6">
                <div className="flex items-center">
                  <img
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{article.author.name}</div>
                    <div className="text-sm text-muted-foreground">{article.author.bio}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border">
                <h3 className="text-2xl font-bold text-foreground mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`} className="group">
                      <article>
                        <div className="aspect-video overflow-hidden rounded-lg mb-3">
                          <img
                            src={relatedArticle.image || "/placeholder.svg"}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{relatedArticle.excerpt}</p>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </article>
      </div>
    </>
  )
}

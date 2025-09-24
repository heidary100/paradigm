"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  image: string
}

export function LatestArticlesSection() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fallback articles data
  const fallbackArticles: Article[] = [
    {
      id: "1",
      slug: "future-of-web-design",
      title: "The Future of Web Design: Trends to Watch in 2025",
      excerpt:
        "Explore the cutting-edge design trends that will shape the digital landscape this year, from AI-powered interfaces to sustainable design practices.",
      category: "Design Insights",
      publishedAt: "2025-01-15",
      readTime: 5,
      image: "/modern-web-design.png",
    },
    {
      id: "2",
      slug: "brand-identity-essentials",
      title: "Brand Identity Essentials: Building Recognition That Lasts",
      excerpt:
        "Discover the fundamental elements that create memorable brand identities and learn how to develop a cohesive visual language for your business.",
      category: "Branding",
      publishedAt: "2025-01-10",
      readTime: 7,
      image: "/brand-identity-design.png",
    },
    {
      id: "3",
      slug: "user-experience-psychology",
      title: "The Psychology Behind Great User Experience",
      excerpt:
        "Understanding user behavior and cognitive patterns to create intuitive, engaging digital experiences that convert visitors into customers.",
      category: "UX Design",
      publishedAt: "2025-01-05",
      readTime: 6,
      image: "/user-experience-design.png",
    },
    {
      id: "4",
      slug: "creative-process-innovation",
      title: "Innovation in Creative Process: From Concept to Execution",
      excerpt:
        "Our proven methodology for transforming creative ideas into successful brand implementations, featuring real case studies and insights.",
      category: "Process",
      publishedAt: "2024-12-28",
      readTime: 8,
      image: "/creative-design-process.png",
    },
  ]

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/articles")
        if (!response.ok) throw new Error("Failed to fetch articles")
        const data = await response.json()
        setArticles(data.slice(0, 4)) // Show latest 4 articles
      } catch (err) {
        console.log("[v0] Using fallback articles data:", err)
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, articles.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, articles.length - 2)) % Math.max(1, articles.length - 2))
  }

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("articles.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("articles.subtitle")}</p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {articles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{article.readTime} min read</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/articles/${article.slug}`}>
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative mb-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article) => (
                <div key={article.id} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">
                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{article.readTime} min read</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/articles/${article.slug}`}>
                            Read More <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {articles.length > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-2">
                {articles.slice(0, -2).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= articles.length - 3}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/articles">
              {t("articles.viewAll")} <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

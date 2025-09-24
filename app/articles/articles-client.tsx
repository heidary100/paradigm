"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  publishedAt: string
  readTime: number
  image: string
  author: {
    name: string
    avatar: string
  }
}

export default function ArticlesClient() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Fallback articles data
  const fallbackArticles: Article[] = [
    {
      id: "1",
      slug: "future-of-web-design",
      title: "The Future of Web Design: Trends to Watch in 2025",
      excerpt:
        "Explore the cutting-edge design trends that will shape the digital landscape this year, from AI-powered interfaces to sustainable design practices.",
      content: "Full article content here...",
      category: "Design Insights",
      publishedAt: "2025-01-15",
      readTime: 5,
      image: "/modern-web-design.png",
      author: {
        name: "Sarah Johnson",
        avatar: "/professional-designer.png",
      },
    },
    {
      id: "2",
      slug: "brand-identity-essentials",
      title: "Brand Identity Essentials: Building Recognition That Lasts",
      excerpt:
        "Discover the fundamental elements that create memorable brand identities and learn how to develop a cohesive visual language for your business.",
      content: "Full article content here...",
      category: "Branding",
      publishedAt: "2025-01-10",
      readTime: 7,
      image: "/brand-identity-design.png",
      author: {
        name: "Marcus Chen",
        avatar: "/brand-strategist.jpg",
      },
    },
    {
      id: "3",
      slug: "user-experience-psychology",
      title: "The Psychology Behind Great User Experience",
      excerpt:
        "Understanding user behavior and cognitive patterns to create intuitive, engaging digital experiences that convert visitors into customers.",
      content: "Full article content here...",
      category: "UX Design",
      publishedAt: "2025-01-05",
      readTime: 6,
      image: "/user-experience-design.png",
      author: {
        name: "Emily Rodriguez",
        avatar: "/ux-designer-workflow.png",
      },
    },
    {
      id: "4",
      slug: "creative-process-innovation",
      title: "Innovation in Creative Process: From Concept to Execution",
      excerpt:
        "Our proven methodology for transforming creative ideas into successful brand implementations, featuring real case studies and insights.",
      content: "Full article content here...",
      category: "Process",
      publishedAt: "2024-12-28",
      readTime: 8,
      image: "/creative-design-process.png",
      author: {
        name: "David Kim",
        avatar: "/creative-director.png",
      },
    },
    {
      id: "5",
      slug: "sustainable-design-practices",
      title: "Sustainable Design: Creating Eco-Friendly Digital Experiences",
      excerpt:
        "Learn how to implement sustainable design practices that reduce environmental impact while maintaining exceptional user experiences.",
      content: "Full article content here...",
      category: "Sustainability",
      publishedAt: "2024-12-20",
      readTime: 6,
      image: "/sustainable-design-concept.png",
      author: {
        name: "Lisa Thompson",
        avatar: "/sustainability-expert.jpg",
      },
    },
    {
      id: "6",
      slug: "ai-in-creative-industry",
      title: "AI in Creative Industry: Tool or Threat?",
      excerpt:
        "Examining the role of artificial intelligence in creative work and how designers can leverage AI tools to enhance their workflow.",
      content: "Full article content here...",
      category: "Technology",
      publishedAt: "2024-12-15",
      readTime: 9,
      image: "/ai-creative-design.jpg",
      author: {
        name: "Alex Morgan",
        avatar: "/tech-designer.jpg",
      },
    },
  ]

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/articles")
        if (!response.ok) throw new Error("Failed to fetch articles")
        const data = await response.json()
        setArticles(data)
      } catch (err) {
        console.log("[v0] Using fallback articles data:", err)
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(articles.map((article) => article.category))]

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96 mb-8" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Articles</span>
          </nav>

          <h1 className="text-4xl font-bold text-foreground mb-4">Latest Articles</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Insights, trends, and expertise from our team of creative professionals. Stay updated with the latest in
            design, development, and digital strategy.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={article.author.avatar || "/placeholder.svg"}
                          alt={article.author.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="text-sm text-muted-foreground">{article.author.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} min
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="w-full">
                      <Link href={`/articles/${article.slug}`}>
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

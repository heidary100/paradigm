export interface Article {
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
    bio: string
  }
  tags: string[]
}

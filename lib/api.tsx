import type { Article } from "./types"

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`https://api.paradaim.com/articles/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    if (!response.ok) throw new Error("Failed to fetch article")
    return await response.json()
  } catch (err) {
    // Fallback article data
    const fallbackArticles: Record<string, Article> = {
      "future-of-web-design": {
        id: "1",
        slug: "future-of-web-design",
        title: "The Future of Web Design: Trends to Watch in 2025",
        excerpt:
          "Explore the cutting-edge design trends that will shape the digital landscape this year, from AI-powered interfaces to sustainable design practices.",
        content: `
          <h2>The Evolution of Web Design</h2>
          <p>Web design has come a long way since the early days of the internet. As we move into 2025, we're seeing unprecedented changes in how users interact with digital interfaces and what they expect from their online experiences.</p>
          
          <h3>AI-Powered Interfaces</h3>
          <p>Artificial intelligence is revolutionizing web design by enabling more personalized and intuitive user experiences. From chatbots that understand context to interfaces that adapt to user behavior, AI is making websites smarter and more responsive.</p>
          
          <h3>Sustainable Design Practices</h3>
          <p>Environmental consciousness is driving a new wave of sustainable design practices. Designers are now considering the carbon footprint of their websites, optimizing for energy efficiency, and creating designs that load faster and consume less bandwidth.</p>
          
          <h3>Immersive Experiences</h3>
          <p>With the advancement of WebGL and WebXR technologies, we're seeing more immersive experiences being integrated into traditional websites. These technologies allow for 3D interactions and virtual reality experiences directly in the browser.</p>
          
          <h2>Key Trends to Watch</h2>
          <ul>
            <li>Micro-interactions and subtle animations</li>
            <li>Dark mode as a standard feature</li>
            <li>Voice user interfaces</li>
            <li>Augmented reality integration</li>
            <li>Minimalist and clean designs</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>The future of web design is exciting and full of possibilities. By staying informed about these trends and continuously learning new technologies, designers can create experiences that not only meet user expectations but exceed them.</p>
        `,
        category: "Design Insights",
        publishedAt: "2025-01-15",
        readTime: 5,
        image: "/modern-web-design.png",
        author: {
          name: "Sarah Johnson",
          avatar: "/professional-designer.png",
          bio: "Senior UX Designer with 8+ years of experience in creating digital experiences for Fortune 500 companies.",
        },
        tags: ["Web Design", "UI/UX", "Trends", "Technology", "Future"],
      },
    }

    return fallbackArticles[slug] || null
  }
}

export async function getRelatedArticles(category: string, excludeId: string): Promise<Article[]> {
  try {
    const response = await fetch(
      `https://api.paradaim.com/articles?category=${category}&limit=3&exclude=${excludeId}`,
      {
        next: { revalidate: 3600 },
      },
    )
    if (!response.ok) throw new Error("Failed to fetch related articles")
    return await response.json()
  } catch (err) {
    return [] // No related articles for fallback
  }
}

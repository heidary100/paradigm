"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Github } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  experience: string
  specialties: string[]
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export function TeamSection() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback team data
  const fallbackTeam = [
    {
      id: "ceo",
      name: "Sarah Chen",
      position: language === "de" ? "CEO & Kreativdirektorin" : "CEO & Creative Director",
      bio:
        language === "de"
          ? "15+ Jahre Erfahrung bei führenden Tech-Unternehmen wie Google und Apple. Spezialisiert auf Markenentwicklung und digitale Transformation."
          : "15+ years of experience at leading tech companies like Google and Apple. Specializes in brand development and digital transformation.",
      image: "/professional-ceo-portrait.png",
      experience: "15+ years",
      specialties: ["Brand Strategy", "Digital Transformation", "Team Leadership"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: "cto",
      name: "Marcus Rodriguez",
      position: language === "de" ? "CTO & Lead Developer" : "CTO & Lead Developer",
      bio:
        language === "de"
          ? "Ehemaliger Senior Engineer bei Meta und Netflix. Experte für skalierbare Architekturen und moderne Web-Technologien."
          : "Former Senior Engineer at Meta and Netflix. Expert in scalable architectures and modern web technologies.",
      image: "/professional-man-cto-developer-portrait.jpg",
      experience: "12+ years",
      specialties: ["Full-Stack Development", "Cloud Architecture", "DevOps"],
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: "design-lead",
      name: "Elena Kowalski",
      position: language === "de" ? "Design Lead" : "Design Lead",
      bio:
        language === "de"
          ? "Preisgekrönte Designerin mit Erfahrung bei Airbnb und Spotify. Spezialisiert auf UX/UI Design und Design Systems."
          : "Award-winning designer with experience at Airbnb and Spotify. Specializes in UX/UI design and design systems.",
      image: "/professional-woman-designer.png",
      experience: "10+ years",
      specialties: ["UX/UI Design", "Design Systems", "User Research"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: "brand-strategist",
      name: "David Kim",
      position: language === "de" ? "Brand Strategist" : "Brand Strategist",
      bio:
        language === "de"
          ? "Ehemaliger Creative Director bei Ogilvy und BBDO. Experte für Markenpositionierung und integrierte Kampagnen."
          : "Former Creative Director at Ogilvy and BBDO. Expert in brand positioning and integrated campaigns.",
      image: "/professional-man-brand-strategist-portrait.jpg",
      experience: "14+ years",
      specialties: ["Brand Positioning", "Creative Strategy", "Campaign Development"],
      social: {
        linkedin: "#",
      },
    },
    {
      id: "frontend-dev",
      name: "Zoe Thompson",
      position: language === "de" ? "Senior Frontend Developer" : "Senior Frontend Developer",
      bio:
        language === "de"
          ? "React-Spezialistin mit Erfahrung bei Shopify und GitHub. Fokus auf Performance-Optimierung und moderne Frontend-Architekturen."
          : "React specialist with experience at Shopify and GitHub. Focus on performance optimization and modern frontend architectures.",
      image: "/professional-woman-frontend-developer-portrait.jpg",
      experience: "8+ years",
      specialties: ["React/Next.js", "Performance Optimization", "TypeScript"],
      social: {
        github: "#",
        twitter: "#",
      },
    },
    {
      id: "marketing-lead",
      name: "Alex Patel",
      position: language === "de" ? "Marketing Lead" : "Marketing Lead",
      bio:
        language === "de"
          ? "Digital Marketing Experte mit Erfahrung bei HubSpot und Salesforce. Spezialisiert auf Growth Hacking und datengetriebene Strategien."
          : "Digital marketing expert with experience at HubSpot and Salesforce. Specializes in growth hacking and data-driven strategies.",
      image: "/professional-person-marketing-lead-portrait.jpg",
      experience: "9+ years",
      specialties: ["Growth Marketing", "Analytics", "Conversion Optimization"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/team")
        if (!response.ok) {
          throw new Error("Failed to fetch team")
        }
        const data = await response.json()
        setTeam(data)
      } catch (err) {
        console.error("Error fetching team:", err)
        setError("Failed to load team")
        setTeam(fallbackTeam)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [language])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  if (loading) {
    return (
      <section className="py-24 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {language === "de" ? "Unser Expertenteam" : "Our Expert Team"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {language === "de"
              ? "Erfahrene Experten mit nachgewiesenen Branchenrekorden in Innovation und Kreativität. Unser Team vereint jahrzehntelange Erfahrung von führenden Technologieunternehmen."
              : "Seasoned experts with proven industry records in innovation and creativity. Our team combines decades of experience from leading technology companies."}
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-foreground font-medium">
              {language === "de"
                ? "Showcase Excellence: Ein Team von Branchenveteranen mit über 10 Jahren Erfahrung bei Google, Apple, Meta, Netflix und anderen führenden Unternehmen."
                : "Showcase Excellence: A team of industry veterans with 10+ years of experience at Google, Apple, Meta, Netflix, and other leading companies."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div key={member.id} variants={cardVariants}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      {member.social?.linkedin && (
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social?.twitter && (
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {member.social?.github && (
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {member.experience}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.slice(0, 3).map((specialty, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-accent/10 text-accent-foreground rounded-md">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  image: string
}

export function TestimonialsSection() {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fallback testimonials data
  const fallbackTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Bahram Meghdari",
      position: "CEO",
      company: "TechVision Solutions",
      content:
        "Paradaim transformed our brand identity completely. Their innovative approach and attention to detail exceeded our expectations. The team's expertise in both design and development created a cohesive brand experience that resonates with our audience.",
      rating: 5,
      image: "/professional-business-person.png",
    },
    {
      id: "2",
      name: "Sarah Chen",
      position: "Marketing Director",
      company: "Global Innovations Inc",
      content:
        "Working with Paradaim was a game-changer for our digital presence. Their strategic thinking and creative execution helped us stand out in a crowded market. The results speak for themselves - 300% increase in engagement.",
      rating: 5,
      image: "/professional-woman-executive.png",
    },
    {
      id: "3",
      name: "Marcus Rodriguez",
      position: "Founder",
      company: "StartupLab",
      content:
        "The Paradaim team brought our vision to life with incredible precision. Their newly formed company might be young, but their experience shows in every detail. They delivered beyond what we imagined possible.",
      rating: 5,
      image: "/startup-founder-professional.jpg",
    },
  ]

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/testimonials")
        if (!response.ok) throw new Error("Failed to fetch testimonials")
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        console.log("[v0] Using fallback testimonials data:", err)
        setTestimonials(fallbackTestimonials)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 6000) // Auto-advance every 6 seconds
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Skeleton className="h-16 w-16 rounded-full mr-4" />
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </Card>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("testimonials.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("testimonials.subtitle")}</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 shadow-lg">
                <div className="flex items-start mb-8">
                  <Quote className="h-12 w-12 text-primary/20 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                      "{currentTestimonial.content}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={currentTestimonial.image || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                          className="h-16 w-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold text-foreground text-lg">{currentTestimonial.name}</div>
                          <div className="text-muted-foreground">
                            {currentTestimonial.position} at {currentTestimonial.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-lg"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-lg"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

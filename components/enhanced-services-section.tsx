"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Palette, Code, Wrench, Printer } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  packages?: string[]
}

export function EnhancedServicesSection() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback services data
  const fallbackServices = [
    {
      id: "graphic-design",
      title: language === "de" ? "Grafikdesign" : "Graphic Design",
      description:
        language === "de"
          ? "Wir erstellen visuelle Identitäten, die Ihr Markenwesen erfassen und Ihre Werte effektiv kommunizieren. Von Logos bis hin zu kompletten Markenrichtlinien."
          : "We create visual identities that capture your brand essence and communicate your values effectively. From logos to complete brand guidelines.",
      icon: "palette",
      packages: ["Logo Design", "Brand Guidelines", "Print Materials"],
    },
    {
      id: "web-design",
      title: language === "de" ? "Webdesign" : "Web Design",
      description:
        language === "de"
          ? "Moderne, responsive Websites mit modernster Technologie und optimiert für Leistung. Benutzerfreundliche Designs, die konvertieren."
          : "Modern, responsive websites built with cutting-edge technology and optimized for performance. User-friendly designs that convert.",
      icon: "code",
      packages: ["Responsive Design", "E-commerce", "CMS Integration"],
    },
    {
      id: "development",
      title: language === "de" ? "Entwicklung" : "Development",
      description:
        language === "de"
          ? "Vollständige Entwicklungslösungen von Frontend bis Backend. Skalierbare Anwendungen mit modernsten Frameworks und Technologien."
          : "Complete development solutions from frontend to backend. Scalable applications using cutting-edge frameworks and technologies.",
      icon: "wrench",
      packages: ["Web Applications", "Mobile Apps", "API Development"],
    },
    {
      id: "print",
      title: language === "de" ? "Druck" : "Print",
      description:
        language === "de"
          ? "Hochwertige Drucklösungen für alle Ihre Marketingmaterialien. Von Visitenkarten bis hin zu großformatigen Displays."
          : "High-quality print solutions for all your marketing materials. From business cards to large-format displays.",
      icon: "printer",
      packages: ["Business Cards", "Brochures", "Large Format"],
    },
  ]

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/services")
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        setServices(data)
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("Failed to load services")
        setServices(fallbackServices)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [language])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "palette":
        return Palette
      case "code":
        return Code
      case "wrench":
        return Wrench
      case "printer":
        return Printer
      default:
        return Palette
    }
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
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
            {language === "de" ? "Unsere Leistungen" : "Our Services"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {language === "de"
              ? "Umfassende kreative Lösungen, die darauf zugeschnitten sind, Ihre Marke zu erheben und Ergebnisse zu erzielen."
              : "Comprehensive creative solutions tailored to elevate your brand and drive results."}
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg font-medium text-foreground mb-4">
              {language === "de"
                ? "Bauen Sie Ihre Marke mit unserem umfassenden Paket auf"
                : "Build your brand with our comprehensive package"}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "de"
                ? "Von der ersten Idee bis zur finalen Umsetzung - wir begleiten Sie auf dem Weg zu einer unvergesslichen Marke, die Ihre Zielgruppe begeistert und nachhaltigen Erfolg schafft."
                : "From initial concept to final execution - we guide you on the path to an unforgettable brand that captivates your audience and creates lasting success."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon)
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 h-full">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-muted-foreground leading-relaxed flex-1">
                      {service.description}
                    </CardDescription>
                    {service.packages && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {language === "de" ? "Leistungen:" : "Services:"}
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {service.packages.slice(0, 3).map((pkg, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {pkg}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

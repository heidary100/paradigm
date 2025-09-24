"use client"

import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ClientLogos() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const clients = [
    { name: "TechCorp", logo: "/tech-company-logo.jpg" },
    { name: "DesignStudio", logo: "/design-studio-logo.png" },
    { name: "StartupX", logo: "/startup-logo.png" },
    { name: "GlobalBrand", logo: "/global-brand-logo.jpg" },
    { name: "InnovateCo", logo: "/innovation-company-logo.png" },
    { name: "CreativeHub", logo: "/creative-agency-logo.png" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-muted-foreground">{t("clients.title")}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {clients.map((client) => (
            <motion.div key={client.name} className="flex items-center justify-center" variants={logoVariants}>
              <motion.img
                src={client.logo || "/placeholder.svg"}
                alt={`${client.name} logo`}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

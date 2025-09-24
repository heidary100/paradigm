"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-blue-subtle" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-8">
          {/* Main title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight"
            variants={itemVariants}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            className="text-base sm:text-lg italic text-muted-foreground max-w-4xl mx-auto border-l-4 border-primary pl-6 my-8"
            variants={itemVariants}
          >
            {t("hero.quote")}
          </motion.blockquote>

          {/* CTA Button */}
          <motion.div className="pt-4" variants={itemVariants}>
            <Button size="lg" className="text-lg px-8 py-6 group">
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "3s" }}
      />
    </section>
  )
}

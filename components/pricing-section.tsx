"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, Star, Zap, Crown } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"

interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: string[]
  popular: boolean
  icon: string
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
}

export function PricingSection() {
  const { t } = useLanguage()
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  // Fallback pricing data
  const fallbackPlans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 100,
      currency: "$",
      period: "month",
      description: "Perfect for small businesses and startups looking to establish their brand presence.",
      features: [
        "10 Social Media Posts per month",
        "Basic Brand Guidelines",
        "Logo Design (1 concept)",
        "Email Support",
        "1 Revision Round",
        "Basic Analytics Report",
      ],
      popular: false,
      icon: "zap",
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      id: "basic",
      name: "Basic",
      price: 150,
      currency: "$",
      period: "month",
      description: "Ideal for growing businesses that need comprehensive design and marketing support.",
      features: [
        "20 Social Media Posts per month",
        "Complete Brand Identity Package",
        "Logo Design (3 concepts)",
        "Website Landing Page",
        "Priority Email Support",
        "3 Revision Rounds",
        "Monthly Analytics Report",
        "Basic SEO Optimization",
      ],
      popular: true,
      icon: "star",
      buttonText: "Most Popular",
      buttonVariant: "default",
    },
    {
      id: "golden",
      name: "Golden",
      price: 200,
      currency: "$",
      period: "month",
      description: "Premium solution for established businesses requiring full-service creative support.",
      features: [
        "Unlimited Social Media Posts",
        "Complete Brand Strategy",
        "Logo Design (5 concepts)",
        "Full Website Development",
        "24/7 Priority Support",
        "Unlimited Revisions",
        "Weekly Analytics Reports",
        "Advanced SEO & Marketing",
        "Dedicated Account Manager",
        "Print Design Materials",
      ],
      popular: false,
      icon: "crown",
      buttonText: "Go Premium",
      buttonVariant: "secondary",
    },
  ]

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch("https://api.paradaim.com/pricing")
        if (!response.ok) throw new Error("Failed to fetch pricing")
        const data = await response.json()
        setPlans(data)
      } catch (err) {
        console.log("[v0] Using fallback pricing data:", err)
        setPlans(fallbackPlans)
      } finally {
        setLoading(false)
      }
    }

    fetchPricing()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return Star
      case "crown":
        return Crown
      default:
        return Zap
    }
  }

  const getDiscountedPrice = (price: number) => {
    return billingPeriod === "yearly" ? Math.round(price * 0.8) : price
  }

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-8 w-24 mb-4" />
                <Skeleton className="h-12 w-32 mb-4" />
                <Skeleton className="h-16 w-full mb-6" />
                <div className="space-y-3">
                  {[...Array(6)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full mt-6" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("pricing.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">{t("pricing.subtitle")}</p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">
                20% off
              </Badge>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = getIcon(plan.icon)
            const price = getDiscountedPrice(plan.price)

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105"
                      : "hover:shadow-lg transition-shadow duration-300"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.currency}
                        {price}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingPeriod === "yearly" ? "year" : plan.period}
                      </span>
                      {billingPeriod === "yearly" && plan.price !== price && (
                        <div className="text-sm text-muted-foreground line-through">
                          {plan.currency}
                          {plan.price}/{plan.period}
                        </div>
                      )}
                    </div>
                    <CardDescription className="mt-4">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" variant={plan.buttonVariant} size="lg">
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">{t("pricing.customNote")}</p>
          <Button variant="outline" size="lg">
            {t("pricing.contactSales")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

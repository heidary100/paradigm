import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-context"
import { HeroSection } from "@/components/hero-section"
import { ClientLogos } from "@/components/client-logos"
import { EnhancedServicesSection } from "@/components/enhanced-services-section"
import { SelectedWorksSection } from "@/components/selected-works-section"
import { TeamSection } from "@/components/team-section"
import { OfficeCarousel } from "@/components/office-carousel"
import { LatestArticlesSection } from "@/components/latest-articles-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { AIChatbotButton } from "@/components/ai-chatbot-button"

export default function HomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pt-16">
            <HeroSection />
            <ClientLogos />
            <EnhancedServicesSection />
            <SelectedWorksSection />
            <TeamSection />
            <LatestArticlesSection />
            <TestimonialsSection />
            <PricingSection />
            <OfficeCarousel />
            <ContactSection />
          </main>
          <Footer />
          <AIChatbotButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

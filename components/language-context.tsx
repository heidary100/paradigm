"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.works": "Works",
    "nav.team": "Team",
    "nav.articles": "Articles",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "The starting point of your brand with the presentation of innovation and creativity",
    "hero.subtitle":
      "Newly made, but backed by excellence – team with proven records in top-tier projects. We create authentic brands that resonate.",
    "hero.quote":
      '"The creation of something new is not accomplished by the intellect but by the play instinct acting from inner necessity. The creative mind plays with the objects it loves." — Carl Jung',
    "hero.cta": "Start Your Project",

    // Services
    "services.title": "Our Services",
    "services.graphic.title": "Graphic Design",
    "services.graphic.desc":
      "We create visual identities that capture your brand essence and communicate your values effectively.",
    "services.web.title": "Web Development",
    "services.web.desc":
      "Modern, responsive websites built with cutting-edge technology and optimized for performance.",
    "services.branding.title": "Brand Strategy",
    "services.branding.desc":
      "Comprehensive brand development from concept to execution, ensuring consistent messaging.",
    "services.creative.title": "Creative Strategy",
    "services.creative.desc":
      "Innovative approaches to solve complex design challenges and create memorable experiences.",
    "services.mobile.title": "Mobile Design",
    "services.mobile.desc":
      "User-centered mobile experiences that engage and convert across all devices and platforms.",
    "services.marketing.title": "Digital Marketing",
    "services.marketing.desc":
      "Data-driven marketing strategies that amplify your brand reach and drive meaningful engagement.",

    // Office section
    "office.title": "Our Creative Space",
    "office.subtitle": "Where innovation meets collaboration. Take a look inside our inspiring workspace.",

    // Client section
    "clients.title": "Trusted by industry leaders",

    // Footer
    "footer.copyright": "© 2025 Paradaim. All rights reserved.",
    "footer.quicklinks": "Quick Links",
    "footer.follow": "Follow Us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.aboutUs.title": "About Paradaim",
    "footer.aboutUs.description":
      "Elite team with proven records transforming brands globally. Newly formed with industry veterans boasting 10+ years in design and development.",

    // Articles
    "articles.title": "Latest Articles",
    "articles.subtitle": "Insights, trends, and expertise from our creative team",
    "articles.viewAll": "View All Articles",

    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Trusted by businesses worldwide for exceptional creative solutions",

    // Pricing
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Flexible pricing options designed to grow with your business needs",
    "pricing.customNote": "Need a custom solution? We'd love to discuss your specific requirements.",
    "pricing.contactSales": "Contact Sales",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to transform your brand? Let's start a conversation about your next project.",
    "contact.form.title": "Send us a message",
    "contact.form.description": "We'll get back to you within 24 hours.",
    "contact.form.name": "Full Name",
    "contact.form.namePlaceholder": "Enter your full name",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "Enter your email address",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us about your project...",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.success.title": "Message Sent!",
    "contact.success.message": "Thank you for reaching out. We'll get back to you soon.",
    "contact.error.title": "Error",
    "contact.error.message": "Failed to send message. Please try again.",
    "contact.info.title": "Contact Information",
    "contact.info.address.title": "Our Office",
    "contact.info.phone.title": "Phone",
    "contact.info.email.title": "Email",
    "contact.office.title": "Our Creative Space",
    "contact.office.description": "Take a peek inside our inspiring workspace",

    // AI Chatbot
    "chatbot.title": "Innovation AI",
    "chatbot.subtitle": "Your creative assistant",
    "chatbot.openChat": "Chat with our innovation AI",
    "chatbot.welcomeMessage":
      "Hi! I'm here to help you explore our services and answer any questions about your creative projects.",
    "chatbot.quickAction1": "Tell me about your services",
    "chatbot.quickAction2": "Show me your portfolio",
    "chatbot.quickAction3": "Get a project quote",
    "chatbot.disclaimer": "This is a demo chatbot interface",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.services": "Leistungen",
    "nav.works": "Arbeiten",
    "nav.team": "Team",
    "nav.articles": "Artikel",
    "nav.pricing": "Preise",
    "nav.contact": "Kontakt",

    // Hero
    "hero.title": "Der Ausgangspunkt Ihrer Marke mit der Präsentation von Innovation und Kreativität",
    "hero.subtitle":
      "Neu gegründet, aber von Exzellenz unterstützt – Team mit bewährten Erfolgen in erstklassigen Projekten. Wir schaffen authentische Marken, die resonieren.",
    "hero.quote":
      '"Die Schöpfung von etwas Neuem wird nicht durch den Intellekt vollbracht, sondern durch den Spieltrieb, der aus innerer Notwendigkeit handelt. Der kreative Geist spielt mit den Objekten, die er liebt." — Carl Jung',
    "hero.cta": "Projekt Starten",

    // Services
    "services.title": "Unsere Leistungen",
    "services.graphic.title": "Grafikdesign",
    "services.graphic.desc":
      "Wir erstellen visuelle Identitäten, die Ihr Markenwesen erfassen und Ihre Werte effektiv kommunizieren.",
    "services.web.title": "Webentwicklung",
    "services.web.desc": "Moderne, responsive Websites mit modernster Technologie und optimiert für Leistung.",
    "services.branding.title": "Markenstrategie",
    "services.branding.desc": "Umfassende Markenentwicklung vom Konzept bis zur Umsetzung mit konsistenter Botschaft.",
    "services.creative.title": "Kreativstrategie",
    "services.creative.desc":
      "Innovative Ansätze zur Lösung komplexer Designherausforderungen und zur Schaffung unvergesslicher Erlebnisse.",
    "services.mobile.title": "Mobile Design",
    "services.mobile.desc":
      "Benutzerzentrierte mobile Erlebnisse, die auf allen Geräten und Plattformen begeistern und konvertieren.",
    "services.marketing.title": "Digitales Marketing",
    "services.marketing.desc":
      "Datengesteuerte Marketingstrategien, die Ihre Markenreichweite verstärken und sinnvolles Engagement fördern.",

    // Office section
    "office.title": "Unser Kreativer Raum",
    "office.subtitle":
      "Wo Innovation auf Zusammenarbeit trifft. Werfen Sie einen Blick in unseren inspirierenden Arbeitsplatz.",

    // Client section
    "clients.title": "Vertraut von Branchenführern",

    // Footer
    "footer.copyright": "© 2025 Paradaim. Alle Rechte vorbehalten.",
    "footer.quicklinks": "Schnellzugriff",
    "footer.follow": "Folgen Sie uns",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.aboutUs.title": "Über Paradaim",
    "footer.aboutUs.description":
      "Elite-Team mit bewährten Erfolgen bei der globalen Transformation von Marken. Neu gegründet mit Branchenveteranen mit über 10 Jahren Erfahrung in Design und Entwicklung.",

    // Articles
    "articles.title": "Neueste Artikel",
    "articles.subtitle": "Einblicke, Trends und Expertise von unserem kreativen Team",
    "articles.viewAll": "Alle Artikel anzeigen",

    // Testimonials
    "testimonials.title": "Was unsere Kunden sagen",
    "testimonials.subtitle": "Vertraut von Unternehmen weltweit für außergewöhnliche kreative Lösungen",

    // Pricing
    "pricing.title": "Wählen Sie Ihren Plan",
    "pricing.subtitle": "Flexible Preisoptionen, die mit Ihren Geschäftsanforderungen wachsen",
    "pricing.customNote":
      "Benötigen Sie eine maßgeschneiderte Lösung? Wir besprechen gerne Ihre spezifischen Anforderungen.",
    "pricing.contactSales": "Vertrieb kontaktieren",

    // Contact
    "contact.title": "Kontakt aufnehmen",
    "contact.subtitle": "Bereit, Ihre Marke zu transformieren? Lassen Sie uns über Ihr nächstes Projekt sprechen.",
    "contact.form.title": "Senden Sie uns eine Nachricht",
    "contact.form.description": "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    "contact.form.name": "Vollständiger Name",
    "contact.form.namePlaceholder": "Geben Sie Ihren vollständigen Namen ein",
    "contact.form.email": "E-Mail-Adresse",
    "contact.form.emailPlaceholder": "Geben Sie Ihre E-Mail-Adresse ein",
    "contact.form.message": "Nachricht",
    "contact.form.messagePlaceholder": "Erzählen Sie uns von Ihrem Projekt...",
    "contact.form.send": "Nachricht senden",
    "contact.form.sending": "Wird gesendet...",
    "contact.success.title": "Nachricht gesendet!",
    "contact.success.message": "Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen.",
    "contact.error.title": "Fehler",
    "contact.error.message": "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    "contact.info.title": "Kontaktinformationen",
    "contact.info.address.title": "Unser Büro",
    "contact.info.phone.title": "Telefon",
    "contact.info.email.title": "E-Mail",
    "contact.office.title": "Unser Kreativer Raum",
    "contact.office.description": "Werfen Sie einen Blick in unseren inspirierenden Arbeitsplatz",

    // AI Chatbot
    "chatbot.title": "Innovations-KI",
    "chatbot.subtitle": "Ihr kreativer Assistent",
    "chatbot.openChat": "Chatten Sie mit unserer Innovations-KI",
    "chatbot.welcomeMessage":
      "Hallo! Ich bin hier, um Ihnen bei der Erkundung unserer Dienstleistungen zu helfen und Fragen zu Ihren kreativen Projekten zu beantworten.",
    "chatbot.quickAction1": "Erzählen Sie mir von Ihren Dienstleistungen",
    "chatbot.quickAction2": "Zeigen Sie mir Ihr Portfolio",
    "chatbot.quickAction3": "Projektangebot erhalten",
    "chatbot.disclaimer": "Dies ist eine Demo-Chatbot-Oberfläche",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("paradaim-language") as Language
    if (saved && (saved === "en" || saved === "de")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("paradaim-language", lang)
    // Update document language attribute
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

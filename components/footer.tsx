"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-context"

export function Footer() {
  const { t } = useLanguage()

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/paradaim", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/paradaim", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/paradaim", label: "Instagram" },
    { icon: Github, href: "https://github.com/paradaim", label: "GitHub" },
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-primary">Paradaim</div>
            </Link>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">{t("footer.aboutUs.title")}</h4>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                {t("footer.aboutUs.description")}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.quicklinks")}</h3>
            <div className="space-y-2">
              <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                {t("nav.services")}
              </Link>
              <Link href="/works" className="block text-muted-foreground hover:text-primary transition-colors">
                {t("nav.works")}
              </Link>
              <Link href="/team" className="block text-muted-foreground hover:text-primary transition-colors">
                {t("nav.team")}
              </Link>
              <Link href="/articles" className="block text-muted-foreground hover:text-primary transition-colors">
                {t("nav.articles")}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.follow")}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">{t("footer.copyright")}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

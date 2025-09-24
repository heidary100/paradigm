"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageCircle, X } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function AIChatbotButton() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          aria-label={t("chatbot.openChat")}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-2xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{t("chatbot.title")}</CardTitle>
                    <CardDescription className="text-xs">{t("chatbot.subtitle")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">{t("chatbot.welcomeMessage")}</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    <MessageCircle className="mr-2 h-3 w-3" />
                    {t("chatbot.quickAction1")}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    <MessageCircle className="mr-2 h-3 w-3" />
                    {t("chatbot.quickAction2")}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs bg-transparent">
                    <MessageCircle className="mr-2 h-3 w-3" />
                    {t("chatbot.quickAction3")}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">{t("chatbot.disclaimer")}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

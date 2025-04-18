"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the supported languages - now limited to 6 languages
export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
]

type LanguageContextType = {
  currentLanguage: string
  setLanguage: (language: string) => void
  getLanguageName: (code: string) => string
  getLanguageFlag: (code: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to browser language or English
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem("language")

    if (savedLanguage && LANGUAGES.some((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
      return
    }

    // Try to detect browser language
    const browserLanguage = navigator.language.split("-")[0]

    if (LANGUAGES.some((lang) => lang.code === browserLanguage)) {
      setCurrentLanguage(browserLanguage)
      localStorage.setItem("language", browserLanguage)
    } else {
      // Default to English if browser language not supported
      localStorage.setItem("language", "en")
    }
  }, [])

  const setLanguage = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem("language", language)
  }

  const getLanguageName = (code: string) => {
    const language = LANGUAGES.find((lang) => lang.code === code)
    return language ? language.name : "English"
  }

  const getLanguageFlag = (code: string) => {
    const language = LANGUAGES.find((lang) => lang.code === code)
    return language ? language.flag : "🇺🇸"
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, getLanguageName, getLanguageFlag }}>
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

"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

interface TranslateProps {
  text: string
  children?: React.ReactNode
}

export function Translate({ text, children }: TranslateProps) {
  const { currentLanguage } = useLanguage()
  const translation = getTranslation(currentLanguage, text)

  return <>{translation || children || text}</>
}

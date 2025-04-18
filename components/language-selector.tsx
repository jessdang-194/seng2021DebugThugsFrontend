"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LANGUAGES, useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  variant?: "header" | "footer"
}

export function LanguageSelector({ variant = "header" }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, getLanguageName, getLanguageFlag } = useLanguage()

  if (variant === "footer") {
    return (
      <div className="space-y-4">
        <h3 className="font-medium">Language</h3>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <Button
              key={language.code}
              variant={currentLanguage === language.code ? "default" : "outline"}
              size="sm"
              className={
                currentLanguage === language.code
                  ? "bg-custom-purple hover:bg-custom-purple/90"
                  : "hover:bg-custom-purple/10 hover:text-custom-purple"
              }
              onClick={() => setLanguage(language.code)}
            >
              {language.flag} {language.name}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={currentLanguage === language.code ? "bg-custom-purple/10 text-custom-purple" : ""}
            onClick={() => setLanguage(language.code)}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

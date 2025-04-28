"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LanguageSelector } from "./language-selector"
import { Translate } from "./translate"
import Image from "next/image"

export function NavHeader() {
  const pathname = usePathname()

  return (
    <header className="bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-7">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/paypath-logo.png" alt="PayPath Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-bold">PayPath</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-base font-medium transition-colors ${
                pathname === "/" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Translate text="common.home">Home</Translate>
            </Link>
            <Link
              href="/about"
              className={`text-base font-medium transition-colors ${
                pathname === "/about" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Translate text="common.about">About</Translate>
            </Link>
            <Link
              href="/help/contact"
              className={`text-base font-medium transition-colors ${
                pathname === "/help/contact" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Translate text="common.contact">Contact</Translate>
            </Link>
            <Link
              href="/help/faq"
              className={`text-base font-medium transition-colors ${
                pathname === "/help/faq" ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Translate text="common.faq">FAQ</Translate>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium bg-custom-coral text-white hover:bg-custom-orange px-4 py-2 rounded-full"
            >
              <Translate text="common.login">Log in</Translate>
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Translate text="common.signup">Sign up</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

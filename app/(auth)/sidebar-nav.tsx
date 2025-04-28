"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Translate } from "@/components/translate"
import { BarChart3, Box, Home, PackageCheck, PackageOpen, Receipt, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { currentLanguage } = useLanguage()

  // Main navigation items
  const mainItems = [
    {
      title: <Translate text="sidebar.dashboard" />,
      href: "/dashboard",
      icon: Home,
      exact: true,
    },
    {
      title: <Translate text="sidebar.items" />,
      href: "/items",
      icon: Box,
      exact: false,
    },
    {
      title: <Translate text="sidebar.outgoing_orders" />,
      href: "/outgoing-orders",
      icon: PackageOpen,
      exact: false,
    },
    {
      title: <Translate text="sidebar.incoming_orders" />,
      href: "/incoming-orders",
      icon: PackageCheck,
      exact: false,
    },
    {
      title: <Translate text="sidebar.tax_return" />,
      href: "/tax-return",
      icon: Receipt,
      exact: false,
    },
    {
      title: <Translate text="sidebar.analytics" />,
      href: "/analytics",
      icon: BarChart3,
      exact: false,
    },
    {
      title: <Translate text="sidebar.profile" />,
      href: "/profile",
      icon: User,
      exact: false,
    },
    {
      title: <Translate text="sidebar.settings" />,
      href: "/settings",
      icon: Settings,
      exact: false,
    },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path
    }
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <nav className={cn("flex flex-col h-full", className)} {...props}>
      <div className="flex-1 space-y-1">
        {/* Main navigation items */}
        {mainItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/60 hover:text-primary",
              isActive(item.href, item.exact) ? "bg-white/70 text-primary shadow-sm" : "transparent",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Bottom section with logout and language selector */}
      <div className="pt-4 mt-auto border-t border-gray-200">
        <div className="flex items-center justify-between px-3 py-2">
          {/* Language selector */}
          <LanguageSelector variant="header" />
        </div>
      </div>
    </nav>
  )
}

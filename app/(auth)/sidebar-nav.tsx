"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Translate } from "@/components/translate"
import { BarChart3, Box, Home, PackageCheck, PackageOpen, Receipt, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const { currentLanguage } = useLanguage()

  const items = [
    {
      title: <Translate text="sidebar.dashboard" />,
      href: "/dashboard",
      icon: Home,
    },
    {
      title: <Translate text="sidebar.items" />,
      href: "/items",
      icon: Box,
    },
    {
      title: <Translate text="sidebar.outgoing_orders" />,
      href: "/outgoing-orders",
      icon: PackageOpen,
    },
    {
      title: <Translate text="sidebar.incoming_orders" />,
      href: "/incoming-orders",
      icon: PackageCheck,
    },
    {
      title: <Translate text="sidebar.tax_return" />,
      href: "/tax-return",
      icon: Receipt,
    },
    {
      title: <Translate text="sidebar.analytics" />,
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: <Translate text="sidebar.profile" />,
      href: "/profile",
      icon: User,
    },
    {
      title: <Translate text="sidebar.settings" />,
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/60 hover:text-primary",
            pathname === item.href ? "bg-white/70 text-primary shadow-sm" : "transparent",
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

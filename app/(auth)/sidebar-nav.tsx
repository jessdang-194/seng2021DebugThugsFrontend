"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Translate } from "@/components/translate"
import {
  Archive,
  BarChart3,
  Box,
  CheckSquare,
  Clock,
  Home,
  PackageCheck,
  PackageOpen,
  Receipt,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

  // Order management sections with sub-items
  const orderSections = [
    {
      title: <Translate text="sidebar.outgoing_orders" />,
      href: "/outgoing-orders",
      icon: PackageOpen,
      subItems: [
        {
          title: <Translate text="sidebar.create_order" />,
          href: "/outgoing-orders/create",
          icon: PackageOpen,
        },
        {
          title: <Translate text="sidebar.past_orders" />,
          href: "/outgoing-orders/past",
          icon: Archive,
        },
      ],
    },
    {
      title: <Translate text="sidebar.incoming_orders" />,
      href: "/incoming-orders",
      icon: PackageCheck,
      subItems: [
        {
          title: <Translate text="sidebar.pending_payment" />,
          href: "/incoming-orders/pending-payment",
          icon: Clock,
        },
        {
          title: <Translate text="sidebar.processing_orders" />,
          href: "/incoming-orders/processing",
          icon: CheckSquare,
        },
      ],
    },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path
    }
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
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

      {/* Divider */}
      <div className="my-2 border-t border-border/40"></div>

      {/* Order management sections with collapsible sub-items */}
      {orderSections.map((section) => (
        <div key={section.href} className="space-y-1">
          {/* Section header */}
          <Link
            href={section.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/60 hover:text-primary",
              isActive(section.href, true) ? "bg-white/70 text-primary shadow-sm" : "transparent",
            )}
          >
            <section.icon className="h-4 w-4" />
            <span>{section.title}</span>
          </Link>

          {/* Sub-items */}
          <div className="pl-4 space-y-1">
            {section.subItems.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-white/60 hover:text-primary",
                  isActive(subItem.href) ? "bg-white/50 text-primary" : "transparent",
                )}
              >
                <subItem.icon className="h-4 w-4" />
                <span>{subItem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

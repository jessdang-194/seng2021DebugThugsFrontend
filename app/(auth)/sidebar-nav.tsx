"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, FileText, Home, Package, Receipt, Settings, ShoppingBag, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Items",
    href: "/items",
    icon: Package,
  },
  {
    title: "Outgoing Orders",
    href: "/outgoing-orders",
    icon: ShoppingCart,
  },
  {
    title: "Incoming Orders",
    href: "/incoming-orders",
    icon: ShoppingBag,
  },
  {
    title: "Pending Payments",
    href: "/incoming-orders/pending-payment",
    icon: Receipt,
  },
  {
    title: "Processing Orders",
    href: "/incoming-orders/processing",
    icon: Package,
  },
  {
    title: "Tax Return",
    href: "/tax-return",
    icon: FileText,
  },
  {
    title: "Past Orders",
    href: "/outgoing-orders/past",
    icon: ShoppingCart,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {sidebarNavItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === item.href
                ? "bg-custom-lightBlue/10 text-custom-blue font-medium"
                : "text-muted-foreground hover:bg-custom-lightBlue/10 hover:text-custom-blue",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

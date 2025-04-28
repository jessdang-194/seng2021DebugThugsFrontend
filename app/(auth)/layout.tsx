"use client"

import type React from "react"
import Image from "next/image"

import { SidebarNav } from "@/app/(auth)/sidebar-nav"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    if (!isLoading && !user && !pathname.includes("/login") && !pathname.includes("/signup")) {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user && !pathname.includes("/login") && !pathname.includes("/signup")) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/paypath-logo.png"
            alt="PayPath Logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <span className="text-lg font-semibold tracking-tight">PayPath</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {user && (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          )}
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 mt-16 w-64 transform border-r bg-gradient-to-b from-custom-lavenderBlush/20 to-custom-purple/10 transition-transform duration-200 ease-in-out md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 p-4">
            <SidebarNav />
          </div>
        </aside>
        <main
          className={cn(
            "flex-1 p-4 md:p-6 transition-all duration-200 ease-in-out",
            isSidebarOpen ? "md:ml-64" : "md:ml-64",
          )}
        >
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

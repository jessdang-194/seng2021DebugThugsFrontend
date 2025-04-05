"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Show loading state or redirect if not authenticated
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-custom-lavender/30 via-white to-white">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-custom-purple border-r-custom-purple border-b-transparent border-l-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="text-xl font-semibold">ColorFusion Dashboard</div>
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}


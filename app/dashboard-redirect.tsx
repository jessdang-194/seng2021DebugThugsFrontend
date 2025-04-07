"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// This page redirects from /dashboard-redirect to /dashboard
export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the authenticated dashboard
    router.replace("/dashboard")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Redirecting to dashboard...</p>
    </div>
  )
}


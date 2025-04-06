"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// This page redirects from /submission/new to /submission-form
export default function SubmissionNewRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new path
    router.replace("/submission-form")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Redirecting to submission form...</p>
    </div>
  )
}


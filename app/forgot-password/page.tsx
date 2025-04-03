"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")

    console.log({ email })
    // Here you would typically handle password reset
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-custom-lavender/30 via-white to-white p-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="flex items-center gap-2 mb-8 text-custom-purple hover:text-custom-brightPurple transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Login
        </Link>

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted ? "Check your email for a reset link" : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-custom-coral hover:bg-custom-orange text-white">
                  Send reset link
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="pt-4 pb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                <p>We've sent a password reset link to your email.</p>
                <p className="text-sm mt-2">Please check your inbox and follow the instructions.</p>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-custom-purple hover:text-custom-brightPurple transition-colors font-medium"
                >
                  Return to login
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}


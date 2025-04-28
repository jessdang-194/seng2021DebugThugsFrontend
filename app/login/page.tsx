"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Translate } from "@/components/translate"

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setFormError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await login(email, password)

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
          variant: "default",
        })

        // Navigate after successful login
        router.push("/dashboard")
      } else {
        setFormError(result.message)
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-custom-lavender/30 via-white to-white p-4">
      <div className="w-full max-w-md">
        <header className="flex h-14 items-center px-4 lg:px-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/paypath-logo.png"
              alt="PayPath Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight">PayPath</span>
          </Link>
        </header>

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <Image
                src="/images/paypath-logo.png"
                alt="PayPath Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              <Translate text="common.login" />
            </CardTitle>
            <CardDescription className="text-center">
              <Translate text="common.welcome" />
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {formError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Translate text="auth.email" />
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="email"
                  className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    <Translate text="auth.password" />
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-custom-purple hover:text-custom-brightPurple transition-colors"
                  >
                    <Translate text="auth.forgot_password" />
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-custom-purple"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    <span className="sr-only">{isPasswordVisible ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-custom-purple focus:ring-custom-purple"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  <Translate text="auth.remember_me" />
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-custom-coral hover:bg-custom-orange text-white"
                variant="secondary"
                disabled={isLoading}
              >
                {isLoading ? <Translate text="auth.signing_in" /> : <Translate text="common.login" />}
              </Button>
              <div className="mt-4 text-center text-sm">
                <Translate text="auth.no_account" />{" "}
                <Link
                  href="/signup"
                  className="text-custom-purple hover:text-custom-brightPurple transition-colors font-medium"
                >
                  <Translate text="common.signup" />
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

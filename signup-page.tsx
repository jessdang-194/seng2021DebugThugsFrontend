"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EyeIcon, EyeOffIcon, GithubIcon, MailIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { LanguageSelector } from "@/components/language-selector"

export default function SignupPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const router = useRouter()
  const { signup } = useAuth()
  const { toast } = useToast()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setFormError("")

    const formData = new FormData(event.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const billingAddress = formData.get("billingAddress") as string

    try {
      const result = await signup({ firstName, lastName, username, email, password, billingAddress })

      if (result.success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
          variant: "default",
        })
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-lg font-semibold tracking-tight">PayPath</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSelector />
          </div>
        </header>

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your PayPath account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Textarea
                  id="billingAddress"
                  name="billingAddress"
                  required
                  className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  placeholder="Enter your billing address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    autoComplete="new-password"
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
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-custom-purple focus:ring-custom-purple"
                  required
                  defaultChecked
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-custom-purple hover:text-custom-brightPurple transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-custom-purple hover:text-custom-brightPurple transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-custom-coral hover:bg-custom-orange text-white"
                style={{ backgroundColor: "#F8885A", color: "white" }}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="border-custom-lavender/50 hover:bg-custom-lavender/10 hover:text-custom-purple"
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="border-custom-lavender/50 hover:bg-custom-lavender/10 hover:text-custom-purple"
                >
                  <MailIcon className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-custom-purple hover:text-custom-brightPurple transition-colors font-medium"
                >
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

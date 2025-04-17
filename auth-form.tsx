"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon, GithubIcon, MailIcon } from "lucide-react"

export default function AuthForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    console.log({ email, password, type: activeTab })
    // Here you would typically handle authentication
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to {activeTab === "login" ? "sign in to" : "create"} your account
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-login">Password</Label>
                    <Button variant="link" className="p-0 h-auto text-xs" type="button">
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password-login"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{isPasswordVisible ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded border-gray-300" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">
                  Sign in
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
                  <Button variant="outline" type="button">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" type="button">
                    <MailIcon className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" name="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <div className="relative">
                    <Input
                      id="password-signup"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{isPasswordVisible ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">
                  Create account
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
                  <Button variant="outline" type="button">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" type="button">
                    <MailIcon className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

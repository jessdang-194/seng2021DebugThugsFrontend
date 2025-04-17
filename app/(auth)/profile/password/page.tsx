"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ChangePasswordPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate password change
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "default",
      })
      setIsSubmitting(false)

      // Reset form
      const form = event.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Change Password</h1>

      <Card>
        <CardHeader>
          <CardTitle>Update Your Password</CardTitle>
          <CardDescription>Enter your current password and a new password to update your credentials</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
                className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include a mix of letters, numbers, and special
                characters.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Password Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use a unique password that you don't use for other accounts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include a mix of uppercase and lowercase letters, numbers, and symbols</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Avoid using easily guessable information like birthdays or names</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Consider using a password manager to generate and store strong passwords</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

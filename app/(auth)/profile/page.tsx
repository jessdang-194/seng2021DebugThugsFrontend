"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    billingAddress: user?.billingAddress || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the user profile here
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and billing address</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Textarea
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  className="min-h-[100px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-custom-purple hover:bg-custom-brightPurple text-white"
                style={{ backgroundColor: "#AD7CF2" }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Username</Label>
                <p className="font-medium">@{user?.username}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">User ID</Label>
                <p className="font-medium">{user?.id}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Account Type</Label>
              <p className="font-medium">Buyer & Seller</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

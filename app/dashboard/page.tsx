"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { FileText, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

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
    <div className="min-h-screen bg-gradient-to-br from-custom-lavender/30 via-white to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple flex items-center justify-center text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-custom-lavender/50 hover:bg-custom-lavender/10 hover:text-custom-purple"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">User ID:</span>
                  <span className="font-medium">{user.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-gray-500">
                <p>No recent activity to display</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-custom-coral hover:bg-custom-orange text-white">Edit Profile</Button>
              <Button
                variant="outline"
                className="w-full border-custom-lavender/50 hover:bg-custom-lavender/10 hover:text-custom-purple"
              >
                Change Password
              </Button>
              <Link href="/submission-form" className="block w-full">
                <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white">
                  <FileText className="mr-2 h-4 w-4" />
                  New Submission Order
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Color Palette</CardTitle>
              <CardDescription>Custom colors for your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { name: "Purple", hex: "#AD7CF2" },
                  { name: "Lavender", hex: "#B4A3E6" },
                  { name: "Bright Purple", hex: "#C85AED" },
                  { name: "Coral", hex: "#F8885A" },
                  { name: "Orange", hex: "#F98858" },
                ].map((color, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="h-16 rounded-t-lg" style={{ backgroundColor: color.hex }}></div>
                    <div className="bg-white p-2 rounded-b-lg border border-gray-100 text-center">
                      <p className="text-xs font-medium">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


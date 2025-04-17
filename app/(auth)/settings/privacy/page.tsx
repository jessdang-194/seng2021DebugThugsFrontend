"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function PrivacySettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Privacy settings state
  const [settings, setSettings] = useState({
    profileVisibility: true,
    activityTracking: true,
    dataSharing: false,
    thirdPartyIntegration: false,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Privacy Settings Updated",
        description: "Your privacy preferences have been saved.",
        variant: "default",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Settings</h1>
        <p className="text-muted-foreground">Manage how your information is used and shared</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Privacy Preferences</CardTitle>
            <CardDescription>Control your privacy settings and data sharing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profileVisibility" className="font-medium">
                    Profile Visibility
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow other users to view your profile information</p>
                </div>
                <Switch
                  id="profileVisibility"
                  checked={settings.profileVisibility}
                  onCheckedChange={() => handleToggle("profileVisibility")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activityTracking" className="font-medium">
                    Activity Tracking
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect data about how you use the platform to improve your experience
                  </p>
                </div>
                <Switch
                  id="activityTracking"
                  checked={settings.activityTracking}
                  onCheckedChange={() => handleToggle("activityTracking")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing" className="font-medium">
                    Data Sharing
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow us to share anonymized data with our partners</p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={settings.dataSharing}
                  onCheckedChange={() => handleToggle("dataSharing")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="thirdPartyIntegration" className="font-medium">
                    Third-Party Integrations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow third-party services to access your account information
                  </p>
                </div>
                <Switch
                  id="thirdPartyIntegration"
                  checked={settings.thirdPartyIntegration}
                  onCheckedChange={() => handleToggle("thirdPartyIntegration")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-custom-coral hover:bg-custom-orange text-white" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your personal data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Download Your Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You can request a copy of all the data we have stored about you.
            </p>
            <Button variant="outline">Request Data Export</Button>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2 text-red-600">Delete Your Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

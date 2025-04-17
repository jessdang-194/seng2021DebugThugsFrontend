import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" className="font-medium">
                  Marketing Emails
                </Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
              </div>
              <Switch id="marketingEmails" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activitySummary" className="font-medium">
                  Activity Summary
                </Label>
                <p className="text-sm text-muted-foreground">Receive weekly summary of your account activity</p>
              </div>
              <Switch id="activitySummary" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-custom-purple hover:bg-custom-brightPurple text-white">Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth" className="font-medium">
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch id="twoFactorAuth" />
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

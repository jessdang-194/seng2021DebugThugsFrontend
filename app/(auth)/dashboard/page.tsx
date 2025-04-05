import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, CreditCard, FileText, Home, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <Button
          variant="outline"
          className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
          asChild
        >
          <Link href="/main">
            <Home className="mr-2 h-4 w-4" />
            Back to Main
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-custom-coral hover:bg-custom-orange text-white" asChild>
              <Link href="/submission/new">
                <FileText className="mr-2 h-4 w-4" />
                New Submission
              </Link>
            </Button>
            <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white" asChild>
              <Link href="/main">
                <Activity className="mr-2 h-4 w-4" />
                View Submissions
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Submission Created", id: "SUB-1234-2023", date: "2 hours ago", status: "Pending" },
                { action: "Profile Updated", id: "", date: "Yesterday", status: "Completed" },
                { action: "Submission Approved", id: "SUB-9876-2023", date: "3 days ago", status: "Approved" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.id && <span className="mr-2">{activity.id}</span>}
                      {activity.date}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        activity.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette */}
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
  )
}


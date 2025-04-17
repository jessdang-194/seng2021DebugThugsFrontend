"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View insights and statistics about your submissions</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-custom-lavender/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-custom-purple data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="data-[state=active]:bg-custom-purple data-[state=active]:text-white"
          >
            Submissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-custom-purple data-[state=active]:text-white">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
                <CardDescription>Distribution of submission statuses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PieChart colors={["#AD7CF2", "#F8885A", "#C85AED"]} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Number of submissions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart color="#AD7CF2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Categories</CardTitle>
              <CardDescription>Distribution of submissions by category</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart colors={["#AD7CF2", "#F8885A", "#C85AED"]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your activity over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart color="#F8885A" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

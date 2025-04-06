import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function SubmissionPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Manage your submission orders</p>
        </div>
        <Link href="/submission/new">
          <Button className="bg-custom-coral hover:bg-custom-orange text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Submission
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common submission tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/submission/new" className="block">
              <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Submission
              </Button>
            </Link>
            <Link href="/submission/history" className="block">
              <Button
                variant="outline"
                className="w-full border-custom-lavender/50 hover:bg-custom-lavender/10 hover:text-custom-purple"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Previous Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Stats</CardTitle>
            <CardDescription>Overview of your submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Submissions</span>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Review</span>
                <span className="text-2xl font-bold text-amber-500">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-2xl font-bold text-green-500">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Rejected</span>
                <span className="text-2xl font-bold text-red-500">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Your most recent submission orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Reference</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Recipient</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">SUB-1234-2023</td>
                  <td className="py-3 px-4">Apr 2, 2023</td>
                  <td className="py-3 px-4">Acme Corp</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Approved
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="h-8 text-custom-purple">
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">SUB-5678-2023</td>
                  <td className="py-3 px-4">Mar 28, 2023</td>
                  <td className="py-3 px-4">XYZ Industries</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="h-8 text-custom-purple">
                      View
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">SUB-9012-2023</td>
                  <td className="py-3 px-4">Mar 15, 2023</td>
                  <td className="py-3 px-4">Global Services</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Rejected
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="h-8 text-custom-purple">
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


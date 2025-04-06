import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, FileText, Search } from "lucide-react"

export default function SubmissionHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Previous Submissions</h1>
        <p className="text-muted-foreground">View and manage your submission history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Submissions</CardTitle>
          <CardDescription>Filter your submission history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by reference or recipient..."
                  className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
              />
            </div>
          </div>
          <Button className="mt-4 bg-custom-purple hover:bg-custom-brightPurple text-white">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>All your previous submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Reference</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Recipient</th>
                  <th className="py-3 px-4 text-left font-medium">Documents</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    reference: "SUB-1234-2023",
                    date: "Apr 2, 2023",
                    recipient: "Acme Corp",
                    documents: 3,
                    status: "Approved",
                  },
                  {
                    reference: "SUB-5678-2023",
                    date: "Mar 28, 2023",
                    recipient: "XYZ Industries",
                    documents: 2,
                    status: "Pending",
                  },
                  {
                    reference: "SUB-9012-2023",
                    date: "Mar 15, 2023",
                    recipient: "Global Services",
                    documents: 5,
                    status: "Rejected",
                  },
                  {
                    reference: "SUB-3456-2023",
                    date: "Feb 22, 2023",
                    recipient: "Tech Solutions",
                    documents: 1,
                    status: "Approved",
                  },
                  {
                    reference: "SUB-7890-2023",
                    date: "Feb 10, 2023",
                    recipient: "Innovative Inc",
                    documents: 4,
                    status: "Approved",
                  },
                  {
                    reference: "SUB-2345-2023",
                    date: "Jan 28, 2023",
                    recipient: "Future Systems",
                    documents: 2,
                    status: "Approved",
                  },
                  {
                    reference: "SUB-6789-2023",
                    date: "Jan 15, 2023",
                    recipient: "Digital Dynamics",
                    documents: 3,
                    status: "Approved",
                  },
                ].map((submission, index) => (
                  <tr key={index} className={index < 6 ? "border-b" : ""}>
                    <td className="py-3 px-4">{submission.reference}</td>
                    <td className="py-3 px-4">{submission.date}</td>
                    <td className="py-3 px-4">{submission.recipient}</td>
                    <td className="py-3 px-4">{submission.documents}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          submission.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : submission.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 text-custom-purple">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-custom-purple">
                          <FileText className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


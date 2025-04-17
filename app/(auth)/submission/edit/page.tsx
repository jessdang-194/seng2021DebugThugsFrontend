"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Home } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Mock data for submissions
const mockSubmissions = [
  {
    id: "SUB-1234-2023",
    title: "Annual Financial Report",
    date: "Apr 2, 2023",
    recipient: "Acme Corp",
    status: "Approved",
  },
  {
    id: "SUB-5678-2023",
    title: "Marketing Materials",
    date: "Mar 28, 2023",
    recipient: "XYZ Industries",
    status: "Pending",
  },
  {
    id: "SUB-9012-2023",
    title: "Technical Documentation",
    date: "Mar 15, 2023",
    recipient: "Global Services",
    status: "Rejected",
  },
  {
    id: "SUB-3456-2023",
    title: "Legal Contract",
    date: "Feb 22, 2023",
    recipient: "Tech Solutions",
    status: "Approved",
  },
  {
    id: "SUB-7890-2023",
    title: "Product Specifications",
    date: "Feb 10, 2023",
    recipient: "Innovative Inc",
    status: "Approved",
  },
]

export default function EditSubmissionPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter submissions based on search term
  const filteredSubmissions = mockSubmissions.filter(
    (submission) =>
      submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Submission</h1>
          <p className="text-muted-foreground">Select a submission to edit</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Find Submission</CardTitle>
          <CardDescription>Search for the submission you want to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference number, title, or recipient..."
                className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.id}</TableCell>
                        <TableCell>{submission.title}</TableCell>
                        <TableCell>{submission.date}</TableCell>
                        <TableCell>{submission.recipient}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
                            asChild
                          >
                            <Link href={`/submission/edit/${submission.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No submissions found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

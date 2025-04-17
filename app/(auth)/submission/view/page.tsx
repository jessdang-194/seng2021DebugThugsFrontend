"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Filter,
  Search,
  Eye,
  Edit,
  XCircle,
  CheckCircle,
  Clock,
  LayoutGrid,
  LayoutList,
  ArrowUpDown,
  Home,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Mock data for submissions
const mockSubmissions = [
  {
    id: "SUB-1234-2023",
    title: "Annual Financial Report",
    category: "Financial",
    date: "2023-04-02",
    recipient: "Acme Corp",
    status: "approved",
    items: 3,
    total: "$1,250.00",
  },
  {
    id: "SUB-5678-2023",
    title: "Marketing Materials",
    category: "Marketing",
    date: "2023-03-28",
    recipient: "XYZ Industries",
    status: "pending",
    items: 2,
    total: "$850.00",
  },
  {
    id: "SUB-9012-2023",
    title: "Technical Documentation",
    category: "Technical",
    date: "2023-03-15",
    recipient: "Global Services",
    status: "rejected",
    items: 5,
    total: "$2,100.00",
  },
  {
    id: "SUB-3456-2023",
    title: "Legal Contract",
    category: "Legal",
    date: "2023-02-22",
    recipient: "Tech Solutions",
    status: "approved",
    items: 1,
    total: "$500.00",
  },
  {
    id: "SUB-7890-2023",
    title: "Product Specifications",
    category: "Technical",
    date: "2023-02-10",
    recipient: "Innovative Inc",
    status: "approved",
    items: 4,
    total: "$1,800.00",
  },
  {
    id: "SUB-2345-2023",
    title: "Quarterly Report",
    category: "Financial",
    date: "2023-01-15",
    recipient: "Finance Department",
    status: "pending",
    items: 2,
    total: "$950.00",
  },
]

export default function SubmissionViewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [viewMode, setViewMode] = useState("table")

  // Filter submissions based on search term, category, status, and date range
  const filteredSubmissions = mockSubmissions
    .filter(
      (submission) =>
        submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (submission) =>
        selectedCategory === "all" || submission.category.toLowerCase() === selectedCategory.toLowerCase(),
    )
    .filter(
      (submission) => selectedStatus === "all" || submission.status.toLowerCase() === selectedStatus.toLowerCase(),
    )

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  // Get status badge color and icon
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">View Submissions</h1>
          <p className="text-muted-foreground">Manage and track all your submission orders</p>
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

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          <CardDescription>Find specific submissions or filter by criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, title, or recipient..."
                className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px] border-custom-lavender/50">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Category</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px] border-custom-lavender/50">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-[150px] border-custom-lavender/50">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date Range</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-custom-lavender/50">
              <div className="flex items-center">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <span>
                  {sortBy === "date-desc"
                    ? "Newest First"
                    : sortBy === "date-asc"
                      ? "Oldest First"
                      : sortBy === "title-asc"
                        ? "Title (A-Z)"
                        : sortBy === "title-desc"
                          ? "Title (Z-A)"
                          : "Status"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-custom-purple hover:bg-custom-brightPurple" : ""}
          >
            <LayoutList className="h-4 w-4 mr-1" />
            Table
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-custom-purple hover:bg-custom-brightPurple" : ""}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Cards
          </Button>
        </div>
      </div>

      {/* Submissions Display */}
      {viewMode === "table" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubmissions.length > 0 ? (
                  sortedSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.id}</TableCell>
                      <TableCell>{submission.title}</TableCell>
                      <TableCell>{submission.recipient}</TableCell>
                      <TableCell>{format(new Date(submission.date), "MMM d, yyyy")}</TableCell>
                      <TableCell>{submission.items}</TableCell>
                      <TableCell>{submission.total}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                            <Link href={`/submission/view/${submission.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            disabled={submission.status === "approved"}
                            asChild
                          >
                            <Link href={`/submission/edit/${submission.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={submission.status === "approved" || submission.status === "rejected"}
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No submissions found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSubmissions.length > 0 ? (
            sortedSubmissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{submission.title}</CardTitle>
                      <CardDescription>{submission.id}</CardDescription>
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Recipient:</span>
                      <span className="font-medium">{submission.recipient}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{format(new Date(submission.date), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-medium">{submission.items}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">{submission.total}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/submission/view/${submission.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={submission.status === "approved"} asChild>
                      <Link href={`/submission/edit/${submission.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      disabled={submission.status === "approved" || submission.status === "rejected"}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No submissions found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

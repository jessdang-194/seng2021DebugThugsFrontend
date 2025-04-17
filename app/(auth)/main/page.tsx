"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bell,
  FileText,
  Filter,
  Info,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for submissions
const mockSubmissions = [
  {
    id: "SUB-1234-2023",
    title: "Annual Financial Report",
    category: "Financial",
    date: "2023-04-02",
    status: "approved",
  },
  {
    id: "SUB-5678-2023",
    title: "Marketing Materials",
    category: "Marketing",
    date: "2023-03-28",
    status: "pending",
  },
  {
    id: "SUB-9012-2023",
    title: "Technical Documentation",
    category: "Technical",
    date: "2023-03-15",
    status: "rejected",
  },
  {
    id: "SUB-3456-2023",
    title: "Legal Contract",
    category: "Legal",
    date: "2023-02-22",
    status: "approved",
  },
  {
    id: "SUB-7890-2023",
    title: "Product Specifications",
    category: "Technical",
    date: "2023-02-10",
    status: "approved",
  },
  {
    id: "SUB-2345-2023",
    title: "Quarterly Report",
    category: "Financial",
    date: "2023-01-15",
    status: "pending",
  },
]

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter submissions based on search term, category, date range, and status
  const filteredSubmissions = mockSubmissions
    .filter(
      (submission) =>
        submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (submission) =>
        selectedCategory === "all" || submission.category.toLowerCase() === selectedCategory.toLowerCase(),
    )
    .filter((submission) => {
      if (activeTab === "all") return true
      return submission.status === activeTab
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
          <h1 className="text-3xl font-bold tracking-tight">Main Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all your submissions</p>
        </div>
        <Link href="/submission-form">
          <Button className="bg-custom-coral hover:bg-custom-orange text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create New Submission
          </Button>
        </Link>
        <Link href="/submission/view" className="ml-2">
          <Button
            variant="outline"
            className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            View All Submissions
          </Button>
        </Link>
      </div>

      {/* Notifications Section */}
      <Alert className="bg-custom-purple/10 border-custom-purple/20">
        <AlertCircle className="h-4 w-4 text-custom-purple" />
        <AlertTitle className="text-custom-purple">New Updates</AlertTitle>
        <AlertDescription>
          You have 2 submissions awaiting review. Check your pending submissions for more details.
        </AlertDescription>
      </Alert>

      {/* Submission Guidelines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium">
            <Info className="mr-2 h-5 w-5 text-custom-purple" />
            Submission Guidelines
          </CardTitle>
          <CardDescription>Important information to ensure your submissions are processed correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>All submissions must include complete and accurate information.</li>
            <li>Supported file formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 25MB per file).</li>
            <li>Please allow up to 3 business days for submissions to be reviewed.</li>
            <li>For urgent submissions, please select the "Expedited" option during submission.</li>
            <li>Contact support if you need to make changes to an approved submission.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] border-custom-lavender/50">
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

          <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
            <SelectTrigger className="w-[180px] border-custom-lavender/50">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
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

      {/* Submission Status Tabs and Table */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-custom-purple data-[state=active]:text-white">
            All
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            Rejected
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
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
                      <TableCell>{submission.category}</TableCell>
                      <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            disabled={submission.status === "approved"}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No submissions found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white" asChild>
              <Link href="/submission-form">
                <FileText className="mr-2 h-4 w-4" />
                New Submission
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard">
                <Bell className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Submission Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-custom-purple/10 p-4 rounded-lg">
                <p className="text-3xl font-bold text-custom-purple">
                  {mockSubmissions.filter((s) => s.status === "approved").length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-lg">
                <p className="text-3xl font-bold text-amber-700">
                  {mockSubmissions.filter((s) => s.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-700">
                  {mockSubmissions.filter((s) => s.status === "rejected").length}
                </p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

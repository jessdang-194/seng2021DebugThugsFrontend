"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, FilePlus, Trash2, Home } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Define submission detail type
type SubmissionDetail = {
  id: string
  documentTitle: string
  description: string
  quantity: string
  referenceNumber: string
  submissionMethod: string
}

export default function SubmissionConfirmation() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionDetails, setSubmissionDetails] = useState<SubmissionDetail[]>([
    {
      id: "1",
      documentTitle: "",
      description: "",
      quantity: "",
      referenceNumber: "",
      submissionMethod: "",
    },
  ])

  // Generate a random reference number
  const generateReferenceNumber = () => {
    return `SUB-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}-${new Date().getFullYear()}`
  }

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Add a new submission detail row
  const addSubmissionDetail = () => {
    setSubmissionDetails([
      ...submissionDetails,
      {
        id: Date.now().toString(),
        documentTitle: "",
        description: "",
        quantity: "",
        referenceNumber: "",
        submissionMethod: "",
      },
    ])
  }

  // Remove a submission detail row
  const removeSubmissionDetail = (id: string) => {
    if (submissionDetails.length > 1) {
      setSubmissionDetails(submissionDetails.filter((detail) => detail.id !== id))
    }
  }

  // Update a submission detail field
  const updateSubmissionDetail = (id: string, field: keyof SubmissionDetail, value: string) => {
    setSubmissionDetails(submissionDetails.map((detail) => (detail.id === id ? { ...detail, [field]: value } : detail)))
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Submission Successful",
        description: "Your order has been submitted successfully.",
        variant: "default",
      })
      setIsSubmitting(false)
      router.push("/submission-confirmation")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
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
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-1 border-b pb-7">
          <CardTitle className="text-2xl font-bold text-center">Submission Order Confirmation</CardTitle>
          <CardDescription className="text-center">Please review and confirm your submission details</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* Reference and Date Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    name="referenceNumber"
                    defaultValue={generateReferenceNumber()}
                    placeholder="[Enter Reference Number]"
                    className="bg-gray-50 border-custom-lavender/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submissionDate">Date of Submission</Label>
                  <div className="relative">
                    <Input
                      id="submissionDate"
                      name="submissionDate"
                      type="date"
                      defaultValue={getCurrentDate()}
                      placeholder="[Enter Date]"
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Submitter Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Submitter Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="submitterName">Name of Submitter</Label>
                    <Input
                      id="submitterName"
                      name="submitterName"
                      placeholder="[Enter Full Name]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (if applicable)</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="[Enter Company Name, if applicable]"
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="submitterAddress">Address</Label>
                    <Textarea
                      id="submitterAddress"
                      name="submitterAddress"
                      placeholder="[Enter Address]"
                      required
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="submitterPhone">Phone Number</Label>
                    <Input
                      id="submitterPhone"
                      name="submitterPhone"
                      placeholder="[Enter Phone Number]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="submitterEmail">Email Address</Label>
                    <Input
                      id="submitterEmail"
                      name="submitterEmail"
                      type="email"
                      placeholder="[Enter Email Address]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Recipient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Name of Recipient/Department</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      placeholder="[Enter Recipient Name or Department]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientCompany">Company/Organization Name</Label>
                    <Input
                      id="recipientCompany"
                      name="recipientCompany"
                      placeholder="[Enter Recipient's Company Name]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="recipientAddress">Address</Label>
                    <Textarea
                      id="recipientAddress"
                      name="recipientAddress"
                      placeholder="[Enter Recipient's Address]"
                      required
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Phone Number</Label>
                    <Input
                      id="recipientPhone"
                      name="recipientPhone"
                      placeholder="[Enter Recipient's Phone Number]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail">Email Address</Label>
                    <Input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      placeholder="[Enter Recipient's Email Address]"
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Details Section */}
              <div>
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h3 className="text-lg font-medium">Submission Details</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSubmissionDetail}
                    className="border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Reference Number</TableHead>
                        <TableHead>Submission Method</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissionDetails.map((detail) => (
                        <TableRow key={detail.id}>
                          <TableCell>
                            <Input
                              value={detail.documentTitle}
                              onChange={(e) => updateSubmissionDetail(detail.id, "documentTitle", e.target.value)}
                              placeholder="Enter title"
                              required
                              className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.description}
                              onChange={(e) => updateSubmissionDetail(detail.id, "description", e.target.value)}
                              placeholder="Enter description"
                              className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.quantity}
                              onChange={(e) => updateSubmissionDetail(detail.id, "quantity", e.target.value)}
                              placeholder="Qty"
                              type="number"
                              min="1"
                              required
                              className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={detail.referenceNumber}
                              onChange={(e) => updateSubmissionDetail(detail.id, "referenceNumber", e.target.value)}
                              placeholder="Ref #"
                              className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={detail.submissionMethod}
                              onValueChange={(value) => updateSubmissionDetail(detail.id, "submissionMethod", value)}
                            >
                              <SelectTrigger className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="electronic">Electronic</SelectItem>
                                <SelectItem value="physical">Physical</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSubmissionDetail(detail.id)}
                              disabled={submissionDetails.length <= 1}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Acknowledgment Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Acknowledgment of Receipt</h3>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    This section will be completed upon receipt of your submission.
                  </p>
                </div>
              </div>

              {/* Office Use Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">For Office Use Only</h3>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600 italic">This section is reserved for official use.</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6 border-t">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="confirmAccuracy"
                required
                className="h-4 w-4 rounded border-gray-300 text-custom-purple focus:ring-custom-purple"
              />
              <Label htmlFor="confirmAccuracy" className="text-sm font-normal">
                I confirm that all information provided is accurate and complete.
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-custom-coral hover:bg-custom-orange text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


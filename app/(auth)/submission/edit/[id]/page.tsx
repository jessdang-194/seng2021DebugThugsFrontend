"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditSubmissionDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for the submission being edited
  const submissionData = {
    id: params.id,
    title: "Annual Financial Report",
    description: "Comprehensive financial report for the fiscal year 2023",
    category: "financial",
    quantity: "1",
    submitterName: "John Doe",
    submitterCompany: "Example Corp",
    submitterAddress: "123 Main St, Anytown, USA",
    submitterPhone: "555-123-4567",
    submitterEmail: "john.doe@example.com",
    recipientName: "Finance Department",
    recipientCompany: "Acme Corp",
    recipientAddress: "456 Business Ave, Corporate City, USA",
    recipientPhone: "555-987-6543",
    recipientEmail: "finance@acmecorp.com",
    deliveryMethod: "electronic",
    urgency: "standard",
    additionalInstructions: "Please ensure all financial statements are included in the final package.",
    submissionDate: "2023-04-02",
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Submission Updated",
        description: "Your submission has been updated successfully.",
        variant: "default",
      })
      setIsSubmitting(false)
      router.push("/submission/edit/confirmation")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-1 border-b pb-7">
          <CardTitle className="text-2xl font-bold text-center">Edit Submission</CardTitle>
          <CardDescription className="text-center">Update the details for submission {params.id}</CardDescription>
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
                    defaultValue={submissionData.id}
                    readOnly
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
                      defaultValue={submissionData.submissionDate}
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Document Details */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Document Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={submissionData.title}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={submissionData.description}
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={submissionData.category}>
                      <SelectTrigger
                        id="category"
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal Document</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      defaultValue={submissionData.quantity}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fileUpload">Replace Document</Label>
                    <div className="flex items-center">
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex items-center justify-center px-4 py-2 border border-custom-lavender/50 rounded-md hover:bg-custom-lavender/10"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Upload New File</span>
                        <input id="fileUpload" type="file" className="hidden" />
                      </label>
                      <p className="ml-4 text-sm text-muted-foreground">Current file: financial-report-2023.pdf</p>
                    </div>
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
                      defaultValue={submissionData.submitterName}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (if applicable)</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      defaultValue={submissionData.submitterCompany}
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="submitterAddress">Address</Label>
                    <Textarea
                      id="submitterAddress"
                      name="submitterAddress"
                      defaultValue={submissionData.submitterAddress}
                      required
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="submitterPhone">Phone Number</Label>
                    <Input
                      id="submitterPhone"
                      name="submitterPhone"
                      defaultValue={submissionData.submitterPhone}
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
                      defaultValue={submissionData.submitterEmail}
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
                      defaultValue={submissionData.recipientName}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientCompany">Company/Organization Name</Label>
                    <Input
                      id="recipientCompany"
                      name="recipientCompany"
                      defaultValue={submissionData.recipientCompany}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="recipientAddress">Address</Label>
                    <Textarea
                      id="recipientAddress"
                      name="recipientAddress"
                      defaultValue={submissionData.recipientAddress}
                      required
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Phone Number</Label>
                    <Input
                      id="recipientPhone"
                      name="recipientPhone"
                      defaultValue={submissionData.recipientPhone}
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
                      defaultValue={submissionData.recipientEmail}
                      required
                      className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Method */}
              <div>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Submission Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryMethod">Preferred Delivery Method</Label>
                    <Select defaultValue={submissionData.deliveryMethod}>
                      <SelectTrigger
                        id="deliveryMethod"
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      >
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronic">Electronic Delivery</SelectItem>
                        <SelectItem value="physical">Physical Delivery</SelectItem>
                        <SelectItem value="both">Both Electronic and Physical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select defaultValue={submissionData.urgency}>
                      <SelectTrigger
                        id="urgency"
                        className="border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                      >
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (3-5 business days)</SelectItem>
                        <SelectItem value="expedited">Expedited (1-2 business days)</SelectItem>
                        <SelectItem value="urgent">Urgent (24 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="additionalInstructions">Additional Instructions</Label>
                    <Textarea
                      id="additionalInstructions"
                      name="additionalInstructions"
                      defaultValue={submissionData.additionalInstructions}
                      className="min-h-[80px] border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                    />
                  </div>
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
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


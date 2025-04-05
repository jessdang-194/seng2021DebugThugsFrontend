"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, Home } from "lucide-react"
import Link from "next/link"

export default function EditConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Update Successful!</CardTitle>
          <CardDescription className="text-lg">Your submission has been updated successfully</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-medium mb-4 text-center">Update Confirmation</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Reference Number:</p>
                  <p className="font-medium">SUB-1234-2023</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Update:</p>
                  <p className="font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Status:</p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Updated Successfully</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-custom-purple/10 p-4 rounded-lg">
            <p className="text-center text-sm">
              A confirmation email has been sent to your registered email address with all the updated details.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 text-center">What would you like to do next?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-custom-purple text-custom-purple hover:bg-custom-purple hover:text-white"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
              <Link href="/submission/history">
                <Button className="w-full sm:w-auto bg-custom-coral hover:bg-custom-orange text-white">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Submissions
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-xs text-gray-500">If you have any questions, please contact our support team.</p>
        </CardFooter>
      </Card>
    </div>
  )
}


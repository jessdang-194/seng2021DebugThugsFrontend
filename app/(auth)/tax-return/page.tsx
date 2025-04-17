"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getOrdersBySellerId } from "@/models/order"
import { Download, FileText, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TaxReturnPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [completedOrders, setCompletedOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  // Get available years
  const years = Array.from(new Set([...Array(5)].map((_, i) => (new Date().getFullYear() - i).toString())))

  useEffect(() => {
    if (user) {
      // Load orders from localStorage
      const sellerOrders = getOrdersBySellerId(user.id)

      // Filter completed orders
      const completed = sellerOrders.filter((order) => order.status === "completed")

      setCompletedOrders(completed)
      setIsLoading(false)
    }
  }, [user])

  // Filter orders based on search term and year
  const filteredOrders = completedOrders.filter((order) => {
    const orderYear = new Date(order.createdAt).getFullYear().toString()

    return (
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerUsername.toLowerCase().includes(searchTerm.toLowerCase())) &&
      orderYear === selectedYear
    )
  })

  // Calculate totals
  const totalSales = filteredOrders.reduce((sum, order) => sum + order.subtotal, 0)
  const totalGST = filteredOrders.reduce((sum, order) => sum + order.gst, 0)
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)

  const handleDownloadTaxReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your tax report has been downloaded successfully.",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Return</h1>
          <p className="text-muted-foreground">View and download your tax records</p>
        </div>
        <Button
          className="bg-custom-purple hover:bg-custom-brightPurple text-white"
          style={{ backgroundColor: "#AD7CF2" }}
          onClick={handleDownloadTaxReport}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Tax Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Records for {selectedYear}</CardTitle>
          <CardDescription>View your completed sales for tax purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-md border border-input bg-background"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-muted-foreground">Loading tax records...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead>GST (10%)</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.buyerUsername}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>${order.subtotal.toFixed(2)}</TableCell>
                        <TableCell>${order.gst.toFixed(2)}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:text-custom-purple hover:border-custom-purple"
                            asChild
                          >
                            <Link href={`/incoming-orders/${order.id}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Summary for {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-custom-skyBlue p-4 rounded-lg">
                      <p className="text-sm text-blue-600">Total Sales (excl. GST)</p>
                      <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
                    </div>
                    <div className="bg-custom-paleGreen p-4 rounded-lg">
                      <p className="text-sm text-green-600">Total GST Collected</p>
                      <p className="text-2xl font-bold">${totalGST.toFixed(2)}</p>
                    </div>
                    <div className="bg-custom-lavenderBlush p-4 rounded-lg">
                      <p className="text-sm text-purple-600">Total Revenue (incl. GST)</p>
                      <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tax records found for {selectedYear}.</p>
              <p className="text-sm text-muted-foreground mt-2">
                When orders are completed, they will appear here for tax purposes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

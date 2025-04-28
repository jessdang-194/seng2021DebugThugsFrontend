"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getCompletedOrdersByBuyerId } from "@/models/order"
import { Copy, Search, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TaxReturnPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [completedOrders, setCompletedOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [xmlContent, setXmlContent] = useState("")

  // Get available years
  const years = Array.from(new Set([...Array(5)].map((_, i) => (new Date().getFullYear() - i).toString())))

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setIsLoading(true)
          // Load completed orders for the buyer
          const buyerCompletedOrders = await getCompletedOrdersByBuyerId(user.id)

          // Ensure we have an array
          setCompletedOrders(Array.isArray(buyerCompletedOrders) ? buyerCompletedOrders : [])
        } catch (error) {
          console.error("Error fetching completed orders:", error)
          toast({
            title: "Error",
            description: "Failed to load tax records. Please try again later.",
            variant: "destructive",
          })
          setCompletedOrders([])
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchOrders()
  }, [user, toast])

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

  // Generate XML content for all purchase records
  const generateXmlContent = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<taxReports year="${selectedYear}">
  <buyer>
    <name>${user?.firstName} ${user?.lastName}</name>
    <username>${user?.username}</username>
    <email>${user?.email}</email>
    <billingAddress>${user?.billingAddress}</billingAddress>
  </buyer>
  <purchaseRecords>
${filteredOrders
  .map(
    (order) => `    <purchaseRecord>
      <orderId>${order.id}</orderId>
      <date>${new Date(order.createdAt).toLocaleDateString()}</date>
      <seller>
        <username>${order.sellerUsername}</username>
        <billingAddress>123 Seller Street, Seller City</billingAddress>
        <abn>12 345 678 901</abn>
        <bankDetails>
          <bsb>123-456</bsb>
          <accountNumber>12345678</accountNumber>
        </bankDetails>
      </seller>
      <items>
${
  order.items && Array.isArray(order.items)
    ? order.items
        .map(
          (item) => `        <item>
          <name>${item.name}</name>
          <quantity>${item.quantity}</quantity>
          <pricePerUnit>${item.pricePerUnit.toFixed(2)}</pricePerUnit>
          <total>${(item.quantity * item.pricePerUnit).toFixed(2)}</total>
        </item>`,
        )
        .join("\n")
    : ""
}
      </items>
      <subtotal>${order.subtotal.toFixed(2)}</subtotal>
      <gst>${order.gst.toFixed(2)}</gst>
      <total>${order.total.toFixed(2)}</total>
    </purchaseRecord>`,
  )
  .join("\n")}
  </purchaseRecords>
  <summary>
    <totalPurchases>${totalSales.toFixed(2)}</totalPurchases>
    <totalGST>${totalGST.toFixed(2)}</totalGST>
    <totalExpenses>${totalRevenue.toFixed(2)}</totalExpenses>
  </summary>
</taxReports>`

    setXmlContent(xml)
  }

  const copyXmlToClipboard = () => {
    navigator.clipboard.writeText(xmlContent)
    toast({
      title: "Copied to clipboard",
      description: "Tax reports XML has been copied to clipboard",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Tax Records</h1>
          <p className="text-muted-foreground">View and download your purchase records for tax purposes</p>
        </div>
        <Dialog onOpenChange={() => generateXmlContent()}>
          <DialogTrigger asChild>
            <Button
              className="bg-custom-purple hover:bg-custom-brightPurple text-white"
              style={{ backgroundColor: "#AD7CF2" }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Tax Reports XML
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tax Reports XML for {selectedYear}</DialogTitle>
              <DialogDescription>Copy this XML data for your tax reporting purposes</DialogDescription>
            </DialogHeader>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-[400px] whitespace-pre-wrap">
                {xmlContent}
              </pre>
              <Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={copyXmlToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Records for {selectedYear}</CardTitle>
          <CardDescription>View your completed purchases for tax purposes</CardDescription>
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
                      <TableHead>Seller</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead>GST (10%)</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/outgoing-orders/details/${order.id}`}
                            className="text-custom-purple hover:underline"
                          >
                            {order.id}
                          </Link>
                        </TableCell>
                        <TableCell>{order.sellerUsername}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>${order.subtotal.toFixed(2)}</TableCell>
                        <TableCell>${order.gst.toFixed(2)}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
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
                      <p className="text-sm text-blue-600">Total Purchases (excl. GST)</p>
                      <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
                    </div>
                    <div className="bg-custom-paleGreen p-4 rounded-lg">
                      <p className="text-sm text-green-600">Total GST Paid</p>
                      <p className="text-2xl font-bold">${totalGST.toFixed(2)}</p>
                    </div>
                    <div className="bg-custom-lavenderBlush p-4 rounded-lg">
                      <p className="text-sm text-purple-600">Total Expenses (incl. GST)</p>
                      <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No purchase records found for {selectedYear}.</p>
              <p className="text-sm text-muted-foreground mt-2">
                When your purchases are completed, they will appear here for tax purposes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

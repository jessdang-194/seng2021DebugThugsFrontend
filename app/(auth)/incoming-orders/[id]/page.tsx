"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { createInvoiceFromOrder, getInvoiceByOrderId, saveInvoice } from "@/models/invoice"
import { getOrderById, updateOrderStatus } from "@/models/order"
import { ArrowLeft, CheckCircle, CreditCard, Copy, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [invoice, setInvoice] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isXmlDialogOpen, setIsXmlDialogOpen] = useState(false)

  // Function to convert order to XML format
  const getOrderXml = () => {
    if (!order) return ""

    // Create items XML
    const itemsXml =
      order.items && Array.isArray(order.items)
        ? order.items
            .map(
              (item: any) =>
                `    <item>
      <name>${item.name}</name>
      <quantity>${item.quantity}</quantity>
      <pricePerUnit>${item.pricePerUnit.toFixed(2)}</pricePerUnit>
      <total>${(item.quantity * item.pricePerUnit).toFixed(2)}</total>
    </item>`,
            )
            .join("\n")
        : ""

    // Create full XML
    return `<?xml version="1.0" encoding="UTF-8"?>
<order>
  <id>${order.id}</id>
  <createdAt>${new Date(order.createdAt).toISOString()}</createdAt>
  <status>${order.status}</status>
  <buyerUsername>${order.buyerUsername}</buyerUsername>
  <sellerUsername>${order.sellerUsername}</sellerUsername>
  <shippingAddress>${order.shippingAddress}</shippingAddress>
  <items>
${itemsXml}
  </items>
  <subtotal>${order.subtotal.toFixed(2)}</subtotal>
  <gst>${order.gst.toFixed(2)}</gst>
  <total>${order.total.toFixed(2)}</total>
</order>`
  }

  // Function to copy XML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(getOrderXml())
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        toast({
          title: "Copied to clipboard",
          description: "The XML has been copied to your clipboard.",
          variant: "default",
        })
      })
      .catch((error) => {
        toast({
          title: "Copy failed",
          description: "Failed to copy XML to clipboard.",
          variant: "destructive",
        })
      })
  }

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true)
        // Load order data
        const orderData = await getOrderById(params.id)

        if (!orderData) {
          toast({
            title: "Error",
            description: "Order not found",
            variant: "destructive",
          })
          router.push("/incoming-orders")
          return
        }

        setOrder(orderData)

        // Check if invoice exists
        const invoiceData = await getInvoiceByOrderId(params.id)
        if (invoiceData) {
          setInvoice(invoiceData)
        }
      } catch (error) {
        console.error("Error fetching order data:", error)
        toast({
          title: "Error",
          description: "Failed to load order details. Please try again later.",
          variant: "destructive",
        })
        router.push("/incoming-orders")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderData()
  }, [params.id, router, toast])

  const handleApprovePayment = async () => {
    if (!order) return

    setIsProcessing(true)

    try {
      // Create invoice if it doesn't exist
      if (!invoice) {
        const newInvoice = await createInvoiceFromOrder(
          order,
          order.buyerUsername,
          "buyer@example.com", // In a real app, you'd have the buyer's email
        )

        // Save invoice
        await saveInvoice(newInvoice)
        setInvoice(newInvoice)
      }

      // Update order status
      await updateOrderStatus(order.id, "pending")

      // Update local state
      setOrder({ ...order, status: "pending" })

      // Show success message
      toast({
        title: "Payment Approved",
        description: "The payment has been approved and the order is now being processed.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to approve payment",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCompleteOrder = async () => {
    if (!order) return

    setIsProcessing(true)

    try {
      // Update order status
      await updateOrderStatus(order.id, "completed")

      // Update local state
      setOrder({ ...order, status: "completed" })

      // Show success message
      toast({
        title: "Order Completed",
        description: "The order has been marked as completed.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete order",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleViewXml = () => {
    setIsXmlDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2 text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Order not found.</p>
        <Link href="/incoming-orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/incoming-orders" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">View and manage order {order.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order Information</CardTitle>
              <Button variant="outline" size="sm" onClick={handleViewXml}>
                <FileText className="h-3.5 w-3.5 mr-1" />
                XML
              </Button>
            </div>
            <CardDescription>Details about this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="font-medium">
                {order.status === "unpaid" && <Badge variant="orange">Unpaid</Badge>}
                {order.status === "pending" && <Badge variant="purple">Pending</Badge>}
                {order.status === "completed" && <Badge variant="brightPurple">Completed</Badge>}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Buyer</p>
              <p className="font-medium">{order.buyerUsername}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="font-medium">{order.shippingAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Actions</CardTitle>
            <CardDescription>Manage this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.status === "unpaid" && (
              <Button
                className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white"
                onClick={handleApprovePayment}
                disabled={isProcessing}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isProcessing ? "Processing..." : "Approve Payment"}
              </Button>
            )}

            {order.status === "pending" && (
              <Button
                className="w-full bg-custom-coral hover:bg-custom-orange text-white"
                onClick={handleCompleteOrder}
                disabled={isProcessing}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items included in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items && Array.isArray(order.items) ? (
                order.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.pricePerUnit.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.pricePerUnit).toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Subtotal:
                </TableCell>
                <TableCell className="font-medium">${order.subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  GST (10%):
                </TableCell>
                <TableCell className="font-medium">${order.gst.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Total:
                </TableCell>
                <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* XML Dialog */}
      <Dialog open={isXmlDialogOpen} onOpenChange={setIsXmlDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order XML</DialogTitle>
            <DialogDescription>XML representation of the order data</DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[400px] overflow-auto">
            <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">{getOrderXml()}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

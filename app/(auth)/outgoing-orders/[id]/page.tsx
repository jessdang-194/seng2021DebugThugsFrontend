"use client"

import { CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { getInvoiceByOrderId } from "@/models/invoice"
import { getOrderById } from "@/models/order"
import { ArrowLeft, Printer, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateOrderStatus } from "@/models/order"
import { Badge } from "@/components/ui/badge"

export default function OutgoingOrderDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [invoice, setInvoice] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load order data
    const orderData = getOrderById(params.id)

    if (!orderData) {
      toast({
        title: "Error",
        description: "Order not found",
        variant: "destructive",
      })
      router.push("/outgoing-orders")
      return
    }

    setOrder(orderData)

    // Check if invoice exists
    const invoiceData = getInvoiceByOrderId(params.id)
    if (invoiceData) {
      setInvoice(invoiceData)
    }

    setIsLoading(false)
  }, [params.id, router, toast])

  const handlePrintInvoice = () => {
    toast({
      title: "Printing Invoice",
      description: "The invoice is being prepared for printing.",
      variant: "default",
    })
    // In a real app, this would trigger the print dialog
  }

  const handlePayForOrder = () => {
    if (!order) return

    try {
      // Update order status to pending (paid)
      updateOrderStatus(order.id, "pending")

      // Update local state
      setOrder({ ...order, status: "pending" })

      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        variant: "default",
      })

      // Refresh the page to show updated status
      router.refresh()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      })
    }
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
        <Link href="/outgoing-orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/outgoing-orders" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">View your order {order.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
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
              <p className="font-medium">
                {order.status === "unpaid" && <Badge variant="orange">Unpaid</Badge>}
                {order.status === "pending" && <Badge variant="purple">Pending</Badge>}
                {order.status === "completed" && <Badge variant="brightPurple">Completed</Badge>}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Seller</p>
              <p className="font-medium">{order.sellerUsername}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="font-medium">{order.shippingAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Current status of your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Order Placed</p>
                <p className="text-sm text-green-600">✓ Completed</p>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Payment</p>
                <p className="text-sm text-green-600">
                  {order.status === "unpaid" ? "Awaiting Payment" : "✓ Completed"}
                </p>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-green-500 ${order.status === "unpaid" ? "w-0" : "w-full"}`}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Processing</p>
                <p className="text-sm text-green-600">
                  {order.status === "unpaid" ? "Pending" : order.status === "pending" ? "In Progress" : "✓ Completed"}
                </p>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-green-500 ${
                    order.status === "unpaid" ? "w-0" : order.status === "pending" ? "w-1/2" : "w-full"
                  }`}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Completed</p>
                <p className="text-sm text-green-600">{order.status === "completed" ? "✓ Completed" : "Pending"}</p>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-green-500 ${order.status === "completed" ? "w-full" : "w-0"}`}></div>
              </div>
            </div>

            <div className="mt-4">
              {order.status === "unpaid" && (
                <Button
                  onClick={handlePayForOrder}
                  className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              )}
            </div>
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
              {order.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.pricePerUnit.toFixed(2)}</TableCell>
                  <TableCell>${(item.quantity * item.pricePerUnit).toFixed(2)}</TableCell>
                </TableRow>
              ))}
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

      {invoice && (
        <Card>
          <CardHeader>
            <CardTitle>Invoice</CardTitle>
            <CardDescription>Invoice details for this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice ID</p>
                  <p className="font-medium">{invoice.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bill To</p>
                <p className="font-medium">{invoice.billTo.name}</p>
                <p className="text-sm">{invoice.billTo.address}</p>
                <p className="text-sm">{invoice.billTo.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handlePrintInvoice}>
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

"use client"

import { CardFooter } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { getInvoiceByOrderId } from "@/models/invoice"
import { getOrderById } from "@/models/order"
import { ArrowLeft, Printer, CreditCard, FileCode, Copy } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import type { User } from "@/lib/auth-context"
import type { Order } from "@/models/order"

export default function OutgoingOrderDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const { getUserById } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [invoice, setInvoice] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isXmlDialogOpen, setIsXmlDialogOpen] = useState(false)
  const [sellerDetails, setSellerDetails] = useState<User | null>(null)
  const [orderXml, setOrderXml] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)

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
          router.push("/outgoing-orders")
          return
        }

        setOrder(orderData)

        // Fetch seller details
        if (orderData.sellerId) {
          try {
            const seller = await getUserById(orderData.sellerId)
            if (seller) {
              setSellerDetails(seller)
            } else {
              console.error("Seller not found:", orderData.sellerId)
              toast({
                title: "Warning",
                description: "Seller information could not be loaded",
                variant: "default",
              })
            }
          } catch (error) {
            console.error("Error fetching seller details:", error)
          }
        }

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderData()
  }, [params.id, router, toast, getUserById])

  const handlePrintInvoice = () => {
    toast({
      title: "Printing Invoice",
      description: "The invoice is being prepared for printing.",
      variant: "default",
    })
    // In a real app, this would trigger the print dialog
  }

  const handlePayForOrder = () => {
    // Open the payment dialog instead of immediately processing payment
    setIsPaymentDialogOpen(true)
  }

  const confirmPayment = () => {
    if (!order) return

    try {
      // Instead of updating the order status, just show a success message
      toast({
        title: "Payment Initiated",
        description: "Your payment has been initiated. Please complete the bank transfer using the provided details.",
        variant: "default",
      })

      // Close the dialog
      setIsPaymentDialogOpen(false)
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      })
    }
  }

  // Function to convert order data to XML format
  const convertOrderToXml = () => {
    if (!order) return ""

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += "<Order>\n"
    xml += `  <OrderID>${order.id}</OrderID>\n`
    xml += `  <CreatedAt>${order.createdAt}</CreatedAt>\n`
    xml += `  <Status>${order.status}</Status>\n`

    // Buyer information
    xml += "  <Buyer>\n"
    xml += `    <Username>${order.buyerUsername}</Username>\n`
    xml += `    <ID>${order.buyerId}</ID>\n`
    xml += "  </Buyer>\n"

    // Seller information
    xml += "  <Seller>\n"
    xml += `    <Username>${order.sellerUsername}</Username>\n`
    xml += `    <ID>${order.sellerId}</ID>\n`
    xml += "  </Seller>\n"

    // Shipping address
    xml += `  <ShippingAddress>${order.shippingAddress}</ShippingAddress>\n`

    // Items
    xml += "  <Items>\n"
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item) => {
        xml += "    <Item>\n"
        xml += `      <Name>${item.name}</Name>\n`
        xml += `      <Quantity>${item.quantity}</Quantity>\n`
        xml += `      <PricePerUnit>${item.pricePerUnit.toFixed(2)}</PricePerUnit>\n`
        xml += `      <TotalPrice>${(item.quantity * item.pricePerUnit).toFixed(2)}</TotalPrice>\n`
        xml += "    </Item>\n"
      })
    }
    xml += "  </Items>\n"

    // Financial summary
    xml += "  <FinancialSummary>\n"
    xml += `    <Subtotal>${order.subtotal.toFixed(2)}</Subtotal>\n`
    xml += `    <GST>${order.gst.toFixed(2)}</GST>\n`
    xml += `    <Total>${order.total.toFixed(2)}</Total>\n`
    xml += "  </FinancialSummary>\n"

    xml += "</Order>"

    return xml
  }

  const handleViewXml = () => {
    const xml = convertOrderToXml()
    setOrderXml(xml)
    setIsXmlDialogOpen(true)
  }

  const handleCopyXml = () => {
    navigator.clipboard.writeText(orderXml)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "The XML has been copied to your clipboard.",
      variant: "default",
    })
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Order Information</CardTitle>
              <CardDescription>Details about this order</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleViewXml}>
              <FileCode className="mr-2 h-4 w-4" />
              View XML
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
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
              {order.items && Array.isArray(order.items) ? (
                order.items.map((item, index) => (
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

      {/* Payment Confirmation Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>Please review the order details before confirming your payment.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Order Summary</h3>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <p className="text-muted-foreground">Order ID:</p>
                <p>{order?.id}</p>
                <p className="text-muted-foreground">Date:</p>
                <p>{order ? new Date(order.createdAt).toLocaleDateString() : ""}</p>
                <p className="text-muted-foreground">Seller:</p>
                <p>{order?.sellerUsername}</p>
                <p className="text-muted-foreground">Subtotal:</p>
                <p>${order?.subtotal.toFixed(2)}</p>
                <p className="text-muted-foreground">GST (10%):</p>
                <p>${order?.gst.toFixed(2)}</p>
                <p className="text-muted-foreground font-medium">Total:</p>
                <p className="font-medium">${order?.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Seller's Billing Information</h3>
              {sellerDetails ? (
                <div className="text-sm">
                  <p className="font-medium">
                    {sellerDetails.companyName ||
                      (sellerDetails.firstName && sellerDetails.lastName
                        ? `${sellerDetails.firstName} ${sellerDetails.lastName}`
                        : order.sellerUsername)}
                  </p>
                  <p>{sellerDetails.billingAddress || "No billing address provided"}</p>
                  {sellerDetails.abn && <p>ABN: {sellerDetails.abn}</p>}
                  {sellerDetails.bsb && sellerDetails.accountNumber && (
                    <div className="mt-2">
                      <p className="font-medium">Banking Details:</p>
                      <p>BSB: {sellerDetails.bsb}</p>
                      <p>Account Number: {sellerDetails.accountNumber}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Seller information not available. Please contact customer support.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Payment Information</h3>
              <p className="text-sm text-muted-foreground">
                Your payment should be sent to the seller at the billing address shown above. The seller will need to
                approve the payment has been received before the order is processed. Please keep a copy of this
                information for your records.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPayment} className="bg-custom-purple hover:bg-custom-brightPurple text-white">
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* XML Dialog */}
      <Dialog open={isXmlDialogOpen} onOpenChange={setIsXmlDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order XML</DialogTitle>
            <DialogDescription>XML representation of the order data</DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[400px] overflow-auto">
            <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">{orderXml}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCopyXml}>
              <Copy className="h-4 w-4 mr-2" />
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import {
  getOrdersBySellerId,
  getPendingOrdersBySellerId,
  getUnpaidOrdersBySellerId,
  updateOrderStatus,
} from "@/models/order"
import { createInvoiceFromOrder, saveInvoice } from "@/models/invoice"
import { CheckCircle, CreditCard, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function IncomingOrdersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [allOrders, setAllOrders] = useState<any[]>([])
  const [pendingOrders, setPendingOrders] = useState<any[]>([])
  const [unpaidOrders, setUnpaidOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [processingSearchTerm, setProcessingSearchTerm] = useState("")
  const [pendingPaymentSearchTerm, setPendingPaymentSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null)
  const [processingPaymentOrderId, setProcessingPaymentOrderId] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setIsLoading(true)
          // Load orders from Redis
          const sellerOrders = await getOrdersBySellerId(user.id)
          const sellerPendingOrders = await getPendingOrdersBySellerId(user.id)
          const sellerUnpaidOrders = await getUnpaidOrdersBySellerId(user.id)

          // Ensure we have arrays
          setAllOrders(Array.isArray(sellerOrders) ? sellerOrders : [])
          setPendingOrders(Array.isArray(sellerPendingOrders) ? sellerPendingOrders : [])
          setUnpaidOrders(Array.isArray(sellerUnpaidOrders) ? sellerUnpaidOrders : [])
        } catch (error) {
          console.error("Error fetching orders:", error)
          toast({
            title: "Error",
            description: "Failed to load orders. Please try again later.",
            variant: "destructive",
          })
          // Initialize with empty arrays on error
          setAllOrders([])
          setPendingOrders([])
          setUnpaidOrders([])
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchOrders()
  }, [user, toast])

  // Filter orders based on search term
  const filteredOrders = allOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerUsername.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter pending orders based on search term
  const filteredPendingOrders = pendingOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(processingSearchTerm.toLowerCase()) ||
      order.buyerUsername.toLowerCase().includes(processingSearchTerm.toLowerCase()),
  )

  // Filter unpaid orders based on search term
  const filteredUnpaidOrders = unpaidOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(pendingPaymentSearchTerm.toLowerCase()) ||
      order.buyerUsername.toLowerCase().includes(pendingPaymentSearchTerm.toLowerCase()),
  )

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unpaid":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Unpaid
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            Pending
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Completed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            Unknown
          </span>
        )
    }
  }

  const handleCompleteOrder = async (orderId: string) => {
    setProcessingOrderId(orderId)

    try {
      // Update order status
      await updateOrderStatus(orderId, "completed")

      // Update local state
      setPendingOrders(pendingOrders.filter((o) => o.id !== orderId))

      // Refresh all orders
      if (user) {
        const sellerOrders = await getOrdersBySellerId(user.id)
        setAllOrders(Array.isArray(sellerOrders) ? sellerOrders : [])
      }

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
      setProcessingOrderId(null)
    }
  }

  const handleApprovePayment = async (orderId: string) => {
    setProcessingPaymentOrderId(orderId)

    try {
      // Get the order
      const order = unpaidOrders.find((o) => o.id === orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Create invoice
      const invoice = await createInvoiceFromOrder(order, `${user?.firstName} ${user?.lastName}`, user?.email || "")

      // Save invoice
      await saveInvoice(invoice)

      // Update order status
      await updateOrderStatus(orderId, "pending")

      // Update local state
      setUnpaidOrders(unpaidOrders.filter((o) => o.id !== orderId))

      // Refresh all orders and pending orders
      if (user) {
        const sellerOrders = await getOrdersBySellerId(user.id)
        const sellerPendingOrders = await getPendingOrdersBySellerId(user.id)
        setAllOrders(Array.isArray(sellerOrders) ? sellerOrders : [])
        setPendingOrders(Array.isArray(sellerPendingOrders) ? sellerPendingOrders : [])
      }

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
      setProcessingPaymentOrderId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incoming Orders</h1>
        <p className="text-muted-foreground">Manage orders placed to you as a seller</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending-payment">Pending Payment</TabsTrigger>
          <TabsTrigger value="processing">Processing Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Orders Received</CardTitle>
              <CardDescription>View and manage all orders placed to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8 border-custom-lavender/50 focus:border-custom-purple focus:ring-custom-purple"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-muted-foreground">Loading orders...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/incoming-orders/${order.id}`} className="text-custom-purple hover:underline">
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.buyerUsername}</TableCell>
                          <TableCell>{order.items.length}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No incoming orders found.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When buyers place orders for your items, they will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-payment">
          <Card>
            <CardHeader>
              <CardTitle>Unpaid Orders</CardTitle>
              <CardDescription>Approve payments for orders placed to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search unpaid orders..."
                  className="pl-8 border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
                  value={pendingPaymentSearchTerm}
                  onChange={(e) => setPendingPaymentSearchTerm(e.target.value)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-muted-foreground">Loading orders...</p>
                </div>
              ) : filteredUnpaidOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUnpaidOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/incoming-orders/${order.id}`} className="text-custom-purple hover:underline">
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.buyerUsername}</TableCell>
                          <TableCell>{order.items.length}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              className="bg-custom-purple hover:bg-custom-brightPurple text-white"
                              size="sm"
                              onClick={() => handleApprovePayment(order.id)}
                              disabled={processingPaymentOrderId === order.id}
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              {processingPaymentOrderId === order.id ? "Processing..." : "Approve Payment"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders awaiting payment approval.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When buyers place orders, they will appear here for payment approval.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>Complete orders that have been paid for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search processing orders..."
                  className="pl-8 border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
                  value={processingSearchTerm}
                  onChange={(e) => setProcessingSearchTerm(e.target.value)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-muted-foreground">Loading orders...</p>
                </div>
              ) : filteredPendingOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/incoming-orders/${order.id}`} className="text-custom-purple hover:underline">
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.buyerUsername}</TableCell>
                          <TableCell>{order.items.length}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              className="bg-custom-coral hover:bg-custom-orange text-white"
                              size="sm"
                              onClick={() => handleCompleteOrder(order.id)}
                              disabled={processingOrderId === order.id}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {processingOrderId === order.id ? "Processing..." : "Complete Order"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders being processed.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When payments are approved, orders will appear here for completion.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { createInvoiceFromOrder, saveInvoice } from "@/models/invoice"
import { getUnpaidOrdersBySellerId, updateOrderStatus } from "@/models/order"
import { CreditCard, Eye, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PendingPaymentPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Load unpaid orders from localStorage
      const unpaidOrders = getUnpaidOrdersBySellerId(user.id)
      setOrders(unpaidOrders)
      setIsLoading(false)
    }
  }, [user])

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerUsername.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprovePayment = async (orderId: string) => {
    setProcessingOrderId(orderId)

    try {
      // Get the order
      const order = orders.find((o) => o.id === orderId)

      if (!order) {
        throw new Error("Order not found")
      }

      // Create invoice
      const invoice = createInvoiceFromOrder(order, `${user?.firstName} ${user?.lastName}`, user?.email || "")

      // Save invoice
      saveInvoice(invoice)

      // Update order status
      updateOrderStatus(orderId, "pending")

      // Update local state
      setOrders(orders.filter((o) => o.id !== orderId))

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
      setProcessingOrderId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Payments</h1>
        <p className="text-muted-foreground">Manage orders awaiting payment approval</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unpaid Orders</CardTitle>
          <CardDescription>Approve payments for orders placed to you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8 border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.buyerUsername}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/incoming-orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                          <Button
                            className="bg-custom-purple hover:bg-custom-brightPurple text-white"
                            size="sm"
                            onClick={() => handleApprovePayment(order.id)}
                            disabled={processingOrderId === order.id}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            {processingOrderId === order.id ? "Processing..." : "Approve Payment"}
                          </Button>
                        </div>
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
    </div>
  )
}

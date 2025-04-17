"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getOrdersBySellerId } from "@/models/order"
import { Eye, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function IncomingOrdersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Load orders from localStorage
      const sellerOrders = getOrdersBySellerId(user.id)
      setOrders(sellerOrders)
      setIsLoading(false)
    }
  }, [user])

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerUsername.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incoming Orders</h1>
        <p className="text-muted-foreground">Manage orders placed to you as a seller</p>
      </div>

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
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:text-custom-purple hover:border-custom-purple"
                          asChild
                        >
                          <Link href={`/incoming-orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
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
    </div>
  )
}

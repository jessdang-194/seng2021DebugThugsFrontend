"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getCompletedOrdersByBuyerId } from "@/models/order"
import { Eye, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PastOrdersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Load completed orders from localStorage
      const completedOrders = getCompletedOrdersByBuyerId(user.id)
      setOrders(completedOrders)
      setIsLoading(false)
    }
  }, [user])

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sellerUsername.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Past Orders</h1>
        <p className="text-muted-foreground">View your completed orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
          <CardDescription>View all your completed orders</CardDescription>
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
                    <TableHead>Seller</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.sellerUsername}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/outgoing-orders/${order.id}`}>
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
              <p className="text-muted-foreground">No completed orders found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                When your orders are completed by sellers, they will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

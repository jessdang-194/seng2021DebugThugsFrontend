"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getCompletedOrdersByBuyerId, getOrdersByBuyerId } from "@/models/order"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OutgoingOrdersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>([])
  const [completedOrders, setCompletedOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [completedSearchTerm, setCompletedSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        try {
          // Load orders from Redis
          const userOrders = await getOrdersByBuyerId(user.id)
          const userCompletedOrders = await getCompletedOrdersByBuyerId(user.id)

          // Filter out completed orders from the main orders list
          // Make sure userOrders is an array before filtering
          const activeOrders = Array.isArray(userOrders)
            ? userOrders.filter((order) => order.status !== "completed")
            : []

          setOrders(activeOrders)
          setCompletedOrders(Array.isArray(userCompletedOrders) ? userCompletedOrders : [])
        } catch (error) {
          console.error("Error fetching orders:", error)
          toast({
            title: "Error",
            description: "Failed to load orders. Please try again later.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchOrders()
  }, [user, toast])

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sellerUsername.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter completed orders based on search term
  const filteredCompletedOrders = completedOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(completedSearchTerm.toLowerCase()) ||
      order.sellerUsername.toLowerCase().includes(completedSearchTerm.toLowerCase()),
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outgoing Orders</h1>
          <p className="text-muted-foreground">Manage orders you've placed as a buyer</p>
        </div>
        <Link href="/outgoing-orders/create">
          <Button className="bg-custom-coral hover:bg-custom-orange text-white" variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Create New Order
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Past Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Your Active Orders</CardTitle>
              <CardDescription>View and manage all your current orders</CardDescription>
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
                  <p className="mt-2 text-muted-foreground">Loading your orders...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
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
                  <p className="text-muted-foreground">
                    No active orders found. Create your first order to get started!
                  </p>
                  <Link href="/outgoing-orders/create">
                    <Button className="mt-4 bg-custom-coral hover:bg-custom-orange text-white" variant="secondary">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Order
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>View all your completed orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search completed orders..."
                  className="pl-8 border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
                  value={completedSearchTerm}
                  onChange={(e) => setCompletedSearchTerm(e.target.value)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-muted-foreground">Loading orders...</p>
                </div>
              ) : filteredCompletedOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompletedOrders.map((order) => (
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
                          <TableCell>{order.items.length}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

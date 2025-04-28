"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { getItemsBySellerId } from "@/models/item"
import {
  getCompletedOrdersByBuyerId,
  getOrdersByBuyerId,
  getOrdersBySellerId,
  getUnpaidOrdersBySellerId,
} from "@/models/order"
import { CheckSquare, CreditCard, Package, ShoppingBag, ShoppingCart, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    myItems: 0,
    outgoingOrders: 0,
    incomingOrders: 0,
    pendingPayments: 0,
    completedOrders: 0,
  })

  const [recentOrders, setRecentOrders] = useState<
    Array<{
      id: string
      status: string
      type: "incoming" | "outgoing"
    }>
  >([])

  useEffect(() => {
    // Create an async function inside useEffect
    const fetchData = async () => {
      if (user) {
        try {
          // Get stats - await all async calls
          const myItems = (await getItemsBySellerId(user.id)).length
          const outgoingOrders = (await getOrdersByBuyerId(user.id)).length
          const incomingOrders = (await getOrdersBySellerId(user.id)).length
          const pendingPayments = (await getUnpaidOrdersBySellerId(user.id)).length
          const completedOrders = (await getCompletedOrdersByBuyerId(user.id)).length

          setStats({
            myItems,
            outgoingOrders,
            incomingOrders,
            pendingPayments,
            completedOrders,
          })

          // Get recent orders (both incoming and outgoing)
          const outgoingOrdersList = (await getOrdersByBuyerId(user.id)).map((order) => ({
            id: order.id,
            status: order.status,
            type: "outgoing" as const,
          }))

          const incomingOrdersList = (await getOrdersBySellerId(user.id)).map((order) => ({
            id: order.id,
            status: order.status,
            type: "incoming" as const,
          }))

          // Combine and sort by most recent (assuming IDs are sequential)
          const allOrders = [...outgoingOrdersList, ...incomingOrdersList]
            .sort((a, b) => b.id.localeCompare(a.id))
            .slice(0, 3) // Get only the 3 most recent

          setRecentOrders(allOrders)
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
        }
      }
    }

    // Call the async function
    fetchData()
  }, [user])

  // Get status badge color and icon
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unpaid":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Unpaid
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "paid":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CreditCard className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <CheckSquare className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-custom-skyBlue/30 to-custom-lavenderBlush/30 min-h-screen rounded-lg">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Items</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.myItems}</div>
            <p className="text-xs text-muted-foreground">Items you have for sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outgoing Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outgoingOrders}</div>
            <p className="text-xs text-muted-foreground">Orders you've placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incoming Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.incomingOrders}</div>
            <p className="text-xs text-muted-foreground">Orders placed to you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Orders awaiting payment approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white" asChild>
              <Link href="/items/create">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Create New Item
              </Link>
            </Button>
            <Button className="w-full bg-custom-purple hover:bg-custom-brightPurple text-white" asChild>
              <Link href="/outgoing-orders/create">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Place New Order
              </Link>
            </Button>
            {stats.pendingPayments > 0 && (
              <Button className="w-full bg-custom-coral hover:bg-custom-orange text-white" variant="secondary" asChild>
                <Link href="/incoming-orders/pending-payment">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Approve Payments ({stats.pendingPayments})
                </Link>
              </Button>
            )}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/incoming-orders">
                  <Package className="mr-2 h-4 w-4" />
                  Incoming Orders
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/outgoing-orders">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Outgoing Orders
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on PayPath</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <Link
                        href={
                          order.type === "incoming"
                            ? `/incoming-orders/${order.id}`
                            : `/outgoing-orders/details/${order.id}`
                        }
                        className="font-medium text-custom-purple hover:underline"
                      >
                        {order.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {order.type === "incoming" ? "Incoming" : "Outgoing"} Order
                      </p>
                    </div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity to display.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start by creating items or placing orders to see your activity here.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PayPath Platform Overview</CardTitle>
          <CardDescription>Learn how to use PayPath effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">As a Seller</h3>
              <ul className="space-y-1 text-sm">
                <li>• Create items to sell in the "My Items" section</li>
                <li>• Receive orders from buyers</li>
                <li>• Approve payments for incoming orders</li>
                <li>• Complete orders after payment</li>
                <li>• Track your sales for tax purposes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">As a Buyer</h3>
              <ul className="space-y-1 text-sm">
                <li>• Browse items from different sellers</li>
                <li>• Create orders with multiple items</li>
                <li>• Pay for orders (simulated in this demo)</li>
                <li>• Track order status</li>
                <li>• View your order history</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li>• Update your profile information</li>
                <li>• Create your first item to sell</li>
                <li>• Place an order with another seller</li>
                <li>• Approve payments for incoming orders</li>
                <li>• Complete the order fulfillment process</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

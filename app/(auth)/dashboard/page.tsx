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
import { BarChart3, CreditCard, Package, ShoppingBag, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    myItems: 0,
    outgoingOrders: 0,
    incomingOrders: 0,
    pendingPayments: 0,
    completedOrders: 0,
  })

  useEffect(() => {
    if (user) {
      // Get stats
      const myItems = getItemsBySellerId(user.id).length
      const outgoingOrders = getOrdersByBuyerId(user.id).length
      const incomingOrders = getOrdersBySellerId(user.id).length
      const pendingPayments = getUnpaidOrdersBySellerId(user.id).length
      const completedOrders = getCompletedOrdersByBuyerId(user.id).length

      setStats({
        myItems,
        outgoingOrders,
        incomingOrders,
        pendingPayments,
        completedOrders,
      })
    }
  }, [user])

  return (
    <div className="space-y-6">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on PayPath</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.completedOrders > 0 ? (
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Completed Orders</p>
                    <p className="text-sm text-muted-foreground">You have {stats.completedOrders} completed orders</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:text-custom-purple hover:border-custom-purple"
                    asChild
                  >
                    <Link href="/outgoing-orders/past">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </div>
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

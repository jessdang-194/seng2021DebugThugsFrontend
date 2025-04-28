"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  getOrdersByBuyerId,
  getOrdersBySellerId,
  getCompletedOrdersByBuyerId,
  getCompletedOrdersBySellerId,
  type Order,
} from "@/models/order"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [incomingOrders, setIncomingOrders] = useState<Order[]>([])
  const [outgoingOrders, setOutgoingOrders] = useState<Order[]>([])
  const [completedIncomingOrders, setCompletedIncomingOrders] = useState<Order[]>([])
  const [completedOutgoingOrders, setCompletedOutgoingOrders] = useState<Order[]>([])
  const [averageCompletionTime, setAverageCompletionTime] = useState<number | null>(null)
  const [orderRatio, setOrderRatio] = useState({ incoming: 0, outgoing: 0 })
  const [profitLoss, setProfitLoss] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setIsLoading(true)

        // Fetch all orders
        const incoming = await getOrdersBySellerId(user.id)
        const outgoing = await getOrdersByBuyerId(user.id)

        // Fetch completed orders
        const completedIncoming = await getCompletedOrdersBySellerId(user.id)
        const completedOutgoing = await getCompletedOrdersByBuyerId(user.id)

        // Ensure we have arrays
        const incomingArray = Array.isArray(incoming) ? incoming : []
        const outgoingArray = Array.isArray(outgoing) ? outgoing : []
        const completedIncomingArray = Array.isArray(completedIncoming) ? completedIncoming : []
        const completedOutgoingArray = Array.isArray(completedOutgoing) ? completedOutgoing : []

        // Set state with fetched data
        setIncomingOrders(incomingArray)
        setOutgoingOrders(outgoingArray)
        setCompletedIncomingOrders(completedIncomingArray)
        setCompletedOutgoingOrders(completedOutgoingArray)

        // Calculate average completion time
        if (completedIncomingArray.length > 0) {
          let totalDays = 0
          let validOrderCount = 0

          for (const order of completedIncomingArray) {
            if (order.completedAt && order.createdAt) {
              const completedDate = new Date(order.completedAt)
              const createdDate = new Date(order.createdAt)
              const diffTime = Math.abs(completedDate.getTime() - createdDate.getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              totalDays += diffDays
              validOrderCount++
            }
          }

          if (validOrderCount > 0) {
            setAverageCompletionTime(Number.parseFloat((totalDays / validOrderCount).toFixed(1)))
          }
        }

        // Calculate order ratio
        const totalOrders = incomingArray.length + outgoingArray.length
        if (totalOrders > 0) {
          setOrderRatio({
            incoming: Math.round((incomingArray.length / totalOrders) * 100),
            outgoing: Math.round((outgoingArray.length / totalOrders) * 100),
          })
        }

        // Calculate profit/loss
        const totalIncome = completedIncomingArray.reduce((sum, order) => sum + order.total, 0)
        const totalExpenses = completedOutgoingArray.reduce((sum, order) => sum + order.total, 0)
        setProfitLoss(totalIncome - totalExpenses)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        toast({
          title: "Error",
          description: "Failed to load analytics data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, toast])

  // Prepare data for pie chart
  const orderDistributionData = [
    { name: "Incoming", value: incomingOrders.length, color: "#AD7CF2" },
    { name: "Outgoing", value: outgoingOrders.length, color: "#F8885A" },
  ]

  // Filter out zero values to avoid empty pie segments
  const filteredOrderData = orderDistributionData.filter((item) => item.value > 0)

  // Custom render for the pie chart label to keep it compact
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View insights and statistics about your orders</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="ml-2">Loading analytics...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{incomingOrders.length + outgoingOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  {incomingOrders.length} incoming, {outgoingOrders.length} outgoing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${profitLoss.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From {completedIncomingOrders.length + completedOutgoingOrders.length} completed orders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageCompletionTime !== null ? `${averageCompletionTime} days` : "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {completedIncomingOrders.length} completed orders
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Order Distribution</CardTitle>
                <CardDescription>Ratio of incoming vs outgoing orders</CardDescription>
              </CardHeader>
              <CardContent>
                {incomingOrders.length + outgoingOrders.length > 0 ? (
                  <div className="flex flex-col items-center">
                    {/* Chart container with fixed height to prevent overflow */}
                    <div className="h-[200px] w-full max-w-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <Pie
                            data={filteredOrderData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            label={renderCustomizedLabel}
                          >
                            {filteredOrderData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} orders`, "Count"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Custom legend below the chart */}
                    <div className="mt-4 grid grid-cols-2 gap-8 text-center w-full max-w-[300px]">
                      <div>
                        <div className="flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-[#AD7CF2]"></div>
                          <span className="ml-2 text-sm font-medium">Incoming</span>
                        </div>
                        <p className="text-lg font-bold">{orderRatio.incoming}%</p>
                        <p className="text-xs text-muted-foreground">{incomingOrders.length} orders</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-[#F8885A]"></div>
                          <span className="ml-2 text-sm font-medium">Outgoing</span>
                        </div>
                        <p className="text-lg font-bold">{orderRatio.outgoing}%</p>
                        <p className="text-xs text-muted-foreground">{outgoingOrders.length} orders</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center">
                    <p className="text-muted-foreground">No orders data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Income, expenses and balance from completed orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Income (Incoming Orders)</span>
                    <span className="text-green-600 font-bold">
                      ${completedIncomingOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Expenses (Outgoing Orders)</span>
                    <span className="text-red-600 font-bold">
                      ${completedOutgoingOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-bold">Net Balance</span>
                    <span className={`font-bold ${profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${profitLoss.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

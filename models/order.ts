import { getOrders, saveOrders } from "../lib/redis"

export type OrderStatus = "unpaid" | "pending" | "completed"

export type OrderItem = {
  itemId: string
  name: string
  quantity: number
  pricePerUnit: number
}

export type Order = {
  id: string
  buyerId: string
  buyerUsername: string
  sellerId: string
  sellerUsername: string
  shippingAddress: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  gst: number
  total: number
  createdAt: string
  completedAt: string | null
}

// Helper function to create a new order
export async function createOrder(
  buyerId: string,
  buyerUsername: string,
  sellerId: string,
  sellerUsername: string,
  shippingAddress: string,
  items: OrderItem[],
): Promise<Order> {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0)

  // Calculate GST (10%)
  const gst = subtotal * 0.1

  // Calculate total
  const total = subtotal + gst

  const newOrder = {
    id: `order_${Date.now()}`,
    buyerId,
    buyerUsername,
    sellerId,
    sellerUsername,
    shippingAddress,
    status: "unpaid" as OrderStatus,
    items,
    subtotal,
    gst,
    total,
    createdAt: new Date().toISOString(),
    completedAt: null,
  }

  await saveOrder(newOrder)
  return newOrder
}

// Helper function to get all orders
export async function getAllOrders(): Promise<Order[]> {
  return await getOrders()
}

// Helper function to get orders by buyer ID
export async function getOrdersByBuyerId(buyerId: string): Promise<Order[]> {
  const orders = await getOrders()
  return orders.filter((order: Order) => order.buyerId === buyerId)
}

// Helper function to get orders by seller ID
export async function getOrdersBySellerId(sellerId: string): Promise<Order[]> {
  const orders = await getOrders()
  return orders.filter((order: Order) => order.sellerId === sellerId)
}

// Helper function to get order by ID
export async function getOrderById(orderId: string): Promise<Order | undefined> {
  try {
    const orders = await getOrders()
    const order = orders.find((order: Order) => order.id === orderId)

    if (!order) {
      console.error(
        "Order not found:",
        orderId,
        "Available orders:",
        orders.map((o: Order) => o.id),
      )
    }

    return order
  } catch (error) {
    console.error("Error retrieving order:", error)
    return undefined
  }
}

// Helper function to update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const orders = await getOrders()
  const orderIndex = orders.findIndex((order: Order) => order.id === orderId)

  if (orderIndex >= 0) {
    orders[orderIndex].status = status

    // Set completedAt date when order is completed
    if (status === "completed") {
      orders[orderIndex].completedAt = new Date().toISOString()
    }

    await saveOrders(orders)
  }
}

// Helper function to save an order
export async function saveOrder(order: Order): Promise<void> {
  try {
    // Get existing orders
    const orders = await getOrders()

    // Check if order already exists
    const existingOrderIndex = orders.findIndex((o: Order) => o.id === order.id)

    if (existingOrderIndex >= 0) {
      orders[existingOrderIndex] = order
    } else {
      orders.push(order)
    }

    // Save back to Redis
    await saveOrders(orders)
  } catch (error) {
    console.error("Failed to save order:", error)
  }
}

// Helper function to get completed orders by buyer ID
export async function getCompletedOrdersByBuyerId(buyerId: string): Promise<Order[]> {
  const orders = await getOrdersByBuyerId(buyerId)
  return orders.filter((order: Order) => order.status === "completed")
}

// Helper function to get unpaid orders by seller ID
export async function getUnpaidOrdersBySellerId(sellerId: string): Promise<Order[]> {
  const orders = await getOrdersBySellerId(sellerId)
  return orders.filter((order: Order) => order.status === "unpaid")
}

// Helper function to get pending orders by seller ID
export async function getPendingOrdersBySellerId(sellerId: string): Promise<Order[]> {
  const orders = await getOrdersBySellerId(sellerId)
  return orders.filter((order: Order) => order.status === "pending")
}

// Helper function to get completed orders by seller ID
export async function getCompletedOrdersBySellerId(sellerId: string): Promise<Order[]> {
  const orders = await getOrdersBySellerId(sellerId)
  return orders.filter((order: Order) => order.status === "completed")
}

// Helper function to calculate average completion time for a seller
export async function getAverageCompletionTime(sellerId: string): Promise<number | null> {
  try {
    const completedOrders = await getCompletedOrdersBySellerId(sellerId)

    if (!completedOrders || completedOrders.length === 0) {
      return null
    }

    let totalDays = 0
    let validOrderCount = 0

    for (const order of completedOrders) {
      if (order.completedAt && order.createdAt) {
        const completedDate = new Date(order.completedAt)
        const createdDate = new Date(order.createdAt)
        const diffTime = Math.abs(completedDate.getTime() - createdDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        totalDays += diffDays
        validOrderCount++
      }
    }

    if (validOrderCount === 0) {
      return null
    }

    return Number.parseFloat((totalDays / validOrderCount).toFixed(1))
  } catch (error) {
    console.error("Error calculating average completion time:", error)
    return null
  }
}

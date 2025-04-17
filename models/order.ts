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
}

// Helper function to create a new order
export function createOrder(
  buyerId: string,
  buyerUsername: string,
  sellerId: string,
  sellerUsername: string,
  shippingAddress: string,
  items: OrderItem[],
): Order {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0)

  // Calculate GST (10%)
  const gst = subtotal * 0.1

  // Calculate total
  const total = subtotal + gst

  return {
    id: `order_${Date.now()}`,
    buyerId,
    buyerUsername,
    sellerId,
    sellerUsername,
    shippingAddress,
    status: "unpaid",
    items,
    subtotal,
    gst,
    total,
    createdAt: new Date().toISOString(),
  }
}

// Helper function to get all orders
export function getAllOrders(): Order[] {
  const ordersJson = localStorage.getItem("orders") || "[]"
  return JSON.parse(ordersJson)
}

// Helper function to get orders by buyer ID
export function getOrdersByBuyerId(buyerId: string): Order[] {
  const orders = getAllOrders()
  return orders.filter((order) => order.buyerId === buyerId)
}

// Helper function to get orders by seller ID
export function getOrdersBySellerId(sellerId: string): Order[] {
  const orders = getAllOrders()
  return orders.filter((order) => order.sellerId === sellerId)
}

// Helper function to get order by ID
export function getOrderById(orderId: string): Order | undefined {
  try {
    const ordersJson = localStorage.getItem("orders") || "[]"
    const orders = JSON.parse(ordersJson)
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
export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getAllOrders()
  const orderIndex = orders.findIndex((order) => order.id === orderId)

  if (orderIndex >= 0) {
    orders[orderIndex].status = status
    localStorage.setItem("orders", JSON.stringify(orders))
  }
}

// Helper function to save an order
export function saveOrder(order: Order): void {
  // Get existing orders or initialize empty array
  const ordersJson = localStorage.getItem("orders") || "[]"
  const orders = JSON.parse(ordersJson)

  // Check if order already exists
  const existingOrderIndex = orders.findIndex((o: Order) => o.id === order.id)

  if (existingOrderIndex >= 0) {
    orders[existingOrderIndex] = order
  } else {
    orders.push(order)
  }

  // Save back to localStorage
  localStorage.setItem("orders", JSON.stringify(orders))

  // Verify the order was saved correctly
  const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
  const savedOrder = savedOrders.find((o: Order) => o.id === order.id)

  if (!savedOrder) {
    console.error("Failed to save order:", order.id)
  }
}

// Helper function to get completed orders by buyer ID
export function getCompletedOrdersByBuyerId(buyerId: string): Order[] {
  const orders = getOrdersByBuyerId(buyerId)
  return orders.filter((order) => order.status === "completed")
}

// Helper function to get unpaid orders by seller ID
export function getUnpaidOrdersBySellerId(sellerId: string): Order[] {
  const orders = getOrdersBySellerId(sellerId)
  return orders.filter((order) => order.status === "unpaid")
}

// Helper function to get pending orders by seller ID
export function getPendingOrdersBySellerId(sellerId: string): Order[] {
  const orders = getOrdersBySellerId(sellerId)
  return orders.filter((order) => order.status === "pending")
}

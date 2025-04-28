import { createClient } from "@vercel/kv"

const databaseClient = createClient({
  url: "https://powerful-grouper-27568.upstash.io",
  token: "AWuwAAIjcDE1NjViMWEwNzNlYTI0ZTlkODMwZGE3NWE5YTkzZjkyNnAxMA",
})

// Helper function to get all users
export async function getUsers() {
  try {
    const users = await databaseClient.get("users")
    return users || []
  } catch (error) {
    console.error("Error getting users from Redis:", error)
    return []
  }
}

// Helper function to save users
export async function saveUsers(users: any[]) {
  try {
    await databaseClient.set("users", users)
  } catch (error) {
    console.error("Error saving users to Redis:", error)
    throw error
  }
}

// Helper function to get all items
export async function getItems() {
  try {
    const items = await databaseClient.get("items")
    return items || []
  } catch (error) {
    console.error("Error getting items from Redis:", error)
    return []
  }
}

// Helper function to save items
export async function saveItems(items: any[]) {
  try {
    await databaseClient.set("items", items)
  } catch (error) {
    console.error("Error saving items to Redis:", error)
    throw error
  }
}

// Helper function to get all orders
export async function getOrders() {
  try {
    const orders = await databaseClient.get("orders")
    return orders || []
  } catch (error) {
    console.error("Error getting orders from Redis:", error)
    return []
  }
}

// Helper function to save orders
export async function saveOrders(orders: any[]) {
  try {
    await databaseClient.set("orders", orders)
  } catch (error) {
    console.error("Error saving orders to Redis:", error)
    throw error
  }
}

// Helper function to get all invoices
export async function getInvoices() {
  try {
    const invoices = await databaseClient.get("invoices")
    return invoices || []
  } catch (error) {
    console.error("Error getting invoices from Redis:", error)
    return []
  }
}

// Helper function to save invoices
export async function saveInvoices(invoices: any[]) {
  try {
    await databaseClient.set("invoices", invoices)
  } catch (error) {
    console.error("Error saving invoices to Redis:", error)
    throw error
  }
}

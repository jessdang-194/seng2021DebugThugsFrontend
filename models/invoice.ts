import { getInvoices, saveInvoices } from "../lib/redis"
import type { Order } from "./order"

export type Invoice = {
  id: string
  orderId: string
  billTo: {
    name: string
    address: string
    email: string
  }
  items: {
    name: string
    quantity: number
    pricePerUnit: number
    total: number
  }[]
  subtotal: number
  gst: number
  total: number
  createdAt: string
}

// Helper function to create an invoice from an order
export async function createInvoiceFromOrder(order: Order, buyerName: string, buyerEmail: string): Promise<Invoice> {
  const newInvoice = {
    id: `invoice_${Date.now()}`,
    orderId: order.id,
    billTo: {
      name: buyerName,
      address: order.shippingAddress,
      email: buyerEmail,
    },
    items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
      total: item.quantity * item.pricePerUnit,
    })),
    subtotal: order.subtotal,
    gst: order.gst,
    total: order.total,
    createdAt: new Date().toISOString(),
  }

  await saveInvoice(newInvoice)
  return newInvoice
}

// Helper function to get all invoices
export async function getAllInvoices(): Promise<Invoice[]> {
  return await getInvoices()
}

// Helper function to get invoice by order ID with better error handling
export async function getInvoiceByOrderId(orderId: string): Promise<Invoice | undefined> {
  try {
    const invoices = await getInvoices()
    return invoices.find((invoice: Invoice) => invoice.orderId === orderId)
  } catch (error) {
    console.error("Error retrieving invoice:", error)
    return undefined
  }
}

// Helper function to save an invoice
export async function saveInvoice(invoice: Invoice): Promise<void> {
  try {
    const invoices = await getInvoices()
    const existingInvoiceIndex = invoices.findIndex((i: Invoice) => i.id === invoice.id)

    if (existingInvoiceIndex >= 0) {
      invoices[existingInvoiceIndex] = invoice
    } else {
      invoices.push(invoice)
    }

    await saveInvoices(invoices)
  } catch (error) {
    console.error("Error saving invoice:", error)
  }
}

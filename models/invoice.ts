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
export function createInvoiceFromOrder(order: Order, buyerName: string, buyerEmail: string): Invoice {
  return {
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
}

// Helper function to get all invoices
export function getAllInvoices(): Invoice[] {
  const invoicesJson = localStorage.getItem("invoices") || "[]"
  return JSON.parse(invoicesJson)
}

// Helper function to get invoice by order ID with better error handling
export function getInvoiceByOrderId(orderId: string): Invoice | undefined {
  try {
    const invoices = getAllInvoices()
    return invoices.find((invoice) => invoice.orderId === orderId)
  } catch (error) {
    console.error("Error retrieving invoice:", error)
    return undefined
  }
}

// Helper function to save an invoice
export function saveInvoice(invoice: Invoice): void {
  try {
    const invoices = getAllInvoices()
    const existingInvoiceIndex = invoices.findIndex((i) => i.id === invoice.id)

    if (existingInvoiceIndex >= 0) {
      invoices[existingInvoiceIndex] = invoice
    } else {
      invoices.push(invoice)
    }

    localStorage.setItem("invoices", JSON.stringify(invoices))

    // Verify the invoice was saved correctly
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]")
    const savedInvoice = savedInvoices.find((i: Invoice) => i.id === invoice.id)

    if (!savedInvoice) {
      console.error("Failed to save invoice:", invoice.id)
    }
  } catch (error) {
    console.error("Error saving invoice:", error)
  }
}

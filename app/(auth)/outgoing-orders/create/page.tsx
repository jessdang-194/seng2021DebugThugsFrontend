"use client"

import { TableCell } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { TableHeader } from "@/components/ui/table"
import { Table } from "@/components/ui/table"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getAllItems, getItemById } from "@/models/item"
import { createOrder, type OrderItem } from "@/models/order"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getOrderById } from "@/models/order"

export default function CreateOrderPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sellers, setSellers] = useState<{ id: string; username: string }[]>([])
  const [sellerItems, setSellerItems] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([])

  // Form state
  const [formData, setFormData] = useState({
    sellerId: "",
    shippingAddress: user?.billingAddress || "",
  })

  useEffect(() => {
    // Create an async function inside useEffect
    const fetchItems = async () => {
      try {
        // Get all items
        const allItems = await getAllItems()

        if (!Array.isArray(allItems)) {
          console.error("getAllItems did not return an array:", allItems)
          toast({
            title: "Error",
            description: "Failed to load items. Please try again later.",
            variant: "destructive",
          })
          return
        }

        // Extract unique sellers
        const uniqueSellers = Array.from(
          new Map(
            allItems.map((item) => [item.sellerId, { id: item.sellerId, username: item.sellerUsername }]),
          ).values(),
        )

        // Filter out current user
        const filteredSellers = uniqueSellers.filter((seller) => seller.id !== user?.id)

        setSellers(filteredSellers)
      } catch (error) {
        console.error("Error fetching items:", error)
        toast({
          title: "Error",
          description: "Failed to load items. Please try again later.",
          variant: "destructive",
        })
      }
    }

    fetchItems()
  }, [user, toast])

  // When seller changes, update available items
  useEffect(() => {
    if (formData.sellerId) {
      // Create an async function inside useEffect
      const fetchSellerItems = async () => {
        try {
          // Get all items
          const allItems = await getAllItems()

          if (!Array.isArray(allItems)) {
            console.error("getAllItems did not return an array:", allItems)
            setSellerItems([])
            return
          }

          // Filter items by seller
          const items = allItems.filter((item) => item.sellerId === formData.sellerId)

          setSellerItems(items)
          setSelectedItems([])
        } catch (error) {
          console.error("Error fetching seller items:", error)
          setSellerItems([])
        }
      }

      fetchSellerItems()
    }
  }, [formData.sellerId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSellerChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sellerId: value }))
  }

  const handleAddItem = async (itemId: string) => {
    // Check if item already in cart
    const existingItem = selectedItems.find((item) => item.itemId === itemId)

    if (existingItem) {
      // Increment quantity
      setSelectedItems(
        selectedItems.map((item) => (item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      try {
        // Add new item
        const item = await getItemById(itemId)

        if (item) {
          setSelectedItems([
            ...selectedItems,
            {
              itemId: item.id,
              name: item.name,
              quantity: 1,
              pricePerUnit: item.estimatedPrice,
            },
          ])
        }
      } catch (error) {
        console.error("Error adding item:", error)
        toast({
          title: "Error",
          description: "Failed to add item. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleRemoveItem = (itemId: string) => {
    const existingItem = selectedItems.find((item) => item.itemId === itemId)

    if (existingItem && existingItem.quantity > 1) {
      // Decrement quantity
      setSelectedItems(
        selectedItems.map((item) => (item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item)),
      )
    } else {
      // Remove item
      setSelectedItems(selectedItems.filter((item) => item.itemId !== itemId))
    }
  }

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0)
  }

  const calculateGST = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an order.",
        variant: "destructive",
      })
      console.error("No user found when creating order")
      return
    }

    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to your order.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Get seller username
      const seller = sellers.find((s) => s.id === formData.sellerId)

      if (!seller) {
        throw new Error("Seller not found")
      }

      // Create new order
      const newOrder = await createOrder(
        user.id,
        user.username,
        seller.id,
        seller.username,
        formData.shippingAddress,
        selectedItems,
      )

      // Verify the order was saved correctly
      const savedOrder = await getOrderById(newOrder.id)
      if (!savedOrder) {
        throw new Error("Order was not saved correctly")
      }

      // Show success message
      toast({
        title: "Order Created",
        description: "Your order has been created successfully.",
        variant: "default",
      })

      // Redirect to the specific order page - update to new path
      router.push(`/outgoing-orders/details/${newOrder.id}`)
    } catch (error) {
      console.error("Order creation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/outgoing-orders" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
          <p className="text-muted-foreground">Place an order with a seller</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Select a seller and add items to your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sellerId">Select Seller</Label>
              <Select value={formData.sellerId} onValueChange={handleSellerChange}>
                <SelectTrigger className="border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue">
                  <SelectValue placeholder="Select a seller" />
                </SelectTrigger>
                <SelectContent>
                  {sellers.length > 0 ? (
                    sellers.map((seller) => (
                      <SelectItem key={seller.id} value={seller.id}>
                        {seller.username}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No sellers available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {formData.sellerId && (
              <>
                <div className="space-y-2">
                  <Label>Available Items</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sellerItems.length > 0 ? (
                      sellerItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                <p className="text-sm font-medium mt-2">${item.estimatedPrice.toFixed(2)}</p>
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                className="bg-custom-purple hover:bg-custom-brightPurple text-white"
                                onClick={() => handleAddItem(item.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-2">No items available from this seller</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Selected Items</Label>
                  {selectedItems.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedItems.map((item) => (
                            <TableRow key={item.itemId}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>${item.pricePerUnit.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleRemoveItem(item.itemId)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span>{item.quantity}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleAddItem(item.itemId)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>${(item.pricePerUnit * item.quantity).toFixed(2)}</TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() =>
                                    setSelectedItems(selectedItems.filter((i) => i.itemId !== item.itemId))
                                  }
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={3} className="text-right font-medium">
                              Subtotal:
                            </TableCell>
                            <TableCell className="font-medium">${calculateSubtotal().toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3} className="text-right font-medium">
                              GST (10%):
                            </TableCell>
                            <TableCell className="font-medium">${calculateGST().toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3} className="text-right font-bold">
                              Total:
                            </TableCell>
                            <TableCell className="font-bold">${calculateTotal().toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-md">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground">Add items from the list above</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <Textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter shipping address"
                    className="min-h-[100px] border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/outgoing-orders")}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-custom-coral hover:bg-custom-orange text-white"
              disabled={isLoading || selectedItems.length === 0}
            >
              {isLoading ? "Creating..." : "Place Order"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

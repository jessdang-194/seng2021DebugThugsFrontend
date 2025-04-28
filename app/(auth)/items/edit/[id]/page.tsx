"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getItemById, saveItem } from "@/models/item"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditItemPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingItem, setIsLoadingItem] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedPrice: "",
  })

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoadingItem(true)
        // Load item data
        const item = await getItemById(params.id)

        if (!item) {
          toast({
            title: "Error",
            description: "Item not found",
            variant: "destructive",
          })
          router.push("/items")
          return
        }

        // Check if user is the seller
        if (user && item.sellerId !== user.id) {
          console.log("User ID:", user.id)
          console.log("Item seller ID:", item.sellerId)
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit this item",
            variant: "destructive",
          })
          router.push("/items")
          return
        }

        // Set form data
        setFormData({
          name: item.name,
          description: item.description,
          estimatedPrice: item.estimatedPrice.toString(),
        })
      } catch (error) {
        console.error("Error fetching item:", error)
        toast({
          title: "Error",
          description: "Failed to load item details",
          variant: "destructive",
        })
        router.push("/items")
      } finally {
        setIsLoadingItem(false)
      }
    }

    if (user) {
      fetchItem()
    } else {
      setIsLoadingItem(false)
    }
  }, [params.id, router, toast, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to edit an item.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Get existing item
      const existingItem = await getItemById(params.id)

      if (!existingItem) {
        throw new Error("Item not found")
      }

      // Validate price
      const price = Number.parseFloat(formData.estimatedPrice)
      if (isNaN(price) || price <= 0) {
        throw new Error("Please enter a valid price")
      }

      // Update item
      const updatedItem = {
        ...existingItem,
        name: formData.name,
        description: formData.description,
        estimatedPrice: price,
      }

      // Save updated item
      await saveItem(updatedItem)

      // Show success message
      toast({
        title: "Item Updated",
        description: "Your item has been updated successfully.",
        variant: "default",
      })

      // Redirect to items page
      router.push("/items")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update item",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingItem) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-2 text-muted-foreground">Loading item details...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/items" className="mr-4">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Item</h1>
          <p className="text-muted-foreground">Update the details of your item</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Edit the details of your item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter item name"
                className="border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your item"
                className="min-h-[100px] border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedPrice">Estimated Price ($)</Label>
              <Input
                id="estimatedPrice"
                name="estimatedPrice"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.estimatedPrice}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex justify-between w-full">
              <Button type="button" variant="outline" onClick={() => router.push("/items")}>
                Cancel
              </Button>

              <Button type="submit" variant="secondary" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Item"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { createItem } from "@/models/item"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateItemPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedPrice: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an item.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Validate price
      const price = Number.parseFloat(formData.estimatedPrice)
      if (isNaN(price) || price <= 0) {
        throw new Error("Please enter a valid price")
      }

      // Create new item
      const newItem = await createItem(formData.name, formData.description, price, user.id, user.username)

      // Show success message
      toast({
        title: "Item Created",
        description: "Your item has been created successfully.",
        variant: "default",
      })

      // Redirect to items page
      router.push("/items")
    } catch (error) {
      console.error("Error creating item:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create item",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Create New Item</h1>
          <p className="text-muted-foreground">Add a new item to your inventory</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Enter the details of the item you want to sell</CardDescription>
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
                placeholder="Enter item description"
                className="min-h-[100px] border-custom-lightBlue/50 focus:border-custom-blue focus:ring-custom-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedPrice">Price ($)</Label>
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
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

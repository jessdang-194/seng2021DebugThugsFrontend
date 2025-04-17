"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { deleteItem, getItemsBySellerId } from "@/models/item"
import { Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ItemsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Load items for the current user
      const userItems = getItemsBySellerId(user.id)
      setItems(userItems)
    }
    setIsLoading(false)
  }, [user])

  const handleDeleteItem = (itemId: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        // Delete item
        deleteItem(itemId)

        // Update items list
        setItems(items.filter((item) => item.id !== itemId))

        // Show success message
        toast({
          title: "Item Deleted",
          description: "The item has been deleted successfully.",
          variant: "default",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete item",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Items</h1>
          <p className="text-muted-foreground">Manage the items you are selling</p>
        </div>
        <Link href="/items/create">
          <Button className="bg-custom-purple hover:bg-custom-brightPurple text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>${item.estimatedPrice.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{item.description || "No description"}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/items/edit/${item.id}`}>
                  <Button variant="outline" size="sm" className="hover:text-custom-purple hover:border-custom-purple">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-medium">No items yet</h3>
            <p className="mt-2 text-center text-muted-foreground">
              You haven't created any items yet. Add your first item to start selling.
            </p>
            <Link href="/items/create" className="mt-4">
              <Button className="bg-custom-purple hover:bg-custom-brightPurple text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

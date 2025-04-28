import { getItems, saveItems } from "../lib/redis"

export type Item = {
  id: string
  name: string
  description: string
  estimatedPrice: number
  sellerId: string
  sellerUsername: string
  createdAt?: string
}

// Helper function to create a new item
export async function createItem(
  name: string,
  description: string,
  estimatedPrice: number,
  sellerId: string,
  sellerUsername: string,
): Promise<Item> {
  const newItem = {
    id: `item_${Date.now()}`,
    name,
    description,
    estimatedPrice,
    sellerId,
    sellerUsername,
    createdAt: new Date().toISOString(),
  }

  await saveItem(newItem)
  return newItem
}

// Helper function to get all items
export async function getAllItems(): Promise<Item[]> {
  return await getItems()
}

// Helper function to get items by seller ID
export async function getItemsBySellerId(sellerId: string): Promise<Item[]> {
  const items = await getItems()
  return items.filter((item: Item) => item.sellerId === sellerId)
}

// Helper function to get item by ID
export async function getItemById(itemId: string): Promise<Item | undefined> {
  const items = await getItems()
  return items.find((item: Item) => item.id === itemId)
}

// Helper function to save an item
export async function saveItem(item: Item): Promise<void> {
  const items = await getItems()
  const existingItemIndex = items.findIndex((i: Item) => i.id === item.id)

  if (existingItemIndex >= 0) {
    items[existingItemIndex] = item
  } else {
    items.push(item)
  }

  await saveItems(items)
}

// Helper function to delete an item
export async function deleteItem(itemId: string): Promise<void> {
  const items = await getItems()
  const filteredItems = items.filter((item: Item) => item.id !== itemId)
  await saveItems(filteredItems)
}

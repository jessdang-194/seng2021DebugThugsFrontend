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
export function createItem(
  name: string,
  description: string,
  estimatedPrice: number,
  sellerId: string,
  sellerUsername: string,
): Item {
  return {
    id: `item_${Date.now()}`,
    name,
    description,
    estimatedPrice,
    sellerId,
    sellerUsername,
    createdAt: new Date().toISOString(),
  }
}

// Helper function to get all items
export function getAllItems(): Item[] {
  const itemsJson = localStorage.getItem("items") || "[]"
  return JSON.parse(itemsJson)
}

// Helper function to get items by seller ID
export function getItemsBySellerId(sellerId: string): Item[] {
  const items = getAllItems()
  return items.filter((item) => item.sellerId === sellerId)
}

// Helper function to get item by ID
export function getItemById(itemId: string): Item | undefined {
  const items = getAllItems()
  return items.find((item) => item.id === itemId)
}

// Helper function to save an item
export function saveItem(item: Item): void {
  const items = getAllItems()
  const existingItemIndex = items.findIndex((i) => i.id === item.id)

  if (existingItemIndex >= 0) {
    items[existingItemIndex] = item
  } else {
    items.push(item)
  }

  localStorage.setItem("items", JSON.stringify(items))
}

// Helper function to delete an item
export function deleteItem(itemId: string): void {
  const items = getAllItems()
  const filteredItems = items.filter((item) => item.id !== itemId)
  localStorage.setItem("items", JSON.stringify(filteredItems))
}

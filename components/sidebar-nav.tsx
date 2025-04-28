"use client"

import type React from "react"
import Image from "next/image"

import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  Archive,
  CheckSquare,
  Clock,
  Home,
  LogOut,
  User,
  ShoppingBag,
  Package,
  ShoppingCart,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Translate } from "@/components/translation"

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className={cn("border-r", className)} {...props}>
        <SidebarHeader className="border-b py-4">
          <div className="flex items-center gap-2 px-4">
            <Image
              src="/images/paypath-logo.png"
              alt="PayPath Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-bold">PayPath</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <Home className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.dashboard" />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* My Items */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/items")}>
                <Link href="/items">
                  <ShoppingBag className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.items" />
                  </span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/items/create")}>
                    <Link href="/items/create">
                      <Package className="h-4 w-4 mr-2" />
                      <Translate text="sidebar.create_item" />
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* Outgoing Orders */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/outgoing-orders")}>
                <Link href="/outgoing-orders">
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.outgoing_orders" />
                  </span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/outgoing-orders/create")}>
                    <Link href="/outgoing-orders/create">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <Translate text="sidebar.create_order" />
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/outgoing-orders/past")}>
                    <Link href="/outgoing-orders/past">
                      <Archive className="h-4 w-4 mr-2" />
                      <Translate text="sidebar.past_orders" />
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* Incoming Orders */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/incoming-orders")}>
                <Link href="/incoming-orders">
                  <Package className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.incoming_orders" />
                  </span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/incoming-orders/pending-payment")}>
                    <Link href="/incoming-orders/pending-payment">
                      <Clock className="h-4 w-4 mr-2" />
                      <Translate text="sidebar.pending_payment" />
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/incoming-orders/processing")}>
                    <Link href="/incoming-orders/processing">
                      <CheckSquare className="h-4 w-4 mr-2" />
                      <Translate text="sidebar.processing_orders" />
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* Tax Return */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/tax-return")}>
                <Link href="/tax-return">
                  <Receipt className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.tax_return" />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Analytics */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                <Link href="/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.analytics" />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* User Profile */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/profile")}>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.profile" />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Settings */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/settings")}>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>
                    <Translate text="sidebar.settings" />
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t py-4">
          <div className="px-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-custom-blue to-custom-brightBlue flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
              </div>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>
                <LogOut className="h-5 w-5" />
                <span>
                  <Translate text="sidebar.logout" />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  )
}

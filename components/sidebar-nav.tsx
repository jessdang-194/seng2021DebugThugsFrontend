"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { BarChart3, Home, LogOut, Settings, Upload, User, History, Edit, Lock, HelpCircle, Mail } from "lucide-react"
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple"></div>
            <span className="text-lg font-bold">ColorFusion</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {/* Main - First item (previously Submissions) */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/main") || isActive("/submission")}>
                <Link href="/main">
                  <Home className="h-5 w-5" />
                  <span>Main</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/submission/new")}>
                    <Link href="/submission/new">
                      <Upload className="h-4 w-4 mr-2" />
                      New Submission
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/submission/edit")}>
                    <Link href="/submission/edit">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Submission
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/main")}>
                    <Link href="/main">
                      <History className="h-4 w-4 mr-2" />
                      All Submissions
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* Dashboard - Second item */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/settings")}>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/settings/privacy")}>
                    <Link href="/settings/privacy">
                      <Lock className="h-4 w-4 mr-2" />
                      Privacy
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* User Profile */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/profile")}>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span>User Profile</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={pathname === "/profile"}>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Personal Info
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/profile/password")}>
                    <Link href="/profile/password">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            {/* Analytics */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                <Link href="/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Help & Support */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/help")}>
                <Link href="/help">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/help/faq")}>
                    <Link href="/help/faq">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      FAQ
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/help/contact")}>
                    <Link href="/help/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t py-4">
          <div className="px-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-custom-purple to-custom-brightPurple flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
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


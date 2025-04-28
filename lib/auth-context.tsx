"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  initializeDefaultUser,
  loginUser,
  signupUser,
  updateUserProfile as updateUserProfileAction,
  getUserById as getUserByIdAction,
} from "./auth-actions"

// Define user type
export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  billingAddress: string
  companyName?: string
  abn?: string
  accountNumber?: string
  bsb?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (userData: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    billingAddress: string
    companyName?: string
    abn?: string
    accountNumber?: string
    bsb?: string
  }) => Promise<{
    success: boolean
    message: string
  }>
  logout: () => void
  updateUserProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>
  getUserById: (userId: string) => Promise<User | null>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount and create default user if needed
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check for existing user session in localStorage (for client-side persistence)
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }

        // Initialize default user in Redis if needed
        await initializeDefaultUser()
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Login function using server action
  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password)

      if (result.success && result.user) {
        // Set user in state and localStorage (for client-side persistence)
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }

      return { success: result.success, message: result.message }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Signup function using server action
  const signup = async (userData: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    billingAddress: string
    companyName?: string
    abn?: string
    accountNumber?: string
    bsb?: string
  }) => {
    try {
      const result = await signupUser(userData)

      if (result.success && result.user) {
        // Set user in state and localStorage (for client-side persistence)
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }

      return { success: result.success, message: result.message }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Update user profile function using server action
  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user) {
        return { success: false, message: "No user logged in" }
      }

      const result = await updateUserProfileAction(user.id, userData)

      if (result.success && result.user) {
        // Update user in state and localStorage (for client-side persistence)
        setUser(result.user)
        localStorage.setItem("user", JSON.stringify(result.user))
      }

      return { success: result.success, message: result.message }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Get user by ID function using server action
  const getUserById = async (userId: string) => {
    try {
      const result = await getUserByIdAction(userId)

      if (result.success && result.user) {
        return result.user
      }

      return null
    } catch (error) {
      console.error("Get user error:", error)
      return null
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user") // Only remove the current user session from localStorage
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateUserProfile,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

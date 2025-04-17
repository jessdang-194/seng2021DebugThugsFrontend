"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define user type
export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  billingAddress: string
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
  }) => Promise<{
    success: boolean
    message: string
  }>
  logout: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount and create default user if needed
  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Create default user if it doesn't exist
    const usersJson = localStorage.getItem("users") || "[]"
    const users = JSON.parse(usersJson)

    // Create default user if it doesn't exist
    const defaultUserExists = users.some((u: any) => u.email === "1@gmail.com")

    if (!defaultUserExists) {
      // Create default user
      const defaultUser = {
        id: "user_default_1",
        username: "demo_user",
        firstName: "Demo",
        lastName: "User",
        email: "1@gmail.com",
        password: "1",
        billingAddress: "123 Demo Street, Demo City, 12345",
      }

      // Add to users array and save to localStorage
      users.push(defaultUser)
      localStorage.setItem("users", JSON.stringify(users))
      console.log("Default user created with email: 1@gmail.com and password: 1")
    }

    setIsLoading(false)
  }, [])

  // Simulated login function
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get users from localStorage
      const usersJson = localStorage.getItem("users") || "[]"
      const users = JSON.parse(usersJson)

      console.log("Attempting login with:", email)
      console.log("Available users:", users)

      // Find user with matching email
      const foundUser = users.find((u: any) => u.email === email)

      // Check if user exists and password matches
      if (!foundUser) {
        return { success: false, message: "User not found" }
      }

      if (foundUser.password !== password) {
        return { success: false, message: "Invalid password" }
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser

      // Set user in state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      return { success: true, message: "Login successful" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Simulated signup function
  const signup = async (userData: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    billingAddress: string
  }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get existing users from localStorage
    const usersJson = localStorage.getItem("users") || "[]"
    const users = JSON.parse(usersJson)

    // Check if email already exists
    if (users.some((u: any) => u.email === userData.email)) {
      return { success: false, message: "Email already in use" }
    }

    // Check if username already exists
    if (users.some((u: any) => u.username === userData.username)) {
      return { success: false, message: "Username already in use" }
    }

    // Create new user with ID
    const newUser = {
      id: `user_${Date.now().toString()}`,
      ...userData,
    }

    // Add to users array and save to localStorage
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Create user object without password for state
    const { password: _, ...userWithoutPassword } = newUser

    // Set user in state and localStorage
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    return { success: true, message: "Account created successfully" }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user") // Only remove the current user session, not all users
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

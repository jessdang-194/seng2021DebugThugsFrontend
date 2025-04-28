"use server"

import { getUsers, saveUsers } from "./redis"
import type { User } from "./auth-context"

// Initialize default user if it doesn't exist
export async function initializeDefaultUser() {
  try {
    const users = await getUsers()

    // Check if default user exists
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
        companyName: "Demo Company Ltd",
        abn: "12 345 678 901",
        bsb: "123-456",
        accountNumber: "12345678",
      }

      // Add to users array and save to Redis
      users.push(defaultUser)
      await saveUsers(users)
      console.log("Default user created with email: 1@gmail.com and password: 1")
    }

    return { success: true }
  } catch (error) {
    console.error("Error initializing default user:", error)
    return { success: false, message: "Failed to initialize default user" }
  }
}

// Login user
export async function loginUser(email: string, password: string) {
  try {
    // Get users from Redis
    const users = await getUsers()

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

    return {
      success: true,
      message: "Login successful",
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Signup user
export async function signupUser(userData: {
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
}) {
  try {
    // Get existing users from Redis
    const users = await getUsers()

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

    // Add to users array and save to Redis
    users.push(newUser)
    await saveUsers(users)

    // Create user object without password for response
    const { password: _, ...userWithoutPassword } = newUser

    return {
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Update user profile
export async function updateUserProfile(userId: string, userData: Partial<User>) {
  try {
    // Get users from Redis
    const users = await getUsers()

    // Find the current user
    const userIndex = users.findIndex((u: any) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, message: "User not found" }
    }

    // Update user data, preserving password
    const updatedUser = {
      ...users[userIndex],
      ...userData,
    }

    // Update in users array
    users[userIndex] = updatedUser

    // Save to Redis
    await saveUsers(users)

    // Create user object without password for response
    const { password: _, ...userWithoutPassword } = updatedUser

    return {
      success: true,
      message: "Profile updated successfully",
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    // Get users from Redis
    const users = await getUsers()

    // Find user with matching ID
    const foundUser = users.find((u: any) => u.id === userId)

    if (!foundUser) {
      return { success: false, message: "User not found" }
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = foundUser

    return {
      success: true,
      user: userWithoutPassword as User,
    }
  } catch (error) {
    console.error("Get user error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

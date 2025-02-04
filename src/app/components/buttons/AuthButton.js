"use client"

import React from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material"

const AuthButton = () => {
  const { user, setUser, refreshUser } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    // Remove the token from storage
    localStorage.removeItem("authToken")
    await refreshUser()
    // Optionally, you can also reset Apollo Client's store here if needed
    // client.resetStore();
    // Update the auth state to null
    setUser(null)
    // Redirect if desired (for example, to the login page)
    router.push("/login")
  }

  const handleLogin = () => {
    // Redirect the user to the login page or open a login modal
    router.push("/login")
  }

  return (
    <div>
      {user ? (
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin} color="inherit">
          Login
        </Button>
      )}
    </div>
  )
}

export default AuthButton

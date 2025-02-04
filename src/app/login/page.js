"use client"

import { useState } from "react"
import { TextField, Button, Box, Typography, Alert } from "@mui/material"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../api/graphql"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const [userInput, setUserInput] = useState("") // Username or email input
  const [firstName, setFirstName] = useState("")
  const [userPassword, setUserPassword] = useState("") // Password input
  const [formError, setFormError] = useState("") // Error messages
  const [formLoading, setFormLoading] = useState(false) // Loading state
  const [loggedIn, setLoggedIn] = useState(false) // Tracks login state
  const { refreshUser } = useAuth()

  const [login] = useMutation(LOGIN, {
    onError: (err) => {
      console.error("GraphQL Error:", err) // Log error details
      setFormError("An error occurred. Please check your credentials.")
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("") // Clear any previous errors
    setFormLoading(true)

    try {
      const { data } = await login({
        variables: { username: userInput, password: userPassword },
        context: {
          //fetchOptions: { credentials: "include" }, // Include cookies in the request
        },
      })

      // Log the response from the server
      console.log("Server Response:", data)

      if (data?.tokenAuth?.success) {
        const authToken = data.tokenAuth.token.token
        localStorage.setItem("authToken", authToken)

        setUserInput("")
        setUserPassword("")
        setFirstName(data.tokenAuth.user.firstName)
        setLoggedIn(true) // Set login state
        await refreshUser()
      } else {
        setFormError(
          data?.tokenAuth?.errors
            ? Object.values(data.tokenAuth.errors).join(", ")
            : "Invalid credentials. Please try again."
        )
      }
    } catch (err) {
      console.error("Login failed:", err)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleLogout = () => {
    setLoggedIn(false) // Reset login state
    alert("You have been logged out.")
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Login
      </Typography>
      {formError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError}
        </Alert>
      )}
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Email"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formLoading}
            >
              {formLoading ? "Logging in..." : "Login"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setUserInput("")
                setUserPassword("")
                setFormError("")
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
      ) : (
        <Box>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Welcome back, {firstName}!
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

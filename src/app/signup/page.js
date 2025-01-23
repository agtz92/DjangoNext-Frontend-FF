"use client"

import { useState } from "react"
import { TextField, Button, Box, Typography } from "@mui/material"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      alert("Passwords do not match")
      return
    }

    console.log("Signing up with:", { username, email, firstName, lastName, password })

    try {
      // Replace with actual signup logic, e.g., API call
      alert("Signup successful!")
      setUsername("")
      setEmail("")
      setFirstName("")
      setLastName("")
      setPassword("")
      setRepeatPassword("")
    } catch (err) {
      console.error("Signup failed:", err)
      alert("Failed to sign up. Please try again.")
    }
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Repeat Password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Signup
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setUsername("")
              setEmail("")
              setFirstName("")
              setLastName("")
              setPassword("")
              setRepeatPassword("")
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  )
}

import React, { createContext, useContext, useState, useEffect } from "react"

// Create the Login Context
const LoginContext = createContext()

// Custom hook to use the Login Context
export const useLogin = () => {
  return useContext(LoginContext)
}

// Provider component to manage login state
export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  // Check if the user is logged in when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-login", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        })
        if (response.ok) {
          setLoggedIn(true) // User is logged in
        } else {
          setLoggedIn(false) // User is not logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        setLoggedIn(false)
      }
    }

    checkLoginStatus()
  }, [])

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  )
}

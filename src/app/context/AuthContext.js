"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import { useApolloClient } from "@apollo/client"
import { GET_ME } from "../api/graphql"

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  refreshUser: async () => {}, // Added refreshUser to the context value
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  // A function to fetch the current user using the GET_ME query.
  const refreshUser = async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        const { data } = await client.query({
          query: GET_ME,
          fetchPolicy: "network-only", // ensure we get fresh data from the server
        })
        if (data?.me) {
          setUser(data.me)
          console.log("GET_ME: ", data.me)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching current user:", error)
        setUser(null)
      }
    } else {
        console.log("Not Authenticated")
      setUser(null)
    }
  }

  // Run refreshUser on initial mount.
  useEffect(() => {
    refreshUser()
  }, [client])

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

"use client"
import React from "react"
import { List } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_CUSTOMERS } from "../api/graphql" 
import CustomerListItem from "../components/cards/customers/CustomerListItem"

export default function CustomersPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_CUSTOMERS, {
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading customers...</p>
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    )
  }

  const customers = data.customers || []

  return (
    <div style={{ color: theme.palette.text.primary, padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Customers
      </h1>

      <List
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto", // Center the list
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {customers.map((customer) => (
          <CustomerListItem key={customer.id} customer={customer} />
        ))}
      </List>
    </div>
  )
}

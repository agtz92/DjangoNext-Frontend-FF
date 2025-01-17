"use client"
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React from "react"
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from "../api/graphql" // Adjust the path as needed
import Link from "next/link"
import CustomerListItem from "../components/cards/customers/CustomerListItem"

export default function CustomersPage() {
  const { data, loading, error } = useQuery(GET_CUSTOMERS)

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

  const customers = data.customers

  return (
    <div style={{ padding: "20px" }}>
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

"use client"
import React from "react"
import { List } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_ORDERS } from "../api/graphql" 
import OrderListItem from "../components/cards/orders/OrderListItem"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"

export default function ProductsPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_ORDERS, {
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return <LoadingBackdrop/>
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    )
  }

  const orders = data.orders || []

  return (
    <div style={{ color: theme.palette.text.primary, padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Orders
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
        {orders.map((order) => (
          <OrderListItem key={order.id} order={order} />
        ))}
      </List>
    </div>
  )
}

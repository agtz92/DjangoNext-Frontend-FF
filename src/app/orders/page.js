"use client"
import React from "react"
import { List } from "@mui/material"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_ORDERS } from "../api/graphql" 
import OrderListItem from "../components/cards/orders/OrderListItem"

export default function ProductsPage() {
  const { data, loading, error } = useSuspenseQuery(GET_ORDERS)

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading orders...</p>
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
    <div style={{ padding: "20px" }}>
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

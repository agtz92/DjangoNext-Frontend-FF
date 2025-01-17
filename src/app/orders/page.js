import React from "react"
import { initializeApollo } from "@/lib/apolloClient"
import { GET_ORDERS } from "../api/graphql"
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import Link from "next/link"
import DeleteOrderButton from "../components/buttons/DeleteOrderButton"
import OrderListItem from "../components/cards/orders/OrderListItem"

export default async function OrdersPage() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: GET_ORDERS,
  })

  const orders = data.orders

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
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "gray",
              padding: "20px",
            }}
          >
            No orders available.
          </p>
        )}
      </List>
    </div>
  )
}

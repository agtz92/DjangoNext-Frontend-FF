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
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={`${order.customer.name}`}
                    src="/static/images/avatar/1.jpg" // Placeholder for customer avatar
                  />
                </ListItemAvatar>
                <Link href={`/orders/${order.id}`} passHref>
                  <ListItemText
                    primary={`Order #${order.id}`}
                    secondary={`Customer: ${
                      order.customer.name
                    } | Total: $${order.items.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )} | Created: ${new Date(
                      order.createdAt
                    ).toLocaleDateString()}`}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "#333",
                    }}
                    secondaryTypographyProps={{
                      fontSize: "14px",
                      color: "gray",
                    }}
                  />
                </Link>
              </ListItem>
              <DeleteOrderButton orderId={order.id} />
              <Divider variant="middle" />
            </React.Fragment>
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

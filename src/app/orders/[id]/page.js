import React from "react"
import { getClient } from "@/lib/apolloClient"
import { GET_ORDER_BY_ID } from "../../api/graphql"
import { List, ListItem, ListItemText } from "@mui/material"
import Link from "next/link"
import DeleteOrderButton from "@/app/components/buttons/DeleteOrderButton"

export default async function OrderDetailPage({ params }) {
  const { id } = await params

  let order = null

  try {
    const client = getClient() 
    const { data } = await client.query({
      query: GET_ORDER_BY_ID,
      variables: { id },
    })

    if (!data?.order) {
      return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "red" }}>Order Not Found</h1>
          <p style={{ textAlign: "center" }}>
            We couldn’t find an order with ID: <strong>{id}</strong>.
          </p>
          <Link
            href="/orders"
            style={{ textAlign: "center", display: "block", marginTop: "20px" }}
          >
            Back to Orders
          </Link>
        </div>
      )
    }

    order = data.order
  } catch (error) {
    console.error("Failed to fetch order details:", error)
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>Error Loading Order</h1>
        <p style={{ textAlign: "center" }}>
          Something went wrong while fetching the order details. Please try again later.
        </p>
        <Link
          href="/orders"
          style={{ textAlign: "center", display: "block", marginTop: "20px" }}
        >
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Order #{order.id}</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <p>
          <strong>Empresa:</strong> {order.customer.company?.name || "Unknown"}
        </p>
        <p>
          <strong>Customer:</strong> {order.customer.name || "Unknown"}
        </p>
        <p>
          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <h3>Order Items</h3>
      <List
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {order.items.length > 0 ? (
          order.items.map((item, index) => (
            <ListItem alignItems="flex-start" key={index}>
              <ListItemText
                primary={`${item.quantity} x ${item.product.name}`}
                secondary={`Price: $${item.price} | Total: $${
                  item.quantity * item.price
                }`}
              />
            </ListItem>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "10px" }}>
            No items in this order.
          </p>
        )}
      </List>

      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        Total Price: $
        {order.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h3>
      
      <DeleteOrderButton orderId={order.id} />

      <Link
        href="/orders"
        style={{
          textAlign: "center",
          display: "block",
          marginTop: "20px",
        }}
      >
        Back to Orders
      </Link>
    </div>
  )
}

import React from "react"
import { getClient } from "@/lib/apolloClient"
import { GET_ORDER_BY_ID } from "../../api/graphql"
import { List, ListItem, ListItemText, Typography } from "@mui/material"
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
        <h1 style={{ textAlign: "center", color: "red" }}>
          Error Loading Order
        </h1>
        <p style={{ textAlign: "center" }}>
          Something went wrong while fetching the order details. Please try
          again later.
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
      <Typography
        variant="h3"
        component="h1"
        color="text.primary"
        sx={{ textAlign: "center" }}
      >
        Order #{order.id}
      </Typography>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography
          variant="body1"
          component="p"
          color="text.highlight"
          sx={{ textAlign: "center" }}
        >
          <strong>Empresa:</strong> {order.customer.company?.name || "Unknown"}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="text.highlight"
          sx={{ textAlign: "center" }}
        >
          <strong>Customer:</strong> {order.customer.name || "Unknown"}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="text.highlight"
          sx={{ textAlign: "center" }}
        >
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </Typography>
      </div>

      <Typography variant="h4" component="h2" color="text.primary">
        Order Items
      </Typography>
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
                primary={
                  <Typography
                    variant="h6"
                    component="span"
                    color="text.primary"
                  >
                    {item.quantity} x {item.product.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="h6"
                    component="span"
                    color="text.primary"
                  >${item.quantity * item.price}
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "10px" }}>
            No items in this order.
          </p>
        )}
      </List>

      <Typography
        variant="h5"
        component="h3"
        color="text.primary"
        sx={{ textAlign: "center" }}
      >
        Total Price: $
        {order.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </Typography>

      <DeleteOrderButton orderId={order.id} />

      <Link
        href="/orders"
        style={{
          textAlign: "center",
          display: "block",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          component="h4"
          color="text.primary"
          sx={{ textAlign: "center" }}
        >
          Back to Orders
        </Typography>
      </Link>
    </div>
  )
}

import React from "react"
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material"
import Link from "next/link"

const OrderListItem = ({ order }) => {
  return (
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
            )} | Created: ${new Date(order.createdAt).toLocaleDateString()}`}
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
      <Divider variant="middle" />
    </React.Fragment>
  )
}

export default OrderListItem

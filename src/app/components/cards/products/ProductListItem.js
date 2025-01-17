import React from "react"
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material"
import Link from "next/link"

const ProductListItem = ({ item }) => {

  return (
    <React.Fragment key={item.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={item.name}
            src={item.image || "/static/images/avatar/placeholder.jpg"} // Placeholder for an item image
          />
        </ListItemAvatar>
        <Link href={`/products/${item.sku}`} passHref>
          <ListItemText
            primary={item.name}
            secondary={`Price: $${item.basePrice} USD`}
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

export default ProductListItem

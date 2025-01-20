import React from "react"
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
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
            primary={
              <>
                <Typography variant="h6" component="p" color="text.primary">{item.name}</Typography>
              </>
            }
            secondary={
              <>
                <Typography variant="body1" component="p" color="text.highlight">
                  ${item.basePrice} USD
                </Typography>
              </>
            }
          />
        </Link>
      </ListItem>
      <Divider variant="middle" />
    </React.Fragment>
  )
}

export default ProductListItem

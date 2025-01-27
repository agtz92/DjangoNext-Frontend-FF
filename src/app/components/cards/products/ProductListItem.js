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
      <Link href={`/products/${item.sku}`} passHref>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={item.name}
              src={item.image || "/static/images/avatar/placeholder.jpg"} // Placeholder for an item image
            />
          </ListItemAvatar>

          <ListItemText
            primary={
              <>
                <Typography variant="h6" component="span" color="text.primary">
                  {item.name}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography variant="body1" component="span" color="text.highlight">
                  ${item.basePrice} USD
                </Typography>
              </>
            }
          />
        </ListItem>
      </Link>
      <Divider variant="middle" />
    </React.Fragment>
  )
}

export default ProductListItem

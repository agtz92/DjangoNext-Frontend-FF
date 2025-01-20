import React from "react"
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material"
import Link from "next/link"

const CustomerListItem = ({ customer }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={customer.name}
          src="/static/images/avatar/1.jpg" // Replace with a dynamic image URL if available
        />
      </ListItemAvatar>
      <Link href={`/customers/${customer.id}`} passHref>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                variant="body1"
                component="span"
                color="text.primary"
                style={{ fontWeight: "bold" }}
              >
                {customer.company?.name || "No company available"}
              </Typography>
              <br />
              <Typography
                variant="h6"
                component="span"
                color="text.primary"
                style={{fontWeight: "bold" }}
              >
                {customer.name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                component="span"
                color= "text.highlight"
              >
                {customer.email}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color= "text.highlight"
                style={{ display: "block"}}
              >
                {customer.phone || "No phone available"}
              </Typography>
            </React.Fragment>
          }
          sx={{
            whiteSpace: "pre-wrap", // Ensures multiline support
          }}
        />
      </Link>
    </ListItem>
  )
}

export default CustomerListItem

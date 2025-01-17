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
                variant="body2"
                component="span"
                color="textSecondary"
                style={{ fontWeight: "bold" }}
              >
                {customer.company?.name || "No company available"}
              </Typography>
              <br />
              <Typography
                variant="body1"
                component="span"
                style={{ color: "#333", fontWeight: "bold" }}
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
                style={{ display: "block", color: "gray" }}
              >
                {customer.email}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                style={{ display: "block", color: "gray" }}
              >
                {customer.phone || "No phone available"}
              </Typography>
            </React.Fragment>
          }
          primaryTypographyProps={{
            fontWeight: "bold",
            color: "#333",
          }}
          secondaryTypographyProps={{
            fontSize: "14px",
            color: "gray",
          }}
          sx={{
            whiteSpace: "pre-wrap", // Ensures multiline support
          }}
        />
      </Link>
    </ListItem>
  )
}

export default CustomerListItem

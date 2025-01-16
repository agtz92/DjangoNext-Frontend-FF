"use client"
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React from "react"
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from "../api/graphql" // Adjust the path as needed
import Link from "next/link"

export default function CustomersPage() {
  const { data, loading, error } = useQuery(GET_CUSTOMERS)

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading customers...</p>
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    )
  }

  const customers = data.customers

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Customers
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
        {customers.map((customer) => (
          <React.Fragment key={customer.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={customer.name}
                  src="/static/images/avatar/1.jpg" // Replace with a dynamic image URL if available
                />
              </ListItemAvatar>
              <Link href={`/customers/${customer.id}`}>
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
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

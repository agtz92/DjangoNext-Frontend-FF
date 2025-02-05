import React from "react"
import { getClient } from "@/lib/apolloClient"
import { GET_CUSTOMER_BY_ID } from "../../api/graphql"
import { Box, Avatar } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { ShoppingCart } from "@mui/icons-material"
import CustomerCard from "@/app/components/cards/CustomerCard"
import SummaryCard from "@/app/components/cards/SummaryCard"
import Link from "next/link"
import { Height } from "@mui/icons-material"

export default async function CustomerDetailPage({ params }) {
  const { id } = await params
  

  let customer = null

  try {
    const client = getClient() // Get Apollo Client instance
    const { data } = await client.query({
      query: GET_CUSTOMER_BY_ID,
      variables: { id },
    })

    if (!data?.customer) {
      return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "red" }}>
            Customer Not Found
          </h1>
          <p style={{ textAlign: "center" }}>
            We couldn’t find a customer with ID: <strong>{id}</strong>.
          </p>
          <Link
            href="/customers"
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "20px",
            }}
          >
            Back to Customers
          </Link>
        </Box>
      )
    }

    customer = data.customer
  } catch (error) {
    console.error("Failed to fetch customer details:", error)
    return (
      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Error Loading Customer
        </h1>
        <p style={{ textAlign: "center" }}>
          Something went wrong while fetching the customer details. Please try
          again later.
        </p>
        <Link
          href="/customers"
          style={{
            textAlign: "center",
            display: "block",
            marginTop: "20px",
          }}
        >
          Back to Customers
        </Link>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        margin: {
          sm: 10,
          md: 20,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <CustomerCard
            empresa={`Empresa: ${customer.company?.name}` || "No company available"}
            empresaId= {customer.company.id}
            subtitle={customer.name || "No name available."}
            email={`Email: ${customer.email || "No email available."}`}
            phone={`Phone: ${customer.phone || "No phone available."}`}
            actionText="Edit"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <SummaryCard
            bgcolor="#2D46B9"
            avatarText={<ShoppingCart sx={{ color: "white" }} />}
            title="Total Purchases"
            content={`$${customer.orders.reduce(
              (total, order) =>
                total +
                order.items.reduce(
                  (itemTotal, item) => itemTotal + item.quantity * item.price,
                  0
                ),
              0
            )}`}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <SummaryCard
            bgcolor="#2D46B9"
            avatarText={<ShoppingCart sx={{ color: "white" }} />}
            title="Orders"
            content={`${customer.orders.length}`}
          />
        </Grid>
      </Grid>
      <Link
        href="/customers"
        style={{
          textAlign: "center",
          display: "block",
          marginTop: "20px",
        }}
      >
        Back to Customers
      </Link>
    </Box>
  )
}

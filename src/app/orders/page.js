"use client"
import React from "react"
import { Container, List, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_ORDERS } from "../api/graphql"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"
import Link from "next/link"
import GenericTable from "../components/tables/GenericTable"

export default function ProductsPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_ORDERS, {
    fetchPolicy: "no-cache",
  })

  if (loading) {
    return <LoadingBackdrop />
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    )
  }

  const orders = data.orders || []

  const columns = [
    {
      field: "id",
      label: "Order ID",
      maxWidth: 100,
      // Render the Order ID as a link with bold typography.
      render: (value, row) => (
        <Link href={`/orders/${row.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontWeight: "bold" }}>Order #{value}</Typography>
          </a>
        </Link>
      ),
    },
    {
      // Here, we pass the whole customer object in the row. We don’t use dot notation in the field.
      field: "customer",
      label: "Cliente",
      align: "right",
      maxWidth: 150,
      render: (value, row) =>
        row.customer && row.customer.name
          ? row.customer.name
          : "No customer available",
    },
    {
      // This column computes the total value from the order’s items.
      field: "total",
      label: "Total",
      align: "right",
      maxWidth: 100,
      render: (_, row) =>
        `$${row.items
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toFixed(2)}`,
    },
    {
      // The createdAt field is formatted as a localized date.
      field: "createdAt",
      label: "Created",
      align: "right",
      maxWidth: 150,
      render: (value) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(value));
        return formattedDate;
      },
    },
  ]

  return (
    <div style={{ color: theme.palette.text.primary, padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Orders
      </h1>

      <Container>
        <GenericTable data={orders} columns={columns} />
      </Container>
    </div>
  )
}

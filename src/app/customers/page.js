"use client"
import React from "react"
import { Container, List } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_CUSTOMERS } from "../api/graphql"
import Typography from "@mui/material/Typography"
import GenericTable from "../components/tables/GenericTable"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"
import Link from "next/link"

export default function CustomersPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_CUSTOMERS, {
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

  const customers = data.customers || []

  const columns = [
    {
      field: "name",
      label: "Customer Name",
      maxWidth: 100,
      // Custom render to wrap the name in a link with bold typography
      render: (value, row) => (
        <Link href={`/customers/${row.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
          </a>
        </Link>
      ),
    },
    {
      field: "company",
      label: "Company",
      align: "right",
      maxWidth: 40,
      // If the company is not available, show a default message
      render: (value) => (value ? value.name : "No company available"),
    },
    {
      field: "email",
      label: "Email",
      align: "right",
      maxWidth: 50,
    },
    {
      field: "phone",
      label: "Phone",
      align: "right",
      maxWidth: 40,
      render: (value) => value || "No phone available",
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
        Customers
      </h1>

      <Container>
        <GenericTable data={customers} columns={columns} />
      </Container>
    </div>
  )
}

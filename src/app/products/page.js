"use client"
import React from "react"
import { Container, List, Typography } from "@mui/material"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useTheme } from "@mui/material/styles"
import { GET_PRODUCTS } from "../api/graphql"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"
import Link from "next/link"
import GenericTable from "../components/tables/GenericTable"

export default function ProductsPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_PRODUCTS, {
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

  const products = data.products || []

  const columns = [
    {
      field: "sku",
      label: "SKU",
      maxWidth: 40,
      // Custom render to wrap the name in a link with bold typography
      render: (value, row) => (
        <Link href={`/products/${row.sku}`} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
          </a>
        </Link>
      ),
    },
    {
      field: "name",
      label: "Nombre",
      align: "right",
      maxWidth: 100,
    },
    {
      field: "description",
      label: "Descripcion",
      align: "left",
    },
    {
      field: "basePrice",
      label: "Precio",
      align: "right",
      maxWidth: 40,
      render: (value) => value.toLocaleString("es-MX"),
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
        Products
      </h1>
      <Container>
        <GenericTable data={products} columns={columns} />
      </Container>
    </div>
  )
}

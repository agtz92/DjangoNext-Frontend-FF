"use client"
import React from "react"
import { List } from "@mui/material"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useTheme } from "@mui/material/styles"
import { GET_PRODUCTS } from "../api/graphql" 
import ProductListItem from "../components/cards/products/ProductListItem"
import { Padding } from "@mui/icons-material"

export default function ProductsPage() {
  const theme = useTheme()
  const { data, loading, error } = useSuspenseQuery(GET_PRODUCTS, {
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading products...</p>
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    )
  }

  const products = data.products || []

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
        {products.map((product) => (
          <ProductListItem key={product.id} item={product} />
        ))}
      </List>
    </div>
  )
}

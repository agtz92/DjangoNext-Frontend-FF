import React from "react"
import { initializeApollo } from "@/lib/apolloClient" // Adjust path
import { GET_PRODUCTS } from "../api/graphql" // Adjust path
import { List } from "@mui/material"
import ProductListItem from "../components/cards/products/ProductListItem"

async function fetchProducts() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: GET_PRODUCTS,
  })

  return data.products || []
}

export default async function ProductsPage() {
  const products = await fetchProducts()

  return (
    <div style={{ padding: "20px" }}>
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
        {products.length > 0 ? (
          products.map((product) => (
            <ProductListItem key={product.id} item={product} />
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "gray",
              padding: "20px",
            }}
          >
            No products available.
          </p>
        )}
      </List>
    </div>
  )
}

export const revalidate = 5

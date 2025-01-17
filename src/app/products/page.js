import React from "react"
import { initializeApollo } from "@/lib/apolloClient" // Adjust path
import { GET_PRODUCTS } from "../api/graphql"
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import DeleteProductButton from "../components/buttons/DeleteProductButton"
import Link from "next/link"
import ProductListItem from "../components/cards/products/ProductListItem"

export default async function ProductsPage() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: GET_PRODUCTS,
  })

  const products = data.products

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

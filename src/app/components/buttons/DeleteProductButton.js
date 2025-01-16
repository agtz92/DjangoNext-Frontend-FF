"use client"

import React from "react"
import { useMutation } from "@apollo/client"
import { DELETE_PRODUCT } from "../../api/graphql" 
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

export default function DeleteProductButton({ productId }) {
  const router = useRouter()
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await deleteProduct({
          variables: { id: productId },
        })
        if (response.data.deleteProduct.success) {
          alert(response.data.deleteProduct.message)

          if (router.pathname === "/products") {
            router.refresh()
          } else {
            router.push("/products")
          }
        } else {
          alert("Failed to delete the product.")
        }
      } catch (err) {
        console.error("Error deleting product:", err)
        alert("An error occurred while deleting the product.")
      }
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Product"}
      </Button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  )
}

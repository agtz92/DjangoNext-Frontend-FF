"use client"

import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { UPDATE_PRODUCT, GET_PRODUCT_BY_SKU } from "../../../api/graphql" // Adjust path
import { TextField, Button, CircularProgress } from "@mui/material"
import { useRouter, useParams } from "next/navigation"

export default function ProductUpdatePage() {
  const params = useParams() // Get params from Next.js
  const { sku } = params // Extract `sku` from params
  const router = useRouter()

  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    description: "",
    basePrice: "",
    sku: sku, // Pre-fill SKU from params
  })

  // Fetch the product data by SKU
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_PRODUCT_BY_SKU, {
    variables: { sku },
    onCompleted: (data) => {
      const product = data.product
      setFormValues({
        id: product.id,
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        sku: product.sku,
      })
    },
  })

  const [updateProduct, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_PRODUCT)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateProduct({
        variables: {
          id: formValues.id,
          name: formValues.name,
          description: formValues.description,
          basePrice: parseFloat(formValues.basePrice),
          sku: formValues.sku,
        },
      })

      alert("Product updated successfully!")
      router.push("/products") // Redirect to products page after update
    } catch (err) {
      console.error("Error updating product:", err)
    }
  }

  if (queryLoading) {
    return (
      <CircularProgress style={{ display: "block", margin: "20px auto" }} />
    )
  }

  if (queryError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>Failed to load product data</h1>
        <p>{queryError.message}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Base Price"
          name="basePrice"
          value={formValues.basePrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="SKU"
          name="sku"
          value={formValues.sku}
          fullWidth
          margin="normal"
          disabled
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          fullWidth
          disabled={mutationLoading}
        >
          {mutationLoading ? "Updating..." : "Update Product"}
        </Button>
        {mutationError && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {mutationError.message}
          </p>
        )}
      </form>
    </div>
  )
}

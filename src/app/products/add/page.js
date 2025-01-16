"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_PRODUCT } from "../../api/graphql" // Adjust the path as necessary
import { TextField, Button, Box, Typography } from "@mui/material"

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT)

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Submitting variables:", { name, sku, basePrice, description })

    try {
      await createProduct({
        variables: {
          name,
          sku,
          basePrice: parseFloat(basePrice), // Ensure it's a float
          description, // Include description
        },
      })
      alert("Product created successfully!")
      setName("")
      setSku("")
      setBasePrice("")
      setDescription("") // Reset the description field
    } catch (err) {
      console.error("Error creating product:", err)
      alert("Failed to create product. Please try again.")
    }
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Base Price"
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          fullWidth
          required
          margin="normal"
          inputProps={{ step: "0.01" }} // Support decimal values
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Product"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setName("")
              setSku("")
              setBasePrice("")
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
      {error && (
        <Typography color="error" mt={2}>
          {error.message}
        </Typography>
      )}
      {data && (
        <Typography color="success" mt={2}>
          Product {data.createProduct.product.name} added successfully!
        </Typography>
      )}
    </Box>
  )
}

import { getClient } from "@/lib/apolloClient" // Adjust path to Apollo Client setup
import { GET_PRODUCT_BY_SKU } from "../../api/graphql" // Adjust path to your GraphQL queries
import DeleteProductButton from "@/app/components/buttons/DeleteProductButton"
import Image from "next/image"
import { Typography } from "@mui/material"

export default async function ProductDetailPage({ params }) {
  const { sku } = await params

  let product = null

  try {
    // Fetch product details by SKU
    const client = getClient()
    const { data } = await client.query({
      query: GET_PRODUCT_BY_SKU,
      variables: { sku },
    })

    product = data.product

    if (!product) {
      return (
        <div
          style={{
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            color: "black",
          }}
        >
          <h1 style={{ textAlign: "center", color: "red" }}>
            Product Not Found
          </h1>
          <p style={{ textAlign: "center" }}>
            We couldn’t find a product with SKU: <strong>{sku}</strong>.
          </p>
        </div>
      )
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error)
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>
          Error Loading Product
        </h1>
        <p style={{ textAlign: "center" }}>
          Something went wrong while fetching the product details. Please try
          again later.
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="subtitle1" component="p" color="text.primary">
        ID: {product.id}
      </Typography>
      <Typography variant="h4" component="h1" color="text.primary">
        {product.name}
      </Typography>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
        )}
      </div>
      <Typography variant="body1" component="p" color="text.primary">
        {product.description || "No description available."}
      </Typography>
      <Typography variant="h6" component="h2" color="text.primary">
        Price: ${product.basePrice} USD
      </Typography>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <DeleteProductButton productId={product.id} />
      </div>
    </div>
  )
}

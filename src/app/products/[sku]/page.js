import { initializeApollo } from "@/lib/apolloClient" // Adjust path to Apollo Client setup
import { GET_PRODUCTS, GET_PRODUCT_BY_SKU } from "../../api/graphql" // Adjust path to your GraphQL queries
import DeleteProductButton from "@/app/components/buttons/DeleteProductButton"

export default async function ProductDetailPage({ params }) {
  const { sku } = await params

  const apolloClient = initializeApollo()

  let product
  try {
    // Fetch product details by SKU
    const { data } = await apolloClient.query({
      query: GET_PRODUCT_BY_SKU,
      variables: { sku },
    })
    product = data.product

    if (!product) {
      throw new Error("Product not found")
    }
  } catch (error) {
    // If product not found or other error, show a message
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>Product Not Found</h1>
        <p style={{ textAlign: "center" }}>
          We couldnt find a product with SKU: <strong>{sku}</strong>.
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <p>ID: {product.id}</p>
      <h1 style={{ textAlign: "center" }}>{product.name}</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* <img
          src="/static/images/avatar/1.jpg" // Replace with product.image_url if available
          alt={product.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        /> */}
      </div>
      <p style={{ fontSize: "18px", textAlign: "justify" }}>
        {product.description || "No description available."}
      </p>
      <h3 style={{ fontSize: "20px" }}>Price: ${product.basePrice} USD</h3>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <DeleteProductButton productId={product.id} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const apolloClient = initializeApollo()

  try {
    // Fetch all products to generate static params
    const { data } = await apolloClient.query({
      query: GET_PRODUCTS,
    })

    const products = data.products || []
    return products.map((product) => ({ sku: product.sku }))
  } catch (error) {
    console.error("Error fetching products for static params:", error)
    return []
  }
}

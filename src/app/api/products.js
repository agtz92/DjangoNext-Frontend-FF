import { fetchData } from "./index"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

// Fetch all products
export async function fetchProducts() {
  return await fetchData(`${API_BASE_URL}products/`)
}

// Fetch a single product by SKU
export async function fetchProductBySKU(sku) {
  const url = `http://127.0.0.1:8000/api/products/${sku}/`
  // console.log("Fetching Product by SKU:", url);

  const response = await fetch(url, { headers: { Accept: "application/json" } })
  if (!response.ok) {
    // console.log("Error Response:", await response.text());
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  const data = await response.json()
  // console.log("Fetched Product Data:", data);
  return data
}

// Add a new product
export async function addProduct(productData) {
  const url = `${API_BASE_URL}products/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to add product.");
  }

  const data = await response.json();
  return data;
}

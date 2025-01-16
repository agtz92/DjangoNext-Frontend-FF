 const API_BASE_URL = "http://127.0.0.1:8000/api/" // Django API base URL
 export const GQL_BASE_URL = "http://127.0.0.1:8000/gql/" // Django API base URL
 

// Generic fetch wrapper for API calls
export async function fetchData(url) {
  const response = await fetch(url)
  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({})) // Try to parse error details
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}. ${
        errorDetails.message || ""
      }`
    )
  }
  return await response.json()
}

// Re-export modules for easier imports
export * from "./products"
export * from "./customers"
export * from "./orders"

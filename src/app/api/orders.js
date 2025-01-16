import { fetchData } from "./index"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

// Fetch all customers
export async function fetchOrders() {
  return await fetchData(`${API_BASE_URL}orders/`)
}

// Fetch a single Order by ID
export async function fetchOrderById(id) {
  const url = `${API_BASE_URL}orders/${id}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Log the error response for debugging
      console.error("Failed to fetch order:", await response.text());
      throw new Error(`Failed to fetch order with ID: ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchOrderById:", error);
    throw error;
  }
}


export async function createOrderWithItems(orderData) {
  const API_BASE_URL = "http://127.0.0.1:8000/api/"

  const response = await fetch(`${API_BASE_URL}orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData), // Send full order payload, including items
  })

  if (!response.ok) {
    const errorHtml = await response.text()
    console.error("HTML Error Response:", errorHtml)
    throw new Error("Failed to create order.")
  }

  return await response.json()
}

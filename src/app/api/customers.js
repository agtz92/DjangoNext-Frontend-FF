import { fetchData } from "./index"

const API_BASE_URL = "http://127.0.0.1:8000/api/"

// Fetch all customers
export async function fetchCustomers() {
  return await fetchData(`${API_BASE_URL}customers/`)
}

// Fetch a single customer by ID
export async function fetchCustomerById(id) {
  const url = `http://127.0.0.1:8000/api/customers/${id}/`
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

// Add a new customer
export async function addCustomer(customerData) {
  const url = `${API_BASE_URL}customers/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to add customer.");
  }

  const data = await response.json();
  return data;
}
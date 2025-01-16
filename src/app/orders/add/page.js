"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GET_PRODUCTS, CREATE_ORDER } from "../../api/graphql";
import { CircularProgress, Button } from "@mui/material";

export default function AddOrderPage() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orderItems, setOrderItems] = useState([
    { product: "", quantity: 1, price: 0.0 },
  ]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { data: customerData, loading: loadingCustomers } = useQuery(GET_CUSTOMERS);
  const { data: productData, loading: loadingProducts } = useQuery(GET_PRODUCTS);
  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER);

  const customers = customerData?.customers || [];
  const products = productData?.products || [];

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] =
      field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    setOrderItems(updatedItems);
  };

  const addOrderItem = () =>
    setOrderItems([...orderItems, { product: "", quantity: 1, price: 0.0 }]);

  const removeOrderItem = (index) =>
    setOrderItems(orderItems.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validItems = orderItems.filter((item) => item.product);

    if (!validItems.length) {
      setError("You must add at least one valid order item.");
      return;
    }

    const payload = {
      customer: selectedCustomer,
      items: validItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await createOrder({
        variables: {
          customerId: payload.customer,
          items: payload.items,
        },
      });

      setSuccess(true);
      setOrderItems([{ product: "", quantity: 1, price: 0.0 }]);
      setSelectedCustomer("");
    } catch (err) {
      setError("Failed to create the order. Please try again.");
    }
  };

  if (loadingCustomers || loadingProducts) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Add Order</h1>
      {success && <p style={{ color: "green" }}>Order created successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Customer Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Items */}
        <h3>Order Items</h3>
        {orderItems.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            <select
              value={item.product}
              onChange={(e) =>
                handleOrderItemChange(index, "product", e.target.value)
              }
              required
              style={{ flex: 1, padding: "8px" }}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleOrderItemChange(index, "quantity", e.target.value)
              }
              placeholder="Quantity"
              required
              style={{ flex: 1, padding: "8px" }}
              min="1"
            />
            <input
              type="number"
              step="0.01"
              value={item.price}
              onChange={(e) =>
                handleOrderItemChange(index, "price", e.target.value)
              }
              placeholder="Price"
              required
              style={{ flex: 1, padding: "8px" }}
              min="0"
            />
            <button
              type="button"
              onClick={() => removeOrderItem(index)}
              style={{
                padding: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addOrderItem}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
          }}
        >
          Add Item
        </button>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
          }}
          disabled={creatingOrder}
        >
          {creatingOrder ? "Creating..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
}

"use client"

import React from "react"
import { useMutation } from "@apollo/client"
import { DELETE_ORDER } from "../../api/graphql"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

export default function DeleteOrderButton({ orderId }) {
  const router = useRouter()
  const [deleteOrder, { loading, error }] = useMutation(DELETE_ORDER)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await deleteOrder({
          variables: { id: orderId },
        })
        if (response.data.deleteOrder.success) {
          alert("Order deleted successfully.")

          if (router.pathname === "/orders") {
            router.refresh()
          } else {
            router.push("/orders")
          }
        } else {
          alert("Failed to delete the order.")
        }
      } catch (err) {
        console.error("Error deleting order:", err)
        alert("An error occurred while deleting the order.")
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
        {loading ? "Deleting..." : "Delete Order"}
      </Button>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  )
}

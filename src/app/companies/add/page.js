"use client"

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_COMPANY } from "../../api/graphql" // Adjust the import path accordingly

export default function AddCompanyForm() {
  const [formData, setFormData] = useState({
    name: "",
    businessLine: "",
    state: "",
  })

  const [createCompany, { data, loading, error }] = useMutation(CREATE_COMPANY)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createCompany({ variables: formData })
      if (response.data.createCompany.success) {
        alert(response.data.createCompany.message)
        setFormData({ name: "", businessLine: "", state: "" }) // Reset form
      } else {
        alert(response.data.createCompany.message) // Handle duplicate name case
      }
    } catch (err) {
      console.error("Error creating company:", err)
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Create Company</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
            }}
          />
        </div>
        <div>
          <label htmlFor="businessLine">Business Line</label>
          <input
            id="businessLine"
            name="businessLine"
            value={formData.businessLine}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
            }}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px" }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && !data.createCompany.success && (
        <p style={{ color: "red" }}>{data.createCompany.message}</p>
      )}
    </div>
  )
}

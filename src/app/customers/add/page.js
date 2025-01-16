"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_CUSTOMER, GET_COMPANIES } from "../../api/graphql";
import { v4 as uuidv4 } from "uuid"; // Import UUID

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    id: uuidv4(), // Generate a UUID for the customer
    name: "",
    email: "",
    phone: "",
    companyId: "", // Add companyId field
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Fetch available companies
  const { data: companyData, loading: loadingCompanies, error: companyError } = useQuery(GET_COMPANIES);

  const [addCustomerMutation] = useMutation(CREATE_CUSTOMER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { data } = await addCustomerMutation({
        variables: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyId: formData.companyId || null, // Pass companyId if selected
        },
      });

      if (data.createCustomer.success) {
        setSuccess(true);
        setFormData({ id: uuidv4(), name: "", email: "", phone: "", companyId: "" }); // Reset form
        setTimeout(() => router.push("/customers"), 2000); // Redirect
      } else {
        setError(data.createCustomer.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loadingCompanies) return <p>Loading companies...</p>;
  if (companyError) return <p>Error loading companies: {companyError.message}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Add Customer</h1>
      {success && <p style={{ color: "green" }}>Customer added successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="companyId">Company</label>
          <select
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select a company</option>
            {companyData.companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Customer
        </button>
      </form>
    </div>
  );
}

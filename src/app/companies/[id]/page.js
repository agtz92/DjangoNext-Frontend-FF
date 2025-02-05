// CompanyDetailPage.jsx (or .js)
import React from "react"
import { getClient } from "@/lib/apolloClient"
import { GET_COMPANY_BY_ID } from "../../api/graphql"
import { Box, Container, Typography } from "@mui/material"
import Link from "next/link"
import CompanyCustomersTable from "./CompanyCustomersTable" // Adjust the path as needed

export default async function CompanyDetailPage({ params }) {
  const { id, loading, error } = await params

  let company = null
  let totalCompanyRevenue = 0

  try {
    const client = getClient()
    const { data, error } = await client.query({
      query: GET_COMPANY_BY_ID,
      variables: { id },
    })

    if (!data?.company) {
      return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <Typography variant="h4" align="center" color="error">
            Company Not Found
          </Typography>
          <Typography align="center">
            We couldn’t find a company with ID: <strong>{id}</strong>.
          </Typography>
          <Link
            href="/companies"
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "20px",
            }}
          >
            Back to Companies
          </Link>
        </Box>
      )
    }

    // Enrich each customer with its total revenue from its orders.
    company = {
      ...data.company,
      customers: data.company.customers.map((customer) => {
        const totalPrice = customer.orders.reduce(
          (orderTotal, order) => orderTotal + (order.totalPrice || 0),
          0
        )
        return { ...customer, totalPrice }
      }),
    }

    totalCompanyRevenue = company.customers.reduce(
      (total, customer) => total + customer.totalPrice,
      0
    )
  } catch (error) {
    console.error("Failed to fetch company details:", error)
    return (
      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h4" align="center" color="error">
          Error Loading Company
        </Typography>
        <Typography align="center">
          Something went wrong while fetching the company details. Please try
          again later.
        </Typography>
        <Link
          href="/companies"
          style={{
            textAlign: "center",
            display: "block",
            marginTop: "20px",
          }}
        >
          Back to Companies
        </Link>
      </Box>
    )
  }

  return (
    <Container>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ marginBottom: "20px" }}
      >
        Total Revenue: ${totalCompanyRevenue.toFixed(2)}
      </Typography>

      <Typography variant="h4" align="center">
        {company.name}
      </Typography>

      <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography>
          <strong>Business Line:</strong> {company.businessLine || "N/A"}
        </Typography>
        <Typography>
          <strong>State:</strong> {company.state || "N/A"}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Customers
      </Typography>

      {company.customers.length > 0 ? (
        <CompanyCustomersTable customers={company.customers} />
      ) : (
        <Typography align="center" sx={{ padding: "10px" }}>
          No customers associated with this company.
        </Typography>
      )}

      <Link
        href="/companies"
        style={{
          textAlign: "center",
          display: "block",
          marginTop: "20px",
        }}
      >
        Back to Companies
      </Link>
    </Container>
  )
}

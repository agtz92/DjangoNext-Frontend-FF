// CompanyCustomersTable.jsx
"use client"

import React from "react"
import { Typography } from "@mui/material"
import Link from "next/link"
import GenericTable from "../../components/tables/GenericTable" // Adjust the path as needed

export default function CompanyCustomersTable({ customers }) {
  const customerColumns = [
    {
      field: "name",
      label: "Name",
      maxWidth: 150,
      // Render the name as a link to the customer detail page
      render: (value, row) => (
        <Link href={`/customers/${row.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
          </a>
        </Link>
      ),
    },
    {
      field: "email",
      label: "Email",
      maxWidth: 200,
    },
    {
      field: "totalPrice",
      label: "Total",
      align: "right",
      maxWidth: 100,
      // Format the total revenue as currency
      render: (value) => `$${value.toFixed(2)}`,
    },
  ]

  return <GenericTable data={customers} columns={customerColumns} />
}

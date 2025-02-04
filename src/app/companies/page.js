"use client"
import React from "react"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_COMPANIES } from "../api/graphql"
import { Container, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"
import Link from "next/link"
import GenericTable from "../components/tables/GenericTable"

export default function CompaniesPage() {
  const theme = useTheme()

  const { data, loading, error } = useSuspenseQuery(GET_COMPANIES, {
    fetchPolicy: "no-cache",
  })

  if (loading) {
    return <LoadingBackdrop />
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error loading companies: {error.message}
      </p>
    )
  }

  const companies = data.companies || []

  const columns = [
    {
      field: "name",
      label: "Nombre",
      // Custom render to wrap the name in a link with bold typography
      render: (value, row) => (
        <Link href={`/companies/${row.id}`} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
          </a>
        </Link>
      ),
    },
    {
      field: "businessLine",
      label: "Giro",
      align: "right",
      maxWidth: 40,
    },
    {
      field: "state",
      label: "Estado",
      align: "right",
      maxWidth: 40,
    },
  ]

  return (
    <div style={{ color: theme.palette.text.primary, padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Companies</h1>
      <Container>
        <GenericTable data={companies} columns={columns} />
      </Container>
    </div>
  )
}

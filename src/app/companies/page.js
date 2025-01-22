"use client"
import React from "react"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GET_COMPANIES } from "../api/graphql"
import { List, ListItem, ListItemText, Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import CompanyListItem from "../components/cards/companies/CompanyListItem"
import LoadingBackdrop from "../components/misc/LoadingBackdrop"

export default function CompaniesPage() {
  const theme = useTheme()

  const { data, loading, error } = useSuspenseQuery(GET_COMPANIES, {
    fetchPolicy: "no-cache"
  })

  if (loading) {
    return <LoadingBackdrop/>
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error loading companies: {error.message}
      </p>
    )
  }

  const companies = data.companies || []

  return (
    <div style={{ color: theme.palette.text.primary, padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Companies</h1>
      <List
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {companies.map((company) => (
          <React.Fragment key={company.id}>
            <Link href={`/companies/${company.id}`} passHref>
              <CompanyListItem key={company.id} company={company} />
            </Link>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

import React from "react"
import { ListItem, ListItemText } from "@mui/material"

const CompanyListItem = ({ company }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={company.name}
        secondary={`Business Line: ${company.businessLine} | State: ${company.state}`}
        primaryTypographyProps={{
          fontWeight: "bold",
          color: "#333",
        }}
        secondaryTypographyProps={{
          fontSize: "14px",
          color: "gray",
        }}
      />
    </ListItem>
  )
}

export default CompanyListItem

"use client"

import React from "react"
import Link from "next/link"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const DrawerListItem = ({ href, icon, primary }) => {
  return (
    <ListItem disablePadding>
      <Link style={{ width: "100%" }} href={href}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItemButton>
      </Link>
    </ListItem>
  )
}

export default DrawerListItem

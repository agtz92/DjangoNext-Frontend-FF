import { React, useState } from "react"
import Link from "next/link"
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"

//MUI ICONS
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const ApplicationDrawerItem = ({
  icon,
  primary,
  subItems,
  handleDrawerClose,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = (event) => {
    if (subItems) {
      event.stopPropagation()
      setOpen(!open)
    } else {
      console.log("Closing drawer for:", primary)
      handleDrawerClose()
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <ListItemButton onClick={handleOpen} sx={{ width: "100%" }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
          {subItems && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItemButton>
      </ListItem>
      {subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton
                key={subItem.primary}
                component={Link}
                href={subItem.href}
                onClick={() => {
                  console.log("Closing drawer for sub-item:", subItem.primary)
                  handleDrawerClose()
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText secondary={subItem.primary} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

ApplicationDrawerItem.displayName = "ApplicationDrawerItem"

export default ApplicationDrawerItem

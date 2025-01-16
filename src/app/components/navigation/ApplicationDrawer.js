"use client"
import React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined"
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined"
import BusinessIcon from "@mui/icons-material/Business"

import DrawerListItem from "./DrawerListItem"

const ApplicationDrawer = ({ open, onClose }) => {
  const menu1 = [
    { href: "/products", icon: <SellOutlinedIcon />, primary: "Products" },
    {
      href: "/customers",
      icon: <PersonPinOutlinedIcon />,
      primary: "Customers",
    },
    { href: "/orders", icon: <RequestQuoteOutlinedIcon />, primary: "Orders" },
    { href: "/companies", icon: <BusinessIcon />, primary: "Companies" },
  ]
  const menu2 = [
    { href: "/products", icon: <SellOutlinedIcon />, primary: "Products" },
    {
      href: "/customers",
      icon: <PersonPinOutlinedIcon />,
      primary: "Customers",
    },
    { href: "/orders", icon: <RequestQuoteOutlinedIcon />, primary: "Orders" },
    { href: "/companies", icon: <BusinessIcon />, primary: "Companies" },
  ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
        {menu1.map((item, index) => (
          <DrawerListItem
            key={index}
            href={item.href}
            icon={item.icon}
            primary={item.primary}
          />
        ))}
      </List>
      <Divider />
      <List>
        {menu2.map((item, index) => (
          <DrawerListItem
            key={index}
            href={item.href}
            icon={item.icon}
            primary={item.primary}
          />
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  )
}

export default ApplicationDrawer

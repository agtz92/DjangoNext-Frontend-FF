"use client"
import React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined"
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import BusinessIcon from "@mui/icons-material/Business"
import { useDrawer } from "../../context/DrawerContext"
import ApplicationDrawerItem from "./ApplicationDrawerItem"

const ApplicationDrawer = () => {
  const { drawerOpen: open, toggleDrawer } = useDrawer() // Get context values

  const handleClose = () => {
    toggleDrawer(false) // Close the drawer
  }

  const menu1 = [
    {
      icon: <SellOutlinedIcon />,
      primary: "Products",
      subItems: [
        {
          href: "/products",
          icon: <SearchIcon />,
          primary: "View Products",
        },
        {
          href: "/products/add",
          icon: <AddIcon />,
          primary: "Create Product",
        },
      ],
    },
    {
      icon: <PersonPinOutlinedIcon />,
      primary: "Customers",
      subItems: [
        {
          href: "/customers",
          icon: <SearchIcon />,
          primary: "View Customers",
        },
        {
          href: "/customers/add",
          icon: <AddIcon />,
          primary: "Create Customer",
        },
      ],
    },
    {
      icon: <RequestQuoteOutlinedIcon />,
      primary: "Orders",
      subItems: [
        {
          href: "/orders",
          icon: <SearchIcon />,
          primary: "View Orders",
        },
        {
          href: "/orders/add",
          icon: <AddIcon />,
          primary: "Create Order",
        },
      ],
    },
    {
      icon: <BusinessIcon />,
      primary: "Companies",
      subItems: [
        {
          href: "/companies",
          icon: <SearchIcon />,
          primary: "View Companies",
        },
        {
          href: "/companies/add",
          icon: <AddIcon />,
          primary: "Create Company",
        },
      ],
    },
  ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menu1.map((item, index) => (
          <ApplicationDrawerItem
            key={index}
            icon={item.icon}
            primary={item.primary}
            subItems={item.subItems}
            handleDrawerClose={handleClose}
          />
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer
      open={open}
      onClose={handleClose} // Close drawer when clicking outside
      ModalProps={{
        keepMounted: true, // Keeps the modal mounted for better performance
      }}
    >
      {DrawerList}
    </Drawer>
  )
}

export default ApplicationDrawer

"use client"
import React from "react"
import Link from "next/link"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AuthButton from "../buttons/AuthButton"
import { useDarkMode } from "@/app/context/DarkModeContext"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useDrawer } from "../../context/DrawerContext"

const ApplicationBar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { toggleDrawer } = useDrawer()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Portal Mamalon 2.0
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <AuthButton/>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicationBar

"use client"

import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useDarkMode } from "./context/DarkModeContext"

export const ThemeWrapper = ({ children }) => {
  const { darkMode } = useDarkMode()

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            borderColor: darkMode ? "#1E3163" : "#000000",
            "& .MuiListItemText-primary": {
              color: darkMode ? "#F8F8F8" : "#000000",
            },
            "& .MuiListItemText-secondary": {
              color: darkMode ? "#B0B0B0" : "#555555",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "600",
            backgroundColor: darkMode ? "#2D46B9" : "#1E3163",
            color: "#F8F8F8",
            borderColor: darkMode ? "#1E3163" : "#000000",
            "&:hover": {
              backgroundColor: darkMode ? "#1E3163" : "#2D46B9",
              borderColor: darkMode ? "#2D46B9" : "#1E3163",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: darkMode ? "#2D46B9" : "#1E3163",
            color: "#ffffff",
            fontWeight: "bold",
          },
        },
      },
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

"use client"

import React, { useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useDarkMode } from "./context/DarkModeContext"

export const ThemeWrapper = ({ children }) => {
  const { darkMode } = useDarkMode()

  const theme = createTheme({
    palette: { 
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#2D46B9" : "#1E3163", // Main primary color
      },
      secondary: {
        main: darkMode ? "#B0B0B0" : "#555555", // Secondary color
      },
      background: {
        default: darkMode ? "#121212" : "#FCFCFC", // Main background color
        paper: darkMode ? "#1E1E1E" : "#FFFFFF", // Paper background
      },
      text: {
        primary: darkMode ? "#F8F8F8" : "#000000", // Primary text color
        secondary: darkMode ? "#B0B0B0" : "#555555", // Secondary text color
        highlight: darkMode ? "#FF4081" : "#6200EA", // Custom highlight color
      },
      customColors: {
        highlight: darkMode ? "#FF4081" : "#6200EA", // Custom highlight color
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      fontSize: 14,
      h1: {
        color: darkMode ? "#F8F8F8" : "#1E3163",
      },
      h2: {
        color: darkMode ? "#B0B0B0" : "#2D46B9",
      },
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
      MuiTypography: {
        styleOverrides: {
          root: {
            color: darkMode ? "#F8F8F8" : "#000000", // Default text color
          },
        },
      },
    },
  })

  // Update body background color based on dark mode (Sync Case)
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#FCFCFC"
  }, [darkMode])

  // Update body background color with an async operation
  useEffect(() => {
    const updateBackgroundAsync = async () => {
      // Simulate a delay for async operations
      const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      await simulateDelay(500) // Simulate async delay

      document.body.style.backgroundColor = darkMode ? "#121212" : "#FCFCFC"
    }

    updateBackgroundAsync()
  }, [darkMode])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

"use client"
import React, { useState } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "../lib/apolloClient"

import ApplicationBar from "./components/navigation/ApplicationBar"
import ApplicationDrawer from "./components/navigation/ApplicationDrawer"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext"

const client = createApolloClient()

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (newOpen) => {
    setDrawerOpen(newOpen)
  }

  return (
    <ApolloProvider client={client}>
      <DarkModeProvider>
        <ThemeWrapper>
          <HtmlWrapper>
            <ApplicationBar onMenuClick={() => toggleDrawer(true)} />
            <ApplicationDrawer
              open={drawerOpen}
              onClose={() => toggleDrawer(false)}
            />
            {children}
          </HtmlWrapper>
        </ThemeWrapper>
      </DarkModeProvider>
    </ApolloProvider>
  )
}

const ThemeWrapper = ({ children }) => {
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
              color: darkMode ? "#F8F8F8" : "#000000", // Primary text color
            },
            "& .MuiListItemText-secondary": {
              color: darkMode ? "#B0B0B0" : "#555555", // Secondary text color
            },
            "&:hover": {},
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
      MuiIcon: {
        styleOverrides: {
          root: {
            color: "#F8F8F8",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: darkMode ? "#2D46B9" : "#1E3163", // Set solid color for table header
            color: "#ffffff", // Adjust text color for visibility
            fontWeight: "bold", // Optional: make header text bold
          },
        },
      },
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const HtmlWrapper = ({ children }) => {
  const { darkMode } = useDarkMode()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          darkMode ? "dark " : " "
        } `}
        style={{ margin: 0, width: "100vw" }}
      >
        {children}
      </body>
    </html>
  )
}

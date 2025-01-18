"use client"

import React from "react"
import { useDarkMode } from "./context/DarkModeContext"

const HtmlWrapper = ({ children }) => {
  const { darkMode } = useDarkMode()

  return (
    <html lang="en">
      <body
        className={`${
          darkMode ? "dark" : ""
        }`}
        style={{ margin: 0, width: "100vw" }}
      >
        {children}
      </body>
    </html>
  )
}

export default HtmlWrapper

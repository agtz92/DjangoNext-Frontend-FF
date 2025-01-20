"use client"

import React, { createContext, useContext, useState } from "react"

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children, initialDarkMode = false }) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode)

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider")
  }
  return context
}

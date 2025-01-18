"use client"

import React, { createContext, useContext } from "react"

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children, initialDarkMode = false }) => {
  return (
    <DarkModeContext.Provider value={{ darkMode: initialDarkMode }}>
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

"use client"

import React, { createContext, useState, useContext } from "react"

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (newOpen) => {
    setDrawerOpen(newOpen)
  }

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => useContext(DrawerContext)

"use client"
import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open) => {
    setDrawerOpen(open)
  }

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider")
  }
  return context
}

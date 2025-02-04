import React from "react"
import "./globals.css"
import { ApolloWrapper } from "./ApolloWrapper"
import { DrawerProvider } from "./context/DrawerContext"
import { DarkModeProvider } from "./context/DarkModeContext" // Do not import `useDarkMode` here
import ApplicationBar from "./components/navigation/ApplicationBar"
import ApplicationDrawer from "./components/navigation/ApplicationDrawer"
import { ThemeWrapper } from "./ThemeWrapper"
import HtmlWrapper from "./HtmlWrapper" // Import the client component
import { AuthProvider } from "./context/AuthContext"

const initialDarkMode = false

export default function RootLayout({ children }) {
  return (
    <ApolloWrapper>
      <AuthProvider>
        <DrawerProvider>
          <DarkModeProvider initialDarkMode={initialDarkMode}>
            <ThemeWrapper>
              <HtmlWrapper>
                <ApplicationBar />
                <ApplicationDrawer />
                {children}
              </HtmlWrapper>
            </ThemeWrapper>
          </DarkModeProvider>
        </DrawerProvider>
      </AuthProvider>
    </ApolloWrapper>
  )
}

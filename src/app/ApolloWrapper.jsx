"use client"

import { ApolloClient, HttpLink, ApolloLink } from "@apollo/client"
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      console.error(`[GraphQL Error]: ${error.message}`)

      // Handle unauthenticated errors
      if (error.extensions.code === "UNAUTHENTICATED") {
        console.warn("User is unauthenticated. Attempting to refresh token.")
      }
    })
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`)
  }
})

// Authorization middleware to attach token from localStorage
const authLink = setContext((_, { headers }) => {
  if (typeof window === "undefined") {
    // Skip adding the Authorization header during SSR
    return { headers }
  }

  // Get the token from localStorage
  const token = localStorage.getItem("authToken")

  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "", // Attach the token
    },
  }
})

// CSRF middleware
const csrfLink = setContext((_, { headers }) => {
  if (typeof window === "undefined") {
    // During SSR, skip setting the CSRF header
    return { headers }
  }

  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1]

  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrfToken || "",
    },
  }
})

// Create Apollo Client
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql",
    // credentials: "include", // Include cookies for CSRF
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(), // Use the SSR cache for Next.js
    link: ApolloLink.from([
      errorLink, // Error handling
      authLink, // Add token from localStorage
      csrfLink, // Add CSRF header if available
      typeof window === "undefined"
        ? new SSRMultipartLink({ stripDefer: true }).concat(httpLink) // SSR-specific link
        : httpLink, // Browser-specific link
    ]),
  })
}

// Apollo Provider
export function ApolloWrapper({ children }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

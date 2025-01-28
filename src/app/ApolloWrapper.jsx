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

// Authorization middleware with token refresh mechanism (Commented Out)
// const authLink = setContext(async (_, { headers }) => {
//   let jwtToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("JWT="))
//     ?.split("=")[1]

//   const refreshToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("JWT-refresh-token="))
//     ?.split("=")[1]

//   if (jwtToken) {
//     const payload = JSON.parse(atob(jwtToken.split(".")[1]))
//     const isTokenExpired = payload.exp * 1000 < Date.now()

//     if (isTokenExpired && refreshToken) {
//       console.warn("JWT expired. Attempting to refresh the token.")
//       try {
//         const response = await fetch("/gql", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Include cookies for the refresh token
//           body: JSON.stringify({
//             query: `
//               mutation RefreshToken {
//                 refreshToken(refreshToken: "${refreshToken}") {
//                   token
//                 }
//               }
//             `,
//           }),
//         })

//         const data = await response.json()
//         jwtToken = data?.data?.refreshToken?.token

//         // Update the JWT cookie with the new token
//         if (jwtToken) {
//           document.cookie = `JWT=${jwtToken}; Path=/; SameSite=Lax; HttpOnly=false`
//         }
//       } catch (err) {
//         console.error("Failed to refresh token:", err)
//       }
//     }
//   }

//   return {
//     headers: {
//       ...headers,
//       Authorization: jwtToken ? `JWT ${jwtToken}` : "",
//     },
//   }
// })

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
    //credentials: "include", // Include cookies for CSRF
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(), // Use the SSR cache for Next.js
    link:
      typeof window === "undefined"
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), csrfLink.concat(httpLink)])
        : csrfLink.concat(httpLink), // Combine links for the browser
  })
}

// Apollo Provider
export function ApolloWrapper({ children }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

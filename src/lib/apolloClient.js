import {
  registerApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import { ApolloClient, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      console.error(`[GraphQL Error]: ${error.message}`)

      // UNAUTHENTICATED error handling (Optional)
      if (error.extensions.code === "UNAUTHENTICATED") {
        console.warn("User is unauthenticated.")
      }
    })
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`)
  }
})

// Authorization middleware to include token in the headers
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

// CSRF token middleware
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

// Register Apollo Client
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  console.log("Register Apollo DEBUG: ", registerApolloClient) // Debugging purpose
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(
      authLink.concat(
        csrfLink.concat(
          new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql", // Absolute URL required
            fetchOptions: { cache: "no-store" }, // Disable result caching for dynamic SSR
          })
        )
      )
    ),
  })
})

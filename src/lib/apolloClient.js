import {
  registerApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import { ApolloClient, HttpLink, from  } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      console.error(`[GraphQL Error]: ${error.message}`)

      // Handle unauthenticated errors
      if (error.extensions.code === "UNAUTHENTICATED") {
        console.warn("User is unauthenticated. Attempting to refresh token.")

        // Refresh the token
        return fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
        })
          .then(() => forward(operation)) // Retry the original operation
          .catch((refreshError) => {
            console.error("Token refresh failed:", refreshError)
            return forward(operation) // Retry even if refresh fails
          })
      }
    })
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`)
  }
})

// Authorization middleware
const authLink = setContext((_, { headers }) => {
  const jwtToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1]

  return {
    headers: {
      ...headers,
      Authorization: jwtToken ? `JWT ${jwtToken}` : "", // Add JWT token to the Authorization header
    },
  }
})

// CSRF token middleware
const csrfLink = setContext((_, { headers }) => {
  if (typeof document !== "undefined") {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1]

    return {
      headers: {
        ...headers,
        "X-CSRFToken": csrfToken || "", // Add CSRF token to headers
      },
    }
  }

  return { headers }
})

// Register Apollo Client
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  // HTTP Link for GraphQL requests
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql", // Absolute URL required
    credentials: "include", // Include cookies for requests
  })

  // Combine errorLink, authLink, csrfLink, and httpLink
/*   return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, csrfLink.concat(httpLink)]), // Ensure authLink is included
  })
}) */
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, csrfLink.concat(httpLink)]), // Ensure authLink is included
  })
})

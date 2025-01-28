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

      // UNAUTHENTICATED error handling (Commented Out)
      // if (error.extensions.code === "UNAUTHENTICATED") {
      //   console.warn("User is unauthenticated. Attempting to refresh token.")

      //   return fetch("/api/refresh", {
      //     method: "POST",
      //     credentials: "include",
      //   })
      //     .then(() => forward(operation))
      //     .catch((refreshError) => {
      //       console.error("Token refresh failed:", refreshError)
      //       return forward(operation) // Retry even if refresh fails
      //     })
      // }
    })
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`)
  }
})

// Authorization middleware (Commented Out)
// const authLink = setContext((_, { headers }) => {
//   if (typeof window !== "undefined") {
//     const jwtToken = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("jwt="))
//       ?.split("=")[1]

//     return {
//       headers: {
//         ...headers,
//         Authorization: jwtToken ? `JWT ${jwtToken}` : "",
//       },
//     }
//   }
//   return { headers }
// })

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
  console.log("Register Apollo DEBUG: ", registerApolloClient) // Should log a function, otherwise there's a problem
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: csrfLink.concat(
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql", // Absolute URL required
        fetchOptions: { cache: "no-store" }, // Disable result caching for dynamic SSR
      })
    ),
  })
})

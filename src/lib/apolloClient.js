import {
  registerApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import {ApolloClient, HttpLink } from "@apollo/client"

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  console.log("Register Apollo DEBUG: ", registerApolloClient) // Should log a function, otherwise there's a problem
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql", // Absolute URL required
      fetchOptions: { cache: "no-store" }, // Disable result caching for dynamic SSR
    }),
  })
})

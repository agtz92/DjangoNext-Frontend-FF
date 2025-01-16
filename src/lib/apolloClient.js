import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

let apolloClient

export function createApolloClient() {
  const uri =
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://127.0.0.1:8000/gql"

  return new ApolloClient({
    uri, // Use the environment variable or fallback to default
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If there's an initial state, restore it in the cache
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  // For SSG and SSR, always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient

  // Reuse Apollo Client instance on the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

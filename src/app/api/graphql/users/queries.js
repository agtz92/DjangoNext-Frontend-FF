import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query getUsers {
    users {
      edges {
        node {
          username
          firstName
          lastName
          email
          isStaff
          verified
        }
      }
    }
  }
`

export const GET_ME = gql`
  query MeQuery{
      me{
        username
        firstName
        lastName
        isActive
        email
        verified
      }
    }
`

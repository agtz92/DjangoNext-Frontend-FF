import { gql } from "@apollo/client"

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $businessLine: String!
    $state: String!
  ) {
    createCompany(name: $name, businessLine: $businessLine, state: $state) {
      success
      message
      company {
        id
        name
        businessLine
        state
      }
    }
  }
`

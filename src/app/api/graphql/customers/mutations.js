import { gql } from "@apollo/client"

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $name: String!
    $email: String!
    $phone: String
    $companyId: ID
  ) {
    createCustomer(
      name: $name
      email: $email
      phone: $phone
      companyId: $companyId
    ) {
      success
      message
      customer {
        id
        name
        email
        phone
        company {
          id
          name
        }
      }
    }
  }
`

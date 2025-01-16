import { gql } from "@apollo/client"

export const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
      businessLine
      state
      createdAt
      updatedAt
    }
  }
`

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyDetails($id: ID!) {
    company(id: $id) {
      id
      name
      businessLine
      state
      customers {
        id
        name
        email
        orders {
          id
          createdAt
          totalPrice
          items {
            product {
              name
            }
            quantity
            price
          }
        }
      }
    }
  }
`

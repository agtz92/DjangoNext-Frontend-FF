import { gql } from "@apollo/client"

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      createdAt
      updatedAt
      customer {
        id
        name
        company {
          id
          name
        }
      }
      items {
        id
        product {
          name
          sku
        }
        quantity
        price
      }
    }
  }
`
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      id
      createdAt
      updatedAt
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
      items {
        id
        product {
          id
          name
          sku
        }
        quantity
        price
      }
    }
  }
`

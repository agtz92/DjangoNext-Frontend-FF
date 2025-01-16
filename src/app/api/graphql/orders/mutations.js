import { gql } from "@apollo/client"

export const CREATE_ORDER = gql`
  mutation CreateOrder($customerId: ID!, $items: [OrderItemInput!]!) {
    createOrder(customerId: $customerId, items: $items) {
      success
      order {
        id
        customer {
          id
          name
        }
        items {
          product {
            id
            name
          }
          quantity
          price
        }
      }
    }
  }
`

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      success
      message
    }
  }
`

export const DUPLICATE_ORDER = gql`
  mutation DuplicateOrder($id: ID!) {
    duplicateOrder(id: $id) {
      success
      newOrder {
        id
        customer {
          id
          name
        }
        createdAt
        items {
          id
          product {
            id
            name
          }
          quantity
          price
        }
      }
    }
  }
`

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $customerId: ID, $items: [OrderItemInput]) {
    updateOrder(id: $id, customerId: $customerId, items: $items) {
      success
      message
      updatedOrder {
        id
        customer {
          id
          name
        }
        items {
          id
          product {
            id
            name
          }
          quantity
          price
        }
        createdAt
        updatedAt
      }
    }
  }
`

import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      id
      name
      email
      phone
      company {
        id
        name
        businessLine
        state
      }
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: ID!) {
    customer(id: $id) {
      id
      name
      email
      phone
      company {
        id
        name
        businessLine
        state
      }
      orders {
        id
        createdAt
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
`;

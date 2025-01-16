import { gql } from "@apollo/client"

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sku
      description
      basePrice
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      sku
      description
      basePrice
    }
  }
`

export const GET_PRODUCT_BY_SKU = gql`
  query GetProductById($sku: String!) {
    product(sku: $sku) {
      id
      name
      sku
      description
      basePrice
    }
  }
`

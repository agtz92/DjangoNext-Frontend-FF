import { gql } from "@apollo/client"

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $sku: String!
    $basePrice: Float!
    $description: String!
  ) {
    createProduct(
      name: $name
      sku: $sku
      basePrice: $basePrice
      description: $description
    ) {
      product {
        id
        name
        basePrice
        description
      }
    }
  }
`
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $sku: String!
    $name: String
    $basePrice: Decimal
    $description: String
  ) {
    updateProduct(
      id: $id
      sku: $sku
      name: $name
      basePrice: $basePrice
      description: $description
    ) {
      product {
        id
        sku
        name
        basePrice
        description
      }
    }
  }
`
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`

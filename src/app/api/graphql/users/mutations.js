import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token
      refreshToken
      payload
      refreshExpiresIn
      user {
        username
        firstName
      }
    }
  }
`
export const SIGNUP = gql`
  mutation registerUser(
    $email: String!
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    register(
      email: $email
      username: $username
      firstName: $firstName
      lastName: $lastName
      password1: $password
      password2: $password
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
  ) {
    updateAccount(
      firstName: $firstName
      lastName: $lastName
    ) {
      success
      errors
    }
  }
`

export const VERIFY_USER = gql`
  mutation verifyUser($keyVer: String!) {
    verifyAccount(token: $keyVer) {
      success
      errors
    }
  }
`

export const RESEND_ACTIVATION_EMAIL = gql`
  mutation resendActivationEmail($email: String!) {
    resendActivationEmail(email: $email) {
      errors
      success
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation forgottenPassword($email: String!) {
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation passwordReset($keyVer: String!, $password: String!) {
    passwordReset(
      token: $keyVer
      newPassword1: $password
      newPassword2: $password
    ) {
      success
      errors
    }
  }
`

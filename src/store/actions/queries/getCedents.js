import gql from 'graphql-tag'

export default gql`
  query getAllCedents {
    getAllCedents {
      statusCode,
      message,
      error,
      response
    }
  }
`

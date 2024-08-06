import gql from 'graphql-tag'

export default gql`
  query getAllBrokers {
    getAllBrokers {
      statusCode,
      message,
      error,
      response
    }
  }
`

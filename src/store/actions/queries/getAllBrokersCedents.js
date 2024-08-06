import gql from 'graphql-tag'

export default gql`
  query getAllBrokersCedents {
    getAllBrokersCedents {
      statusCode,
      message,
      error,
      response
    }
  }
`

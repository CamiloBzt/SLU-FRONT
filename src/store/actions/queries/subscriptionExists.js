import gql from 'graphql-tag'

export default gql`
  query subscriptionExists($id: ID) {
    subscriptionExists(id: $id) {
      statusCode
      response
      message
      error
    }
  }
`

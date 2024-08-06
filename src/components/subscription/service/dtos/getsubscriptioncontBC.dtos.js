import gql from 'graphql-tag'

export default gql`
query {
        getSubscriptionCountBC{
          message,
          statusCode,
          response
        }
    }
`
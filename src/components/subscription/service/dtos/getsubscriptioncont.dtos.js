import gql from 'graphql-tag'

export default gql`
query {
        getSubscriptionCount{
          message,
          statusCode,
          response
        }
    }
`
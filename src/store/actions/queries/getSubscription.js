import gql from 'graphql-tag'

export default gql`
  query getSubscription($subscriptionId: ID!) {
    getSubscription(subscriptionId: $subscriptionId) {
      statusCode,
      message,
      error,
      response
    }
  }
`

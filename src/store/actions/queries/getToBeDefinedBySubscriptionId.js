import gql from 'graphql-tag';

export default gql`
  query getToBeDefinedBySubscriptionId($subscriptionId: Int!) {
    getToBeDefinedBySubscriptionId(subscriptionId: $subscriptionId) {
      statusCode
      message
      error
      response
    }
  }
`

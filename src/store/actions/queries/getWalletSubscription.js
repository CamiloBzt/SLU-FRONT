import gql from 'graphql-tag';

export default gql`
  query getWalletSubscription($subscriptionId: ID!) {
    getWalletSubscription(subscriptionId: $subscriptionId) {
      statusCode
      message
      error
      response
    }
  }
`;

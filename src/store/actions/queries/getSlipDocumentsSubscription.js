import gql from 'graphql-tag';

export default gql`
  query getSlipDocumentsSubscription($subscription_id: Int!) {
    getSlipDocumentsSubscription(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

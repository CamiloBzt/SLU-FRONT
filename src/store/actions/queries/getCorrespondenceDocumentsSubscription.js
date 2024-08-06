import gql from 'graphql-tag';

export default gql`
  query getCorrespondenceDocumentsSubscription($subscription_id: Int!) {
    getCorrespondenceDocumentsSubscription(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

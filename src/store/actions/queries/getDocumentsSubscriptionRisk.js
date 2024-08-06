import gql from 'graphql-tag';

export default gql`
  query getDocumentsSubscriptionRisk($subscription_id: Int!, $docs: [Int]!) {
    getDocumentsSubscriptionRisk(subscription_id: $subscription_id, docs: $docs) {
      statusCode
      message
      error
      response
    }
  }
`;

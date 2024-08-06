import gql from 'graphql-tag';

export default gql`
  mutation renewalSubscription($subscriptionId: ID, $section: String) {
    renewalSubscription(subscriptionId: $subscriptionId, section: $section) {
      response
      statusCode
      message
      error
    }
  }
`;

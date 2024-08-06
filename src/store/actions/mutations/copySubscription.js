import gql from 'graphql-tag';

export default gql`
  mutation copySubscription($subscriptionId: ID, $section: String) {
    copySubscription(subscriptionId: $subscriptionId, section: $section) {
      response
      statusCode
      message
      error
    }
  }
`;

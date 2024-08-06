import gql from 'graphql-tag';

export default gql`
  mutation updateSubscription($reference: String, $subscriptionId: ID) {
    updateSubscription(subscriptionId: $subscriptionId, subscription: { reference: $reference }) {
      statusCode
      message
      error
      response
    }
  }
`;

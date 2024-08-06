import gql from 'graphql-tag';

export default gql`
  query getNotesSubscription($subscription_id: Int!) {
    getNotesSubscription(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

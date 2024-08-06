import gql from "graphql-tag";

export default gql`
  query getContactsBySubscription($subscriptionId: ID!) {
    getContactsBySubscription(subscriptionId: $subscriptionId) {
      statusCode,
      message,
      error,
      response
    }
  }
`;

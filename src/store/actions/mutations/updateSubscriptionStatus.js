import gql from "graphql-tag";

export default gql`
  mutation updateSubscriptionStatus($subscriptionId: ID, $statusId: Int) {
    updateSubscriptionStatus(
      subscriptionId: $subscriptionId
      statusId: $statusId
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

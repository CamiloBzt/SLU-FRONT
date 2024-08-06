import gql from 'graphql-tag';

export default gql`
  query getSubmissionBySubscriptionId($subscriptionId: ID!) {
    getSubmissionBySubscriptionId(subscriptionId: $subscriptionId) {
      statusCode
      message
      error
      response
    }
  }
`;

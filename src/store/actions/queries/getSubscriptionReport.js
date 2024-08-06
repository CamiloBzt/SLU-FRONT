import gql from 'graphql-tag';

export default gql`
  query getSubscriptionReport($subscriptionId: ID!, $riskType: Int!) {
    getSubscriptionReport(subscriptionId: $subscriptionId, riskType: $riskType) {
      statusCode
      message
      error
      response
    }
  }
`;

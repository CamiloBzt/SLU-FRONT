import gql from 'graphql-tag';

export const closeClaim = gql`
  mutation closeClaim($subscription_id: ID!, $reason: String!) {
    closeClaim(subscription_id: $subscription_id, reason: $reason) {
      statusCode
      message
    }
  }
`;

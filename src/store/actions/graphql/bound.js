import gql from 'graphql-tag';

/* queries */
export const getBoundClaims = gql`
  query getBoundClaims($subscription_id: ID!, $type: String!) {
    getBoundClaims(subscription_id: $subscription_id, type: $type) {
      statusCode
      message
      error
      response
    }
  }
`;

/* mutations */
export const updateBoundClaim = gql`
  mutation updateBoundClaim(
    $id: ID!
    $column: String!
    $value: String!
    $type: String!
  ) {
    updateBoundClaim(id: $id, column: $column, value: $value, type: $type) {
      statusCode
    }
  }
`;

import gql from 'graphql-tag';

/* queries */
export const getDeductibles = gql`
  query getDeductibles($id: ID) {
    getDeductibles(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;

/* mutations */
export const createDeductibleProperty = gql`
  mutation createDeductibleProperty($subscription_id: ID!) {
    createDeductibleProperty(subscription_id: $subscription_id) {
      statusCode
    }
  }
`;

export const createFireDeductible = gql`
  mutation createFireDeductible($deductible_id: ID!, $subscription_id: ID!) {
    createFireDeductible(
      deductible_id: $deductible_id
      subscription_id: $subscription_id
    ) {
      statusCode
    }
  }
`;

export const updateDeductibleProperty = gql`
  mutation updateDeductibleProperty(
    $id: ID!
    $column: String!
    $value: String!
  ) {
    updateDeductibleProperty(id: $id, column: $column, value: $value) {
      statusCode
    }
  }
`;

import gql from 'graphql-tag';

/* queries */
export const getSublimesProperty = gql`
  query getSublimesProperty($subscription_id: ID!) {
    getSublimesProperty(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

/* mutations */
export const createSublimeProperty = gql`
  mutation createSublimeProperty($subscription_id: ID!) {
    createSublimeProperty(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

export const createSublimitProperty = gql`
  mutation createSublimitProperty($sublime_id: ID!, $subscription_id: ID!) {
    createSublimitProperty(
      sublime_id: $sublime_id
      subscription_id: $subscription_id
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

export const updateSublimeProperty = gql`
  mutation updateSublimeProperty($id: ID!, $column: String!, $value: String!) {
    updateSublimeProperty(id: $id, column: $column, value: $value) {
      statusCode
      message
      error
      response
    }
  }
`;

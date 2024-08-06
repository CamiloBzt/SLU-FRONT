import gql from 'graphql-tag';

/* queries */
export const getLayers = gql`
  query getLayers($subscription_id: ID!) {
    getLayers(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

export const getLayer = gql`
  query getLayer($id: ID!) {
    getLayer(id: $id) {
      statusCode
      message
      error
      response
    }
  }
`;

/* mutations */
export const createLayer = gql`
  mutation createLayer($subscription_id: ID!) {
    createLayer(subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

export const checkLayer = gql`
  mutation checkLayer($id: ID!, $subscription_id: ID!) {
    checkLayer(id: $id, subscription_id: $subscription_id) {
      statusCode
      message
      error
      response
    }
  }
`;

export const updateLayer = gql`
  mutation updateLayer($id: ID!, $column: String!, $value: String!) {
    updateLayer(id: $id, column: $column, value: $value) {
      statusCode
    }
  }
`;

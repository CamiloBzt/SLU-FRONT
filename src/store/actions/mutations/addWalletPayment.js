import gql from 'graphql-tag';

export default gql`
  mutation addWalletPayment($pay: String!, $field: String!, $subscriptionId: ID!) {
    addWalletPayment(pay: $pay, field: $field, subscriptionId: $subscriptionId) {
      statusCode
      message
      error
      response
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  mutation saveRateAndAlopCurrency(
    $subscription_id: Int!
    $column: String!
    $newVal: Float!
  ) {
    saveRateAndAlopCurrency(
      subscription_id: $subscription_id
      column: $column
      newVal: $newVal
    ) {
      statusCode
    }
  }
`;

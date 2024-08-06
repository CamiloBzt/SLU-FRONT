import gql from 'graphql-tag';

export default gql`
  query getQuotationColumn(
    $table: String
    $column: String!
    $subscriptionId: Int!
  ) {
    getQuotationColumn(
      table: $table
      column: $column
      subscriptionId: $subscriptionId
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

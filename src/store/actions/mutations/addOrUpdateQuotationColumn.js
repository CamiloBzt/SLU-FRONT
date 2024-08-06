import gql from 'graphql-tag';

export default gql`
  mutation addOrUpdateQuotationColumn(
    $id: Int!
    $type: Int!
    $column: String!
    $columnValue: String!
  ) {
    addOrUpdateQuotationColumn(
      columnInput: {
        id: $id
        type: $type
        column: $column
        columnValue: $columnValue
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

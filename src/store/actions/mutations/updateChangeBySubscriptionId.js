import gql from "graphql-tag";

export default gql`
  mutation updateChangeBySubscriptionId(
    $tableName: String!
    $column: String!
    $dataValue: String!
    $id: Int!
  ) {
    updateChangeBySubscriptionId(
      tableName: $tableName,
      column: $column,
      dataValue: $dataValue,
      id: $id
    ) {
      statusCode
    }
  }
`;

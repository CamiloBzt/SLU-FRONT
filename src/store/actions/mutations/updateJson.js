import gql from "graphql-tag";

export default gql`
  mutation updateJson(
    $tableName: String!
    $column: String!
    $dataValue: JSON!
    $id: Int!
  ) {
    updateJson(
      tableName: $tableName,
      column: $column,
      dataValue: $dataValue,
      id: $id
    ) {
      statusCode
    }
  }
`;

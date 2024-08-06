import gql from "graphql-tag";

export default gql`
  mutation updateReferenceSubscription(
    $dataValue: String!
    $id: Int!
  ) {
    updateReferenceSubscription(
      dataValue: $dataValue,
      id: $id
    ) {
      statusCode
    }
  }
`;

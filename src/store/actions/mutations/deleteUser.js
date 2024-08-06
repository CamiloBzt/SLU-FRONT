import gql from "graphql-tag";

export default gql`
  mutation deleteUser(
    $userId: String!
  ) {
    deleteUser(
      userId: $userId
    ) {
      statusCode
    }
  }
`;

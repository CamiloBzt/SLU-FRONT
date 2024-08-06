import gql from "graphql-tag";

export default gql`
  mutation resendMail(
    $userId: String!
  ) {
    resendMail(
      userId: $userId
    ) {
      statusCode
    }
  }
`;

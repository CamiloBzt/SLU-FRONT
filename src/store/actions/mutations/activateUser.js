import gql from "graphql-tag";

export default gql`
  mutation activateUser(
    $userId: String!
    $code: String!
    $accountIdMs: String!
    $emailMs: String!
    $homeAccountIdMs: String!
  ) {
    activateUser(
      data: {
        userId: $userId
        code: $code
        accountIdMs: $accountIdMs
        emailMs: $emailMs
        homeAccountIdMs: $homeAccountIdMs
      }
    ) {
      id
    }
  }
`;

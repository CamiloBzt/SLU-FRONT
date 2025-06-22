import gql from "graphql-tag";

export const createLineOfRiskDto = gql`
  mutation createLineOfRisk(
    $id: Int
    $key: String!
    $description: String!
    $active: Boolean!
  ) {
    createLineOfRisk(
      lineOfRisk: {
        id: $id
        key: $key
        description: $description
        active: $active
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation createCurrency(
    $id: Int
    $key: String!
    $description: String!
    $region: String!
    $active: Boolean!
  ) {
    createCurrency(
      currency: {
        id: $id
        key: $key
        description: $description
        region: $region
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

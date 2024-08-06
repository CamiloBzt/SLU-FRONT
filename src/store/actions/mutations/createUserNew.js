import gql from "graphql-tag";

export default gql`
  mutation createUserNew(
    $name: String!
    $lastName: String!
    $email: String!
    $celular: String
    $countryId: Int!
    $companyId: Int!
    $role: [Int]!
    $address: String!
    $signature: String
  ) {
    createUserNew(
      user: {
        name: $name
        lastName: $lastName
        email: $email
        celular: $celular
        countryId: $countryId
        companyId: $companyId
        role: $role,
        address: $address
        signature: $signature
      }
    ) {
      statusCode,
      message
    }
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation updateUser(
    $id: String
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
    updateUser(
      user: {
        id: $id
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

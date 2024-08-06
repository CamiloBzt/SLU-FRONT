import gql from "graphql-tag";

export default gql`
  mutation createSluUser(
    $name: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $country: Int!
    $company: Int!
    $role: String!
    $address: String!
    $signature: String
  ) {
    createSluUser(
      user: {
        name: $name
        lastName: $lastName
        email: $email
        phone: $phone
        country: $country
        company: $company
        role: $role
        address: $address
        signature: $signature
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

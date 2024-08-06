import gql from "graphql-tag";

export default gql`
  mutation addCompany($name: String!, $type: Int!, $phone: String!, $address: String!, $country: Int!) {
    addCompany(
      company: {
        name: $name
        type: $type
        phone: $phone
        address: $address
        country: $country
      }
    ) {
      statusCode
      message
      error
      response
    }
  }
`;

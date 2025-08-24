import gql from "graphql-tag";

export default gql`
mutation updateCountry( $country: CountryInput!) {
  updateCountry( country: $country) {
    statusCode
    message
    error
    response
  }
}
`;
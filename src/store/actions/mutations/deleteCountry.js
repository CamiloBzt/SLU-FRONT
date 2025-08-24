import gql from "graphql-tag";

export default gql`
  mutation deleteCountry($countryId: Int!) {
    deleteCountry(countryId: $countryId) {
      statusCode
      message
      error
      response
    }
  }
`;

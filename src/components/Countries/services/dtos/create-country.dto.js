import gql from "graphql-tag";

export const createCountryDto = gql`
  mutation createCountry($country: CountryInput!) {
    createCountry(country: $country) {
      statusCode
      message
      error
      response
    }
  }
`;
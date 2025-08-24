import gql from "graphql-tag";

export default gql`
  query getCountryDataById($countryId: ID!) {
    getCountryDataById(countryId: $countryId) {
      id
      description
      active
      created_at
      updated_at
    }
  }
`;

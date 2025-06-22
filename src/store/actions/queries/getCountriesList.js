import gql from "graphql-tag";

export default gql`
  query getCountriesList {
    getCountriesList {
      id
      description
      active
      created_at
      updated_at
    }
  }
`;
